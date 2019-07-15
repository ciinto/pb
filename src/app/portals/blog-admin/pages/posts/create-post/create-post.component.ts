import { Component, OnInit } from '@angular/core';
import { PostInterface, PostModel } from 'src/app/core/models/post.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  formGroup: FormGroup
  post: PostInterface = {}

  constructor(private formBuilder: FormBuilder, private postService: PostService) { }

  ngOnInit() {
    this.createForm()
  }

  createPost(post: PostInterface) {
    // const postModel = new PostModel(post)
    // this.postService.create(post).subscribe(res => console.debug(res))
    // console.debug(postModel)
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'title': [null, Validators.required],
      'tag': [null, Validators.required],
      'content': [null, Validators.required],
      'author': [null, Validators.required],
    });
  }

}
