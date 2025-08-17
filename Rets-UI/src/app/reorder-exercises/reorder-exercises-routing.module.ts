import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReorderExercisesPage } from './reorder-exercises.page';

const routes: Routes = [
  {
    path: '',
    component: ReorderExercisesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReorderExercisesPageRoutingModule {}
