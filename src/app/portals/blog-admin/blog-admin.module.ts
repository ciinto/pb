import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogAdminComponent } from './blog-admin.component';
import { MaterialModuleModule } from 'src/app/shared/material-module/material-module.module';
import { BreadCrumbComponent } from './bread-crumb/bread-crumb.component';
import { BlogAdminRoutingModule } from './blog-admin-routing.module';
import { PostsModule } from './pages/posts/posts.module';
import { LoginModule } from './pages/login/login.module';
import { AngularFireAuth } from '@angular/fire/auth';


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
    LoginModule
  ],
  providers: [AngularFireAuth],
  exports: [
    BlogAdminComponent,
    BreadCrumbComponent,
  ]
})
export class BlogAdminModule { }
