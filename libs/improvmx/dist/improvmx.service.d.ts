import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
export declare class ImprovmxService {
    private configService;
    private readonly httpService;
    private readonly apiKey;
    private readonly apiUrl;
    constructor(configService: ConfigService, httpService: HttpService);
    private getHeaders;
    private getAuthHeader;
    private handleError;
    private axiosRequest;
    private httpServiceRequest;
    getAccount(): import("rxjs").Observable<any>;
    getWhitelabels(): import("rxjs").Observable<any>;
    getDomains(params?: {
        q?: string;
        is_active?: boolean;
        limit?: number;
        page?: number;
    }): import("rxjs").Observable<any>;
    addDomain(domain: string, notification_email?: string, whitelabel?: string): import("rxjs").Observable<any>;
    getDomainDetails(domain: string): import("rxjs").Observable<any>;
    updateDomain(domain: string, notification_email?: string, webhook?: string, whitelabel?: string): import("rxjs").Observable<any>;
    deleteDomain(domain: string): import("rxjs").Observable<any>;
    checkDomain(domain: string): import("rxjs").Observable<any>;
    getAliases(domain: string, params?: {
        q?: string;
        alias?: string;
        is_active?: boolean;
        page?: number;
    }): import("rxjs").Observable<any>;
    createAlias(domain: string, alias: string, forward: string): Promise<void>;
    getAlias(domain: string, alias: string): Promise<any>;
    updateAlias(domain: string, alias: string, forward: string): Promise<void>;
    deleteAlias(domain: string, alias: string): Promise<void>;
    addAliasesBulk(domain: string, aliases: Array<{
        alias: string;
        forward: string;
    }>, behavior?: string): Promise<any>;
    getLogs(domain: string, next_cursor?: string): Promise<any>;
    getAliasLogs(domain: string, alias: string, next_cursor?: string): Promise<any>;
    getSmtpCredentials(domain: string): Promise<any>;
    addSmtpCredential(domain: string, username: string, password: string): Promise<any>;
    updateSmtpCredential(domain: string, username: string, password: string): Promise<any>;
    deleteSmtpCredential(domain: string, username: string): Promise<any>;
}
