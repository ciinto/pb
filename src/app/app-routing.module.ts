import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogAdminComponent } from './pages/blog-admin/blog-admin.component';
import { BlogAdminModule } from './pages/blog-admin/blog-admin.module';


const routes: Routes = [
  {path: 'admincp', component: BlogAdminComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),

    BlogAdminModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
