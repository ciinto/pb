import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  login(provider) {
    switch (provider) {
      case "google":
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(u => {
          this.router.navigate(['admincp'])
        });
        break
      default:
        this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
        break
    }
  }
}
