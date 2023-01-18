import { EventEmitter } from '@angular/core';
import { Grid } from '../../lib/grid';
import { Cell } from '../../lib/data-set/cell';
import { Row } from '../../lib/data-set/row';
import * as i0 from "@angular/core";
export declare class CellComponent {
    grid: Grid;
    row: Row;
    editConfirm: EventEmitter<any>;
    createConfirm: EventEmitter<any>;
    isNew: boolean;
    cell: Cell;
    inputClass: string;
    mode: string;
    isInEditing: boolean;
    edited: EventEmitter<any>;
    onEdited(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CellComponent, "ng2-smart-table-cell", never, { "grid": "grid"; "row": "row"; "editConfirm": "editConfirm"; "createConfirm": "createConfirm"; "isNew": "isNew"; "cell": "cell"; "inputClass": "inputClass"; "mode": "mode"; "isInEditing": "isInEditing"; }, { "edited": "edited"; }, never, never, false>;
}
