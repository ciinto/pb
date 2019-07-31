import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/core/services/post.service';
import { PostInterface, PostModel } from 'src/app/core/models/post.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Observable<PostInterface[]>
  postModel = PostModel
  startCreatedAt
  endCreatedAt

  constructor(private postService: PostService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(value => {
      this.startCreatedAt = value.next
      this.endCreatedAt = value.prev
    })
  }

  ngOnInit() {
  }

}
