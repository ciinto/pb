import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogAdminComponent } from './blog-admin.component';
import { MaterialModuleModule } from 'src/app/shared/material-module/material-module.module';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { BlogAdminRoutingModule } from './blog-admin-routing.module';
import { PostsModule } from './pages/posts/posts.module';


@NgModule({
  declarations: [
    BlogAdminComponent,
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    MaterialModuleModule,
    BlogAdminRoutingModule,
    PostsModule,
  ],
  exports: [
    BlogAdminComponent,
    BreadCrumbComponent,
  ]
})
export class BlogAdminModule { }
