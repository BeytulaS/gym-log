import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
import { switchMap, map } from 'rxjs/operators';
import { Workout, Exercise } from './workout.model';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  async addWorkout(data: Workout) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('workouts').add({
      ...data,
      uid: user?.uid,
      exercises: [],
    });
  }

  removeExercise(workoutId: string, exercise: Exercise) {
    return this.db
      .collection('workouts')
      .doc(workoutId)
      .update({
        exercises: firebase.firestore.FieldValue.arrayRemove(exercise),
      });
  }

  getUserWorkouts() {
    return this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.db
            .collection<Workout>('workouts', (ref) =>
              ref.where('uid', '==', user.uid)
            )
            .valueChanges({ idField: 'id' });
        } else {
          return [];
        }
      })
    );
  }
}
