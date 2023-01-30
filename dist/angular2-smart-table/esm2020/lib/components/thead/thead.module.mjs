import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterModule } from '../filter/filter.module';
import { CellModule } from '../cell/cell.module';
import { NgxSmartTableTheadComponent } from './thead.component';
import { TheadCreateCancelComponent } from './cells/create-cancel.component';
import { ActionsTitleComponent } from './cells/actions-title.component';
import { AddButtonComponent } from './cells/add-button.component';
import { ColumnTitleComponent } from './cells/column-title.component';
import { TitleComponent } from './cells/title/title.component';
import { TheadFitlersRowComponent } from './rows/thead-filters-row.component';
import { TheadFormRowComponent } from './rows/thead-form-row.component';
import { TheadTitlesRowComponent } from './rows/thead-titles-row.component';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import * as i0 from "@angular/core";
const THEAD_COMPONENTS = [
    TheadCreateCancelComponent,
    ActionsTitleComponent,
    AddButtonComponent,
    ColumnTitleComponent,
    TitleComponent,
    TheadFitlersRowComponent,
    TheadFormRowComponent,
    TheadTitlesRowComponent,
    NgxSmartTableTheadComponent
];
export class THeadModule {
}
THeadModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: THeadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
THeadModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: THeadModule, declarations: [TheadCreateCancelComponent,
        ActionsTitleComponent,
        AddButtonComponent,
        ColumnTitleComponent,
        TitleComponent,
        TheadFitlersRowComponent,
        TheadFormRowComponent,
        TheadTitlesRowComponent,
        NgxSmartTableTheadComponent], imports: [CommonModule,
        FormsModule,
        FilterModule,
        CellModule,
        DirectivesModule,
        PipesModule], exports: [TheadCreateCancelComponent,
        ActionsTitleComponent,
        AddButtonComponent,
        ColumnTitleComponent,
        TitleComponent,
        TheadFitlersRowComponent,
        TheadFormRowComponent,
        TheadTitlesRowComponent,
        NgxSmartTableTheadComponent] });
THeadModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: THeadModule, imports: [[
            CommonModule,
            FormsModule,
            FilterModule,
            CellModule,
            DirectivesModule,
            PipesModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: THeadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        FilterModule,
                        CellModule,
                        DirectivesModule,
                        PipesModule
                    ],
                    declarations: [
                        ...THEAD_COMPONENTS,
                    ],
                    exports: [
                        ...THEAD_COMPONENTS,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3RoZWFkL3RoZWFkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUUvQyxPQUFPLEVBQUMsMkJBQTJCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUM5RCxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDNUUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDdEUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDcEUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDBCQUEwQixDQUFDOztBQUVyRCxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLDBCQUEwQjtJQUMxQixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLG9CQUFvQjtJQUNwQixjQUFjO0lBQ2Qsd0JBQXdCO0lBQ3hCLHFCQUFxQjtJQUNyQix1QkFBdUI7SUFDdkIsMkJBQTJCO0NBQzVCLENBQUM7QUFrQkYsTUFBTSxPQUFPLFdBQVc7O3lHQUFYLFdBQVc7MEdBQVgsV0FBVyxpQkEzQnRCLDBCQUEwQjtRQUMxQixxQkFBcUI7UUFDckIsa0JBQWtCO1FBQ2xCLG9CQUFvQjtRQUNwQixjQUFjO1FBQ2Qsd0JBQXdCO1FBQ3hCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsMkJBQTJCLGFBS3JCLFlBQVk7UUFDWixXQUFXO1FBQ1gsWUFBWTtRQUNaLFVBQVU7UUFDVixnQkFBZ0I7UUFDaEIsV0FBVyxhQWxCakIsMEJBQTBCO1FBQzFCLHFCQUFxQjtRQUNyQixrQkFBa0I7UUFDbEIsb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCx3QkFBd0I7UUFDeEIscUJBQXFCO1FBQ3JCLHVCQUF1QjtRQUN2QiwyQkFBMkI7MEdBbUJoQixXQUFXLFlBZlg7WUFDTCxZQUFZO1lBQ1osV0FBVztZQUNYLFlBQVk7WUFDWixVQUFVO1lBQ1YsZ0JBQWdCO1lBQ2hCLFdBQVc7U0FDZDs0RkFRUSxXQUFXO2tCQWhCdkIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osVUFBVTt3QkFDVixnQkFBZ0I7d0JBQ2hCLFdBQVc7cUJBQ2Q7b0JBQ0gsWUFBWSxFQUFFO3dCQUNaLEdBQUcsZ0JBQWdCO3FCQUNwQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsR0FBRyxnQkFBZ0I7cUJBQ3BCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7Rm9ybXNNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtGaWx0ZXJNb2R1bGV9IGZyb20gJy4uL2ZpbHRlci9maWx0ZXIubW9kdWxlJztcbmltcG9ydCB7Q2VsbE1vZHVsZX0gZnJvbSAnLi4vY2VsbC9jZWxsLm1vZHVsZSc7XG5cbmltcG9ydCB7Tmd4U21hcnRUYWJsZVRoZWFkQ29tcG9uZW50fSBmcm9tICcuL3RoZWFkLmNvbXBvbmVudCc7XG5pbXBvcnQge1RoZWFkQ3JlYXRlQ2FuY2VsQ29tcG9uZW50fSBmcm9tICcuL2NlbGxzL2NyZWF0ZS1jYW5jZWwuY29tcG9uZW50JztcbmltcG9ydCB7QWN0aW9uc1RpdGxlQ29tcG9uZW50fSBmcm9tICcuL2NlbGxzL2FjdGlvbnMtdGl0bGUuY29tcG9uZW50JztcbmltcG9ydCB7QWRkQnV0dG9uQ29tcG9uZW50fSBmcm9tICcuL2NlbGxzL2FkZC1idXR0b24uY29tcG9uZW50JztcbmltcG9ydCB7Q29sdW1uVGl0bGVDb21wb25lbnR9IGZyb20gJy4vY2VsbHMvY29sdW1uLXRpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQge1RpdGxlQ29tcG9uZW50fSBmcm9tICcuL2NlbGxzL3RpdGxlL3RpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQge1RoZWFkRml0bGVyc1Jvd0NvbXBvbmVudH0gZnJvbSAnLi9yb3dzL3RoZWFkLWZpbHRlcnMtcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge1RoZWFkRm9ybVJvd0NvbXBvbmVudH0gZnJvbSAnLi9yb3dzL3RoZWFkLWZvcm0tcm93LmNvbXBvbmVudCc7XG5pbXBvcnQge1RoZWFkVGl0bGVzUm93Q29tcG9uZW50fSBmcm9tICcuL3Jvd3MvdGhlYWQtdGl0bGVzLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHtEaXJlY3RpdmVzTW9kdWxlfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2RpcmVjdGl2ZXMubW9kdWxlJztcbmltcG9ydCB7UGlwZXNNb2R1bGV9IGZyb20gJy4uLy4uL3BpcGVzL3BpcGVzLm1vZHVsZSc7XG5cbmNvbnN0IFRIRUFEX0NPTVBPTkVOVFMgPSBbXG4gIFRoZWFkQ3JlYXRlQ2FuY2VsQ29tcG9uZW50LFxuICBBY3Rpb25zVGl0bGVDb21wb25lbnQsXG4gIEFkZEJ1dHRvbkNvbXBvbmVudCxcbiAgQ29sdW1uVGl0bGVDb21wb25lbnQsXG4gIFRpdGxlQ29tcG9uZW50LFxuICBUaGVhZEZpdGxlcnNSb3dDb21wb25lbnQsXG4gIFRoZWFkRm9ybVJvd0NvbXBvbmVudCxcbiAgVGhlYWRUaXRsZXNSb3dDb21wb25lbnQsXG4gIE5neFNtYXJ0VGFibGVUaGVhZENvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIEZpbHRlck1vZHVsZSxcbiAgICAgICAgQ2VsbE1vZHVsZSxcbiAgICAgICAgRGlyZWN0aXZlc01vZHVsZSxcbiAgICAgICAgUGlwZXNNb2R1bGVcbiAgICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAuLi5USEVBRF9DT01QT05FTlRTLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLi4uVEhFQURfQ09NUE9ORU5UUyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVEhlYWRNb2R1bGUgeyB9XG4iXX0=