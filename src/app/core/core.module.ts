import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../auth.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFirestoreModule
    
  ],
  providers : [AuthService]
})
export class CoreModule { }
