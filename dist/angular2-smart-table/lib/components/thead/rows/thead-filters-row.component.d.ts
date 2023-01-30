import { EventEmitter, OnChanges } from '@angular/core';
import { Grid } from '../../../lib/grid';
import { DataSource } from '../../../lib/data-source/data-source';
import { Column } from "../../../lib/data-set/column";
import { CreateEvent } from '../../../lib/events';
import * as i0 from "@angular/core";
export declare class TheadFitlersRowComponent implements OnChanges {
    grid: Grid;
    source: DataSource;
    create: EventEmitter<CreateEvent>;
    isMultiSelectVisible: boolean;
    showActionColumnLeft: boolean;
    showActionColumnRight: boolean;
    filterInputClass: string;
    ngOnChanges(): void;
    getVisibleColumns(columns: Array<Column>): Array<Column>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TheadFitlersRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TheadFitlersRowComponent, "[angular2-st-thead-filters-row]", never, { "grid": "grid"; "source": "source"; }, { "create": "create"; }, never, never>;
}
