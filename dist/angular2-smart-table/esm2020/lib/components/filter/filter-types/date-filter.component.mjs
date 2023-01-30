import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFilter } from './default-filter';
import { combineLatest, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common";
export class DateFilterComponent extends DefaultFilter {
    constructor() {
        super();
        this.startDate = new FormControl();
        this.endDate = new FormControl();
        this.dateBefore = new FormControl();
        this.dateAfter = new FormControl();
        this.dateEqual = new FormControl();
        this.filterTypeSelect = new FormControl();
        this.filterType = 'after';
        this.filterOptions = ['before', 'after', 'equal', 'between'];
    }
    ngOnInit() {
        this.changesSubscription2 = this.filterTypeSelect.valueChanges.subscribe(value => {
            this.filterType = value;
            if (this.changesSubscription) {
                this.changesSubscription.unsubscribe();
            }
            this.changesSubscription = this.getFilterType()
                .subscribe((value) => {
                this.query = value;
                this.setFilter();
            });
        });
    }
    getFilterType() {
        switch (this.filterType) {
            case 'before': {
                return this.dateBefore.valueChanges.pipe(map((value) => '_date_before_' + value));
            }
            case 'after': {
                return this.dateAfter.valueChanges.pipe(map((value) => '_date_after_' + value));
            }
            case 'equal': {
                return this.dateEqual.valueChanges.pipe(map((value) => '_date_equal_' + value));
            }
            case 'between': {
                return combineLatest([this.startDate.valueChanges, this.endDate.valueChanges])
                    .pipe(map(([val1, val2]) => {
                    return '_start_date_' + val1 + '_end_date_' + val2;
                }));
            }
            default:
                return of('');
        }
    }
}
DateFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DateFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DateFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: DateFilterComponent, selector: "date-filter", usesInheritance: true, ngImport: i0, template: `
    <select [formControl]="filterTypeSelect">
      <option [value]="option" *ngFor="let  option of filterOptions">{{option}}</option>
    </select>
    <div [ngSwitch]="filterType">
     <input *ngSwitchCase="'before'" type="date" [formControl]="dateBefore" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'after'" type="date" [formControl]="dateAfter" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'equal'" type="date" [formControl]="dateEqual" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'between'" type="date" [formControl]="startDate" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'between'" type="date" [formControl]="endDate" [ngClass]="inputClass" class="form-control">
    </div>
  `, isInline: true, directives: [{ type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DateFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'date-filter',
                    template: `
    <select [formControl]="filterTypeSelect">
      <option [value]="option" *ngFor="let  option of filterOptions">{{option}}</option>
    </select>
    <div [ngSwitch]="filterType">
     <input *ngSwitchCase="'before'" type="date" [formControl]="dateBefore" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'after'" type="date" [formControl]="dateAfter" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'equal'" type="date" [formControl]="dateEqual" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'between'" type="date" [formControl]="startDate" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'between'" type="date" [formControl]="endDate" [ngClass]="inputClass" class="form-control">
    </div>
  `,
                }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2ZpbHRlci9maWx0ZXItdHlwZXMvZGF0ZS1maWx0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQVMsTUFBTSxlQUFlLENBQUM7QUFDaEQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTNDLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsYUFBYSxFQUFFLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFpQm5DLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxhQUFhO0lBV2xEO1FBQ0ksS0FBSyxFQUFFLENBQUM7UUFWWixjQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM5QixZQUFPLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM1QixlQUFVLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUMvQixjQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM5QixjQUFTLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUM5QixxQkFBZ0IsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ3JDLGVBQVUsR0FBVyxPQUFPLENBQUM7UUFDN0Isa0JBQWEsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBSXhELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzdFLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFBO1lBQ3ZCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUMxQixJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDMUM7WUFDRCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtpQkFDMUMsU0FBUyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUE7WUFDcEIsQ0FBQyxDQUFDLENBQUE7UUFDVixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxhQUFhO1FBQ1QsUUFBUSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3JCLEtBQUssUUFBUSxDQUFDLENBQUM7Z0JBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUMxRjtZQUNELEtBQUssT0FBTyxDQUFDLENBQUM7Z0JBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN4RjtZQUNELEtBQUssT0FBTyxDQUFDLENBQUM7Z0JBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN4RjtZQUNELEtBQUssU0FBUyxDQUFDLENBQUM7Z0JBQ1osT0FBTyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO3FCQUN6RSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtvQkFDdkIsT0FBTyxjQUFjLEdBQUcsSUFBSSxHQUFHLFlBQVksR0FBRyxJQUFJLENBQUE7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDVjtZQUNEO2dCQUNJLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3JCO0lBQ0wsQ0FBQzs7aUhBakRRLG1CQUFtQjtxR0FBbkIsbUJBQW1CLDBFQWJsQjs7Ozs7Ozs7Ozs7R0FXWDs0RkFFVSxtQkFBbUI7a0JBZi9CLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7R0FXWDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQge0RlZmF1bHRGaWx0ZXJ9IGZyb20gJy4vZGVmYXVsdC1maWx0ZXInO1xuaW1wb3J0IHtjb21iaW5lTGF0ZXN0LCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2RhdGUtZmlsdGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxzZWxlY3QgW2Zvcm1Db250cm9sXT1cImZpbHRlclR5cGVTZWxlY3RcIj5cbiAgICAgIDxvcHRpb24gW3ZhbHVlXT1cIm9wdGlvblwiICpuZ0Zvcj1cImxldCAgb3B0aW9uIG9mIGZpbHRlck9wdGlvbnNcIj57e29wdGlvbn19PC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gICAgPGRpdiBbbmdTd2l0Y2hdPVwiZmlsdGVyVHlwZVwiPlxuICAgICA8aW5wdXQgKm5nU3dpdGNoQ2FzZT1cIidiZWZvcmUnXCIgdHlwZT1cImRhdGVcIiBbZm9ybUNvbnRyb2xdPVwiZGF0ZUJlZm9yZVwiIFtuZ0NsYXNzXT1cImlucHV0Q2xhc3NcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgICA8aW5wdXQgKm5nU3dpdGNoQ2FzZT1cIidhZnRlcidcIiB0eXBlPVwiZGF0ZVwiIFtmb3JtQ29udHJvbF09XCJkYXRlQWZ0ZXJcIiBbbmdDbGFzc109XCJpbnB1dENsYXNzXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIj5cbiAgICAgPGlucHV0ICpuZ1N3aXRjaENhc2U9XCInZXF1YWwnXCIgdHlwZT1cImRhdGVcIiBbZm9ybUNvbnRyb2xdPVwiZGF0ZUVxdWFsXCIgW25nQ2xhc3NdPVwiaW5wdXRDbGFzc1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgIDxpbnB1dCAqbmdTd2l0Y2hDYXNlPVwiJ2JldHdlZW4nXCIgdHlwZT1cImRhdGVcIiBbZm9ybUNvbnRyb2xdPVwic3RhcnREYXRlXCIgW25nQ2xhc3NdPVwiaW5wdXRDbGFzc1wiIGNsYXNzPVwiZm9ybS1jb250cm9sXCI+XG4gICAgIDxpbnB1dCAqbmdTd2l0Y2hDYXNlPVwiJ2JldHdlZW4nXCIgdHlwZT1cImRhdGVcIiBbZm9ybUNvbnRyb2xdPVwiZW5kRGF0ZVwiIFtuZ0NsYXNzXT1cImlucHV0Q2xhc3NcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBEYXRlRmlsdGVyQ29tcG9uZW50IGV4dGVuZHMgRGVmYXVsdEZpbHRlciBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBzdGFydERhdGUgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICBlbmREYXRlID0gbmV3IEZvcm1Db250cm9sKCk7XG4gICAgZGF0ZUJlZm9yZSA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgIGRhdGVBZnRlciA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgIGRhdGVFcXVhbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgIGZpbHRlclR5cGVTZWxlY3QgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICBmaWx0ZXJUeXBlOiBzdHJpbmcgPSAnYWZ0ZXInO1xuICAgIGZpbHRlck9wdGlvbnMgPSBbJ2JlZm9yZScsICdhZnRlcicsICdlcXVhbCcsICdiZXR3ZWVuJ107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VzU3Vic2NyaXB0aW9uMiA9IHRoaXMuZmlsdGVyVHlwZVNlbGVjdC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVHlwZSA9IHZhbHVlXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFuZ2VzU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoYW5nZXNTdWJzY3JpcHRpb24gPSB0aGlzLmdldEZpbHRlclR5cGUoKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWVyeSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZpbHRlcigpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRGaWx0ZXJUeXBlKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZmlsdGVyVHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnYmVmb3JlJzoge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGVCZWZvcmUudmFsdWVDaGFuZ2VzLnBpcGUobWFwKCh2YWx1ZTogYW55KSA9PiAnX2RhdGVfYmVmb3JlXycgKyB2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnYWZ0ZXInOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUFmdGVyLnZhbHVlQ2hhbmdlcy5waXBlKG1hcCgodmFsdWU6IGFueSkgPT4gJ19kYXRlX2FmdGVyXycgKyB2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnZXF1YWwnOiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0ZUVxdWFsLnZhbHVlQ2hhbmdlcy5waXBlKG1hcCgodmFsdWU6IGFueSkgPT4gJ19kYXRlX2VxdWFsXycgKyB2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FzZSAnYmV0d2Vlbic6IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tYmluZUxhdGVzdChbdGhpcy5zdGFydERhdGUudmFsdWVDaGFuZ2VzLCB0aGlzLmVuZERhdGUudmFsdWVDaGFuZ2VzXSlcbiAgICAgICAgICAgICAgICAgICAgLnBpcGUobWFwKChbdmFsMSwgdmFsMl0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnX3N0YXJ0X2RhdGVfJyArIHZhbDEgKyAnX2VuZF9kYXRlXycgKyB2YWwyXG4gICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gb2YoJycpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19