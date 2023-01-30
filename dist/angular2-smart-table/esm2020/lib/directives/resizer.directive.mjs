import { Directive, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "../services/table.service";
export class NgxResizerDirective {
    constructor(elementRef, renderer, tableService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.tableService = tableService;
        this.destroyed$ = new Subject();
    }
    ngOnInit() {
        this.tableService.mouseMoveEvent$
            .pipe(takeUntil(this.destroyed$), filter(() => this.isClicked))
            .subscribe((event) => {
            const offset = this.pointerOffset - event.pageX;
            const width = this.parentOffset - offset;
            this.renderer.setStyle(this.parentElement, 'width', width + 'px');
            this.renderer.setStyle(this.siblingElement, 'width', this.siblingOffset + offset + 'px');
        });
    }
    onMouseEnter(event) {
        this.isClicked = true;
        this.parentElement = this.renderer.parentNode(this.elementRef.nativeElement);
        this.siblingElement = this.renderer.nextSibling(this.parentElement);
        this.pointerOffset = event.pageX;
        this.parentOffset = this.parentElement.offsetWidth;
        this.siblingOffset = this.siblingElement.offsetWidth;
    }
    onMouseDown() {
        this.isClicked = false;
    }
    ngOnDestroy() {
        this.destroyed$.next(null);
    }
}
NgxResizerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: NgxResizerDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.TableService }], target: i0.ɵɵFactoryTarget.Directive });
NgxResizerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: NgxResizerDirective, selector: "[angular2-resizer]", host: { listeners: { "mousedown": "onMouseEnter($event)", "document:mouseup": "onMouseDown()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: NgxResizerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[angular2-resizer]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.TableService }]; }, propDecorators: { onMouseEnter: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], onMouseDown: [{
                type: HostListener,
                args: ['document:mouseup']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2RpcmVjdGl2ZXMvcmVzaXplci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBYyxZQUFZLEVBQStCLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0IsT0FBTyxFQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBT2pELE1BQU0sT0FBTyxtQkFBbUI7SUFZOUIsWUFBb0IsVUFBc0IsRUFBVSxRQUFtQixFQUFVLFlBQTBCO1FBQXZGLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGM0csZUFBVSxHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7SUFHaEMsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWU7YUFDOUIsSUFBSSxDQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQzFCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQzdCO2FBQ0EsU0FBUyxDQUFDLENBQUMsS0FBaUIsRUFBRSxFQUFFO1lBQy9CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUNoRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztZQUN6QyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDM0YsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRXNDLFlBQVksQ0FBQyxLQUFpQjtRQUNuRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1FBRWpDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQztJQUN2RCxDQUFDO0lBRWlDLFdBQVc7UUFDM0MsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFDekIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDOztpSEE3Q1UsbUJBQW1CO3FHQUFuQixtQkFBbUI7NEZBQW5CLG1CQUFtQjtrQkFIL0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2lCQUMvQjtvSkE4QndDLFlBQVk7c0JBQWxELFlBQVk7dUJBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQVVILFdBQVc7c0JBQTVDLFlBQVk7dUJBQUMsa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1RhYmxlU2VydmljZX0gZnJvbSAnLi4vc2VydmljZXMvdGFibGUuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thbmd1bGFyMi1yZXNpemVyXSdcbn0pXG5leHBvcnQgY2xhc3MgTmd4UmVzaXplckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgaXNDbGlja2VkITogYm9vbGVhbjtcblxuICBwYXJlbnRFbGVtZW50OiBhbnk7XG4gIHNpYmxpbmdFbGVtZW50OiBhbnk7XG5cbiAgcG9pbnRlck9mZnNldCE6IG51bWJlcjtcbiAgcGFyZW50T2Zmc2V0ITogbnVtYmVyO1xuICBzaWJsaW5nT2Zmc2V0ITogbnVtYmVyO1xuXG4gIGRlc3Ryb3llZCQgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudGFibGVTZXJ2aWNlLm1vdXNlTW92ZUV2ZW50JFxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5pc0NsaWNrZWQpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChldmVudDogTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBvZmZzZXQgPSB0aGlzLnBvaW50ZXJPZmZzZXQgLSBldmVudC5wYWdlWDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSB0aGlzLnBhcmVudE9mZnNldCAtIG9mZnNldDtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLnBhcmVudEVsZW1lbnQsICd3aWR0aCcsIHdpZHRoICsgJ3B4Jyk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5zaWJsaW5nRWxlbWVudCwgJ3dpZHRoJywgdGhpcy5zaWJsaW5nT2Zmc2V0ICsgb2Zmc2V0ICsgJ3B4Jyk7XG4gICAgICB9KTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pIG9uTW91c2VFbnRlcihldmVudDogTW91c2VFdmVudCkge1xuICAgIHRoaXMuaXNDbGlja2VkID0gdHJ1ZTtcbiAgICB0aGlzLnBhcmVudEVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpO1xuICAgIHRoaXMuc2libGluZ0VsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLm5leHRTaWJsaW5nKHRoaXMucGFyZW50RWxlbWVudCk7XG4gICAgdGhpcy5wb2ludGVyT2Zmc2V0ID0gZXZlbnQucGFnZVg7XG5cbiAgICB0aGlzLnBhcmVudE9mZnNldCA9IHRoaXMucGFyZW50RWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICB0aGlzLnNpYmxpbmdPZmZzZXQgPSB0aGlzLnNpYmxpbmdFbGVtZW50Lm9mZnNldFdpZHRoO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6bW91c2V1cCcpIG9uTW91c2VEb3duKCkge1xuICAgIHRoaXMuaXNDbGlja2VkID0gZmFsc2U7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3llZCQubmV4dChudWxsKTtcbiAgfVxufVxuIl19