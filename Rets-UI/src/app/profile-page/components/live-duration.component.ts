import { Component, Input, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-live-duration',
  template: `{{ formattedTime }}`,
  styles: [`:host { display: inline; }`],
  standalone: false
})
export class LiveDurationComponent implements OnInit, OnDestroy {
  @Input() start!: number;
  @Input() status!: string | number;
  @Input() duration?: number;

  private currentMs: number = 0;
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {}

  get formattedTime(): string {
    if (this.currentMs < 1000) {
      return `${Math.floor(this.currentMs)} ms`;
    } else {
      return `${(this.currentMs / 1000).toFixed(2)} s`;
    }
  }

  ngOnInit() {
    this.update();
    if (this.status === 'PENDING') {
      this.intervalId = setInterval(() => {
        this.update();
        this.cdr.markForCheck();
      }, 50);
    }
  }

  ngOnChanges() {
    this.update();
    if (this.status !== 'PENDING' && this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private update() {
    if (this.status === 'PENDING') {
      this.currentMs = Date.now() - this.start;
    } else {
      this.currentMs = this.duration || (Date.now() - this.start);
    }
  }
}
