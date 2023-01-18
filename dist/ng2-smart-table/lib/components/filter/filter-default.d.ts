import { EventEmitter } from '@angular/core';
import { Column } from '../../lib/data-set/column';
import { DataSource } from '../../lib/data-source/data-source';
import * as i0 from "@angular/core";
export declare class FilterDefault {
    column: Column;
    source: DataSource;
    inputClass: string;
    filter: EventEmitter<any>;
    query: string;
    onFilter(query: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterDefault, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<FilterDefault, "ng-component", never, { "column": "column"; "source": "source"; "inputClass": "inputClass"; }, { "filter": "filter"; }, never, never, false>;
}
