import { EventEmitter } from '@angular/core';
import { Row } from '../../../lib/data-set/row';
import { Grid } from '../../../lib/grid';
import { CustomAction } from '../../../lib/settings';
import { CustomActionEvent } from '../../../lib/events';
import * as i0 from "@angular/core";
export declare class TbodyCustomComponent {
    grid: Grid;
    row: Row;
    source: any;
    custom: EventEmitter<CustomActionEvent>;
    get customActions(): CustomAction[];
    onCustom(action: CustomAction, event: MouseEvent): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<TbodyCustomComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<TbodyCustomComponent, "angular2-st-tbody-custom", never, { "grid": "grid"; "row": "row"; "source": "source"; }, { "custom": "custom"; }, never, never>;
}
