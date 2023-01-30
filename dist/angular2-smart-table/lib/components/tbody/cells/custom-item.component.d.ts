import { OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Row } from '../../../lib/data-set/row';
import { CustomAction } from '../../../lib/settings';
import * as i0 from "@angular/core";
export declare class TbodyCustomItemComponent implements OnInit, OnDestroy {
    customComponent: any;
    action: CustomAction;
    row: Row;
    dynamicTarget: ViewContainerRef;
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected getPatch(): {
        action: CustomAction;
        rowData: any;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<TbodyCustomItemComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TbodyCustomItemComponent, "angular2-st-tbody-custom-item", never, { "action": "action"; "row": "row"; }, {}, never, never>;
}
