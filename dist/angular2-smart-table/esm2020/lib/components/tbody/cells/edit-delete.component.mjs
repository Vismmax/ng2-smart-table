import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../pipes/bypass-security-trust.pipe";
export class TbodyEditDeleteComponent {
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.editRowSelect = new EventEmitter();
        this.editButtonBypassSecurityTrust = 'none';
        this.editHiddenWhenFunction = (_) => false;
        this.editDisabledWhenFunction = (_) => false;
        this.deleteHiddenWhenFunction = (_) => false;
        this.deleteDisabledWhenFunction = (_) => false;
        this.deleteButtonBypassSecurityTrust = 'none';
    }
    onEdit(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.editDisabled)
            return;
        this.editRowSelect.emit(this.row);
        if (this.grid.getSetting('mode') === 'external') {
            this.edit.emit({
                row: this.row,
                data: this.row.getData(),
                source: this.source,
            });
        }
        else {
            this.grid.edit(this.row);
        }
    }
    onDelete(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.deleteDisabled)
            return;
        if (this.grid.getSetting('mode') === 'external') {
            this.delete.emit({
                row: this.row,
                data: this.row.getData(),
                source: this.source,
            });
        }
        else {
            this.grid.delete(this.row, this.deleteConfirm);
        }
    }
    get editVisible() {
        return !this.editHiddenWhenFunction(this.row);
    }
    get editDisabled() {
        return this.editDisabledWhenFunction(this.row);
    }
    get deleteVisible() {
        return !this.deleteHiddenWhenFunction(this.row);
    }
    get deleteDisabled() {
        return this.deleteDisabledWhenFunction(this.row);
    }
    ngOnChanges() {
        const actions = this.grid.settings.actions;
        if (actions === false || actions === undefined) {
            // handle the "flexibility" of this property....
            this.editHiddenWhenFunction = (_) => (actions === false);
            this.deleteHiddenWhenFunction = (_) => (actions === false);
            return;
        }
        this.editRowButtonContent = this.grid.settings.edit?.editButtonContent ?? 'Edit';
        this.editButtonBypassSecurityTrust = this.grid.settings.edit?.sanitizer?.bypassHtml ? 'html' : 'none';
        this.editHiddenWhenFunction = this.grid.settings.edit?.hiddenWhen ?? ((_) => (actions.edit === false));
        this.editDisabledWhenFunction = this.grid.settings.edit?.disabledWhen ?? this.editDisabledWhenFunction;
        this.deleteRowButtonContent = this.grid.settings.delete?.deleteButtonContent ?? 'Delete';
        this.deleteButtonBypassSecurityTrust = this.grid.settings.delete?.sanitizer?.bypassHtml ? 'html' : 'none';
        this.deleteHiddenWhenFunction = this.grid.settings.delete?.hiddenWhen ?? ((_) => (actions.delete === false));
        this.deleteDisabledWhenFunction = this.grid.settings.delete?.disabledWhen ?? this.deleteDisabledWhenFunction;
    }
}
TbodyEditDeleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyEditDeleteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TbodyEditDeleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TbodyEditDeleteComponent, selector: "angular2-st-tbody-edit-delete", inputs: { grid: "grid", row: "row", source: "source", deleteConfirm: "deleteConfirm" }, outputs: { edit: "edit", delete: "delete", editRowSelect: "editRowSelect" }, usesOnChanges: true, ngImport: i0, template: `
    <a href="#" *ngIf="editVisible" class="angular2-smart-action angular2-smart-action-edit-edit"
       [ngClass]="{'not-allowed': editDisabled}"
       [innerHTML]="editRowButtonContent | bypassSecurityTrust: editButtonBypassSecurityTrust"
       (click)="onEdit($event)"></a>
    <a href="#" *ngIf="deleteVisible" class="angular2-smart-action angular2-smart-action-delete-delete"
       [ngClass]="{'not-allowed': deleteDisabled}"
       [innerHTML]="deleteRowButtonContent | bypassSecurityTrust: deleteButtonBypassSecurityTrust" (click)="onDelete($event)"></a>
  `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "bypassSecurityTrust": i2.BypassSecurityTrustPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyEditDeleteComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-st-tbody-edit-delete',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <a href="#" *ngIf="editVisible" class="angular2-smart-action angular2-smart-action-edit-edit"
       [ngClass]="{'not-allowed': editDisabled}"
       [innerHTML]="editRowButtonContent | bypassSecurityTrust: editButtonBypassSecurityTrust"
       (click)="onEdit($event)"></a>
    <a href="#" *ngIf="deleteVisible" class="angular2-smart-action angular2-smart-action-delete-delete"
       [ngClass]="{'not-allowed': deleteDisabled}"
       [innerHTML]="deleteRowButtonContent | bypassSecurityTrust: deleteButtonBypassSecurityTrust" (click)="onDelete($event)"></a>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], source: [{
                type: Input
            }], deleteConfirm: [{
                type: Input
            }], edit: [{
                type: Output
            }], delete: [{
                type: Output
            }], editRowSelect: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1kZWxldGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3Rib2R5L2NlbGxzL2VkaXQtZGVsZXRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7O0FBcUJ6RyxNQUFNLE9BQU8sd0JBQXdCO0lBYnJDO1FBb0JZLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBYSxDQUFDO1FBQ3JDLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBZSxDQUFDO1FBQ3pDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUdsRCxrQ0FBNkIsR0FBc0IsTUFBTSxDQUFDO1FBQzFELDJCQUFzQixHQUEwQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQzdELDZCQUF3QixHQUEwQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQy9ELDZCQUF3QixHQUEwQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQy9ELCtCQUEwQixHQUEwQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBRWpFLG9DQUErQixHQUFzQixNQUFNLENBQUM7S0FzRTdEO0lBcEVDLE1BQU0sQ0FBQyxLQUFVO1FBQ2YsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUU5QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFbEMsSUFB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ZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWR9IGZyb20gJy4uLy4uLy4uL2xpYi9ncmlkJztcbmltcG9ydCB7Um93fSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zZXQvcm93JztcbmltcG9ydCB7RGF0YVNvdXJjZX0gZnJvbSAnLi4vLi4vLi4vbGliL2RhdGEtc291cmNlL2RhdGEtc291cmNlJztcbmltcG9ydCB7RGVsZXRlQ29uZmlybUV2ZW50LCBEZWxldGVFdmVudCwgRWRpdEV2ZW50fSBmcm9tICcuLi8uLi8uLi9saWIvZXZlbnRzJztcbmltcG9ydCB7U2VjdXJpdHlUcnVzdFR5cGV9IGZyb20gJy4uLy4uLy4uL3BpcGVzL2J5cGFzcy1zZWN1cml0eS10cnVzdC5waXBlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW5ndWxhcjItc3QtdGJvZHktZWRpdC1kZWxldGUnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YSBocmVmPVwiI1wiICpuZ0lmPVwiZWRpdFZpc2libGVcIiBjbGFzcz1cImFuZ3VsYXIyLXNtYXJ0LWFjdGlvbiBhbmd1bGFyMi1zbWFydC1hY3Rpb24tZWRpdC1lZGl0XCJcbiAgICAgICBbbmdDbGFzc109XCJ7J25vdC1hbGxvd2VkJzogZWRpdERpc2FibGVkfVwiXG4gICAgICAgW2lubmVySFRNTF09XCJlZGl0Um93QnV0dG9uQ29udGVudCB8IGJ5cGFzc1NlY3VyaXR5VHJ1c3Q6IGVkaXRCdXR0b25CeXBhc3NTZWN1cml0eVRydXN0XCJcbiAgICAgICAoY2xpY2spPVwib25FZGl0KCRldmVudClcIj48L2E+XG4gICAgPGEgaHJlZj1cIiNcIiAqbmdJZj1cImRlbGV0ZVZpc2libGVcIiBjbGFzcz1cImFuZ3VsYXIyLXNtYXJ0LWFjdGlvbiBhbmd1bGFyMi1zbWFydC1hY3Rpb24tZGVsZXRlLWRlbGV0ZVwiXG4gICAgICAgW25nQ2xhc3NdPVwieydub3QtYWxsb3dlZCc6IGRlbGV0ZURpc2FibGVkfVwiXG4gICAgICAgW2lubmVySFRNTF09XCJkZWxldGVSb3dCdXR0b25Db250ZW50IHwgYnlwYXNzU2VjdXJpdHlUcnVzdDogZGVsZXRlQnV0dG9uQnlwYXNzU2VjdXJpdHlUcnVzdFwiIChjbGljayk9XCJvbkRlbGV0ZSgkZXZlbnQpXCI+PC9hPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUYm9keUVkaXREZWxldGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGdyaWQhOiBHcmlkO1xuICBASW5wdXQoKSByb3chOiBSb3c7XG4gIEBJbnB1dCgpIHNvdXJjZSE6IERhdGFTb3VyY2U7XG4gIEBJbnB1dCgpIGRlbGV0ZUNvbmZpcm0hOiBFdmVudEVtaXR0ZXI8RGVsZXRlQ29uZmlybUV2ZW50PjtcblxuICBAT3V0cHV0KCkgZWRpdCA9IG5ldyBFdmVudEVtaXR0ZXI8RWRpdEV2ZW50PigpO1xuICBAT3V0cHV0KCkgZGVsZXRlID0gbmV3IEV2ZW50RW1pdHRlcjxEZWxldGVFdmVudD4oKTtcbiAgQE91dHB1dCgpIGVkaXRSb3dTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBlZGl0Um93QnV0dG9uQ29udGVudCE6IHN0cmluZztcbiAgZWRpdEJ1dHRvbkJ5cGFzc1NlY3VyaXR5VHJ1c3Q6IFNlY3VyaXR5VHJ1c3RUeXBlID0gJ25vbmUnO1xuICBlZGl0SGlkZGVuV2hlbkZ1bmN0aW9uOiAocm93OiBSb3cpID0+IGJvb2xlYW4gPSAoXykgPT4gZmFsc2U7XG4gIGVkaXREaXNhYmxlZFdoZW5GdW5jdGlvbjogKHJvdzogUm93KSA9PiBib29sZWFuID0gKF8pID0+IGZhbHNlO1xuICBkZWxldGVIaWRkZW5XaGVuRnVuY3Rpb246IChyb3c6IFJvdykgPT4gYm9vbGVhbiA9IChfKSA9PiBmYWxzZTtcbiAgZGVsZXRlRGlzYWJsZWRXaGVuRnVuY3Rpb246IChyb3c6IFJvdykgPT4gYm9vbGVhbiA9IChfKSA9PiBmYWxzZTtcbiAgZGVsZXRlUm93QnV0dG9uQ29udGVudCE6IHN0cmluZztcbiAgZGVsZXRlQnV0dG9uQnlwYXNzU2VjdXJpdHlUcnVzdDogU2VjdXJpdHlUcnVzdFR5cGUgPSAnbm9uZSc7XG5cbiAgb25FZGl0KGV2ZW50OiBhbnkpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLmVkaXREaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgdGhpcy5lZGl0Um93U2VsZWN0LmVtaXQodGhpcy5yb3cpO1xuXG4gICAgaWYgKHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdtb2RlJykgPT09ICdleHRlcm5hbCcpIHtcbiAgICAgIHRoaXMuZWRpdC5lbWl0KHtcbiAgICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgICAgZGF0YTogdGhpcy5yb3cuZ2V0RGF0YSgpLFxuICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZ3JpZC5lZGl0KHRoaXMucm93KTtcbiAgICB9XG4gIH1cblxuICBvbkRlbGV0ZShldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5kZWxldGVEaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgaWYgKHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdtb2RlJykgPT09ICdleHRlcm5hbCcpIHtcbiAgICAgIHRoaXMuZGVsZXRlLmVtaXQoe1xuICAgICAgICByb3c6IHRoaXMucm93LFxuICAgICAgICBkYXRhOiB0aGlzLnJvdy5nZXREYXRhKCksXG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5ncmlkLmRlbGV0ZSh0aGlzLnJvdywgdGhpcy5kZWxldGVDb25maXJtKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZWRpdFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmVkaXRIaWRkZW5XaGVuRnVuY3Rpb24odGhpcy5yb3cpO1xuICB9XG5cbiAgZ2V0IGVkaXREaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lZGl0RGlzYWJsZWRXaGVuRnVuY3Rpb24odGhpcy5yb3cpO1xuICB9XG5cbiAgZ2V0IGRlbGV0ZVZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICF0aGlzLmRlbGV0ZUhpZGRlbldoZW5GdW5jdGlvbih0aGlzLnJvdyk7XG4gIH1cblxuICBnZXQgZGVsZXRlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlRGlzYWJsZWRXaGVuRnVuY3Rpb24odGhpcy5yb3cpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgY29uc3QgYWN0aW9ucyA9IHRoaXMuZ3JpZC5zZXR0aW5ncy5hY3Rpb25zO1xuICAgIGlmIChhY3Rpb25zID09PSBmYWxzZSB8fCBhY3Rpb25zID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIGhhbmRsZSB0aGUgXCJmbGV4aWJpbGl0eVwiIG9mIHRoaXMgcHJvcGVydHkuLi4uXG4gICAgICB0aGlzLmVkaXRIaWRkZW5XaGVuRnVuY3Rpb24gPSAoXykgPT4gKGFjdGlvbnMgPT09IGZhbHNlKTtcbiAgICAgIHRoaXMuZGVsZXRlSGlkZGVuV2hlbkZ1bmN0aW9uID0gKF8pID0+IChhY3Rpb25zID09PSBmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5lZGl0Um93QnV0dG9uQ29udGVudCA9IHRoaXMuZ3JpZC5zZXR0aW5ncy5lZGl0Py5lZGl0QnV0dG9uQ29udGVudCA/PyAnRWRpdCc7XG4gICAgdGhpcy5lZGl0QnV0dG9uQnlwYXNzU2VjdXJpdHlUcnVzdCA9IHRoaXMuZ3JpZC5zZXR0aW5ncy5lZGl0Py5zYW5pdGl6ZXI/LmJ5cGFzc0h0bWwgPyAnaHRtbCcgOiAnbm9uZSc7XG4gICAgdGhpcy5lZGl0SGlkZGVuV2hlbkZ1bmN0aW9uID0gdGhpcy5ncmlkLnNldHRpbmdzLmVkaXQ/LmhpZGRlbldoZW4gPz8gKChfKSA9PiAoYWN0aW9ucy5lZGl0ID09PSBmYWxzZSkpO1xuICAgIHRoaXMuZWRpdERpc2FibGVkV2hlbkZ1bmN0aW9uID0gdGhpcy5ncmlkLnNldHRpbmdzLmVkaXQ/LmRpc2FibGVkV2hlbiA/PyB0aGlzLmVkaXREaXNhYmxlZFdoZW5GdW5jdGlvbjtcbiAgICB0aGlzLmRlbGV0ZVJvd0J1dHRvbkNvbnRlbnQgPSB0aGlzLmdyaWQuc2V0dGluZ3MuZGVsZXRlPy5kZWxldGVCdXR0b25Db250ZW50ID8/ICdEZWxldGUnO1xuICAgIHRoaXMuZGVsZXRlQnV0dG9uQnlwYXNzU2VjdXJpdHlUcnVzdCA9IHRoaXMuZ3JpZC5zZXR0aW5ncy5kZWxldGU/LnNhbml0aXplcj8uYnlwYXNzSHRtbCA/ICdodG1sJyA6ICdub25lJztcbiAgICB0aGlzLmRlbGV0ZUhpZGRlbldoZW5GdW5jdGlvbiA9IHRoaXMuZ3JpZC5zZXR0aW5ncy5kZWxldGU/LmhpZGRlbldoZW4gPz8gKChfKSA9PiAoYWN0aW9ucy5kZWxldGUgPT09IGZhbHNlKSk7XG4gICAgdGhpcy5kZWxldGVEaXNhYmxlZFdoZW5GdW5jdGlvbiA9IHRoaXMuZ3JpZC5zZXR0aW5ncy5kZWxldGU/LmRpc2FibGVkV2hlbiA/PyB0aGlzLmRlbGV0ZURpc2FibGVkV2hlbkZ1bmN0aW9uO1xuICB9XG59XG4iXX0=