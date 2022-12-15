import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-workout-dialog',
  template: `
    <h1 mat-dialog-title>Workout</h1>
    <div mat-dialog-content>
      <p>Workout title</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancel</button>
    </div>
  `,
  styles: [],
})
export class WorkoutDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<WorkoutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
