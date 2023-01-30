import { OnInit } from '@angular/core';
import { CompleterService } from 'ng2-completer';
import { DefaultEditor } from './default-editor';
import * as i0 from "@angular/core";
export declare class CompleterEditorComponent extends DefaultEditor implements OnInit {
    private completerService;
    completerConfig: any;
    completerStr: string;
    constructor(completerService: CompleterService);
    ngOnInit(): void;
    onEditedCompleter(event: any): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CompleterEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CompleterEditorComponent, "completer-editor", never, {}, {}, never, never>;
}
