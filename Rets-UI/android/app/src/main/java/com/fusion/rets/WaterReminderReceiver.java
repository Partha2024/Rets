package com.fusion.rets;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import androidx.core.content.ContextCompat;

public class WaterReminderReceiver extends BroadcastReceiver {
    static final String ACTION_STOP = "com.fusion.rets.WATER_REMINDER_STOP";
    static final String ACTION_BOOT = "android.intent.action.BOOT_COMPLETED";

    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent != null ? intent.getAction() : null;

        if (ACTION_STOP.equals(action)) {
            Intent serviceIntent = new Intent(context, WaterReminderService.class);
            serviceIntent.setAction(WaterReminderService.ACTION_STOP);
            context.startService(serviceIntent);
            return;
        }

        if (ACTION_BOOT.equals(action)) {
            WaterReminderScheduler.scheduleNext(context);
            return;
        }

        if (WaterReminderScheduler.ACTION_REMINDER_ALARM.equals(action)) {
            WaterReminderScheduler.scheduleNext(context);
            if (!WaterReminderScheduler.canPostNotifications(context)) {
                return;
            }

            Intent serviceIntent = new Intent(context, WaterReminderService.class);
            serviceIntent.setAction(WaterReminderService.ACTION_START);
            ContextCompat.startForegroundService(context, serviceIntent);
        }
    }
}
