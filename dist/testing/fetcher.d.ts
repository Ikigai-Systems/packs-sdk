import type { Authentication } from '../types';
import type { Credentials } from './auth_types';
import type { ExecutionContext } from '../api';
import type { FetchRequest } from '../api_types';
import type { FetchResponse } from '../api_types';
import type { Fetcher } from '../api_types';
import type { Response } from 'request';
import type { SyncExecutionContext } from '../api_types';
export declare class AuthenticatingFetcher implements Fetcher {
    private readonly _authDef;
    private readonly _networkDomains;
    private readonly _credentials;
    constructor(authDef: Authentication | undefined, networkDomains: string[] | undefined, credentials: Credentials | undefined);
    fetch<T = any>(request: FetchRequest): Promise<FetchResponse<T>>;
    private _applyAuthentication;
    private _applyAndValidateEndpoint;
    private _validateHost;
}
export declare const requestHelper: {
    makeRequest: (request: FetchRequest) => Promise<Response>;
};
export declare function newFetcherExecutionContext(authDef: Authentication | undefined, networkDomains: string[] | undefined, credentials?: Credentials): ExecutionContext;
export declare function newFetcherSyncExecutionContext(authDef: Authentication | undefined, networkDomains: string[] | undefined, credentials?: Credentials): SyncExecutionContext;
