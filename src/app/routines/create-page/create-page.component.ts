import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit {
  routineForm!: FormGroup;
  loading = false;
  serverMessage = '';

  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.routineForm = this.fb.group({
      title: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]],
      briefDesc: ['', [Validators.required]],
      longDesc: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    this.loading = true;
    const formValue = this.routineForm.value;

    try {
      await this.db.collection('routines').add(formValue);
    } catch (err) {
      console.error(err);
    }
    this.loading = false;
  }
}
