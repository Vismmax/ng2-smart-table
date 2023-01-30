import { IFilterConfig } from '../data-source';
/**
 * A filter predicate that implements a case-insensitive string inclusion.
 *
 * @param cellValue the cell value to check
 * @param search the search/filter string to check against
 * @param data ignored
 * @param cellName ignored
 */
export declare function defaultStringInclusionFilter(cellValue: string, search: string, data: any, cellName: string): boolean;
/**
 * A filter predicate that implements a case-sensitive equality check.
 *
 * @param cellValue the cell value to check
 * @param search the search/filter string to check against
 * @param data ignored
 * @param cellName ignored
 */
export declare function defaultStringEqualsFilter(cellValue: string, search: string, data: any, cellName: string): boolean;
export declare class LocalFilter {
    static filter(data: Array<any>, filterConf: IFilterConfig): Array<any>;
}
