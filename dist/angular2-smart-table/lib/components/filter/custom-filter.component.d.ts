import { OnChanges, OnDestroy, SimpleChanges, ViewContainerRef } from '@angular/core';
import { FilterDefault } from './filter-default';
import * as i0 from "@angular/core";
export declare class CustomFilterComponent extends FilterDefault implements OnChanges, OnDestroy {
    query: string;
    customComponent: any;
    dynamicTarget: ViewContainerRef;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomFilterComponent, "custom-table-filter", never, { "query": "query"; }, {}, never, never>;
}
