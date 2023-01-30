import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../cells/add-button.component";
import * as i2 from "../../filter/filter.component";
import * as i3 from "@angular/common";
export class TheadFitlersRowComponent {
    constructor() {
        this.create = new EventEmitter();
    }
    ngOnChanges() {
        this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
        this.showActionColumnLeft = this.grid.showActionColumn('left');
        this.showActionColumnRight = this.grid.showActionColumn('right');
        this.filterInputClass = this.grid.getSetting('filter.inputClass');
    }
    getVisibleColumns(columns) {
        return (columns || []).filter((column) => !column.hide);
    }
}
TheadFitlersRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadFitlersRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TheadFitlersRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TheadFitlersRowComponent, selector: "[angular2-st-thead-filters-row]", inputs: { grid: "grid", source: "source" }, outputs: { create: "create" }, usesOnChanges: true, ngImport: i0, template: `
    <th *ngIf="isMultiSelectVisible"></th>
    <th angular2-st-add-button *ngIf="showActionColumnLeft"
                          [grid]="grid"
                          (create)="create.emit($event)">
    </th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())" class="angular2-smart-th {{ column.id }}">
      <angular2-smart-table-filter [source]="source"
                              [column]="column"
                              [inputClass]="filterInputClass"
      ></angular2-smart-table-filter>
    </th>
    <th angular2-st-add-button *ngIf="showActionColumnRight"
                          [grid]="grid"
                          [source]="source"
                          (create)="create.emit($event)">
    </th>
  `, isInline: true, components: [{ type: i1.AddButtonComponent, selector: "[angular2-st-add-button]", inputs: ["grid", "source"], outputs: ["create"] }, { type: i2.FilterComponent, selector: "angular2-smart-table-filter" }], directives: [{ type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadFitlersRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[angular2-st-thead-filters-row]',
                    template: `
    <th *ngIf="isMultiSelectVisible"></th>
    <th angular2-st-add-button *ngIf="showActionColumnLeft"
                          [grid]="grid"
                          (create)="create.emit($event)">
    </th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())" class="angular2-smart-th {{ column.id }}">
      <angular2-smart-table-filter [source]="source"
                              [column]="column"
                              [inputClass]="filterInputClass"
      ></angular2-smart-table-filter>
    </th>
    <th angular2-st-add-button *ngIf="showActionColumnRight"
                          [grid]="grid"
                          [source]="source"
                          (create)="create.emit($event)">
    </th>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], source: [{
                type: Input
            }], create: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQtZmlsdGVycy1yb3cuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3RoZWFkL3Jvd3MvdGhlYWQtZmlsdGVycy1yb3cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7O0FBNEJoRixNQUFNLE9BQU8sd0JBQXdCO0lBckJyQztRQTBCWSxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQztLQWlCcEQ7SUFWQyxXQUFXO1FBQ1QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUM3RCxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsaUJBQWlCLENBQUMsT0FBc0I7UUFDdEMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7O3NIQXJCVSx3QkFBd0I7MEdBQXhCLHdCQUF3Qix1S0FuQnpCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCVDs0RkFFVSx3QkFBd0I7a0JBckJwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQ0FBaUM7b0JBQzNDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQlQ7aUJBQ0Y7OEJBR1UsSUFBSTtzQkFBWixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWR9IGZyb20gJy4uLy4uLy4uL2xpYi9ncmlkJztcbmltcG9ydCB7RGF0YVNvdXJjZX0gZnJvbSAnLi4vLi4vLi4vbGliL2RhdGEtc291cmNlL2RhdGEtc291cmNlJztcbmltcG9ydCB7Q29sdW1ufSBmcm9tIFwiLi4vLi4vLi4vbGliL2RhdGEtc2V0L2NvbHVtblwiO1xuaW1wb3J0IHtDcmVhdGVFdmVudH0gZnJvbSAnLi4vLi4vLi4vbGliL2V2ZW50cyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ1thbmd1bGFyMi1zdC10aGVhZC1maWx0ZXJzLXJvd10nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx0aCAqbmdJZj1cImlzTXVsdGlTZWxlY3RWaXNpYmxlXCI+PC90aD5cbiAgICA8dGggYW5ndWxhcjItc3QtYWRkLWJ1dHRvbiAqbmdJZj1cInNob3dBY3Rpb25Db2x1bW5MZWZ0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW2dyaWRdPVwiZ3JpZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjcmVhdGUpPVwiY3JlYXRlLmVtaXQoJGV2ZW50KVwiPlxuICAgIDwvdGg+XG4gICAgPHRoICpuZ0Zvcj1cImxldCBjb2x1bW4gb2YgZ2V0VmlzaWJsZUNvbHVtbnMoZ3JpZC5nZXRDb2x1bW5zKCkpXCIgY2xhc3M9XCJhbmd1bGFyMi1zbWFydC10aCB7eyBjb2x1bW4uaWQgfX1cIj5cbiAgICAgIDxhbmd1bGFyMi1zbWFydC10YWJsZS1maWx0ZXIgW3NvdXJjZV09XCJzb3VyY2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2lucHV0Q2xhc3NdPVwiZmlsdGVySW5wdXRDbGFzc1wiXG4gICAgICA+PC9hbmd1bGFyMi1zbWFydC10YWJsZS1maWx0ZXI+XG4gICAgPC90aD5cbiAgICA8dGggYW5ndWxhcjItc3QtYWRkLWJ1dHRvbiAqbmdJZj1cInNob3dBY3Rpb25Db2x1bW5SaWdodFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtncmlkXT1cImdyaWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBbc291cmNlXT1cInNvdXJjZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIChjcmVhdGUpPVwiY3JlYXRlLmVtaXQoJGV2ZW50KVwiPlxuICAgIDwvdGg+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFRoZWFkRml0bGVyc1Jvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZ3JpZCE6IEdyaWQ7XG4gIEBJbnB1dCgpIHNvdXJjZSE6IERhdGFTb3VyY2U7XG5cbiAgQE91dHB1dCgpIGNyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8Q3JlYXRlRXZlbnQ+KCk7XG5cbiAgaXNNdWx0aVNlbGVjdFZpc2libGUhOiBib29sZWFuO1xuICBzaG93QWN0aW9uQ29sdW1uTGVmdCE6IGJvb2xlYW47XG4gIHNob3dBY3Rpb25Db2x1bW5SaWdodCE6IGJvb2xlYW47XG4gIGZpbHRlcklucHV0Q2xhc3MhOiBzdHJpbmc7XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5pc011bHRpU2VsZWN0VmlzaWJsZSA9IHRoaXMuZ3JpZC5pc011bHRpU2VsZWN0VmlzaWJsZSgpO1xuICAgIHRoaXMuc2hvd0FjdGlvbkNvbHVtbkxlZnQgPSB0aGlzLmdyaWQuc2hvd0FjdGlvbkNvbHVtbignbGVmdCcpO1xuICAgIHRoaXMuc2hvd0FjdGlvbkNvbHVtblJpZ2h0ID0gdGhpcy5ncmlkLnNob3dBY3Rpb25Db2x1bW4oJ3JpZ2h0Jyk7XG4gICAgdGhpcy5maWx0ZXJJbnB1dENsYXNzID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ2ZpbHRlci5pbnB1dENsYXNzJyk7XG4gIH1cblxuICBnZXRWaXNpYmxlQ29sdW1ucyhjb2x1bW5zOiBBcnJheTxDb2x1bW4+KTogQXJyYXk8Q29sdW1uPiB7XG4gICAgcmV0dXJuIChjb2x1bW5zIHx8IFtdKS5maWx0ZXIoKGNvbHVtbjogQ29sdW1uKSA9PiAhY29sdW1uLmhpZGUpO1xuICB9XG59XG4iXX0=