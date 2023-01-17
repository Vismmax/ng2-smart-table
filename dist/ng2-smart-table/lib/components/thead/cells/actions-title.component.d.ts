import { AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { Grid } from '../../../lib/grid';
import * as i0 from "@angular/core";
export declare class ActionsTitleComponent implements AfterViewInit, OnChanges {
    private ref;
    grid: Grid;
    actionsColumnTitle: string;
    constructor(ref: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ActionsTitleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ActionsTitleComponent, "[ng2-st-actions-title]", never, { "grid": "grid"; }, {}, never, never, false>;
}
