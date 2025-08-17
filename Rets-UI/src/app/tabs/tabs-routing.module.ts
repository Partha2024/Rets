import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

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
        loadChildren: () => import('../splits-page/splits-page-routing.module').then(m => m.SplitsPagePageRoutingModule)
      },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('../profile-page/profile-page-routing.module').then(m => m.ProfilePagePageRoutingModule)
      // },
      {
        path: 'profile',
        loadChildren: () => import('../reorder-exercises/reorder-exercises-routing.module').then(m => m.ReorderExercisesPageRoutingModule)
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
