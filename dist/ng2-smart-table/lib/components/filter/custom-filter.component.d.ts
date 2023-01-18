import { ComponentFactoryResolver, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { FilterDefault } from './filter-default';
import * as i0 from "@angular/core";
export declare class CustomFilterComponent extends FilterDefault implements OnChanges, OnDestroy {
    private resolver;
    query: string;
    customComponent: any;
    dynamicTarget: any;
    constructor(resolver: ComponentFactoryResolver);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomFilterComponent, "custom-table-filter", never, { "query": "query"; }, {}, never, never, false>;
}
