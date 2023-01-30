import { EventEmitter } from '@angular/core';
import { Grid } from '../../lib/grid';
import { Cell } from '../../lib/data-set/cell';
import { Row } from '../../lib/data-set/row';
import { CreateCancelEvent, CreateConfirmEvent, EditCancelEvent, EditConfirmEvent } from '../../lib/events';
import * as i0 from "@angular/core";
export declare class CellComponent {
    grid: Grid;
    row: Row;
    cell: Cell;
    inputClass: string;
    mode: string;
    isInEditing: boolean;
    isNew: boolean;
    editConfirm: EventEmitter<EditConfirmEvent>;
    editCancel: EventEmitter<EditCancelEvent>;
    createConfirm: EventEmitter<CreateConfirmEvent>;
    createCancel: EventEmitter<CreateCancelEvent>;
    onEdited(): void;
    onStopEditing(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CellComponent, "angular2-smart-table-cell", never, { "grid": "grid"; "row": "row"; "cell": "cell"; "inputClass": "inputClass"; "mode": "mode"; "isInEditing": "isInEditing"; "isNew": "isNew"; "editConfirm": "editConfirm"; "editCancel": "editCancel"; "createConfirm": "createConfirm"; "createCancel": "createCancel"; }, {}, never, never>;
}
