import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Timestamp } from 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-workout-dialog',
  template: `
    <h1 mat-dialog-title>Add Workout</h1>
    <div mat-dialog-content>
      <form [formGroup]="workoutForm" (ngSubmit)="onSubmit()">
        <mat-form-field>
          <input matInput placeholder="Workout Title" formControlName="title" />
        </mat-form-field>

        <div formArrayName="exercises">
          <div
            *ngFor="let exercise of exerciseForms.controls; let i = index"
            [formGroupName]="i"
          >
            <mat-form-field>
              <input
                matInput
                placeholder="Exercise"
                formControlName="exercise_title"
              />
            </mat-form-field>
            <mat-form-field>
              <input
                type="number"
                value="0"
                matInput
                placeholder="Sets"
                formControlName="sets"
              />
            </mat-form-field>
            <mat-form-field>
              <input
                type="number"
                value="0"
                matInput
                placeholder="Reps"
                formControlName="reps"
              />
            </mat-form-field>
            <mat-form-field>
              <input
                type="number"
                value="0"
                matInput
                placeholder="Weight"
                formControlName="weight"
              />
            </mat-form-field>

            <button mat-raised-button color="warn" (click)="deleteExercise(i)">
              Delete
            </button>
          </div>
        </div>
        <button mat-raised-button color="primary" (click)="addExercise()">
          Add Exercise
        </button>
      </form>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button
        mat-button
        [disabled]="workoutForm.invalid"
        color="primary"
        (click)="onSubmit()"
      >
        Submit
      </button>
    </div>
  `,
  styles: [],
})
export class WorkoutDialogComponent implements OnInit {
  workoutForm!: FormGroup;
  loading = false;
  serverMessage = '';

  currentDateTimestamp = Timestamp.fromDate(new Date());

  constructor(
    public dialogRef: MatDialogRef<WorkoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.workoutForm = this.fb.group({
      title: ['', [Validators.required]],
      date: [this.currentDateTimestamp, [Validators.required]],
      exercises: this.fb.array([], Validators.required),
    });
  }

  get exerciseForms() {
    return this.workoutForm.get('exercises') as FormArray;
  }

  addExercise() {
    const exercise = this.fb.group({
      exercise_title: ['', [Validators.required]],
      sets: [
        null,
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
      reps: [
        null,
        [Validators.required, Validators.min(1), Validators.max(99)],
      ],
      weight: [
        null,
        [Validators.required, Validators.min(1), Validators.max(9000)],
      ],
    });

    this.exerciseForms.push(exercise);
  }

  deleteExercise(i: any) {
    this.exerciseForms.removeAt(i);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit() {
    this.loading = true;
    const formValue = this.workoutForm.value;
    const user = await this.afAuth.currentUser;

    try {
      await this.db.collection('workouts').add({
        ...formValue,
        uid: user?.uid,
      });
    } catch (err) {
      console.error(err);
    }
    this.loading = false;
  }
}
