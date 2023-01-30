import { Cell } from '../../../lib/data-set/cell';
import { SecurityTrustType } from '../../../pipes/bypass-security-trust.pipe';
import * as i0 from "@angular/core";
export declare class ViewCellComponent {
    cell: Cell;
    get bypassSecurityTrust(): SecurityTrustType;
    get cssClass(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ViewCellComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ViewCellComponent, "table-cell-view-mode", never, { "cell": "cell"; }, {}, never, never>;
}
