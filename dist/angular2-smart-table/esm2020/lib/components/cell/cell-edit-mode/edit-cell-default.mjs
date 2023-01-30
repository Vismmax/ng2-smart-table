import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class EditCellDefault {
    constructor() {
        this.inputClass = '';
        this.edited = new EventEmitter();
        this.stopEditing = new EventEmitter();
    }
    onEdited() {
        this.edited.emit();
        return false;
    }
    onStopEditing() {
        this.stopEditing.emit();
        return false;
    }
    onClick(event) {
        event.stopPropagation();
    }
}
EditCellDefault.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: EditCellDefault, deps: [], target: i0.ɵɵFactoryTarget.Component });
EditCellDefault.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: EditCellDefault, selector: "ng-component", inputs: { cell: "cell", inputClass: "inputClass" }, outputs: { edited: "edited", stopEditing: "stopEditing" }, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: EditCellDefault, decorators: [{
            type: Component,
            args: [{
                    template: ''
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1jZWxsLWRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvY2VsbC9jZWxsLWVkaXQtbW9kZS9lZGl0LWNlbGwtZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQU9yRSxNQUFNLE9BQU8sZUFBZTtJQUg1QjtRQU1XLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFdkIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDbEMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO0tBZWxEO0lBYkMsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsT0FBTyxDQUFDLEtBQWlCO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMxQixDQUFDOzs2R0FwQlUsZUFBZTtpR0FBZixlQUFlLG1LQUZoQixFQUFFOzRGQUVELGVBQWU7a0JBSDNCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLEVBQUU7aUJBQ2I7OEJBR1UsSUFBSTtzQkFBWixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksTUFBTTtzQkFBZixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDZWxsfSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zZXQvY2VsbCc7XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZTogJydcbn0pXG5leHBvcnQgY2xhc3MgRWRpdENlbGxEZWZhdWx0IHtcblxuICBASW5wdXQoKSBjZWxsITogQ2VsbDtcbiAgQElucHV0KCkgaW5wdXRDbGFzczogc3RyaW5nID0gJyc7XG5cbiAgQE91dHB1dCgpIGVkaXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHN0b3BFZGl0aW5nID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIG9uRWRpdGVkKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuZWRpdGVkLmVtaXQoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBvblN0b3BFZGl0aW5nKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuc3RvcEVkaXRpbmcuZW1pdCgpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxufVxuIl19