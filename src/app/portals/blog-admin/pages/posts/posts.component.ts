import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { PostInterface } from 'src/app/core/models/post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'tag', 'author', 'id'];
  posts: Observable<PostInterface[]>

  constructor(private postService: PostService) {
    this.posts = this.postService.list()
   }

  ngOnInit() {
  }

}
