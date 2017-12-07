import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument ,AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UploadsService } from '../uploads.service';
import { Uploads } from '../models/uploads.model';
import * as _ from 'lodash'; // to help loop over files more succinctly

import * as firebase from 'firebase';
import {Router} from '@angular/router';


@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent {

  files: FileList;
  upload: Uploads;
  title:any;
  owner:any;
  city:any;
  bedrooms:any;
  price:any;
  type:any;
  image:any;

  constructor(private uploadsService: UploadsService,private router:Router) {}

  handleFiles(event) {
    this.files = event.target.files;
  }

  uploadFiles() {
    const filesToUpload = this.files;
    const filesIdx = _.range(filesToUpload.length);
    _.each(filesIdx, (idx) => {
       console.log(filesToUpload[idx]);
      this.upload = new Uploads(filesToUpload[idx]);
      this.uploadsService.uploadFile(this.upload);
    });
  }


  // onAddSubmit(){
  //   let listing = {
  //     title: this.title,
  //     city: this.title,
  //     owner: this.owner,
  //     bedrooms:this.bedrooms,
  //     price: this.price,
  //     type: this.type
  //   }
  //   console.log(listing)

  //   this.uploadsService.addListing(listing);

  //   this.router.navigate(['Gallerys']);
  // }


}
