import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProfilePagePageRoutingModule } from './profile-page-routing.module';
import { ProfilePagePage } from './profile-page.page';
import { LiveDurationComponent } from './components/live-duration.component';
import { VolumeChartComponent } from './analytics/volume-chart/volume-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePagePageRoutingModule,
    VolumeChartComponent
  ],
  declarations: [ProfilePagePage, LiveDurationComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilePagePageModule {}
