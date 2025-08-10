import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ReplaceExerciseModal } from './replace-exercise.component';

@NgModule({
  declarations: [ReplaceExerciseModal],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ReplaceExerciseModal]
})
export class ReplaceExerciseModule {}
