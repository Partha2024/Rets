import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSplitPage } from './create-split.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSplitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSplitPageRoutingModule {}
