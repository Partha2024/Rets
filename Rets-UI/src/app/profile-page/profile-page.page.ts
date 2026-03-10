import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiTimingService, ApiTiming } from '../services/timing.service';
import { CacheService } from '../services/cache.service';
import { ToastController } from '@ionic/angular';

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

  constructor(
    private timingService: ApiTimingService,
    private cacheService: CacheService,
    private toastController: ToastController,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.timings$ = this.timingService.timings$;
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
