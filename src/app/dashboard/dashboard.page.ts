import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(public router: Router,public afAuth: AngularFireAuth,public user: UserService) {

   }

  ngOnInit() {
  }

  async registerUser(){

    this.router.navigate(['/register'])
  }

  async registerPatient(){

    this.router.navigate(['/registerPatient'])
  }

  async searchPatient(){

    this.router.navigate(['/searchPatient'])
  }

  async logout(){
    this.afAuth.auth.signOut().then(() => {
      this.user.setUser(null);
      this.router.navigate(['/login']);
  });
  }

}
