import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../cells/actions-title.component";
import * as i2 from "../cells/column-title.component";
import * as i3 from "@angular/common";
import * as i4 from "@angular/forms";
import * as i5 from "../../../directives/resizer.directive";
export class TheadTitlesRowComponent {
    constructor() {
        this.hide = new EventEmitter();
        this.selectAllRows = new EventEmitter();
        this.multiSelectWidth = '3rem';
        this.isHideable = false;
    }
    ngOnChanges() {
        this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
        this.showActionColumnLeft = this.grid.showActionColumn('left');
        this.showActionColumnRight = this.grid.showActionColumn('right');
        this.isResizable = this.grid.getSetting('resizable');
        this.isHideable = this.grid.getSetting('hideable');
    }
    getVisibleColumns(columns) {
        return (columns || []).filter((column) => !column.hide);
    }
}
TheadTitlesRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadTitlesRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TheadTitlesRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TheadTitlesRowComponent, selector: "[angular2-st-thead-titles-row]", inputs: { grid: "grid", isAllSelected: "isAllSelected", source: "source" }, outputs: { hide: "hide", selectAllRows: "selectAllRows" }, usesOnChanges: true, ngImport: i0, template: `
    <th *ngIf="isMultiSelectVisible"
        [style.width]="multiSelectWidth"
    >
      <input type="checkbox" [ngModel]="isAllSelected" (click)="selectAllRows.emit()">
    </th>
    <th angular2-st-actions-title *ngIf="showActionColumnLeft" [grid]="grid"></th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())"
        class="angular2-smart-th {{ column.id }}"
        [ngClass]="column.classHeader ?? ''"
        [style.width]="column.width"
    >
      <angular2-st-column-title
        [source]="source"
        [column]="column"
        [isHideable]="isHideable"
        (hide)="hide.emit($event)"
      ></angular2-st-column-title>
      <div *ngIf="isResizable" angular2-resizer class="angular2-resizer-block"></div>
    </th>
    <th angular2-st-actions-title *ngIf="showActionColumnRight" [grid]="grid"></th>
  `, isInline: true, components: [{ type: i1.ActionsTitleComponent, selector: "[angular2-st-actions-title]", inputs: ["grid"] }, { type: i2.ColumnTitleComponent, selector: "angular2-st-column-title", inputs: ["column", "source", "isHideable"], outputs: ["hide"] }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgxResizerDirective, selector: "[angular2-resizer]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadTitlesRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[angular2-st-thead-titles-row]',
                    template: `
    <th *ngIf="isMultiSelectVisible"
        [style.width]="multiSelectWidth"
    >
      <input type="checkbox" [ngModel]="isAllSelected" (click)="selectAllRows.emit()">
    </th>
    <th angular2-st-actions-title *ngIf="showActionColumnLeft" [grid]="grid"></th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())"
        class="angular2-smart-th {{ column.id }}"
        [ngClass]="column.classHeader ?? ''"
        [style.width]="column.width"
    >
      <angular2-st-column-title
        [source]="source"
        [column]="column"
        [isHideable]="isHideable"
        (hide)="hide.emit($event)"
      ></angular2-st-column-title>
      <div *ngIf="isResizable" angular2-resizer class="angular2-resizer-block"></div>
    </th>
    <th angular2-st-actions-title *ngIf="showActionColumnRight" [grid]="grid"></th>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], isAllSelected: [{
                type: Input
            }], source: [{
                type: Input
            }], hide: [{
                type: Output
            }], selectAllRows: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQtdGl0bGVzLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvdGhlYWQvcm93cy90aGVhZC10aXRsZXMtcm93LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7Ozs7O0FBK0JoRixNQUFNLE9BQU8sdUJBQXVCO0lBekJwQztRQStCWSxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMvQixrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFFbkQscUJBQWdCLEdBQVcsTUFBTSxDQUFDO1FBS2xDLGVBQVUsR0FBWSxLQUFLLENBQUM7S0FjN0I7SUFYQyxXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM3RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELGlCQUFpQixDQUFDLE9BQXNCO1FBQ3RDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDOztxSEEzQlUsdUJBQXVCO3lHQUF2Qix1QkFBdUIsa09BdkJ4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJUOzRGQUVVLHVCQUF1QjtrQkF6Qm5DLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLGdDQUFnQztvQkFDMUMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQlQ7aUJBQ0Y7OEJBR1UsSUFBSTtzQkFBWixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUVJLElBQUk7c0JBQWIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtHcmlkfSBmcm9tICcuLi8uLi8uLi9saWIvZ3JpZCc7XG5pbXBvcnQge0RhdGFTb3VyY2V9IGZyb20gJy4uLy4uLy4uL2xpYi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQge0NvbHVtbn0gZnJvbSBcIi4uLy4uLy4uL2xpYi9kYXRhLXNldC9jb2x1bW5cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW2FuZ3VsYXIyLXN0LXRoZWFkLXRpdGxlcy1yb3ddJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8dGggKm5nSWY9XCJpc011bHRpU2VsZWN0VmlzaWJsZVwiXG4gICAgICAgIFtzdHlsZS53aWR0aF09XCJtdWx0aVNlbGVjdFdpZHRoXCJcbiAgICA+XG4gICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgW25nTW9kZWxdPVwiaXNBbGxTZWxlY3RlZFwiIChjbGljayk9XCJzZWxlY3RBbGxSb3dzLmVtaXQoKVwiPlxuICAgIDwvdGg+XG4gICAgPHRoIGFuZ3VsYXIyLXN0LWFjdGlvbnMtdGl0bGUgKm5nSWY9XCJzaG93QWN0aW9uQ29sdW1uTGVmdFwiIFtncmlkXT1cImdyaWRcIj48L3RoPlxuICAgIDx0aCAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGdldFZpc2libGVDb2x1bW5zKGdyaWQuZ2V0Q29sdW1ucygpKVwiXG4gICAgICAgIGNsYXNzPVwiYW5ndWxhcjItc21hcnQtdGgge3sgY29sdW1uLmlkIH19XCJcbiAgICAgICAgW25nQ2xhc3NdPVwiY29sdW1uLmNsYXNzSGVhZGVyID8/ICcnXCJcbiAgICAgICAgW3N0eWxlLndpZHRoXT1cImNvbHVtbi53aWR0aFwiXG4gICAgPlxuICAgICAgPGFuZ3VsYXIyLXN0LWNvbHVtbi10aXRsZVxuICAgICAgICBbc291cmNlXT1cInNvdXJjZVwiXG4gICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgW2lzSGlkZWFibGVdPVwiaXNIaWRlYWJsZVwiXG4gICAgICAgIChoaWRlKT1cImhpZGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgID48L2FuZ3VsYXIyLXN0LWNvbHVtbi10aXRsZT5cbiAgICAgIDxkaXYgKm5nSWY9XCJpc1Jlc2l6YWJsZVwiIGFuZ3VsYXIyLXJlc2l6ZXIgY2xhc3M9XCJhbmd1bGFyMi1yZXNpemVyLWJsb2NrXCI+PC9kaXY+XG4gICAgPC90aD5cbiAgICA8dGggYW5ndWxhcjItc3QtYWN0aW9ucy10aXRsZSAqbmdJZj1cInNob3dBY3Rpb25Db2x1bW5SaWdodFwiIFtncmlkXT1cImdyaWRcIj48L3RoPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUaGVhZFRpdGxlc1Jvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZ3JpZCE6IEdyaWQ7XG4gIEBJbnB1dCgpIGlzQWxsU2VsZWN0ZWQhOiBib29sZWFuO1xuICBASW5wdXQoKSBzb3VyY2UhOiBEYXRhU291cmNlO1xuXG4gIEBPdXRwdXQoKSBoaWRlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RBbGxSb3dzID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIG11bHRpU2VsZWN0V2lkdGg6IHN0cmluZyA9ICczcmVtJztcbiAgaXNNdWx0aVNlbGVjdFZpc2libGUhOiBib29sZWFuO1xuICBzaG93QWN0aW9uQ29sdW1uTGVmdCE6IGJvb2xlYW47XG4gIHNob3dBY3Rpb25Db2x1bW5SaWdodCE6IGJvb2xlYW47XG4gIGlzUmVzaXphYmxlITogYm9vbGVhbjtcbiAgaXNIaWRlYWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5pc011bHRpU2VsZWN0VmlzaWJsZSA9IHRoaXMuZ3JpZC5pc011bHRpU2VsZWN0VmlzaWJsZSgpO1xuICAgIHRoaXMuc2hvd0FjdGlvbkNvbHVtbkxlZnQgPSB0aGlzLmdyaWQuc2hvd0FjdGlvbkNvbHVtbignbGVmdCcpO1xuICAgIHRoaXMuc2hvd0FjdGlvbkNvbHVtblJpZ2h0ID0gdGhpcy5ncmlkLnNob3dBY3Rpb25Db2x1bW4oJ3JpZ2h0Jyk7XG4gICAgdGhpcy5pc1Jlc2l6YWJsZSA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdyZXNpemFibGUnKTtcbiAgICB0aGlzLmlzSGlkZWFibGUgPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygnaGlkZWFibGUnKTtcbiAgfVxuXG4gIGdldFZpc2libGVDb2x1bW5zKGNvbHVtbnM6IEFycmF5PENvbHVtbj4pOiBBcnJheTxDb2x1bW4+IHtcbiAgICByZXR1cm4gKGNvbHVtbnMgfHwgW10pLmZpbHRlcigoY29sdW1uOiBDb2x1bW4pID0+ICFjb2x1bW4uaGlkZSk7XG4gIH1cbn1cbiJdfQ==