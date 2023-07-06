export interface CacheManager {
    identifier: string;
    get<T = any>(key: string): T;
    set(key: string, value: any): void;
    clear(key: string): void;
}
export declare abstract class AbstractCacheManager implements CacheManager {
    constructor(identifier?: string);
    identifier: string;
    abstract get<T = any>(key: string): T;
    abstract set(key: string, value: any): void;
    abstract clear(key: string): void;
}
