import { Row } from './row';
import { Column } from './column';
export declare class DataSet {
    protected columnSettings: Object;
    newRow: Row;
    protected data: Array<Row>;
    protected columns: Array<Column>;
    protected rows: Array<Row>;
    protected selectedRow?: Row;
    protected expandedRow?: Row;
    protected willSelect: string;
    constructor(data: any[] | undefined, columnSettings: Object);
    setData(data: Array<any>, selectedRows?: Array<any>): void;
    getColumns(): Array<Column>;
    getExpandedRow(): Row;
    getSelectedRow(): Row;
    getRows(): Array<Row>;
    getFirstRow(): Row;
    getLastRow(): Row;
    findRowByData(data: any): Row;
    deselectAll(): void;
    clearExpandAll(): void;
    selectRow(row: Row): void;
    multipleSelectRow(row: Row): void;
    expandRow(row: Row): Row;
    selectPreviousRow(): Row;
    selectFirstRow(): Row;
    selectLastRow(): Row;
    selectRowByIndex(index?: number): void;
    willSelectFirstRow(): void;
    willSelectLastRow(): void;
    select(selectedRowIndex?: number): Row;
    createNewRow(): void;
    /**
     * Create columns by mapping from the settings
     * @param settings
     * @private
     */
    createColumns(settings: any): void;
    /**
     * Create rows based on current data prepared in data source
     * @private
     */
    createRows(): void;
}
