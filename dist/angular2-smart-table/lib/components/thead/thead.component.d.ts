import { EventEmitter, OnChanges } from '@angular/core';
import { Grid } from '../../lib/grid';
import { DataSource } from '../../lib/data-source/data-source';
import { TableService } from '../../services/table.service';
import { CreateCancelEvent, CreateConfirmEvent, CreateEvent } from '../../lib/events';
import * as i0 from "@angular/core";
export declare class NgxSmartTableTheadComponent implements OnChanges {
    private tableService;
    grid: Grid;
    source: DataSource;
    isAllSelected: boolean;
    createConfirm: EventEmitter<CreateConfirmEvent>;
    createCancel: EventEmitter<CreateCancelEvent>;
    hide: EventEmitter<string>;
    selectAllRows: EventEmitter<void>;
    create: EventEmitter<CreateEvent>;
    isHideHeader: boolean;
    isHideSubHeader: boolean;
    constructor(tableService: TableService);
    ngOnChanges(): void;
    mouseMove(event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxSmartTableTheadComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<NgxSmartTableTheadComponent, "[angular2-st-thead]", never, { "grid": "grid"; "source": "source"; "isAllSelected": "isAllSelected"; "createConfirm": "createConfirm"; "createCancel": "createCancel"; }, { "hide": "hide"; "selectAllRows": "selectAllRows"; "create": "create"; }, never, never>;
}
