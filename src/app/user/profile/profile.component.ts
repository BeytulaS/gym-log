import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkoutService } from 'src/app/features/workout.service';
import { Workout } from 'src/app/features/workout.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  workouts!: Workout[];
  sub!: Subscription;
  constructor(public workoutService: WorkoutService) {}

  ngOnInit() {
    this.sub = this.workoutService
      .getUserWorkouts()
      .subscribe((workouts) => (this.workouts = workouts));
  }

  workoutsLength = this.workouts.length;

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
