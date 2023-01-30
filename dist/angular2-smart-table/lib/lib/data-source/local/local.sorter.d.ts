export declare function defaultObjectComparator(direction: number, left: any, right: any): number;
export declare function defaultNumberComparator(direction: number, left: number | null, right: number | null): number;
export declare function defaultStringComparator(direction: number, left: string | null, right: string | null): number;
/**
 * Compares two values with special treatment for numbers and strings.
 *
 * The rule is: if both values are of type number (or null), they are compared as if they were numbers.
 * If both values are either null, undefined or typeof string, they are compared as strings using the current locale.
 * Otherwise, they are compared using their natural ordering.
 *
 * Null values are considered less than any non-null element. Null and undefined are considered equal.
 *
 * @param direction 1 for ascending and -1 for descending (other values are not allowed)
 * @param left the left value
 * @param right the right value
 */
export declare function defaultComparator(direction: any, left: any, right: any): number;
