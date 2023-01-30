import { Component, Input, ViewChild, ViewContainerRef, } from '@angular/core';
import * as i0 from "@angular/core";
export class CustomViewComponent {
    ngOnInit() {
        if (this.cell && !this.customComponent) {
            this.customComponent = this.dynamicTarget.createComponent(this.cell.getColumn().renderComponent);
            Object.assign(this.customComponent.instance, this.getPatch());
            const onComponentInitFunction = this.cell.getColumn().getOnComponentInitFunction();
            onComponentInitFunction && onComponentInitFunction(this.customComponent.instance, this.getPatch());
        }
    }
    ngOnDestroy() {
        this.customComponent.destroy();
    }
    getPatch() {
        return {
            value: this.cell.getValue(),
            rowData: this.cell.getRow().getData()
        };
    }
}
CustomViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CustomViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CustomViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CustomViewComponent, selector: "custom-view-component", inputs: { cell: "cell" }, viewQueries: [{ propertyName: "dynamicTarget", first: true, predicate: ["dynamicTarget"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <ng-template #dynamicTarget></ng-template>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CustomViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'custom-view-component',
                    template: `
    <ng-template #dynamicTarget></ng-template>
  `,
                }]
        }], propDecorators: { cell: [{
                type: Input
            }], dynamicTarget: [{
                type: ViewChild,
                args: ['dynamicTarget', { read: ViewContainerRef, static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL2NlbGwvY2VsbC12aWV3LW1vZGUvY3VzdG9tLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFxQixTQUFTLEVBQUUsZ0JBQWdCLEdBQUUsTUFBTSxlQUFlLENBQUM7O0FBV2hHLE1BQU0sT0FBTyxtQkFBbUI7SUFNOUIsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2pHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7WUFDOUQsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixFQUFFLENBQUM7WUFDbkYsdUJBQXVCLElBQUksdUJBQXVCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7U0FDcEc7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakMsQ0FBQztJQUVTLFFBQVE7UUFDaEIsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUU7U0FDdEMsQ0FBQTtJQUNILENBQUM7O2lIQXhCVSxtQkFBbUI7cUdBQW5CLG1CQUFtQixrTEFJTSxnQkFBZ0IsMkNBUjFDOztHQUVUOzRGQUVVLG1CQUFtQjtrQkFOL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxRQUFRLEVBQUU7O0dBRVQ7aUJBQ0Y7OEJBSVUsSUFBSTtzQkFBWixLQUFLO2dCQUNnRSxhQUFhO3NCQUFsRixTQUFTO3VCQUFDLGVBQWUsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmLH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7Q2VsbH0gZnJvbSAnLi4vLi4vLi4vbGliL2RhdGEtc2V0L2NlbGwnO1xuaW1wb3J0IHtWaWV3Q2VsbH0gZnJvbSAnLi92aWV3LWNlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjdXN0b20tdmlldy1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZy10ZW1wbGF0ZSAjZHluYW1pY1RhcmdldD48L25nLXRlbXBsYXRlPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDdXN0b21WaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIGN1c3RvbUNvbXBvbmVudDogYW55O1xuICBASW5wdXQoKSBjZWxsITogQ2VsbDtcbiAgQFZpZXdDaGlsZCgnZHluYW1pY1RhcmdldCcsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiB0cnVlIH0pIGR5bmFtaWNUYXJnZXQhOiBWaWV3Q29udGFpbmVyUmVmO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmNlbGwgJiYgIXRoaXMuY3VzdG9tQ29tcG9uZW50KSB7XG4gICAgICB0aGlzLmN1c3RvbUNvbXBvbmVudCA9IHRoaXMuZHluYW1pY1RhcmdldC5jcmVhdGVDb21wb25lbnQodGhpcy5jZWxsLmdldENvbHVtbigpLnJlbmRlckNvbXBvbmVudCk7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuY3VzdG9tQ29tcG9uZW50Lmluc3RhbmNlLCB0aGlzLmdldFBhdGNoKCkpO1xuICAgICAgY29uc3Qgb25Db21wb25lbnRJbml0RnVuY3Rpb24gPSB0aGlzLmNlbGwuZ2V0Q29sdW1uKCkuZ2V0T25Db21wb25lbnRJbml0RnVuY3Rpb24oKTtcbiAgICAgIG9uQ29tcG9uZW50SW5pdEZ1bmN0aW9uICYmIG9uQ29tcG9uZW50SW5pdEZ1bmN0aW9uKHRoaXMuY3VzdG9tQ29tcG9uZW50Lmluc3RhbmNlLCB0aGlzLmdldFBhdGNoKCkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuY3VzdG9tQ29tcG9uZW50LmRlc3Ryb3koKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQYXRjaCgpOiBWaWV3Q2VsbCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB0aGlzLmNlbGwuZ2V0VmFsdWUoKSxcbiAgICAgIHJvd0RhdGE6IHRoaXMuY2VsbC5nZXRSb3coKS5nZXREYXRhKClcbiAgICB9XG4gIH1cbn1cbiJdfQ==