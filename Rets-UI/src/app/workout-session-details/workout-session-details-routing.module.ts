import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkoutSessionDetailsPage } from './workout-session-details.page';

const routes: Routes = [
  {
    path: '',
    component: WorkoutSessionDetailsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkoutSessionDetailsPageRoutingModule {}
