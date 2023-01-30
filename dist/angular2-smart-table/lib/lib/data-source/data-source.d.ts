import { Observable, Subject } from 'rxjs';
import { ISortDirection } from '../settings';
export interface ISortConfig {
    field: string;
    direction: ISortDirection;
    compare?: Function;
}
export interface IFilterConfig {
    field: string;
    search: string;
    filter?: Function;
}
export interface IDataSourceFilter {
    filters: Array<IFilterConfig>;
    andOperator: boolean;
}
export interface IPagingConfig {
    page: number;
    perPage: number;
}
export interface DataSourceChangeEvent {
    action: string;
    elements: any;
    paging: IPagingConfig;
    filter: IDataSourceFilter;
    sort: ISortConfig[];
}
export declare abstract class DataSource {
    protected onChangedSource: Subject<DataSourceChangeEvent>;
    protected onAddedSource: Subject<any>;
    protected onUpdatedSource: Subject<any>;
    protected onRemovedSource: Subject<any>;
    abstract getAll(): Promise<any>;
    abstract getElements(): Promise<any>;
    abstract getFilteredAndSorted(): Promise<any>;
    abstract getSort(): Array<ISortConfig>;
    abstract getFilter(): IDataSourceFilter;
    abstract getPaging(): IPagingConfig;
    /**
     * Returns the total number of elements with respect to the current filter.
     */
    abstract count(): number;
    abstract toggleItem(row: any, isSelected: boolean): void;
    abstract selectAllItems(checked: boolean, onlyFiltered: boolean): Promise<void>;
    abstract getSelectedItems(): Array<any>;
    abstract isEveryElementSelected(onlyFiltered: boolean): boolean;
    refresh(): void;
    load(data: Array<any>): Promise<any>;
    onChanged(): Observable<any>;
    onAdded(): Observable<any>;
    onUpdated(): Observable<any>;
    onRemoved(): Observable<any>;
    prepend(element: any): Promise<any>;
    append(element: any): Promise<any>;
    add(element: any): Promise<any>;
    remove(element: any): Promise<any>;
    update(element: any, values: any): Promise<any>;
    empty(): Promise<any>;
    /**
     *
     * Array of conf objects
     * [
     *  {field: string, direction: asc|desc|null, compare?: Function|null},
     * ]
     * @param conf the configuration to add
     * @param doEmit indicates whether a sort event shall be emitted
     * @returns this data source
     */
    setSort(conf: Array<ISortConfig>, doEmit?: boolean): void;
    /**
     *
     * Array of conf objects
     * [
     *  {field: string, direction: asc|desc|null, compare?: Function|null},
     * ]
     * @param conf the configuration to add
     * @param doEmit indicates whether a sort event shall be emitted
     * @returns this data source
     */
    updateSort(conf: Array<ISortConfig>, doEmit?: boolean): void;
    setFilter(conf: Array<IFilterConfig>, andOperator?: boolean, doEmit?: boolean): void;
    addFilter(fieldConf: IFilterConfig, andOperator?: boolean, doEmit?: boolean): void;
    setPaging(page: number, perPage: number, doEmit?: boolean): void;
    setPage(page: number, doEmit?: boolean): void;
    protected emitOnRemoved(element: any): void;
    protected emitOnUpdated(element: any): void;
    protected emitOnAdded(element: any): void;
    protected emitOnChanged(action: string): void;
}
