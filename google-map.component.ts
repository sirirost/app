import { Component, OnInit  } from '@angular/core';
import { GeoService } from '../geo.service'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFireAuth, AngularFireAuthProvider } from 'angularfire2/auth';


interface locattions {
  lat: number;
  lng: number;
  userId : string ;
  date : string ;
  
}

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {

  lat: number ;
  lng: number ;
  userId : string ;
  date : string ;


  locattionCol: AngularFirestoreCollection<locattions>;
  locattions: any;


  markers: any;
  subscription: any;

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth,private geo : GeoService) {
    this.afAuth.authState.subscribe(user => {
      if(user)  this.userId = user.uid
    })
   }

  ngOnInit() {
    this.getUserLocation()
    this.subscription = this.geo.hits
    .subscribe(hits => this.markers = hits)
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

  private getUserLocation() {
    /// locate the user
    if (navigator.geolocation) {
       navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        
        this.geo.getLocations(100, [this.lat, this.lng])
      });
    }
  }

  addmark() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
       this.lat = position.coords.latitude;
       this.lng = position.coords.longitude;
       console.log('lat : ',this.lat,'lng : ',this.lng)
       this.date = (new Date().toLocaleString())
      
        this.afs.collection('location').add({'lat': this.lat, 'lng': this.lng, 'uid': this.userId, 'date': this.date});
    
      

     });
   }

  }


  

}
