import { AfterViewInit, ElementRef, EventEmitter, OnChanges } from '@angular/core';
import { Grid } from '../../../lib/grid';
import { DataSource } from '../../../lib/data-source/data-source';
import { CreateEvent } from '../../../lib/events';
import { SecurityTrustType } from '../../../pipes/bypass-security-trust.pipe';
import * as i0 from "@angular/core";
export declare class AddButtonComponent implements AfterViewInit, OnChanges {
    private ref;
    grid: Grid;
    source: DataSource;
    create: EventEmitter<CreateEvent>;
    hiddenWhenFunction: () => boolean;
    disabledWhenFunction: () => boolean;
    addNewButtonContent: string;
    bypassSecurityTrust: SecurityTrustType;
    constructor(ref: ElementRef);
    ngAfterViewInit(): void;
    get visible(): boolean;
    get disabled(): boolean;
    ngOnChanges(): void;
    onAdd(event: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddButtonComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AddButtonComponent, "[angular2-st-add-button]", never, { "grid": "grid"; "source": "source"; }, { "create": "create"; }, never, never>;
}
