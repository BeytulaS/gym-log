import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
import { Routine } from './routine.model';

@Injectable({
  providedIn: 'root',
})
export class RoutinesServiceService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  getAllRoutines() {
    return this.db
      .collection<Routine>('routines')
      .valueChanges({ idField: 'id' });
  }
}
