import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { DefaultFilter } from './default-filter';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "ng2-completer";
import * as i2 from "@angular/forms";
export class CompleterFilterComponent extends DefaultFilter {
    constructor(completerService) {
        super();
        this.completerService = completerService;
        this.completerContent = new Subject();
    }
    ngOnInit() {
        const config = this.column.getFilterConfig().completer;
        config.dataService = this.completerService.local(config.data, config.searchFields, config.titleField);
        config.dataService.descriptionField(config.descriptionField);
        this.changesSubscription = this.completerContent
            .pipe(map((ev) => (ev && ev.title) || ev || ''), distinctUntilChanged(), debounceTime(this.delay))
            .subscribe((search) => {
            this.query = search;
            this.setFilter();
        });
    }
    inputTextChanged(event) {
        // workaround to trigger the search event when the home/end buttons are clicked
        // when this happens the [(ngModel)]="query" is set to "" but the (selected) method is not called
        // so here it gets called manually
        if (event === '') {
            this.completerContent.next(event);
        }
    }
}
CompleterFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CompleterFilterComponent, deps: [{ token: i1.CompleterService }], target: i0.ɵɵFactoryTarget.Component });
CompleterFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CompleterFilterComponent, selector: "completer-filter", usesInheritance: true, ngImport: i0, template: `
    <ng2-completer [(ngModel)]="query"
                   (ngModelChange)="inputTextChanged($event)"
                   [dataService]="column.getFilterConfig().completer.dataService"
                   [minSearchLength]="column.getFilterConfig().completer.minSearchLength || 0"
                   [pause]="column.getFilterConfig().completer.pause || 0"
                   [placeholder]="column.getFilterConfig().completer.placeholder || 'Start typing...'"
                   (selected)="completerContent.next($event)">
    </ng2-completer>
  `, isInline: true, components: [{ type: i1.CompleterCmp, selector: "ng2-completer", inputs: ["inputName", "inputId", "pause", "minSearchLength", "maxChars", "overrideSuggested", "clearSelected", "clearUnselected", "fillHighlighted", "placeholder", "autoMatch", "disableInput", "autofocus", "openOnFocus", "openOnClick", "selectOnClick", "selectOnFocus", "autoHighlight", "datasource", "dataService", "textNoResults", "textSearching", "matchClass", "fieldTabindex", "inputClass", "initialValue"], outputs: ["selected", "highlighted", "blur", "click", "focus", "opened", "keyup", "keydown"] }], directives: [{ type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CompleterFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'completer-filter',
                    template: `
    <ng2-completer [(ngModel)]="query"
                   (ngModelChange)="inputTextChanged($event)"
                   [dataService]="column.getFilterConfig().completer.dataService"
                   [minSearchLength]="column.getFilterConfig().completer.minSearchLength || 0"
                   [pause]="column.getFilterConfig().completer.pause || 0"
                   [placeholder]="column.getFilterConfig().completer.placeholder || 'Start typing...'"
                   (selected)="completerContent.next($event)">
    </ng2-completer>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1.CompleterService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGxldGVyLWZpbHRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvZmlsdGVyL2ZpbHRlci10eXBlcy9jb21wbGV0ZXItZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFTLE1BQU0sZUFBZSxDQUFDO0FBQ2hELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHN0IsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxZQUFZLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFldkUsTUFBTSxPQUFPLHdCQUF5QixTQUFRLGFBQWE7SUFJekQsWUFBb0IsZ0JBQWtDO1FBQ3BELEtBQUssRUFBRSxDQUFDO1FBRFUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUZ0RCxxQkFBZ0IsR0FBRyxJQUFJLE9BQU8sRUFBTyxDQUFDO0lBSXRDLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDdkQsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUU3RCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQjthQUM3QyxJQUFJLENBQ0gsR0FBRyxDQUFDLENBQUMsRUFBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUM5QyxvQkFBb0IsRUFBRSxFQUN0QixZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUN6QjthQUNBLFNBQVMsQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFO1lBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxLQUFhO1FBQzVCLCtFQUErRTtRQUMvRSxpR0FBaUc7UUFDakcsa0NBQWtDO1FBQ2xDLElBQUksS0FBSyxLQUFLLEVBQUUsRUFBRTtZQUNoQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7c0hBaENVLHdCQUF3QjswR0FBeEIsd0JBQXdCLCtFQVh6Qjs7Ozs7Ozs7O0dBU1Q7NEZBRVUsd0JBQXdCO2tCQWJwQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLFFBQVEsRUFBRTs7Ozs7Ozs7O0dBU1Q7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3ViamVjdH0gZnJvbSAncnhqcyc7XG5pbXBvcnQge0NvbXBsZXRlclNlcnZpY2V9IGZyb20gJ25nMi1jb21wbGV0ZXInO1xuXG5pbXBvcnQge0RlZmF1bHRGaWx0ZXJ9IGZyb20gJy4vZGVmYXVsdC1maWx0ZXInO1xuaW1wb3J0IHtkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkLCBtYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY29tcGxldGVyLWZpbHRlcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5nMi1jb21wbGV0ZXIgWyhuZ01vZGVsKV09XCJxdWVyeVwiXG4gICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwiaW5wdXRUZXh0Q2hhbmdlZCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICBbZGF0YVNlcnZpY2VdPVwiY29sdW1uLmdldEZpbHRlckNvbmZpZygpLmNvbXBsZXRlci5kYXRhU2VydmljZVwiXG4gICAgICAgICAgICAgICAgICAgW21pblNlYXJjaExlbmd0aF09XCJjb2x1bW4uZ2V0RmlsdGVyQ29uZmlnKCkuY29tcGxldGVyLm1pblNlYXJjaExlbmd0aCB8fCAwXCJcbiAgICAgICAgICAgICAgICAgICBbcGF1c2VdPVwiY29sdW1uLmdldEZpbHRlckNvbmZpZygpLmNvbXBsZXRlci5wYXVzZSB8fCAwXCJcbiAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiY29sdW1uLmdldEZpbHRlckNvbmZpZygpLmNvbXBsZXRlci5wbGFjZWhvbGRlciB8fCAnU3RhcnQgdHlwaW5nLi4uJ1wiXG4gICAgICAgICAgICAgICAgICAgKHNlbGVjdGVkKT1cImNvbXBsZXRlckNvbnRlbnQubmV4dCgkZXZlbnQpXCI+XG4gICAgPC9uZzItY29tcGxldGVyPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDb21wbGV0ZXJGaWx0ZXJDb21wb25lbnQgZXh0ZW5kcyBEZWZhdWx0RmlsdGVyIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb21wbGV0ZXJDb250ZW50ID0gbmV3IFN1YmplY3Q8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcGxldGVyU2VydmljZTogQ29tcGxldGVyU2VydmljZSkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBjb25maWcgPSB0aGlzLmNvbHVtbi5nZXRGaWx0ZXJDb25maWcoKS5jb21wbGV0ZXI7XG4gICAgY29uZmlnLmRhdGFTZXJ2aWNlID0gdGhpcy5jb21wbGV0ZXJTZXJ2aWNlLmxvY2FsKGNvbmZpZy5kYXRhLCBjb25maWcuc2VhcmNoRmllbGRzLCBjb25maWcudGl0bGVGaWVsZCk7XG4gICAgY29uZmlnLmRhdGFTZXJ2aWNlLmRlc2NyaXB0aW9uRmllbGQoY29uZmlnLmRlc2NyaXB0aW9uRmllbGQpO1xuXG4gICAgdGhpcy5jaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5jb21wbGV0ZXJDb250ZW50XG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKChldjogYW55KSA9PiAoZXYgJiYgZXYudGl0bGUpIHx8IGV2IHx8ICcnKSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKSxcbiAgICAgICAgZGVib3VuY2VUaW1lKHRoaXMuZGVsYXkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChzZWFyY2g6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gc2VhcmNoO1xuICAgICAgICB0aGlzLnNldEZpbHRlcigpO1xuICAgICAgfSk7XG4gIH1cblxuICBpbnB1dFRleHRDaGFuZ2VkKGV2ZW50OiBzdHJpbmcpIHtcbiAgICAvLyB3b3JrYXJvdW5kIHRvIHRyaWdnZXIgdGhlIHNlYXJjaCBldmVudCB3aGVuIHRoZSBob21lL2VuZCBidXR0b25zIGFyZSBjbGlja2VkXG4gICAgLy8gd2hlbiB0aGlzIGhhcHBlbnMgdGhlIFsobmdNb2RlbCldPVwicXVlcnlcIiBpcyBzZXQgdG8gXCJcIiBidXQgdGhlIChzZWxlY3RlZCkgbWV0aG9kIGlzIG5vdCBjYWxsZWRcbiAgICAvLyBzbyBoZXJlIGl0IGdldHMgY2FsbGVkIG1hbnVhbGx5XG4gICAgaWYgKGV2ZW50ID09PSAnJykge1xuICAgICAgdGhpcy5jb21wbGV0ZXJDb250ZW50Lm5leHQoZXZlbnQpO1xuICAgIH1cbiAgfVxufVxuIl19