import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument ,AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operator/take';

export class Plantcare {
  topics : string ;
  content: string;
  userId : string ;
}

interface PlantcareId extends Plantcare { 
  id: string; 
}

@Component({
  selector: 'app-plantcare',
  templateUrl: './plantcare.component.html',
  styleUrls: ['./plantcare.component.css']
})
export class PlantcareComponent implements OnInit {
  
  plantcaresCol: AngularFirestoreCollection<Plantcare>;
  plantcares: any;
  
  userId : string ;
  topics : string ;
  content: string;
  
  plantcaresDoc: AngularFirestoreDocument<Plantcare>;
  plantcare: Observable<Plantcare>;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user)  this.userId = user.uid
    })
    
   };
   ngOnInit() {
    if (!this.userId) return;
    this.plantcaresCol = this.afs.collection('plantcares');
    //this.posts = this.postsCol.valueChanges();
    this.plantcares = this.plantcaresCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Plantcare;
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
      
     }
   

  createItem()  {
  
    this.afs.collection('plantcares').add({'topics': this.topics, 'content': this.content, 'uid': this.userId});
  }

  getPost(plantcareId) {
    this.plantcaresDoc = this.afs.doc('plantcares/'+plantcareId);
    this.plantcare = this.plantcaresDoc.valueChanges();
  }
  
  deletePost(plantcareId) {
    this.afs.doc('plantcares/'+plantcareId).delete();
  }
  




}
