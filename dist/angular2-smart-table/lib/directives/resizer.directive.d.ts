import { ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { TableService } from '../services/table.service';
import * as i0 from "@angular/core";
export declare class NgxResizerDirective implements OnInit, OnDestroy {
    private elementRef;
    private renderer;
    private tableService;
    isClicked: boolean;
    parentElement: any;
    siblingElement: any;
    pointerOffset: number;
    parentOffset: number;
    siblingOffset: number;
    destroyed$: Subject<any>;
    constructor(elementRef: ElementRef, renderer: Renderer2, tableService: TableService);
    ngOnInit(): void;
    onMouseEnter(event: MouseEvent): void;
    onMouseDown(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxResizerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<NgxResizerDirective, "[angular2-resizer]", never, {}, {}, never>;
}
