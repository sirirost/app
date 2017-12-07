import { Component } from '@angular/core';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  email: string;
  password: string;

  constructor(public authService: AuthService) { 
    
  }

  // signupemail() {
  //   this.authService.signupemail(this.email, this.password);
  //   this.email = this.password = '';
  //   console.log(this.authService);
  // }

  // loginemail() {
  //   this.authService.loginemail(this.email, this.password);
  //   this.email = this.password = '';
    
  // }


  loginGoogle(){
    this.authService.loginGoogle()
    
  }

  loginFacebook(){
    this.authService.loginFacebook();
  }

  logout() {
    this.authService.logout();
    console.log(this.email) ;
  }
  
  

  
}
