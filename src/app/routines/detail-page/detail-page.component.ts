import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements OnInit {
  routineId: any = '';
  routine!: Observable<any>;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {}

  ngOnInit() {
    this.routineId = this.route.snapshot.paramMap.get('id');

    this.routine = this.db
      .collection('routines')
      .doc<any>(this.routineId)
      .valueChanges({ idField: 'id' });
  }
}
