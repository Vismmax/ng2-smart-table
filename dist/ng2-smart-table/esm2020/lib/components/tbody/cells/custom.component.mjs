import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Row } from '../../../lib/data-set/row';
import { Grid } from '../../../lib/grid';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class TbodyCustomComponent {
    constructor() {
        this.custom = new EventEmitter();
    }
    onCustom(action, event) {
        event.preventDefault();
        event.stopPropagation();
        this.custom.emit({
            action: action.name,
            data: this.row.getData(),
            source: this.source
        });
    }
}
TbodyCustomComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TbodyCustomComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TbodyCustomComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: TbodyCustomComponent, selector: "ng2-st-tbody-custom", inputs: { grid: "grid", row: "row", source: "source" }, outputs: { custom: "custom" }, ngImport: i0, template: `
      <a *ngFor="let action of grid.getSetting('actions.custom')" href="#"
         class="ng2-smart-action ng2-smart-action-custom-custom" 
         [innerHTML]="action.title"
         (click)="onCustom(action, $event)"></a>
        `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TbodyCustomComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ng2-st-tbody-custom',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
      <a *ngFor="let action of grid.getSetting('actions.custom')" href="#"
         class="ng2-smart-action ng2-smart-action-custom-custom" 
         [innerHTML]="action.title"
         (click)="onCustom(action, $event)"></a>
        `
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], source: [{
                type: Input
            }], custom: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL25nMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvdGJvZHkvY2VsbHMvY3VzdG9tLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUVoRCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7OztBQVl6QyxNQUFNLE9BQU8sb0JBQW9CO0lBVmpDO1FBZWMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7S0FhOUM7SUFYRyxRQUFRLENBQUMsTUFBVyxFQUFFLEtBQVU7UUFDNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNuQixJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3RCLENBQUMsQ0FBQztJQUNQLENBQUM7O2tIQWhCUSxvQkFBb0I7c0dBQXBCLG9CQUFvQixrSkFQbkI7Ozs7O1NBS0w7NEZBRUksb0JBQW9CO2tCQVZoQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxxQkFBcUI7b0JBQy9CLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUU7Ozs7O1NBS0w7aUJBQ1I7OEJBR1ksSUFBSTtzQkFBWixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0ksTUFBTTtzQkFBZixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3cgfSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zZXQvcm93JztcblxuaW1wb3J0IHsgR3JpZCB9IGZyb20gJy4uLy4uLy4uL2xpYi9ncmlkJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICduZzItc3QtdGJvZHktY3VzdG9tJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgPGEgKm5nRm9yPVwibGV0IGFjdGlvbiBvZiBncmlkLmdldFNldHRpbmcoJ2FjdGlvbnMuY3VzdG9tJylcIiBocmVmPVwiI1wiXG4gICAgICAgICBjbGFzcz1cIm5nMi1zbWFydC1hY3Rpb24gbmcyLXNtYXJ0LWFjdGlvbi1jdXN0b20tY3VzdG9tXCIgXG4gICAgICAgICBbaW5uZXJIVE1MXT1cImFjdGlvbi50aXRsZVwiXG4gICAgICAgICAoY2xpY2spPVwib25DdXN0b20oYWN0aW9uLCAkZXZlbnQpXCI+PC9hPlxuICAgICAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRib2R5Q3VzdG9tQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGdyaWQ6IEdyaWQ7XG4gICAgQElucHV0KCkgcm93OiBSb3c7XG4gICAgQElucHV0KCkgc291cmNlOiBhbnk7XG4gICAgQE91dHB1dCgpIGN1c3RvbSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgb25DdXN0b20oYWN0aW9uOiBhbnksIGV2ZW50OiBhbnkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICAgdGhpcy5jdXN0b20uZW1pdCh7XG4gICAgICAgICAgICBhY3Rpb246IGFjdGlvbi5uYW1lLFxuICAgICAgICAgICAgZGF0YTogdGhpcy5yb3cuZ2V0RGF0YSgpLFxuICAgICAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZVxuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiJdfQ==