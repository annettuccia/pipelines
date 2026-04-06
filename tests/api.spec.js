import { test, expect } from '@playwright/test';
import { BookingAPI } from '../pages/BookingAPI';
import { AuthAPI } from '../pages/AuthAPI';
import { testBookingData, updateBookingData } from '../data/bookingData';

test.describe.serial('API-тесты  @api', () => {
  const baseURL = 'https://restful-booker.herokuapp.com';

  let bookingAPI;
  let authAPI;
  let apiContext;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
      baseURL: baseURL,
    });
    bookingAPI = new BookingAPI(apiContext, baseURL);
    authAPI = new AuthAPI(apiContext, baseURL);
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test('1. Создание бронирования (POST-запрос)', async () => {
    const createResult = await bookingAPI.createBooking(testBookingData);

    expect(createResult.response.status()).toBe(200);
    expect(createResult.body).toHaveProperty('bookingid');
    bookingAPI.verifyBookingData(createResult.body.booking, testBookingData);
    console.log(`Создано бронирование с ID: ${bookingAPI.getBookingID()}`);
  });

  test('2. Получение информации о бронировании (GET-запрос)', async () => {
    const bookingID = bookingAPI.getBookingID();
    expect(bookingID).toBeDefined();
    console.log(`Используем bookingID: ${bookingID}`);

    const getResult = await bookingAPI.getBooking();
    expect(getResult.response.status()).toBe(200);
    bookingAPI.verifyBookingData(getResult.body, testBookingData);
  });

  test('3. Обновление бронирования (PUT-запрос)', async () => {
    const authResult = await authAPI.authenticate("admin", "password123");
    const authToken = authResult.token;
    expect(authToken).toBeDefined();

    bookingAPI.setAuthToken(authToken);

    const updateResult = await bookingAPI.updateBooking(updateBookingData);
    expect(updateResult.response.status()).toBe(200);
    bookingAPI.verifyBookingData(updateResult.body, updateBookingData);
  });

  test('4. Удаление бронирования (DELETE-запрос)', async () => {
    const deleteResult = await bookingAPI.deleteBooking();
    expect(deleteResult.response.status()).toBe(201);

    const getResult = await bookingAPI.getBooking();
    expect(getResult.response.status()).toBe(404);
  });
});