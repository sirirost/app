import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument ,AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operator/take';

export class New {
  newTopics : string ;
  newContent: string;
  userId : string ;
}

interface NewId extends New { 
  id: string; 
}

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  newsCol: AngularFirestoreCollection<New>;
  news: any;
  
  userId : string ;
  newTopics : string ;
  newContent: string;

  newsDoc: AngularFirestoreDocument<New>;
  new: Observable<New>;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      if(user)  this.userId = user.uid
    })
   };

  ngOnInit() {
    if (!this.userId) return;
    this.newsCol = this.afs.collection('news');
    //this.posts = this.postsCol.valueChanges();
    this.news = this.newsCol.snapshotChanges()
      .map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as New;
          const id = a.payload.doc.id;
          return { id, data };
        })
      })
  }

  createNew()  {
    
      this.afs.collection('news').add({'newTopics': this.newTopics, 'newContent': this.newContent, 'uid': this.userId});
    }
  
    getNew(newId) {
      this.newsDoc = this.afs.doc('news/'+newId);
      this.new = this.newsDoc.valueChanges();
    }
    
    deleteNew(newId) {
      this.afs.doc('news/'+newId).delete();
    }
    

}
