import { Component } from '@angular/core';
import { EditCellDefault } from './edit-cell-default';
import * as i0 from "@angular/core";
import * as i1 from "../cell-editors/select-editor.component";
import * as i2 from "../cell-editors/textarea-editor.component";
import * as i3 from "../cell-editors/checkbox-editor.component";
import * as i4 from "../cell-editors/completer-editor.component";
import * as i5 from "../cell-editors/input-editor.component";
import * as i6 from "@angular/common";
export class DefaultEditComponent extends EditCellDefault {
    constructor() {
        super();
    }
    getEditorType() {
        const editor = this.cell.getColumn().editor;
        if (!editor) {
            return 'default';
        }
        return editor.type;
    }
}
DefaultEditComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultEditComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DefaultEditComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: DefaultEditComponent, selector: "table-cell-default-editor", usesInheritance: true, ngImport: i0, template: "<div [ngSwitch]=\"getEditorType()\">\n    <select-editor *ngSwitchCase=\"'list'\"\n                   [cell]=\"cell\"\n                   [inputClass]=\"inputClass\"\n                   (onClick)=\"onClick($event)\"\n                   (onEdited)=\"onEdited()\"\n                   (onStopEditing)=\"onStopEditing()\">\n    </select-editor>\n\n    <textarea-editor *ngSwitchCase=\"'textarea'\"\n                     [cell]=\"cell\"\n                     [inputClass]=\"inputClass\"\n                     (onClick)=\"onClick($event)\"\n                     (onEdited)=\"onEdited()\"\n                     (onStopEditing)=\"onStopEditing()\">\n    </textarea-editor>\n\n    <checkbox-editor *ngSwitchCase=\"'checkbox'\"\n                     [cell]=\"cell\"\n                     [inputClass]=\"inputClass\"\n                     (onClick)=\"onClick($event)\">\n    </checkbox-editor>\n\n    <completer-editor *ngSwitchCase=\"'completer'\"\n                      [cell]=\"cell\">\n    </completer-editor>\n\n    <input-editor *ngSwitchDefault\n                  [cell]=\"cell\"\n                  [inputClass]=\"inputClass\"\n                  (onClick)=\"onClick($event)\"\n                  (onEdited)=\"onEdited()\"\n                  (onStopEditing)=\"onStopEditing()\">\n    </input-editor>\n</div>\n", components: [{ type: i1.SelectEditorComponent, selector: "select-editor" }, { type: i2.TextareaEditorComponent, selector: "textarea-editor" }, { type: i3.CheckboxEditorComponent, selector: "checkbox-editor" }, { type: i4.CompleterEditorComponent, selector: "completer-editor" }, { type: i5.InputEditorComponent, selector: "input-editor" }], directives: [{ type: i6.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i6.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i6.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultEditComponent, decorators: [{
            type: Component,
            args: [{ selector: 'table-cell-default-editor', template: "<div [ngSwitch]=\"getEditorType()\">\n    <select-editor *ngSwitchCase=\"'list'\"\n                   [cell]=\"cell\"\n                   [inputClass]=\"inputClass\"\n                   (onClick)=\"onClick($event)\"\n                   (onEdited)=\"onEdited()\"\n                   (onStopEditing)=\"onStopEditing()\">\n    </select-editor>\n\n    <textarea-editor *ngSwitchCase=\"'textarea'\"\n                     [cell]=\"cell\"\n                     [inputClass]=\"inputClass\"\n                     (onClick)=\"onClick($event)\"\n                     (onEdited)=\"onEdited()\"\n                     (onStopEditing)=\"onStopEditing()\">\n    </textarea-editor>\n\n    <checkbox-editor *ngSwitchCase=\"'checkbox'\"\n                     [cell]=\"cell\"\n                     [inputClass]=\"inputClass\"\n                     (onClick)=\"onClick($event)\">\n    </checkbox-editor>\n\n    <completer-editor *ngSwitchCase=\"'completer'\"\n                      [cell]=\"cell\">\n    </completer-editor>\n\n    <input-editor *ngSwitchDefault\n                  [cell]=\"cell\"\n                  [inputClass]=\"inputClass\"\n                  (onClick)=\"onClick($event)\"\n                  (onEdited)=\"onEdited()\"\n                  (onStopEditing)=\"onStopEditing()\">\n    </input-editor>\n</div>\n" }]
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC1lZGl0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy9jZWxsL2NlbGwtZWRpdC1tb2RlL2RlZmF1bHQtZWRpdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2NvbXBvbmVudHMvY2VsbC9jZWxsLWVkaXQtbW9kZS9kZWZhdWx0LWVkaXQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4QyxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0scUJBQXFCLENBQUM7Ozs7Ozs7O0FBTXBELE1BQU0sT0FBTyxvQkFBcUIsU0FBUSxlQUFlO0lBRXZEO1FBQ0UsS0FBSyxFQUFFLENBQUM7SUFDVixDQUFDO0lBRUQsYUFBYTtRQUNYLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBTSxDQUFBO1FBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDOztrSEFaVSxvQkFBb0I7c0dBQXBCLG9CQUFvQix3RkNSakMseXhDQW1DQTs0RkQzQmEsb0JBQW9CO2tCQUpoQyxTQUFTOytCQUNFLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtFZGl0Q2VsbERlZmF1bHR9IGZyb20gJy4vZWRpdC1jZWxsLWRlZmF1bHQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0YWJsZS1jZWxsLWRlZmF1bHQtZWRpdG9yJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2RlZmF1bHQtZWRpdC5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIERlZmF1bHRFZGl0Q29tcG9uZW50IGV4dGVuZHMgRWRpdENlbGxEZWZhdWx0IHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgZ2V0RWRpdG9yVHlwZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGVkaXRvciA9IHRoaXMuY2VsbC5nZXRDb2x1bW4oKS5lZGl0b3JcbiAgICBpZiAoIWVkaXRvcikge1xuICAgICAgcmV0dXJuICdkZWZhdWx0JztcbiAgICB9XG4gICAgcmV0dXJuIGVkaXRvci50eXBlO1xuICB9XG59XG4iLCI8ZGl2IFtuZ1N3aXRjaF09XCJnZXRFZGl0b3JUeXBlKClcIj5cbiAgICA8c2VsZWN0LWVkaXRvciAqbmdTd2l0Y2hDYXNlPVwiJ2xpc3QnXCJcbiAgICAgICAgICAgICAgICAgICBbY2VsbF09XCJjZWxsXCJcbiAgICAgICAgICAgICAgICAgICBbaW5wdXRDbGFzc109XCJpbnB1dENsYXNzXCJcbiAgICAgICAgICAgICAgICAgICAob25DbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgIChvbkVkaXRlZCk9XCJvbkVkaXRlZCgpXCJcbiAgICAgICAgICAgICAgICAgICAob25TdG9wRWRpdGluZyk9XCJvblN0b3BFZGl0aW5nKClcIj5cbiAgICA8L3NlbGVjdC1lZGl0b3I+XG5cbiAgICA8dGV4dGFyZWEtZWRpdG9yICpuZ1N3aXRjaENhc2U9XCIndGV4dGFyZWEnXCJcbiAgICAgICAgICAgICAgICAgICAgIFtjZWxsXT1cImNlbGxcIlxuICAgICAgICAgICAgICAgICAgICAgW2lucHV0Q2xhc3NdPVwiaW5wdXRDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICAob25DbGljayk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgKG9uRWRpdGVkKT1cIm9uRWRpdGVkKClcIlxuICAgICAgICAgICAgICAgICAgICAgKG9uU3RvcEVkaXRpbmcpPVwib25TdG9wRWRpdGluZygpXCI+XG4gICAgPC90ZXh0YXJlYS1lZGl0b3I+XG5cbiAgICA8Y2hlY2tib3gtZWRpdG9yICpuZ1N3aXRjaENhc2U9XCInY2hlY2tib3gnXCJcbiAgICAgICAgICAgICAgICAgICAgIFtjZWxsXT1cImNlbGxcIlxuICAgICAgICAgICAgICAgICAgICAgW2lucHV0Q2xhc3NdPVwiaW5wdXRDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICAob25DbGljayk9XCJvbkNsaWNrKCRldmVudClcIj5cbiAgICA8L2NoZWNrYm94LWVkaXRvcj5cblxuICAgIDxjb21wbGV0ZXItZWRpdG9yICpuZ1N3aXRjaENhc2U9XCInY29tcGxldGVyJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgW2NlbGxdPVwiY2VsbFwiPlxuICAgIDwvY29tcGxldGVyLWVkaXRvcj5cblxuICAgIDxpbnB1dC1lZGl0b3IgKm5nU3dpdGNoRGVmYXVsdFxuICAgICAgICAgICAgICAgICAgW2NlbGxdPVwiY2VsbFwiXG4gICAgICAgICAgICAgICAgICBbaW5wdXRDbGFzc109XCJpbnB1dENsYXNzXCJcbiAgICAgICAgICAgICAgICAgIChvbkNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAob25FZGl0ZWQpPVwib25FZGl0ZWQoKVwiXG4gICAgICAgICAgICAgICAgICAob25TdG9wRWRpdGluZyk9XCJvblN0b3BFZGl0aW5nKClcIj5cbiAgICA8L2lucHV0LWVkaXRvcj5cbjwvZGl2PlxuIl19