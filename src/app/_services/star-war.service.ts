import { appConfig } from './../app.config';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class StarWarService {

  constructor(private http: Http) { }
  searchPlanets() {
    return this.http.get(appConfig.apiUrl + 'planets/').map(res => {
      return res.json()
    })
  }

  searchByWord(search) {
    return this.http.get(appConfig.apiUrl + 'planets/?search=' + search).map(res => {
      return res.json()
    })

  }

  searchByPage(i) {
    return this.http.get(appConfig.apiUrl + 'planets/?page=' + i).map(res => {
      return res.json()
    })
  }
}
