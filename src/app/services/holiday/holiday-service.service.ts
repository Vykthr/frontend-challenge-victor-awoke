import { Injectable } from '@angular/core';
import axios from 'axios';

export const FLAG_BASE_URL = 'https://countryflagsapi.com/png';
export const HOLIDAY_LIVE_BASE_URL = 'https://api.m3o.com/v1/holidays';
const HOLIDAY_FAKE_BASE_URL = 'assets/responses';
const HOLIDAY_API_KEY = 'MDNiYTQ5NmQtZjUzNy00NjM2LWE2ZjItNTgwMjk4NjA5NzA2';

@Injectable({
    providedIn: 'root'
})


export class HolidayService {

    countries = [];

    constructor() {

    }

    async initializeApp() {
        try {
            const response = await this.getFakeCountries();
            this.countries = response;
        }
        catch (err) {
            console.log(err);
        }
    }

    async getCountries(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.post(`${HOLIDAY_LIVE_BASE_URL}/Countries`, {},
                    { headers: { Authorization: `Bearer ${HOLIDAY_API_KEY}` } }
                );
                resolve(data?.countries || []);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    async getCountryHolidays( countryCode: string, year?: string ): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const yr = year || new Date().getFullYear();
            try {
                const { data } = await axios.post(`${HOLIDAY_LIVE_BASE_URL}/List`,
                    { country_code: countryCode, year: yr  }, { headers: { Authorization: `Bearer ${HOLIDAY_API_KEY}` } }
                );
                resolve(data?.holidays || []);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    async getFakeCountries(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`${HOLIDAY_FAKE_BASE_URL}/countries.json`);
                resolve(data?.countries || []);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    async getFakeCountryHolidays(countryCode: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const { data } = await axios.get(`${HOLIDAY_FAKE_BASE_URL}/holidays.json`);
                resolve(data?.holidays || []);
            }
            catch (err) {
                reject(err);
            }
        });
    }

    async getCountryImage( countryCode: string ) {
        return axios.get(`${FLAG_BASE_URL}/${countryCode}`);
    }
}
