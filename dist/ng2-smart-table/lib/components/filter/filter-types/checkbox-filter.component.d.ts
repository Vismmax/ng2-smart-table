import { OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { DefaultFilter } from './default-filter';
import * as i0 from "@angular/core";
export declare class CheckboxFilterComponent extends DefaultFilter implements OnInit {
    filterActive: boolean;
    inputControl: UntypedFormControl;
    constructor();
    ngOnInit(): void;
    resetFilter(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckboxFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CheckboxFilterComponent, "checkbox-filter", never, {}, {}, never, never, false>;
}
