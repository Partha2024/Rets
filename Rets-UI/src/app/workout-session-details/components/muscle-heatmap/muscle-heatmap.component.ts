import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export type MuscleRegion =
  | 'chest'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'core'
  | 'quads'
  | 'hamstrings'
  | 'calves'
  | 'back';

@Component({
  selector: 'app-muscle-heatmap',
  templateUrl: './muscle-heatmap.component.html',
  styleUrls: ['./muscle-heatmap.component.scss'],
  standalone: false,
})
export class MuscleHeatmapComponent implements OnChanges {
  @Input() heatmap: Partial<Record<MuscleRegion, number>> = {};
  @Input() title = 'Targeted Muscles';
  @Input() subtitle = 'Heat intensity based on set count.';

  private maxValue = 1;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['heatmap']) {
      const values = Object.values(this.heatmap || {});
      this.maxValue = Math.max(...values, 1);
    }
  }

  getOpacity(region: MuscleRegion) {
    const value = this.heatmap?.[region] ?? 0;
    if (value <= 0) {
      return 0.08;
    }
    return 0.15 + (value / this.maxValue) * 0.75;
  }
}
