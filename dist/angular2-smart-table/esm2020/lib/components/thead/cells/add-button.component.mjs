import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../pipes/bypass-security-trust.pipe";
export class AddButtonComponent {
    constructor(ref) {
        this.ref = ref;
        this.create = new EventEmitter();
        this.hiddenWhenFunction = () => false;
        this.disabledWhenFunction = () => false;
        this.bypassSecurityTrust = 'none';
    }
    ngAfterViewInit() {
        this.ref.nativeElement.classList.add('angular2-smart-actions-title', 'angular2-smart-actions-title-add');
    }
    get visible() {
        return !this.hiddenWhenFunction();
    }
    get disabled() {
        return this.disabledWhenFunction();
    }
    ngOnChanges() {
        this.addNewButtonContent = this.grid.settings.add?.addButtonContent ?? 'Add';
        this.bypassSecurityTrust = this.grid.settings.add?.sanitizer?.bypassHtml ? 'html' : 'none';
        this.disabledWhenFunction = this.grid.settings.add?.disabledWhen ?? this.disabledWhenFunction;
        const actions = this.grid.settings.actions;
        if (actions === false || actions === undefined) {
            this.hiddenWhenFunction = () => (actions === false);
        }
        else {
            this.hiddenWhenFunction = this.grid.settings.add?.hiddenWhen ?? (() => (actions.add === false));
        }
    }
    onAdd(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled)
            return;
        if (this.grid.getSetting('mode') === 'external') {
            this.create.emit({
                source: this.source,
            });
        }
        else {
            this.grid.createFormShown = true;
        }
    }
}
AddButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AddButtonComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AddButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: AddButtonComponent, selector: "[angular2-st-add-button]", inputs: { grid: "grid", source: "source" }, outputs: { create: "create" }, usesOnChanges: true, ngImport: i0, template: `
    <a *ngIf="visible" href="#" class="angular2-smart-action angular2-smart-action-add-add"
        [ngClass]="{'not-allowed': disabled}"
        [innerHTML]="addNewButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onAdd($event)"></a>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "bypassSecurityTrust": i2.BypassSecurityTrustPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AddButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[angular2-st-add-button]',
                    template: `
    <a *ngIf="visible" href="#" class="angular2-smart-action angular2-smart-action-add-add"
        [ngClass]="{'not-allowed': disabled}"
        [innerHTML]="addNewButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onAdd($event)"></a>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { grid: [{
                type: Input
            }], source: [{
                type: Input
            }], create: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkLWJ1dHRvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvdGhlYWQvY2VsbHMvYWRkLWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixTQUFTLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7QUFlM0csTUFBTSxPQUFPLGtCQUFrQjtJQVc3QixZQUFvQixHQUFlO1FBQWYsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQVB6QixXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQztRQUVuRCx1QkFBa0IsR0FBa0IsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2hELHlCQUFvQixHQUFrQixHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7UUFFbEQsd0JBQW1CLEdBQXNCLE1BQU0sQ0FBQztJQUdoRCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsa0NBQWtDLENBQUMsQ0FBQztJQUMzRyxDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsSUFBSSxLQUFLLENBQUM7UUFDN0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUUzRixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLFlBQVksSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUM7UUFDOUYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1FBQzNDLElBQUksT0FBTyxLQUFLLEtBQUssSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQzlDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLENBQUMsQ0FBQztTQUNyRDthQUFNO1lBQ0wsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxVQUFVLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNqRztJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsS0FBVTtRQUNkLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsUUFBUTtZQUFFLE9BQU87UUFFMUIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxVQUFVLEVBQUU7WUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO2FBQ3BCLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7U0FDbEM7SUFDSCxDQUFDOztnSEFuRFUsa0JBQWtCO29HQUFsQixrQkFBa0IsZ0tBTm5COzs7O0dBSVQ7NEZBRVUsa0JBQWtCO2tCQVI5QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLFFBQVEsRUFBRTs7OztHQUlUO2lCQUNGO2lHQUdVLElBQUk7c0JBQVosS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0ksTUFBTTtzQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtHcmlkfSBmcm9tICcuLi8uLi8uLi9saWIvZ3JpZCc7XG5pbXBvcnQge0RhdGFTb3VyY2V9IGZyb20gJy4uLy4uLy4uL2xpYi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQge0NyZWF0ZUV2ZW50fSBmcm9tICcuLi8uLi8uLi9saWIvZXZlbnRzJztcbmltcG9ydCB7U2VjdXJpdHlUcnVzdFR5cGV9IGZyb20gJy4uLy4uLy4uL3BpcGVzL2J5cGFzcy1zZWN1cml0eS10cnVzdC5waXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW2FuZ3VsYXIyLXN0LWFkZC1idXR0b25dJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YSAqbmdJZj1cInZpc2libGVcIiBocmVmPVwiI1wiIGNsYXNzPVwiYW5ndWxhcjItc21hcnQtYWN0aW9uIGFuZ3VsYXIyLXNtYXJ0LWFjdGlvbi1hZGQtYWRkXCJcbiAgICAgICAgW25nQ2xhc3NdPVwieydub3QtYWxsb3dlZCc6IGRpc2FibGVkfVwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwiYWRkTmV3QnV0dG9uQ29udGVudCB8IGJ5cGFzc1NlY3VyaXR5VHJ1c3Q6IGJ5cGFzc1NlY3VyaXR5VHJ1c3RcIiAoY2xpY2spPVwib25BZGQoJGV2ZW50KVwiPjwvYT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQWRkQnV0dG9uQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBncmlkITogR3JpZDtcbiAgQElucHV0KCkgc291cmNlITogRGF0YVNvdXJjZTtcbiAgQE91dHB1dCgpIGNyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q3JlYXRlRXZlbnQ+KCk7XG5cbiAgaGlkZGVuV2hlbkZ1bmN0aW9uOiAoKSA9PiBib29sZWFuID0gKCkgPT4gZmFsc2U7XG4gIGRpc2FibGVkV2hlbkZ1bmN0aW9uOiAoKSA9PiBib29sZWFuID0gKCkgPT4gZmFsc2U7XG4gIGFkZE5ld0J1dHRvbkNvbnRlbnQhOiBzdHJpbmc7XG4gIGJ5cGFzc1NlY3VyaXR5VHJ1c3Q6IFNlY3VyaXR5VHJ1c3RUeXBlID0gJ25vbmUnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVmOiBFbGVtZW50UmVmKSB7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5yZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhbmd1bGFyMi1zbWFydC1hY3Rpb25zLXRpdGxlJywgJ2FuZ3VsYXIyLXNtYXJ0LWFjdGlvbnMtdGl0bGUtYWRkJyk7XG4gIH1cblxuICBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMuaGlkZGVuV2hlbkZ1bmN0aW9uKCk7XG4gIH1cblxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGlzYWJsZWRXaGVuRnVuY3Rpb24oKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuYWRkTmV3QnV0dG9uQ29udGVudCA9IHRoaXMuZ3JpZC5zZXR0aW5ncy5hZGQ/LmFkZEJ1dHRvbkNvbnRlbnQgPz8gJ0FkZCc7XG4gICAgdGhpcy5ieXBhc3NTZWN1cml0eVRydXN0ID0gdGhpcy5ncmlkLnNldHRpbmdzLmFkZD8uc2FuaXRpemVyPy5ieXBhc3NIdG1sID8gJ2h0bWwnIDogJ25vbmUnO1xuXG4gICAgdGhpcy5kaXNhYmxlZFdoZW5GdW5jdGlvbiA9IHRoaXMuZ3JpZC5zZXR0aW5ncy5hZGQ/LmRpc2FibGVkV2hlbiA/PyB0aGlzLmRpc2FibGVkV2hlbkZ1bmN0aW9uO1xuICAgIGNvbnN0IGFjdGlvbnMgPSB0aGlzLmdyaWQuc2V0dGluZ3MuYWN0aW9ucztcbiAgICBpZiAoYWN0aW9ucyA9PT0gZmFsc2UgfHwgYWN0aW9ucyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmhpZGRlbldoZW5GdW5jdGlvbiA9ICgpID0+IChhY3Rpb25zID09PSBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlkZGVuV2hlbkZ1bmN0aW9uID0gdGhpcy5ncmlkLnNldHRpbmdzLmFkZD8uaGlkZGVuV2hlbiA/PyAoKCkgPT4gKGFjdGlvbnMuYWRkID09PSBmYWxzZSkpO1xuICAgIH1cbiAgfVxuXG4gIG9uQWRkKGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLmRpc2FibGVkKSByZXR1cm47XG5cbiAgICBpZiAodGhpcy5ncmlkLmdldFNldHRpbmcoJ21vZGUnKSA9PT0gJ2V4dGVybmFsJykge1xuICAgICAgdGhpcy5jcmVhdGUuZW1pdCh7XG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ncmlkLmNyZWF0ZUZvcm1TaG93biA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=