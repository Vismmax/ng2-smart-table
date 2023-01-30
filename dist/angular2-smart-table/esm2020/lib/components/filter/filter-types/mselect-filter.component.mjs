import { Component } from '@angular/core';
import { DefaultFilter } from './default-filter';
import { defaultStringEqualsFilter, defaultStringInclusionFilter } from '../../../lib/data-source/local/local.filter';
import * as i0 from "@angular/core";
import * as i1 from "angular2-multiselect-dropdown";
import * as i2 from "@angular/forms";
export class MselectFilterComponent extends DefaultFilter {
    constructor() {
        super(...arguments);
        this.selector = "*;*";
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {};
    }
    ngOnInit() {
        this.column.filterFunction = this.onFilterValues.bind(this);
        const config = this.column.getFilterConfig();
        this.dropdownList = config.dropdownList || [];
        this.selectedItems = config.selectedItems || [];
        let setting = {
            singleSelection: false,
            text: "Select",
            selectAllText: "Select All",
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "myclass",
            maxHeight: 200,
            position: 'top',
            autoPosition: true,
        };
        this.dropdownSettings = Object.assign(setting, config.dropdownSettings);
    }
    onFilterValues(cellValue, search, data, cellName) {
        if (search.indexOf(this.selector) != -1) {
            let searchArray = search.split(this.selector);
            return searchArray.indexOf(cellValue) != -1;
        }
        const strictFilter = this.column.getFilterConfig()?.strict ?? false;
        if (strictFilter) {
            return defaultStringEqualsFilter(cellValue, search, data, cellName);
        }
        else {
            return defaultStringInclusionFilter(cellValue, search, data, cellName);
        }
    }
    onItemSelect(item) {
        this.updateQuery();
    }
    OnItemDeSelect(item) {
        this.updateQuery();
    }
    onSelectAll(items) {
        this.updateQuery();
    }
    onDeSelectAll(items) {
        this.updateQuery();
    }
    updateQuery() {
        this.query = this.selectedItems.map(item => item.id).join(this.selector); //.replace(/ /g, '')
        this.setFilter();
    }
}
MselectFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: MselectFilterComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
MselectFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: MselectFilterComponent, selector: "mselect-filter", usesInheritance: true, ngImport: i0, template: `<angular2-multiselect [data]="dropdownList"
    [(ngModel)]="selectedItems"
    [settings]="dropdownSettings"
    (onSelect)="onItemSelect($event)"
    (onDeSelect)="OnItemDeSelect($event)"
    (onSelectAll)="onSelectAll($event)"
    (onDeSelectAll)="onDeSelectAll($event)">
    </angular2-multiselect>`, isInline: true, components: [{ type: i1.AngularMultiSelect, selector: "angular2-multiselect", inputs: ["settings", "data", "loading"], outputs: ["onSelect", "onDeSelect", "onSelectAll", "onDeSelectAll", "onOpen", "onClose", "onScrollToEnd", "onFilterSelectAll", "onFilterDeSelectAll", "onAddFilterNewItem", "onGroupSelect", "onGroupDeSelect"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: MselectFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mselect-filter',
                    template: `<angular2-multiselect [data]="dropdownList"
    [(ngModel)]="selectedItems"
    [settings]="dropdownSettings"
    (onSelect)="onItemSelect($event)"
    (onDeSelect)="OnItemDeSelect($event)"
    (onSelectAll)="onSelectAll($event)"
    (onDeSelectAll)="onDeSelectAll($event)">
    </angular2-multiselect>`
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNlbGVjdC1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2ZpbHRlci9maWx0ZXItdHlwZXMvbXNlbGVjdC1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRS9DLE9BQU8sRUFBQyx5QkFBeUIsRUFBRSw0QkFBNEIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDOzs7O0FBbUJwSCxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsYUFBYTtJQVh6RDs7UUFhYSxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQzFCLGlCQUFZLEdBQWUsRUFBRSxDQUFDO1FBQzlCLGtCQUFhLEdBQWUsRUFBRSxDQUFDO1FBQy9CLHFCQUFnQixHQUFxQixFQUFFLENBQUM7S0FrRDNDO0lBaERHLFFBQVE7UUFDSixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1RCxNQUFNLE1BQU0sR0FBVyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsYUFBYSxJQUFJLEVBQUUsQ0FBQztRQUNoRCxJQUFJLE9BQU8sR0FBcUI7WUFDNUIsZUFBZSxFQUFFLEtBQUs7WUFDdEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxhQUFhLEVBQUUsWUFBWTtZQUMzQixlQUFlLEVBQUUsY0FBYztZQUMvQixrQkFBa0IsRUFBRSxJQUFJO1lBQ3hCLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFNBQVMsRUFBRSxHQUFHO1lBQ2QsUUFBUSxFQUFFLEtBQUs7WUFDZixZQUFZLEVBQUUsSUFBSTtTQUNyQixDQUFDO1FBQ0YsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFFRCxjQUFjLENBQUMsU0FBaUIsRUFBRSxNQUFjLEVBQUUsSUFBUyxFQUFFLFFBQWdCO1FBQ3pFLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDckMsSUFBSSxXQUFXLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUMsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQy9DO1FBQ0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLElBQUksS0FBSyxDQUFDO1FBQ3BFLElBQUksWUFBWSxFQUFFO1lBQ2QsT0FBTyx5QkFBeUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN2RTthQUFNO1lBQ0gsT0FBTyw0QkFBNEIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUMxRTtJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBUztRQUNsQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELGNBQWMsQ0FBQyxJQUFTO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBQ0QsV0FBVyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFDRCxhQUFhLENBQUMsS0FBVTtRQUNwQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUNELFdBQVc7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQSxvQkFBb0I7UUFDN0YsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ3BCLENBQUM7O29IQXREUSxzQkFBc0I7d0dBQXRCLHNCQUFzQiw2RUFUckI7Ozs7Ozs7NEJBT2M7NEZBRWYsc0JBQXNCO2tCQVhsQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRTs7Ozs7Ozs0QkFPYztpQkFDM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RGVmYXVsdEZpbHRlcn0gZnJvbSAnLi9kZWZhdWx0LWZpbHRlcic7XG5pbXBvcnQge0Ryb3Bkb3duU2V0dGluZ3N9IGZyb20gJ2FuZ3VsYXIyLW11bHRpc2VsZWN0LWRyb3Bkb3duL2xpYi9tdWx0aXNlbGVjdC5pbnRlcmZhY2UnO1xuaW1wb3J0IHtkZWZhdWx0U3RyaW5nRXF1YWxzRmlsdGVyLCBkZWZhdWx0U3RyaW5nSW5jbHVzaW9uRmlsdGVyfSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zb3VyY2UvbG9jYWwvbG9jYWwuZmlsdGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBDb25maWcge1xuICAgIGRyb3Bkb3duTGlzdDogQXJyYXk8YW55PixcbiAgICBzZWxlY3RlZEl0ZW1zOiBBcnJheTxhbnk+LFxuICAgIGRyb3Bkb3duU2V0dGluZ3M6IERyb3Bkb3duU2V0dGluZ3Ncbn1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdtc2VsZWN0LWZpbHRlcicsXG4gICAgdGVtcGxhdGU6IGA8YW5ndWxhcjItbXVsdGlzZWxlY3QgW2RhdGFdPVwiZHJvcGRvd25MaXN0XCJcbiAgICBbKG5nTW9kZWwpXT1cInNlbGVjdGVkSXRlbXNcIlxuICAgIFtzZXR0aW5nc109XCJkcm9wZG93blNldHRpbmdzXCJcbiAgICAob25TZWxlY3QpPVwib25JdGVtU2VsZWN0KCRldmVudClcIlxuICAgIChvbkRlU2VsZWN0KT1cIk9uSXRlbURlU2VsZWN0KCRldmVudClcIlxuICAgIChvblNlbGVjdEFsbCk9XCJvblNlbGVjdEFsbCgkZXZlbnQpXCJcbiAgICAob25EZVNlbGVjdEFsbCk9XCJvbkRlU2VsZWN0QWxsKCRldmVudClcIj5cbiAgICA8L2FuZ3VsYXIyLW11bHRpc2VsZWN0PmBcbn0pXG5leHBvcnQgY2xhc3MgTXNlbGVjdEZpbHRlckNvbXBvbmVudCBleHRlbmRzIERlZmF1bHRGaWx0ZXIgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcmVhZG9ubHkgc2VsZWN0b3IgPSBcIio7KlwiO1xuICAgIGRyb3Bkb3duTGlzdDogQXJyYXk8YW55PiA9IFtdO1xuICAgIHNlbGVjdGVkSXRlbXM6IEFycmF5PGFueT4gPSBbXTtcbiAgICBkcm9wZG93blNldHRpbmdzOiBEcm9wZG93blNldHRpbmdzID0ge307XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jb2x1bW4uZmlsdGVyRnVuY3Rpb24gPSB0aGlzLm9uRmlsdGVyVmFsdWVzLmJpbmQodGhpcyk7XG4gICAgICAgIGNvbnN0IGNvbmZpZzogQ29uZmlnID0gdGhpcy5jb2x1bW4uZ2V0RmlsdGVyQ29uZmlnKCk7XG4gICAgICAgIHRoaXMuZHJvcGRvd25MaXN0ID0gY29uZmlnLmRyb3Bkb3duTGlzdCB8fCBbXTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZEl0ZW1zID0gY29uZmlnLnNlbGVjdGVkSXRlbXMgfHwgW107XG4gICAgICAgIGxldCBzZXR0aW5nOiBEcm9wZG93blNldHRpbmdzID0ge1xuICAgICAgICAgICAgc2luZ2xlU2VsZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHRleHQ6IFwiU2VsZWN0XCIsXG4gICAgICAgICAgICBzZWxlY3RBbGxUZXh0OiBcIlNlbGVjdCBBbGxcIixcbiAgICAgICAgICAgIHVuU2VsZWN0QWxsVGV4dDogJ1VuU2VsZWN0IEFsbCcsXG4gICAgICAgICAgICBlbmFibGVTZWFyY2hGaWx0ZXI6IHRydWUsXG4gICAgICAgICAgICBjbGFzc2VzOiBcIm15Y2xhc3NcIixcbiAgICAgICAgICAgIG1heEhlaWdodDogMjAwLFxuICAgICAgICAgICAgcG9zaXRpb246ICd0b3AnLFxuICAgICAgICAgICAgYXV0b1Bvc2l0aW9uOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRyb3Bkb3duU2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHNldHRpbmcsIGNvbmZpZy5kcm9wZG93blNldHRpbmdzKTtcbiAgICB9XG5cbiAgICBvbkZpbHRlclZhbHVlcyhjZWxsVmFsdWU6IHN0cmluZywgc2VhcmNoOiBzdHJpbmcsIGRhdGE6IGFueSwgY2VsbE5hbWU6IHN0cmluZykge1xuICAgICAgICBpZiAoc2VhcmNoLmluZGV4T2YodGhpcy5zZWxlY3RvcikgIT0gLTEpIHtcbiAgICAgICAgICAgIGxldCBzZWFyY2hBcnJheSA9IHNlYXJjaC5zcGxpdCh0aGlzLnNlbGVjdG9yKTtcbiAgICAgICAgICAgIHJldHVybiBzZWFyY2hBcnJheS5pbmRleE9mKGNlbGxWYWx1ZSkgIT0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RyaWN0RmlsdGVyID0gdGhpcy5jb2x1bW4uZ2V0RmlsdGVyQ29uZmlnKCk/LnN0cmljdCA/PyBmYWxzZTtcbiAgICAgICAgaWYgKHN0cmljdEZpbHRlcikge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRTdHJpbmdFcXVhbHNGaWx0ZXIoY2VsbFZhbHVlLCBzZWFyY2gsIGRhdGEsIGNlbGxOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0U3RyaW5nSW5jbHVzaW9uRmlsdGVyKGNlbGxWYWx1ZSwgc2VhcmNoLCBkYXRhLCBjZWxsTmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1TZWxlY3QoaXRlbTogYW55KSB7XG4gICAgICAgIHRoaXMudXBkYXRlUXVlcnkoKTtcbiAgICB9XG4gICAgT25JdGVtRGVTZWxlY3QoaXRlbTogYW55KSB7XG4gICAgICAgIHRoaXMudXBkYXRlUXVlcnkoKTtcbiAgICB9XG4gICAgb25TZWxlY3RBbGwoaXRlbXM6IGFueSkge1xuICAgICAgICB0aGlzLnVwZGF0ZVF1ZXJ5KCk7XG4gICAgfVxuICAgIG9uRGVTZWxlY3RBbGwoaXRlbXM6IGFueSkge1xuICAgICAgICB0aGlzLnVwZGF0ZVF1ZXJ5KCk7XG4gICAgfVxuICAgIHVwZGF0ZVF1ZXJ5KCkge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5zZWxlY3RlZEl0ZW1zLm1hcChpdGVtID0+IGl0ZW0uaWQpLmpvaW4odGhpcy5zZWxlY3Rvcik7Ly8ucmVwbGFjZSgvIC9nLCAnJylcbiAgICAgICAgdGhpcy5zZXRGaWx0ZXIoKVxuICAgIH1cbn1cbiJdfQ==