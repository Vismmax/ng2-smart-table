import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Grid } from '../../../lib/grid';
import { DataSource } from '../../../lib/data-source/data-source';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../cells/actions-title.component";
import * as i3 from "../cells/checkbox-select-all.component";
import * as i4 from "../cells/column-title.component";
export class TheadTitlesRowComponent {
    constructor() {
        this.sort = new EventEmitter();
        this.selectAllRows = new EventEmitter();
    }
    ngOnChanges() {
        this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
        this.showActionColumnLeft = this.grid.showActionColumn('left');
        this.showActionColumnRight = this.grid.showActionColumn('right');
    }
    getVisibleColumns(columns) {
        return (columns || []).filter((column) => !column.hide);
    }
}
TheadTitlesRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TheadTitlesRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TheadTitlesRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: TheadTitlesRowComponent, selector: "[ng2-st-thead-titles-row]", inputs: { grid: "grid", isAllSelected: "isAllSelected", source: "source" }, outputs: { sort: "sort", selectAllRows: "selectAllRows" }, usesOnChanges: true, ngImport: i0, template: `
    <th ng2-st-checkbox-select-all *ngIf="isMultiSelectVisible"
                                   [grid]="grid"
                                   [source]="source"
                                   [isAllSelected]="isAllSelected"
                                   (click)="selectAllRows.emit($event)">
    </th>
    <th ng2-st-actions-title *ngIf="showActionColumnLeft" [grid]="grid"></th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())"
        class="ng2-smart-th {{ column.id }}"
        [ngClass]="column.class"
        [style.width]="column.width">
      <ng2-st-column-title [source]="source" [column]="column" (sort)="sort.emit($event)"></ng2-st-column-title>
    </th>
    <th ng2-st-actions-title *ngIf="showActionColumnRight" [grid]="grid"></th>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.ActionsTitleComponent, selector: "[ng2-st-actions-title]", inputs: ["grid"] }, { kind: "component", type: i3.CheckboxSelectAllComponent, selector: "[ng2-st-checkbox-select-all]", inputs: ["grid", "source", "isAllSelected"] }, { kind: "component", type: i4.ColumnTitleComponent, selector: "ng2-st-column-title", inputs: ["column", "source"], outputs: ["sort"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TheadTitlesRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[ng2-st-thead-titles-row]',
                    template: `
    <th ng2-st-checkbox-select-all *ngIf="isMultiSelectVisible"
                                   [grid]="grid"
                                   [source]="source"
                                   [isAllSelected]="isAllSelected"
                                   (click)="selectAllRows.emit($event)">
    </th>
    <th ng2-st-actions-title *ngIf="showActionColumnLeft" [grid]="grid"></th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())"
        class="ng2-smart-th {{ column.id }}"
        [ngClass]="column.class"
        [style.width]="column.width">
      <ng2-st-column-title [source]="source" [column]="column" (sort)="sort.emit($event)"></ng2-st-column-title>
    </th>
    <th ng2-st-actions-title *ngIf="showActionColumnRight" [grid]="grid"></th>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], isAllSelected: [{
                type: Input
            }], source: [{
                type: Input
            }], sort: [{
                type: Output
            }], selectAllRows: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQtdGl0bGVzLXJvdy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3RoZWFkL3Jvd3MvdGhlYWQtdGl0bGVzLXJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUVoRixPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNDQUFzQyxDQUFDOzs7Ozs7QUFzQmxFLE1BQU0sT0FBTyx1QkFBdUI7SUFuQnBDO1FBeUJZLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQy9CLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztLQWdCbkQ7SUFUQyxXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM3RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBc0I7UUFDdEMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7O3FIQXRCVSx1QkFBdUI7eUdBQXZCLHVCQUF1Qiw2TkFqQnhCOzs7Ozs7Ozs7Ozs7Ozs7R0FlVDs0RkFFVSx1QkFBdUI7a0JBbkJuQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwyQkFBMkI7b0JBQ3JDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7O0dBZVQ7aUJBQ0Y7OEJBR1UsSUFBSTtzQkFBWixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUVJLElBQUk7c0JBQWIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25DaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgR3JpZCB9IGZyb20gJy4uLy4uLy4uL2xpYi9ncmlkJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zb3VyY2UvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgQ29sdW1uIH0gZnJvbSBcIi4uLy4uLy4uL2xpYi9kYXRhLXNldC9jb2x1bW5cIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW25nMi1zdC10aGVhZC10aXRsZXMtcm93XScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRoIG5nMi1zdC1jaGVja2JveC1zZWxlY3QtYWxsICpuZ0lmPVwiaXNNdWx0aVNlbGVjdFZpc2libGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZ3JpZF09XCJncmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3NvdXJjZV09XCJzb3VyY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaXNBbGxTZWxlY3RlZF09XCJpc0FsbFNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdEFsbFJvd3MuZW1pdCgkZXZlbnQpXCI+XG4gICAgPC90aD5cbiAgICA8dGggbmcyLXN0LWFjdGlvbnMtdGl0bGUgKm5nSWY9XCJzaG93QWN0aW9uQ29sdW1uTGVmdFwiIFtncmlkXT1cImdyaWRcIj48L3RoPlxuICAgIDx0aCAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGdldFZpc2libGVDb2x1bW5zKGdyaWQuZ2V0Q29sdW1ucygpKVwiXG4gICAgICAgIGNsYXNzPVwibmcyLXNtYXJ0LXRoIHt7IGNvbHVtbi5pZCB9fVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cImNvbHVtbi5jbGFzc1wiXG4gICAgICAgIFtzdHlsZS53aWR0aF09XCJjb2x1bW4ud2lkdGhcIj5cbiAgICAgIDxuZzItc3QtY29sdW1uLXRpdGxlIFtzb3VyY2VdPVwic291cmNlXCIgW2NvbHVtbl09XCJjb2x1bW5cIiAoc29ydCk9XCJzb3J0LmVtaXQoJGV2ZW50KVwiPjwvbmcyLXN0LWNvbHVtbi10aXRsZT5cbiAgICA8L3RoPlxuICAgIDx0aCBuZzItc3QtYWN0aW9ucy10aXRsZSAqbmdJZj1cInNob3dBY3Rpb25Db2x1bW5SaWdodFwiIFtncmlkXT1cImdyaWRcIj48L3RoPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUaGVhZFRpdGxlc1Jvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZ3JpZDogR3JpZDtcbiAgQElucHV0KCkgaXNBbGxTZWxlY3RlZDogYm9vbGVhbjtcbiAgQElucHV0KCkgc291cmNlOiBEYXRhU291cmNlO1xuXG4gIEBPdXRwdXQoKSBzb3J0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBzZWxlY3RBbGxSb3dzID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgaXNNdWx0aVNlbGVjdFZpc2libGU6IGJvb2xlYW47XG4gIHNob3dBY3Rpb25Db2x1bW5MZWZ0OiBib29sZWFuO1xuICBzaG93QWN0aW9uQ29sdW1uUmlnaHQ6IGJvb2xlYW47XG5cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLmlzTXVsdGlTZWxlY3RWaXNpYmxlID0gdGhpcy5ncmlkLmlzTXVsdGlTZWxlY3RWaXNpYmxlKCk7XG4gICAgdGhpcy5zaG93QWN0aW9uQ29sdW1uTGVmdCA9IHRoaXMuZ3JpZC5zaG93QWN0aW9uQ29sdW1uKCdsZWZ0Jyk7XG4gICAgdGhpcy5zaG93QWN0aW9uQ29sdW1uUmlnaHQgPSB0aGlzLmdyaWQuc2hvd0FjdGlvbkNvbHVtbigncmlnaHQnKTtcbiAgfVxuXG4gIGdldFZpc2libGVDb2x1bW5zKGNvbHVtbnM6IEFycmF5PENvbHVtbj4pOiBBcnJheTxDb2x1bW4+IHtcbiAgICByZXR1cm4gKGNvbHVtbnMgfHwgW10pLmZpbHRlcigoY29sdW1uOiBDb2x1bW4pID0+ICFjb2x1bW4uaGlkZSk7XG4gIH1cbn1cbiJdfQ==