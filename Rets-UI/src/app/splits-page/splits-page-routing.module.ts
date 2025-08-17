import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplitsPagePage } from './splits-page.page';

const routes: Routes = [
  {
    path: '',
    component: SplitsPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitsPagePageRoutingModule {}
