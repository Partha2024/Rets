import { Component, OnInit } from '@angular/core';
import { WaterReminderService } from '../services/water-reminder.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-water-reminder',
  templateUrl: './water-reminder.page.html',
  styleUrls: ['./water-reminder.page.scss'],
  standalone: false,
})
export class WaterReminderPage implements OnInit {
  weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  activeDays: number[] = [0, 1, 2, 3, 4, 5, 6];
  intervalHours: number = 2;
  intervalMinutes: number = 0;
  timesPerDay: number = 8;
  startTime: string = new Date(new Date().setHours(8, 0, 0, 0)).toISOString();
  endTime: string = new Date(new Date().setHours(20, 0, 0, 0)).toISOString();

  constructor(
    private waterReminderService: WaterReminderService,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.loadSettings();
  }

  async loadSettings() {
    const settings = await this.waterReminderService.getSettings();
    if (settings) {
      this.activeDays = settings.activeDays || this.activeDays;
      this.intervalHours = settings.intervalHours !== undefined ? settings.intervalHours : this.intervalHours;
      this.intervalMinutes = settings.intervalMinutes !== undefined ? settings.intervalMinutes : this.intervalMinutes;
      this.timesPerDay = settings.timesPerDay || this.timesPerDay;
      this.startTime = settings.startTime || this.startTime;
      this.endTime = settings.endTime || this.endTime;
    }
  }

  toggleDay(index: number) {
    const i = this.activeDays.indexOf(index);
    if (i > -1) {
      this.activeDays.splice(i, 1);
    } else {
      this.activeDays.push(index);
    }
  }

  changeIntervalHours(delta: number) {
    this.intervalHours += delta;
  }

  changeIntervalMinutes(delta: number) {
    this.intervalMinutes += delta;
    if (this.intervalMinutes >= 60) {
        this.intervalMinutes -= 60;
        this.intervalHours += 1;
    } else if (this.intervalMinutes < 0) {
        this.intervalMinutes += 60;
        this.intervalHours = Math.max(0, this.intervalHours - 1);
    }
  }

  changeTimes(delta: number) {
    this.timesPerDay += delta;
  }

  get nextReminderText(): string {
    if (this.activeDays.length === 0 || this.timesPerDay === 0 || (this.intervalHours === 0 && this.intervalMinutes === 0)) {
      return 'No reminders scheduled';
    }

    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    const currentUiDay = currentDay === 0 ? 6 : currentDay - 1;

    const startObj = new Date(this.startTime);
    const endObj = new Date(this.endTime);
    const startHour = startObj.getHours();
    const startMin = startObj.getMinutes();
    const endHour = endObj.getHours();
    const endMin = endObj.getMinutes();

    let nextTime: { day: number, hour: number, min: number } | null = null;

    for (let offset = 0; offset <= 7; offset++) {
      const checkUiDay = (currentUiDay + offset) % 7;
      if (!this.activeDays.includes(checkUiDay)) continue;

      let h = startHour;
      let m = startMin;

      for (let i = 0; i < this.timesPerDay; i++) {
        if (h > endHour || (h === endHour && m > endMin)) break;

        if (offset === 0) {
          if (h > currentHour || (h === currentHour && m >= currentMin)) {
             nextTime = { day: checkUiDay, hour: h, min: m };
             break;
          }
        } else {
          nextTime = { day: checkUiDay, hour: h, min: m };
          break;
        }

        m += this.intervalMinutes;
        h += this.intervalHours;
        if (m >= 60) {
          m -= 60;
          h += 1;
        }
        if (h >= 24) break;
      }

      if (nextTime) break;
    }

    if (!nextTime) return 'No valid upcoming time';

    let nextDate = new Date(now);
    let daysToAdd = (nextTime.day - currentUiDay + 7) % 7;
    if (daysToAdd === 0 && (nextTime.hour < currentHour || (nextTime.hour === currentHour && nextTime.min < currentMin))) {
       daysToAdd = 7;
    }
    nextDate.setDate(nextDate.getDate() + daysToAdd);
    nextDate.setHours(nextTime.hour, nextTime.min, 0, 0);

    const diffMs = nextDate.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const hoursLeft = Math.floor(diffMins / 60);
    const minsLeft = diffMins % 60;
    
    let timeLeftStr = '';
    if (hoursLeft > 0) timeLeftStr += `${hoursLeft}h `;
    if (minsLeft > 0 || hoursLeft === 0) timeLeftStr += `${minsLeft}m`;

    const ampm = nextTime.hour >= 12 ? 'PM' : 'AM';
    const displayHour = nextTime.hour % 12 || 12;
    const displayMin = nextTime.min.toString().padStart(2, '0');
    
    let dayStr = '';
    if (nextTime.day === currentUiDay) dayStr = 'Today';
    else if (nextTime.day === (currentUiDay + 1) % 7) dayStr = 'Tomorrow';
    else dayStr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'][nextTime.day];

    return `${dayStr} at ${displayHour}:${displayMin} ${ampm} (in ${timeLeftStr.trim()})`;
  }

  async saveSettings() {
    await this.waterReminderService.saveSettings({
      activeDays: this.activeDays,
      intervalHours: this.intervalHours,
      intervalMinutes: this.intervalMinutes,
      timesPerDay: this.timesPerDay,
      startTime: this.startTime,
      endTime: this.endTime
    });
    
    const toast = await this.toastCtrl.create({
      message: 'Water reminder settings saved',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
