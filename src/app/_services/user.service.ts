import { User } from './../_models/user';
import { Injectable } from '@angular/core';
import { appConfig } from '../app.config';

@Injectable()
export class UserService {
    private isUserLoggedIn;
    private username;

    private counter: Array<ServiceCounter> = new Array<ServiceCounter>();
    constructor() {
        this.isUserLoggedIn = false;
    }

    setUserLoggedIn() {
        this.isUserLoggedIn = true;
    }
    getUserLoggedIn() {
        return this.isUserLoggedIn;
    }

    public setCounter(counter: ServiceCounter) {
        this.counter.push(counter);
    }

    public getCounter() {
        return this.counter;
    }

    public isValidCount(): boolean {
        var isValid: boolean = true;
        this.counter.forEach((eachCounter, index) => {
            if (((eachCounter.time.getTime() - new Date().getTime())/1000 <= 60) && (this.counter.length - index > 15)) {
                isValid = false;
            }
        });

        return isValid;
    }


}

export class ServiceCounter {
    public count: number;
    public time: Date;

    constructor(count: number) {
        this.count = count;
        this.time = new Date();
    }
}