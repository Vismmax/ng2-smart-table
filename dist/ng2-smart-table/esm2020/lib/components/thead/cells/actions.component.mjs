import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Grid } from '../../../lib/grid';
import * as i0 from "@angular/core";
export class ActionsComponent {
    constructor() {
        this.create = new EventEmitter();
    }
    ngOnChanges() {
        this.createButtonContent = this.grid.getSetting('add.createButtonContent');
        this.cancelButtonContent = this.grid.getSetting('add.cancelButtonContent');
    }
}
ActionsComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ActionsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ActionsComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: ActionsComponent, selector: "ng2-st-actions", inputs: { grid: "grid" }, outputs: { create: "create" }, usesOnChanges: true, ngImport: i0, template: `
    <a href="#" class="ng2-smart-action ng2-smart-action-add-create"
        [innerHTML]="createButtonContent"
        (click)="$event.preventDefault();create.emit($event)"></a>
    <a href="#" class="ng2-smart-action ng2-smart-action-add-cancel"
        [innerHTML]="cancelButtonContent"
        (click)="$event.preventDefault();grid.createFormShown = false;"></a>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ActionsComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ng2-st-actions',
                    template: `
    <a href="#" class="ng2-smart-action ng2-smart-action-add-create"
        [innerHTML]="createButtonContent"
        (click)="$event.preventDefault();create.emit($event)"></a>
    <a href="#" class="ng2-smart-action ng2-smart-action-add-cancel"
        [innerHTML]="cancelButtonContent"
        (click)="$event.preventDefault();grid.createFormShown = false;"></a>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], create: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3RoZWFkL2NlbGxzL2FjdGlvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFFakYsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDOztBQWF6QyxNQUFNLE9BQU8sZ0JBQWdCO0lBWDdCO1FBY1ksV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7S0FTNUM7SUFKQyxXQUFXO1FBQ1QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDN0UsQ0FBQzs7OEdBWFUsZ0JBQWdCO2tHQUFoQixnQkFBZ0Isb0lBVGpCOzs7Ozs7O0dBT1Q7NEZBRVUsZ0JBQWdCO2tCQVg1QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7OztHQU9UO2lCQUNGOzhCQUdVLElBQUk7c0JBQVosS0FBSztnQkFDSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgR3JpZCB9IGZyb20gJy4uLy4uLy4uL2xpYi9ncmlkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmcyLXN0LWFjdGlvbnMnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJuZzItc21hcnQtYWN0aW9uIG5nMi1zbWFydC1hY3Rpb24tYWRkLWNyZWF0ZVwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwiY3JlYXRlQnV0dG9uQ29udGVudFwiXG4gICAgICAgIChjbGljayk9XCIkZXZlbnQucHJldmVudERlZmF1bHQoKTtjcmVhdGUuZW1pdCgkZXZlbnQpXCI+PC9hPlxuICAgIDxhIGhyZWY9XCIjXCIgY2xhc3M9XCJuZzItc21hcnQtYWN0aW9uIG5nMi1zbWFydC1hY3Rpb24tYWRkLWNhbmNlbFwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwiY2FuY2VsQnV0dG9uQ29udGVudFwiXG4gICAgICAgIChjbGljayk9XCIkZXZlbnQucHJldmVudERlZmF1bHQoKTtncmlkLmNyZWF0ZUZvcm1TaG93biA9IGZhbHNlO1wiPjwvYT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQWN0aW9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZ3JpZDogR3JpZDtcbiAgQE91dHB1dCgpIGNyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNyZWF0ZUJ1dHRvbkNvbnRlbnQ6IHN0cmluZztcbiAgY2FuY2VsQnV0dG9uQ29udGVudDogc3RyaW5nO1xuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuY3JlYXRlQnV0dG9uQ29udGVudCA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdhZGQuY3JlYXRlQnV0dG9uQ29udGVudCcpO1xuICAgIHRoaXMuY2FuY2VsQnV0dG9uQ29udGVudCA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdhZGQuY2FuY2VsQnV0dG9uQ29udGVudCcpO1xuICB9XG59XG4iXX0=