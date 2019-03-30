import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { auth } from 'firebase/app'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
//import { resolve } from 'dns';
import { Observable } from 'rxjs';

export interface Patient {
	patientName: string;
	age: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  private patientCollection: AngularFirestoreCollection<Patient>;
  patient: Observable<Patient[]>;
  patientName: string;
  searchEnabled: boolean = false;
  constructor(
    public afAuth: AngularFireAuth,
		public afstore: AngularFirestore,
		public alertController: AlertController,
		public router: Router) {
   }

  ngOnInit() {
  }

async searchPatient(){
  
      this.searchEnabled = true;
      this.patientCollection = this.afstore.collection<Patient>('patients');
      this.patient = this.patientCollection.valueChanges();
}

checkPatients(sourcePatient: string, destPatient: string){
  if(destPatient.indexOf(sourcePatient) !== -1)
    return true;
  return false;
}







}
