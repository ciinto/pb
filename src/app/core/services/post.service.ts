import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { PostInterface } from '../models/post.model';
import { from } from 'rxjs';
import { ServiceInterface } from '../interfaces/service.interface';

@Injectable()
export class PostService implements ServiceInterface {
  private postsCollection: AngularFirestoreCollection<PostInterface>;
  private postDoc: AngularFirestoreDocument<PostInterface>;

  constructor(private readonly afs: AngularFirestore) {
    this.postsCollection = this.afs.collection<PostInterface>('posts');
  }

  create(post: PostInterface) {
    const id = this.afs.createId()
    const record = { id, ...post }

    return from(this.postsCollection.doc(id).set(record))
  }

  list() {
    return this.postsCollection.valueChanges()
  }

  read(id) {
    return this.postsCollection.doc(id).valueChanges()
  }

  update(id, obj) {
    return from(this.postsCollection.doc(id).update(obj))
  }

  delete(id) {
    return from(this.postsCollection.doc(id).delete())
  }
}