import { PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';
import * as i0 from "@angular/core";
export declare type SecurityTrustType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl' | 'none';
export declare class BypassSecurityTrustPipe implements PipeTransform {
    protected sanitizer: DomSanitizer;
    constructor(sanitizer: DomSanitizer);
    transform(value: string, type: SecurityTrustType): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl;
    static ɵfac: i0.ɵɵFactoryDeclaration<BypassSecurityTrustPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<BypassSecurityTrustPipe, "bypassSecurityTrust">;
}
