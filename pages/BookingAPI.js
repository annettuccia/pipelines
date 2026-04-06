import { BaseAPI } from "./BaseAPI";
import { expect } from '@playwright/test';

export class BookingAPI extends BaseAPI {
    constructor(request, baseURL) {
        super(request, baseURL);
        this.bookingID = null;
        this.authToken = null;
    }

    async getBooking(bookingID = this.bookingID) {
        const response = await this.get(`/booking/${bookingID}`);
        const responseBody = await this.logResponse(response, 'получения информации');

        return {
            response: response,
            body: responseBody
        };
    }

    async createBooking(bookingData) {
        const response = await this.post('/booking', bookingData);
        const responseBody = await this.logResponse(response, 'создания');

        if (response.status() === 200 && responseBody) {
            this.bookingID = responseBody.bookingid;
            console.log(`Создано бронирование с ID: ${this.bookingID}`);
        }

        return {
            response: response,
            body: responseBody,
            bookingID: responseBody?.bookingid
        };
    }

    async updateBooking(bookingData, bookingID = this.bookingID, token = this.authToken) {
        if (!token) {
            console.error('Токен не установлен!');
            throw new Error('Токен авторизации не установлен');
        }

        const headers = {
            'Cookie': `token=${token}`,
            'Content-Type': 'application/json'
        };

        console.log(`Отправка PUT запроса с токеном: ${token}`);

        const response = await this.put(`/booking/${bookingID}`, bookingData, headers);

        const responseBody = await this.logResponse(response, 'редактирования');

        return {
            response: response,
            body: responseBody
        };
    }

    async deleteBooking(bookingID = this.bookingID, token = this.authToken) {
        if (!token) {
            console.error('Токен не установлен!');
            throw new Error('Токен авторизации не установлен');
        }

        const headers = {
            'Cookie': `token=${token}`
        };

        const response = await this.delete(`/booking/${bookingID}`, headers);

        await this.logResponse(response, 'удаления');

        return {
            response: response
        };
    }

    async verifyBookingData(actualData, expectedData) {
        expect(actualData.firstname).toBe(expectedData.firstname);
        expect(actualData.lastname).toBe(expectedData.lastname);
        expect(actualData.totalprice).toBe(expectedData.totalprice);
        expect(actualData.depositpaid).toBe(expectedData.depositpaid);
        expect(actualData.bookingdates).toEqual(expectedData.bookingdates);
        expect(actualData.additionalneeds).toBe(expectedData.additionalneeds);
    }

    setAuthToken(token) {
        console.log(`Установлен токен: ${token}`);
        this.authToken = token;
    }

    getBookingID() {
        return this.bookingID;
    }
}