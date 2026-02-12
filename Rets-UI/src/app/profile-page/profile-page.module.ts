import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePagePageRoutingModule } from './profile-page-routing.module';

import { ProfilePagePage } from './profile-page.page';
import { LiveDurationComponent } from './components/live-duration.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePagePageRoutingModule
  ],
  declarations: [ProfilePagePage, LiveDurationComponent]
})
export class ProfilePagePageModule {}
