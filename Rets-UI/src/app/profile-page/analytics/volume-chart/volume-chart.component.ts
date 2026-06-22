import { AfterViewInit, Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip } from 'chart.js';
import { workoutSession } from '../../../services/workoutSession.service';
import { IonicModule } from "@ionic/angular";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip
);

export type VolumeRange = | '7d' | '30d' | 'all';


@Component({
  selector: 'app-volume-chart',
  templateUrl: './volume-chart.component.html',
  imports: [IonicModule]
})

export class VolumeChartComponent implements AfterViewInit {

  private ranges: VolumeRange[] = [
    '7d',
    '30d',
    'all'
  ];

  private chart?: Chart;

  @ViewChild('volumeCanvas')
  volumeCanvas!: ElementRef<HTMLCanvasElement>;

  private _workoutSessions: workoutSession[] = [];
  private viewInitialized = false;
  selectedRange: VolumeRange = '7d';

  @Input()
  set workoutSessions(value: workoutSession[]) {
    this._workoutSessions = value.reverse();
    if (this.viewInitialized && value.length) {
      this.initChart();
    }
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    if (this._workoutSessions.length) {
      this.initChart();
    }
  }

  private initChart(): void {
    // console.log('Initializing volume chart with sessions:', this._workoutSessions);
    const filtered = this.getFilteredSessions(this.selectedRange);
    const labels = this.buildLabels(filtered);
    const volumeData = this.buildVolumeData(filtered);
    
    this.chart?.destroy();
    this.chart = new Chart(
      this.volumeCanvas.nativeElement,
      {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Volume',
              data: volumeData,
              borderColor: '#3880ff',
              borderWidth: 2,
              tension: 0.4,
              fill: true,
              backgroundColor: 'rgba(56,128,255,0.15)',
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          interaction: {
            intersect: false,
          },
          scales: {
            x: {
              display: false,
              title: {
                display: false,
                text: 'Workout Date'
              }
            },
            y: {
              title: {
                display: false,
                text: 'Volume (kg)'
              }
            }
          }
        }
      }
    );
  }

  get rangeTitle(): string {
    switch (this.selectedRange) {
      case '7d':
        return '7 Days';

      case '30d':
        return '30 Days';

      case 'all':
        return 'All Time';
    }
  }

  nextRange(): void {
    const currentIndex = this.ranges.indexOf(this.selectedRange);
    const nextIndex = (currentIndex + 1) % this.ranges.length;
    this.selectedRange = this.ranges[nextIndex];
    this.updateChart();
  }

  prevRange(): void {
    const currentIndex = this.ranges.indexOf(this.selectedRange);
    const prevIndex = currentIndex === 0 ? this.ranges.length - 1 : currentIndex - 1;
    this.selectedRange = this.ranges[prevIndex];
    this.updateChart();
  }

  updateChart(): void {
    if (!this.chart) return;
    const filtered = this.getFilteredSessions(this.selectedRange);
    this.chart.data.labels = this.buildLabels(filtered);
    this.chart.data.datasets[0].data = this.buildVolumeData(filtered);
    this.chart.update();
  }

  private buildLabels( sessions: workoutSession[] ): string[] {
    return sessions.map(session =>
      `${new Date(
        session.startTime
      ).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      })} • ${session.split.splitName}`
    );
  }

  private buildVolumeData( sessions: workoutSession[] ): number[] {
    return sessions.map(session =>
      session.exerciseLogs.reduce((total, log) => total + (log.weight * log.reps), 0)
    );
  }

  private getFilteredSessions(range: VolumeRange): workoutSession[] {
    const today = new Date();
    switch (range) {
      case '7d':
        return this._workoutSessions.filter(session => {
          const diff =
            today.getTime() -
            new Date(session.startTime).getTime();
          return diff <= 7 * 24 * 60 * 60 * 1000;
        });

      case '30d':
        return this._workoutSessions.filter(session => {
          const diff =
            today.getTime() -
            new Date(session.startTime).getTime();
          return diff <= 30 * 24 * 60 * 60 * 1000;
        });

      default:
        return this._workoutSessions;
    }
  }
}