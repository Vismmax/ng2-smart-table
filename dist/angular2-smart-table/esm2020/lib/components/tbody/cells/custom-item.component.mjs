import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export class TbodyCustomItemComponent {
    ngOnInit() {
        this.customComponent = this.dynamicTarget.createComponent(this.action.renderComponent);
        Object.assign(this.customComponent.instance, this.getPatch());
    }
    ngOnDestroy() {
        this.customComponent.destroy();
    }
    getPatch() {
        return {
            action: this.action,
            rowData: this.row.getData(),
        };
    }
}
TbodyCustomItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyCustomItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TbodyCustomItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TbodyCustomItemComponent, selector: "angular2-st-tbody-custom-item", inputs: { action: "action", row: "row" }, viewQueries: [{ propertyName: "dynamicTarget", first: true, predicate: ["dynamicTarget"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <ng-template #dynamicTarget></ng-template>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyCustomItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-st-tbody-custom-item',
                    template: `
    <ng-template #dynamicTarget></ng-template>
  `,
                }]
        }], propDecorators: { action: [{
                type: Input
            }], row: [{
                type: Input
            }], dynamicTarget: [{
                type: ViewChild,
                args: ['dynamicTarget', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWl0ZW0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3Rib2R5L2NlbGxzL2N1c3RvbS1pdGVtLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBcUIsU0FBUyxFQUFFLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDOztBQVUvRixNQUFNLE9BQU8sd0JBQXdCO0lBT25DLFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdkYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVTLFFBQVE7UUFDaEIsT0FBTztZQUNMLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtZQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7U0FDNUIsQ0FBQztJQUNKLENBQUM7O3NIQXJCVSx3QkFBd0I7MEdBQXhCLHdCQUF3QiwwTUFLQyxnQkFBZ0IsMkNBVDFDOztHQUVUOzRGQUVVLHdCQUF3QjtrQkFOcEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsK0JBQStCO29CQUN6QyxRQUFRLEVBQUU7O0dBRVQ7aUJBQ0Y7OEJBSVUsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDZ0UsYUFBYTtzQkFBbEYsU0FBUzt1QkFBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1Jvd30gZnJvbSAnLi4vLi4vLi4vbGliL2RhdGEtc2V0L3Jvdyc7XG5pbXBvcnQge0N1c3RvbUFjdGlvbn0gZnJvbSAnLi4vLi4vLi4vbGliL3NldHRpbmdzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYW5ndWxhcjItc3QtdGJvZHktY3VzdG9tLWl0ZW0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZHluYW1pY1RhcmdldD48L25nLXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUYm9keUN1c3RvbUl0ZW1Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgY3VzdG9tQ29tcG9uZW50OiBhbnk7XG4gIEBJbnB1dCgpIGFjdGlvbiE6IEN1c3RvbUFjdGlvbjtcbiAgQElucHV0KCkgcm93ITogUm93O1xuICBAVmlld0NoaWxkKCdkeW5hbWljVGFyZ2V0JywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IHRydWUgfSkgZHluYW1pY1RhcmdldCE6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jdXN0b21Db21wb25lbnQgPSB0aGlzLmR5bmFtaWNUYXJnZXQuY3JlYXRlQ29tcG9uZW50KHRoaXMuYWN0aW9uLnJlbmRlckNvbXBvbmVudCk7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLmN1c3RvbUNvbXBvbmVudC5pbnN0YW5jZSwgdGhpcy5nZXRQYXRjaCgpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50LmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQYXRjaCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aW9uOiB0aGlzLmFjdGlvbixcbiAgICAgIHJvd0RhdGE6IHRoaXMucm93LmdldERhdGEoKSxcbiAgICB9O1xuICB9XG59XG4iXX0=