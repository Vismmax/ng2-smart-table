import { EventEmitter } from '@angular/core';
import { Column } from '../../../lib/data-set/column';
import { DataSource } from '../../../lib/data-source/data-source';
import * as i0 from "@angular/core";
export declare class ColumnTitleComponent {
    column: Column;
    source: DataSource;
    sort: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnTitleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnTitleComponent, "ng2-st-column-title", never, { "column": "column"; "source": "source"; }, { "sort": "sort"; }, never, never, false>;
}
