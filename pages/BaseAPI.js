export class BaseAPI {
    constructor(request, baseURL) {
        this.request = request;
        this.baseURL = baseURL;
    }

    async get(endpoint, headers = {}) {
        const response = await this.request.get(`${this.baseURL}${endpoint}`, {
            headers: headers
        });

        return response;
    }

    async post(endpoint, data, headers = {}) {
        const response = await this.request.post(`${this.baseURL}${endpoint}`, {
            headers: headers,
            data: data
        });

        return response;
    }

    async put(endpoint, data, headers = {}) {
        const response = await this.request.put(`${this.baseURL}${endpoint}`, {
            headers: headers,
            data: data
        });

        return response;
    }

    async delete(endpoint, headers = {}) {
        const response = await this.request.delete(`${this.baseURL}${endpoint}`, {
            headers: headers
        });

        return response;
    }

    async logResponse(response, actionName) {
        console.log(`Статус-код ${actionName}: ${response.status()}`);
        const body = await response.json().catch(() => null);
        if (body) {
            console.log(`${actionName}:`, body);
        }
        return body;
    }
}