import { AngularFireObject, AngularFireDatabase } from '@angular/fire/database';
import { from } from 'rxjs';

export class FirebaseService{

  private collectionObj: AngularFireObject<any>;

  constructor(public collection: string, private db: AngularFireDatabase) {
    this.collectionObj = db.object(this.collection);
  }

  list() { return this.collectionObj.valueChanges() }

  get() { return this.collectionObj.snapshotChanges() }

  create(obj) { return from(this.collectionObj.set(obj)) }

  update(obj) { return from(this.collectionObj.update(obj)) }

  delete() { return from(this.collectionObj.remove()) }
}