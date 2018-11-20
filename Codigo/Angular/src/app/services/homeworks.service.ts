import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Observable, throwError } from "rxjs"; 
import { map, tap, catchError } from 'rxjs/operators';
import { Homework } from '../models/Homework';
import { SessionService } from "./session.service";
import { environment } from '../../environments/environment';

@Injectable()
export class HomeworksService {

  private WEB_API_URL : string = environment.urlBackend + 'Homeworks';
  //private WEB_API_URL : string = '../../assets/getResponse.json';

  constructor(private _httpService: Http,
    private _sessionService: SessionService) {  }
  
  getHomeworks():Observable<Array<Homework>> {
    const myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');    
    this._sessionService.addTokenToHeaders(myHeaders);
    const requestOptions = new RequestOptions({headers: myHeaders});
    
    return this._httpService.get(this.WEB_API_URL, requestOptions)
        .pipe(
            map((response : Response) => <Array<Homework>> response.json()),
            tap(data => console.log('Los datos que obtuvimos fueron: ' + JSON.stringify(data))),
            catchError(this.handleError)
        );
  }

  private handleError(error: Response) {
    console.error(error);
    return throwError(error.json().error|| 'Server error');
  }
}

