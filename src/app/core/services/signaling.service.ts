import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { RandomName } from '../helpers/random-name.helper';
import * as moment from 'moment';
import { from, Subject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NguoilaoiUserInterface } from '../interfaces/nguoilaoi-user.interface';
import { AngularFireDatabase } from '@angular/fire/database';
import { database } from 'firebase/app';

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

  private roomActiveState = 'ACTIVE'
  private roomSharedState = 'SHARED'
  private roomInactiveState = 'INACTIVE'

  roomsCollectionName = 'chat-rooms'
  collection = 'nguoi-la-onlines'
  connected = false

  roomsCollection
  onlineCollection
  onlinePresence

  myId: string
  myRef: AngularFirestoreDocument
  strangerRef: AngularFirestoreDocument

  myPresence
  myRoomId
  myRoomRef: AngularFirestoreDocument

  find$ = new Subject<"normal" | "gender-male" | "gender-female" | "gender-undefined">()

  constructor(private readonly afs: AngularFirestore, private rdn: RandomName, private db: AngularFireDatabase) {
    this.onlineCollection = this.afs.collection(this.collection);
    this.roomsCollection = this.afs.collection(this.roomsCollectionName);
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

    // find a random stranger
    queryObservable.subscribe(queriedItems => {
      if (this.connected) return false
      console.log(queriedItems)
      const items = queriedItems.filter(n => n.id != this.myId)
      if (items.length > 0) {
        const min = 0,
          max = Math.floor(items.length - 1),
          randomStranger = Math.floor(Math.random() * (max - min + 1)) + min;

        this.strangerRef = this.onlineCollection.doc(items[randomStranger].id)

        this.myRoomId = this.afs.createId()

        this.strangerRef.set({ connected: true, room: this.myRoomId }, { merge: true })
        this.myRef.set({ connected: true, room: this.myRoomId }, { merge: true })

        this.connected = true
      }

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
        this.onlinePresence.set(id, { state: 'ONLINE', lastChanged: database.ServerValue.TIMESTAMP })
        this.myPresence = this.db.object(`${this.collection}/${id}`)
        this.myPresence.query.ref.onDisconnect().set({ state: 'OFFLINE', lastChanged: database.ServerValue.TIMESTAMP })
      }),
      map(() => {
        this.myRef.valueChanges().subscribe(ref => {
          const { id, name } = ref

          if (ref.connected && ref.room !== null) {
            this.myRoomRef = this.roomsCollection.doc(ref.room)

            this.myRoomRef.set({ state: this.roomActiveState })

            this.myRoomRef.collection('users').doc(id).set({ id, name })

            this.myRoomRef.valueChanges().subscribe(ref => {
              if (ref.state === this.roomInactiveState) {
                this.myRef.set({ connected: false, room: null }, { merge: true })
              }
            })
          }
        })
      }),
      map(() => {
        return this.myRef.valueChanges()
      })
    )
  }

  leaveRoom() {
    from(this.myRoomRef.set({ state: this.roomInactiveState })).subscribe(ref => {
      console.log(ref)
      
      this.connected = false
    })
  }

  offline() {
    console.log('offline');
    return this.myPresence.query.ref.set({ state: 'OFFLINE', lastChanged: database.ServerValue.TIMESTAMP })
  }
}