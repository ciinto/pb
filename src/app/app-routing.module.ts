import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NguoilaoiComponent } from './portals/nguoilaoi/nguoilaoi.component';

const routes: Routes = [
  {
    path: 'admincp',
    loadChildren: './portals/blog-admin/blog-admin.module#BlogAdminModule'
  },
  {
    path: 'nguoilaoi',
    component: NguoilaoiComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
