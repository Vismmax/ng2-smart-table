import { EventEmitter, OnChanges } from '@angular/core';
import { Grid } from '../../../lib/grid';
import { CreateCancelEvent, CreateConfirmEvent } from '../../../lib/events';
import { SecurityTrustType } from '../../../pipes/bypass-security-trust.pipe';
import * as i0 from "@angular/core";
export declare class TheadCreateCancelComponent implements OnChanges {
    grid: Grid;
    createConfirm: EventEmitter<CreateConfirmEvent>;
    createCancel: EventEmitter<CreateCancelEvent>;
    createButtonContent: string;
    cancelButtonContent: string;
    bypassSecurityTrust: SecurityTrustType;
    onCreate(event: MouseEvent): void;
    onCancelCreate(event: MouseEvent): void;
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TheadCreateCancelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TheadCreateCancelComponent, "angular2-st-actions", never, { "grid": "grid"; "createConfirm": "createConfirm"; "createCancel": "createCancel"; }, {}, never, never>;
}
