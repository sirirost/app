import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';

interface Postplant {
  plantname: string;
  rai: number;
  ngan :number;  
  squarewa: number ;
  userId : string ;
  
}

interface PostplantId extends Postplant {
  id: string;
}

@Component({
  selector: 'app-add-farmerinformation',
  templateUrl: './add-farmerinformation.component.html',
  styleUrls: ['./add-farmerinformation.component.css']
})
export class AddFarmerinformationComponent implements OnInit {

  postsplantCol: AngularFirestoreCollection<Postplant>;
  postsplant: any;

  plantname: string;
  rai: number;
  ngan :number;  
  squarewa: number ;
  userId : string ;

  postplantDoc: AngularFirestoreDocument<Postplant>;
  postplant: Observable<Postplant>;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user)  this.userId = user.uid
    })
    
   };

  ngOnInit() {
    this.postsplantCol = this.afs.collection('posts');
    //this.posts = this.postsCol.valueChanges();
    this.postsplant = this.postsplantCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Postplant;
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
  }

  addPostplant() {
    this.afs.collection('famerinfo').add({'plantname': this.plantname, 'rai': this.rai, 'ngan': this.ngan, 'squarewa': this.squarewa, 'uid': this.userId});
  }

  getPostplant(postId) {
    this.postplantDoc = this.afs.doc('famerinfo/'+postId);
    this.postplant = this.postplantDoc.valueChanges();
  }

  deletePostplant(postId) {
    this.afs.doc('famerinfo/'+postId).delete();
  }

}
