

import { AuthGuard } from '../services/auth-guard/auth-guard';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
const TOKEN_KEY = 'myplug-auth-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginForm: FormGroup;
    public signupForm: FormGroup;
    public resetPasswordForm: FormGroup;
    loading: HTMLIonLoadingElement;
    authPage = 'login' || 'register';
    segment = 'authPage';

    constructor(
        public loadingCtrl: LoadingController, private nav: NavController, private formBuilder: FormBuilder,
        private alertCtrl: AlertController, private auth: AuthGuard
    ) {
        this.signupForm = this.formBuilder.group({
            displayName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*')])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            conPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });

        this.loginForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        });

        this.resetPasswordForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
        });
    }

    ngOnInit() {
    }

    async loginUser(loginForm: FormGroup): Promise<void> {
        this.presentLoading('Logging in').then(() => {
            setTimeout(() => {
                this.auth.authenticated = true;
                this.nav.navigateRoot(['/']);
                this.loading.dismiss();
            }, 3000);
        });
      }

    async signupUser(signupForm: FormGroup): Promise<void> {
        this.presentLoading('Signing up User').then(() => {
            setTimeout(() => {
                this.loading.dismiss();
                this.segment = 'success';
            }, 3000);
        });
    }

    resetPassword(resetPasswordForm: FormGroup): void {
    }

    async presentLoading(message, duration?) {
        this.loading = await this.loadingCtrl.create({
          message,
          duration: duration? duration : 15000,
          spinner: 'bubbles'
        });
        await this.loading.present();
    }
}
