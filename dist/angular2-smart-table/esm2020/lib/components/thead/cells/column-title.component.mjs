import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./title/title.component";
export class ColumnTitleComponent {
    constructor() {
        this.hide = new EventEmitter();
    }
}
ColumnTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ColumnTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ColumnTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: ColumnTitleComponent, selector: "angular2-st-column-title", inputs: { column: "column", source: "source", isHideable: "isHideable" }, outputs: { hide: "hide" }, ngImport: i0, template: `
    <div class="angular2-smart-title">
      <angular2-smart-table-title [source]="source" [column]="column" [isHideable]="isHideable" (hide)="hide.emit($event)"></angular2-smart-table-title>
    </div>
  `, isInline: true, components: [{ type: i1.TitleComponent, selector: "angular2-smart-table-title", inputs: ["column", "source", "isHideable"], outputs: ["hide"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ColumnTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-st-column-title',
                    template: `
    <div class="angular2-smart-title">
      <angular2-smart-table-title [source]="source" [column]="column" [isHideable]="isHideable" (hide)="hide.emit($event)"></angular2-smart-table-title>
    </div>
  `,
                }]
        }], propDecorators: { column: [{
                type: Input
            }], source: [{
                type: Input
            }], isHideable: [{
                type: Input
            }], hide: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXRpdGxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy90aGVhZC9jZWxscy9jb2x1bW4tdGl0bGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7OztBQWFyRSxNQUFNLE9BQU8sb0JBQW9CO0lBUmpDO1FBY1ksU0FBSSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7S0FFMUM7O2tIQVJZLG9CQUFvQjtzR0FBcEIsb0JBQW9CLHFLQU5yQjs7OztHQUlUOzRGQUVVLG9CQUFvQjtrQkFSaEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxRQUFRLEVBQUU7Ozs7R0FJVDtpQkFDRjs4QkFHVSxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksSUFBSTtzQkFBYixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q29sdW1ufSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zZXQvY29sdW1uJztcbmltcG9ydCB7RGF0YVNvdXJjZX0gZnJvbSAnLi4vLi4vLi4vbGliL2RhdGEtc291cmNlL2RhdGEtc291cmNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW5ndWxhcjItc3QtY29sdW1uLXRpdGxlJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW5ndWxhcjItc21hcnQtdGl0bGVcIj5cbiAgICAgIDxhbmd1bGFyMi1zbWFydC10YWJsZS10aXRsZSBbc291cmNlXT1cInNvdXJjZVwiIFtjb2x1bW5dPVwiY29sdW1uXCIgW2lzSGlkZWFibGVdPVwiaXNIaWRlYWJsZVwiIChoaWRlKT1cImhpZGUuZW1pdCgkZXZlbnQpXCI+PC9hbmd1bGFyMi1zbWFydC10YWJsZS10aXRsZT5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQ29sdW1uVGl0bGVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGNvbHVtbiE6IENvbHVtbjtcbiAgQElucHV0KCkgc291cmNlITogRGF0YVNvdXJjZTtcbiAgQElucHV0KCkgaXNIaWRlYWJsZSE6IGJvb2xlYW47XG5cbiAgQE91dHB1dCgpIGhpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxufVxuIl19