import { Component } from '@angular/core';
import { DefaultEditor } from './default-editor';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class CheckboxEditorComponent extends DefaultEditor {
    constructor() {
        super();
    }
    onChange(event) {
        const trueVal = (this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().true) || true;
        const falseVal = (this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().false) || false;
        this.cell.newValue = event.target.checked ? trueVal : falseVal;
    }
}
CheckboxEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CheckboxEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CheckboxEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CheckboxEditorComponent, selector: "checkbox-editor", usesInheritance: true, ngImport: i0, template: `
    <input [ngClass]="inputClass"
           type="checkbox"
           class="form-control"
           [name]="cell.getId()"
           [disabled]="!cell.isEditable()"
           [checked]="cell.getValue() == (cell.getColumn().getConfig()?.true || true)"
           (click)="onClick.emit($event)"
           (change)="onChange($event)">
    `, isInline: true, styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em}\n"], directives: [{ type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CheckboxEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'checkbox-editor', template: `
    <input [ngClass]="inputClass"
           type="checkbox"
           class="form-control"
           [name]="cell.getId()"
           [disabled]="!cell.isEditable()"
           [checked]="cell.getValue() == (cell.getColumn().getConfig()?.true || true)"
           (click)="onClick.emit($event)"
           (change)="onChange($event)">
    `, styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em}\n"] }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tib3gtZWRpdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9jZWxsL2NlbGwtZWRpdG9ycy9jaGVja2JveC1lZGl0b3IuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFeEMsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDOzs7QUFnQi9DLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxhQUFhO0lBRXhEO1FBQ0UsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQVU7UUFDakIsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3RHLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQztRQUN6RyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDakUsQ0FBQzs7cUhBVlUsdUJBQXVCO3lHQUF2Qix1QkFBdUIsOEVBWHhCOzs7Ozs7Ozs7S0FTUDs0RkFFUSx1QkFBdUI7a0JBZG5DLFNBQVM7K0JBQ0UsaUJBQWlCLFlBRWpCOzs7Ozs7Ozs7S0FTUCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtEZWZhdWx0RWRpdG9yfSBmcm9tICcuL2RlZmF1bHQtZWRpdG9yJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2hlY2tib3gtZWRpdG9yJyxcbiAgc3R5bGVVcmxzOiBbJy4vZWRpdG9yLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGlucHV0IFtuZ0NsYXNzXT1cImlucHV0Q2xhc3NcIlxuICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgIFtuYW1lXT1cImNlbGwuZ2V0SWQoKVwiXG4gICAgICAgICAgIFtkaXNhYmxlZF09XCIhY2VsbC5pc0VkaXRhYmxlKClcIlxuICAgICAgICAgICBbY2hlY2tlZF09XCJjZWxsLmdldFZhbHVlKCkgPT0gKGNlbGwuZ2V0Q29sdW1uKCkuZ2V0Q29uZmlnKCk/LnRydWUgfHwgdHJ1ZSlcIlxuICAgICAgICAgICAoY2xpY2spPVwib25DbGljay5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIj5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja2JveEVkaXRvckNvbXBvbmVudCBleHRlbmRzIERlZmF1bHRFZGl0b3Ige1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBvbkNoYW5nZShldmVudDogYW55KSB7XG4gICAgY29uc3QgdHJ1ZVZhbCA9ICh0aGlzLmNlbGwuZ2V0Q29sdW1uKCkuZ2V0Q29uZmlnKCkgJiYgdGhpcy5jZWxsLmdldENvbHVtbigpLmdldENvbmZpZygpLnRydWUpIHx8IHRydWU7XG4gICAgY29uc3QgZmFsc2VWYWwgPSAodGhpcy5jZWxsLmdldENvbHVtbigpLmdldENvbmZpZygpICYmIHRoaXMuY2VsbC5nZXRDb2x1bW4oKS5nZXRDb25maWcoKS5mYWxzZSkgfHwgZmFsc2U7XG4gICAgdGhpcy5jZWxsLm5ld1ZhbHVlID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQgPyB0cnVlVmFsIDogZmFsc2VWYWw7XG4gIH1cbn1cbiJdfQ==