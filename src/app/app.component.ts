import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'personal-blog';
  items: any

  constructor(db: AngularFirestore) {
    this.items = db.collection('blog').valueChanges();
  }

  ngOnInit(){
    console.debug(this.items)
  }
}
