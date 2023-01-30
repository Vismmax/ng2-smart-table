import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';
import { FilterComponent } from './filter.component';
import { DefaultFilterComponent } from "./default-filter.component";
import { CustomFilterComponent } from "./custom-filter.component";
import { CheckboxFilterComponent } from './filter-types/checkbox-filter.component';
import { CompleterFilterComponent } from './filter-types/completer-filter.component';
import { InputFilterComponent } from './filter-types/input-filter.component';
import { SelectFilterComponent } from './filter-types/select-filter.component';
import { DefaultFilter } from './filter-types/default-filter';
import { FilterDefault } from './filter-default';
import { DateFilterComponent } from './filter-types/date-filter.component';
import { MselectFilterComponent } from './filter-types/mselect-filter.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import * as i0 from "@angular/core";
const FILTER_COMPONENTS = [
    FilterDefault,
    DefaultFilter,
    FilterComponent,
    DateFilterComponent,
    DefaultFilterComponent,
    CustomFilterComponent,
    CheckboxFilterComponent,
    CompleterFilterComponent,
    InputFilterComponent,
    SelectFilterComponent,
    MselectFilterComponent
];
export class FilterModule {
}
FilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterModule, declarations: [FilterDefault,
        DefaultFilter,
        FilterComponent,
        DateFilterComponent,
        DefaultFilterComponent,
        CustomFilterComponent,
        CheckboxFilterComponent,
        CompleterFilterComponent,
        InputFilterComponent,
        SelectFilterComponent,
        MselectFilterComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2CompleterModule,
        AngularMultiSelectModule], exports: [FilterDefault,
        DefaultFilter,
        FilterComponent,
        DateFilterComponent,
        DefaultFilterComponent,
        CustomFilterComponent,
        CheckboxFilterComponent,
        CompleterFilterComponent,
        InputFilterComponent,
        SelectFilterComponent,
        MselectFilterComponent] });
FilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            Ng2CompleterModule,
            AngularMultiSelectModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        Ng2CompleterModule,
                        AngularMultiSelectModule
                    ],
                    declarations: [
                        ...FILTER_COMPONENTS,
                    ],
                    exports: [
                        ...FILTER_COMPONENTS,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9maWx0ZXIvZmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNsRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUNoRSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBQy9FLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtCQUErQixDQUFDOztBQUV2RSxNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLGFBQWE7SUFDYixhQUFhO0lBQ2IsZUFBZTtJQUNmLG1CQUFtQjtJQUNuQixzQkFBc0I7SUFDdEIscUJBQXFCO0lBQ3JCLHVCQUF1QjtJQUN2Qix3QkFBd0I7SUFDeEIsb0JBQW9CO0lBQ3BCLHFCQUFxQjtJQUNyQixzQkFBc0I7Q0FDdkIsQ0FBQztBQWlCRixNQUFNLE9BQU8sWUFBWTs7MEdBQVosWUFBWTsyR0FBWixZQUFZLGlCQTVCdkIsYUFBYTtRQUNiLGFBQWE7UUFDYixlQUFlO1FBQ2YsbUJBQW1CO1FBQ25CLHNCQUFzQjtRQUN0QixxQkFBcUI7UUFDckIsdUJBQXVCO1FBQ3ZCLHdCQUF3QjtRQUN4QixvQkFBb0I7UUFDcEIscUJBQXFCO1FBQ3JCLHNCQUFzQixhQUtwQixZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixrQkFBa0I7UUFDbEIsd0JBQXdCLGFBbkIxQixhQUFhO1FBQ2IsYUFBYTtRQUNiLGVBQWU7UUFDZixtQkFBbUI7UUFDbkIsc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsd0JBQXdCO1FBQ3hCLG9CQUFvQjtRQUNwQixxQkFBcUI7UUFDckIsc0JBQXNCOzJHQWtCWCxZQUFZLFlBZGQ7WUFDUCxZQUFZO1lBQ1osV0FBVztZQUNYLG1CQUFtQjtZQUNuQixrQkFBa0I7WUFDbEIsd0JBQXdCO1NBQ3pCOzRGQVFVLFlBQVk7a0JBZnhCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxtQkFBbUI7d0JBQ25CLGtCQUFrQjt3QkFDbEIsd0JBQXdCO3FCQUN6QjtvQkFDRCxZQUFZLEVBQUU7d0JBQ1osR0FBRyxpQkFBaUI7cUJBQ3JCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxHQUFHLGlCQUFpQjtxQkFDckI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtOZzJDb21wbGV0ZXJNb2R1bGV9IGZyb20gJ25nMi1jb21wbGV0ZXInO1xuXG5pbXBvcnQge0ZpbHRlckNvbXBvbmVudH0gZnJvbSAnLi9maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7RGVmYXVsdEZpbHRlckNvbXBvbmVudH0gZnJvbSBcIi4vZGVmYXVsdC1maWx0ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge0N1c3RvbUZpbHRlckNvbXBvbmVudH0gZnJvbSBcIi4vY3VzdG9tLWZpbHRlci5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2hlY2tib3hGaWx0ZXJDb21wb25lbnR9IGZyb20gJy4vZmlsdGVyLXR5cGVzL2NoZWNrYm94LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtDb21wbGV0ZXJGaWx0ZXJDb21wb25lbnR9IGZyb20gJy4vZmlsdGVyLXR5cGVzL2NvbXBsZXRlci1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7SW5wdXRGaWx0ZXJDb21wb25lbnR9IGZyb20gJy4vZmlsdGVyLXR5cGVzL2lucHV0LWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHtTZWxlY3RGaWx0ZXJDb21wb25lbnR9IGZyb20gJy4vZmlsdGVyLXR5cGVzL3NlbGVjdC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7RGVmYXVsdEZpbHRlcn0gZnJvbSAnLi9maWx0ZXItdHlwZXMvZGVmYXVsdC1maWx0ZXInO1xuaW1wb3J0IHtGaWx0ZXJEZWZhdWx0fSBmcm9tICcuL2ZpbHRlci1kZWZhdWx0JztcbmltcG9ydCB7RGF0ZUZpbHRlckNvbXBvbmVudH0gZnJvbSAnLi9maWx0ZXItdHlwZXMvZGF0ZS1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7TXNlbGVjdEZpbHRlckNvbXBvbmVudH0gZnJvbSAnLi9maWx0ZXItdHlwZXMvbXNlbGVjdC1maWx0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7QW5ndWxhck11bHRpU2VsZWN0TW9kdWxlfSBmcm9tICdhbmd1bGFyMi1tdWx0aXNlbGVjdC1kcm9wZG93bic7XG5cbmNvbnN0IEZJTFRFUl9DT01QT05FTlRTID0gW1xuICBGaWx0ZXJEZWZhdWx0LFxuICBEZWZhdWx0RmlsdGVyLFxuICBGaWx0ZXJDb21wb25lbnQsXG4gIERhdGVGaWx0ZXJDb21wb25lbnQsXG4gIERlZmF1bHRGaWx0ZXJDb21wb25lbnQsXG4gIEN1c3RvbUZpbHRlckNvbXBvbmVudCxcbiAgQ2hlY2tib3hGaWx0ZXJDb21wb25lbnQsXG4gIENvbXBsZXRlckZpbHRlckNvbXBvbmVudCxcbiAgSW5wdXRGaWx0ZXJDb21wb25lbnQsXG4gIFNlbGVjdEZpbHRlckNvbXBvbmVudCxcbiAgTXNlbGVjdEZpbHRlckNvbXBvbmVudFxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIE5nMkNvbXBsZXRlck1vZHVsZSxcbiAgICBBbmd1bGFyTXVsdGlTZWxlY3RNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLi4uRklMVEVSX0NPTVBPTkVOVFMsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAuLi5GSUxURVJfQ09NUE9ORU5UUyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRmlsdGVyTW9kdWxlIHsgfVxuIl19