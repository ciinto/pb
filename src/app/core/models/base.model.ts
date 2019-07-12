import { BaseModelInterface } from '../interfaces/base-model.interface';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { from } from 'rxjs';

export class BaseModel implements BaseModelInterface {

  private collectionObj: AngularFireObject<any>;
  public collection: string

  constructor(db: AngularFireDatabase) {
    this.collectionObj = db.object(this.collection);
  }

  list() { return this.collectionObj.valueChanges() }

  get() { return this.collectionObj.snapshotChanges() }

  create(obj) { return from(this.collectionObj.set(obj)) }

  update(obj) { return from(this.collectionObj.update(obj)) }

  delete() { return from(this.collectionObj.remove()) }
}