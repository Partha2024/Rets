import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSplitPageRoutingModule } from './create-split-routing.module';

import { CreateSplitPage } from './create-split.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSplitPageRoutingModule
  ],
  declarations: [CreateSplitPage]
})
export class CreateSplitPageModule {}
