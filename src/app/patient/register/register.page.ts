import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  name: string = ""
	fileNo: string = ""
	age: number
	sex: string = ""
	cancer: string = ""
	state: string = ""
	hospital: string = ""
	date: string = ""
	ward: string = ""
  
  constructor(
    public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public alertController: AlertController,
		public router: Router
  ) { }

  ngOnInit() {
  }

  async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

  async addPatient(){
    const { name,fileNo,age,sex,cancer,state,hospital,date,ward } = this
    this.afstore.doc(`patients/${fileNo}`).set({
      name,fileNo,age,sex,cancer,state,hospital,date,ward
    })
    this.presentAlert('Success', 'Patient added successfully!')
    this.router.navigate(['/dashboard'])
  }
}
