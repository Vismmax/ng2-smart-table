import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./custom-item.component";
import * as i2 from "@angular/common";
export class TbodyCustomComponent {
    constructor() {
        this.custom = new EventEmitter();
    }
    get customActions() {
        return this.grid.getSetting('actions.custom') ?? [];
    }
    onCustom(action, event) {
        event.preventDefault();
        event.stopPropagation();
        this.custom.emit({
            action: action.name,
            row: this.row,
            data: this.row.getData(),
            source: this.source,
        });
    }
}
TbodyCustomComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyCustomComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TbodyCustomComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TbodyCustomComponent, selector: "angular2-st-tbody-custom", inputs: { grid: "grid", row: "row", source: "source" }, outputs: { custom: "custom" }, ngImport: i0, template: `
    <ng-container *ngFor="let action of customActions">
      <a href="#" class="angular2-smart-action angular2-smart-action-custom-custom"
         *ngIf="!action.renderComponent"
         [innerHTML]="action.title"
         (click)="onCustom(action, $event)"></a>
      <a href="#" class="angular2-smart-action angular2-smart-action-custom-custom"
         *ngIf="action.renderComponent"
         (click)="onCustom(action, $event)">
        <angular2-st-tbody-custom-item class="angular2-smart-action angular2-smart-action-custom-custom"
                                  [action]="action"
                                  [row]="row"></angular2-st-tbody-custom-item>
      </a>

    </ng-container>
  `, isInline: true, components: [{ type: i1.TbodyCustomItemComponent, selector: "angular2-st-tbody-custom-item", inputs: ["action", "row"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyCustomComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-st-tbody-custom',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-container *ngFor="let action of customActions">
      <a href="#" class="angular2-smart-action angular2-smart-action-custom-custom"
         *ngIf="!action.renderComponent"
         [innerHTML]="action.title"
         (click)="onCustom(action, $event)"></a>
      <a href="#" class="angular2-smart-action angular2-smart-action-custom-custom"
         *ngIf="action.renderComponent"
         (click)="onCustom(action, $event)">
        <angular2-st-tbody-custom-item class="angular2-smart-action angular2-smart-action-custom-custom"
                                  [action]="action"
                                  [row]="row"></angular2-st-tbody-custom-item>
      </a>

    </ng-container>
  `,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy90Ym9keS9jZWxscy9jdXN0b20uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7QUEyQjlGLE1BQU0sT0FBTyxvQkFBb0I7SUFwQmpDO1FBeUJZLFdBQU0sR0FBRyxJQUFJLFlBQVksRUFBcUIsQ0FBQztLQWtCMUQ7SUFoQkMsSUFBSSxhQUFhO1FBQ2YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQsUUFBUSxDQUFDLE1BQW9CLEVBQUUsS0FBaUI7UUFDOUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNmLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNuQixHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7WUFDeEIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztJQUNMLENBQUM7O2tIQXJCVSxvQkFBb0I7c0dBQXBCLG9CQUFvQix1SkFqQnJCOzs7Ozs7Ozs7Ozs7Ozs7R0FlVDs0RkFFVSxvQkFBb0I7a0JBcEJoQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSwwQkFBMEI7b0JBQ3BDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO2lCQUNGOzhCQUdVLElBQUk7c0JBQVosS0FBSztnQkFDRyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNJLE1BQU07c0JBQWYsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Um93fSBmcm9tICcuLi8uLi8uLi9saWIvZGF0YS1zZXQvcm93JztcblxuaW1wb3J0IHtHcmlkfSBmcm9tICcuLi8uLi8uLi9saWIvZ3JpZCc7XG5pbXBvcnQge0N1c3RvbUFjdGlvbn0gZnJvbSAnLi4vLi4vLi4vbGliL3NldHRpbmdzJztcbmltcG9ydCB7Q3VzdG9tQWN0aW9uRXZlbnR9IGZyb20gJy4uLy4uLy4uL2xpYi9ldmVudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbmd1bGFyMi1zdC10Ym9keS1jdXN0b20nLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBhY3Rpb24gb2YgY3VzdG9tQWN0aW9uc1wiPlxuICAgICAgPGEgaHJlZj1cIiNcIiBjbGFzcz1cImFuZ3VsYXIyLXNtYXJ0LWFjdGlvbiBhbmd1bGFyMi1zbWFydC1hY3Rpb24tY3VzdG9tLWN1c3RvbVwiXG4gICAgICAgICAqbmdJZj1cIiFhY3Rpb24ucmVuZGVyQ29tcG9uZW50XCJcbiAgICAgICAgIFtpbm5lckhUTUxdPVwiYWN0aW9uLnRpdGxlXCJcbiAgICAgICAgIChjbGljayk9XCJvbkN1c3RvbShhY3Rpb24sICRldmVudClcIj48L2E+XG4gICAgICA8YSBocmVmPVwiI1wiIGNsYXNzPVwiYW5ndWxhcjItc21hcnQtYWN0aW9uIGFuZ3VsYXIyLXNtYXJ0LWFjdGlvbi1jdXN0b20tY3VzdG9tXCJcbiAgICAgICAgICpuZ0lmPVwiYWN0aW9uLnJlbmRlckNvbXBvbmVudFwiXG4gICAgICAgICAoY2xpY2spPVwib25DdXN0b20oYWN0aW9uLCAkZXZlbnQpXCI+XG4gICAgICAgIDxhbmd1bGFyMi1zdC10Ym9keS1jdXN0b20taXRlbSBjbGFzcz1cImFuZ3VsYXIyLXNtYXJ0LWFjdGlvbiBhbmd1bGFyMi1zbWFydC1hY3Rpb24tY3VzdG9tLWN1c3RvbVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2FjdGlvbl09XCJhY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtyb3ddPVwicm93XCI+PC9hbmd1bGFyMi1zdC10Ym9keS1jdXN0b20taXRlbT5cbiAgICAgIDwvYT5cblxuICAgIDwvbmctY29udGFpbmVyPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUYm9keUN1c3RvbUNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgZ3JpZCE6IEdyaWQ7XG4gIEBJbnB1dCgpIHJvdyE6IFJvdztcbiAgQElucHV0KCkgc291cmNlOiBhbnk7XG4gIEBPdXRwdXQoKSBjdXN0b20gPSBuZXcgRXZlbnRFbWl0dGVyPEN1c3RvbUFjdGlvbkV2ZW50PigpO1xuXG4gIGdldCBjdXN0b21BY3Rpb25zKCk6IEN1c3RvbUFjdGlvbltdIHtcbiAgICByZXR1cm4gdGhpcy5ncmlkLmdldFNldHRpbmcoJ2FjdGlvbnMuY3VzdG9tJykgPz8gW107XG4gIH1cblxuICBvbkN1c3RvbShhY3Rpb246IEN1c3RvbUFjdGlvbiwgZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgdGhpcy5jdXN0b20uZW1pdCh7XG4gICAgICBhY3Rpb246IGFjdGlvbi5uYW1lLFxuICAgICAgcm93OiB0aGlzLnJvdyxcbiAgICAgIGRhdGE6IHRoaXMucm93LmdldERhdGEoKSxcbiAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgfSk7XG4gIH1cblxufVxuIl19