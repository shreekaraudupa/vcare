import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { resolve } from 'dns';
import { Observable } from 'rxjs';
//import { userInfo } from 'os';

export interface Patient {
	patientName: string;
	age: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

	username: string = ""
	name: string = ""
	email: string = ""
	phone: string = ""
	address: string = ""
	dob: string = ""
	question: string = ""
	answer: string = ""
	hospital: string = ""
	password: string = ""
	cpassword: string = ""
	private patientCollection: AngularFirestoreCollection<Patient>;
	patient: Observable<Patient[]>;


	constructor(
		public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public user: UserService,
		public alertController: AlertController,
		public router: Router
		) { 
			
		}

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

	async register() {
		const { username,name,email,phone,address,dob,question,answer,hospital,password,cpassword} = this
		if(password !== cpassword) {
			return console.error("Passwords don't match")
		}

		try {
			const res = await this.afAuth.auth.createUserWithEmailAndPassword(email, password)

			this.afstore.doc(`users/${email}`).set({
				name,email,phone,address,dob,question,answer,hospital
			})
			this.username = email;
		
			this.user.setUser({
				username,
				uid: res.user.uid
			})

			this.presentAlert('Success', 'You are registered!')
			this.router.navigate(['/dashboard'])

		} catch(error) {
			this.presentAlert('Alert' , error)
		}
	}

}
