import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkoutDialogComponent } from '../dialogs/workout-dialog.component';
import { Subscription } from 'rxjs';
import { Workout } from '../workout.model';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.scss'],
})
export class JournalComponent implements OnInit, OnDestroy {
  workouts!: Workout[];
  sub!: Subscription;

  constructor(
    public dialog: MatDialog,
    public workoutService: WorkoutService
  ) {}

  ngOnInit() {
    this.sub = this.workoutService
      .getUserWorkouts()
      .subscribe((workouts) => (this.workouts = workouts));
  }

  openWorkoutDialog(): void {
    const dialogRef = this.dialog.open(WorkoutDialogComponent, {
      width: '400px',
      data: {},
    });

    dialogRef.afterClosed().subscribe();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
