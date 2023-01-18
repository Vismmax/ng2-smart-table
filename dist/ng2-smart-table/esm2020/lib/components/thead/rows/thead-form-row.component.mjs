import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Grid } from '../../../lib/grid';
import { Row } from '../../../lib/data-set/row';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../cell/cell.component";
import * as i3 from "../cells/actions.component";
export class TheadFormRowComponent {
    constructor() {
        this.create = new EventEmitter();
    }
    onCreate(event) {
        event.stopPropagation();
        this.grid.create(this.grid.getNewRow(), this.createConfirm);
    }
    ngOnChanges() {
        this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
        this.showActionColumnLeft = this.grid.showActionColumn('left');
        this.showActionColumnRight = this.grid.showActionColumn('right');
        this.addInputClass = this.grid.getSetting('add.inputClass');
    }
    getVisibleCells(cells) {
        return (cells || []).filter((cell) => !cell.getColumn().hide);
    }
}
TheadFormRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TheadFormRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TheadFormRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: TheadFormRowComponent, selector: "[ng2-st-thead-form-row]", inputs: { grid: "grid", row: "row", createConfirm: "createConfirm" }, outputs: { create: "create" }, usesOnChanges: true, ngImport: i0, template: `
      <td *ngIf=""></td>
      <td  *ngIf="showActionColumnLeft"  class="ng2-smart-actions">
        <ng2-st-actions [grid]="grid" (create)="onCreate($event)"></ng2-st-actions>
      </td>
      <td *ngFor="let cell of getVisibleCells(grid.getNewRow().getCells())">
        <ng2-smart-table-cell [cell]="cell"
                              [grid]="grid"
                              [isNew]="true"
                              [createConfirm]="createConfirm"
                              [inputClass]="addInputClass"
                              [isInEditing]="grid.getNewRow().isInEditing"
                              (edited)="onCreate($event)">
        </ng2-smart-table-cell>
      </td>
      <td  *ngIf="showActionColumnRight"  class="ng2-smart-actions">
        <ng2-st-actions [grid]="grid" (create)="onCreate($event)"></ng2-st-actions>
      </td>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.CellComponent, selector: "ng2-smart-table-cell", inputs: ["grid", "row", "editConfirm", "createConfirm", "isNew", "cell", "inputClass", "mode", "isInEditing"], outputs: ["edited"] }, { kind: "component", type: i3.ActionsComponent, selector: "ng2-st-actions", inputs: ["grid"], outputs: ["create"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TheadFormRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ng2-st-thead-form-row]',
                    template: `
      <td *ngIf=""></td>
      <td  *ngIf="showActionColumnLeft"  class="ng2-smart-actions">
        <ng2-st-actions [grid]="grid" (create)="onCreate($event)"></ng2-st-actions>
      </td>
      <td *ngFor="let cell of getVisibleCells(grid.getNewRow().getCells())">
        <ng2-smart-table-cell [cell]="cell"
                              [grid]="grid"
                              [isNew]="true"
                              [createConfirm]="createConfirm"
                              [inputClass]="addInputClass"
                              [isInEditing]="grid.getNewRow().isInEditing"
                              (edited)="onCreate($event)">
        </ng2-smart-table-cell>
      </td>
      <td  *ngIf="showActionColumnRight"  class="ng2-smart-actions">
        <ng2-st-actions [grid]="grid" (create)="onCreate($event)"></ng2-st-actions>
      </td>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], createConfirm: [{
                type: Input
            }], create: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQtZm9ybS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmcyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy90aGVhZC9yb3dzL3RoZWFkLWZvcm0tcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBRWxGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7O0FBeUJoRCxNQUFNLE9BQU8scUJBQXFCO0lBdEJsQztRQTRCWSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztLQXVCNUM7SUFoQkMsUUFBUSxDQUFDLEtBQVU7UUFDakIsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM3RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELGVBQWUsQ0FBQyxLQUFrQjtRQUNoQyxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEUsQ0FBQzs7bUhBNUJVLHFCQUFxQjt1R0FBckIscUJBQXFCLHlMQXBCdEI7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCVDs0RkFFVSxxQkFBcUI7a0JBdEJqQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JUO2lCQUNGOzhCQUdVLElBQUk7c0JBQVosS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEdyaWQgfSBmcm9tICcuLi8uLi8uLi9saWIvZ3JpZCc7XG5pbXBvcnQgeyBSb3cgfSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zZXQvcm93JztcbmltcG9ydCB7IENlbGwgfSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zZXQvY2VsbCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1tuZzItc3QtdGhlYWQtZm9ybS1yb3ddJyxcbiAgdGVtcGxhdGU6IGBcbiAgICAgIDx0ZCAqbmdJZj1cIlwiPjwvdGQ+XG4gICAgICA8dGQgICpuZ0lmPVwic2hvd0FjdGlvbkNvbHVtbkxlZnRcIiAgY2xhc3M9XCJuZzItc21hcnQtYWN0aW9uc1wiPlxuICAgICAgICA8bmcyLXN0LWFjdGlvbnMgW2dyaWRdPVwiZ3JpZFwiIChjcmVhdGUpPVwib25DcmVhdGUoJGV2ZW50KVwiPjwvbmcyLXN0LWFjdGlvbnM+XG4gICAgICA8L3RkPlxuICAgICAgPHRkICpuZ0Zvcj1cImxldCBjZWxsIG9mIGdldFZpc2libGVDZWxscyhncmlkLmdldE5ld1JvdygpLmdldENlbGxzKCkpXCI+XG4gICAgICAgIDxuZzItc21hcnQtdGFibGUtY2VsbCBbY2VsbF09XCJjZWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtncmlkXT1cImdyaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lzTmV3XT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NyZWF0ZUNvbmZpcm1dPVwiY3JlYXRlQ29uZmlybVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaW5wdXRDbGFzc109XCJhZGRJbnB1dENsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpc0luRWRpdGluZ109XCJncmlkLmdldE5ld1JvdygpLmlzSW5FZGl0aW5nXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlZGl0ZWQpPVwib25DcmVhdGUoJGV2ZW50KVwiPlxuICAgICAgICA8L25nMi1zbWFydC10YWJsZS1jZWxsPlxuICAgICAgPC90ZD5cbiAgICAgIDx0ZCAgKm5nSWY9XCJzaG93QWN0aW9uQ29sdW1uUmlnaHRcIiAgY2xhc3M9XCJuZzItc21hcnQtYWN0aW9uc1wiPlxuICAgICAgICA8bmcyLXN0LWFjdGlvbnMgW2dyaWRdPVwiZ3JpZFwiIChjcmVhdGUpPVwib25DcmVhdGUoJGV2ZW50KVwiPjwvbmcyLXN0LWFjdGlvbnM+XG4gICAgICA8L3RkPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUaGVhZEZvcm1Sb3dDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGdyaWQ6IEdyaWQ7XG4gIEBJbnB1dCgpIHJvdzogUm93O1xuICBASW5wdXQoKSBjcmVhdGVDb25maXJtOiBFdmVudEVtaXR0ZXI8YW55PjtcblxuICBAT3V0cHV0KCkgY3JlYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgaXNNdWx0aVNlbGVjdFZpc2libGU6IGJvb2xlYW47XG4gIHNob3dBY3Rpb25Db2x1bW5MZWZ0OiBib29sZWFuO1xuICBzaG93QWN0aW9uQ29sdW1uUmlnaHQ6IGJvb2xlYW47XG4gIGFkZElucHV0Q2xhc3M6IHN0cmluZztcblxuICBvbkNyZWF0ZShldmVudDogYW55KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICB0aGlzLmdyaWQuY3JlYXRlKHRoaXMuZ3JpZC5nZXROZXdSb3coKSwgdGhpcy5jcmVhdGVDb25maXJtKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCl7XG4gICAgdGhpcy5pc011bHRpU2VsZWN0VmlzaWJsZSA9IHRoaXMuZ3JpZC5pc011bHRpU2VsZWN0VmlzaWJsZSgpO1xuICAgIHRoaXMuc2hvd0FjdGlvbkNvbHVtbkxlZnQgPSB0aGlzLmdyaWQuc2hvd0FjdGlvbkNvbHVtbignbGVmdCcpO1xuICAgIHRoaXMuc2hvd0FjdGlvbkNvbHVtblJpZ2h0ID0gdGhpcy5ncmlkLnNob3dBY3Rpb25Db2x1bW4oJ3JpZ2h0Jyk7XG4gICAgdGhpcy5hZGRJbnB1dENsYXNzID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ2FkZC5pbnB1dENsYXNzJyk7XG4gIH1cblxuICBnZXRWaXNpYmxlQ2VsbHMoY2VsbHM6IEFycmF5PENlbGw+KTogQXJyYXk8Q2VsbD4ge1xuICAgIHJldHVybiAoY2VsbHMgfHwgW10pLmZpbHRlcigoY2VsbDogQ2VsbCkgPT4gIWNlbGwuZ2V0Q29sdW1uKCkuaGlkZSk7XG4gIH1cbn1cbiJdfQ==