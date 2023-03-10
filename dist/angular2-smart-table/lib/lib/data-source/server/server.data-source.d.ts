import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalDataSource } from '../local/local.data-source';
import { ServerSourceConf } from './server-source.conf';
export declare class ServerDataSource extends LocalDataSource {
    protected http: HttpClient;
    protected conf: ServerSourceConf;
    protected lastRequestCount: number;
    constructor(http: HttpClient, conf?: ServerSourceConf | {});
    count(): number;
    getAll(): Promise<any>;
    getElements(): Promise<any>;
    getFilteredAndSorted(): Promise<any>;
    protected loadData(filtered: boolean, sorted: boolean, paginated: boolean): Promise<any>;
    /**
     * Extracts array of data from server response
     * @param res
     * @returns {any}
     */
    protected extractDataFromResponse(res: any): Array<any>;
    /**
     * Extracts total rows count from the server response
     * Looks for the count in the heders first, then in the response body
     * @param res
     * @returns {any}
     */
    protected extractTotalFromResponse(res: any): number;
    protected requestElements(filtered: boolean, sorted: boolean, paginated: boolean): Observable<any>;
    protected addSortRequestParams(httpParams: HttpParams): HttpParams;
    protected addFilterRequestParams(httpParams: HttpParams): HttpParams;
    protected addPagerRequestParams(httpParams: HttpParams): HttpParams;
}
