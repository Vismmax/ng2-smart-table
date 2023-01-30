import { EventEmitter } from '@angular/core';
import { Column } from '../../../lib/data-set/column';
import { DataSource } from '../../../lib/data-source/data-source';
import * as i0 from "@angular/core";
export declare class ColumnTitleComponent {
    column: Column;
    source: DataSource;
    isHideable: boolean;
    hide: EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ColumnTitleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ColumnTitleComponent, "angular2-st-column-title", never, { "column": "column"; "source": "source"; "isHideable": "isHideable"; }, { "hide": "hide"; }, never, never>;
}
