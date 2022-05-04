import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HolidayService } from '../services/holiday/holiday-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    refreshing = true;
    error = false;
    searchQuery = '';

    constructor(public holidayService: HolidayService, private router: Router, private toastCtrl: ToastController ) {

    }

    async ngOnInit() {
        try{
            await this.holidayService.initializeApp();
        }
        catch(err) {
            console.log(err);
        }
    }

    showCountryHolidays(country: any) {
        const navExtra: NavigationExtras = {
            state: {
                data: country
            }
        };
        this.router.navigate(['details'], navExtra);
    }

    sortedList(list: any, sortName: string) {
        return list.sort((a: any, b: any) => a[sortName] > b[sortName] ? 1 : - 1);
    }

    async refresh(event: any) {
        this.refreshing = true;
        this.error = false;
        await this.holidayService.getFakeCountries().catch(async () => {
            const toast = await this.toastCtrl.create({
                message: 'An Error Occurred',
                duration: 2000
            });
            this.error = true;
            toast.present();
        }).finally(() => {
            this.refreshing = false;
            event.detail.complete();
        });
    }

    searchCountry() {
        return this.holidayService.countries.filter(({ name }) => name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1);
    }

}
