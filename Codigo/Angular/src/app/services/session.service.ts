import { Injectable } from '@angular/core';
import { Headers } from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class SessionService {
    constructor() {
        if (!this.isLoggedIn()) {
            localStorage.setItem('isLoggedIn', 'false');
        }
    }

    logIn(user:string, pass:string):void {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', 'admin');
    }

    logOut():void {
       localStorage.clear();
       localStorage.setItem('isLoggedIn', 'false');
    }

    isLoggedIn():boolean {
        return localStorage.getItem('isLoggedIn') == 'true';
    }

    getUser(): String {
        return 'Santiago';
    }

    addTokenToHeaders(headers:Headers):Headers {
        if (localStorage['token']) {
            headers.append('Authorization', localStorage.getItem('token'));
        }
        return headers;
    }
}
