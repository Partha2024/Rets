import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaterReminderPageRoutingModule } from './water-reminder-routing.module';

import { WaterReminderPage } from './water-reminder.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaterReminderPageRoutingModule
  ],
  declarations: [WaterReminderPage]
})
export class WaterReminderPageModule {}
