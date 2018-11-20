import { Component, OnChanges } from '@angular/core';
import { environment } from '../environments/environment';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges {
  title:string = 'HomeworksAngular (' + environment.envName + ')';
  loggedIn:boolean = false;
  name:String = '';
  
  constructor(private _sessionService:SessionService) { }

  ngOnChanges(): void {
    if(this.isloggedIn()) {
      this.name = this._sessionService.getUser();
    }    
  }

  logIn(): void {
      this._sessionService.logIn('user', 'pass');   
      this.name = this._sessionService.getUser();
  }

  logOut():void {
      this._sessionService.logOut();
  }

  isloggedIn():Boolean {
      this.loggedIn = this._sessionService.isLoggedIn();
      return this.loggedIn;
  }
}

