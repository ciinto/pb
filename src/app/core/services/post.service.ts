import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PostInterface } from '../models/post.model';
import { from } from 'rxjs';
import { ServiceInterface } from '../interfaces/service.interface';
import * as moment from 'moment';

@Injectable()
export class PostService implements ServiceInterface {

  private collection = 'posts'
  private limit = 10

  private postsCollection: AngularFirestoreCollection<PostInterface>;

  constructor(private readonly afs: AngularFirestore) {
    this.postsCollection = this.afs.collection<PostInterface>(this.collection);
  }

  create(post: PostInterface) {
    const id = this.afs.createId()
    post.createdAt = moment().unix()
    post.updatedAt = moment().unix()
    post.isDeleted = false

    const record = { id, ...post }

    return from(this.postsCollection.doc(id).set(record))
  }

  list(startCreatedAt = null, endCreatedAt = null) {
    return this.afs.collection(this.collection, ref => {
      let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      query = query.where('isDeleted', '==', false).orderBy('createdAt', 'desc')

      if (startCreatedAt) {
        query = query.startAfter(+startCreatedAt)
      }

      if (endCreatedAt) {
        query = query.endBefore(+endCreatedAt)
      }

      query = query.limit(this.limit)

      return query
    }).valueChanges()
  }

  read(id) {
    return this.postsCollection.doc(id).valueChanges()
  }

  update(id, post: PostInterface) {
    post.updatedAt = moment().unix()

    return from(this.postsCollection.doc(id).update(post))
  }

  delete(id) {
    return from(this.postsCollection.doc(id).set({ isDeleted: true }, { merge: true }))
  }
}