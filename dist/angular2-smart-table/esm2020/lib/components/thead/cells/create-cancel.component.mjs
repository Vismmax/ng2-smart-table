import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../../pipes/bypass-security-trust.pipe";
export class TheadCreateCancelComponent {
    constructor() {
        this.bypassSecurityTrust = 'none';
    }
    onCreate(event) {
        event.preventDefault();
        event.stopPropagation();
        this.grid.create(this.grid.getNewRow(), this.createConfirm);
    }
    onCancelCreate(event) {
        event.preventDefault();
        event.stopPropagation();
        this.grid.createFormShown = false;
        this.createCancel.emit({
            discardedData: this.grid.getNewRow().getNewData(),
            source: this.grid.source,
        });
    }
    ngOnChanges() {
        this.createButtonContent = this.grid.getSetting('add.createButtonContent');
        this.cancelButtonContent = this.grid.getSetting('add.cancelButtonContent');
        this.bypassSecurityTrust = this.grid.settings.add?.sanitizer?.bypassHtml ? 'html' : 'none';
    }
}
TheadCreateCancelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadCreateCancelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TheadCreateCancelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TheadCreateCancelComponent, selector: "angular2-st-actions", inputs: { grid: "grid", createConfirm: "createConfirm", createCancel: "createCancel" }, usesOnChanges: true, ngImport: i0, template: `
    <a href="#" class="angular2-smart-action angular2-smart-action-add-create"
        [innerHTML]="createButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onCreate($event)"></a>
    <a href="#" class="angular2-smart-action angular2-smart-action-add-cancel"
        [innerHTML]="cancelButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onCancelCreate($event)"></a>
  `, isInline: true, pipes: { "bypassSecurityTrust": i1.BypassSecurityTrustPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadCreateCancelComponent, decorators: [{
            type: Component,
            args: [{
                    // TODO: @breaking-change rename the selector to angular2-st-thead-create-cancel in the next major version
                    selector: 'angular2-st-actions',
                    template: `
    <a href="#" class="angular2-smart-action angular2-smart-action-add-create"
        [innerHTML]="createButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onCreate($event)"></a>
    <a href="#" class="angular2-smart-action angular2-smart-action-add-cancel"
        [innerHTML]="cancelButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onCancelCreate($event)"></a>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], createConfirm: [{
                type: Input
            }], createCancel: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNhbmNlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvdGhlYWQvY2VsbHMvY3JlYXRlLWNhbmNlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBZ0IsS0FBSyxFQUFZLE1BQU0sZUFBZSxDQUFDOzs7QUFnQnhFLE1BQU0sT0FBTywwQkFBMEI7SUFWdkM7UUFrQkUsd0JBQW1CLEdBQXNCLE1BQU0sQ0FBQztLQXVCakQ7SUFyQkMsUUFBUSxDQUFDLEtBQWlCO1FBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFpQjtRQUM5QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLEVBQUU7WUFDakQsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtTQUN6QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7SUFDN0YsQ0FBQzs7d0hBOUJVLDBCQUEwQjs0R0FBMUIsMEJBQTBCLHdLQVAzQjs7Ozs7R0FLVDs0RkFFVSwwQkFBMEI7a0JBVnRDLFNBQVM7bUJBQUM7b0JBQ1QsMEdBQTBHO29CQUMxRyxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUU7Ozs7O0dBS1Q7aUJBQ0Y7OEJBR1UsSUFBSTtzQkFBWixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWR9IGZyb20gJy4uLy4uLy4uL2xpYi9ncmlkJztcbmltcG9ydCB7Q3JlYXRlQ2FuY2VsRXZlbnQsIENyZWF0ZUNvbmZpcm1FdmVudH0gZnJvbSAnLi4vLi4vLi4vbGliL2V2ZW50cyc7XG5pbXBvcnQge1NlY3VyaXR5VHJ1c3RUeXBlfSBmcm9tICcuLi8uLi8uLi9waXBlcy9ieXBhc3Mtc2VjdXJpdHktdHJ1c3QucGlwZSc7XG5cbkBDb21wb25lbnQoe1xuICAvLyBUT0RPOiBAYnJlYWtpbmctY2hhbmdlIHJlbmFtZSB0aGUgc2VsZWN0b3IgdG8gYW5ndWxhcjItc3QtdGhlYWQtY3JlYXRlLWNhbmNlbCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG4gIHNlbGVjdG9yOiAnYW5ndWxhcjItc3QtYWN0aW9ucycsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImFuZ3VsYXIyLXNtYXJ0LWFjdGlvbiBhbmd1bGFyMi1zbWFydC1hY3Rpb24tYWRkLWNyZWF0ZVwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwiY3JlYXRlQnV0dG9uQ29udGVudCB8IGJ5cGFzc1NlY3VyaXR5VHJ1c3Q6IGJ5cGFzc1NlY3VyaXR5VHJ1c3RcIiAoY2xpY2spPVwib25DcmVhdGUoJGV2ZW50KVwiPjwvYT5cbiAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYW5ndWxhcjItc21hcnQtYWN0aW9uIGFuZ3VsYXIyLXNtYXJ0LWFjdGlvbi1hZGQtY2FuY2VsXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJjYW5jZWxCdXR0b25Db250ZW50IHwgYnlwYXNzU2VjdXJpdHlUcnVzdDogYnlwYXNzU2VjdXJpdHlUcnVzdFwiIChjbGljayk9XCJvbkNhbmNlbENyZWF0ZSgkZXZlbnQpXCI+PC9hPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUaGVhZENyZWF0ZUNhbmNlbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZ3JpZCE6IEdyaWQ7XG4gIEBJbnB1dCgpIGNyZWF0ZUNvbmZpcm0hOiBFdmVudEVtaXR0ZXI8Q3JlYXRlQ29uZmlybUV2ZW50PjtcbiAgQElucHV0KCkgY3JlYXRlQ2FuY2VsITogRXZlbnRFbWl0dGVyPENyZWF0ZUNhbmNlbEV2ZW50PjtcblxuICBjcmVhdGVCdXR0b25Db250ZW50ITogc3RyaW5nO1xuICBjYW5jZWxCdXR0b25Db250ZW50ITogc3RyaW5nO1xuICBieXBhc3NTZWN1cml0eVRydXN0OiBTZWN1cml0eVRydXN0VHlwZSA9ICdub25lJztcblxuICBvbkNyZWF0ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5ncmlkLmNyZWF0ZSh0aGlzLmdyaWQuZ2V0TmV3Um93KCksIHRoaXMuY3JlYXRlQ29uZmlybSk7XG4gIH1cblxuICBvbkNhbmNlbENyZWF0ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgdGhpcy5ncmlkLmNyZWF0ZUZvcm1TaG93biA9IGZhbHNlO1xuICAgIHRoaXMuY3JlYXRlQ2FuY2VsLmVtaXQoe1xuICAgICAgZGlzY2FyZGVkRGF0YTogdGhpcy5ncmlkLmdldE5ld1JvdygpLmdldE5ld0RhdGEoKSxcbiAgICAgIHNvdXJjZTogdGhpcy5ncmlkLnNvdXJjZSxcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuY3JlYXRlQnV0dG9uQ29udGVudCA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdhZGQuY3JlYXRlQnV0dG9uQ29udGVudCcpO1xuICAgIHRoaXMuY2FuY2VsQnV0dG9uQ29udGVudCA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdhZGQuY2FuY2VsQnV0dG9uQ29udGVudCcpO1xuICAgIHRoaXMuYnlwYXNzU2VjdXJpdHlUcnVzdCA9IHRoaXMuZ3JpZC5zZXR0aW5ncy5hZGQ/LnNhbml0aXplcj8uYnlwYXNzSHRtbCA/ICdodG1sJyA6ICdub25lJztcbiAgfVxufVxuIl19