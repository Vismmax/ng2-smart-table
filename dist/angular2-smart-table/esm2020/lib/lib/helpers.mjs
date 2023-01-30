import { cloneDeep } from 'lodash-es';
/**
 * Extending object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
export const deepExtend = function (...objects) {
    if (arguments.length < 1 || typeof arguments[0] !== 'object') {
        return false;
    }
    if (arguments.length < 2) {
        return arguments[0];
    }
    const target = arguments[0];
    // convert arguments to array and cut off target object
    const args = Array.prototype.slice.call(arguments, 1);
    let val, src;
    args.forEach((obj) => {
        // skip argument if it is array or isn't object
        if (typeof obj !== 'object' || Array.isArray(obj)) {
            return;
        }
        Object.keys(obj).forEach(function (key) {
            src = target[key]; // source value
            val = obj[key]; // new value
            // recursion prevention
            if (val === target) {
                return;
                /**
                 * if new value isn't object then just overwrite by new value
                 * instead of extending.
                 */
            }
            else if (typeof val !== 'object' || val === null) {
                target[key] = val;
                return;
                // just clone arrays (and recursive clone objects inside)
            }
            else if (Array.isArray(val)) {
                target[key] = cloneDeep(val);
                return;
                // overwrite by new value if source isn't object or array
            }
            else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                target[key] = deepExtend({}, val);
                return;
                // source value and new value is objects both, extending...
            }
            else {
                target[key] = deepExtend(src, val);
                return;
            }
        });
    });
    return target;
};
export class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
// getDeepFromObject({result: {data: 1}}, 'result.data', 2); // returns 1
export function getDeepFromObject(object = {}, name, defaultValue) {
    const keys = name.split('.');
    // clone the object
    let level = deepExtend({}, object);
    keys.forEach((k) => {
        if (typeof level !== 'undefined') {
            level = level[k];
        }
    });
    return typeof level === 'undefined' ? defaultValue : level;
}
export function getPageForRowIndex(index, perPage) {
    // we need to add 1 to convert 0-based index to 1-based page number.
    return Math.floor(index / perPage) + 1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvbGliL2hlbHBlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLFdBQVcsQ0FBQztBQUVwQzs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sQ0FBQyxNQUFNLFVBQVUsR0FBRyxVQUFVLEdBQUcsT0FBbUI7SUFDeEQsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUU7UUFDNUQsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDeEIsT0FBTyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckI7SUFFRCxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUIsdURBQXVEO0lBQ3ZELE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFdEQsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBRWIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ3hCLCtDQUErQztRQUMvQyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2pELE9BQU87U0FDUjtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRztZQUNwQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZTtZQUNsQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWTtZQUU1Qix1QkFBdUI7WUFDdkIsSUFBSSxHQUFHLEtBQUssTUFBTSxFQUFFO2dCQUNsQixPQUFPO2dCQUVQOzs7bUJBR0c7YUFDSjtpQkFBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLEtBQUssSUFBSSxFQUFFO2dCQUNsRCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNsQixPQUFPO2dCQUVQLHlEQUF5RDthQUMxRDtpQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzdCLE9BQU87Z0JBRVAseURBQXlEO2FBQzFEO2lCQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDeEUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2xDLE9BQU87Z0JBRVAsMkRBQTJEO2FBQzVEO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNuQyxPQUFPO2FBQ1I7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDO0FBRUYsTUFBTSxPQUFPLFFBQVE7SUFPbkI7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQzdDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBRUQseUVBQXlFO0FBQ3pFLE1BQU0sVUFBVSxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFLElBQVksRUFBRSxZQUFrQjtJQUM3RSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdCLG1CQUFtQjtJQUNuQixJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNqQixJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsRUFBRTtZQUNoQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2xCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDN0QsQ0FBQztBQUVELE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxLQUFhLEVBQUUsT0FBZTtJQUMvRCxvRUFBb0U7SUFDcEUsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Y2xvbmVEZWVwfSBmcm9tICdsb2Rhc2gtZXMnO1xuXG4vKipcbiAqIEV4dGVuZGluZyBvYmplY3QgdGhhdCBlbnRlcmVkIGluIGZpcnN0IGFyZ3VtZW50LlxuICpcbiAqIFJldHVybnMgZXh0ZW5kZWQgb2JqZWN0IG9yIGZhbHNlIGlmIGhhdmUgbm8gdGFyZ2V0IG9iamVjdCBvciBpbmNvcnJlY3QgdHlwZS5cbiAqXG4gKiBJZiB5b3Ugd2lzaCB0byBjbG9uZSBzb3VyY2Ugb2JqZWN0ICh3aXRob3V0IG1vZGlmeSBpdCksIGp1c3QgdXNlIGVtcHR5IG5ld1xuICogb2JqZWN0IGFzIGZpcnN0IGFyZ3VtZW50LCBsaWtlIHRoaXM6XG4gKiAgIGRlZXBFeHRlbmQoe30sIHlvdXJPYmpfMSwgW3lvdXJPYmpfTl0pO1xuICovXG5leHBvcnQgY29uc3QgZGVlcEV4dGVuZCA9IGZ1bmN0aW9uICguLi5vYmplY3RzOiBBcnJheTxhbnk+KTogYW55IHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxIHx8IHR5cGVvZiBhcmd1bWVudHNbMF0gIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50c1swXTtcbiAgfVxuXG4gIGNvbnN0IHRhcmdldCA9IGFyZ3VtZW50c1swXTtcblxuICAvLyBjb252ZXJ0IGFyZ3VtZW50cyB0byBhcnJheSBhbmQgY3V0IG9mZiB0YXJnZXQgb2JqZWN0XG4gIGNvbnN0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gIGxldCB2YWwsIHNyYztcblxuICBhcmdzLmZvckVhY2goKG9iajogYW55KSA9PiB7XG4gICAgLy8gc2tpcCBhcmd1bWVudCBpZiBpdCBpcyBhcnJheSBvciBpc24ndCBvYmplY3RcbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHNyYyA9IHRhcmdldFtrZXldOyAvLyBzb3VyY2UgdmFsdWVcbiAgICAgIHZhbCA9IG9ialtrZXldOyAvLyBuZXcgdmFsdWVcblxuICAgICAgLy8gcmVjdXJzaW9uIHByZXZlbnRpb25cbiAgICAgIGlmICh2YWwgPT09IHRhcmdldCkge1xuICAgICAgICByZXR1cm47XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGlmIG5ldyB2YWx1ZSBpc24ndCBvYmplY3QgdGhlbiBqdXN0IG92ZXJ3cml0ZSBieSBuZXcgdmFsdWVcbiAgICAgICAgICogaW5zdGVhZCBvZiBleHRlbmRpbmcuXG4gICAgICAgICAqL1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsICE9PSAnb2JqZWN0JyB8fCB2YWwgPT09IG51bGwpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSB2YWw7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgICAvLyBqdXN0IGNsb25lIGFycmF5cyAoYW5kIHJlY3Vyc2l2ZSBjbG9uZSBvYmplY3RzIGluc2lkZSlcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gY2xvbmVEZWVwKHZhbCk7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgICAvLyBvdmVyd3JpdGUgYnkgbmV3IHZhbHVlIGlmIHNvdXJjZSBpc24ndCBvYmplY3Qgb3IgYXJyYXlcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHNyYyAhPT0gJ29iamVjdCcgfHwgc3JjID09PSBudWxsIHx8IEFycmF5LmlzQXJyYXkoc3JjKSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IGRlZXBFeHRlbmQoe30sIHZhbCk7XG4gICAgICAgIHJldHVybjtcblxuICAgICAgICAvLyBzb3VyY2UgdmFsdWUgYW5kIG5ldyB2YWx1ZSBpcyBvYmplY3RzIGJvdGgsIGV4dGVuZGluZy4uLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBkZWVwRXh0ZW5kKHNyYywgdmFsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuZXhwb3J0IGNsYXNzIERlZmVycmVkIHtcblxuICBwcm9taXNlOiBQcm9taXNlPGFueT47XG5cbiAgcmVzb2x2ZTogYW55O1xuICByZWplY3Q6IGFueTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnJlc29sdmUgPSByZXNvbHZlO1xuICAgICAgdGhpcy5yZWplY3QgPSByZWplY3Q7XG4gICAgfSk7XG4gIH1cbn1cblxuLy8gZ2V0RGVlcEZyb21PYmplY3Qoe3Jlc3VsdDoge2RhdGE6IDF9fSwgJ3Jlc3VsdC5kYXRhJywgMik7IC8vIHJldHVybnMgMVxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZXBGcm9tT2JqZWN0KG9iamVjdCA9IHt9LCBuYW1lOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSkge1xuICBjb25zdCBrZXlzID0gbmFtZS5zcGxpdCgnLicpO1xuICAvLyBjbG9uZSB0aGUgb2JqZWN0XG4gIGxldCBsZXZlbCA9IGRlZXBFeHRlbmQoe30sIG9iamVjdCk7XG4gIGtleXMuZm9yRWFjaCgoaykgPT4ge1xuICAgIGlmICh0eXBlb2YgbGV2ZWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBsZXZlbCA9IGxldmVsW2tdO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHR5cGVvZiBsZXZlbCA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0VmFsdWUgOiBsZXZlbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhZ2VGb3JSb3dJbmRleChpbmRleDogbnVtYmVyLCBwZXJQYWdlOiBudW1iZXIpOiBudW1iZXIge1xuICAvLyB3ZSBuZWVkIHRvIGFkZCAxIHRvIGNvbnZlcnQgMC1iYXNlZCBpbmRleCB0byAxLWJhc2VkIHBhZ2UgbnVtYmVyLlxuICByZXR1cm4gTWF0aC5mbG9vcihpbmRleCAvIHBlclBhZ2UpICsgMTtcbn1cbiJdfQ==