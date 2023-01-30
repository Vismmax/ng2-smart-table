import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CellModule } from '../cell/cell.module';
import { NgxSmartTableTbodyComponent } from './tbody.component';
import { TbodySaveCancelComponent } from './cells/save-cancel.component';
import { TbodyEditDeleteComponent } from './cells/edit-delete.component';
import { TbodyCustomComponent } from './cells/custom.component';
import { TbodyExpandRowComponent } from './cells/expand.component';
import { TbodyCustomItemComponent } from './cells/custom-item.component';
import { PipesModule } from '../../pipes/pipes.module';
import * as i0 from "@angular/core";
const TBODY_COMPONENTS = [
    TbodySaveCancelComponent,
    TbodyEditDeleteComponent,
    TbodyCustomComponent,
    TbodyExpandRowComponent,
    TbodyCustomItemComponent,
    NgxSmartTableTbodyComponent
];
export class TBodyModule {
}
TBodyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TBodyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TBodyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TBodyModule, declarations: [TbodySaveCancelComponent,
        TbodyEditDeleteComponent,
        TbodyCustomComponent,
        TbodyExpandRowComponent,
        TbodyCustomItemComponent,
        NgxSmartTableTbodyComponent], imports: [CommonModule,
        FormsModule,
        CellModule,
        PipesModule], exports: [TbodySaveCancelComponent,
        TbodyEditDeleteComponent,
        TbodyCustomComponent,
        TbodyExpandRowComponent,
        TbodyCustomItemComponent,
        NgxSmartTableTbodyComponent] });
TBodyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TBodyModule, imports: [[
            CommonModule,
            FormsModule,
            CellModule,
            PipesModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TBodyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        CellModule,
                        PipesModule,
                    ],
                    declarations: [
                        ...TBODY_COMPONENTS,
                    ],
                    exports: [
                        ...TBODY_COMPONENTS,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGJvZHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3Rib2R5L3Rib2R5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRS9DLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ2pFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFckQsTUFBTSxnQkFBZ0IsR0FBRztJQUN2Qix3QkFBd0I7SUFDeEIsd0JBQXdCO0lBQ3hCLG9CQUFvQjtJQUNwQix1QkFBdUI7SUFDdkIsd0JBQXdCO0lBQ3hCLDJCQUEyQjtDQUM1QixDQUFDO0FBZ0JGLE1BQU0sT0FBTyxXQUFXOzt5R0FBWCxXQUFXOzBHQUFYLFdBQVcsaUJBdEJ0Qix3QkFBd0I7UUFDeEIsd0JBQXdCO1FBQ3hCLG9CQUFvQjtRQUNwQix1QkFBdUI7UUFDdkIsd0JBQXdCO1FBQ3hCLDJCQUEyQixhQUtyQixZQUFZO1FBQ1osV0FBVztRQUNYLFVBQVU7UUFDVixXQUFXLGFBYmpCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsb0JBQW9CO1FBQ3BCLHVCQUF1QjtRQUN2Qix3QkFBd0I7UUFDeEIsMkJBQTJCOzBHQWlCaEIsV0FBVyxZQWJYO1lBQ0wsWUFBWTtZQUNaLFdBQVc7WUFDWCxVQUFVO1lBQ1YsV0FBVztTQUNkOzRGQVFRLFdBQVc7a0JBZHZCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxVQUFVO3dCQUNWLFdBQVc7cUJBQ2Q7b0JBQ0gsWUFBWSxFQUFFO3dCQUNaLEdBQUcsZ0JBQWdCO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsR0FBRyxnQkFBZ0I7cUJBQ3BCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtDZWxsTW9kdWxlfSBmcm9tICcuLi9jZWxsL2NlbGwubW9kdWxlJztcblxuaW1wb3J0IHtOZ3hTbWFydFRhYmxlVGJvZHlDb21wb25lbnR9IGZyb20gJy4vdGJvZHkuY29tcG9uZW50JztcbmltcG9ydCB7VGJvZHlTYXZlQ2FuY2VsQ29tcG9uZW50fSBmcm9tICcuL2NlbGxzL3NhdmUtY2FuY2VsLmNvbXBvbmVudCc7XG5pbXBvcnQge1Rib2R5RWRpdERlbGV0ZUNvbXBvbmVudH0gZnJvbSAnLi9jZWxscy9lZGl0LWRlbGV0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHtUYm9keUN1c3RvbUNvbXBvbmVudH0gZnJvbSAnLi9jZWxscy9jdXN0b20uY29tcG9uZW50JztcbmltcG9ydCB7VGJvZHlFeHBhbmRSb3dDb21wb25lbnR9IGZyb20gJy4vY2VsbHMvZXhwYW5kLmNvbXBvbmVudCc7XG5pbXBvcnQge1Rib2R5Q3VzdG9tSXRlbUNvbXBvbmVudH0gZnJvbSAnLi9jZWxscy9jdXN0b20taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHtQaXBlc01vZHVsZX0gZnJvbSAnLi4vLi4vcGlwZXMvcGlwZXMubW9kdWxlJztcblxuY29uc3QgVEJPRFlfQ09NUE9ORU5UUyA9IFtcbiAgVGJvZHlTYXZlQ2FuY2VsQ29tcG9uZW50LFxuICBUYm9keUVkaXREZWxldGVDb21wb25lbnQsXG4gIFRib2R5Q3VzdG9tQ29tcG9uZW50LFxuICBUYm9keUV4cGFuZFJvd0NvbXBvbmVudCxcbiAgVGJvZHlDdXN0b21JdGVtQ29tcG9uZW50LFxuICBOZ3hTbWFydFRhYmxlVGJvZHlDb21wb25lbnRcbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBDZWxsTW9kdWxlLFxuICAgICAgICBQaXBlc01vZHVsZSxcbiAgICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAuLi5UQk9EWV9DT01QT05FTlRTLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLi4uVEJPRFlfQ09NUE9ORU5UUyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVEJvZHlNb2R1bGUgeyB9XG4iXX0=