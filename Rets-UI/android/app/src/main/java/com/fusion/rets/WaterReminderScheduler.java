package com.fusion.rets;

import android.Manifest;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;

import androidx.core.content.ContextCompat;

import java.util.Calendar;
import java.util.Set;

class WaterReminderScheduler {
    static final String ACTION_REMINDER_ALARM = "com.fusion.rets.WATER_REMINDER_ALARM";

    private static final int ALARM_REQUEST_CODE = 7401;

    static void scheduleNext(Context context) {
        WaterReminderSettings settings = WaterReminderSettings.load(context);
        if (!settings.canSchedule()) {
            cancel(context);
            return;
        }

        Long nextTime = findNextTimeMillis(settings);
        if (nextTime == null) {
            cancel(context);
            return;
        }

        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmManager == null) {
            return;
        }

        PendingIntent pendingIntent = reminderPendingIntent(context);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S && !alarmManager.canScheduleExactAlarms()) {
            alarmManager.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, nextTime, pendingIntent);
            return;
        }

        alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, nextTime, pendingIntent);
    }

    static void cancel(Context context) {
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (alarmManager != null) {
            alarmManager.cancel(reminderPendingIntent(context));
        }
    }

    static boolean canPostNotifications(Context context) {
        return Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU
            || ContextCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED;
    }

    private static PendingIntent reminderPendingIntent(Context context) {
        Intent intent = new Intent(context, WaterReminderReceiver.class);
        intent.setAction(ACTION_REMINDER_ALARM);
        return PendingIntent.getBroadcast(
            context,
            ALARM_REQUEST_CODE,
            intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );
    }

    private static Long findNextTimeMillis(WaterReminderSettings settings) {
        Calendar now = Calendar.getInstance();
        long nowMillis = now.getTimeInMillis();
        Long best = null;

        for (int dayOffset = 0; dayOffset <= 7; dayOffset++) {
            Calendar candidateDay = (Calendar) now.clone();
            candidateDay.add(Calendar.DAY_OF_YEAR, dayOffset);

            int uiDay = calendarDayToUiDay(candidateDay.get(Calendar.DAY_OF_WEEK));
            if (!settings.activeDays.contains(uiDay)) {
                continue;
            }

            for (int slot : buildSlots(settings)) {
                Calendar candidate = (Calendar) candidateDay.clone();
                candidate.set(Calendar.HOUR_OF_DAY, slot / 60);
                candidate.set(Calendar.MINUTE, slot % 60);
                candidate.set(Calendar.SECOND, 0);
                candidate.set(Calendar.MILLISECOND, 0);

                long candidateMillis = candidate.getTimeInMillis();
                if (candidateMillis <= nowMillis) {
                    continue;
                }

                if (best == null || candidateMillis < best) {
                    best = candidateMillis;
                }
                break;
            }

            if (best != null) {
                break;
            }
        }

        return best;
    }

    private static int[] buildSlots(WaterReminderSettings settings) {
        int[] slots = new int[Math.max(settings.timesPerDay, 0)];
        int count = 0;
        int current = settings.startMinutes;

        while (count < settings.timesPerDay && current <= settings.endMinutes && current < 24 * 60) {
            slots[count] = current;
            count++;
            current += settings.intervalMinutes;
        }

        int[] compact = new int[count];
        System.arraycopy(slots, 0, compact, 0, count);
        return compact;
    }

    private static int calendarDayToUiDay(int calendarDay) {
        if (calendarDay == Calendar.SUNDAY) {
            return 6;
        }
        return calendarDay - Calendar.MONDAY;
    }
}
