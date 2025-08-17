import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplitsPagePageRoutingModule } from './splits-page-routing.module';

import { SplitsPagePage } from './splits-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplitsPagePageRoutingModule
  ],
  declarations: [SplitsPagePage]
})
export class SplitsPagePageModule {}
