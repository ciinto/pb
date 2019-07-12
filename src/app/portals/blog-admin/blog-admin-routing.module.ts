import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogAdminComponent } from './blog-admin.component';
import { PostsComponent } from './pages/posts/posts.component';
import { CreatePostComponent } from './pages/posts/create-post/create-post.component';

const routes: Routes = [
  {
    path: 'posts',
    component: BlogAdminComponent,
    children: [
      {
        path: '',
        component: PostsComponent
      },
      {
        path: 'create',
        component: CreatePostComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class BlogAdminRoutingModule { }
