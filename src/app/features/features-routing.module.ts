import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalComponent } from './journal/journal.component';
import { ProgramsComponent } from './programs/programs.component';

const routes: Routes = [
  {
    path: 'journal',
    component: JournalComponent,
  },
  {
    path: 'programs',
    component: ProgramsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
