import { Column } from './column';
import { DataSet } from './data-set';
import { Row } from './row';
export declare function prepareValue(value: any): any;
export declare class Cell {
    protected value: any;
    protected row: Row;
    protected column: any;
    protected dataSet: DataSet;
    newValue: any;
    protected static PREPARE: typeof prepareValue;
    constructor(value: any, row: Row, column: any, dataSet: DataSet);
    getColumn(): Column;
    getRow(): Row;
    /**
     * Gets the value (after post-processing with valuePrepareFunction).
     */
    getValue(): any;
    /**
     * Returns the raw value that has not been post-processed by the valuePrepareFunction.
     */
    getRawValue(): any;
    setValue(value: any): any;
    getId(): string;
    getTitle(): string;
    isEditable(): boolean;
    resetValue(): void;
}
