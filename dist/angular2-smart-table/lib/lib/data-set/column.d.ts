import { ColumnFilterFunction, ColumnValuePrepareFunction, IColumn, IColumnType, ISortDirection, SanitizerSettings } from '../settings';
import { DataSet } from './data-set';
export declare class Column implements IColumn {
    id: string;
    protected settings: any;
    protected dataSet: DataSet;
    placeholder?: string;
    title: string;
    hide: boolean;
    type?: IColumnType;
    sanitizer: SanitizerSettings;
    classHeader?: string;
    classContent?: string;
    width?: string;
    isSortable?: boolean;
    isEditable?: boolean;
    isAddable?: boolean;
    isFilterable?: boolean;
    sortDirection: ISortDirection;
    defaultSortDirection?: ISortDirection;
    editor?: {
        type: string;
        config: any;
        component: any;
    };
    filter?: {
        type: string;
        config: any;
        component: any;
    };
    renderComponent?: any;
    compareFunction?: Function;
    valuePrepareFunction?: ColumnValuePrepareFunction;
    filterFunction?: ColumnFilterFunction;
    onComponentInitFunction?: Function;
    constructor(id: string, settings: any, dataSet: DataSet);
    getOnComponentInitFunction(): Function | undefined;
    getCompareFunction(): Function | undefined;
    getValuePrepareFunction(): Function | undefined;
    getFilterFunction(): Function | undefined;
    getConfig(): any;
    getFilterType(): any;
    getFilterConfig(): any;
    /**
     * Retrieves a setting by name.
     *
     * @param key the current key name
     * @param compatKeys key names for backwards compatibility
     * @private
     */
    private lookupSetting;
    protected process(): void;
    determineType(): IColumnType;
}
