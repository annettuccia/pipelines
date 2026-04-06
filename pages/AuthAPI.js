import { BaseAPI } from "./BaseAPI";

export class AuthAPI extends BaseAPI {
    constructor(request, baseURL) {
        super(request, baseURL);
    }

    async authenticate(username, password) {
        const response = await this.post('/auth', {
            username: username,
            password: password
        });

        const responseBody = await this.logResponse(response, 'авторизации');

        return {
            response: response,
            token: responseBody?.token
        };
    }
}