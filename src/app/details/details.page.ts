import { HolidayService } from './../services/holiday/holiday-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
    country: any;
    holidays = [];
    sortValue = 'name';
    searchQuery = '';

    constructor(
        private nav: NavController, private router: Router, activatedRoute: ActivatedRoute,
        public holidayService: HolidayService, private toastCtrl: ToastController
    ) {
        activatedRoute.queryParams.subscribe(params => {
            if(router.getCurrentNavigation().extras.state) {
              this.country = router.getCurrentNavigation().extras.state.data;
            } else {
              nav.navigateRoot('');
            }
        });
    }

    ngOnInit() {
        this.getHolidays();
    }

    async getHolidays() {
        const response  = await this.holidayService.getFakeCountryHolidays(this.country.code);
        this.holidays = response;
    }

    sortedList(list: any) {
        return list.sort((a: any, b: any) => a[this.sortValue] > b[this.sortValue] ? 1 : - 1);
    }

    async refresh(event: any) {
        // this.refreshing = true;
        // this.error = false
        await this.holidayService.getFakeCountryHolidays(this.country.code)
        .then(res => {
            this.holidays = res;
        })
        .catch(async () => {
            const toast = await this.toastCtrl.create({
                message: 'An Error Occurred',
                duration: 2000
            });
            // this.error = true;
            toast.present();
        }).finally(() => {
            // this.refreshing = false;
            event.detail.complete();
        });
    }

    getDate(date: string) {
        return moment(date).format('DD MMMM, YYYY');
    }
    searchHoliday() {
        return this.holidays.filter(({ name }) => name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1);
    }
}
