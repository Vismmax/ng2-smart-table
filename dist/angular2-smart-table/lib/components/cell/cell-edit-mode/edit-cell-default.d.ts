import { EventEmitter } from '@angular/core';
import { Cell } from '../../../lib/data-set/cell';
import * as i0 from "@angular/core";
export declare class EditCellDefault {
    cell: Cell;
    inputClass: string;
    edited: EventEmitter<void>;
    stopEditing: EventEmitter<void>;
    onEdited(): boolean;
    onStopEditing(): boolean;
    onClick(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EditCellDefault, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<EditCellDefault, "ng-component", never, { "cell": "cell"; "inputClass": "inputClass"; }, { "edited": "edited"; "stopEditing": "stopEditing"; }, never, never>;
}
