import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./custom-view.component";
import * as i2 from "@angular/common";
import * as i3 from "../../../pipes/bypass-security-trust.pipe";
export class ViewCellComponent {
    get bypassSecurityTrust() {
        return this.cell.getColumn().sanitizer.bypassHtml ? 'html' : 'none';
    }
    get cssClass() {
        return this.cell.getColumn().classContent ?? '';
    }
}
ViewCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ViewCellComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ViewCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: ViewCellComponent, selector: "table-cell-view-mode", inputs: { cell: "cell" }, ngImport: i0, template: `
    <div [ngSwitch]="cell.getColumn().type">
        <custom-view-component *ngSwitchCase="'custom'" [cell]="cell"></custom-view-component>
        <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue() | bypassSecurityTrust: bypassSecurityTrust" [ngClass]="cssClass"></div>
        <div *ngSwitchDefault [ngClass]="cssClass">{{ cell.getValue() }}</div>
    </div>
    `, isInline: true, components: [{ type: i1.CustomViewComponent, selector: "custom-view-component", inputs: ["cell"] }], directives: [{ type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }], pipes: { "bypassSecurityTrust": i3.BypassSecurityTrustPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ViewCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'table-cell-view-mode',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div [ngSwitch]="cell.getColumn().type">
        <custom-view-component *ngSwitchCase="'custom'" [cell]="cell"></custom-view-component>
        <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue() | bypassSecurityTrust: bypassSecurityTrust" [ngClass]="cssClass"></div>
        <div *ngSwitchDefault [ngClass]="cssClass">{{ cell.getValue() }}</div>
    </div>
    `,
                }]
        }], propDecorators: { cell: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlldy1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9jZWxsL2NlbGwtdmlldy1tb2RlL3ZpZXctY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBZ0J4RSxNQUFNLE9BQU8saUJBQWlCO0lBSTVCLElBQUksbUJBQW1CO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN0RSxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUE7SUFDakQsQ0FBQzs7K0dBVlUsaUJBQWlCO21HQUFqQixpQkFBaUIsc0ZBUmxCOzs7Ozs7S0FNUDs0RkFFUSxpQkFBaUI7a0JBWDdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFFBQVEsRUFBRTs7Ozs7O0tBTVA7aUJBQ0o7OEJBR1UsSUFBSTtzQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q2VsbH0gZnJvbSAnLi4vLi4vLi4vbGliL2RhdGEtc2V0L2NlbGwnO1xuaW1wb3J0IHtTZWN1cml0eVRydXN0VHlwZX0gZnJvbSAnLi4vLi4vLi4vcGlwZXMvYnlwYXNzLXNlY3VyaXR5LXRydXN0LnBpcGUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0YWJsZS1jZWxsLXZpZXctbW9kZScsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW25nU3dpdGNoXT1cImNlbGwuZ2V0Q29sdW1uKCkudHlwZVwiPlxuICAgICAgICA8Y3VzdG9tLXZpZXctY29tcG9uZW50ICpuZ1N3aXRjaENhc2U9XCInY3VzdG9tJ1wiIFtjZWxsXT1cImNlbGxcIj48L2N1c3RvbS12aWV3LWNvbXBvbmVudD5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiJ2h0bWwnXCIgW2lubmVySFRNTF09XCJjZWxsLmdldFZhbHVlKCkgfCBieXBhc3NTZWN1cml0eVRydXN0OiBieXBhc3NTZWN1cml0eVRydXN0XCIgW25nQ2xhc3NdPVwiY3NzQ2xhc3NcIj48L2Rpdj5cbiAgICAgICAgPGRpdiAqbmdTd2l0Y2hEZWZhdWx0IFtuZ0NsYXNzXT1cImNzc0NsYXNzXCI+e3sgY2VsbC5nZXRWYWx1ZSgpIH19PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgVmlld0NlbGxDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGNlbGwhOiBDZWxsO1xuXG4gIGdldCBieXBhc3NTZWN1cml0eVRydXN0KCk6IFNlY3VyaXR5VHJ1c3RUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5jZWxsLmdldENvbHVtbigpLnNhbml0aXplci5ieXBhc3NIdG1sID8gJ2h0bWwnIDogJ25vbmUnO1xuICB9XG5cbiAgZ2V0IGNzc0NsYXNzKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuY2VsbC5nZXRDb2x1bW4oKS5jbGFzc0NvbnRlbnQgPz8gJydcbiAgfVxufVxuIl19