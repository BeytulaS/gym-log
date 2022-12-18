import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
})
export class ListPageComponent implements OnInit {
  routines: any;
  constructor(public db: AngularFirestore) {}

  ngOnInit() {
    this.routines = this.db
      .collection('routines')
      .valueChanges({ idField: 'id' });
  }
}
