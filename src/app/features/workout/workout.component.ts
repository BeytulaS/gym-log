import { Component, Input, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.scss'],
})
export class WorkoutComponent {
  @Input() workout: any;

  constructor(private workoutService: WorkoutService) {}
}
