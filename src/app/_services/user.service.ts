import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { appConfig } from '../app.config';

@Injectable()
export class UserService {
    private isUserLoggedIn;
    private username;
    constructor() {
        this.isUserLoggedIn = false;
    }

    setUserLoggedIn(){
        this.isUserLoggedIn=true;
    }
    getUserLoggedIn(){
        return this.isUserLoggedIn;
    }

}
