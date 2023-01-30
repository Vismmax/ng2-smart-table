import { Component } from '@angular/core';
import { DefaultEditor } from './default-editor';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
export class SelectEditorComponent extends DefaultEditor {
    constructor() {
        super();
    }
    onSelectionChanged(newValue) {
        this.cell.newValue = newValue;
    }
}
SelectEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: SelectEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SelectEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: SelectEditorComponent, selector: "select-editor", usesInheritance: true, ngImport: i0, template: `
    <select [ngClass]="inputClass"
            class="form-control"
            [value]="cell.newValue"
            (change)="onSelectionChanged($any($event.target).value)"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            (click)="onClick.emit($event)"
            [multiple]="cell.getColumn().getConfig()?.multiple">
            (keydown.enter)="disableEnterKeySave || onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">

        <option *ngFor="let option of cell.getColumn().getConfig()?.list" [value]="option.value"
                [selected]="option.value === cell.getRawValue()">{{ option.title }}
        </option>
    </select>
    `, isInline: true, directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: SelectEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'select-editor',
                    template: `
    <select [ngClass]="inputClass"
            class="form-control"
            [value]="cell.newValue"
            (change)="onSelectionChanged($any($event.target).value)"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            (click)="onClick.emit($event)"
            [multiple]="cell.getColumn().getConfig()?.multiple">
            (keydown.enter)="disableEnterKeySave || onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">

        <option *ngFor="let option of cell.getColumn().getConfig()?.list" [value]="option.value"
                [selected]="option.value === cell.getRawValue()">{{ option.title }}
        </option>
    </select>
    `,
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWVkaXRvci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvY2VsbC9jZWxsLWVkaXRvcnMvc2VsZWN0LWVkaXRvci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFzQi9DLE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxhQUFhO0lBRXREO1FBQ0UsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDO0lBRUQsa0JBQWtCLENBQUMsUUFBZ0I7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ2hDLENBQUM7O21IQVJVLHFCQUFxQjt1R0FBckIscUJBQXFCLDRFQWxCdEI7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlA7NEZBRVEscUJBQXFCO2tCQXBCakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JQO2lCQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RlZmF1bHRFZGl0b3J9IGZyb20gJy4vZGVmYXVsdC1lZGl0b3InO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdzZWxlY3QtZWRpdG9yJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8c2VsZWN0IFtuZ0NsYXNzXT1cImlucHV0Q2xhc3NcIlxuICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICAgW3ZhbHVlXT1cImNlbGwubmV3VmFsdWVcIlxuICAgICAgICAgICAgKGNoYW5nZSk9XCJvblNlbGVjdGlvbkNoYW5nZWQoJGFueSgkZXZlbnQudGFyZ2V0KS52YWx1ZSlcIlxuICAgICAgICAgICAgW25hbWVdPVwiY2VsbC5nZXRJZCgpXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhY2VsbC5pc0VkaXRhYmxlKClcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ2xpY2suZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgIFttdWx0aXBsZV09XCJjZWxsLmdldENvbHVtbigpLmdldENvbmZpZygpPy5tdWx0aXBsZVwiPlxuICAgICAgICAgICAgKGtleWRvd24uZW50ZXIpPVwiZGlzYWJsZUVudGVyS2V5U2F2ZSB8fCBvbkVkaXRlZC5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgKGtleWRvd24uZXNjKT1cIm9uU3RvcEVkaXRpbmcuZW1pdCgpXCI+XG5cbiAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgb3B0aW9uIG9mIGNlbGwuZ2V0Q29sdW1uKCkuZ2V0Q29uZmlnKCk/Lmxpc3RcIiBbdmFsdWVdPVwib3B0aW9uLnZhbHVlXCJcbiAgICAgICAgICAgICAgICBbc2VsZWN0ZWRdPVwib3B0aW9uLnZhbHVlID09PSBjZWxsLmdldFJhd1ZhbHVlKClcIj57eyBvcHRpb24udGl0bGUgfX1cbiAgICAgICAgPC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0RWRpdG9yQ29tcG9uZW50IGV4dGVuZHMgRGVmYXVsdEVkaXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIG9uU2VsZWN0aW9uQ2hhbmdlZChuZXdWYWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5jZWxsLm5ld1ZhbHVlID0gbmV3VmFsdWU7XG4gIH1cbn1cbiJdfQ==