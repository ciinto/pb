import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogAdminComponent } from './blog-admin.component';
import { PostsComponent } from './pages/posts/posts.component';
import { CreatePostComponent } from './pages/posts/create-post/create-post.component';
import { LoginComponent } from './pages/login/login.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo, canActivate, customClaims } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

const ADMIN_ID = 'eEtqeoAQjAZbJ3ZSgVvTS34wy1f2'

const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['/admincp/login']);
const adminOnly = pipe(customClaims, map(claims => {
  console.log(claims);
  return claims.user_id === ADMIN_ID || ['/admincp/login']
}));

const routes: Routes = [
  {
    path: '',
    ...canActivate(adminOnly),
    redirectTo: "posts"
  },
  {
    path: 'posts',
    component: BlogAdminComponent,
    ...canActivate(adminOnly),
    children: [
      {
        path: '',
        component: PostsComponent
      },
      {
        path: 'create',
        component: CreatePostComponent
      },
      {
        path: 'update/:id',
        component: CreatePostComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  providers: [AngularFireAuthGuard],
  exports: [RouterModule]
})
export class BlogAdminRoutingModule { }
