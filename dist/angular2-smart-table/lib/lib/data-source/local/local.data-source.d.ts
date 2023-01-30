import { DataSource, IDataSourceFilter, IFilterConfig, IPagingConfig, ISortConfig } from '../data-source';
export declare class LocalDataSource extends DataSource {
    protected data: Array<any>;
    protected filteredAndSorted: Array<any>;
    protected sortConf: Array<ISortConfig>;
    protected filterConf: IDataSourceFilter;
    protected pagingConf: IPagingConfig;
    private selectedItems;
    constructor(data?: Array<any>);
    load(data: Array<any>): Promise<any>;
    prepend(element: any): Promise<any>;
    append(element: any): Promise<any>;
    add(element: any): Promise<any>;
    remove(element: any): Promise<any>;
    update(element: any, values: any): Promise<any>;
    find(element: any): Promise<any>;
    getElements(): Promise<any>;
    getFilteredAndSorted(): Promise<any>;
    getAll(): Promise<any>;
    reset(silent?: boolean): void;
    empty(): Promise<any>;
    count(): number;
    toggleItem(row: any, isSelected: boolean): void;
    selectAllItems(checked: boolean, onlyFiltered?: boolean): Promise<void>;
    isEveryElementSelected(onlyFiltered?: boolean): boolean;
    getSelectedItems(): Array<any>;
    setSort(conf: Array<ISortConfig>, doEmit?: boolean): LocalDataSource;
    updateSort(conf: Array<ISortConfig>, doEmit?: boolean): LocalDataSource;
    /**
     *
     * Array of conf objects
     * [
     *  {field: string, search: string, filter: Function|null},
     * ]
     * @param conf
     * @param andOperator
     * @param doEmit
     * @returns {LocalDataSource}
     */
    setFilter(conf: Array<IFilterConfig>, andOperator?: boolean, doEmit?: boolean): LocalDataSource;
    addFilter(fieldConf: IFilterConfig, andOperator?: boolean, doEmit?: boolean): LocalDataSource;
    setPaging(page: number, perPage: number, doEmit?: boolean): LocalDataSource;
    setPage(page: number, doEmit?: boolean): LocalDataSource;
    getSort(): Array<ISortConfig>;
    getFilter(): IDataSourceFilter;
    getPaging(): IPagingConfig;
    protected prepareData(data: Array<any>): Array<any>;
    protected sort(data: Array<any>): Array<any>;
    protected filter(data: Array<any>): Array<any>;
    protected paginate(data: Array<any>): Array<any>;
}
