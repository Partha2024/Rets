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
  },
  {
    path: 'home-page',
    loadChildren: () => import('./home-page/home-page.module').then( m => m.HomePagePageModule)
  },
  {
    path: 'splits-page',
    loadChildren: () => import('./splits-page/splits-page.module').then( m => m.SplitsPagePageModule)
  },
  {
    path: 'profile-page',
    loadChildren: () => import('./profile-page/profile-page.module').then( m => m.ProfilePagePageModule)
  },
  {
    path: 'reorder-exercises',
    loadChildren: () => import('./reorder-exercises/reorder-exercises.module').then( m => m.ReorderExercisesPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
