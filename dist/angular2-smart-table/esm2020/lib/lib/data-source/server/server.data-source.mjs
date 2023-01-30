import { HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { LocalDataSource } from '../local/local.data-source';
import { ServerSourceConf } from './server-source.conf';
import { getDeepFromObject } from '../../helpers';
import { map } from 'rxjs/operators';
export class ServerDataSource extends LocalDataSource {
    constructor(http, conf = {}) {
        super();
        this.http = http;
        this.lastRequestCount = 0;
        this.conf = new ServerSourceConf(conf);
        if (!this.conf.endPoint) {
            throw new Error('At least endPoint must be specified as a configuration of the server data source.');
        }
    }
    count() {
        return this.lastRequestCount;
    }
    getAll() {
        return this.loadData(false, false, false);
    }
    getElements() {
        return this.loadData(true, true, true);
    }
    getFilteredAndSorted() {
        return this.loadData(true, true, false);
    }
    loadData(filtered, sorted, paginated) {
        return lastValueFrom(this.requestElements(filtered, sorted, paginated)
            .pipe(map(res => {
            this.lastRequestCount = this.extractTotalFromResponse(res);
            // TODO: the following two lines are obviously incorrect
            //       but whoever hacked this ServerDataSource into the project did not think about compatibility to the interface
            this.data = this.extractDataFromResponse(res);
            this.filteredAndSorted = this.data;
            return this.data;
        })));
    }
    /**
     * Extracts array of data from server response
     * @param res
     * @returns {any}
     */
    extractDataFromResponse(res) {
        const rawData = res.body;
        const data = !!this.conf.dataKey ? getDeepFromObject(rawData, this.conf.dataKey, []) : rawData;
        if (data instanceof Array) {
            return data;
        }
        throw new Error(`Data must be an array.
    Please check that data extracted from the server response by the key '${this.conf.dataKey}' exists and is array.`);
    }
    /**
     * Extracts total rows count from the server response
     * Looks for the count in the heders first, then in the response body
     * @param res
     * @returns {any}
     */
    extractTotalFromResponse(res) {
        if (res.headers.has(this.conf.totalKey)) {
            return +res.headers.get(this.conf.totalKey);
        }
        else {
            const rawData = res.body;
            return getDeepFromObject(rawData, this.conf.totalKey, 0);
        }
    }
    requestElements(filtered, sorted, paginated) {
        let httpParams = new HttpParams();
        if (filtered)
            httpParams = this.addFilterRequestParams(httpParams);
        if (sorted)
            httpParams = this.addSortRequestParams(httpParams);
        if (paginated)
            httpParams = this.addPagerRequestParams(httpParams);
        return this.http.get(this.conf.endPoint, { params: httpParams, observe: 'response' });
    }
    addSortRequestParams(httpParams) {
        if (this.sortConf) {
            let fields = [];
            let directions = [];
            this.sortConf.forEach((fieldConf) => {
                if (fieldConf.direction !== null) {
                    fields.push(fieldConf.field);
                    directions.push(fieldConf.direction.toUpperCase());
                }
            });
            httpParams = httpParams.set(this.conf.sortFieldKey, fields.join(','));
            httpParams = httpParams.set(this.conf.sortDirKey, directions.join(','));
        }
        return httpParams;
    }
    addFilterRequestParams(httpParams) {
        if (this.filterConf.filters) {
            this.filterConf.filters.forEach((fieldConf) => {
                if (fieldConf['search']) {
                    httpParams = httpParams.set(this.conf.filterFieldKey.replace('#field#', fieldConf['field']), fieldConf['search']);
                }
            });
        }
        return httpParams;
    }
    addPagerRequestParams(httpParams) {
        httpParams = httpParams.set(this.conf.pagerPageKey, this.pagingConf.page);
        httpParams = httpParams.set(this.conf.pagerLimitKey, this.pagingConf.perPage);
        return httpParams;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmRhdGEtc291cmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9saWIvZGF0YS1zb3VyY2Uvc2VydmVyL3NlcnZlci5kYXRhLXNvdXJjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGFBQWEsRUFBYSxNQUFNLE1BQU0sQ0FBQztBQUUvQyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDM0QsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWhELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuQyxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsZUFBZTtJQU1uRCxZQUFzQixJQUFnQixFQUFFLE9BQThCLEVBQUU7UUFDdEUsS0FBSyxFQUFFLENBQUM7UUFEWSxTQUFJLEdBQUosSUFBSSxDQUFZO1FBRjVCLHFCQUFnQixHQUFXLENBQUMsQ0FBQztRQUtyQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsbUZBQW1GLENBQUMsQ0FBQztTQUN0RztJQUNILENBQUM7SUFFUSxLQUFLO1FBQ1osT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7SUFDL0IsQ0FBQztJQUVRLE1BQU07UUFDYixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1QyxDQUFD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LE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUFFUyxxQkFBcUIsQ0FBQyxVQUFzQjtRQUNwRCxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFFLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUUsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtIdHRwQ2xpZW50LCBIdHRwUGFyYW1zfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge2xhc3RWYWx1ZUZyb20sIE9ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0xvY2FsRGF0YVNvdXJjZX0gZnJvbSAnLi4vbG9jYWwvbG9jYWwuZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtTZXJ2ZXJTb3VyY2VDb25mfSBmcm9tICcuL3NlcnZlci1zb3VyY2UuY29uZic7XG5pbXBvcnQge2dldERlZXBGcm9tT2JqZWN0fSBmcm9tICcuLi8uLi9oZWxwZXJzJztcblxuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIFNlcnZlckRhdGFTb3VyY2UgZXh0ZW5kcyBMb2NhbERhdGFTb3VyY2Uge1xuXG4gIHByb3RlY3RlZCBjb25mOiBTZXJ2ZXJTb3VyY2VDb25mO1xuXG4gIHByb3RlY3RlZCBsYXN0UmVxdWVzdENvdW50OiBudW1iZXIgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBodHRwOiBIdHRwQ2xpZW50LCBjb25mOiBTZXJ2ZXJTb3VyY2VDb25mIHwge30gPSB7fSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNvbmYgPSBuZXcgU2VydmVyU291cmNlQ29uZihjb25mKTtcblxuICAgIGlmICghdGhpcy5jb25mLmVuZFBvaW50KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0F0IGxlYXN0IGVuZFBvaW50IG11c3QgYmUgc3BlY2lmaWVkIGFzIGEgY29uZmlndXJhdGlvbiBvZiB0aGUgc2VydmVyIGRhdGEgc291cmNlLicpO1xuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIGNvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubGFzdFJlcXVlc3RDb3VudDtcbiAgfVxuXG4gIG92ZXJyaWRlIGdldEFsbCgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmxvYWREYXRhKGZhbHNlLCBmYWxzZSwgZmFsc2UpO1xuICB9XG5cbiAgb3ZlcnJpZGUgZ2V0RWxlbWVudHMoKTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5sb2FkRGF0YSh0cnVlLCB0cnVlLCB0cnVlKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGdldEZpbHRlcmVkQW5kU29ydGVkKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMubG9hZERhdGEodHJ1ZSwgdHJ1ZSwgZmFsc2UpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGxvYWREYXRhKGZpbHRlcmVkOiBib29sZWFuLCBzb3J0ZWQ6IGJvb2xlYW4sIHBhZ2luYXRlZDogYm9vbGVhbik6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIGxhc3RWYWx1ZUZyb20odGhpcy5yZXF1ZXN0RWxlbWVudHMoZmlsdGVyZWQsIHNvcnRlZCwgcGFnaW5hdGVkKVxuICAgICAgLnBpcGUobWFwKHJlcyA9PiB7XG4gICAgICAgIHRoaXMubGFzdFJlcXVlc3RDb3VudCA9IHRoaXMuZXh0cmFjdFRvdGFsRnJvbVJlc3BvbnNlKHJlcyk7XG4gICAgICAgIC8vIFRPRE86IHRoZSBmb2xsb3dpbmcgdHdvIGxpbmVzIGFyZSBvYnZpb3VzbHkgaW5jb3JyZWN0XG4gICAgICAgIC8vICAgICAgIGJ1dCB3aG9ldmVyIGhhY2tlZCB0aGlzIFNlcnZlckRhdGFTb3VyY2UgaW50byB0aGUgcHJvamVjdCBkaWQgbm90IHRoaW5rIGFib3V0IGNvbXBhdGliaWxpdHkgdG8gdGhlIGludGVyZmFjZVxuICAgICAgICB0aGlzLmRhdGEgPSB0aGlzLmV4dHJhY3REYXRhRnJvbVJlc3BvbnNlKHJlcyk7XG4gICAgICAgIHRoaXMuZmlsdGVyZWRBbmRTb3J0ZWQgPSB0aGlzLmRhdGE7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGE7XG4gICAgICB9KSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4dHJhY3RzIGFycmF5IG9mIGRhdGEgZnJvbSBzZXJ2ZXIgcmVzcG9uc2VcbiAgICogQHBhcmFtIHJlc1xuICAgKiBAcmV0dXJucyB7YW55fVxuICAgKi9cbiAgcHJvdGVjdGVkIGV4dHJhY3REYXRhRnJvbVJlc3BvbnNlKHJlczogYW55KTogQXJyYXk8YW55PiB7XG4gICAgY29uc3QgcmF3RGF0YSA9IHJlcy5ib2R5O1xuICAgIGNvbnN0IGRhdGEgPSAhIXRoaXMuY29uZi5kYXRhS2V5ID8gZ2V0RGVlcEZyb21PYmplY3QocmF3RGF0YSwgdGhpcy5jb25mLmRhdGFLZXksIFtdKSA6IHJhd0RhdGE7XG5cbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoYERhdGEgbXVzdCBiZSBhbiBhcnJheS5cbiAgICBQbGVhc2UgY2hlY2sgdGhhdCBkYXRhIGV4dHJhY3RlZCBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2UgYnkgdGhlIGtleSAnJHt0aGlzLmNvbmYuZGF0YUtleX0nIGV4aXN0cyBhbmQgaXMgYXJyYXkuYCk7XG4gIH1cblxuICAvKipcbiAgICogRXh0cmFjdHMgdG90YWwgcm93cyBjb3VudCBmcm9tIHRoZSBzZXJ2ZXIgcmVzcG9uc2VcbiAgICogTG9va3MgZm9yIHRoZSBjb3VudCBpbiB0aGUgaGVkZXJzIGZpcnN0LCB0aGVuIGluIHRoZSByZXNwb25zZSBib2R5XG4gICAqIEBwYXJhbSByZXNcbiAgICogQHJldHVybnMge2FueX1cbiAgICovXG4gIHByb3RlY3RlZCBleHRyYWN0VG90YWxGcm9tUmVzcG9uc2UocmVzOiBhbnkpOiBudW1iZXIge1xuICAgIGlmIChyZXMuaGVhZGVycy5oYXModGhpcy5jb25mLnRvdGFsS2V5KSkge1xuICAgICAgcmV0dXJuICtyZXMuaGVhZGVycy5nZXQodGhpcy5jb25mLnRvdGFsS2V5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcmF3RGF0YSA9IHJlcy5ib2R5O1xuICAgICAgcmV0dXJuIGdldERlZXBGcm9tT2JqZWN0KHJhd0RhdGEsIHRoaXMuY29uZi50b3RhbEtleSwgMCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIHJlcXVlc3RFbGVtZW50cyhmaWx0ZXJlZDogYm9vbGVhbiwgc29ydGVkOiBib29sZWFuLCBwYWdpbmF0ZWQ6IGJvb2xlYW4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGxldCBodHRwUGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcblxuICAgIGlmIChmaWx0ZXJlZCkgaHR0cFBhcmFtcyA9IHRoaXMuYWRkRmlsdGVyUmVxdWVzdFBhcmFtcyhodHRwUGFyYW1zKTtcbiAgICBpZiAoc29ydGVkKSBodHRwUGFyYW1zID0gdGhpcy5hZGRTb3J0UmVxdWVzdFBhcmFtcyhodHRwUGFyYW1zKTtcbiAgICBpZiAocGFnaW5hdGVkKSBodHRwUGFyYW1zID0gdGhpcy5hZGRQYWdlclJlcXVlc3RQYXJhbXMoaHR0cFBhcmFtcyk7XG5cbiAgICByZXR1cm4gdGhpcy5odHRwLmdldCh0aGlzLmNvbmYuZW5kUG9pbnQsIHsgcGFyYW1zOiBodHRwUGFyYW1zLCBvYnNlcnZlOiAncmVzcG9uc2UnIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZFNvcnRSZXF1ZXN0UGFyYW1zKGh0dHBQYXJhbXM6IEh0dHBQYXJhbXMpOiBIdHRwUGFyYW1zIHtcbiAgICBpZiAodGhpcy5zb3J0Q29uZikge1xuICAgICAgbGV0IGZpZWxkczogc3RyaW5nW10gPSBbXTtcbiAgICAgIGxldCBkaXJlY3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgdGhpcy5zb3J0Q29uZi5mb3JFYWNoKChmaWVsZENvbmYpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkQ29uZi5kaXJlY3Rpb24gIT09IG51bGwpIHtcbiAgICAgICAgICBmaWVsZHMucHVzaChmaWVsZENvbmYuZmllbGQpO1xuICAgICAgICAgIGRpcmVjdGlvbnMucHVzaChmaWVsZENvbmYuZGlyZWN0aW9uLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCh0aGlzLmNvbmYuc29ydEZpZWxkS2V5LCBmaWVsZHMuam9pbignLCcpKTtcbiAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCh0aGlzLmNvbmYuc29ydERpcktleSwgZGlyZWN0aW9ucy5qb2luKCcsJykpO1xuICAgIH1cblxuICAgIHJldHVybiBodHRwUGFyYW1zO1xuICB9XG5cbiAgcHJvdGVjdGVkIGFkZEZpbHRlclJlcXVlc3RQYXJhbXMoaHR0cFBhcmFtczogSHR0cFBhcmFtcyk6IEh0dHBQYXJhbXMge1xuXG4gICAgaWYgKHRoaXMuZmlsdGVyQ29uZi5maWx0ZXJzKSB7XG4gICAgICB0aGlzLmZpbHRlckNvbmYuZmlsdGVycy5mb3JFYWNoKChmaWVsZENvbmY6IGFueSkgPT4ge1xuICAgICAgICBpZiAoZmllbGRDb25mWydzZWFyY2gnXSkge1xuICAgICAgICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCh0aGlzLmNvbmYuZmlsdGVyRmllbGRLZXkucmVwbGFjZSgnI2ZpZWxkIycsIGZpZWxkQ29uZlsnZmllbGQnXSksIGZpZWxkQ29uZlsnc2VhcmNoJ10pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gaHR0cFBhcmFtcztcbiAgfVxuXG4gIHByb3RlY3RlZCBhZGRQYWdlclJlcXVlc3RQYXJhbXMoaHR0cFBhcmFtczogSHR0cFBhcmFtcyk6IEh0dHBQYXJhbXMge1xuICAgIGh0dHBQYXJhbXMgPSBodHRwUGFyYW1zLnNldCh0aGlzLmNvbmYucGFnZXJQYWdlS2V5LCB0aGlzLnBhZ2luZ0NvbmYucGFnZSk7XG4gICAgaHR0cFBhcmFtcyA9IGh0dHBQYXJhbXMuc2V0KHRoaXMuY29uZi5wYWdlckxpbWl0S2V5LCB0aGlzLnBhZ2luZ0NvbmYucGVyUGFnZSk7XG4gICAgcmV0dXJuIGh0dHBQYXJhbXM7XG4gIH1cbn1cbiJdfQ==