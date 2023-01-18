import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CellModule } from '../cell/cell.module';
import { Ng2SmartTableTbodyComponent } from './tbody.component';
import { TbodyCreateCancelComponent } from './cells/create-cancel.component';
import { TbodyEditDeleteComponent } from './cells/edit-delete.component';
import { TbodyCustomComponent } from './cells/custom.component';
import * as i0 from "@angular/core";
const TBODY_COMPONENTS = [
    TbodyCreateCancelComponent,
    TbodyEditDeleteComponent,
    TbodyCustomComponent,
    Ng2SmartTableTbodyComponent
];
export class TBodyModule {
}
TBodyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TBodyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TBodyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: TBodyModule, declarations: [TbodyCreateCancelComponent,
        TbodyEditDeleteComponent,
        TbodyCustomComponent,
        Ng2SmartTableTbodyComponent], imports: [CommonModule,
        FormsModule,
        CellModule], exports: [TbodyCreateCancelComponent,
        TbodyEditDeleteComponent,
        TbodyCustomComponent,
        Ng2SmartTableTbodyComponent] });
TBodyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TBodyModule, imports: [CommonModule,
        FormsModule,
        CellModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: TBodyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        CellModule,
                    ],
                    declarations: [
                        ...TBODY_COMPONENTS,
                    ],
                    exports: [
                        ...TBODY_COMPONENTS,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJvZHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmcyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy90Ym9keS90Ym9keS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUVqRCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFaEUsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QiwwQkFBMEI7SUFDMUIsd0JBQXdCO0lBQ3hCLG9CQUFvQjtJQUNwQiwyQkFBMkI7Q0FDNUIsQ0FBQztBQWVGLE1BQU0sT0FBTyxXQUFXOzt5R0FBWCxXQUFXOzBHQUFYLFdBQVcsaUJBbkJ0QiwwQkFBMEI7UUFDMUIsd0JBQXdCO1FBQ3hCLG9CQUFvQjtRQUNwQiwyQkFBMkIsYUFLekIsWUFBWTtRQUNaLFdBQVc7UUFDWCxVQUFVLGFBVlosMEJBQTBCO1FBQzFCLHdCQUF3QjtRQUN4QixvQkFBb0I7UUFDcEIsMkJBQTJCOzBHQWdCaEIsV0FBVyxZQVhwQixZQUFZO1FBQ1osV0FBVztRQUNYLFVBQVU7NEZBU0QsV0FBVztrQkFidkIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFVBQVU7cUJBQ1g7b0JBQ0QsWUFBWSxFQUFFO3dCQUNaLEdBQUcsZ0JBQWdCO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsR0FBRyxnQkFBZ0I7cUJBQ3BCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ2VsbE1vZHVsZSB9IGZyb20gJy4uL2NlbGwvY2VsbC5tb2R1bGUnO1xuXG5pbXBvcnQgeyBOZzJTbWFydFRhYmxlVGJvZHlDb21wb25lbnQgfSBmcm9tICcuL3Rib2R5LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYm9keUNyZWF0ZUNhbmNlbENvbXBvbmVudCB9IGZyb20gJy4vY2VsbHMvY3JlYXRlLWNhbmNlbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGJvZHlFZGl0RGVsZXRlQ29tcG9uZW50IH0gZnJvbSAnLi9jZWxscy9lZGl0LWRlbGV0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGJvZHlDdXN0b21Db21wb25lbnQgfSBmcm9tICcuL2NlbGxzL2N1c3RvbS5jb21wb25lbnQnO1xuXG5jb25zdCBUQk9EWV9DT01QT05FTlRTID0gW1xuICBUYm9keUNyZWF0ZUNhbmNlbENvbXBvbmVudCxcbiAgVGJvZHlFZGl0RGVsZXRlQ29tcG9uZW50LFxuICBUYm9keUN1c3RvbUNvbXBvbmVudCxcbiAgTmcyU21hcnRUYWJsZVRib2R5Q29tcG9uZW50XG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIENlbGxNb2R1bGUsXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIC4uLlRCT0RZX0NPTVBPTkVOVFMsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAuLi5UQk9EWV9DT01QT05FTlRTLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBUQm9keU1vZHVsZSB7IH1cbiJdfQ==