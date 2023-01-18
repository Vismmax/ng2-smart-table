import { EventEmitter, OnChanges } from '@angular/core';
import { Grid } from '../../../lib/grid';
import * as i0 from "@angular/core";
export declare class ActionsComponent implements OnChanges {
    grid: Grid;
    create: EventEmitter<any>;
    createButtonContent: string;
    cancelButtonContent: string;
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ActionsComponent, "ng2-st-actions", never, { "grid": "grid"; }, { "create": "create"; }, never, never, false>;
}
