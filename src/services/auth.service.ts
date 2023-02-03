import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { USER_GOOGLE_ID_TOKEN } from '../shared/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
    private router: Router
  ) { }

  signInWithGoogle() {
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then((res) => {
      this.router.navigate(['clock']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
      let t = JSON.parse(JSON.stringify(res.additionalUserInfo));
      console.log(`login result ${t.profile.id}`);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
      localStorage.setItem(USER_GOOGLE_ID_TOKEN, JSON.stringify(t.profile.id));
    },
      error => {
        alert(`signin failed : ${error}`);
      }

    )
  }
}
