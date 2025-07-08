import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'create-split',
    loadChildren: () => import('./create-split/create-split.module').then( m => m.CreateSplitPageModule)
  },
  {
    path: 'create-split',
    loadChildren: () => import('./create-split/create-split.module').then( m => m.CreateSplitPageModule)
  },
  {
    path: 'create-split',
    loadComponent: () => import('./create-split/create-split.page').then(m => m.CreateSplitPage)
  },
  {
    path: 'start-workout',
    loadChildren: () => import('./start-workout/start-workout.module').then( m => m.StartWorkoutPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
