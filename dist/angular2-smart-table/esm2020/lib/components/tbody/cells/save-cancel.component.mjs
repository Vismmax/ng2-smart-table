import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class TbodySaveCancelComponent {
    constructor() {
        this.bypassSecurityTrust = 'none';
    }
    onSave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.grid.save(this.row, this.editConfirm);
    }
    onCancelEdit(event) {
        event.preventDefault();
        event.stopPropagation();
        this.row.isInEditing = false;
        this.editCancel.emit({
            data: this.row.getData(),
            discardedData: this.row.getNewData(),
            source: this.grid.source,
        });
    }
    ngOnChanges() {
        this.saveButtonContent = this.grid.getSetting('edit.saveButtonContent');
        this.cancelButtonContent = this.grid.getSetting('edit.cancelButtonContent');
        this.bypassSecurityTrust = this.grid.settings.edit?.sanitizer?.bypassHtml ? 'html' : 'none';
    }
}
TbodySaveCancelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodySaveCancelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TbodySaveCancelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TbodySaveCancelComponent, selector: "angular2-st-tbody-create-cancel", inputs: { grid: "grid", row: "row", editConfirm: "editConfirm", editCancel: "editCancel" }, usesOnChanges: true, ngImport: i0, template: `
    <a href="#" class="angular2-smart-action angular2-smart-action-edit-save"
        [innerHTML]="saveButtonContent" (click)="onSave($event)"></a>
    <a href="#" class="angular2-smart-action angular2-smart-action-edit-cancel"
        [innerHTML]="cancelButtonContent" (click)="onCancelEdit($event)"></a>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodySaveCancelComponent, decorators: [{
            type: Component,
            args: [{
                    // TODO: @breaking-change rename the selector to angular2-st-tbody-save-cancel in the next major version
                    selector: 'angular2-st-tbody-create-cancel',
                    template: `
    <a href="#" class="angular2-smart-action angular2-smart-action-edit-save"
        [innerHTML]="saveButtonContent" (click)="onSave($event)"></a>
    <a href="#" class="angular2-smart-action angular2-smart-action-edit-cancel"
        [innerHTML]="cancelButtonContent" (click)="onCancelEdit($event)"></a>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], editConfirm: [{
                type: Input
            }], editCancel: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2F2ZS1jYW5jZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3Rib2R5L2NlbGxzL3NhdmUtY2FuY2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFnQixLQUFLLEVBQVksTUFBTSxlQUFlLENBQUM7O0FBaUJ4RSxNQUFNLE9BQU8sd0JBQXdCO0lBVnJDO1FBbUJFLHdCQUFtQixHQUFzQixNQUFNLENBQUM7S0EwQmpEO0lBeEJDLE1BQU0sQ0FBQyxLQUFpQjtRQUN0QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBaUI7UUFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDbkIsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ3hCLGFBQWEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtZQUNwQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO1NBQ3pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQUE7UUFDM0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM5RixDQUFDOztzSEFsQ1Usd0JBQXdCOzBHQUF4Qix3QkFBd0Isd0xBUHpCOzs7OztHQUtUOzRGQUVVLHdCQUF3QjtrQkFWcEMsU0FBUzttQkFBQztvQkFDVCx3R0FBd0c7b0JBQ3hHLFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLFFBQVEsRUFBRTs7Ozs7R0FLVDtpQkFDRjs4QkFHVSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWR9IGZyb20gJy4uLy4uLy4uL2xpYi9ncmlkJztcbmltcG9ydCB7Um93fSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zZXQvcm93JztcbmltcG9ydCB7RWRpdENhbmNlbEV2ZW50LCBFZGl0Q29uZmlybUV2ZW50fSBmcm9tICcuLi8uLi8uLi9saWIvZXZlbnRzJztcbmltcG9ydCB7U2VjdXJpdHlUcnVzdFR5cGV9IGZyb20gJy4uLy4uLy4uL3BpcGVzL2J5cGFzcy1zZWN1cml0eS10cnVzdC5waXBlJztcblxuQENvbXBvbmVudCh7XG4gIC8vIFRPRE86IEBicmVha2luZy1jaGFuZ2UgcmVuYW1lIHRoZSBzZWxlY3RvciB0byBhbmd1bGFyMi1zdC10Ym9keS1zYXZlLWNhbmNlbCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uXG4gIHNlbGVjdG9yOiAnYW5ndWxhcjItc3QtdGJvZHktY3JlYXRlLWNhbmNlbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImFuZ3VsYXIyLXNtYXJ0LWFjdGlvbiBhbmd1bGFyMi1zbWFydC1hY3Rpb24tZWRpdC1zYXZlXCJcbiAgICAgICAgW2lubmVySFRNTF09XCJzYXZlQnV0dG9uQ29udGVudFwiIChjbGljayk9XCJvblNhdmUoJGV2ZW50KVwiPjwvYT5cbiAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYW5ndWxhcjItc21hcnQtYWN0aW9uIGFuZ3VsYXIyLXNtYXJ0LWFjdGlvbi1lZGl0LWNhbmNlbFwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwiY2FuY2VsQnV0dG9uQ29udGVudFwiIChjbGljayk9XCJvbkNhbmNlbEVkaXQoJGV2ZW50KVwiPjwvYT5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgVGJvZHlTYXZlQ2FuY2VsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBncmlkITogR3JpZDtcbiAgQElucHV0KCkgcm93ITogUm93O1xuICBASW5wdXQoKSBlZGl0Q29uZmlybSE6IEV2ZW50RW1pdHRlcjxFZGl0Q29uZmlybUV2ZW50PjtcbiAgQElucHV0KCkgZWRpdENhbmNlbCE6IEV2ZW50RW1pdHRlcjxFZGl0Q2FuY2VsRXZlbnQ+O1xuXG4gIGNhbmNlbEJ1dHRvbkNvbnRlbnQhOiBzdHJpbmc7XG4gIHNhdmVCdXR0b25Db250ZW50ITogc3RyaW5nO1xuICBieXBhc3NTZWN1cml0eVRydXN0OiBTZWN1cml0eVRydXN0VHlwZSA9ICdub25lJztcblxuICBvblNhdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5ncmlkLnNhdmUodGhpcy5yb3csIHRoaXMuZWRpdENvbmZpcm0pO1xuICB9XG5cbiAgb25DYW5jZWxFZGl0KGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIHRoaXMucm93LmlzSW5FZGl0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5lZGl0Q2FuY2VsLmVtaXQoe1xuICAgICAgZGF0YTogdGhpcy5yb3cuZ2V0RGF0YSgpLFxuICAgICAgZGlzY2FyZGVkRGF0YTogdGhpcy5yb3cuZ2V0TmV3RGF0YSgpLFxuICAgICAgc291cmNlOiB0aGlzLmdyaWQuc291cmNlLFxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5zYXZlQnV0dG9uQ29udGVudCA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdlZGl0LnNhdmVCdXR0b25Db250ZW50Jyk7XG4gICAgdGhpcy5jYW5jZWxCdXR0b25Db250ZW50ID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ2VkaXQuY2FuY2VsQnV0dG9uQ29udGVudCcpXG4gICAgdGhpcy5ieXBhc3NTZWN1cml0eVRydXN0ID0gdGhpcy5ncmlkLnNldHRpbmdzLmVkaXQ/LnNhbml0aXplcj8uYnlwYXNzSHRtbCA/ICdodG1sJyA6ICdub25lJztcbiAgfVxufVxuIl19