import { Component, OnInit , OnChanges} from '@angular/core';
import { ImageService } from '../image.service';
import { GalleryImage } from '../models/galleryImage.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase,AngularFireList,AngularFireObject } from 'angularfire2/database';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit ,OnChanges {

  images: Observable<GalleryImage[]>;

  
 
  constructor(private imageService: ImageService, db: AngularFireDatabase,) {
  
   }

   ngOnInit() {
    this.images = this.imageService.getImages();
  }

  ngOnChanges() {
    this.images = this.imageService.getImages();
  }
}
