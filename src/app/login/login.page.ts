import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	username:string = ""
	email: string = ""
	password: string = ""

	constructor(public afAuth: AngularFireAuth, public user: UserService, public router: Router,public alertController: AlertController,
		public modalController: ModalController) { 
		}

	ngOnInit() {
		if(this.user.isAuthenticated()){
			this.router.navigate(['/dashboard']);
		}
		this.reset();
	}

	async resetPassword() {
		const modal = await this.modalController.create({
		  component: 'ModalPage',
		  componentProps: { value: 123 }
		});
		return await modal.present();
	  }

	async presentAlert(title: string, content: string) {
		const alert = await this.alertController.create({
			header: title,
			message: content,
			buttons: ['OK']
		})

		await alert.present()
	}

	async reset(){
		this.email = "";
		this.password = "";
	}

	async login() {
		const { username, email, password } = this
		try {
			// kind of a hack. 
			const res = await this.afAuth.auth.signInWithEmailAndPassword(email , password)
			this.username=email
			if(res.user) {
				this.user.setUser({
					username,
					uid: res.user.uid
				})
				this.router.navigate(['/dashboard'])
			}
		
		} catch(err) {
			if(err.code === "auth/user-not-found") {
				this.presentAlert("Alert","Wrong combination of email and password");
				this.reset();
			}
		}
	}

}
