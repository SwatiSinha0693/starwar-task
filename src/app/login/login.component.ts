import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { appConfig } from './../app.config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  private name: any[] = [];
  private dob: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private toastr: ToastrService,private userService: UserService
  ) { }

  ngOnInit() {
    this.logout();
  }

  login(form: NgForm) {
    var username = this.model.username;
    var password = this.model.password;
    var flag = false;
    this.http.get<any>(appConfig.apiUrl + 'people/')
      .subscribe(user => {
        for (let i = 0; i < user.results.length; i++) {
          if (user.results[i].name === username) {
            if (user.results[i].birth_year === password) {
              this.toastr.success('Success', 'Logged In Successfully');
              flag = true;
              this.userService.setUserLoggedIn();
              localStorage.setItem('currentUser',username);
              this.router.navigate(['/planet']);
              break;
            } else {
              flag = true;
              this.toastr.error('Failed', 'Wrong password, reenter the password');
            }


          }
        }
        if (flag === false) {
          this.toastr.error('Failed', 'Wrong username, user name doesnt exists');
        }
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
