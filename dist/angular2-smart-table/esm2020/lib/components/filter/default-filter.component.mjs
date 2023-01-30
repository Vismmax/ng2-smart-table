import { Component, Input } from '@angular/core';
import { FilterDefault } from "./filter-default";
import * as i0 from "@angular/core";
import * as i1 from "./filter-types/select-filter.component";
import * as i2 from "./filter-types/checkbox-filter.component";
import * as i3 from "./filter-types/completer-filter.component";
import * as i4 from "./filter-types/date-filter.component";
import * as i5 from "./filter-types/mselect-filter.component";
import * as i6 from "./filter-types/input-filter.component";
import * as i7 from "@angular/common";
export class DefaultFilterComponent extends FilterDefault {
}
DefaultFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultFilterComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
DefaultFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: DefaultFilterComponent, selector: "default-table-filter", inputs: { query: "query" }, usesInheritance: true, ngImport: i0, template: `
    <ng-container [ngSwitch]="column.getFilterType()">
      <select-filter *ngSwitchCase="'list'"
                     [query]="query"
                     [ngClass]="inputClass"
                     [column]="column"
                     (filter)="onFilter($event)">
      </select-filter>
      <checkbox-filter *ngSwitchCase="'checkbox'"
                       [query]="query"
                       [ngClass]="inputClass"
                       [column]="column"
                       (filter)="onFilter($event)">
      </checkbox-filter>
      <completer-filter *ngSwitchCase="'completer'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </completer-filter>
      <date-filter *ngSwitchCase="'date'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </date-filter>
      <mselect-filter *ngSwitchCase="'multiple'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </mselect-filter>
      <input-filter *ngSwitchDefault
                    [query]="query"
                    [ngClass]="inputClass"
                    [column]="column"
                    (filter)="onFilter($event)">
      </input-filter>
    </ng-container>
  `, isInline: true, components: [{ type: i1.SelectFilterComponent, selector: "select-filter" }, { type: i2.CheckboxFilterComponent, selector: "checkbox-filter" }, { type: i3.CompleterFilterComponent, selector: "completer-filter" }, { type: i4.DateFilterComponent, selector: "date-filter" }, { type: i5.MselectFilterComponent, selector: "mselect-filter" }, { type: i6.InputFilterComponent, selector: "input-filter" }], directives: [{ type: i7.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i7.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i7.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i7.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'default-table-filter',
                    template: `
    <ng-container [ngSwitch]="column.getFilterType()">
      <select-filter *ngSwitchCase="'list'"
                     [query]="query"
                     [ngClass]="inputClass"
                     [column]="column"
                     (filter)="onFilter($event)">
      </select-filter>
      <checkbox-filter *ngSwitchCase="'checkbox'"
                       [query]="query"
                       [ngClass]="inputClass"
                       [column]="column"
                       (filter)="onFilter($event)">
      </checkbox-filter>
      <completer-filter *ngSwitchCase="'completer'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </completer-filter>
      <date-filter *ngSwitchCase="'date'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </date-filter>
      <mselect-filter *ngSwitchCase="'multiple'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </mselect-filter>
      <input-filter *ngSwitchDefault
                    [query]="query"
                    [ngClass]="inputClass"
                    [column]="column"
                    (filter)="onFilter($event)">
      </input-filter>
    </ng-container>
  `,
                }]
        }], propDecorators: { query: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2ZpbHRlci9kZWZhdWx0LWZpbHRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7Ozs7QUE2Qy9DLE1BQU0sT0FBTyxzQkFBdUIsU0FBUSxhQUFhOztvSEFBNUMsc0JBQXNCO3dHQUF0QixzQkFBc0IsK0dBekN2Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUNUOzRGQUVVLHNCQUFzQjtrQkEzQ2xDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q1Q7aUJBQ0Y7OEJBRVUsS0FBSztzQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtGaWx0ZXJEZWZhdWx0fSBmcm9tIFwiLi9maWx0ZXItZGVmYXVsdFwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdkZWZhdWx0LXRhYmxlLWZpbHRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nLWNvbnRhaW5lciBbbmdTd2l0Y2hdPVwiY29sdW1uLmdldEZpbHRlclR5cGUoKVwiPlxuICAgICAgPHNlbGVjdC1maWx0ZXIgKm5nU3dpdGNoQ2FzZT1cIidsaXN0J1wiXG4gICAgICAgICAgICAgICAgICAgICBbcXVlcnldPVwicXVlcnlcIlxuICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiaW5wdXRDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICBbY29sdW1uXT1cImNvbHVtblwiXG4gICAgICAgICAgICAgICAgICAgICAoZmlsdGVyKT1cIm9uRmlsdGVyKCRldmVudClcIj5cbiAgICAgIDwvc2VsZWN0LWZpbHRlcj5cbiAgICAgIDxjaGVja2JveC1maWx0ZXIgKm5nU3dpdGNoQ2FzZT1cIidjaGVja2JveCdcIlxuICAgICAgICAgICAgICAgICAgICAgICBbcXVlcnldPVwicXVlcnlcIlxuICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJpbnB1dENsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAoZmlsdGVyKT1cIm9uRmlsdGVyKCRldmVudClcIj5cbiAgICAgIDwvY2hlY2tib3gtZmlsdGVyPlxuICAgICAgPGNvbXBsZXRlci1maWx0ZXIgKm5nU3dpdGNoQ2FzZT1cIidjb21wbGV0ZXInXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtxdWVyeV09XCJxdWVyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJpbnB1dENsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChmaWx0ZXIpPVwib25GaWx0ZXIoJGV2ZW50KVwiPlxuICAgICAgPC9jb21wbGV0ZXItZmlsdGVyPlxuICAgICAgPGRhdGUtZmlsdGVyICpuZ1N3aXRjaENhc2U9XCInZGF0ZSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW3F1ZXJ5XT1cInF1ZXJ5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cImlucHV0Q2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKGZpbHRlcik9XCJvbkZpbHRlcigkZXZlbnQpXCI+XG4gICAgICA8L2RhdGUtZmlsdGVyPlxuICAgICAgPG1zZWxlY3QtZmlsdGVyICpuZ1N3aXRjaENhc2U9XCInbXVsdGlwbGUnXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtxdWVyeV09XCJxdWVyeVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJpbnB1dENsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtjb2x1bW5dPVwiY29sdW1uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChmaWx0ZXIpPVwib25GaWx0ZXIoJGV2ZW50KVwiPlxuICAgICAgPC9tc2VsZWN0LWZpbHRlcj5cbiAgICAgIDxpbnB1dC1maWx0ZXIgKm5nU3dpdGNoRGVmYXVsdFxuICAgICAgICAgICAgICAgICAgICBbcXVlcnldPVwicXVlcnlcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJpbnB1dENsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAgW2NvbHVtbl09XCJjb2x1bW5cIlxuICAgICAgICAgICAgICAgICAgICAoZmlsdGVyKT1cIm9uRmlsdGVyKCRldmVudClcIj5cbiAgICAgIDwvaW5wdXQtZmlsdGVyPlxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBEZWZhdWx0RmlsdGVyQ29tcG9uZW50IGV4dGVuZHMgRmlsdGVyRGVmYXVsdCB7XG4gIEBJbnB1dCgpIHF1ZXJ5ITogc3RyaW5nO1xufVxuIl19