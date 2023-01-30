import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class ActionsTitleComponent {
    constructor(ref) {
        this.ref = ref;
    }
    ngAfterViewInit() {
        this.ref.nativeElement.classList.add('angular2-smart-actions');
    }
    ngOnChanges() {
        this.actionsColumnTitle = this.grid.getSetting('actions.columnTitle');
    }
}
ActionsTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ActionsTitleComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
ActionsTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: ActionsTitleComponent, selector: "[angular2-st-actions-title]", inputs: { grid: "grid" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="angular2-smart-title">{{ actionsColumnTitle }}</div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ActionsTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[angular2-st-actions-title]',
                    template: `
    <div class="angular2-smart-title">{{ actionsColumnTitle }}</div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { grid: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9ucy10aXRsZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvdGhlYWQvY2VsbHMvYWN0aW9ucy10aXRsZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFnQixTQUFTLEVBQWMsS0FBSyxFQUFZLE1BQU0sZUFBZSxDQUFDOztBQVVyRixNQUFNLE9BQU8scUJBQXFCO0lBTWhDLFlBQW9CLEdBQWU7UUFBZixRQUFHLEdBQUgsR0FBRyxDQUFZO0lBQ25DLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDeEUsQ0FBQzs7bUhBZlUscUJBQXFCO3VHQUFyQixxQkFBcUIsa0hBSnRCOztHQUVUOzRGQUVVLHFCQUFxQjtrQkFOakMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsNkJBQTZCO29CQUN2QyxRQUFRLEVBQUU7O0dBRVQ7aUJBQ0Y7aUdBR1UsSUFBSTtzQkFBWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0dyaWR9IGZyb20gJy4uLy4uLy4uL2xpYi9ncmlkJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnW2FuZ3VsYXIyLXN0LWFjdGlvbnMtdGl0bGVdJyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiYW5ndWxhcjItc21hcnQtdGl0bGVcIj57eyBhY3Rpb25zQ29sdW1uVGl0bGUgfX08L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgQWN0aW9uc1RpdGxlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcblxuICBASW5wdXQoKSBncmlkITogR3JpZDtcblxuICBhY3Rpb25zQ29sdW1uVGl0bGUhOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWY6IEVsZW1lbnRSZWYpIHtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FuZ3VsYXIyLXNtYXJ0LWFjdGlvbnMnKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMuYWN0aW9uc0NvbHVtblRpdGxlID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ2FjdGlvbnMuY29sdW1uVGl0bGUnKTtcbiAgfVxufVxuIl19