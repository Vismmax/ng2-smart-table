import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFilter } from './default-filter';
import * as i0 from "@angular/core";
export declare class DateFilterComponent extends DefaultFilter implements OnInit {
    startDate: FormControl;
    endDate: FormControl;
    dateBefore: FormControl;
    dateAfter: FormControl;
    dateEqual: FormControl;
    filterTypeSelect: FormControl;
    filterType: string;
    filterOptions: string[];
    constructor();
    ngOnInit(): void;
    getFilterType(): import("rxjs").Observable<string>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DateFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DateFilterComponent, "date-filter", never, {}, {}, never, never>;
}
