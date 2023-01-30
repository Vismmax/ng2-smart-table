import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./custom-edit.component";
import * as i2 from "./default-edit.component";
import * as i3 from "@angular/common";
export class EditCellComponent {
    constructor() {
        this.inputClass = '';
        this.edited = new EventEmitter();
        this.stopEditing = new EventEmitter();
    }
    ngOnInit() {
        this.cell.resetValue();
    }
    getEditorType() {
        const editor = this.cell.getColumn().editor;
        if (!editor) {
            return 'default';
        }
        return editor.type;
    }
}
EditCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: EditCellComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
EditCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: EditCellComponent, selector: "table-cell-edit-mode", inputs: { cell: "cell", inputClass: "inputClass" }, outputs: { edited: "edited", stopEditing: "stopEditing" }, ngImport: i0, template: `
      <div [ngSwitch]="getEditorType()">
        <table-cell-custom-editor *ngSwitchCase="'custom'"
                                  [cell]="cell"
                                  [inputClass]="inputClass"
                                  (edited)="edited.emit()"
                                  (stopEditing)="stopEditing.emit()"
        ></table-cell-custom-editor>
        <table-cell-default-editor *ngSwitchDefault
                                   [cell]="cell"
                                   [inputClass]="inputClass"
                                   (edited)="edited.emit()"
                                   (stopEditing)="stopEditing.emit()"
        ></table-cell-default-editor>
      </div>
    `, isInline: true, components: [{ type: i1.CustomEditComponent, selector: "table-cell-custom-editor" }, { type: i2.DefaultEditComponent, selector: "table-cell-default-editor" }], directives: [{ type: i3.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i3.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i3.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: EditCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'table-cell-edit-mode',
                    template: `
      <div [ngSwitch]="getEditorType()">
        <table-cell-custom-editor *ngSwitchCase="'custom'"
                                  [cell]="cell"
                                  [inputClass]="inputClass"
                                  (edited)="edited.emit()"
                                  (stopEditing)="stopEditing.emit()"
        ></table-cell-custom-editor>
        <table-cell-default-editor *ngSwitchDefault
                                   [cell]="cell"
                                   [inputClass]="inputClass"
                                   (edited)="edited.emit()"
                                   (stopEditing)="stopEditing.emit()"
        ></table-cell-default-editor>
      </div>
    `,
                }]
        }], propDecorators: { cell: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], edited: [{
                type: Output
            }], stopEditing: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1jZWxsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9jZWxsL2NlbGwtZWRpdC1tb2RlL2VkaXQtY2VsbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUF1QjdFLE1BQU0sT0FBTyxpQkFBaUI7SUFuQjlCO1FBc0JXLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFdkIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbEMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0tBYWxEO0lBWEMsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELGFBQWE7UUFDWCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLE1BQU0sQ0FBQTtRQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1gsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFDRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQzs7K0dBbEJVLGlCQUFpQjttR0FBakIsaUJBQWlCLDJLQWpCbEI7Ozs7Ozs7Ozs7Ozs7OztLQWVQOzRGQUVRLGlCQUFpQjtrQkFuQjdCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7S0FlUDtpQkFDSjs4QkFHVSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q2VsbH0gZnJvbSAnLi4vLi4vLi4vbGliL2RhdGEtc2V0L2NlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0YWJsZS1jZWxsLWVkaXQtbW9kZScsXG4gIHRlbXBsYXRlOiBgXG4gICAgICA8ZGl2IFtuZ1N3aXRjaF09XCJnZXRFZGl0b3JUeXBlKClcIj5cbiAgICAgICAgPHRhYmxlLWNlbGwtY3VzdG9tLWVkaXRvciAqbmdTd2l0Y2hDYXNlPVwiJ2N1c3RvbSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtjZWxsXT1cImNlbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpbnB1dENsYXNzXT1cImlucHV0Q2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlZGl0ZWQpPVwiZWRpdGVkLmVtaXQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHN0b3BFZGl0aW5nKT1cInN0b3BFZGl0aW5nLmVtaXQoKVwiXG4gICAgICAgID48L3RhYmxlLWNlbGwtY3VzdG9tLWVkaXRvcj5cbiAgICAgICAgPHRhYmxlLWNlbGwtZGVmYXVsdC1lZGl0b3IgKm5nU3dpdGNoRGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbY2VsbF09XCJjZWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lucHV0Q2xhc3NdPVwiaW5wdXRDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlZGl0ZWQpPVwiZWRpdGVkLmVtaXQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzdG9wRWRpdGluZyk9XCJzdG9wRWRpdGluZy5lbWl0KClcIlxuICAgICAgICA+PC90YWJsZS1jZWxsLWRlZmF1bHQtZWRpdG9yPlxuICAgICAgPC9kaXY+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgRWRpdENlbGxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIGNlbGwhOiBDZWxsO1xuICBASW5wdXQoKSBpbnB1dENsYXNzOiBzdHJpbmcgPSAnJztcblxuICBAT3V0cHV0KCkgZWRpdGVkID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgc3RvcEVkaXRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5jZWxsLnJlc2V0VmFsdWUoKTtcbiAgfVxuXG4gIGdldEVkaXRvclR5cGUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBlZGl0b3IgPSB0aGlzLmNlbGwuZ2V0Q29sdW1uKCkuZWRpdG9yXG4gICAgaWYgKCFlZGl0b3IpIHtcbiAgICAgIHJldHVybiAnZGVmYXVsdCc7XG4gICAgfVxuICAgIHJldHVybiBlZGl0b3IudHlwZTtcbiAgfVxufVxuIl19