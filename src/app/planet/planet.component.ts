import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from './../app.config';
import { SearchPipe } from '../search-pipe.pipe';
import * as $ from 'jquery';

@Component({
  templateUrl: 'planet.component.html',
  styleUrls: ['./planet.component.css'],
})

export class PlanetComponent implements OnInit {
  fieldSearch;
  users: User[] = [];
  private results: string[];
  total = 0;
  average;
  indiPercent = [];


  constructor(private userService: UserService, private http: HttpClient) {
  }

  ngOnInit() {
    this.planetList();

  }

  private planetList() {
    return this.http.get<any>(appConfig.apiUrl + 'planets/')
      .subscribe(results => this.results = results['results'],
      error => console.log("Error: ", error),
      () => {
        this.getPop(this.results);
      });
  }
  getPop(population) {

    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i]['population'] === 'unknown') {
        this.results[i]['population'] = 0;
      }
      this.total += parseInt(this.results[i]['population']);

    }
    for (let i = 0; i < this.results.length; i++) {
      if (this.results[i]['population'] === "unknown") {
        this.results[i]['population'] = 0;
      }
    }
    console.log(this.indiPercent)

  }
  getSize(pop) {
    pop = (parseInt(pop) / this.total) * 100;
    if(pop<0)
    {
      return 8;
    }
    else if(pop==0)
    return 11;

    else if(pop>0 && pop<0.001)
    return 14;
     
    else if(pop>0.001 && pop<0.01)
    return 17;
    
    else if(pop>0.01 && pop<0.1)
    return 20;

    else if(pop>0.1 && pop<0.2)
    return 23;
    
    else if(pop>0.2 && pop<0.5)
    return 26;
    else if(pop>0.5 && pop<10)
    return 29;
    
    else if(pop>10)
    return 32;
  
  }
}


