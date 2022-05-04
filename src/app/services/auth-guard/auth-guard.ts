import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    authenticated = false;

    constructor(private nav: NavController){}

    async canActivate(route: ActivatedRouteSnapshot) {
        if (!this.authenticated) {
            this.presentLoginModal();
        }
        return this.authenticated;
    }


    async presentLoginModal(){
        this.nav.navigateRoot('login');
    }

}
