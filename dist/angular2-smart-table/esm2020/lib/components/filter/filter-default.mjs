import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class FilterDefault {
    constructor() {
        this.inputClass = '';
        this.query = '';
    }
    onFilter(query) {
        this.source.addFilter({
            field: this.column.id,
            search: query,
            filter: this.column.getFilterFunction(),
        });
    }
}
FilterDefault.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterDefault, deps: [], target: i0.ɵɵFactoryTarget.Component });
FilterDefault.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FilterDefault, selector: "ng-component", inputs: { column: "column", source: "source", inputClass: "inputClass" }, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterDefault, decorators: [{
            type: Component,
            args: [{
                    template: '',
                }]
        }], propDecorators: { column: [{
                type: Input
            }], source: [{
                type: Input
            }], inputClass: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLWRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvZmlsdGVyL2ZpbHRlci1kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQVEvQyxNQUFNLE9BQU8sYUFBYTtJQUgxQjtRQU9XLGVBQVUsR0FBVyxFQUFFLENBQUM7UUFFakMsVUFBSyxHQUFXLEVBQUUsQ0FBQztLQVNwQjtJQVBDLFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO1lBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDckIsTUFBTSxFQUFFLEtBQUs7WUFDYixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtTQUN4QyxDQUFDLENBQUM7SUFDTCxDQUFDOzsyR0FkVSxhQUFhOytGQUFiLGFBQWEsOEhBRmQsRUFBRTs0RkFFRCxhQUFhO2tCQUh6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxFQUFFO2lCQUNiOzhCQUdVLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q29sdW1ufSBmcm9tICcuLi8uLi9saWIvZGF0YS1zZXQvY29sdW1uJztcbmltcG9ydCB7RGF0YVNvdXJjZX0gZnJvbSAnLi4vLi4vbGliL2RhdGEtc291cmNlL2RhdGEtc291cmNlJztcblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlOiAnJyxcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyRGVmYXVsdCB7XG5cbiAgQElucHV0KCkgY29sdW1uITogQ29sdW1uO1xuICBASW5wdXQoKSBzb3VyY2UhOiBEYXRhU291cmNlO1xuICBASW5wdXQoKSBpbnB1dENsYXNzOiBzdHJpbmcgPSAnJztcblxuICBxdWVyeTogc3RyaW5nID0gJyc7XG5cbiAgb25GaWx0ZXIocXVlcnk6IHN0cmluZykge1xuICAgIHRoaXMuc291cmNlLmFkZEZpbHRlcih7XG4gICAgICBmaWVsZDogdGhpcy5jb2x1bW4uaWQsXG4gICAgICBzZWFyY2g6IHF1ZXJ5LFxuICAgICAgZmlsdGVyOiB0aGlzLmNvbHVtbi5nZXRGaWx0ZXJGdW5jdGlvbigpLFxuICAgIH0pO1xuICB9XG59XG4iXX0=