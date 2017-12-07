import { Injectable , OnInit } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { GalleryImage } from './models/galleryImage.model';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Uploads } from './models/uploads.model';
import * as  firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadsService {

  private basePath = '/uploads';
  private uploads: Observable<GalleryImage[]>;
  // listings: AngularFireList<any[]>;
  // listing: Observable<any[]>;
  // folder: any;

  constructor(private ngFire: AngularFireModule, private db: AngularFireDatabase) {
    // this.folder = 'newimages';
  }

  // getListings(){
  //   this.listings = this.db.list('/listings')
  //   return this.listings;
  // }

  // getListingDetails(id){
  //   this.listing = this.db.list('/listings/'+id).valueChanges();
  //   return this.listing;
  // }

  uploadFile(upload: Uploads) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`)
      .put(upload.file);


      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        // three observers
        // 1.) state_changed observer
        (snapshot) => {
          // upload in progress
          upload.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
          console.log(upload.progress);
        },
        // 2.) error observer
        (error) => {
          // upload failed
          console.log(error);
        },
        // 3.) success observer
        (): any => {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          upload.newTopics = upload.newTopics
          upload.newContent = upload.newContent
          this.saveFileData(upload);
        }
      );
    }
    private saveFileData(upload: Uploads) {
      this.db.list(`${this.basePath}/`).push(upload);
      console.log('กำลังเซฟไฟล์!: ' + upload.url);
    }


  // addListing(listing){
  //   // Create root ref
  //   let storageRef = firebase.storage().ref();
  //   for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]){
  //     let path = `/${this.folder}/${selectedFile.name}`;
  //     let iRef = storageRef.child(path);
  //     iRef.put(selectedFile).then((snapshot) => {
  //       listing.image = selectedFile.name;
  //       listing.path = path;
  //       return this.listings.push(listing)
  //     });
  //   }
  // }

}

// interface Listing{
//   $key?:string;
//   title?:string;
//   type?:string;
//   image?:string;
//   city?:string;
//   owner?:string;
//   bedrooms?:string;
// } 

