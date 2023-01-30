import { Component } from '@angular/core';
import { DefaultEditor } from './default-editor';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
export class InputEditorComponent extends DefaultEditor {
    constructor() {
        super();
    }
}
InputEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: InputEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
InputEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: InputEditorComponent, selector: "input-editor", usesInheritance: true, ngImport: i0, template: `
    <input [ngClass]="inputClass"
           class="form-control"
           [(ngModel)]="cell.newValue"
           [name]="cell.getId()"
           [placeholder]="cell.getTitle()"
           [disabled]="!cell.isEditable()"
           (click)="onClick.emit($event)"
           (keydown.enter)="disableEnterKeySave || onEdited.emit()"
           (keydown.esc)="onStopEditing.emit()">
    `, isInline: true, styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em}\n"], directives: [{ type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: InputEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'input-editor', template: `
    <input [ngClass]="inputClass"
           class="form-control"
           [(ngModel)]="cell.newValue"
           [name]="cell.getId()"
           [placeholder]="cell.getTitle()"
           [disabled]="!cell.isEditable()"
           (click)="onClick.emit($event)"
           (keydown.enter)="disableEnterKeySave || onEdited.emit()"
           (keydown.esc)="onStopEditing.emit()">
    `, styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em}\n"] }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQtZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9jZWxsL2NlbGwtZWRpdG9ycy9pbnB1dC1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7O0FBaUIvQyxNQUFNLE9BQU8sb0JBQXFCLFNBQVEsYUFBYTtJQUVyRDtRQUNFLEtBQUssRUFBRSxDQUFDO0lBQ1YsQ0FBQzs7a0hBSlUsb0JBQW9CO3NHQUFwQixvQkFBb0IsMkVBWnJCOzs7Ozs7Ozs7O0tBVVA7NEZBRVEsb0JBQW9CO2tCQWZoQyxTQUFTOytCQUNFLGNBQWMsWUFFZDs7Ozs7Ozs7OztLQVVQIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0RlZmF1bHRFZGl0b3J9IGZyb20gJy4vZGVmYXVsdC1lZGl0b3InO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdpbnB1dC1lZGl0b3InLFxuICBzdHlsZVVybHM6IFsnLi9lZGl0b3IuY29tcG9uZW50LnNjc3MnXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8aW5wdXQgW25nQ2xhc3NdPVwiaW5wdXRDbGFzc1wiXG4gICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgWyhuZ01vZGVsKV09XCJjZWxsLm5ld1ZhbHVlXCJcbiAgICAgICAgICAgW25hbWVdPVwiY2VsbC5nZXRJZCgpXCJcbiAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImNlbGwuZ2V0VGl0bGUoKVwiXG4gICAgICAgICAgIFtkaXNhYmxlZF09XCIhY2VsbC5pc0VkaXRhYmxlKClcIlxuICAgICAgICAgICAoY2xpY2spPVwib25DbGljay5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCJkaXNhYmxlRW50ZXJLZXlTYXZlIHx8IG9uRWRpdGVkLmVtaXQoKVwiXG4gICAgICAgICAgIChrZXlkb3duLmVzYyk9XCJvblN0b3BFZGl0aW5nLmVtaXQoKVwiPlxuICAgIGAsXG59KVxuZXhwb3J0IGNsYXNzIElucHV0RWRpdG9yQ29tcG9uZW50IGV4dGVuZHMgRGVmYXVsdEVkaXRvciB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuIl19