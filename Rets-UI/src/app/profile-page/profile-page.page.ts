import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiTimingService, ApiTiming } from '../services/timing.service';
import { CacheService } from '../services/cache.service';
import { ToastController } from '@ionic/angular';
import { WorkoutService, workoutSession } from '../services/workoutSession.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.page.html',
  styleUrls: ['./profile-page.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class ProfilePagePage implements OnInit {
  timings$!: Observable<ApiTiming[]>;
  isClearingCache = false;

  currentMonthDate: Date = new Date();
  weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  calendarDays: { date: number | null, level: number }[] = [];
  workoutSessions: workoutSession[] = [];

  constructor(
    private timingService: ApiTimingService,
    private cacheService: CacheService,
    private workoutService: WorkoutService,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.timings$ = this.timingService.timings$;
    this.loadWorkoutSessions();
  }

  loadWorkoutSessions() {
    this.workoutService.getWorkoutSessions().subscribe({
      next: (sessions) => {
        this.workoutSessions = sessions;
        this.generateCalendar();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load workout sessions', err);
      }
    });
  }

  get hasPrevMonth(): boolean {
    const startOfCurrentMonth = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth(), 1);
    return this.workoutSessions.some(s => new Date(s.startTime) < startOfCurrentMonth);
  }

  get hasNextMonth(): boolean {
    const startOfNextMonth = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth() + 1, 1);
    return this.workoutSessions.some(s => new Date(s.startTime) >= startOfNextMonth);
  }

  prevMonth() {
    if (this.hasPrevMonth) {
      this.currentMonthDate = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth() - 1, 1);
      this.generateCalendar();
    }
  }

  nextMonth() {
    if (this.hasNextMonth) {
      this.currentMonthDate = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth() + 1, 1);
      this.generateCalendar();
    }
  }

  generateCalendar() {
    this.calendarDays = [];
    const year = this.currentMonthDate.getFullYear();
    const month = this.currentMonthDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Fill empty padding days before the 1st of the month
    for (let i = 0; i < firstDayIndex; i++) {
       this.calendarDays.push({ date: null, level: 0 });
    }

    // Fill the actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
        const currentDateStr = new Date(year, month, i).toDateString();
        
        // Find sessions for this day
        const sessionsToday = this.workoutSessions.filter(session => {
            const sessionDateStr = new Date(session.startTime).toDateString();
            return sessionDateStr === currentDateStr;
        });

        // Determine level based on presence of sessions (single color logic)
        let level = 0;
        if (sessionsToday.length > 0) {
           level = 1;
        }

        this.calendarDays.push({ date: i, level });
    }
    
    this.cdr.markForCheck();
  }

  async clearCache() {
    this.isClearingCache = true;
    this.cdr.markForCheck();
    
    this.cacheService.clearCache().subscribe({
      next: async () => {
        const toast = await this.toastController.create({
          message: 'Cache cleared successfully.',
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.isClearingCache = false;
        this.cdr.markForCheck();
      },
      error: async () => {
        const toast = await this.toastController.create({
          message: 'Failed to clear cache.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
        this.isClearingCache = false;
        this.cdr.markForCheck();
      }
    });
  }
}
