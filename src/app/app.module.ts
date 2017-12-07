import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule} from '@angular/forms';

import { AngularFireModule} from 'angularfire2';
import { firebaseConfig } from './../environments/firebase.config';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './auth.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { LoginComponent } from './users/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import { UsersProfileComponent } from './users/users-profile/users-profile.component';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './home/home.component';
import { PlantcareComponent } from './plantcare/plantcare.component';
import { NewsComponent } from './news/news.component';
import { UploadsComponent } from './uploads/uploads.component';
//import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImageService } from './image.service';
import { UploadsService } from './uploads.service';
import { AddFarmerinformationComponent } from './add-farmerinformation/add-farmerinformation.component';

 

const routes: Routes = [
                        {path: 'UsersProfiles', component: UsersProfileComponent},
                        {path: 'Login', component: LoginComponent},
                        {path: 'Plantcare', component: PlantcareComponent},
                        {path: 'News', component: NewsComponent},
                        {path: 'Uploads', component: UploadsComponent},
                        {path: 'Gallerys', component: GalleryComponent},
                        { path: 'image/:id', component: ImageDetailComponent, },
                        { path: '', redirectTo: '/gallery', pathMatch: 'full'},
                        {path: 'Addfanerinfo', component: AddFarmerinformationComponent},
                        
                        ];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersProfileComponent,
    HomeComponent,
    PlantcareComponent,
    NewsComponent,
    UploadsComponent,
    GalleryComponent,
    ImageDetailComponent,
    AddFarmerinformationComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    RouterModule.forRoot(routes),
    CoreModule,
    ReactiveFormsModule
    
   
  ],
  providers: [AuthService,ImageService,UploadsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
