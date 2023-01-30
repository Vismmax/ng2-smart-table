import { EventEmitter, OnChanges } from "@angular/core";
import { Row } from "../../../lib/data-set/row";
import { Grid } from "../../../lib/grid";
import { SecurityTrustType } from '../../../pipes/bypass-security-trust.pipe';
import * as i0 from "@angular/core";
export declare class TbodyExpandRowComponent implements OnChanges {
    grid: Grid;
    row: Row;
    onExpandRow: EventEmitter<any>;
    buttonContent: string;
    bypassSecurityTrust: SecurityTrustType;
    hiddenWhenFunction: (row: Row) => boolean;
    disabledWhenFunction: (row: Row) => boolean;
    constructor();
    get visible(): boolean;
    get disabled(): boolean;
    onExpand(event: any): void;
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TbodyExpandRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TbodyExpandRowComponent, "angular2-st-tbody-expand", never, { "grid": "grid"; "row": "row"; }, { "onExpandRow": "onExpandRow"; }, never, never>;
}
