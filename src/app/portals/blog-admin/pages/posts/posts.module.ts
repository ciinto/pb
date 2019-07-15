import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsComponent } from './posts.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MaterialModuleModule } from 'src/app/shared/material-module/material-module.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';
import { MarkdownModule, MarkdownService, MarkedOptions } from 'ngx-markdown';
import { FirebaseDataTableModule } from 'src/app/shared/components/firebase-data-table/firebase-data-table.module';

@NgModule({
  declarations: [PostsComponent, CreatePostComponent],
  imports: [
    CommonModule,
    MaterialModuleModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FirebaseDataTableModule,
    MarkdownModule.forChild()
  ],
  providers: [
    PostService,
    MarkdownService,
    MarkedOptions
  ],
  exports: [PostsComponent, CreatePostComponent]
})
export class PostsModule { }
