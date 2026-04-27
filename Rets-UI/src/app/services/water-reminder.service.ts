import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { AlertController, Platform } from '@ionic/angular';

export interface WaterReminderSettings {
  activeDays: number[];
  intervalHours: number;
  intervalMinutes: number;
  timesPerDay: number;
  startTime: string;
  endTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class WaterReminderService {
  private readonly STORAGE_KEY = 'water_reminder_settings';
  private hapticIntervalId: any = null;

  constructor(private alertCtrl: AlertController, private platform: Platform) {
    this.init();
  }

  async init() {
    await this.platform.ready();
    try {
      await LocalNotifications.requestPermissions();
      
      await LocalNotifications.registerActionTypes({
        types: [
          {
            id: 'WATER_ACTION',
            actions: [
              {
                id: 'done',
                title: 'Done (Drank Water)',
                foreground: false
              }
            ]
          }
        ]
      });
    } catch (e) {
      console.warn('LocalNotifications permission or action registration failed', e);
    }
    
    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      if (notification.actionId === 'done') {
         console.log('User marked water as drank from notification.');
         if (this.hapticIntervalId) {
             clearInterval(this.hapticIntervalId);
             this.hapticIntervalId = null;
         }
         return;
      }

      if (notification.actionId === 'tap' && notification.notification.extra && notification.notification.extra.type === 'water_reminder') {
        this.triggerVibrationAlert();
      }
    });
  }

  async getSettings(): Promise<WaterReminderSettings | null> {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  async saveSettings(settings: WaterReminderSettings) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(settings));
    await this.scheduleNotifications(settings);
  }

  private async scheduleNotifications(settings: WaterReminderSettings) {
    try {
      await LocalNotifications.cancel({ notifications: (await LocalNotifications.getPending()).notifications });
    } catch (e) {
      console.warn('Failed to cancel notifications', e);
    }

    if (settings.activeDays.length === 0 || settings.timesPerDay === 0) {
      return;
    }

    const notifications = [];
    let idCounter = 1;
    
    const startObj = new Date(settings.startTime);
    const endObj = new Date(settings.endTime);
    const startHour = startObj.getHours();
    const startMin = startObj.getMinutes();
    const endHour = endObj.getHours();
    const endMin = endObj.getMinutes();
    
    const intervalH = settings.intervalHours || 0;
    const intervalM = settings.intervalMinutes || 0;
    
    // Avoid infinite loop if interval is 0
    if (intervalH === 0 && intervalM === 0) {
        return;
    }

    for (const day of settings.activeDays) {
        const capWeekday = day === 6 ? 1 : day + 2;
        
        let currentHour = startHour;
        let currentMin = startMin;

        for (let i = 0; i < settings.timesPerDay; i++) {
           if (currentHour > endHour || (currentHour === endHour && currentMin > endMin)) {
               break; 
           }

           notifications.push({
               id: idCounter++,
               title: '💧 Time to hydrate!',
               body: 'Drink some water and stay healthy.',
               actionTypeId: 'WATER_ACTION',
               schedule: { 
                   on: {
                       weekday: capWeekday,
                       hour: currentHour,
                       minute: currentMin
                   }
               },
               extra: { type: 'water_reminder' }
           });
           
           currentMin += intervalM;
           currentHour += intervalH;
           
           if (currentMin >= 60) {
               currentMin -= 60;
               currentHour += 1;
           }
           
           if (currentHour >= 24) break; 
        }
    }

    if (notifications.length > 0) {
       try {
         await LocalNotifications.schedule({ notifications });
       } catch (e) {
         console.warn('Failed to schedule notifications', e);
       }
    }
  }

  public async triggerVibrationAlert() {
    if (this.hapticIntervalId) {
        clearInterval(this.hapticIntervalId);
    }
    
    this.hapticIntervalId = setInterval(() => {
       Haptics.impact({ style: ImpactStyle.Heavy }).catch(() => {});
    }, 200);

    const alert = await this.alertCtrl.create({
      header: 'Hydration Time',
      message: 'It\'s time to drink water!',
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            if (this.hapticIntervalId) {
              clearInterval(this.hapticIntervalId);
              this.hapticIntervalId = null;
            }
          }
        }
      ],
      backdropDismiss: false
    });

    await alert.present();
  }
}
