import { EventEmitter, OnChanges } from '@angular/core';
import { Grid } from '../../../lib/grid';
import { Row } from '../../../lib/data-set/row';
import { Cell } from '../../../lib/data-set/cell';
import { CreateCancelEvent, CreateConfirmEvent } from '../../../lib/events';
import * as i0 from "@angular/core";
export declare class TheadFormRowComponent implements OnChanges {
    grid: Grid;
    row: Row;
    createConfirm: EventEmitter<CreateConfirmEvent>;
    createCancel: EventEmitter<CreateCancelEvent>;
    isMultiSelectVisible: boolean;
    showActionColumnLeft: boolean;
    showActionColumnRight: boolean;
    addInputClass: string;
    ngOnChanges(): void;
    getVisibleCells(cells: Array<Cell>): Array<Cell>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TheadFormRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TheadFormRowComponent, "[angular2-st-thead-form-row]", never, { "grid": "grid"; "row": "row"; "createConfirm": "createConfirm"; "createCancel": "createCancel"; }, {}, never, never>;
}
