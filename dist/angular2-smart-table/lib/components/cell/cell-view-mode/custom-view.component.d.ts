import { OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Cell } from '../../../lib/data-set/cell';
import { ViewCell } from './view-cell';
import * as i0 from "@angular/core";
export declare class CustomViewComponent implements OnInit, OnDestroy {
    customComponent: any;
    cell: Cell;
    dynamicTarget: ViewContainerRef;
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected getPatch(): ViewCell;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomViewComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomViewComponent, "custom-view-component", never, { "cell": "cell"; }, {}, never, never>;
}
