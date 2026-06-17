import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'homepage',
        loadChildren: () => import('../home-page/home-page.module').then(m => m.HomePagePageModule)
      },
      {
        path: 'splits',
        loadChildren: () => import('../splits-page/splits-page.module').then(m => m.SplitsPagePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile-page/profile-page.module').then(m => m.ProfilePagePageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/homepage',
        pathMatch: 'full'
      }
    ] 
  },
  {
    path: '',
    redirectTo: '/tabs/homepage',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
