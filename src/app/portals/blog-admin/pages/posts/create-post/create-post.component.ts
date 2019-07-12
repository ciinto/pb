import { Component, OnInit } from '@angular/core';
import { PostInterface } from 'src/app/core/models/post.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  formGroup: FormGroup
  post: PostInterface = {}

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm()
  }

  createPost(post: PostInterface) {
    console.debug(post)
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
