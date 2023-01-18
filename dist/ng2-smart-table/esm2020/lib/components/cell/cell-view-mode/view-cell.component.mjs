import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Cell } from '../../../lib/data-set/cell';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./custom-view.component";
export class ViewCellComponent {
}
ViewCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ViewCellComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ViewCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: ViewCellComponent, selector: "table-cell-view-mode", inputs: { cell: "cell" }, ngImport: i0, template: `
    <div [ngSwitch]="cell.getColumn().type">
        <custom-view-component *ngSwitchCase="'custom'" [cell]="cell"></custom-view-component>
        <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue()"></div>
        <div *ngSwitchDefault>{{ cell.getValue() }}</div>
    </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "directive", type: i1.NgSwitchDefault, selector: "[ngSwitchDefault]" }, { kind: "component", type: i2.CustomViewComponent, selector: "custom-view-component", inputs: ["cell"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ViewCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'table-cell-view-mode',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div [ngSwitch]="cell.getColumn().type">
        <custom-view-component *ngSwitchCase="'custom'" [cell]="cell"></custom-view-component>
        <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue()"></div>
        <div *ngSwitchDefault>{{ cell.getValue() }}</div>
    </div>
    `,
                }]
        }], propDecorators: { cell: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvY2VsbC9jZWxsLXZpZXctbW9kZS92aWV3LWNlbGwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQWFsRCxNQUFNLE9BQU8saUJBQWlCOzsrR0FBakIsaUJBQWlCO21HQUFqQixpQkFBaUIsc0ZBUmxCOzs7Ozs7S0FNUDs0RkFFUSxpQkFBaUI7a0JBWDdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRTs7Ozs7O0tBTVA7aUJBQ0o7OEJBR1UsSUFBSTtzQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDZWxsIH0gZnJvbSAnLi4vLi4vLi4vbGliL2RhdGEtc2V0L2NlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0YWJsZS1jZWxsLXZpZXctbW9kZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW25nU3dpdGNoXT1cImNlbGwuZ2V0Q29sdW1uKCkudHlwZVwiPlxuICAgICAgICA8Y3VzdG9tLXZpZXctY29tcG9uZW50ICpuZ1N3aXRjaENhc2U9XCInY3VzdG9tJ1wiIFtjZWxsXT1cImNlbGxcIj48L2N1c3RvbS12aWV3LWNvbXBvbmVudD5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2h0bWwnXCIgW2lubmVySFRNTF09XCJjZWxsLmdldFZhbHVlKClcIj48L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hEZWZhdWx0Pnt7IGNlbGwuZ2V0VmFsdWUoKSB9fTwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIFZpZXdDZWxsQ29tcG9uZW50IHtcblxuICBASW5wdXQoKSBjZWxsOiBDZWxsO1xufVxuIl19