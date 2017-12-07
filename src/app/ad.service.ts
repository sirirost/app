import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument ,AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operator/take';


export class AdListing {
  title    = 'Your Title'
  content  = 'Ad Content'
  price    = 5.00
  image    = 'http://via.placeholder.com/350x150'
}


@Injectable()
export class AdService {

  constructor(private afs : AngularFirestore) { }

}
