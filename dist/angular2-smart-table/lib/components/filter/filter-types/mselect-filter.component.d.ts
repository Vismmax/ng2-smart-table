import { OnInit } from '@angular/core';
import { DefaultFilter } from './default-filter';
import { DropdownSettings } from 'angular2-multiselect-dropdown/lib/multiselect.interface';
import * as i0 from "@angular/core";
export interface Config {
    dropdownList: Array<any>;
    selectedItems: Array<any>;
    dropdownSettings: DropdownSettings;
}
export declare class MselectFilterComponent extends DefaultFilter implements OnInit {
    readonly selector = "*;*";
    dropdownList: Array<any>;
    selectedItems: Array<any>;
    dropdownSettings: DropdownSettings;
    ngOnInit(): void;
    onFilterValues(cellValue: string, search: string, data: any, cellName: string): boolean;
    onItemSelect(item: any): void;
    OnItemDeSelect(item: any): void;
    onSelectAll(items: any): void;
    onDeSelectAll(items: any): void;
    updateQuery(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MselectFilterComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MselectFilterComponent, "mselect-filter", never, {}, {}, never, never>;
}
