import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReorderExercisesPageRoutingModule } from './reorder-exercises-routing.module';

import { ReorderExercisesPage } from './reorder-exercises.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReorderExercisesPageRoutingModule
  ],
  declarations: [ReorderExercisesPage]
})
export class ReorderExercisesPageModule {}
