import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class TitleComponent {
    constructor() {
        this.currentDirection = null;
        this.hide = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes.source) {
            if (!changes.source.firstChange) {
                this.dataChangedSub.unsubscribe();
            }
            this.dataChangedSub = this.source.onChanged().subscribe((dataChanges) => {
                this.currentDirection = null;
                const sortConf = this.source.getSort();
                if (sortConf) {
                    sortConf.forEach(c => {
                        if (c.field === this.column.id) {
                            this.currentDirection = c.direction;
                        }
                    });
                }
            });
        }
    }
    _sort(event) {
        event.preventDefault();
        this.changeSortDirection();
        this.source.updateSort([
            {
                field: this.column.id,
                direction: this.currentDirection,
                compare: this.column.getCompareFunction(),
            },
        ]);
    }
    _hideColumnClicked(event) {
        event.preventDefault();
        this.hide.emit(this.column.id);
    }
    changeSortDirection() {
        // rotate sort direction, including null (no sort)
        if (this.currentDirection === null) {
            this.currentDirection = 'asc';
        }
        else if (this.currentDirection === 'asc') {
            this.currentDirection = 'desc';
        }
        else if (this.currentDirection === 'desc') {
            this.currentDirection = null;
        }
    }
}
TitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TitleComponent, selector: "angular2-smart-table-title", inputs: { column: "column", source: "source", isHideable: "isHideable" }, outputs: { hide: "hide" }, usesOnChanges: true, ngImport: i0, template: `
    <a href="#" *ngIf="column.isSortable"
       (click)="_sort($event)"
       class="angular2-smart-sort-link sort"
       [ngClass]="currentDirection??''">
      {{ column.title }}
    </a>
    <span class="angular2-smart-sort" *ngIf="!column.isSortable">{{ column.title }}</span>
    <button style="position: absolute; top:0; right:0; border:none" *ngIf="isHideable"
            (click)="_hideColumnClicked($event)">X
    </button>
  `, isInline: true, styles: ["a.sort.asc,a.sort.desc{font-weight:700}a.sort.asc:after,a.sort.desc:after{content:\"\";display:inline-block;width:0;height:0;border-bottom:4px solid rgba(0,0,0,.3);border-top:4px solid transparent;border-left:4px solid transparent;border-right:4px solid transparent;margin-bottom:2px}a.sort.desc:after{transform:rotate(-180deg);margin-bottom:-2px}\n"], directives: [{ type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'angular2-smart-table-title', template: `
    <a href="#" *ngIf="column.isSortable"
       (click)="_sort($event)"
       class="angular2-smart-sort-link sort"
       [ngClass]="currentDirection??''">
      {{ column.title }}
    </a>
    <span class="angular2-smart-sort" *ngIf="!column.isSortable">{{ column.title }}</span>
    <button style="position: absolute; top:0; right:0; border:none" *ngIf="isHideable"
            (click)="_hideColumnClicked($event)">X
    </button>
  `, styles: ["a.sort.asc,a.sort.desc{font-weight:700}a.sort.asc:after,a.sort.desc:after{content:\"\";display:inline-block;width:0;height:0;border-bottom:4px solid rgba(0,0,0,.3);border-top:4px solid transparent;border-left:4px solid transparent;border-right:4px solid transparent;margin-bottom:2px}a.sort.desc:after{transform:rotate(-180deg);margin-bottom:-2px}\n"] }]
        }], propDecorators: { column: [{
                type: Input
            }], source: [{
                type: Input
            }], isHideable: [{
                type: Input
            }], hide: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9jb21wb25lbnRzL3RoZWFkL2NlbGxzL3RpdGxlL3RpdGxlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsTUFBTSxFQUFnQixNQUFNLGVBQWUsQ0FBQzs7O0FBc0IvRixNQUFNLE9BQU8sY0FBYztJQWhCM0I7UUFrQkUscUJBQWdCLEdBQXNCLElBQUksQ0FBQztRQUlqQyxTQUFJLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztLQW9EMUM7SUFoREMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7YUFDbkM7WUFDRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3RFLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7Z0JBQzdCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksUUFBUSxFQUFFO29CQUNaLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ25CLElBQUksQ0FBQyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTs0QkFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7eUJBQ3JDO29CQUNILENBQUMsQ0FBQyxDQUFDO2lCQUNKO1lBQ0gsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsS0FBVTtRQUNkLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNyQjtnQkFDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNyQixTQUFTLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtnQkFDaEMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUU7YUFDMUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0Qsa0JBQWtCLENBQUMsS0FBVTtRQUMzQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBR08sbUJBQW1CO1FBQ3pCLGtEQUFrRDtRQUNsRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLEVBQUU7WUFDbEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztTQUMvQjthQUFNLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLEtBQUssRUFBRTtZQUMxQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO1NBQ2hDO2FBQU0sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEtBQUssTUFBTSxFQUFFO1lBQzNDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDOUI7SUFDSCxDQUFDOzs0R0F6RFUsY0FBYztnR0FBZCxjQUFjLDRMQWJmOzs7Ozs7Ozs7OztHQVdUOzRGQUVVLGNBQWM7a0JBaEIxQixTQUFTOytCQUNFLDRCQUE0QixZQUU1Qjs7Ozs7Ozs7Ozs7R0FXVDs4QkFLUSxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0ksSUFBSTtzQkFBYixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT3V0cHV0LCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtEYXRhU291cmNlfSBmcm9tICcuLi8uLi8uLi8uLi9saWIvZGF0YS1zb3VyY2UvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtDb2x1bW59IGZyb20gJy4uLy4uLy4uLy4uL2xpYi9kYXRhLXNldC9jb2x1bW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbmd1bGFyMi1zbWFydC10YWJsZS10aXRsZScsXG4gIHN0eWxlVXJsczogWycuL3RpdGxlLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGEgaHJlZj1cIiNcIiAqbmdJZj1cImNvbHVtbi5pc1NvcnRhYmxlXCJcbiAgICAgICAoY2xpY2spPVwiX3NvcnQoJGV2ZW50KVwiXG4gICAgICAgY2xhc3M9XCJhbmd1bGFyMi1zbWFydC1zb3J0LWxpbmsgc29ydFwiXG4gICAgICAgW25nQ2xhc3NdPVwiY3VycmVudERpcmVjdGlvbj8/JydcIj5cbiAgICAgIHt7IGNvbHVtbi50aXRsZSB9fVxuICAgIDwvYT5cbiAgICA8c3BhbiBjbGFzcz1cImFuZ3VsYXIyLXNtYXJ0LXNvcnRcIiAqbmdJZj1cIiFjb2x1bW4uaXNTb3J0YWJsZVwiPnt7IGNvbHVtbi50aXRsZSB9fTwvc3Bhbj5cbiAgICA8YnV0dG9uIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlOyB0b3A6MDsgcmlnaHQ6MDsgYm9yZGVyOm5vbmVcIiAqbmdJZj1cImlzSGlkZWFibGVcIlxuICAgICAgICAgICAgKGNsaWNrKT1cIl9oaWRlQ29sdW1uQ2xpY2tlZCgkZXZlbnQpXCI+WFxuICAgIDwvYnV0dG9uPlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUaXRsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG5cbiAgY3VycmVudERpcmVjdGlvbjogJ2FzYyd8J2Rlc2MnfG51bGwgPSBudWxsO1xuICBASW5wdXQoKSBjb2x1bW4hOiBDb2x1bW47XG4gIEBJbnB1dCgpIHNvdXJjZSE6IERhdGFTb3VyY2U7XG4gIEBJbnB1dCgpIGlzSGlkZWFibGUhOiBib29sZWFuO1xuICBAT3V0cHV0KCkgaGlkZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByb3RlY3RlZCBkYXRhQ2hhbmdlZFN1YiE6IFN1YnNjcmlwdGlvbjtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXMuc291cmNlKSB7XG4gICAgICBpZiAoIWNoYW5nZXMuc291cmNlLmZpcnN0Q2hhbmdlKSB7XG4gICAgICAgIHRoaXMuZGF0YUNoYW5nZWRTdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGF0YUNoYW5nZWRTdWIgPSB0aGlzLnNvdXJjZS5vbkNoYW5nZWQoKS5zdWJzY3JpYmUoKGRhdGFDaGFuZ2VzKSA9PiB7XG4gICAgICAgIHRoaXMuY3VycmVudERpcmVjdGlvbiA9IG51bGw7XG4gICAgICAgIGNvbnN0IHNvcnRDb25mID0gdGhpcy5zb3VyY2UuZ2V0U29ydCgpO1xuICAgICAgICBpZiAoc29ydENvbmYpIHtcbiAgICAgICAgICBzb3J0Q29uZi5mb3JFYWNoKGMgPT4ge1xuICAgICAgICAgICAgaWYgKGMuZmllbGQgPT09IHRoaXMuY29sdW1uLmlkKSB7XG4gICAgICAgICAgICAgIHRoaXMuY3VycmVudERpcmVjdGlvbiA9IGMuZGlyZWN0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBfc29ydChldmVudDogYW55KSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLmNoYW5nZVNvcnREaXJlY3Rpb24oKTtcbiAgICB0aGlzLnNvdXJjZS51cGRhdGVTb3J0KFtcbiAgICAgIHtcbiAgICAgICAgZmllbGQ6IHRoaXMuY29sdW1uLmlkLFxuICAgICAgICBkaXJlY3Rpb246IHRoaXMuY3VycmVudERpcmVjdGlvbixcbiAgICAgICAgY29tcGFyZTogdGhpcy5jb2x1bW4uZ2V0Q29tcGFyZUZ1bmN0aW9uKCksXG4gICAgICB9LFxuICAgIF0pO1xuICB9XG5cblxuICBfaGlkZUNvbHVtbkNsaWNrZWQoZXZlbnQ6IGFueSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5oaWRlLmVtaXQodGhpcy5jb2x1bW4uaWQpO1xuICB9XG5cblxuICBwcml2YXRlIGNoYW5nZVNvcnREaXJlY3Rpb24oKTogdm9pZCB7XG4gICAgLy8gcm90YXRlIHNvcnQgZGlyZWN0aW9uLCBpbmNsdWRpbmcgbnVsbCAobm8gc29ydClcbiAgICBpZiAodGhpcy5jdXJyZW50RGlyZWN0aW9uID09PSBudWxsKSB7XG4gICAgICB0aGlzLmN1cnJlbnREaXJlY3Rpb24gPSAnYXNjJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudERpcmVjdGlvbiA9PT0gJ2FzYycpIHtcbiAgICAgIHRoaXMuY3VycmVudERpcmVjdGlvbiA9ICdkZXNjJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudERpcmVjdGlvbiA9PT0gJ2Rlc2MnKSB7XG4gICAgICB0aGlzLmN1cnJlbnREaXJlY3Rpb24gPSBudWxsO1xuICAgIH1cbiAgfVxufVxuIl19