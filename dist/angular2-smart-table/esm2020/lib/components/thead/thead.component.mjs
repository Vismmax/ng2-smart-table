import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../services/table.service";
import * as i2 from "./rows/thead-titles-row.component";
import * as i3 from "./rows/thead-filters-row.component";
import * as i4 from "./rows/thead-form-row.component";
import * as i5 from "@angular/common";
export class NgxSmartTableTheadComponent {
    constructor(tableService) {
        this.tableService = tableService;
        this.hide = new EventEmitter();
        this.selectAllRows = new EventEmitter();
        this.create = new EventEmitter();
    }
    ngOnChanges() {
        this.isHideHeader = this.grid.getSetting('hideHeader');
        this.isHideSubHeader = this.grid.getSetting('hideSubHeader');
    }
    mouseMove(event) {
        this.tableService.mouseMoveEvent$.next(event);
    }
}
NgxSmartTableTheadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: NgxSmartTableTheadComponent, deps: [{ token: i1.TableService }], target: i0.ɵɵFactoryTarget.Component });
NgxSmartTableTheadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: NgxSmartTableTheadComponent, selector: "[angular2-st-thead]", inputs: { grid: "grid", source: "source", isAllSelected: "isAllSelected", createConfirm: "createConfirm", createCancel: "createCancel" }, outputs: { hide: "hide", selectAllRows: "selectAllRows", create: "create" }, host: { listeners: { "mousemove": "mouseMove($event)" } }, usesOnChanges: true, ngImport: i0, template: "<tr angular2-st-thead-titles-row *ngIf=\"!isHideHeader\"\n    class=\"angular2-smart-titles\"\n    [grid]=\"grid\"\n    [isAllSelected]=\"isAllSelected\"\n    [source]=\"source\"\n    (hide)=\"hide.emit($event)\"\n    (selectAllRows)=\"selectAllRows.emit()\"\n></tr>\n\n<tr angular2-st-thead-filters-row *ngIf=\"!isHideSubHeader\"\n    class=\"angular2-smart-filters\"\n    [grid]=\"grid\"\n    [source]=\"source\"\n    (create)=\"create.emit($event)\"\n></tr>\n\n<tr angular2-st-thead-form-row *ngIf=\"grid.createFormShown\"\n    [grid]=\"grid\"\n    [createConfirm]=\"createConfirm\"\n    [createCancel]=\"createCancel\"\n></tr>\n", styles: [":host ::ng-deep angular2-st-actions a:first-child{margin-right:.25rem}\n"], components: [{ type: i2.TheadTitlesRowComponent, selector: "[angular2-st-thead-titles-row]", inputs: ["grid", "isAllSelected", "source"], outputs: ["hide", "selectAllRows"] }, { type: i3.TheadFitlersRowComponent, selector: "[angular2-st-thead-filters-row]", inputs: ["grid", "source"], outputs: ["create"] }, { type: i4.TheadFormRowComponent, selector: "[angular2-st-thead-form-row]", inputs: ["grid", "row", "createConfirm", "createCancel"] }], directives: [{ type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: NgxSmartTableTheadComponent, decorators: [{
            type: Component,
            args: [{ selector: '[angular2-st-thead]', template: "<tr angular2-st-thead-titles-row *ngIf=\"!isHideHeader\"\n    class=\"angular2-smart-titles\"\n    [grid]=\"grid\"\n    [isAllSelected]=\"isAllSelected\"\n    [source]=\"source\"\n    (hide)=\"hide.emit($event)\"\n    (selectAllRows)=\"selectAllRows.emit()\"\n></tr>\n\n<tr angular2-st-thead-filters-row *ngIf=\"!isHideSubHeader\"\n    class=\"angular2-smart-filters\"\n    [grid]=\"grid\"\n    [source]=\"source\"\n    (create)=\"create.emit($event)\"\n></tr>\n\n<tr angular2-st-thead-form-row *ngIf=\"grid.createFormShown\"\n    [grid]=\"grid\"\n    [createConfirm]=\"createConfirm\"\n    [createCancel]=\"createCancel\"\n></tr>\n", styles: [":host ::ng-deep angular2-st-actions a:first-child{margin-right:.25rem}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.TableService }]; }, propDecorators: { grid: [{
                type: Input
            }], source: [{
                type: Input
            }], isAllSelected: [{
                type: Input
            }], createConfirm: [{
                type: Input
            }], createCancel: [{
                type: Input
            }], hide: [{
                type: Output
            }], selectAllRows: [{
                type: Output
            }], create: [{
                type: Output
            }], mouseMove: [{
                type: HostListener,
                args: ['mousemove', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3RoZWFkL3RoZWFkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy90aGVhZC90aGVhZC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQVk5RixNQUFNLE9BQU8sMkJBQTJCO0lBZXRDLFlBQW9CLFlBQTBCO1FBQTFCLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBUHBDLFNBQUksR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBQ2xDLGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUN6QyxXQUFNLEdBQUcsSUFBSSxZQUFZLEVBQWUsQ0FBQztJQU1uRCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBR0QsU0FBUyxDQUFDLEtBQWlCO1FBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoRCxDQUFDOzt5SEExQlUsMkJBQTJCOzZHQUEzQiwyQkFBMkIsa1dDWnhDLDBuQkFxQkE7NEZEVGEsMkJBQTJCO2tCQUx2QyxTQUFTOytCQUNFLHFCQUFxQjttR0FNdEIsSUFBSTtzQkFBWixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFFSSxJQUFJO3NCQUFiLE1BQU07Z0JBQ0csYUFBYTtzQkFBdEIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBY1AsU0FBUztzQkFEUixZQUFZO3VCQUFDLFdBQVcsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtHcmlkfSBmcm9tICcuLi8uLi9saWIvZ3JpZCc7XG5pbXBvcnQge0RhdGFTb3VyY2V9IGZyb20gJy4uLy4uL2xpYi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQge1RhYmxlU2VydmljZX0gZnJvbSAnLi4vLi4vc2VydmljZXMvdGFibGUuc2VydmljZSc7XG5pbXBvcnQge0NyZWF0ZUNhbmNlbEV2ZW50LCBDcmVhdGVDb25maXJtRXZlbnQsIENyZWF0ZUV2ZW50fSBmcm9tICcuLi8uLi9saWIvZXZlbnRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW2FuZ3VsYXIyLXN0LXRoZWFkXScsXG4gIHN0eWxlVXJsczogWycuL3RoZWFkLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnLi90aGVhZC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIE5neFNtYXJ0VGFibGVUaGVhZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgQElucHV0KCkgZ3JpZCE6IEdyaWQ7XG4gIEBJbnB1dCgpIHNvdXJjZSE6IERhdGFTb3VyY2U7XG4gIEBJbnB1dCgpIGlzQWxsU2VsZWN0ZWQhOiBib29sZWFuO1xuICBASW5wdXQoKSBjcmVhdGVDb25maXJtITogRXZlbnRFbWl0dGVyPENyZWF0ZUNvbmZpcm1FdmVudD47XG4gIEBJbnB1dCgpIGNyZWF0ZUNhbmNlbCE6IEV2ZW50RW1pdHRlcjxDcmVhdGVDYW5jZWxFdmVudD47XG5cbiAgQE91dHB1dCgpIGhpZGUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpIHNlbGVjdEFsbFJvd3MgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBjcmVhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPENyZWF0ZUV2ZW50PigpO1xuXG4gIGlzSGlkZUhlYWRlciE6IGJvb2xlYW47XG4gIGlzSGlkZVN1YkhlYWRlciE6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5pc0hpZGVIZWFkZXIgPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygnaGlkZUhlYWRlcicpO1xuICAgIHRoaXMuaXNIaWRlU3ViSGVhZGVyID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ2hpZGVTdWJIZWFkZXInKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbW92ZScsIFsnJGV2ZW50J10pXG4gIG1vdXNlTW92ZShldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMudGFibGVTZXJ2aWNlLm1vdXNlTW92ZUV2ZW50JC5uZXh0KGV2ZW50KTtcbiAgfVxufVxuIiwiPHRyIGFuZ3VsYXIyLXN0LXRoZWFkLXRpdGxlcy1yb3cgKm5nSWY9XCIhaXNIaWRlSGVhZGVyXCJcbiAgICBjbGFzcz1cImFuZ3VsYXIyLXNtYXJ0LXRpdGxlc1wiXG4gICAgW2dyaWRdPVwiZ3JpZFwiXG4gICAgW2lzQWxsU2VsZWN0ZWRdPVwiaXNBbGxTZWxlY3RlZFwiXG4gICAgW3NvdXJjZV09XCJzb3VyY2VcIlxuICAgIChoaWRlKT1cImhpZGUuZW1pdCgkZXZlbnQpXCJcbiAgICAoc2VsZWN0QWxsUm93cyk9XCJzZWxlY3RBbGxSb3dzLmVtaXQoKVwiXG4+PC90cj5cblxuPHRyIGFuZ3VsYXIyLXN0LXRoZWFkLWZpbHRlcnMtcm93ICpuZ0lmPVwiIWlzSGlkZVN1YkhlYWRlclwiXG4gICAgY2xhc3M9XCJhbmd1bGFyMi1zbWFydC1maWx0ZXJzXCJcbiAgICBbZ3JpZF09XCJncmlkXCJcbiAgICBbc291cmNlXT1cInNvdXJjZVwiXG4gICAgKGNyZWF0ZSk9XCJjcmVhdGUuZW1pdCgkZXZlbnQpXCJcbj48L3RyPlxuXG48dHIgYW5ndWxhcjItc3QtdGhlYWQtZm9ybS1yb3cgKm5nSWY9XCJncmlkLmNyZWF0ZUZvcm1TaG93blwiXG4gICAgW2dyaWRdPVwiZ3JpZFwiXG4gICAgW2NyZWF0ZUNvbmZpcm1dPVwiY3JlYXRlQ29uZmlybVwiXG4gICAgW2NyZWF0ZUNhbmNlbF09XCJjcmVhdGVDYW5jZWxcIlxuPjwvdHI+XG4iXX0=