import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { map } from 'rxjs/operators';

@Injectable()
export class ImprovmxService {
  private readonly apiKey: string;
  private readonly apiUrl: string;

  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiKey = this.configService.get<string>('SMTP_API_KEY');
    this.apiUrl = 'https://api.improvmx.com/v3';
  }

  private getHeaders() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  private getAuthHeader() {
    return `Basic ${Buffer.from(`api:${this.apiKey}`).toString('base64')}`;
  }

  private handleError(error: any) {
    console.error('Error:', error);
    throw error;
  }

  // Method to make HTTP requests using axios
  private async axiosRequest(
    method: string,
    url: string,
    data?: any,
    params?: any,
  ) {
    try {
      const response = await axios({
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
    } catch (error) {
      this.handleError(error);
    }
  }

  // Method to make HTTP requests using HttpService (for RxJS usage)
  private httpServiceRequest(
    method: string,
    url: string,
    data?: any,
    params?: any,
  ) {
    return this.httpService
      .request({
        method,
        url,
        headers: this.getHeaders(),
        data,
        params,
      })
      .pipe(map((response) => response.data));
  }

  // Account endpoints
  getAccount() {
    return this.httpServiceRequest('GET', `${this.apiUrl}/account/`);
  }

  getWhitelabels() {
    return this.httpServiceRequest(
      'GET',
      `${this.apiUrl}/account/whitelabels/`,
    );
  }

  // Domain endpoints
  getDomains(params?: {
    q?: string;
    is_active?: boolean;
    limit?: number;
    page?: number;
  }) {
    return this.httpServiceRequest(
      'GET',
      `${this.apiUrl}/domains/`,
      null,
      params,
    );
  }

  addDomain(domain: string, notification_email?: string, whitelabel?: string) {
    const data = { domain, notification_email, whitelabel };
    return this.httpServiceRequest('POST', `${this.apiUrl}/domains/`, data);
  }

  getDomainDetails(domain: string) {
    return this.httpServiceRequest('GET', `${this.apiUrl}/domains/${domain}`);
  }

  updateDomain(
    domain: string,
    notification_email?: string,
    webhook?: string,
    whitelabel?: string,
  ) {
    const data = { notification_email, webhook, whitelabel };
    return this.httpServiceRequest(
      'PUT',
      `${this.apiUrl}/domains/${domain}`,
      data,
    );
  }

  deleteDomain(domain: string) {
    return this.httpServiceRequest(
      'DELETE',
      `${this.apiUrl}/domains/${domain}`,
    );
  }

  checkDomain(domain: string) {
    return this.httpServiceRequest(
      'GET',
      `${this.apiUrl}/domains/${domain}/check`,
    );
  }

  // Alias endpoints
  getAliases(
    domain: string,
    params?: { q?: string; alias?: string; is_active?: boolean; page?: number },
  ) {
    return this.httpServiceRequest(
      'GET',
      `${this.apiUrl}/domains/${domain}/aliases/`,
      null,
      params,
    );
  }

  createAlias(domain: string, alias: string, forward: string): Promise<void> {
    const url = `${this.apiUrl}/domains/${domain}/aliases`;
    const payload = { alias, forward };
    return this.axiosRequest('POST', url, payload);
  }

  getAlias(domain: string, alias: string): Promise<any> {
    const url = `${this.apiUrl}/domains/${domain}/aliases/${alias}`;
    return this.axiosRequest('GET', url);
  }

  updateAlias(domain: string, alias: string, forward: string): Promise<void> {
    const url = `${this.apiUrl}/domains/${domain}/aliases/${alias}`;
    const payload = { forward };
    return this.axiosRequest('PUT', url, payload);
  }

  deleteAlias(domain: string, alias: string): Promise<void> {
    const url = `${this.apiUrl}/domains/${domain}/aliases/${alias}`;
    return this.axiosRequest('DELETE', url);
  }

  addAliasesBulk(
    domain: string,
    aliases: Array<{ alias: string; forward: string }>,
    behavior: string = 'add',
  ): Promise<any> {
    const url = `${this.apiUrl}/domains/${domain}/aliases/bulk`;
    const payload = { aliases, behavior };
    return this.axiosRequest('POST', url, payload);
  }

  // Logs endpoints
  getLogs(domain: string, next_cursor?: string): Promise<any> {
    const url = `${this.apiUrl}/domains/${domain}/logs`;
    const params = next_cursor ? { next_cursor } : {};
    return this.axiosRequest('GET', url, null, params);
  }

  getAliasLogs(
    domain: string,
    alias: string,
    next_cursor?: string,
  ): Promise<any> {
    const url = `${this.apiUrl}/domains/${domain}/logs/${alias}`;
    const params = next_cursor ? { next_cursor } : {};
    return this.axiosRequest('GET', url, null, params);
  }

  // SMTP credentials endpoints
  getSmtpCredentials(domain: string): Promise<any> {
    const url = `${this.apiUrl}/domains/${domain}/credentials`;
    return this.axiosRequest('GET', url);
  }

  addSmtpCredential(
    domain: string,
    username: string,
    password: string,
  ): Promise<any> {
    const url = `${this.apiUrl}/domains/${domain}/credentials`;
    const payload = { username, password };
    return this.axiosRequest('POST', url, payload);
  }

  updateSmtpCredential(
    domain: string,
    username: string,
    password: string,
  ): Promise<any> {
    const url = `${this.apiUrl}/domains/${domain}/credentials/${username}`;
    const payload = { password };
    return this.axiosRequest('PUT', url, payload);
  }

  deleteSmtpCredential(domain: string, username: string): Promise<any> {
    const url = `${this.apiUrl}/domains/${domain}/credentials/${username}`;
    return this.axiosRequest('DELETE', url);
  }
}
