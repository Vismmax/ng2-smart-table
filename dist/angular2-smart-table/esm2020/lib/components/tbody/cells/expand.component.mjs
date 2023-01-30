import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../../../pipes/bypass-security-trust.pipe";
export class TbodyExpandRowComponent {
    constructor() {
        this.onExpandRow = new EventEmitter();
        this.bypassSecurityTrust = 'none';
        this.hiddenWhenFunction = (_) => false;
        this.disabledWhenFunction = (_) => false;
    }
    get visible() {
        return !this.hiddenWhenFunction(this.row);
    }
    get disabled() {
        return this.disabledWhenFunction(this.row);
    }
    onExpand(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.disabled) {
            this.onExpandRow.emit(this.row);
        }
    }
    ngOnChanges() {
        this.buttonContent = this.grid.settings.expand?.buttonContent ?? this.grid.settings.expand?.expandRowButtonContent ?? 'Expand';
        this.bypassSecurityTrust = this.grid.settings.expand?.sanitizer?.bypassHtml ? 'html' : 'none';
        this.hiddenWhenFunction = this.grid.settings.expand?.hiddenWhen ?? this.hiddenWhenFunction;
        this.disabledWhenFunction = this.grid.settings.expand?.disabledWhen ?? this.disabledWhenFunction;
    }
}
TbodyExpandRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyExpandRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TbodyExpandRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TbodyExpandRowComponent, selector: "angular2-st-tbody-expand", inputs: { grid: "grid", row: "row" }, outputs: { onExpandRow: "onExpandRow" }, usesOnChanges: true, ngImport: i0, template: `
      <a *ngIf="visible" href="#" class="angular2-smart-action angular2-smart-action-expand-expand"
         [ngClass]="{'not-allowed': disabled}"
         [innerHTML]="buttonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onExpand($event)"></a>
    `, isInline: true, directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "bypassSecurityTrust": i2.BypassSecurityTrustPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyExpandRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-st-tbody-expand',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
      <a *ngIf="visible" href="#" class="angular2-smart-action angular2-smart-action-expand-expand"
         [ngClass]="{'not-allowed': disabled}"
         [innerHTML]="buttonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onExpand($event)"></a>
    `,
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], onExpandRow: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy90Ym9keS9jZWxscy9leHBhbmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyx1QkFBdUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7Ozs7QUFjdkcsTUFBTSxPQUFPLHVCQUF1QjtJQWFsQztRQVJVLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUdoRCx3QkFBbUIsR0FBc0IsTUFBTSxDQUFDO1FBRWhELHVCQUFrQixHQUEwQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ3pELHlCQUFvQixHQUEwQixDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDO0lBRzNELENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBVTtRQUNmLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQUdELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxhQUFhLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLHNCQUFzQixJQUFJLFFBQVEsQ0FBQztRQUMvSCxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO1FBRTlGLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsVUFBVSxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUMzRixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLFlBQVksSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDckcsQ0FBQzs7cUhBdkNVLHVCQUF1Qjt5R0FBdkIsdUJBQXVCLG9LQU54Qjs7OztLQUlUOzRGQUVVLHVCQUF1QjtrQkFUckMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7O0tBSVQ7aUJBQ0Y7MEVBR1UsSUFBSTtzQkFBWixLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFFSSxXQUFXO3NCQUFwQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkNoYW5nZXMsIE91dHB1dH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7Um93fSBmcm9tIFwiLi4vLi4vLi4vbGliL2RhdGEtc2V0L3Jvd1wiO1xuaW1wb3J0IHtHcmlkfSBmcm9tIFwiLi4vLi4vLi4vbGliL2dyaWRcIjtcbmltcG9ydCB7U2VjdXJpdHlUcnVzdFR5cGV9IGZyb20gJy4uLy4uLy4uL3BpcGVzL2J5cGFzcy1zZWN1cml0eS10cnVzdC5waXBlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhbmd1bGFyMi1zdC10Ym9keS1leHBhbmQnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICA8YSAqbmdJZj1cInZpc2libGVcIiBocmVmPVwiI1wiIGNsYXNzPVwiYW5ndWxhcjItc21hcnQtYWN0aW9uIGFuZ3VsYXIyLXNtYXJ0LWFjdGlvbi1leHBhbmQtZXhwYW5kXCJcbiAgICAgICAgIFtuZ0NsYXNzXT1cInsnbm90LWFsbG93ZWQnOiBkaXNhYmxlZH1cIlxuICAgICAgICAgW2lubmVySFRNTF09XCJidXR0b25Db250ZW50IHwgYnlwYXNzU2VjdXJpdHlUcnVzdDogYnlwYXNzU2VjdXJpdHlUcnVzdFwiIChjbGljayk9XCJvbkV4cGFuZCgkZXZlbnQpXCI+PC9hPlxuICAgIGAsXG4gIH0pXG4gIGV4cG9ydCBjbGFzcyBUYm9keUV4cGFuZFJvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKSBncmlkITogR3JpZDtcbiAgICBASW5wdXQoKSByb3chOiBSb3c7XG5cbiAgICBAT3V0cHV0KCkgb25FeHBhbmRSb3cgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGJ1dHRvbkNvbnRlbnQhOiBzdHJpbmc7XG4gICAgYnlwYXNzU2VjdXJpdHlUcnVzdDogU2VjdXJpdHlUcnVzdFR5cGUgPSAnbm9uZSc7XG5cbiAgICBoaWRkZW5XaGVuRnVuY3Rpb246IChyb3c6IFJvdykgPT4gYm9vbGVhbiA9IChfKSA9PiBmYWxzZTtcbiAgICBkaXNhYmxlZFdoZW5GdW5jdGlvbjogKHJvdzogUm93KSA9PiBib29sZWFuID0gKF8pID0+IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICB9XG5cbiAgICBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiAhdGhpcy5oaWRkZW5XaGVuRnVuY3Rpb24odGhpcy5yb3cpO1xuICAgIH1cblxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLmRpc2FibGVkV2hlbkZ1bmN0aW9uKHRoaXMucm93KTtcbiAgICB9XG5cbiAgICBvbkV4cGFuZChldmVudDogYW55KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICB0aGlzLm9uRXhwYW5kUm93LmVtaXQodGhpcy5yb3cpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5idXR0b25Db250ZW50ID0gdGhpcy5ncmlkLnNldHRpbmdzLmV4cGFuZD8uYnV0dG9uQ29udGVudCA/PyB0aGlzLmdyaWQuc2V0dGluZ3MuZXhwYW5kPy5leHBhbmRSb3dCdXR0b25Db250ZW50ID8/ICdFeHBhbmQnO1xuICAgICAgICB0aGlzLmJ5cGFzc1NlY3VyaXR5VHJ1c3QgPSB0aGlzLmdyaWQuc2V0dGluZ3MuZXhwYW5kPy5zYW5pdGl6ZXI/LmJ5cGFzc0h0bWwgPyAnaHRtbCcgOiAnbm9uZSc7XG5cbiAgICAgICAgdGhpcy5oaWRkZW5XaGVuRnVuY3Rpb24gPSB0aGlzLmdyaWQuc2V0dGluZ3MuZXhwYW5kPy5oaWRkZW5XaGVuID8/IHRoaXMuaGlkZGVuV2hlbkZ1bmN0aW9uO1xuICAgICAgICB0aGlzLmRpc2FibGVkV2hlbkZ1bmN0aW9uID0gdGhpcy5ncmlkLnNldHRpbmdzLmV4cGFuZD8uZGlzYWJsZWRXaGVuID8/IHRoaXMuZGlzYWJsZWRXaGVuRnVuY3Rpb247XG4gICAgfVxuICB9XG4iXX0=