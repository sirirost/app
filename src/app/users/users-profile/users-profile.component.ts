import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

export class Item {
  body: string;
}

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit {

  constructor(private asf: AngularFirestore, public afAuth: AuthService) {
  
  }

  ngOnInit() {
  }

}


