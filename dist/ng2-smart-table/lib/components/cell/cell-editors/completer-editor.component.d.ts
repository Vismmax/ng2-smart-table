import { OnInit } from '@angular/core';
import { CompleterItem, CompleterService } from 'ng2-completer';
import { DefaultEditor } from './default-editor';
import * as i0 from "@angular/core";
export declare class CompleterEditorComponent extends DefaultEditor implements OnInit {
    private completerService;
    completerStr: string;
    constructor(completerService: CompleterService);
    ngOnInit(): void;
    onEditedCompleter(event: CompleterItem): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CompleterEditorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CompleterEditorComponent, "completer-editor", never, {}, {}, never, never, false>;
}
