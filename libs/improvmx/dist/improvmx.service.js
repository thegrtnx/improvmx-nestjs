"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImprovmxService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const axios_1 = require("@nestjs/axios");
const axios_2 = require("axios");
const operators_1 = require("rxjs/operators");
let ImprovmxService = class ImprovmxService {
    constructor(configService, httpService) {
        this.configService = configService;
        this.httpService = httpService;
        this.apiKey = this.configService.get('SMTP_API_KEY');
        this.apiUrl = 'https://api.improvmx.com/v3';
    }
    getHeaders() {
        return {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
        };
    }
    getAuthHeader() {
        return `Basic ${Buffer.from(`api:${this.apiKey}`).toString('base64')}`;
    }
    handleError(error) {
        console.error('Error:', error);
        throw error;
    }
    async axiosRequest(method, url, data, params) {
        try {
            const response = await (0, axios_2.default)({
                method,
                url,
                headers: {
                    Authorization: this.getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                data,
                params,
            });
            return response.data;
        }
        catch (error) {
            this.handleError(error);
        }
    }
    httpServiceRequest(method, url, data, params) {
        return this.httpService
            .request({
            method,
            url,
            headers: this.getHeaders(),
            data,
            params,
        })
            .pipe((0, operators_1.map)((response) => response.data));
    }
    getAccount() {
        return this.httpServiceRequest('GET', `${this.apiUrl}/account/`);
    }
    getWhitelabels() {
        return this.httpServiceRequest('GET', `${this.apiUrl}/account/whitelabels/`);
    }
    getDomains(params) {
        return this.httpServiceRequest('GET', `${this.apiUrl}/domains/`, null, params);
    }
    addDomain(domain, notification_email, whitelabel) {
        const data = { domain, notification_email, whitelabel };
        return this.httpServiceRequest('POST', `${this.apiUrl}/domains/`, data);
    }
    getDomainDetails(domain) {
        return this.httpServiceRequest('GET', `${this.apiUrl}/domains/${domain}`);
    }
    updateDomain(domain, notification_email, webhook, whitelabel) {
        const data = { notification_email, webhook, whitelabel };
        return this.httpServiceRequest('PUT', `${this.apiUrl}/domains/${domain}`, data);
    }
    deleteDomain(domain) {
        return this.httpServiceRequest('DELETE', `${this.apiUrl}/domains/${domain}`);
    }
    checkDomain(domain) {
        return this.httpServiceRequest('GET', `${this.apiUrl}/domains/${domain}/check`);
    }
    getAliases(domain, params) {
        return this.httpServiceRequest('GET', `${this.apiUrl}/domains/${domain}/aliases/`, null, params);
    }
    createAlias(domain, alias, forward) {
        const url = `${this.apiUrl}/domains/${domain}/aliases`;
        const payload = { alias, forward };
        return this.axiosRequest('POST', url, payload);
    }
    getAlias(domain, alias) {
        const url = `${this.apiUrl}/domains/${domain}/aliases/${alias}`;
        return this.axiosRequest('GET', url);
    }
    updateAlias(domain, alias, forward) {
        const url = `${this.apiUrl}/domains/${domain}/aliases/${alias}`;
        const payload = { forward };
        return this.axiosRequest('PUT', url, payload);
    }
    deleteAlias(domain, alias) {
        const url = `${this.apiUrl}/domains/${domain}/aliases/${alias}`;
        return this.axiosRequest('DELETE', url);
    }
    addAliasesBulk(domain, aliases, behavior = 'add') {
        const url = `${this.apiUrl}/domains/${domain}/aliases/bulk`;
        const payload = { aliases, behavior };
        return this.axiosRequest('POST', url, payload);
    }
    getLogs(domain, next_cursor) {
        const url = `${this.apiUrl}/domains/${domain}/logs`;
        const params = next_cursor ? { next_cursor } : {};
        return this.axiosRequest('GET', url, null, params);
    }
    getAliasLogs(domain, alias, next_cursor) {
        const url = `${this.apiUrl}/domains/${domain}/logs/${alias}`;
        const params = next_cursor ? { next_cursor } : {};
        return this.axiosRequest('GET', url, null, params);
    }
    getSmtpCredentials(domain) {
        const url = `${this.apiUrl}/domains/${domain}/credentials`;
        return this.axiosRequest('GET', url);
    }
    addSmtpCredential(domain, username, password) {
        const url = `${this.apiUrl}/domains/${domain}/credentials`;
        const payload = { username, password };
        return this.axiosRequest('POST', url, payload);
    }
    updateSmtpCredential(domain, username, password) {
        const url = `${this.apiUrl}/domains/${domain}/credentials/${username}`;
        const payload = { password };
        return this.axiosRequest('PUT', url, payload);
    }
    deleteSmtpCredential(domain, username) {
        const url = `${this.apiUrl}/domains/${domain}/credentials/${username}`;
        return this.axiosRequest('DELETE', url);
    }
};
exports.ImprovmxService = ImprovmxService;
exports.ImprovmxService = ImprovmxService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        axios_1.HttpService])
], ImprovmxService);
//# sourceMappingURL=improvmx.service.js.map