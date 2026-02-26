import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkoutSessionDetailsPageRoutingModule } from './workout-session-details-routing.module';

import { WorkoutSessionDetailsPage } from './workout-session-details.page';
import { MuscleHeatmapComponent } from './components/muscle-heatmap/muscle-heatmap.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkoutSessionDetailsPageRoutingModule,
  ],
  declarations: [WorkoutSessionDetailsPage, MuscleHeatmapComponent],
})
export class WorkoutSessionDetailsPageModule {}
