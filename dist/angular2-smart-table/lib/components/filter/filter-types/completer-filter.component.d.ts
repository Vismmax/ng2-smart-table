import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CompleterService } from 'ng2-completer';
import { DefaultFilter } from './default-filter';
import * as i0 from "@angular/core";
export declare class CompleterFilterComponent extends DefaultFilter implements OnInit {
    private completerService;
    completerContent: Subject<any>;
    constructor(completerService: CompleterService);
    ngOnInit(): void;
    inputTextChanged(event: string): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CompleterFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CompleterFilterComponent, "completer-filter", never, {}, {}, never, never>;
}
