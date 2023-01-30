import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class DefaultEditor {
    constructor() {
        this.onStopEditing = new EventEmitter();
        this.onEdited = new EventEmitter();
        this.onClick = new EventEmitter();
    }
    get disableEnterKeySave() {
        return this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().disableEnterKeySave;
    }
}
DefaultEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultEditor, deps: [], target: i0.ɵɵFactoryTarget.Component });
DefaultEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: DefaultEditor, selector: "ng-component", inputs: { cell: "cell", inputClass: "inputClass" }, outputs: { onStopEditing: "onStopEditing", onEdited: "onEdited", onClick: "onClick" }, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultEditor, decorators: [{
            type: Component,
            args: [{
                    template: '',
                }]
        }], propDecorators: { cell: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], onStopEditing: [{
                type: Output
            }], onEdited: [{
                type: Output
            }], onClick: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1lZGl0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvY2VsbC9jZWxsLWVkaXRvcnMvZGVmYXVsdC1lZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFPckUsTUFBTSxPQUFPLGFBQWE7SUFIMUI7UUFPWSxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDekMsYUFBUSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDcEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFjLENBQUM7S0FLcEQ7SUFIQyxJQUFJLG1CQUFtQjtRQUNyQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztJQUNwRyxDQUFDOzsyR0FWVSxhQUFhOytGQUFiLGFBQWEsK0xBRmQsRUFBRTs0RkFFRCxhQUFhO2tCQUh6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxFQUFFO2lCQUNiOzhCQUVVLElBQUk7c0JBQVosS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVJLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxPQUFPO3NCQUFoQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q2VsbH0gZnJvbSAnLi4vLi4vLi4vbGliL2RhdGEtc2V0L2NlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0RWRpdG9yIGltcGxlbWVudHMgRWRpdG9yIHtcbiAgQElucHV0KCkgY2VsbCE6IENlbGw7XG4gIEBJbnB1dCgpIGlucHV0Q2xhc3MhOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIG9uU3RvcEVkaXRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBvbkVkaXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIG9uQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNlRXZlbnQ+KCk7XG5cbiAgZ2V0IGRpc2FibGVFbnRlcktleVNhdmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2VsbC5nZXRDb2x1bW4oKS5nZXRDb25maWcoKSAmJiB0aGlzLmNlbGwuZ2V0Q29sdW1uKCkuZ2V0Q29uZmlnKCkuZGlzYWJsZUVudGVyS2V5U2F2ZTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVkaXRvciB7XG4gIGNlbGw6IENlbGw7XG4gIGlucHV0Q2xhc3M6IHN0cmluZztcbiAgb25TdG9wRWRpdGluZzogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICBvbkVkaXRlZDogRXZlbnRFbWl0dGVyPHZvaWQ+O1xuICBvbkNsaWNrOiBFdmVudEVtaXR0ZXI8TW91c2VFdmVudD47XG59XG4iXX0=