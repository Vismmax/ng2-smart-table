import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
export class TagComponent {
    constructor() {
        this.close = new EventEmitter();
    }
    closeClicked(evt) {
        evt.stopPropagation();
        this.close.emit(this.item.id);
    }
}
TagComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TagComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TagComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TagComponent, selector: "angular2-smart-table-tag", inputs: { item: "item" }, outputs: { close: "close" }, ngImport: i0, template: "<div style=\"padding: 5px; display: inline; white-space: nowrap\">\n  <svg\n    style=\"width: 15px\"\n    (click)=\"closeClicked($event)\"\n    aria-hidden=\"true\"\n    focusable=\"false\"\n    data-prefix=\"fas\"\n    data-icon=\"times-circle\"\n    class=\"svg-inline--fa fa-times-circle fa-w-16\"\n    role=\"img\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 512 512\"\n  >\n    <path\n      fill=\"currentColor\"\n      d=\"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z\"\n    ></path>\n  </svg>\n  <span style=\"margin-left: 3px\" class=\"itemText\">{{ item.title }}</span>\n</div>\n", styles: ["*{box-sizing:border-box}*{padding:0;margin:0}ul{list-style-type:none}.add-tag-list{font-family:font8272;font-size:1.5em}.add-tag-list ul li{padding-left:20px;padding-right:20px;padding-bottom:8px;display:flex;flex-direction:row-reverse;float:left}.add-tag-list ul li:last-child{padding-right:0}.closeButton{display:inline}.closeButton:after{content:\"\\f057\";padding-left:4px;font-family:FontAwesome;color:#df0024;cursor:pointer}.closeButton:hover:after{color:#900110;transition:.6s linear}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TagComponent, decorators: [{
            type: Component,
            args: [{ selector: 'angular2-smart-table-tag', template: "<div style=\"padding: 5px; display: inline; white-space: nowrap\">\n  <svg\n    style=\"width: 15px\"\n    (click)=\"closeClicked($event)\"\n    aria-hidden=\"true\"\n    focusable=\"false\"\n    data-prefix=\"fas\"\n    data-icon=\"times-circle\"\n    class=\"svg-inline--fa fa-times-circle fa-w-16\"\n    role=\"img\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 512 512\"\n  >\n    <path\n      fill=\"currentColor\"\n      d=\"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z\"\n    ></path>\n  </svg>\n  <span style=\"margin-left: 3px\" class=\"itemText\">{{ item.title }}</span>\n</div>\n", styles: ["*{box-sizing:border-box}*{padding:0;margin:0}ul{list-style-type:none}.add-tag-list{font-family:font8272;font-size:1.5em}.add-tag-list ul li{padding-left:20px;padding-right:20px;padding-bottom:8px;display:flex;flex-direction:row-reverse;float:left}.add-tag-list ul li:last-child{padding-right:0}.closeButton{display:inline}.closeButton:after{content:\"\\f057\";padding-left:4px;font-family:FontAwesome;color:#df0024;cursor:pointer}.closeButton:hover:after{color:#900110;transition:.6s linear}\n"] }]
        }], propDecorators: { item: [{
                type: Input
            }], close: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvY29tcG9uZW50cy90YWdzL3RhZy90YWcuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3RhZ3MvdGFnL3RhZy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQVFyRSxNQUFNLE9BQU8sWUFBWTtJQUx6QjtRQVNjLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO0tBTTdDO0lBSkcsWUFBWSxDQUFDLEdBQVU7UUFDbkIsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7MEdBVFEsWUFBWTs4RkFBWixZQUFZLHVIQ1J6QiwyNkJBb0JBOzRGRFphLFlBQVk7a0JBTHhCLFNBQVM7K0JBQ0ksMEJBQTBCOzhCQU0zQixJQUFJO3NCQUFaLEtBQUs7Z0JBRUksS0FBSztzQkFBZCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdhbmd1bGFyMi1zbWFydC10YWJsZS10YWcnLFxuICAgIHN0eWxlVXJsczogWycuL3RhZy5jb21wb25lbnQuc2NzcyddLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWcuY29tcG9uZW50Lmh0bWwnLFxufSlcbmV4cG9ydCBjbGFzcyBUYWdDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgaXRlbSE6IGFueTtcblxuICAgIEBPdXRwdXQoKSBjbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY2xvc2VDbGlja2VkKGV2dDogRXZlbnQpIHtcbiAgICAgICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB0aGlzLmNsb3NlLmVtaXQodGhpcy5pdGVtLmlkKTtcbiAgICB9XG59XG4iLCI8ZGl2IHN0eWxlPVwicGFkZGluZzogNXB4OyBkaXNwbGF5OiBpbmxpbmU7IHdoaXRlLXNwYWNlOiBub3dyYXBcIj5cbiAgPHN2Z1xuICAgIHN0eWxlPVwid2lkdGg6IDE1cHhcIlxuICAgIChjbGljayk9XCJjbG9zZUNsaWNrZWQoJGV2ZW50KVwiXG4gICAgYXJpYS1oaWRkZW49XCJ0cnVlXCJcbiAgICBmb2N1c2FibGU9XCJmYWxzZVwiXG4gICAgZGF0YS1wcmVmaXg9XCJmYXNcIlxuICAgIGRhdGEtaWNvbj1cInRpbWVzLWNpcmNsZVwiXG4gICAgY2xhc3M9XCJzdmctaW5saW5lLS1mYSBmYS10aW1lcy1jaXJjbGUgZmEtdy0xNlwiXG4gICAgcm9sZT1cImltZ1wiXG4gICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgdmlld0JveD1cIjAgMCA1MTIgNTEyXCJcbiAgPlxuICAgIDxwYXRoXG4gICAgICBmaWxsPVwiY3VycmVudENvbG9yXCJcbiAgICAgIGQ9XCJNMjU2IDhDMTE5IDggOCAxMTkgOCAyNTZzMTExIDI0OCAyNDggMjQ4IDI0OC0xMTEgMjQ4LTI0OFMzOTMgOCAyNTYgOHptMTIxLjYgMzEzLjFjNC43IDQuNyA0LjcgMTIuMyAwIDE3TDMzOCAzNzcuNmMtNC43IDQuNy0xMi4zIDQuNy0xNyAwTDI1NiAzMTJsLTY1LjEgNjUuNmMtNC43IDQuNy0xMi4zIDQuNy0xNyAwTDEzNC40IDMzOGMtNC43LTQuNy00LjctMTIuMyAwLTE3bDY1LjYtNjUtNjUuNi02NS4xYy00LjctNC43LTQuNy0xMi4zIDAtMTdsMzkuNi0zOS42YzQuNy00LjcgMTIuMy00LjcgMTcgMGw2NSA2NS43IDY1LjEtNjUuNmM0LjctNC43IDEyLjMtNC43IDE3IDBsMzkuNiAzOS42YzQuNyA0LjcgNC43IDEyLjMgMCAxN0wzMTIgMjU2bDY1LjYgNjUuMXpcIlxuICAgID48L3BhdGg+XG4gIDwvc3ZnPlxuICA8c3BhbiBzdHlsZT1cIm1hcmdpbi1sZWZ0OiAzcHhcIiBjbGFzcz1cIml0ZW1UZXh0XCI+e3sgaXRlbS50aXRsZSB9fTwvc3Bhbj5cbjwvZGl2PlxuIl19