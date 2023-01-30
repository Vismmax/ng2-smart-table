import { Component, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs/operators';
import { DefaultFilter } from './default-filter';
import { defaultStringEqualsFilter, defaultStringInclusionFilter } from "../../../lib/data-source/local/local.filter";
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
export class SelectFilterComponent extends DefaultFilter {
    ngOnInit() {
        this.column.filterFunction = this.onFilterValues.bind(this);
        const exist = this.inputControl.valueChanges;
        if (!exist) {
            return;
        }
        exist
            .pipe(skip(1), distinctUntilChanged(), debounceTime(this.delay))
            .subscribe((value) => this.setFilter());
    }
    onFilterValues(cellValue, search, data, cellName) {
        const strictFilter = this.column.getFilterConfig()?.strict ?? false;
        if (strictFilter) {
            return defaultStringEqualsFilter(cellValue, search, data, cellName);
        }
        else {
            return defaultStringInclusionFilter(cellValue, search, data, cellName);
        }
    }
}
SelectFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: SelectFilterComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
SelectFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: SelectFilterComponent, selector: "select-filter", viewQueries: [{ propertyName: "inputControl", first: true, predicate: ["inputControl"], descendants: true, read: NgControl, static: true }], usesInheritance: true, ngImport: i0, template: `
    <select [ngClass]="inputClass"
            class="form-control"
            #inputControl
            [(ngModel)]="query">

        <option value="">{{ column.getFilterConfig().selectText }}</option>
        <option *ngFor="let option of column.getFilterConfig().list" [value]="option.value">
          {{ option.title }}
        </option>
    </select>
  `, isInline: true, directives: [{ type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: SelectFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'select-filter',
                    template: `
    <select [ngClass]="inputClass"
            class="form-control"
            #inputControl
            [(ngModel)]="query">

        <option value="">{{ column.getFilterConfig().selectText }}</option>
        <option *ngFor="let option of column.getFilterConfig().list" [value]="option.value">
          {{ option.title }}
        </option>
    </select>
  `,
                }]
        }], propDecorators: { inputControl: [{
                type: ViewChild,
                args: ['inputControl', { read: NgControl, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvZmlsdGVyL2ZpbHRlci10eXBlcy9zZWxlY3QtZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFVLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUMzRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDL0MsT0FBTyxFQUFDLHlCQUF5QixFQUFFLDRCQUE0QixFQUFDLE1BQU0sNkNBQTZDLENBQUM7Ozs7QUFpQnBILE1BQU0sT0FBTyxxQkFBc0IsU0FBUSxhQUFhO0lBSXRELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1RCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQztRQUM3QyxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ1YsT0FBTztTQUNSO1FBQ0QsS0FBSzthQUNGLElBQUksQ0FDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1Asb0JBQW9CLEVBQUUsRUFDdEIsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDekI7YUFDQSxTQUFTLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxjQUFjLENBQUMsU0FBaUIsRUFBRSxNQUFjLEVBQUUsSUFBUyxFQUFFLFFBQWdCO1FBQzNFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLEVBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQztRQUNwRSxJQUFJLFlBQVksRUFBRTtZQUNoQixPQUFPLHlCQUF5QixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3JFO2FBQU07WUFDTCxPQUFPLDRCQUE0QixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQzs7bUhBM0JVLHFCQUFxQjt1R0FBckIscUJBQXFCLDhJQUVHLFNBQVMsa0VBZmxDOzs7Ozs7Ozs7OztHQVdUOzRGQUVVLHFCQUFxQjtrQkFmakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFOzs7Ozs7Ozs7OztHQVdUO2lCQUNGOzhCQUcrRCxZQUFZO3NCQUF6RSxTQUFTO3VCQUFDLGNBQWMsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge05nQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBza2lwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7RGVmYXVsdEZpbHRlcn0gZnJvbSAnLi9kZWZhdWx0LWZpbHRlcic7XG5pbXBvcnQge2RlZmF1bHRTdHJpbmdFcXVhbHNGaWx0ZXIsIGRlZmF1bHRTdHJpbmdJbmNsdXNpb25GaWx0ZXJ9IGZyb20gXCIuLi8uLi8uLi9saWIvZGF0YS1zb3VyY2UvbG9jYWwvbG9jYWwuZmlsdGVyXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3NlbGVjdC1maWx0ZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWxlY3QgW25nQ2xhc3NdPVwiaW5wdXRDbGFzc1wiXG4gICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgICAjaW5wdXRDb250cm9sXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cInF1ZXJ5XCI+XG5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt7IGNvbHVtbi5nZXRGaWx0ZXJDb25maWcoKS5zZWxlY3RUZXh0IH19PC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gKm5nRm9yPVwibGV0IG9wdGlvbiBvZiBjb2x1bW4uZ2V0RmlsdGVyQ29uZmlnKCkubGlzdFwiIFt2YWx1ZV09XCJvcHRpb24udmFsdWVcIj5cbiAgICAgICAgICB7eyBvcHRpb24udGl0bGUgfX1cbiAgICAgICAgPC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIFNlbGVjdEZpbHRlckNvbXBvbmVudCBleHRlbmRzIERlZmF1bHRGaWx0ZXIgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBWaWV3Q2hpbGQoJ2lucHV0Q29udHJvbCcsIHsgcmVhZDogTmdDb250cm9sLCBzdGF0aWM6IHRydWUgfSkgaW5wdXRDb250cm9sITogTmdDb250cm9sO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29sdW1uLmZpbHRlckZ1bmN0aW9uID0gdGhpcy5vbkZpbHRlclZhbHVlcy5iaW5kKHRoaXMpO1xuXG4gICAgY29uc3QgZXhpc3QgPSB0aGlzLmlucHV0Q29udHJvbC52YWx1ZUNoYW5nZXM7XG4gICAgaWYgKCFleGlzdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBleGlzdFxuICAgICAgLnBpcGUoXG4gICAgICAgIHNraXAoMSksXG4gICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKCksXG4gICAgICAgIGRlYm91bmNlVGltZSh0aGlzLmRlbGF5KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgodmFsdWU6IHN0cmluZykgPT4gdGhpcy5zZXRGaWx0ZXIoKSk7XG4gIH1cblxuICBvbkZpbHRlclZhbHVlcyhjZWxsVmFsdWU6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIGRhdGE6IGFueSwgY2VsbE5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHN0cmljdEZpbHRlciA9IHRoaXMuY29sdW1uLmdldEZpbHRlckNvbmZpZygpPy5zdHJpY3QgPz8gZmFsc2U7XG4gICAgaWYgKHN0cmljdEZpbHRlcikge1xuICAgICAgcmV0dXJuIGRlZmF1bHRTdHJpbmdFcXVhbHNGaWx0ZXIoY2VsbFZhbHVlLCBzZWFyY2gsIGRhdGEsIGNlbGxOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRlZmF1bHRTdHJpbmdJbmNsdXNpb25GaWx0ZXIoY2VsbFZhbHVlLCBzZWFyY2gsIGRhdGEsIGNlbGxOYW1lKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==