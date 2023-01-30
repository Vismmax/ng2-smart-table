import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from 'ng2-completer';
import { CellComponent } from './cell.component';
import { CustomEditComponent } from './cell-edit-mode/custom-edit.component';
import { DefaultEditComponent } from './cell-edit-mode/default-edit.component';
import { EditCellComponent } from './cell-edit-mode/edit-cell.component';
import { CheckboxEditorComponent } from './cell-editors/checkbox-editor.component';
import { CompleterEditorComponent } from './cell-editors/completer-editor.component';
import { InputEditorComponent } from './cell-editors/input-editor.component';
import { SelectEditorComponent } from './cell-editors/select-editor.component';
import { TextareaEditorComponent } from './cell-editors/textarea-editor.component';
import { CustomViewComponent } from './cell-view-mode/custom-view.component';
import { ViewCellComponent } from './cell-view-mode/view-cell.component';
import { EditCellDefault } from './cell-edit-mode/edit-cell-default';
import { DefaultEditor } from './cell-editors/default-editor';
import { PipesModule } from '../../pipes/pipes.module';
import * as i0 from "@angular/core";
const CELL_COMPONENTS = [
    CellComponent,
    EditCellDefault,
    DefaultEditor,
    CustomEditComponent,
    DefaultEditComponent,
    EditCellComponent,
    CheckboxEditorComponent,
    CompleterEditorComponent,
    InputEditorComponent,
    SelectEditorComponent,
    TextareaEditorComponent,
    CustomViewComponent,
    ViewCellComponent,
];
export class CellModule {
}
CellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellModule, declarations: [CellComponent,
        EditCellDefault,
        DefaultEditor,
        CustomEditComponent,
        DefaultEditComponent,
        EditCellComponent,
        CheckboxEditorComponent,
        CompleterEditorComponent,
        InputEditorComponent,
        SelectEditorComponent,
        TextareaEditorComponent,
        CustomViewComponent,
        ViewCellComponent], imports: [CommonModule,
        FormsModule,
        Ng2CompleterModule,
        PipesModule], exports: [CellComponent,
        EditCellDefault,
        DefaultEditor,
        CustomEditComponent,
        DefaultEditComponent,
        EditCellComponent,
        CheckboxEditorComponent,
        CompleterEditorComponent,
        InputEditorComponent,
        SelectEditorComponent,
        TextareaEditorComponent,
        CustomViewComponent,
        ViewCellComponent] });
CellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellModule, imports: [[
            CommonModule,
            FormsModule,
            Ng2CompleterModule,
            PipesModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        Ng2CompleterModule,
                        PipesModule,
                    ],
                    declarations: [
                        ...CELL_COMPONENTS,
                    ],
                    exports: [
                        ...CELL_COMPONENTS,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VsbC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvY2VsbC9jZWxsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRWpELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMvQyxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx5Q0FBeUMsQ0FBQztBQUM3RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNuRixPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUMzRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUM3RSxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSwwQ0FBMEMsQ0FBQztBQUNqRixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSx3Q0FBd0MsQ0FBQztBQUMzRSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUN2RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sb0NBQW9DLENBQUM7QUFDbkUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzVELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7QUFFckQsTUFBTSxlQUFlLEdBQUc7SUFDdEIsYUFBYTtJQUNiLGVBQWU7SUFDZixhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLG9CQUFvQjtJQUNwQixpQkFBaUI7SUFDakIsdUJBQXVCO0lBQ3ZCLHdCQUF3QjtJQUN4QixvQkFBb0I7SUFDcEIscUJBQXFCO0lBQ3JCLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsaUJBQWlCO0NBQ2xCLENBQUM7QUFnQkYsTUFBTSxPQUFPLFVBQVU7O3dHQUFWLFVBQVU7eUdBQVYsVUFBVSxpQkE3QnJCLGFBQWE7UUFDYixlQUFlO1FBQ2YsYUFBYTtRQUNiLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2Qix3QkFBd0I7UUFDeEIsb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsbUJBQW1CO1FBQ25CLGlCQUFpQixhQUtYLFlBQVk7UUFDWixXQUFXO1FBQ1gsa0JBQWtCO1FBQ2xCLFdBQVcsYUFwQmpCLGFBQWE7UUFDYixlQUFlO1FBQ2YsYUFBYTtRQUNiLG1CQUFtQjtRQUNuQixvQkFBb0I7UUFDcEIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2Qix3QkFBd0I7UUFDeEIsb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsbUJBQW1CO1FBQ25CLGlCQUFpQjt5R0FpQk4sVUFBVSxZQWJWO1lBQ0wsWUFBWTtZQUNaLFdBQVc7WUFDWCxrQkFBa0I7WUFDbEIsV0FBVztTQUNkOzRGQVFRLFVBQVU7a0JBZHRCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxrQkFBa0I7d0JBQ2xCLFdBQVc7cUJBQ2Q7b0JBQ0gsWUFBWSxFQUFFO3dCQUNaLEdBQUcsZUFBZTtxQkFDbkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLEdBQUcsZUFBZTtxQkFDbkI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtOZzJDb21wbGV0ZXJNb2R1bGV9IGZyb20gJ25nMi1jb21wbGV0ZXInO1xuXG5pbXBvcnQge0NlbGxDb21wb25lbnR9IGZyb20gJy4vY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHtDdXN0b21FZGl0Q29tcG9uZW50fSBmcm9tICcuL2NlbGwtZWRpdC1tb2RlL2N1c3RvbS1lZGl0LmNvbXBvbmVudCc7XG5pbXBvcnQge0RlZmF1bHRFZGl0Q29tcG9uZW50fSBmcm9tICcuL2NlbGwtZWRpdC1tb2RlL2RlZmF1bHQtZWRpdC5jb21wb25lbnQnO1xuaW1wb3J0IHtFZGl0Q2VsbENvbXBvbmVudH0gZnJvbSAnLi9jZWxsLWVkaXQtbW9kZS9lZGl0LWNlbGwuY29tcG9uZW50JztcbmltcG9ydCB7Q2hlY2tib3hFZGl0b3JDb21wb25lbnR9IGZyb20gJy4vY2VsbC1lZGl0b3JzL2NoZWNrYm94LWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHtDb21wbGV0ZXJFZGl0b3JDb21wb25lbnR9IGZyb20gJy4vY2VsbC1lZGl0b3JzL2NvbXBsZXRlci1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7SW5wdXRFZGl0b3JDb21wb25lbnR9IGZyb20gJy4vY2VsbC1lZGl0b3JzL2lucHV0LWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHtTZWxlY3RFZGl0b3JDb21wb25lbnR9IGZyb20gJy4vY2VsbC1lZGl0b3JzL3NlbGVjdC1lZGl0b3IuY29tcG9uZW50JztcbmltcG9ydCB7VGV4dGFyZWFFZGl0b3JDb21wb25lbnR9IGZyb20gJy4vY2VsbC1lZGl0b3JzL3RleHRhcmVhLWVkaXRvci5jb21wb25lbnQnO1xuaW1wb3J0IHtDdXN0b21WaWV3Q29tcG9uZW50fSBmcm9tICcuL2NlbGwtdmlldy1tb2RlL2N1c3RvbS12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQge1ZpZXdDZWxsQ29tcG9uZW50fSBmcm9tICcuL2NlbGwtdmlldy1tb2RlL3ZpZXctY2VsbC5jb21wb25lbnQnO1xuaW1wb3J0IHtFZGl0Q2VsbERlZmF1bHR9IGZyb20gJy4vY2VsbC1lZGl0LW1vZGUvZWRpdC1jZWxsLWRlZmF1bHQnO1xuaW1wb3J0IHtEZWZhdWx0RWRpdG9yfSBmcm9tICcuL2NlbGwtZWRpdG9ycy9kZWZhdWx0LWVkaXRvcic7XG5pbXBvcnQge1BpcGVzTW9kdWxlfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuXG5jb25zdCBDRUxMX0NPTVBPTkVOVFMgPSBbXG4gIENlbGxDb21wb25lbnQsXG4gIEVkaXRDZWxsRGVmYXVsdCxcbiAgRGVmYXVsdEVkaXRvcixcbiAgQ3VzdG9tRWRpdENvbXBvbmVudCxcbiAgRGVmYXVsdEVkaXRDb21wb25lbnQsXG4gIEVkaXRDZWxsQ29tcG9uZW50LFxuICBDaGVja2JveEVkaXRvckNvbXBvbmVudCxcbiAgQ29tcGxldGVyRWRpdG9yQ29tcG9uZW50LFxuICBJbnB1dEVkaXRvckNvbXBvbmVudCxcbiAgU2VsZWN0RWRpdG9yQ29tcG9uZW50LFxuICBUZXh0YXJlYUVkaXRvckNvbXBvbmVudCxcbiAgQ3VzdG9tVmlld0NvbXBvbmVudCxcbiAgVmlld0NlbGxDb21wb25lbnQsXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgTmcyQ29tcGxldGVyTW9kdWxlLFxuICAgICAgICBQaXBlc01vZHVsZSxcbiAgICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICAuLi5DRUxMX0NPTVBPTkVOVFMsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICAuLi5DRUxMX0NPTVBPTkVOVFMsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENlbGxNb2R1bGUgeyB9XG4iXX0=