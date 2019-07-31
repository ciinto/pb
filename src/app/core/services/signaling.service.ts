import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { RandomName } from '../helpers/random-name.helper';
import * as moment from 'moment';
import { from, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NguoilaoiUserInterface } from '../interfaces/nguoilaoi-user.interface';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable()
export class SignalingService {
  private servers = {
    'iceServers': [{
      "urls": [
        "turn:13.250.13.83:3478?transport=udp"
      ],
      "username": "YzYNCouZM1mhqhmseWk6",
      "credential": "YzYNCouZM1mhqhmseWk6"
    }, {
      "urls": 'turn:numb.viagenie.ca',
      "credential": 'muazkh',
      "username": 'webrtc@live.com'
    }]
  }

  collection = 'nguoi-la-onlines'

  onlineCollection
  onlinePresence

  myId: string
  myRef: AngularFirestoreDocument
  myPresence

  strangerRef: AngularFirestoreDocument

  find$ = new Subject<"normal" | "gender-male" | "gender-female" | "gender-undefined">()

  constructor(private readonly afs: AngularFirestore, private rdn: RandomName, private db: AngularFireDatabase) {
    this.onlineCollection = this.afs.collection(this.collection);
    this.onlinePresence = this.db.list(this.collection)

    const queryObservable = this.find$.pipe(
      switchMap(type =>
        this.afs.collection(this.collection, ref => {
          console.log(type);
          let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

          switch (type) {
            case 'normal':
              query = query.where('connected', '==', false)
              break;
            case 'gender-male':
              query = query.where('gender', '==', "male")
              break;
            case 'gender-female':
              query = query.where('gender', '==', "female")
              break;
            case 'gender-undefined':
              query = query.where('gender', '==', "undefined")
              break;
            default:
              query = query.where('connected', '==', false)
              break;
          }

          return query

        }).valueChanges()
      )
    );

    // subscribe to changes
    queryObservable.subscribe(queriedItems => {
      console.log(queriedItems)

      // const items = queriedItems.filter(n => n.id != this.myId)
      // const min = 0,
      //   max = Math.floor(items.length - 1),
      //   randomStranger = Math.floor(Math.random() * (max - min + 1)) + min;


      // this.strangerRef = this.onlineCollection.doc(items[randomStranger].id)

      // this.strangerRef.set({ connected: true }, { merge: true })
      // this.myRef.set({ connected: true }, { merge: true })
    });

  }

  online() {
    this.myId = this.afs.createId()
    const
      id = this.myId,
      name = this.rdn.getRandomName(),
      loginAt = moment().unix(),
      connected = false,
      record: NguoilaoiUserInterface = { id, name, loginAt, connected }

    this.myRef = this.onlineCollection.doc(id)

    return from(this.myRef.set(record)).pipe(
      map(() => {
        console.log(id);
        this.onlinePresence.set(id, { status: 'ONLINE' })
        this.myPresence = this.db.object(`${this.collection}/${id}`)
        this.myPresence.query.ref.onDisconnect().remove()
      }),
      map(() => {
        return this.myRef.valueChanges()
      })
    )
  }

  offline() {
    console.log('offline');

    return from(this.myRef.delete())
  }
}