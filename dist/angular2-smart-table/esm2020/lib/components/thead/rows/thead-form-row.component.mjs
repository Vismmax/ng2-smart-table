import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../cells/create-cancel.component";
import * as i2 from "../../cell/cell.component";
import * as i3 from "@angular/common";
export class TheadFormRowComponent {
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
TheadFormRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadFormRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TheadFormRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TheadFormRowComponent, selector: "[angular2-st-thead-form-row]", inputs: { grid: "grid", row: "row", createConfirm: "createConfirm", createCancel: "createCancel" }, usesOnChanges: true, ngImport: i0, template: `
    <td *ngIf="isMultiSelectVisible"></td>
    <td *ngIf="showActionColumnLeft" class="angular2-smart-actions">
      <angular2-st-actions [grid]="grid" [createConfirm]="createConfirm" [createCancel]="createCancel"></angular2-st-actions>
    </td>
    <td *ngFor="let cell of getVisibleCells(grid.getNewRow().getCells())">
      <angular2-smart-table-cell
        [cell]="cell"
        [grid]="grid"
        [isNew]="true"
        [createConfirm]="createConfirm"
        [createCancel]="createCancel"
        [inputClass]="addInputClass"
        [isInEditing]="grid.getNewRow().isInEditing"
      ></angular2-smart-table-cell>
    </td>
    <td *ngIf="showActionColumnRight" class="angular2-smart-actions">
      <angular2-st-actions [grid]="grid" [createConfirm]="createConfirm" [createCancel]="createCancel"></angular2-st-actions>
    </td>
  `, isInline: true, components: [{ type: i1.TheadCreateCancelComponent, selector: "angular2-st-actions", inputs: ["grid", "createConfirm", "createCancel"] }, { type: i2.CellComponent, selector: "angular2-smart-table-cell", inputs: ["grid", "row", "cell", "inputClass", "mode", "isInEditing", "isNew", "editConfirm", "editCancel", "createConfirm", "createCancel"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadFormRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[angular2-st-thead-form-row]',
                    template: `
    <td *ngIf="isMultiSelectVisible"></td>
    <td *ngIf="showActionColumnLeft" class="angular2-smart-actions">
      <angular2-st-actions [grid]="grid" [createConfirm]="createConfirm" [createCancel]="createCancel"></angular2-st-actions>
    </td>
    <td *ngFor="let cell of getVisibleCells(grid.getNewRow().getCells())">
      <angular2-smart-table-cell
        [cell]="cell"
        [grid]="grid"
        [isNew]="true"
        [createConfirm]="createConfirm"
        [createCancel]="createCancel"
        [inputClass]="addInputClass"
        [isInEditing]="grid.getNewRow().isInEditing"
      ></angular2-smart-table-cell>
    </td>
    <td *ngIf="showActionColumnRight" class="angular2-smart-actions">
      <angular2-st-actions [grid]="grid" [createConfirm]="createConfirm" [createCancel]="createCancel"></angular2-st-actions>
    </td>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], createConfirm: [{
                type: Input
            }], createCancel: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQtZm9ybS1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3RoZWFkL3Jvd3MvdGhlYWQtZm9ybS1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQWdCLEtBQUssRUFBWSxNQUFNLGVBQWUsQ0FBQzs7Ozs7QUE4QnhFLE1BQU0sT0FBTyxxQkFBcUI7SUFZaEMsV0FBVztRQUNULElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDN0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxlQUFlLENBQUMsS0FBa0I7UUFDaEMsT0FBTyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7O21IQXJCVSxxQkFBcUI7dUdBQXJCLHFCQUFxQiw2TEFyQnRCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJUOzRGQUVVLHFCQUFxQjtrQkF2QmpDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDhCQUE4QjtvQkFDeEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJUO2lCQUNGOzhCQUdVLElBQUk7c0JBQVosS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlc30gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7R3JpZH0gZnJvbSAnLi4vLi4vLi4vbGliL2dyaWQnO1xuaW1wb3J0IHtSb3d9IGZyb20gJy4uLy4uLy4uL2xpYi9kYXRhLXNldC9yb3cnO1xuaW1wb3J0IHtDZWxsfSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zZXQvY2VsbCc7XG5pbXBvcnQge0NyZWF0ZUNhbmNlbEV2ZW50LCBDcmVhdGVDb25maXJtRXZlbnR9IGZyb20gJy4uLy4uLy4uL2xpYi9ldmVudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdbYW5ndWxhcjItc3QtdGhlYWQtZm9ybS1yb3ddJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dGQgKm5nSWY9XCJpc011bHRpU2VsZWN0VmlzaWJsZVwiPjwvdGQ+XG4gICAgPHRkICpuZ0lmPVwic2hvd0FjdGlvbkNvbHVtbkxlZnRcIiBjbGFzcz1cImFuZ3VsYXIyLXNtYXJ0LWFjdGlvbnNcIj5cbiAgICAgIDxhbmd1bGFyMi1zdC1hY3Rpb25zIFtncmlkXT1cImdyaWRcIiBbY3JlYXRlQ29uZmlybV09XCJjcmVhdGVDb25maXJtXCIgW2NyZWF0ZUNhbmNlbF09XCJjcmVhdGVDYW5jZWxcIj48L2FuZ3VsYXIyLXN0LWFjdGlvbnM+XG4gICAgPC90ZD5cbiAgICA8dGQgKm5nRm9yPVwibGV0IGNlbGwgb2YgZ2V0VmlzaWJsZUNlbGxzKGdyaWQuZ2V0TmV3Um93KCkuZ2V0Q2VsbHMoKSlcIj5cbiAgICAgIDxhbmd1bGFyMi1zbWFydC10YWJsZS1jZWxsXG4gICAgICAgIFtjZWxsXT1cImNlbGxcIlxuICAgICAgICBbZ3JpZF09XCJncmlkXCJcbiAgICAgICAgW2lzTmV3XT1cInRydWVcIlxuICAgICAgICBbY3JlYXRlQ29uZmlybV09XCJjcmVhdGVDb25maXJtXCJcbiAgICAgICAgW2NyZWF0ZUNhbmNlbF09XCJjcmVhdGVDYW5jZWxcIlxuICAgICAgICBbaW5wdXRDbGFzc109XCJhZGRJbnB1dENsYXNzXCJcbiAgICAgICAgW2lzSW5FZGl0aW5nXT1cImdyaWQuZ2V0TmV3Um93KCkuaXNJbkVkaXRpbmdcIlxuICAgICAgPjwvYW5ndWxhcjItc21hcnQtdGFibGUtY2VsbD5cbiAgICA8L3RkPlxuICAgIDx0ZCAqbmdJZj1cInNob3dBY3Rpb25Db2x1bW5SaWdodFwiIGNsYXNzPVwiYW5ndWxhcjItc21hcnQtYWN0aW9uc1wiPlxuICAgICAgPGFuZ3VsYXIyLXN0LWFjdGlvbnMgW2dyaWRdPVwiZ3JpZFwiIFtjcmVhdGVDb25maXJtXT1cImNyZWF0ZUNvbmZpcm1cIiBbY3JlYXRlQ2FuY2VsXT1cImNyZWF0ZUNhbmNlbFwiPjwvYW5ndWxhcjItc3QtYWN0aW9ucz5cbiAgICA8L3RkPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUaGVhZEZvcm1Sb3dDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xuXG4gIEBJbnB1dCgpIGdyaWQhOiBHcmlkO1xuICBASW5wdXQoKSByb3chOiBSb3c7XG4gIEBJbnB1dCgpIGNyZWF0ZUNvbmZpcm0hOiBFdmVudEVtaXR0ZXI8Q3JlYXRlQ29uZmlybUV2ZW50PjtcbiAgQElucHV0KCkgY3JlYXRlQ2FuY2VsITogRXZlbnRFbWl0dGVyPENyZWF0ZUNhbmNlbEV2ZW50PjtcblxuICBpc011bHRpU2VsZWN0VmlzaWJsZSE6IGJvb2xlYW47XG4gIHNob3dBY3Rpb25Db2x1bW5MZWZ0ITogYm9vbGVhbjtcbiAgc2hvd0FjdGlvbkNvbHVtblJpZ2h0ITogYm9vbGVhbjtcbiAgYWRkSW5wdXRDbGFzcyE6IHN0cmluZztcblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmlzTXVsdGlTZWxlY3RWaXNpYmxlID0gdGhpcy5ncmlkLmlzTXVsdGlTZWxlY3RWaXNpYmxlKCk7XG4gICAgdGhpcy5zaG93QWN0aW9uQ29sdW1uTGVmdCA9IHRoaXMuZ3JpZC5zaG93QWN0aW9uQ29sdW1uKCdsZWZ0Jyk7XG4gICAgdGhpcy5zaG93QWN0aW9uQ29sdW1uUmlnaHQgPSB0aGlzLmdyaWQuc2hvd0FjdGlvbkNvbHVtbigncmlnaHQnKTtcbiAgICB0aGlzLmFkZElucHV0Q2xhc3MgPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygnYWRkLmlucHV0Q2xhc3MnKTtcbiAgfVxuXG4gIGdldFZpc2libGVDZWxscyhjZWxsczogQXJyYXk8Q2VsbD4pOiBBcnJheTxDZWxsPiB7XG4gICAgcmV0dXJuIChjZWxscyB8fCBbXSkuZmlsdGVyKChjZWxsOiBDZWxsKSA9PiAhY2VsbC5nZXRDb2x1bW4oKS5oaWRlKTtcbiAgfVxufVxuIl19