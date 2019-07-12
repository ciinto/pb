import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsComponent } from './posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MaterialModuleModule } from 'src/app/shared/material-module/material-module.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PostsComponent, CreatePostComponent],
  imports: [
    CommonModule,
    MaterialModuleModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  exports: [PostsComponent, CreatePostComponent]
})
export class PostsModule { }
