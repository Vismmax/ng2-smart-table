import { Observable, Subject } from 'rxjs';
import { Column } from './data-set/column';
import { Row } from './data-set/row';
import { DataSet } from './data-set/data-set';
import { DataSource, DataSourceChangeEvent } from './data-source/data-source';
import { EventEmitter } from '@angular/core';
import { Settings } from "./settings";
import { CreateConfirmEvent, DeleteConfirmEvent, EditConfirmEvent } from './events';
export declare class Grid {
    createFormShown: boolean;
    source: DataSource;
    settings: Settings;
    dataSet: DataSet;
    onSelectRowSource: Subject<any>;
    private sourceOnChangedSubscription;
    private sourceOnUpdatedSubscription;
    constructor(source: DataSource, settings: any);
    detach(): void;
    showActionColumn(position: string): boolean;
    isCurrentActionsPosition(position: string): boolean;
    isActionsVisible(): boolean;
    isMultiSelectVisible(): boolean;
    getNewRow(): Row;
    setSettings(settings: Settings): void;
    getDataSet(): DataSet;
    setSource(source: DataSource): void;
    getSetting(name: string, defaultValue?: any): any;
    getColumns(): Array<Column>;
    getRows(): Array<Row>;
    selectRow(row: Row): void;
    multipleSelectRow(row: Row): void;
    onSelectRow(): Observable<any>;
    expandRow(row: Row): void;
    edit(row: Row): void;
    create(row: Row, confirmEmitter: EventEmitter<CreateConfirmEvent>): void;
    save(row: Row, confirmEmitter: EventEmitter<EditConfirmEvent>): void;
    delete(row: Row, confirmEmitter: EventEmitter<DeleteConfirmEvent>): void;
    processDataChange(changes: DataSourceChangeEvent): void;
    shouldProcessChange(changes: DataSourceChangeEvent): boolean;
    /**
     * @breaking-change 1.8.0
     * Need to add `| null` in return type
     *
     * TODO: move to selectable? Separate directive
     */
    determineRowToSelect(changes: DataSourceChangeEvent): Row | null;
    prepareSource(source: any): DataSource;
    getInitialSort(): any;
    getSelectedRows(): Array<any>;
    getSelectedItems(): Array<any>;
    selectAllRows(status: boolean): Promise<void>;
    getFirstRow(): Row;
    getLastRow(): Row;
    private getSelectionInfo;
    private getRowIndexToSelect;
    private getPageToSelect;
    private shouldSkipSelection;
}
