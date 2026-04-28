package com.fusion.rets;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;
import com.getcapacitor.annotation.PermissionCallback;

import org.json.JSONException;

import java.util.HashSet;
import java.util.Set;

@CapacitorPlugin(
    name = "WaterReminderNative",
    permissions = {
        @Permission(strings = { android.Manifest.permission.POST_NOTIFICATIONS }, alias = "notifications")
    }
)
public class WaterReminderPlugin extends Plugin {
    @PluginMethod
    public void requestPermissions(PluginCall call) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            requestPermissionForAlias("notifications", call, "notificationPermissionCallback");
            return;
        }

        JSObject result = new JSObject();
        result.put("notifications", "granted");
        call.resolve(result);
    }

    @PermissionCallback
    private void notificationPermissionCallback(PluginCall call) {
        JSObject result = new JSObject();
        result.put("notifications", getPermissionState("notifications").toString());
        call.resolve(result);
    }

    @PluginMethod
    public void openExactAlarmSettings(PluginCall call) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            Intent intent = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM);
            intent.setData(Uri.parse("package:" + getContext().getPackageName()));
            getActivity().startActivity(intent);
        }
        call.resolve();
    }

    @PluginMethod
    public void schedule(PluginCall call) {
        Set<Integer> activeDays = parseDays(call.getArray("activeDays"));
        int intervalMinutes = call.getInt("intervalMinutes", 0);
        int timesPerDay = call.getInt("timesPerDay", 0);
        int startMinutes = call.getInt("startMinutes", 0);
        int endMinutes = call.getInt("endMinutes", 0);

        if (activeDays.isEmpty() || intervalMinutes <= 0 || timesPerDay <= 0 || startMinutes > endMinutes) {
            WaterReminderSettings.disable(getContext());
            WaterReminderScheduler.cancel(getContext());
            call.resolve();
            return;
        }

        WaterReminderSettings.save(getContext(), activeDays, intervalMinutes, timesPerDay, startMinutes, endMinutes);
        WaterReminderScheduler.scheduleNext(getContext());
        call.resolve();
    }

    @PluginMethod
    public void cancel(PluginCall call) {
        WaterReminderSettings.disable(getContext());
        WaterReminderScheduler.cancel(getContext());
        stopService();
        call.resolve();
    }

    @PluginMethod
    public void stopActiveReminder(PluginCall call) {
        stopService();
        call.resolve();
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        JSObject result = new JSObject();
        result.put("active", WaterReminderSettings.hasActiveAlert(getContext()));
        call.resolve(result);
    }

    private Set<Integer> parseDays(JSArray array) {
        Set<Integer> days = new HashSet<>();
        if (array == null) {
            return days;
        }

        for (int i = 0; i < array.length(); i++) {
            try {
                int day = array.getInt(i);
                if (day >= 0 && day <= 6) {
                    days.add(day);
                }
            } catch (JSONException ignored) {
                return days;
            }
        }

        return days;
    }

    private void stopService() {
        WaterReminderSettings.setActiveAlert(getContext(), false);
        Intent intent = new Intent(getContext(), WaterReminderService.class);
        intent.setAction(WaterReminderService.ACTION_STOP);
        getContext().startService(intent);
    }
}
