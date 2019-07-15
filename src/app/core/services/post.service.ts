import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PostInterface } from '../models/post.model';
import { from } from 'rxjs';

@Injectable()
export class PostService {
  private postsCollection: AngularFirestoreCollection<PostInterface>;

  constructor(private readonly afs: AngularFirestore) {
    this.postsCollection = afs.collection<PostInterface>('posts');
  }

  create(post: PostInterface) {
    return from(this.postsCollection.add(post))
  }

  list(){
    return this.postsCollection.valueChanges()
  }
}