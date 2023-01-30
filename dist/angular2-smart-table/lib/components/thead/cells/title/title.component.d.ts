import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataSource } from '../../../../lib/data-source/data-source';
import { Column } from '../../../../lib/data-set/column';
import * as i0 from "@angular/core";
export declare class TitleComponent implements OnChanges {
    currentDirection: 'asc' | 'desc' | null;
    column: Column;
    source: DataSource;
    isHideable: boolean;
    hide: EventEmitter<any>;
    protected dataChangedSub: Subscription;
    ngOnChanges(changes: SimpleChanges): void;
    _sort(event: any): void;
    _hideColumnClicked(event: any): void;
    private changeSortDirection;
    static ɵfac: i0.ɵɵFactoryDeclaration<TitleComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TitleComponent, "angular2-smart-table-title", never, { "column": "column"; "source": "source"; "isHideable": "isHideable"; }, { "hide": "hide"; }, never, never>;
}
