import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogAdminComponent } from './blog-admin.component';
import { MaterialModuleModule } from 'src/app/shared/material-module/material-module.module';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { PostsModule } from './posts/posts.module';
import { PostsComponent } from './posts/posts.component';


@NgModule({
  declarations: [BlogAdminComponent, BreadCrumbComponent],
  imports: [
    CommonModule,
    MaterialModuleModule,
    PostsModule
  ],
  exports: [
    BlogAdminComponent,
    BreadCrumbComponent,
    PostsComponent
  ]
})
export class BlogAdminModule { }
