import { StarWarService } from './../_services/star-war.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService, ServiceCounter } from '../_services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  templateUrl: 'planet.component.html',
  styleUrls: ['./planet.component.css'],
  providers: [StarWarService]
})

export class PlanetComponent implements OnInit {
  readonlyText: boolean;
  count: any;
  fieldSearch = '';
  users: User[] = [];
  results: string[];
  total = 0;
  average;
  indiPercent = [];
  nextUrl;
  public loading = false;
  private counter = 0;
  name;


  constructor(private userService: UserService, private starService: StarWarService, private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit() {
    this.counter = 0;
    this.name = localStorage.getItem('currentUser');
    if (this.userService.isValidCount()) {
      this.planetList();
    }
    else {
      setTimeout(() => this.toastr.error('Failed', 'Invalid Search, limit exceeds 15 searches'), 0)
      this.loading = false;

    }

  }

  private planetList() {
    this.loading = true;
    this.starService.searchPlanets().subscribe(results => {

      if (this.name !== "Luke Skywalker") {
        this.userService.setCounter(new ServiceCounter(this.userService.getCounter().length));
      }

      this.results = results['results']
      this.count = results['count'];
      this.loading = false;
    },
      error => console.log("Error: ", error),
      () => {
        this.getPopulation(this.results);
      });
  }
  getPopulation(population) {

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

  }

  public serviceCall(fieldSearch) {

    this.starService.searchByWord(fieldSearch)
      .subscribe(results => {

        if (this.name !== "Luke Skywalker") {
          this.userService.setCounter(new ServiceCounter(this.userService.getCounter().length));
        }

        this.results = results['results'];
        this.count = results['count'];
      },
      error => console.log("Error: ", error),
      () => {
        this.getPopulation(this.results);
        this.loading = false;
        this.readonlyText = false;
      });
  }

  public searchList(fieldSearch) {
    this.loading = true;
    this.readonlyText = true;


    if (this.userService.isValidCount()) {
      this.serviceCall(fieldSearch)
    }
    else {
      setTimeout(() => this.toastr.error('Failed', 'Invalid Search, limit exceeds 15 searches'), 0);
      this.loading = false;
    }
  }

  public checkAndPaginationNext(event) {
    if (this.userService.isValidCount()) {
      this.paginationNext(event);
    }
    else {
      setTimeout(() => this.toastr.error('Failed', 'Invalid Search, limit exceeds 15 searches'), 0);
      this.loading = false;
    }
  }

  public paginationNext(event) {
    if (this.fieldSearch != undefined && this.fieldSearch.length == 0) {
      this.loading = true;
      let i = event.target.innerText.replace(/\D/g, '');
      this.starService.searchByPage(i)
        .subscribe(results => {

          if (this.name !== "Luke Skywalker") {
            this.userService.setCounter(new ServiceCounter(this.userService.getCounter().length));
          }

          this.results = results['results'],
            this.loading = false
        },
        error => console.log("Error: ", error),
        () => {
          this.getPopulation(this.results);
        });
    }
  }
  getSize(pop) {
    pop = (parseInt(pop) / this.total) * 100;
    if (pop < 0) {
      return 8;
    }
    else if (pop == 0)
      return 11;

    else if (pop > 0 && pop < 0.001)
      return 14;

    else if (pop > 0.001 && pop < 0.01)
      return 17;

    else if (pop > 0.01 && pop < 0.1)
      return 20;

    else if (pop > 0.1 && pop < 0.2)
      return 23;

    else if (pop > 0.2 && pop < 0.5)
      return 26;
    else if (pop > 0.5 && pop < 10)
      return 29;

    else if (pop > 10)
      return 32;

  }
}


