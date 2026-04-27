import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaterReminderPage } from './water-reminder.page';

const routes: Routes = [
  {
    path: '',
    component: WaterReminderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaterReminderPageRoutingModule {}
