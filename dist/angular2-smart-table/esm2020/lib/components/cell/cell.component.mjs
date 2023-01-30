import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./cell-view-mode/view-cell.component";
import * as i2 from "./cell-edit-mode/edit-cell.component";
import * as i3 from "@angular/common";
export class CellComponent {
    constructor() {
        this.inputClass = '';
        this.mode = 'inline';
        this.isInEditing = false;
    }
    onEdited() {
        if (this.isNew) {
            this.grid.create(this.grid.getNewRow(), this.createConfirm);
        }
        else {
            this.grid.save(this.row, this.editConfirm);
        }
    }
    onStopEditing() {
        if (this.isNew) {
            this.grid.createFormShown = false;
            this.createCancel.emit({
                discardedData: this.grid.getNewRow().getNewData(),
                source: this.grid.source,
            });
        }
        else {
            this.row.isInEditing = false;
            this.editCancel.emit({
                data: this.row.getData(),
                discardedData: this.row.getNewData(),
                source: this.grid.source,
            });
        }
    }
}
CellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CellComponent, selector: "angular2-smart-table-cell", inputs: { grid: "grid", row: "row", cell: "cell", inputClass: "inputClass", mode: "mode", isInEditing: "isInEditing", isNew: "isNew", editConfirm: "editConfirm", editCancel: "editCancel", createConfirm: "createConfirm", createCancel: "createCancel" }, ngImport: i0, template: `
    <table-cell-view-mode *ngIf="!isInEditing" [cell]="cell"></table-cell-view-mode>
    <table-cell-edit-mode *ngIf="isInEditing" [cell]="cell"
                          [inputClass]="inputClass"
                          (edited)="onEdited()"
                          (stopEditing)="onStopEditing()"
    ></table-cell-edit-mode>
  `, isInline: true, components: [{ type: i1.ViewCellComponent, selector: "table-cell-view-mode", inputs: ["cell"] }, { type: i2.EditCellComponent, selector: "table-cell-edit-mode", inputs: ["cell", "inputClass"], outputs: ["edited", "stopEditing"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-smart-table-cell',
                    template: `
    <table-cell-view-mode *ngIf="!isInEditing" [cell]="cell"></table-cell-view-mode>
    <table-cell-edit-mode *ngIf="isInEditing" [cell]="cell"
                          [inputClass]="inputClass"
                          (edited)="onEdited()"
                          (stopEditing)="onStopEditing()"
    ></table-cell-edit-mode>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], cell: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], mode: [{
                type: Input
            }], isInEditing: [{
                type: Input
            }], isNew: [{
                type: Input
            }], editConfirm: [{
                type: Input
            }], editCancel: [{
                type: Input
            }], createConfirm: [{
                type: Input
            }], createCancel: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvY2VsbC9jZWxsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFnQixLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBa0I3RCxNQUFNLE9BQU8sYUFBYTtJQVgxQjtRQWdCVyxlQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLFNBQUksR0FBVyxRQUFRLENBQUM7UUFDeEIsZ0JBQVcsR0FBWSxLQUFLLENBQUM7S0FpQ3ZDO0lBeEJDLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM3RDthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDNUM7SUFDSCxDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztZQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDckIsYUFBYSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxFQUFFO2dCQUNqRCxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2FBQ3pCLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDN0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQ25CLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDeEIsYUFBYSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUNwQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2FBQ3pCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7MkdBdkNVLGFBQWE7K0ZBQWIsYUFBYSw2VEFUZDs7Ozs7OztHQU9UOzRGQUVVLGFBQWE7a0JBWHpCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsUUFBUSxFQUFFOzs7Ozs7O0dBT1Q7aUJBQ0Y7OEJBR1UsSUFBSTtzQkFBWixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBRUcsV0FBVztzQkFBbkIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtHcmlkfSBmcm9tICcuLi8uLi9saWIvZ3JpZCc7XG5pbXBvcnQge0NlbGx9IGZyb20gJy4uLy4uL2xpYi9kYXRhLXNldC9jZWxsJztcbmltcG9ydCB7Um93fSBmcm9tICcuLi8uLi9saWIvZGF0YS1zZXQvcm93JztcbmltcG9ydCB7Q3JlYXRlQ2FuY2VsRXZlbnQsIENyZWF0ZUNvbmZpcm1FdmVudCwgRWRpdENhbmNlbEV2ZW50LCBFZGl0Q29uZmlybUV2ZW50fSBmcm9tICcuLi8uLi9saWIvZXZlbnRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW5ndWxhcjItc21hcnQtdGFibGUtY2VsbCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRhYmxlLWNlbGwtdmlldy1tb2RlICpuZ0lmPVwiIWlzSW5FZGl0aW5nXCIgW2NlbGxdPVwiY2VsbFwiPjwvdGFibGUtY2VsbC12aWV3LW1vZGU+XG4gICAgPHRhYmxlLWNlbGwtZWRpdC1tb2RlICpuZ0lmPVwiaXNJbkVkaXRpbmdcIiBbY2VsbF09XCJjZWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2lucHV0Q2xhc3NdPVwiaW5wdXRDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChlZGl0ZWQpPVwib25FZGl0ZWQoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChzdG9wRWRpdGluZyk9XCJvblN0b3BFZGl0aW5nKClcIlxuICAgID48L3RhYmxlLWNlbGwtZWRpdC1tb2RlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDZWxsQ29tcG9uZW50IHtcblxuICBASW5wdXQoKSBncmlkITogR3JpZDtcbiAgQElucHV0KCkgcm93ITogUm93O1xuICBASW5wdXQoKSBjZWxsITogQ2VsbDtcbiAgQElucHV0KCkgaW5wdXRDbGFzczogc3RyaW5nID0gJyc7XG4gIEBJbnB1dCgpIG1vZGU6IHN0cmluZyA9ICdpbmxpbmUnO1xuICBASW5wdXQoKSBpc0luRWRpdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBpc05ldyE6IGJvb2xlYW47XG4gIC8vIGlmIGlzTmV3ID09PSBmYWxzZVxuICBASW5wdXQoKSBlZGl0Q29uZmlybSE6IEV2ZW50RW1pdHRlcjxFZGl0Q29uZmlybUV2ZW50PjtcbiAgQElucHV0KCkgZWRpdENhbmNlbCE6IEV2ZW50RW1pdHRlcjxFZGl0Q2FuY2VsRXZlbnQ+O1xuICAvLyBpZiBpc05ldyA9PT0gdHJ1ZVxuICBASW5wdXQoKSBjcmVhdGVDb25maXJtITogRXZlbnRFbWl0dGVyPENyZWF0ZUNvbmZpcm1FdmVudD47XG4gIEBJbnB1dCgpIGNyZWF0ZUNhbmNlbCE6IEV2ZW50RW1pdHRlcjxDcmVhdGVDYW5jZWxFdmVudD47XG5cbiAgb25FZGl0ZWQoKSB7XG4gICAgaWYgKHRoaXMuaXNOZXcpIHtcbiAgICAgIHRoaXMuZ3JpZC5jcmVhdGUodGhpcy5ncmlkLmdldE5ld1JvdygpLCB0aGlzLmNyZWF0ZUNvbmZpcm0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdyaWQuc2F2ZSh0aGlzLnJvdywgdGhpcy5lZGl0Q29uZmlybSk7XG4gICAgfVxuICB9XG5cbiAgb25TdG9wRWRpdGluZygpIHtcbiAgICBpZiAodGhpcy5pc05ldykge1xuICAgICAgdGhpcy5ncmlkLmNyZWF0ZUZvcm1TaG93biA9IGZhbHNlO1xuICAgICAgdGhpcy5jcmVhdGVDYW5jZWwuZW1pdCh7XG4gICAgICAgIGRpc2NhcmRlZERhdGE6IHRoaXMuZ3JpZC5nZXROZXdSb3coKS5nZXROZXdEYXRhKCksXG4gICAgICAgIHNvdXJjZTogdGhpcy5ncmlkLnNvdXJjZSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJvdy5pc0luRWRpdGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5lZGl0Q2FuY2VsLmVtaXQoe1xuICAgICAgICBkYXRhOiB0aGlzLnJvdy5nZXREYXRhKCksXG4gICAgICAgIGRpc2NhcmRlZERhdGE6IHRoaXMucm93LmdldE5ld0RhdGEoKSxcbiAgICAgICAgc291cmNlOiB0aGlzLmdyaWQuc291cmNlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=