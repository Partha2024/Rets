package com.fusion.rets;

import android.content.Context;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONException;

import java.util.HashSet;
import java.util.Set;

class WaterReminderSettings {
    static final String PREFS_NAME = "water_reminder_native";

    private static final String KEY_ENABLED = "enabled";
    private static final String KEY_ACTIVE_DAYS = "active_days";
    private static final String KEY_INTERVAL_MINUTES = "interval_minutes";
    private static final String KEY_TIMES_PER_DAY = "times_per_day";
    private static final String KEY_START_MINUTES = "start_minutes";
    private static final String KEY_END_MINUTES = "end_minutes";
    private static final String KEY_ACTIVE_ALERT = "active_alert";

    final boolean enabled;
    final Set<Integer> activeDays;
    final int intervalMinutes;
    final int timesPerDay;
    final int startMinutes;
    final int endMinutes;

    WaterReminderSettings(
        boolean enabled,
        Set<Integer> activeDays,
        int intervalMinutes,
        int timesPerDay,
        int startMinutes,
        int endMinutes
    ) {
        this.enabled = enabled;
        this.activeDays = activeDays;
        this.intervalMinutes = intervalMinutes;
        this.timesPerDay = timesPerDay;
        this.startMinutes = startMinutes;
        this.endMinutes = endMinutes;
    }

    static SharedPreferences prefs(Context context) {
        return context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    static WaterReminderSettings load(Context context) {
        SharedPreferences prefs = prefs(context);
        return new WaterReminderSettings(
            prefs.getBoolean(KEY_ENABLED, false),
            decodeDays(prefs.getString(KEY_ACTIVE_DAYS, "[]")),
            prefs.getInt(KEY_INTERVAL_MINUTES, 0),
            prefs.getInt(KEY_TIMES_PER_DAY, 0),
            prefs.getInt(KEY_START_MINUTES, 0),
            prefs.getInt(KEY_END_MINUTES, 0)
        );
    }

    static void save(
        Context context,
        Set<Integer> activeDays,
        int intervalMinutes,
        int timesPerDay,
        int startMinutes,
        int endMinutes
    ) {
        prefs(context).edit()
            .putBoolean(KEY_ENABLED, true)
            .putString(KEY_ACTIVE_DAYS, encodeDays(activeDays))
            .putInt(KEY_INTERVAL_MINUTES, intervalMinutes)
            .putInt(KEY_TIMES_PER_DAY, timesPerDay)
            .putInt(KEY_START_MINUTES, startMinutes)
            .putInt(KEY_END_MINUTES, endMinutes)
            .apply();
    }

    static void disable(Context context) {
        prefs(context).edit()
            .putBoolean(KEY_ENABLED, false)
            .putBoolean(KEY_ACTIVE_ALERT, false)
            .apply();
    }

    static void setActiveAlert(Context context, boolean active) {
        prefs(context).edit().putBoolean(KEY_ACTIVE_ALERT, active).apply();
    }

    static boolean hasActiveAlert(Context context) {
        return prefs(context).getBoolean(KEY_ACTIVE_ALERT, false);
    }

    boolean canSchedule() {
        return enabled
            && !activeDays.isEmpty()
            && intervalMinutes > 0
            && timesPerDay > 0
            && startMinutes <= endMinutes;
    }

    private static String encodeDays(Set<Integer> days) {
        JSONArray array = new JSONArray();
        for (Integer day : days) {
            array.put(day);
        }
        return array.toString();
    }

    private static Set<Integer> decodeDays(String encoded) {
        Set<Integer> days = new HashSet<>();
        try {
            JSONArray array = new JSONArray(encoded);
            for (int i = 0; i < array.length(); i++) {
                days.add(array.getInt(i));
            }
        } catch (JSONException ignored) {
            return days;
        }
        return days;
    }
}
