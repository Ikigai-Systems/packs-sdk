import type { Credentials } from './auth_types';
import type { PackVersionDefinition } from '../types';
interface SetupAuthOptions {
    oauthServerPort?: number;
}
export declare const DEFAULT_OAUTH_SERVER_PORT = 3000;
export declare function setupAuthFromModule(manifestPath: string, manifest: PackVersionDefinition, opts?: SetupAuthOptions): Promise<void>;
export declare function setupAuth(manifestDir: string, packDef: PackVersionDefinition, opts?: SetupAuthOptions): void;
export declare function storeCredential(manifestDir: string, credentials: Credentials): void;
export declare function readCredentialsFile(manifestDir: string): Credentials | undefined;
export {};
