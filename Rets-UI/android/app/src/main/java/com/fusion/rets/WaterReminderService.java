package com.fusion.rets;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.os.VibratorManager;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

public class WaterReminderService extends Service {
    static final String ACTION_START = "com.fusion.rets.WATER_REMINDER_SERVICE_START";
    static final String ACTION_STOP = "com.fusion.rets.WATER_REMINDER_SERVICE_STOP";

    private static final String CHANNEL_ID = "water_reminders";
    private static final int NOTIFICATION_ID = 7402;

    private Vibrator vibrator;

    @Override
    public void onCreate() {
        super.onCreate();
        vibrator = getVibrator();
        createNotificationChannel();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        String action = intent != null ? intent.getAction() : ACTION_START;
        if (ACTION_STOP.equals(action)) {
            stopReminder();
            return START_NOT_STICKY;
        }

        WaterReminderSettings.setActiveAlert(this, true);
        startForeground(NOTIFICATION_ID, buildNotification());
        startVibration();
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        stopVibration();
        super.onDestroy();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    private void stopReminder() {
        WaterReminderSettings.setActiveAlert(this, false);
        stopVibration();
        stopForeground(true);
        stopSelf();
    }

    private void startVibration() {
        if (vibrator == null || !vibrator.hasVibrator()) {
            return;
        }

        long[] pattern = new long[] { 0, 700, 350 };
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            vibrator.vibrate(VibrationEffect.createWaveform(pattern, 0));
        } else {
            vibrator.vibrate(pattern, 0);
        }
    }

    private void stopVibration() {
        if (vibrator != null) {
            vibrator.cancel();
        }
    }

    private Notification buildNotification() {
        Intent openIntent = new Intent(this, MainActivity.class);
        openIntent.setFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP | Intent.FLAG_ACTIVITY_CLEAR_TOP);
        PendingIntent openPendingIntent = PendingIntent.getActivity(
            this,
            7403,
            openIntent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        Intent stopIntent = new Intent(this, WaterReminderReceiver.class);
        stopIntent.setAction(WaterReminderReceiver.ACTION_STOP);
        PendingIntent stopPendingIntent = PendingIntent.getBroadcast(
            this,
            7404,
            stopIntent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        return new NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(getApplicationInfo().icon)
            .setContentTitle("Time to hydrate")
            .setContentText("Drink some water, then tap Done.")
            .setContentIntent(openPendingIntent)
            .setOngoing(true)
            .setAutoCancel(false)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_ALARM)
            .addAction(0, "Done", stopPendingIntent)
            .build();
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
            return;
        }

        NotificationManager manager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager == null) {
            return;
        }

        NotificationChannel channel = new NotificationChannel(
            CHANNEL_ID,
            "Water reminders",
            NotificationManager.IMPORTANCE_HIGH
        );
        channel.setDescription("Hydration reminders with vibration");
        channel.enableVibration(false);
        manager.createNotificationChannel(channel);
    }

    private Vibrator getVibrator() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            VibratorManager manager = (VibratorManager) getSystemService(Context.VIBRATOR_MANAGER_SERVICE);
            return manager != null ? manager.getDefaultVibrator() : null;
        }

        return (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
    }
}
