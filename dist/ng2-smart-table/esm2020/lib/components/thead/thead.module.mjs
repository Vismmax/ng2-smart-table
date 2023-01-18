import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterModule } from '../filter/filter.module';
import { CellModule } from '../cell/cell.module';
import { Ng2SmartTableTheadComponent } from './thead.component';
import { ActionsComponent } from './cells/actions.component';
import { ActionsTitleComponent } from './cells/actions-title.component';
import { AddButtonComponent } from './cells/add-button.component';
import { CheckboxSelectAllComponent } from './cells/checkbox-select-all.component';
import { ColumnTitleComponent } from './cells/column-title.component';
import { TitleComponent } from './cells/title/title.component';
import { TheadFitlersRowComponent } from './rows/thead-filters-row.component';
import { TheadFormRowComponent } from './rows/thead-form-row.component';
import { TheadTitlesRowComponent } from './rows/thead-titles-row.component';
import * as i0 from "@angular/core";
const THEAD_COMPONENTS = [
    ActionsComponent,
    ActionsTitleComponent,
    AddButtonComponent,
    CheckboxSelectAllComponent,
    ColumnTitleComponent,
    TitleComponent,
    TheadFitlersRowComponent,
    TheadFormRowComponent,
    TheadTitlesRowComponent,
    Ng2SmartTableTheadComponent,
];
export class THeadModule {
}
THeadModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: THeadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
THeadModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.12", ngImport: i0, type: THeadModule, declarations: [ActionsComponent,
        ActionsTitleComponent,
        AddButtonComponent,
        CheckboxSelectAllComponent,
        ColumnTitleComponent,
        TitleComponent,
        TheadFitlersRowComponent,
        TheadFormRowComponent,
        TheadTitlesRowComponent,
        Ng2SmartTableTheadComponent], imports: [CommonModule,
        FormsModule,
        FilterModule,
        CellModule], exports: [ActionsComponent,
        ActionsTitleComponent,
        AddButtonComponent,
        CheckboxSelectAllComponent,
        ColumnTitleComponent,
        TitleComponent,
        TheadFitlersRowComponent,
        TheadFormRowComponent,
        TheadTitlesRowComponent,
        Ng2SmartTableTheadComponent] });
THeadModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: THeadModule, imports: [CommonModule,
        FormsModule,
        FilterModule,
        CellModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: THeadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        FilterModule,
                        CellModule,
                    ],
                    declarations: [
                        ...THEAD_COMPONENTS,
                    ],
                    exports: [
                        ...THEAD_COMPONENTS,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlYWQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbmcyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy90aGVhZC90aGVhZC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFakQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDbkYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQy9ELE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOztBQUU1RSxNQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLGdCQUFnQjtJQUNoQixxQkFBcUI7SUFDckIsa0JBQWtCO0lBQ2xCLDBCQUEwQjtJQUMxQixvQkFBb0I7SUFDcEIsY0FBYztJQUNkLHdCQUF3QjtJQUN4QixxQkFBcUI7SUFDckIsdUJBQXVCO0lBQ3ZCLDJCQUEyQjtDQUM1QixDQUFDO0FBZ0JGLE1BQU0sT0FBTyxXQUFXOzt5R0FBWCxXQUFXOzBHQUFYLFdBQVcsaUJBMUJ0QixnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQiwwQkFBMEI7UUFDMUIsb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCx3QkFBd0I7UUFDeEIscUJBQXFCO1FBQ3JCLHVCQUF1QjtRQUN2QiwyQkFBMkIsYUFLekIsWUFBWTtRQUNaLFdBQVc7UUFDWCxZQUFZO1FBQ1osVUFBVSxhQWpCWixnQkFBZ0I7UUFDaEIscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQiwwQkFBMEI7UUFDMUIsb0JBQW9CO1FBQ3BCLGNBQWM7UUFDZCx3QkFBd0I7UUFDeEIscUJBQXFCO1FBQ3JCLHVCQUF1QjtRQUN2QiwyQkFBMkI7MEdBaUJoQixXQUFXLFlBWnBCLFlBQVk7UUFDWixXQUFXO1FBQ1gsWUFBWTtRQUNaLFVBQVU7NEZBU0QsV0FBVztrQkFkdkIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLFlBQVk7d0JBQ1osVUFBVTtxQkFDWDtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osR0FBRyxnQkFBZ0I7cUJBQ3BCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxHQUFHLGdCQUFnQjtxQkFDcEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBGaWx0ZXJNb2R1bGUgfSBmcm9tICcuLi9maWx0ZXIvZmlsdGVyLm1vZHVsZSc7XG5pbXBvcnQgeyBDZWxsTW9kdWxlIH0gZnJvbSAnLi4vY2VsbC9jZWxsLm1vZHVsZSc7XG5cbmltcG9ydCB7IE5nMlNtYXJ0VGFibGVUaGVhZENvbXBvbmVudCB9IGZyb20gJy4vdGhlYWQuY29tcG9uZW50JztcbmltcG9ydCB7IEFjdGlvbnNDb21wb25lbnQgfSBmcm9tICcuL2NlbGxzL2FjdGlvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IEFjdGlvbnNUaXRsZUNvbXBvbmVudCB9IGZyb20gJy4vY2VsbHMvYWN0aW9ucy10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWRkQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9jZWxscy9hZGQtYnV0dG9uLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDaGVja2JveFNlbGVjdEFsbENvbXBvbmVudCB9IGZyb20gJy4vY2VsbHMvY2hlY2tib3gtc2VsZWN0LWFsbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29sdW1uVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2NlbGxzL2NvbHVtbi10aXRsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGl0bGVDb21wb25lbnQgfSBmcm9tICcuL2NlbGxzL3RpdGxlL3RpdGxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUaGVhZEZpdGxlcnNSb3dDb21wb25lbnQgfSBmcm9tICcuL3Jvd3MvdGhlYWQtZmlsdGVycy1yb3cuY29tcG9uZW50JztcbmltcG9ydCB7IFRoZWFkRm9ybVJvd0NvbXBvbmVudCB9IGZyb20gJy4vcm93cy90aGVhZC1mb3JtLXJvdy5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGhlYWRUaXRsZXNSb3dDb21wb25lbnQgfSBmcm9tICcuL3Jvd3MvdGhlYWQtdGl0bGVzLXJvdy5jb21wb25lbnQnO1xuXG5jb25zdCBUSEVBRF9DT01QT05FTlRTID0gW1xuICBBY3Rpb25zQ29tcG9uZW50LFxuICBBY3Rpb25zVGl0bGVDb21wb25lbnQsXG4gIEFkZEJ1dHRvbkNvbXBvbmVudCxcbiAgQ2hlY2tib3hTZWxlY3RBbGxDb21wb25lbnQsXG4gIENvbHVtblRpdGxlQ29tcG9uZW50LFxuICBUaXRsZUNvbXBvbmVudCxcbiAgVGhlYWRGaXRsZXJzUm93Q29tcG9uZW50LFxuICBUaGVhZEZvcm1Sb3dDb21wb25lbnQsXG4gIFRoZWFkVGl0bGVzUm93Q29tcG9uZW50LFxuICBOZzJTbWFydFRhYmxlVGhlYWRDb21wb25lbnQsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEZpbHRlck1vZHVsZSxcbiAgICBDZWxsTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAuLi5USEVBRF9DT01QT05FTlRTLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLi4uVEhFQURfQ09NUE9ORU5UUyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgVEhlYWRNb2R1bGUgeyB9XG4iXX0=