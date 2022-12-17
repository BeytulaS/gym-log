import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { JournalComponent } from './journal/journal.component';
import { WorkoutDialogComponent } from './dialogs/workout-dialog.component';
import { WorkoutComponent } from './workout/workout.component';

@NgModule({
  declarations: [JournalComponent, WorkoutDialogComponent, WorkoutComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatDialogModule,
  ],
})
export class FeaturesModule {}
