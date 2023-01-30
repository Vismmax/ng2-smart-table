import { EventEmitter, OnChanges } from '@angular/core';
import { Grid } from '../../../lib/grid';
import { DataSource } from '../../../lib/data-source/data-source';
import { Column } from "../../../lib/data-set/column";
import * as i0 from "@angular/core";
export declare class TheadTitlesRowComponent implements OnChanges {
    grid: Grid;
    isAllSelected: boolean;
    source: DataSource;
    hide: EventEmitter<any>;
    selectAllRows: EventEmitter<void>;
    multiSelectWidth: string;
    isMultiSelectVisible: boolean;
    showActionColumnLeft: boolean;
    showActionColumnRight: boolean;
    isResizable: boolean;
    isHideable: boolean;
    ngOnChanges(): void;
    getVisibleColumns(columns: Array<Column>): Array<Column>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TheadTitlesRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TheadTitlesRowComponent, "[angular2-st-thead-titles-row]", never, { "grid": "grid"; "isAllSelected": "isAllSelected"; "source": "source"; }, { "hide": "hide"; "selectAllRows": "selectAllRows"; }, never, never>;
}
