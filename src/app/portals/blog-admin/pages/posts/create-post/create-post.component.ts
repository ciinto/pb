import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostInterface, PostModel } from 'src/app/core/models/post.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  formGroup: FormGroup
  postId: string
  actionBtn = 'Create'
  submitAct: void

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');

    if (this.postId) {
      this.actionBtn = 'Update'
      this.submitAct = this.updatePost.bind(this)
      this.postService.read(this.postId).subscribe(value => {
        this.createForm(value)
      })
    } else {
      this.submitAct = this.createPost.bind(this)
    }

    this.createForm()

  }

  ngOnDestroy() {
  }

  updatePost(post: PostInterface) {
    this.postService.update(this.postId, post).subscribe(res => {
      this.router.navigate(['/admincp/posts'])
    })
  }

  createPost(post: PostInterface) {
    post.createdAt = moment().unix()
    post.updatedAt = moment().unix()
    
    this.postService.create(post).subscribe(res => {
      this.router.navigate(['/admincp/posts'])
    })
  }

  createForm(updatePost: PostInterface = {}) {
    let { title, tag, content, author } = updatePost

    this.formGroup = this.formBuilder.group({
      'title': [title, Validators.required],
      'tag': [tag, Validators.required],
      'content': [content, Validators.required],
      'author': [author, Validators.required],
    });
  }

}
