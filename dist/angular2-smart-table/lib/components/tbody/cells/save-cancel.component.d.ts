import { EventEmitter, OnChanges } from '@angular/core';
import { Grid } from '../../../lib/grid';
import { Row } from '../../../lib/data-set/row';
import { EditCancelEvent, EditConfirmEvent } from '../../../lib/events';
import { SecurityTrustType } from '../../../pipes/bypass-security-trust.pipe';
import * as i0 from "@angular/core";
export declare class TbodySaveCancelComponent implements OnChanges {
    grid: Grid;
    row: Row;
    editConfirm: EventEmitter<EditConfirmEvent>;
    editCancel: EventEmitter<EditCancelEvent>;
    cancelButtonContent: string;
    saveButtonContent: string;
    bypassSecurityTrust: SecurityTrustType;
    onSave(event: MouseEvent): void;
    onCancelEdit(event: MouseEvent): void;
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TbodySaveCancelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TbodySaveCancelComponent, "angular2-st-tbody-create-cancel", never, { "grid": "grid"; "row": "row"; "editConfirm": "editConfirm"; "editCancel": "editCancel"; }, {}, never, never>;
}
