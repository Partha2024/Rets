import { Injectable } from '@angular/core';
import { App } from '@capacitor/app';
import { Capacitor, registerPlugin } from '@capacitor/core';
import { AlertController, Platform } from '@ionic/angular';

export interface WaterReminderSettings {
  activeDays: number[];
  intervalHours: number;
  intervalMinutes: number;
  timesPerDay: number;
  startTime: string;
  endTime: string;
}

interface NativeScheduleOptions {
  activeDays: number[];
  intervalMinutes: number;
  timesPerDay: number;
  startMinutes: number;
  endMinutes: number;
}

interface WaterReminderNativePlugin {
  requestPermissions(): Promise<{ notifications: string }>;
  openExactAlarmSettings(): Promise<void>;
  schedule(options: NativeScheduleOptions): Promise<void>;
  cancel(): Promise<void>;
  stopActiveReminder(): Promise<void>;
  getStatus(): Promise<{ active: boolean }>;
}

const WaterReminderNative = registerPlugin<WaterReminderNativePlugin>('WaterReminderNative');

@Injectable({
  providedIn: 'root'
})
export class WaterReminderService {
  private readonly STORAGE_KEY = 'water_reminder_settings';
  private activeAlert: HTMLIonAlertElement | null = null;

  constructor(private alertCtrl: AlertController, private platform: Platform) {
    this.init();
  }

  async init() {
    await this.platform.ready();

    if (!Capacitor.isNativePlatform()) {
      return;
    }

    try {
      await WaterReminderNative.requestPermissions();
    } catch (e) {
      console.warn('Water reminder native permission request failed', e);
    }

    App.addListener('appStateChange', async ({ isActive }) => {
      if (isActive) {
        await this.showActiveReminderIfNeeded();
      }
    });

    await this.showActiveReminderIfNeeded();
  }

  async getSettings(): Promise<WaterReminderSettings | null> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  async saveSettings(settings: WaterReminderSettings) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    await this.scheduleNativeReminder(settings);
  }

  public async stopActiveReminder() {
    if (Capacitor.isNativePlatform()) {
      await WaterReminderNative.stopActiveReminder();
    }

    if (this.activeAlert) {
      await this.activeAlert.dismiss();
      this.activeAlert = null;
    }
  }

  private async scheduleNativeReminder(settings: WaterReminderSettings) {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const intervalMinutes = (settings.intervalHours || 0) * 60 + (settings.intervalMinutes || 0);
    const startMinutes = this.getMinutesOfDay(settings.startTime);
    const endMinutes = this.getMinutesOfDay(settings.endTime);

    if (settings.activeDays.length === 0 || settings.timesPerDay === 0 || intervalMinutes === 0) {
      await WaterReminderNative.cancel();
      return;
    }

    if (startMinutes > endMinutes) {
      console.warn('Water reminder schedule was not saved natively because start time is after end time.');
      return;
    }

    try {
      await WaterReminderNative.schedule({
        activeDays: settings.activeDays,
        intervalMinutes,
        timesPerDay: settings.timesPerDay,
        startMinutes,
        endMinutes
      });
    } catch (e) {
      console.warn('Failed to schedule native water reminders', e);
    }
  }

  private async showActiveReminderIfNeeded() {
    if (!Capacitor.isNativePlatform() || this.activeAlert) {
      return;
    }

    try {
      const status = await WaterReminderNative.getStatus();
      if (!status.active) {
        return;
      }
    } catch (e) {
      console.warn('Failed to read native water reminder status', e);
      return;
    }

    this.activeAlert = await this.alertCtrl.create({
      header: 'Hydration Time',
      message: 'It\'s time to drink water!',
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: async () => {
            await this.stopActiveReminder();
          }
        }
      ],
      backdropDismiss: false
    });

    this.activeAlert.onDidDismiss().then(() => {
      this.activeAlert = null;
    });
    await this.activeAlert.present();
  }

  private getMinutesOfDay(value: string): number {
    const date = new Date(value);
    return date.getHours() * 60 + date.getMinutes();
  }
}
