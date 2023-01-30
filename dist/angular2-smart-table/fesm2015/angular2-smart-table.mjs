import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, Injectable, Directive, HostListener, Pipe, ViewContainerRef, ViewChild, ChangeDetectionStrategy, ViewChildren, NgModule } from '@angular/core';
import * as i1 from '@angular/forms';
import { NgControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { __awaiter } from 'tslib';
import { Subject, of, combineLatest, lastValueFrom } from 'rxjs';
import { takeUntil, filter, skip, distinctUntilChanged, debounceTime, map, delay } from 'rxjs/operators';
import { cloneDeep } from 'lodash-es';
import * as i1$1 from '@angular/platform-browser';
import * as i1$2 from 'ng2-completer';
import { Ng2CompleterModule } from 'ng2-completer';
import * as i1$3 from 'angular2-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { HttpParams } from '@angular/common/http';

class DataSource {
    constructor() {
        this.onChangedSource = new Subject();
        this.onAddedSource = new Subject();
        this.onUpdatedSource = new Subject();
        this.onRemovedSource = new Subject();
    }
    refresh() {
        this.emitOnChanged('refresh');
    }
    load(data) {
        this.emitOnChanged('load');
        return Promise.resolve();
    }
    onChanged() {
        return this.onChangedSource.asObservable();
    }
    onAdded() {
        return this.onAddedSource.asObservable();
    }
    onUpdated() {
        return this.onUpdatedSource.asObservable();
    }
    onRemoved() {
        return this.onRemovedSource.asObservable();
    }
    prepend(element) {
        this.emitOnAdded(element);
        this.emitOnChanged('prepend');
        return Promise.resolve();
    }
    append(element) {
        this.emitOnAdded(element);
        this.emitOnChanged('append');
        return Promise.resolve();
    }
    add(element) {
        this.emitOnAdded(element);
        this.emitOnChanged('add');
        return Promise.resolve();
    }
    remove(element) {
        this.emitOnRemoved(element);
        this.emitOnChanged('remove');
        return Promise.resolve();
    }
    update(element, values) {
        this.emitOnUpdated(element);
        this.emitOnChanged('update');
        return Promise.resolve();
    }
    empty() {
        this.emitOnChanged('empty');
        return Promise.resolve();
    }
    /**
     *
     * Array of conf objects
     * [
     *  {field: string, direction: asc|desc|null, compare?: Function|null},
     * ]
     * @param conf the configuration to add
     * @param doEmit indicates whether a sort event shall be emitted
     * @returns this data source
     */
    setSort(conf, doEmit) {
        if (doEmit) {
            this.emitOnChanged('sort');
        }
    }
    /**
     *
     * Array of conf objects
     * [
     *  {field: string, direction: asc|desc|null, compare?: Function|null},
     * ]
     * @param conf the configuration to add
     * @param doEmit indicates whether a sort event shall be emitted
     * @returns this data source
     */
    updateSort(conf, doEmit) {
        if (doEmit) {
            this.emitOnChanged('sort');
        }
    }
    setFilter(conf, andOperator, doEmit) {
        if (doEmit) {
            this.emitOnChanged('filter');
        }
    }
    addFilter(fieldConf, andOperator, doEmit) {
        if (doEmit) {
            this.emitOnChanged('filter');
        }
    }
    setPaging(page, perPage, doEmit) {
        if (doEmit) {
            this.emitOnChanged('paging');
        }
    }
    setPage(page, doEmit) {
        if (doEmit) {
            this.emitOnChanged('page');
        }
    }
    emitOnRemoved(element) {
        this.onRemovedSource.next(element);
    }
    emitOnUpdated(element) {
        this.onUpdatedSource.next(element);
    }
    emitOnAdded(element) {
        this.onAddedSource.next(element);
    }
    emitOnChanged(action) {
        this.getElements().then((elements) => this.onChangedSource.next({
            action: action,
            elements: elements,
            paging: this.getPaging(),
            filter: this.getFilter(),
            sort: this.getSort(),
        }));
    }
}

function defaultObjectComparator(direction, left, right) {
    if (left == null && right == null) {
        return 0;
    }
    // only one of them can be null now
    if (left == null || left < right) {
        return -1 * direction;
    }
    if (right == null || right < left) {
        return direction;
    }
    // none of them can be null now, and they must be equal
    return 0;
}
function defaultNumberComparator(direction, left, right) {
    // the default comparator already does what we want, so this function is merely a type-safe alias
    return defaultObjectComparator(direction, left, right);
}
function defaultStringComparator(direction, left, right) {
    if (left == null && right == null) {
        return 0;
    }
    else if (left == null) {
        return -1 * direction;
    }
    else if (right == null) {
        return direction;
    }
    else {
        return left.localeCompare(right) * direction;
    }
}
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
function defaultComparator(direction, left, right) {
    const leftIsNumeric = left == null || (!isNaN(parseFloat(left)) && !isNaN(left - 0));
    const rightIsNumeric = right == null || (!isNaN(parseFloat(right)) && !isNaN(right - 0));
    const leftIsString = left == null || (typeof left === 'string');
    const rightIsString = right == null || (typeof right === 'string');
    if (leftIsNumeric && rightIsNumeric) {
        return defaultNumberComparator(direction, Number(left), Number(right));
    }
    else if (leftIsString && rightIsString) {
        return defaultStringComparator(direction, left, right);
    }
    else {
        return defaultObjectComparator(direction, left, right);
    }
}

/**
 * A filter predicate that implements a case-insensitive string inclusion.
 *
 * @param cellValue the cell value to check
 * @param search the search/filter string to check against
 * @param data ignored
 * @param cellName ignored
 */
function defaultStringInclusionFilter(cellValue, search, data, cellName) {
    var _a, _b;
    /* Implementation note: we declared the parameters as strings, but this does NOT mean they
     * are actually strings because Typescript does NOT check the types. Therefore, we call toString() on the inputs.
     */
    const sanitizedCellValue = (_a = cellValue === null || cellValue === void 0 ? void 0 : cellValue.toString()) !== null && _a !== void 0 ? _a : '';
    const sanitizedSearchString = (_b = search === null || search === void 0 ? void 0 : search.toString()) !== null && _b !== void 0 ? _b : '';
    return sanitizedCellValue.toLowerCase().includes(sanitizedSearchString.toLowerCase());
}
/**
 * A filter predicate that implements a case-sensitive equality check.
 *
 * @param cellValue the cell value to check
 * @param search the search/filter string to check against
 * @param data ignored
 * @param cellName ignored
 */
function defaultStringEqualsFilter(cellValue, search, data, cellName) {
    var _a, _b;
    /* Implementation note: we declared the parameters as strings, but this does NOT mean they
     * are actually strings because Typescript does NOT check the types. Therefore, we call toString() on the inputs.
     */
    const sanitizedCellValue = (_a = cellValue === null || cellValue === void 0 ? void 0 : cellValue.toString()) !== null && _a !== void 0 ? _a : '';
    const sanitizedSearchString = (_b = search === null || search === void 0 ? void 0 : search.toString()) !== null && _b !== void 0 ? _b : '';
    return sanitizedCellValue === sanitizedSearchString;
}
class LocalFilter {
    static filter(data, filterConf) {
        const filter = filterConf.filter ? filterConf.filter : defaultStringInclusionFilter;
        return data.filter((el) => {
            let parts = filterConf.field.split(".");
            let prop = el;
            for (let i = 0; i < parts.length && typeof prop !== 'undefined'; i++) {
                prop = prop[parts[i]];
            }
            return filter.call(null, prop, filterConf.search, data, filterConf.field, el);
        });
    }
}

class LocalPager {
    static paginate(data, page, perPage) {
        return data.slice(perPage * (page - 1), perPage * page);
    }
}

/**
 * Extending object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
const deepExtend = function (...objects) {
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
class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}
// getDeepFromObject({result: {data: 1}}, 'result.data', 2); // returns 1
function getDeepFromObject(object = {}, name, defaultValue) {
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
function getPageForRowIndex(index, perPage) {
    // we need to add 1 to convert 0-based index to 1-based page number.
    return Math.floor(index / perPage) + 1;
}

class LocalDataSource extends DataSource {
    constructor(data = []) {
        super();
        this.data = [];
        this.filteredAndSorted = [];
        this.sortConf = [];
        this.filterConf = {
            filters: [],
            andOperator: true,
        };
        this.pagingConf = { page: 1, perPage: 10 };
        this.selectedItems = [];
        this.data = data;
    }
    load(data) {
        this.data = data;
        return super.load(data);
    }
    prepend(element) {
        this.reset(true);
        this.data.unshift(element);
        return super.prepend(element);
    }
    append(element) {
        this.reset(true);
        this.data.push(element);
        return super.append(element);
    }
    add(element) {
        this.data.push(element);
        return super.add(element);
    }
    remove(element) {
        this.data = this.data.filter(el => el !== element);
        return super.remove(element);
    }
    update(element, values) {
        return new Promise((resolve, reject) => {
            this.find(element).then((found) => {
                found = deepExtend(found, values);
                super.update(found, values).then(resolve).catch(reject);
            }).catch(reject);
        });
    }
    find(element) {
        const found = this.data.find(el => el === element);
        if (found) {
            return Promise.resolve(found);
        }
        return Promise.reject(new Error('Element was not found in the dataset'));
    }
    getElements() {
        const data = this.data.slice(0);
        return Promise.resolve(this.prepareData(data));
    }
    getFilteredAndSorted() {
        let data = this.data.slice(0);
        this.prepareData(data); // this would return only the current page, but it sets filteredAndSorted array
        return Promise.resolve(this.filteredAndSorted);
    }
    getAll() {
        const data = this.data.slice(0);
        return Promise.resolve(data);
    }
    reset(silent = false) {
        if (silent) {
            this.filterConf = {
                filters: [],
                andOperator: true,
            };
            this.sortConf = [];
            this.pagingConf.page = 1;
        }
        else {
            this.setFilter([], true, false);
            this.setSort([], false);
            this.setPage(1);
        }
    }
    empty() {
        this.data = [];
        return super.empty();
    }
    count() {
        return this.filteredAndSorted.length;
    }
    toggleItem(row, isSelected) {
        if (isSelected)
            this.selectedItems.push(row);
        else
            this.selectedItems = this.selectedItems.filter((i) => i !== row);
    }
    // TODO: actually there is no need that this is an async function, but changing the signature would be a breaking change
    selectAllItems(checked, onlyFiltered = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (checked) {
                const itemsToSelect = onlyFiltered ? this.filteredAndSorted : this.data;
                this.selectedItems = itemsToSelect.slice(0);
            }
            else
                this.selectedItems = [];
        });
    }
    isEveryElementSelected(onlyFiltered = false) {
        const itemsToCheck = onlyFiltered ? this.filteredAndSorted : this.data;
        if (onlyFiltered) {
            // TODO: this is an ugly and costly O(n²) check, but currently we have no other choice....
            if (itemsToCheck.length !== this.selectedItems.length)
                return false;
            for (const item of itemsToCheck) {
                if (this.selectedItems.indexOf(itemsToCheck) < 0)
                    return false;
            }
            return true;
        }
        else {
            return itemsToCheck.length === this.selectedItems.length;
        }
    }
    getSelectedItems() {
        return this.selectedItems;
    }
    setSort(conf, doEmit = true) {
        this.sortConf = conf !== null && conf !== void 0 ? conf : [];
        super.setSort(conf, doEmit);
        return this;
    }
    updateSort(conf, doEmit = true) {
        if (conf !== null) {
            conf.forEach((fieldConf) => {
                const found = this.sortConf.findIndex(c => c.field === fieldConf.field);
                if (found >= 0) {
                    if (fieldConf.compare === undefined) {
                        // keep the previously configured compare function
                        fieldConf.compare = this.sortConf[found].compare;
                    }
                    this.sortConf.splice(found, 1);
                }
                // push the updated config to the front of the array (highest sort priority)
                this.sortConf = [fieldConf, ...this.sortConf];
            });
        }
        super.setSort(conf, doEmit);
        return this;
    }
    /**
     *
     * Array of conf objects
     * [
     *  {field: string, search: string, filter: Function|null},
     * ]
     * @param conf
     * @param andOperator
     * @param doEmit
     * @returns {LocalDataSource}
     */
    setFilter(conf, andOperator = true, doEmit = true) {
        if (conf && conf.length > 0) {
            conf.forEach((fieldConf) => {
                this.addFilter(fieldConf, andOperator, false);
            });
        }
        else {
            this.filterConf = {
                filters: [],
                andOperator: true,
            };
        }
        this.filterConf.andOperator = andOperator;
        this.pagingConf.page = 1;
        super.setFilter(conf, andOperator, doEmit);
        return this;
    }
    addFilter(fieldConf, andOperator = true, doEmit = true) {
        let found = false;
        this.filterConf.filters.forEach((currentFieldConf, index) => {
            if (currentFieldConf.field === fieldConf.field) {
                this.filterConf.filters[index] = fieldConf;
                found = true;
            }
        });
        if (!found) {
            this.filterConf.filters.push(fieldConf);
        }
        this.filterConf.andOperator = andOperator;
        super.addFilter(fieldConf, andOperator, doEmit);
        return this;
    }
    setPaging(page, perPage, doEmit = true) {
        this.pagingConf.page = page;
        this.pagingConf.perPage = perPage;
        super.setPaging(page, perPage, doEmit);
        return this;
    }
    setPage(page, doEmit = true) {
        this.pagingConf.page = page;
        super.setPage(page, doEmit);
        return this;
    }
    getSort() {
        return this.sortConf;
    }
    getFilter() {
        return this.filterConf;
    }
    getPaging() {
        return this.pagingConf;
    }
    prepareData(data) {
        data = this.filter(data);
        data = this.sort(data);
        this.filteredAndSorted = data.slice(0);
        return this.paginate(data);
    }
    sort(data) {
        // only use the part of the config where sorting is enabled
        const sortConfig = this.sortConf.filter(c => c.direction !== null);
        return data.sort((a, b) => {
            for (const sc of sortConfig) {
                const dir = (sc.direction === 'asc') ? 1 : -1;
                const compare = sc.compare ? sc.compare : defaultComparator;
                let parts = sc.field.split(".");
                let propA = a;
                for (let i = 0; i < parts.length && typeof propA !== 'undefined'; i++) {
                    propA = propA[parts[i]];
                }
                let propB = b;
                for (let i = 0; i < parts.length && typeof propB !== 'undefined'; i++) {
                    propB = propB[parts[i]];
                }
                const result = compare.call(null, dir, propA, propB);
                if (result !== 0)
                    return result;
            }
            return 0;
        });
    }
    // TODO: refactor?
    filter(data) {
        if (this.filterConf.filters) {
            if (this.filterConf.andOperator) {
                this.filterConf.filters.forEach(fieldConf => {
                    if (fieldConf.search.length > 0) {
                        data = LocalFilter.filter(data, fieldConf);
                    }
                });
            }
            else {
                let mergedData = [];
                this.filterConf.filters.forEach((fieldConf) => {
                    if (fieldConf['search'].length > 0) {
                        mergedData = mergedData.concat(LocalFilter.filter(data, fieldConf));
                    }
                });
                // remove non unique items
                data = mergedData.filter((elem, pos, arr) => {
                    return arr.indexOf(elem) === pos;
                });
            }
        }
        return data;
    }
    paginate(data) {
        return LocalPager.paginate(data, this.pagingConf.page, this.pagingConf.perPage);
    }
}

function prepareValue(value) { return value; }
class Cell {
    constructor(value, row, column, dataSet) {
        this.value = value;
        this.row = row;
        this.column = column;
        this.dataSet = dataSet;
        this.newValue = '';
        this.newValue = value;
    }
    getColumn() {
        return this.column;
    }
    getRow() {
        return this.row;
    }
    /**
     * Gets the value (after post-processing with valuePrepareFunction).
     */
    getValue() {
        const valid = this.column.getValuePrepareFunction() instanceof Function;
        const prepare = valid ? this.column.getValuePrepareFunction() : Cell.PREPARE;
        return prepare.call(null, this.value, this.row.getData(), this);
    }
    /**
     * Returns the raw value that has not been post-processed by the valuePrepareFunction.
     */
    getRawValue() {
        return this.value;
    }
    setValue(value) {
        this.newValue = value;
    }
    getId() {
        return this.getColumn().id;
    }
    getTitle() {
        return this.getColumn().title;
    }
    isEditable() {
        var _a, _b;
        if (this.getRow().index === -1) {
            return (_a = this.getColumn().isAddable) !== null && _a !== void 0 ? _a : false;
        }
        else {
            return (_b = this.getColumn().isEditable) !== null && _b !== void 0 ? _b : false;
        }
    }
    resetValue() {
        this.newValue = this.getRawValue();
    }
}
Cell.PREPARE = prepareValue;

class Row {
    constructor(index, data, _dataSet) {
        this.index = index;
        this.data = data;
        this._dataSet = _dataSet;
        this.isSelected = false;
        this.isInEditing = false;
        this.isExpanded = false;
        this.cells = [];
        this.process();
    }
    getCell(column) {
        const theCell = this.cells.find(el => el.getColumn() === column);
        if (!theCell)
            throw new Error('There is no cell with such Column');
        return theCell;
    }
    getCells() {
        return this.cells;
    }
    getData() {
        return this.data;
    }
    getIsSelected() {
        return this.isSelected;
    }
    getIsExpanded() {
        return this.isExpanded;
    }
    getNewData() {
        const values = Object.assign({}, this.data);
        this.getCells().forEach((cell) => values[cell.getColumn().id] = cell.newValue);
        return values;
    }
    setData(data) {
        this.data = data;
        this.process();
    }
    process() {
        this.cells = [];
        this._dataSet.getColumns().forEach((column) => {
            const cell = this.createCell(column);
            this.cells.push(cell);
        });
    }
    createCell(column) {
        const defValue = column.settings.defaultValue ? column.settings.defaultValue : '';
        const value = typeof this.data[column.id] === 'undefined' ? defValue : this.data[column.id];
        return new Cell(value, this, column, this._dataSet);
    }
}

/**
 * @deprecated just use 'single' or 'multi'
 */
var SelectModeOptions;
(function (SelectModeOptions) {
    SelectModeOptions["Single"] = "single";
    SelectModeOptions["Multi"] = "multi";
})(SelectModeOptions || (SelectModeOptions = {}));
var IColumnType;
(function (IColumnType) {
    IColumnType["Text"] = "text";
    IColumnType["Html"] = "html";
    IColumnType["Custom"] = "custom";
})(IColumnType || (IColumnType = {}));

class Column {
    constructor(id, settings, dataSet) {
        this.id = id;
        this.settings = settings;
        this.dataSet = dataSet;
        this.title = '';
        this.hide = false;
        this.type = IColumnType.Text;
        this.sanitizer = {};
        this.classHeader = '';
        this.classContent = '';
        this.width = '';
        this.isSortable = true;
        this.isEditable = true;
        this.isAddable = true;
        this.isFilterable = false;
        this.sortDirection = 'asc';
        this.defaultSortDirection = undefined;
        this.editor = { type: '', config: {}, component: null };
        this.filter = { type: '', config: {}, component: null };
        this.renderComponent = null;
        this.process();
    }
    getOnComponentInitFunction() {
        return this.onComponentInitFunction;
    }
    getCompareFunction() {
        return this.compareFunction;
    }
    getValuePrepareFunction() {
        return this.valuePrepareFunction;
    }
    getFilterFunction() {
        return this.filterFunction;
    }
    getConfig() {
        return this.editor && this.editor.config;
    }
    getFilterType() {
        return this.filter && this.filter.type;
    }
    getFilterConfig() {
        return this.filter && this.filter.config;
    }
    /**
     * Retrieves a setting by name.
     *
     * @param key the current key name
     * @param compatKeys key names for backwards compatibility
     * @private
     */
    lookupSetting(key, compatKeys = []) {
        if (typeof this.settings[key] === undefined) {
            for (const k of compatKeys) {
                if (typeof this.settings[k] !== undefined) {
                    return this.settings[k];
                }
            }
            return undefined;
        }
        else {
            return this.settings[key];
        }
    }
    process() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        // the pattern is "X = lookup(key) ?? X" - this keeps the default value in case the setting is undefined
        this.placeholder = this.lookupSetting('placeholder');
        this.sanitizer = (_a = this.lookupSetting('sanitizer')) !== null && _a !== void 0 ? _a : {};
        this.title = (_b = this.lookupSetting('title')) !== null && _b !== void 0 ? _b : this.title;
        this.classHeader = (_c = this.lookupSetting('classHeader', ['class'])) !== null && _c !== void 0 ? _c : this.classHeader;
        this.classContent = (_d = this.lookupSetting('classContent', ['class'])) !== null && _d !== void 0 ? _d : this.classContent;
        this.width = (_e = this.lookupSetting('width')) !== null && _e !== void 0 ? _e : this.width;
        this.hide = (_f = this.lookupSetting('hide')) !== null && _f !== void 0 ? _f : this.hide;
        this.type = (_g = this.lookupSetting('type')) !== null && _g !== void 0 ? _g : this.determineType();
        this.editor = (_h = this.lookupSetting('editor')) !== null && _h !== void 0 ? _h : this.editor;
        this.filter = (_j = this.lookupSetting('filter')) !== null && _j !== void 0 ? _j : this.filter;
        this.renderComponent = (_k = this.lookupSetting('renderComponent')) !== null && _k !== void 0 ? _k : this.renderComponent;
        this.isFilterable = this.filter !== undefined && !!this.filter;
        this.isSortable = (_l = this.lookupSetting('isSortable', ['sort'])) !== null && _l !== void 0 ? _l : this.isSortable;
        this.isEditable = (_m = this.lookupSetting('isEditable', ['editable'])) !== null && _m !== void 0 ? _m : this.isEditable;
        this.isAddable = (_o = this.lookupSetting('isAddable')) !== null && _o !== void 0 ? _o : this.isAddable;
        this.defaultSortDirection = (_p = this.lookupSetting('sortDirection')) !== null && _p !== void 0 ? _p : this.defaultSortDirection;
        this.sortDirection = (_q = this.defaultSortDirection) !== null && _q !== void 0 ? _q : this.sortDirection;
        this.compareFunction = this.lookupSetting('compareFunction');
        this.valuePrepareFunction = this.lookupSetting('valuePrepareFunction');
        this.filterFunction = this.lookupSetting('filterFunction');
        this.onComponentInitFunction = this.lookupSetting('onComponentInitFunction');
    }
    determineType() {
        // TODO: determine type by data
        return IColumnType.Text;
    }
}

class DataSet {
    constructor(data = [], columnSettings) {
        this.columnSettings = columnSettings;
        this.data = [];
        this.columns = [];
        this.rows = [];
        this.willSelect = '';
        this.createColumns(columnSettings);
        this.setData(data);
        this.createNewRow();
    }
    setData(data, selectedRows = []) {
        this.data = data.map((el, index) => {
            const row = new Row(index, el, this);
            row.isSelected = selectedRows.indexOf(el) > -1;
            return row;
        });
        this.createRows();
    }
    getColumns() {
        return this.columns;
    }
    getExpandedRow() {
        if (!this.expandedRow) {
            console.warn('Expanded row not found');
            throw new Error('Expanded row not found');
        }
        return this.expandedRow;
    }
    getSelectedRow() {
        if (!this.selectedRow) {
            console.warn('Selected row not found');
            throw new Error('Selected row not found');
        }
        return this.selectedRow;
    }
    getRows() {
        var _a;
        return (_a = this.rows) !== null && _a !== void 0 ? _a : [];
    }
    getFirstRow() {
        return this.rows[0];
    }
    getLastRow() {
        return this.rows[this.rows.length - 1];
    }
    findRowByData(data) {
        const row = this.rows.find((row) => row.getData() === data);
        if (!row) {
            console.warn('Data row not found', data);
            throw new Error('Row not found');
        }
        return row;
    }
    deselectAll() {
        this.rows.forEach((row) => {
            row.isSelected = false;
        });
        // we need to clear selectedRow field because no one row selected
        this.selectedRow = undefined;
    }
    clearExpandAll() {
        this.rows.forEach((row) => {
            row.isExpanded = false;
        });
        // we need to clear selectedRow field because no one row selected
        this.expandedRow = undefined;
    }
    selectRow(row) {
        const previousIsSelected = row.isSelected;
        this.deselectAll();
        row.isSelected = !previousIsSelected;
        this.selectedRow = row;
    }
    multipleSelectRow(row) {
        row.isSelected = !row.isSelected;
        this.selectedRow = row;
    }
    expandRow(row) {
        var _a;
        const previousIsExpanded = row.isExpanded;
        this.clearExpandAll();
        if (row.index !== ((_a = this.expandedRow) === null || _a === void 0 ? void 0 : _a.index)) {
            this.expandedRow = undefined;
        }
        row.isExpanded = !previousIsExpanded;
        this.expandedRow = row;
        return this.expandedRow;
    }
    selectPreviousRow() {
        if (this.rows.length > 0) {
            let index = this.selectedRow ? this.selectedRow.index : 0;
            if (index > this.rows.length - 1) {
                index = this.rows.length - 1;
            }
            this.selectRow(this.rows[index]);
            return this.getSelectedRow();
        }
        throw new Error('There are no rows inside the data table');
    }
    selectFirstRow() {
        if (this.rows.length > 0) {
            this.selectRow(this.rows[0]);
            return this.getSelectedRow();
        }
        throw new Error('There are no rows inside the data table');
    }
    selectLastRow() {
        if (this.rows.length > 0) {
            this.selectRow(this.rows[this.rows.length - 1]);
            return this.getSelectedRow();
        }
        throw new Error('There are no rows inside the data table');
    }
    selectRowByIndex(index) {
        const rowsLength = this.rows.length;
        if (rowsLength === 0) {
            throw new Error('There are no rows inside the data table');
        }
        if (!index) {
            this.selectFirstRow();
        }
        else if (index > 0 && index < rowsLength) {
            this.selectRow(this.rows[index]);
        }
        else
            // we need to deselect all rows if we got an incorrect index
            this.deselectAll();
    }
    willSelectFirstRow() {
        this.willSelect = 'first';
    }
    willSelectLastRow() {
        this.willSelect = 'last';
    }
    select(selectedRowIndex) {
        if (this.getRows().length === 0) {
            throw new Error('There are no rows inside the data table');
        }
        if (this.willSelect) {
            if (this.willSelect === 'first') {
                this.selectFirstRow();
            }
            if (this.willSelect === 'last') {
                this.selectLastRow();
            }
            this.willSelect = '';
        }
        else {
            this.selectRowByIndex(selectedRowIndex);
        }
        return this.getSelectedRow();
    }
    createNewRow() {
        this.newRow = new Row(-1, {}, this);
        this.newRow.isInEditing = true;
    }
    /**
     * Create columns by mapping from the settings
     * @param settings
     * @private
     */
    createColumns(settings) {
        for (const id in settings) {
            if (settings.hasOwnProperty(id)) {
                this.columns.push(new Column(id, settings[id], this));
            }
        }
    }
    /**
     * Create rows based on current data prepared in data source
     * @private
     */
    createRows() {
        this.rows = [];
        this.data.forEach((el) => {
            this.rows.push(el);
        });
    }
}

class Grid {
    constructor(source, settings) {
        this.createFormShown = false;
        this.onSelectRowSource = new Subject();
        this.setSettings(settings);
        this.setSource(source);
    }
    detach() {
        if (this.sourceOnChangedSubscription) {
            this.sourceOnChangedSubscription.unsubscribe();
        }
        if (this.sourceOnUpdatedSubscription) {
            this.sourceOnUpdatedSubscription.unsubscribe();
        }
    }
    showActionColumn(position) {
        return this.isCurrentActionsPosition(position) && this.isActionsVisible();
    }
    isCurrentActionsPosition(position) {
        return position == this.getSetting('actions.position');
    }
    isActionsVisible() {
        return this.getSetting('actions.add') || this.getSetting('actions.edit') || this.getSetting('actions.delete') || this.getSetting('actions.custom').length;
    }
    isMultiSelectVisible() {
        return ['multi', 'multi_filtered'].indexOf(this.getSetting('selectMode')) > -1;
    }
    getNewRow() {
        return this.dataSet.newRow;
    }
    setSettings(settings) {
        this.settings = settings;
        this.dataSet = new DataSet([], this.getSetting('columns'));
        if (this.source) {
            this.source.refresh();
        }
    }
    getDataSet() {
        return this.dataSet;
    }
    setSource(source) {
        this.detach();
        this.source = this.prepareSource(source);
        this.sourceOnChangedSubscription = this.source.onChanged().subscribe((changes) => this.processDataChange(changes));
        this.sourceOnUpdatedSubscription = this.source.onUpdated().subscribe((data) => {
            const changedRow = this.dataSet.findRowByData(data);
            changedRow.setData(data);
        });
    }
    getSetting(name, defaultValue) {
        return getDeepFromObject(this.settings, name, defaultValue);
    }
    getColumns() {
        return this.dataSet.getColumns();
    }
    getRows() {
        return this.dataSet.getRows();
    }
    selectRow(row) {
        this.dataSet.selectRow(row);
        this.source.toggleItem(row.getData(), row.isSelected);
    }
    multipleSelectRow(row) {
        this.dataSet.multipleSelectRow(row);
        this.source.toggleItem(row.getData(), row.isSelected);
    }
    onSelectRow() {
        return this.onSelectRowSource.asObservable();
    }
    expandRow(row) {
        this.dataSet.expandRow(row);
    }
    edit(row) {
        row.isInEditing = true;
    }
    create(row, confirmEmitter) {
        const deferred = new Deferred();
        deferred.promise.then((newData) => {
            newData = newData ? newData : row.getNewData();
            if (deferred.resolve.skipAdd) {
                this.createFormShown = false;
            }
            else {
                this.source.prepend(newData).then(() => {
                    this.createFormShown = false;
                    this.dataSet.createNewRow();
                });
            }
        }).catch((err) => {
            // doing nothing
        });
        if (this.getSetting('add.confirmCreate')) {
            confirmEmitter.emit({
                newData: row.getNewData(),
                source: this.source,
                confirm: deferred,
            });
        }
        else {
            deferred.resolve();
        }
    }
    save(row, confirmEmitter) {
        const deferred = new Deferred();
        deferred.promise.then((newData) => {
            newData = newData ? newData : row.getNewData();
            if (deferred.resolve.skipEdit) {
                row.isInEditing = false;
            }
            else {
                this.source.update(row.getData(), newData).then(() => {
                    row.isInEditing = false;
                });
            }
        }).catch((err) => {
            // doing nothing
        });
        if (this.getSetting('edit.confirmSave')) {
            confirmEmitter.emit({
                row: row,
                data: row.getData(),
                newData: row.getNewData(),
                source: this.source,
                confirm: deferred,
            });
        }
        else {
            deferred.resolve();
        }
    }
    delete(row, confirmEmitter) {
        const deferred = new Deferred();
        deferred.promise.then(() => {
            this.source.remove(row.getData());
        }).catch((err) => {
            // doing nothing
        });
        if (this.getSetting('delete.confirmDelete')) {
            confirmEmitter.emit({
                row: row,
                data: row.getData(),
                source: this.source,
                confirm: deferred,
            });
        }
        else {
            deferred.resolve();
        }
    }
    processDataChange(changes) {
        if (this.shouldProcessChange(changes)) {
            this.dataSet.setData(changes.elements, this.getSelectedItems());
            if (this.getSetting('selectMode') === 'single') {
                if (this.dataSet.getRows().length > 0) {
                    const row = this.determineRowToSelect(changes);
                    this.onSelectRowSource.next(row);
                }
                else {
                    this.onSelectRowSource.next(null);
                }
            }
        }
    }
    shouldProcessChange(changes) {
        if (['filter', 'sort', 'page', 'remove', 'refresh', 'load', 'empty', 'paging'].indexOf(changes.action) !== -1) {
            return true;
        }
        else if (['prepend', 'append'].indexOf(changes.action) !== -1 && !this.getSetting('pager.display')) {
            return true;
        }
        return false;
    }
    /**
     * @breaking-change 1.8.0
     * Need to add `| null` in return type
     *
     * TODO: move to selectable? Separate directive
     */
    determineRowToSelect(changes) {
        if (['load', 'page', 'filter', 'sort', 'refresh'].indexOf(changes.action) !== -1) {
            return this.dataSet.select(this.getRowIndexToSelect());
        }
        if (this.shouldSkipSelection()) {
            return null;
        }
        if (changes.action === 'remove') {
            if (changes.elements.length === 0) {
                // we have to store which one to select as the data will be reloaded
                this.dataSet.willSelectLastRow();
            }
            else {
                return this.dataSet.selectPreviousRow();
            }
        }
        if (changes.action === 'append') {
            // we have to store which one to select as the data will be reloaded
            this.dataSet.willSelectLastRow();
        }
        if (changes.action === 'add') {
            return this.dataSet.selectFirstRow();
        }
        if (changes.action === 'update') {
            return this.dataSet.selectFirstRow();
        }
        if (changes.action === 'prepend') {
            // we have to store which one to select as the data will be reloaded
            this.dataSet.willSelectFirstRow();
        }
        return null;
    }
    prepareSource(source) {
        const initialSource = this.getInitialSort();
        if (initialSource && initialSource['field'] && initialSource['direction']) {
            source.setSort([initialSource], false);
        }
        source.setPaging(this.getPageToSelect(source), this.getSetting('pager.perPage'), false);
        source.refresh();
        return source;
    }
    getInitialSort() {
        const sortConf = {};
        this.getColumns().forEach((column) => {
            if (column.isSortable && column.defaultSortDirection) {
                sortConf['field'] = column.id;
                sortConf['direction'] = column.defaultSortDirection;
                sortConf['compare'] = column.getCompareFunction();
            }
        });
        return sortConf;
    }
    getSelectedRows() {
        return this.dataSet.getRows()
            .filter(r => r.isSelected);
    }
    getSelectedItems() {
        return this.source.getSelectedItems();
    }
    selectAllRows(status) {
        return __awaiter(this, void 0, void 0, function* () {
            // remember that the data set of the grid only contains the visible elements on the current page
            this.dataSet.getRows().forEach(r => r.isSelected = status);
            // advise the data source to also update the selected elements
            yield this.source.selectAllItems(status, this.getSetting('selectMode') === 'multi_filtered');
        });
    }
    getFirstRow() {
        return this.dataSet.getFirstRow();
    }
    getLastRow() {
        return this.dataSet.getLastRow();
    }
    getSelectionInfo() {
        const switchPageToSelectedRowPage = this.getSetting('switchPageToSelectedRowPage');
        const selectedRowIndex = Number(this.getSetting('selectedRowIndex', 0)) || 0;
        const { perPage, page } = this.getSetting('pager');
        return { perPage, page, selectedRowIndex, switchPageToSelectedRowPage };
    }
    getRowIndexToSelect() {
        const { switchPageToSelectedRowPage, selectedRowIndex, perPage } = this.getSelectionInfo();
        const dataAmount = this.source.count();
        /**
         * source - contains all table data
         * dataSet - contains data for current page
         * selectedRowIndex - contains index for data in all data
         *
         * because of that, we need to count index for a specific row in page
         * if
         * `switchPageToSelectedRowPage` - we need to change page automatically
         * `selectedRowIndex < dataAmount && selectedRowIndex >= 0` - index points to existing data
         * (if index points to non-existing data and we calculate index for current page - we will get wrong selected row.
         *  if we return index witch not points to existing data - no line will be highlighted)
         */
        return (switchPageToSelectedRowPage &&
            selectedRowIndex < dataAmount &&
            selectedRowIndex >= 0) ?
            selectedRowIndex % perPage :
            selectedRowIndex;
    }
    getPageToSelect(source) {
        const { switchPageToSelectedRowPage, selectedRowIndex, perPage, page } = this.getSelectionInfo();
        let pageToSelect = Math.max(1, page);
        if (switchPageToSelectedRowPage && selectedRowIndex >= 0) {
            pageToSelect = getPageForRowIndex(selectedRowIndex, perPage);
        }
        const maxPageAmount = Math.ceil(source.count() / perPage);
        return maxPageAmount ? Math.min(pageToSelect, maxPageAmount) : pageToSelect;
    }
    shouldSkipSelection() {
        /**
         * For backward compatibility when using `selectedRowIndex` with non-number values - ignored.
         *
         * Therefore, in order to select a row after some changes,
         * the `selectedRowIndex` value must be invalid or >= 0 (< 0 means that no row is selected).
         *
         * `Number(value)` returns `NaN` on all invalid cases, and comparisons with `NaN` always return `false`.
         *
         * !!! We should skip a row only in cases when `selectedRowIndex` < 0
         * because when < 0 all lines must be deselected
         */
        const selectedRowIndex = Number(this.getSetting('selectedRowIndex'));
        return selectedRowIndex < 0;
    }
}

class TagComponent {
    constructor() {
        this.close = new EventEmitter();
    }
    closeClicked(evt) {
        evt.stopPropagation();
        this.close.emit(this.item.id);
    }
}
TagComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TagComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TagComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TagComponent, selector: "angular2-smart-table-tag", inputs: { item: "item" }, outputs: { close: "close" }, ngImport: i0, template: "<div style=\"padding: 5px; display: inline; white-space: nowrap\">\n  <svg\n    style=\"width: 15px\"\n    (click)=\"closeClicked($event)\"\n    aria-hidden=\"true\"\n    focusable=\"false\"\n    data-prefix=\"fas\"\n    data-icon=\"times-circle\"\n    class=\"svg-inline--fa fa-times-circle fa-w-16\"\n    role=\"img\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 512 512\"\n  >\n    <path\n      fill=\"currentColor\"\n      d=\"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z\"\n    ></path>\n  </svg>\n  <span style=\"margin-left: 3px\" class=\"itemText\">{{ item.title }}</span>\n</div>\n", styles: ["*{box-sizing:border-box}*{padding:0;margin:0}ul{list-style-type:none}.add-tag-list{font-family:font8272;font-size:1.5em}.add-tag-list ul li{padding-left:20px;padding-right:20px;padding-bottom:8px;display:flex;flex-direction:row-reverse;float:left}.add-tag-list ul li:last-child{padding-right:0}.closeButton{display:inline}.closeButton:after{content:\"\\f057\";padding-left:4px;font-family:FontAwesome;color:#df0024;cursor:pointer}.closeButton:hover:after{color:#900110;transition:.6s linear}\n"] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TagComponent, decorators: [{
            type: Component,
            args: [{ selector: 'angular2-smart-table-tag', template: "<div style=\"padding: 5px; display: inline; white-space: nowrap\">\n  <svg\n    style=\"width: 15px\"\n    (click)=\"closeClicked($event)\"\n    aria-hidden=\"true\"\n    focusable=\"false\"\n    data-prefix=\"fas\"\n    data-icon=\"times-circle\"\n    class=\"svg-inline--fa fa-times-circle fa-w-16\"\n    role=\"img\"\n    xmlns=\"http://www.w3.org/2000/svg\"\n    viewBox=\"0 0 512 512\"\n  >\n    <path\n      fill=\"currentColor\"\n      d=\"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z\"\n    ></path>\n  </svg>\n  <span style=\"margin-left: 3px\" class=\"itemText\">{{ item.title }}</span>\n</div>\n", styles: ["*{box-sizing:border-box}*{padding:0;margin:0}ul{list-style-type:none}.add-tag-list{font-family:font8272;font-size:1.5em}.add-tag-list ul li{padding-left:20px;padding-right:20px;padding-bottom:8px;display:flex;flex-direction:row-reverse;float:left}.add-tag-list ul li:last-child{padding-right:0}.closeButton{display:inline}.closeButton:after{content:\"\\f057\";padding-left:4px;font-family:FontAwesome;color:#df0024;cursor:pointer}.closeButton:hover:after{color:#900110;transition:.6s linear}\n"] }]
        }], propDecorators: { item: [{
                type: Input
            }], close: [{
                type: Output
            }] } });

class TagsListComponent {
    constructor() {
        this.close = new EventEmitter();
    }
    closedTag(tag) {
        this.close.emit(tag);
    }
}
TagsListComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TagsListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TagsListComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TagsListComponent, selector: "angular2-smart-table-tags-list", inputs: { tags: "tags" }, outputs: { close: "close" }, ngImport: i0, template: "<div class=\"add-tag-list\" id=\"tagslist\">\n  <angular2-smart-table-tag\n    *ngFor=\"let tag of tags\"\n    [item]=\"tag\"\n    (close)=\"closedTag($event)\"\n  ></angular2-smart-table-tag>\n</div>\n", styles: ["*{box-sizing:border-box}*{padding:0;margin:0}ul{list-style-type:none}.add-tag-list{font-family:font8272;font-size:1.5em}.add-tag-list ul li{padding-left:20px;padding-right:20px;padding-bottom:8px;display:flex;flex-direction:row-reverse;float:left}.add-tag-list ul li:last-child{padding-right:0}.closeButton{display:inline}.closeButton:after{content:\"\\f057\";padding-left:4px;font-family:FontAwesome;color:#df0024;cursor:pointer}.closeButton:hover:after{color:#900110;transition:.6s linear}\n"], components: [{ type: TagComponent, selector: "angular2-smart-table-tag", inputs: ["item"], outputs: ["close"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TagsListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'angular2-smart-table-tags-list', template: "<div class=\"add-tag-list\" id=\"tagslist\">\n  <angular2-smart-table-tag\n    *ngFor=\"let tag of tags\"\n    [item]=\"tag\"\n    (close)=\"closedTag($event)\"\n  ></angular2-smart-table-tag>\n</div>\n", styles: ["*{box-sizing:border-box}*{padding:0;margin:0}ul{list-style-type:none}.add-tag-list{font-family:font8272;font-size:1.5em}.add-tag-list ul li{padding-left:20px;padding-right:20px;padding-bottom:8px;display:flex;flex-direction:row-reverse;float:left}.add-tag-list ul li:last-child{padding-right:0}.closeButton{display:inline}.closeButton:after{content:\"\\f057\";padding-left:4px;font-family:FontAwesome;color:#df0024;cursor:pointer}.closeButton:hover:after{color:#900110;transition:.6s linear}\n"] }]
        }], propDecorators: { tags: [{
                type: Input
            }], close: [{
                type: Output
            }] } });

class TableService {
    constructor() {
        this.mouseMoveEvent$ = new Subject();
    }
}
TableService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TableService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TableService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TableService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TableService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });

class ActionsTitleComponent {
    constructor(ref) {
        this.ref = ref;
    }
    ngAfterViewInit() {
        this.ref.nativeElement.classList.add('angular2-smart-actions');
    }
    ngOnChanges() {
        this.actionsColumnTitle = this.grid.getSetting('actions.columnTitle');
    }
}
ActionsTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ActionsTitleComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
ActionsTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: ActionsTitleComponent, selector: "[angular2-st-actions-title]", inputs: { grid: "grid" }, usesOnChanges: true, ngImport: i0, template: `
    <div class="angular2-smart-title">{{ actionsColumnTitle }}</div>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ActionsTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[angular2-st-actions-title]',
                    template: `
    <div class="angular2-smart-title">{{ actionsColumnTitle }}</div>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { grid: [{
                type: Input
            }] } });

class TitleComponent {
    constructor() {
        this.currentDirection = null;
        this.hide = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes.source) {
            if (!changes.source.firstChange) {
                this.dataChangedSub.unsubscribe();
            }
            this.dataChangedSub = this.source.onChanged().subscribe((dataChanges) => {
                this.currentDirection = null;
                const sortConf = this.source.getSort();
                if (sortConf) {
                    sortConf.forEach(c => {
                        if (c.field === this.column.id) {
                            this.currentDirection = c.direction;
                        }
                    });
                }
            });
        }
    }
    _sort(event) {
        event.preventDefault();
        this.changeSortDirection();
        this.source.updateSort([
            {
                field: this.column.id,
                direction: this.currentDirection,
                compare: this.column.getCompareFunction(),
            },
        ]);
    }
    _hideColumnClicked(event) {
        event.preventDefault();
        this.hide.emit(this.column.id);
    }
    changeSortDirection() {
        // rotate sort direction, including null (no sort)
        if (this.currentDirection === null) {
            this.currentDirection = 'asc';
        }
        else if (this.currentDirection === 'asc') {
            this.currentDirection = 'desc';
        }
        else if (this.currentDirection === 'desc') {
            this.currentDirection = null;
        }
    }
}
TitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TitleComponent, selector: "angular2-smart-table-title", inputs: { column: "column", source: "source", isHideable: "isHideable" }, outputs: { hide: "hide" }, usesOnChanges: true, ngImport: i0, template: `
    <a href="#" *ngIf="column.isSortable"
       (click)="_sort($event)"
       class="angular2-smart-sort-link sort"
       [ngClass]="currentDirection??''">
      {{ column.title }}
    </a>
    <span class="angular2-smart-sort" *ngIf="!column.isSortable">{{ column.title }}</span>
    <button style="position: absolute; top:0; right:0; border:none" *ngIf="isHideable"
            (click)="_hideColumnClicked($event)">X
    </button>
  `, isInline: true, styles: ["a.sort.asc,a.sort.desc{font-weight:700}a.sort.asc:after,a.sort.desc:after{content:\"\";display:inline-block;width:0;height:0;border-bottom:4px solid rgba(0,0,0,.3);border-top:4px solid transparent;border-left:4px solid transparent;border-right:4px solid transparent;margin-bottom:2px}a.sort.desc:after{transform:rotate(-180deg);margin-bottom:-2px}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TitleComponent, decorators: [{
            type: Component,
            args: [{ selector: 'angular2-smart-table-title', template: `
    <a href="#" *ngIf="column.isSortable"
       (click)="_sort($event)"
       class="angular2-smart-sort-link sort"
       [ngClass]="currentDirection??''">
      {{ column.title }}
    </a>
    <span class="angular2-smart-sort" *ngIf="!column.isSortable">{{ column.title }}</span>
    <button style="position: absolute; top:0; right:0; border:none" *ngIf="isHideable"
            (click)="_hideColumnClicked($event)">X
    </button>
  `, styles: ["a.sort.asc,a.sort.desc{font-weight:700}a.sort.asc:after,a.sort.desc:after{content:\"\";display:inline-block;width:0;height:0;border-bottom:4px solid rgba(0,0,0,.3);border-top:4px solid transparent;border-left:4px solid transparent;border-right:4px solid transparent;margin-bottom:2px}a.sort.desc:after{transform:rotate(-180deg);margin-bottom:-2px}\n"] }]
        }], propDecorators: { column: [{
                type: Input
            }], source: [{
                type: Input
            }], isHideable: [{
                type: Input
            }], hide: [{
                type: Output
            }] } });

class ColumnTitleComponent {
    constructor() {
        this.hide = new EventEmitter();
    }
}
ColumnTitleComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ColumnTitleComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ColumnTitleComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: ColumnTitleComponent, selector: "angular2-st-column-title", inputs: { column: "column", source: "source", isHideable: "isHideable" }, outputs: { hide: "hide" }, ngImport: i0, template: `
    <div class="angular2-smart-title">
      <angular2-smart-table-title [source]="source" [column]="column" [isHideable]="isHideable" (hide)="hide.emit($event)"></angular2-smart-table-title>
    </div>
  `, isInline: true, components: [{ type: TitleComponent, selector: "angular2-smart-table-title", inputs: ["column", "source", "isHideable"], outputs: ["hide"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ColumnTitleComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-st-column-title',
                    template: `
    <div class="angular2-smart-title">
      <angular2-smart-table-title [source]="source" [column]="column" [isHideable]="isHideable" (hide)="hide.emit($event)"></angular2-smart-table-title>
    </div>
  `,
                }]
        }], propDecorators: { column: [{
                type: Input
            }], source: [{
                type: Input
            }], isHideable: [{
                type: Input
            }], hide: [{
                type: Output
            }] } });

class NgxResizerDirective {
    constructor(elementRef, renderer, tableService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.tableService = tableService;
        this.destroyed$ = new Subject();
    }
    ngOnInit() {
        this.tableService.mouseMoveEvent$
            .pipe(takeUntil(this.destroyed$), filter(() => this.isClicked))
            .subscribe((event) => {
            const offset = this.pointerOffset - event.pageX;
            const width = this.parentOffset - offset;
            this.renderer.setStyle(this.parentElement, 'width', width + 'px');
            this.renderer.setStyle(this.siblingElement, 'width', this.siblingOffset + offset + 'px');
        });
    }
    onMouseEnter(event) {
        this.isClicked = true;
        this.parentElement = this.renderer.parentNode(this.elementRef.nativeElement);
        this.siblingElement = this.renderer.nextSibling(this.parentElement);
        this.pointerOffset = event.pageX;
        this.parentOffset = this.parentElement.offsetWidth;
        this.siblingOffset = this.siblingElement.offsetWidth;
    }
    onMouseDown() {
        this.isClicked = false;
    }
    ngOnDestroy() {
        this.destroyed$.next(null);
    }
}
NgxResizerDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: NgxResizerDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: TableService }], target: i0.ɵɵFactoryTarget.Directive });
NgxResizerDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.3.12", type: NgxResizerDirective, selector: "[angular2-resizer]", host: { listeners: { "mousedown": "onMouseEnter($event)", "document:mouseup": "onMouseDown()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: NgxResizerDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[angular2-resizer]'
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: TableService }]; }, propDecorators: { onMouseEnter: [{
                type: HostListener,
                args: ['mousedown', ['$event']]
            }], onMouseDown: [{
                type: HostListener,
                args: ['document:mouseup']
            }] } });

class TheadTitlesRowComponent {
    constructor() {
        this.hide = new EventEmitter();
        this.selectAllRows = new EventEmitter();
        this.multiSelectWidth = '3rem';
        this.isHideable = false;
    }
    ngOnChanges() {
        this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
        this.showActionColumnLeft = this.grid.showActionColumn('left');
        this.showActionColumnRight = this.grid.showActionColumn('right');
        this.isResizable = this.grid.getSetting('resizable');
        this.isHideable = this.grid.getSetting('hideable');
    }
    getVisibleColumns(columns) {
        return (columns || []).filter((column) => !column.hide);
    }
}
TheadTitlesRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadTitlesRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TheadTitlesRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TheadTitlesRowComponent, selector: "[angular2-st-thead-titles-row]", inputs: { grid: "grid", isAllSelected: "isAllSelected", source: "source" }, outputs: { hide: "hide", selectAllRows: "selectAllRows" }, usesOnChanges: true, ngImport: i0, template: `
    <th *ngIf="isMultiSelectVisible"
        [style.width]="multiSelectWidth"
    >
      <input type="checkbox" [ngModel]="isAllSelected" (click)="selectAllRows.emit()">
    </th>
    <th angular2-st-actions-title *ngIf="showActionColumnLeft" [grid]="grid"></th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())"
        class="angular2-smart-th {{ column.id }}"
        [ngClass]="column.classHeader ?? ''"
        [style.width]="column.width"
    >
      <angular2-st-column-title
        [source]="source"
        [column]="column"
        [isHideable]="isHideable"
        (hide)="hide.emit($event)"
      ></angular2-st-column-title>
      <div *ngIf="isResizable" angular2-resizer class="angular2-resizer-block"></div>
    </th>
    <th angular2-st-actions-title *ngIf="showActionColumnRight" [grid]="grid"></th>
  `, isInline: true, components: [{ type: ActionsTitleComponent, selector: "[angular2-st-actions-title]", inputs: ["grid"] }, { type: ColumnTitleComponent, selector: "angular2-st-column-title", inputs: ["column", "source", "isHideable"], outputs: ["hide"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: NgxResizerDirective, selector: "[angular2-resizer]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadTitlesRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[angular2-st-thead-titles-row]',
                    template: `
    <th *ngIf="isMultiSelectVisible"
        [style.width]="multiSelectWidth"
    >
      <input type="checkbox" [ngModel]="isAllSelected" (click)="selectAllRows.emit()">
    </th>
    <th angular2-st-actions-title *ngIf="showActionColumnLeft" [grid]="grid"></th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())"
        class="angular2-smart-th {{ column.id }}"
        [ngClass]="column.classHeader ?? ''"
        [style.width]="column.width"
    >
      <angular2-st-column-title
        [source]="source"
        [column]="column"
        [isHideable]="isHideable"
        (hide)="hide.emit($event)"
      ></angular2-st-column-title>
      <div *ngIf="isResizable" angular2-resizer class="angular2-resizer-block"></div>
    </th>
    <th angular2-st-actions-title *ngIf="showActionColumnRight" [grid]="grid"></th>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], isAllSelected: [{
                type: Input
            }], source: [{
                type: Input
            }], hide: [{
                type: Output
            }], selectAllRows: [{
                type: Output
            }] } });

class BypassSecurityTrustPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(value, type) {
        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            case 'none': return value;
        }
    }
}
BypassSecurityTrustPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: BypassSecurityTrustPipe, deps: [{ token: i1$1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
BypassSecurityTrustPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: BypassSecurityTrustPipe, name: "bypassSecurityTrust" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: BypassSecurityTrustPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bypassSecurityTrust'
                }]
        }], ctorParameters: function () { return [{ type: i1$1.DomSanitizer }]; } });

class AddButtonComponent {
    constructor(ref) {
        this.ref = ref;
        this.create = new EventEmitter();
        this.hiddenWhenFunction = () => false;
        this.disabledWhenFunction = () => false;
        this.bypassSecurityTrust = 'none';
    }
    ngAfterViewInit() {
        this.ref.nativeElement.classList.add('angular2-smart-actions-title', 'angular2-smart-actions-title-add');
    }
    get visible() {
        return !this.hiddenWhenFunction();
    }
    get disabled() {
        return this.disabledWhenFunction();
    }
    ngOnChanges() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.addNewButtonContent = (_b = (_a = this.grid.settings.add) === null || _a === void 0 ? void 0 : _a.addButtonContent) !== null && _b !== void 0 ? _b : 'Add';
        this.bypassSecurityTrust = ((_d = (_c = this.grid.settings.add) === null || _c === void 0 ? void 0 : _c.sanitizer) === null || _d === void 0 ? void 0 : _d.bypassHtml) ? 'html' : 'none';
        this.disabledWhenFunction = (_f = (_e = this.grid.settings.add) === null || _e === void 0 ? void 0 : _e.disabledWhen) !== null && _f !== void 0 ? _f : this.disabledWhenFunction;
        const actions = this.grid.settings.actions;
        if (actions === false || actions === undefined) {
            this.hiddenWhenFunction = () => (actions === false);
        }
        else {
            this.hiddenWhenFunction = (_h = (_g = this.grid.settings.add) === null || _g === void 0 ? void 0 : _g.hiddenWhen) !== null && _h !== void 0 ? _h : (() => (actions.add === false));
        }
    }
    onAdd(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.disabled)
            return;
        if (this.grid.getSetting('mode') === 'external') {
            this.create.emit({
                source: this.source,
            });
        }
        else {
            this.grid.createFormShown = true;
        }
    }
}
AddButtonComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AddButtonComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AddButtonComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: AddButtonComponent, selector: "[angular2-st-add-button]", inputs: { grid: "grid", source: "source" }, outputs: { create: "create" }, usesOnChanges: true, ngImport: i0, template: `
    <a *ngIf="visible" href="#" class="angular2-smart-action angular2-smart-action-add-add"
        [ngClass]="{'not-allowed': disabled}"
        [innerHTML]="addNewButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onAdd($event)"></a>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "bypassSecurityTrust": BypassSecurityTrustPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: AddButtonComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[angular2-st-add-button]',
                    template: `
    <a *ngIf="visible" href="#" class="angular2-smart-action angular2-smart-action-add-add"
        [ngClass]="{'not-allowed': disabled}"
        [innerHTML]="addNewButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onAdd($event)"></a>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { grid: [{
                type: Input
            }], source: [{
                type: Input
            }], create: [{
                type: Output
            }] } });

class FilterDefault {
    constructor() {
        this.inputClass = '';
        this.query = '';
    }
    onFilter(query) {
        this.source.addFilter({
            field: this.column.id,
            search: query,
            filter: this.column.getFilterFunction(),
        });
    }
}
FilterDefault.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterDefault, deps: [], target: i0.ɵɵFactoryTarget.Component });
FilterDefault.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FilterDefault, selector: "ng-component", inputs: { column: "column", source: "source", inputClass: "inputClass" }, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterDefault, decorators: [{
            type: Component,
            args: [{
                    template: '',
                }]
        }], propDecorators: { column: [{
                type: Input
            }], source: [{
                type: Input
            }], inputClass: [{
                type: Input
            }] } });

class CustomFilterComponent extends FilterDefault {
    ngOnChanges(changes) {
        if (this.column && !this.customComponent) {
            const filter = this.column.filter;
            if (!filter) {
                return;
            }
            this.customComponent = this.dynamicTarget.createComponent(filter.component);
            // set @Inputs and @Outputs of custom component
            this.customComponent.instance.query = this.query;
            this.customComponent.instance.column = this.column;
            this.customComponent.instance.source = this.source;
            this.customComponent.instance.inputClass = this.inputClass;
            this.customComponent.instance.filter.subscribe((event) => { this.onFilter(event); });
        }
        if (this.customComponent) {
            this.customComponent.instance.ngOnChanges(changes);
        }
    }
    ngOnDestroy() {
        if (this.customComponent) {
            this.customComponent.destroy();
        }
    }
}
CustomFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CustomFilterComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
CustomFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CustomFilterComponent, selector: "custom-table-filter", inputs: { query: "query" }, viewQueries: [{ propertyName: "dynamicTarget", first: true, predicate: ["dynamicTarget"], descendants: true, read: ViewContainerRef, static: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `<ng-template #dynamicTarget></ng-template>`, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CustomFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'custom-table-filter',
                    template: `<ng-template #dynamicTarget></ng-template>`,
                }]
        }], propDecorators: { query: [{
                type: Input
            }], dynamicTarget: [{
                type: ViewChild,
                args: ['dynamicTarget', { read: ViewContainerRef, static: true }]
            }] } });

class DefaultFilter {
    constructor() {
        this.delay = 300;
        this.filter = new EventEmitter();
    }
    ngOnDestroy() {
        if (this.changesSubscription) {
            this.changesSubscription.unsubscribe();
        }
        if (this.changesSubscription2) {
            this.changesSubscription2.unsubscribe();
        }
    }
    setFilter() {
        this.filter.emit(this.query);
    }
}
DefaultFilter.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultFilter, deps: [], target: i0.ɵɵFactoryTarget.Component });
DefaultFilter.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: DefaultFilter, selector: "ng-component", inputs: { query: "query", inputClass: "inputClass", column: "column" }, outputs: { filter: "filter" }, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultFilter, decorators: [{
            type: Component,
            args: [{
                    template: '',
                }]
        }], propDecorators: { query: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], column: [{
                type: Input
            }], filter: [{
                type: Output
            }] } });

class SelectFilterComponent extends DefaultFilter {
    ngOnInit() {
        this.column.filterFunction = this.onFilterValues.bind(this);
        const exist = this.inputControl.valueChanges;
        if (!exist) {
            return;
        }
        exist
            .pipe(skip(1), distinctUntilChanged(), debounceTime(this.delay))
            .subscribe((value) => this.setFilter());
    }
    onFilterValues(cellValue, search, data, cellName) {
        var _a, _b;
        const strictFilter = (_b = (_a = this.column.getFilterConfig()) === null || _a === void 0 ? void 0 : _a.strict) !== null && _b !== void 0 ? _b : false;
        if (strictFilter) {
            return defaultStringEqualsFilter(cellValue, search, data, cellName);
        }
        else {
            return defaultStringInclusionFilter(cellValue, search, data, cellName);
        }
    }
}
SelectFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: SelectFilterComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
SelectFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: SelectFilterComponent, selector: "select-filter", viewQueries: [{ propertyName: "inputControl", first: true, predicate: ["inputControl"], descendants: true, read: NgControl, static: true }], usesInheritance: true, ngImport: i0, template: `
    <select [ngClass]="inputClass"
            class="form-control"
            #inputControl
            [(ngModel)]="query">

        <option value="">{{ column.getFilterConfig().selectText }}</option>
        <option *ngFor="let option of column.getFilterConfig().list" [value]="option.value">
          {{ option.title }}
        </option>
    </select>
  `, isInline: true, directives: [{ type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: SelectFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'select-filter',
                    template: `
    <select [ngClass]="inputClass"
            class="form-control"
            #inputControl
            [(ngModel)]="query">

        <option value="">{{ column.getFilterConfig().selectText }}</option>
        <option *ngFor="let option of column.getFilterConfig().list" [value]="option.value">
          {{ option.title }}
        </option>
    </select>
  `,
                }]
        }], propDecorators: { inputControl: [{
                type: ViewChild,
                args: ['inputControl', { read: NgControl, static: true }]
            }] } });

class CheckboxFilterComponent extends DefaultFilter {
    constructor() {
        super();
        this.filterActive = false;
        this.inputControl = new FormControl();
    }
    ngOnInit() {
        this.changesSubscription = this.inputControl.valueChanges
            .pipe(debounceTime(this.delay))
            .subscribe((checked) => {
            this.filterActive = true;
            const trueVal = (this.column.getFilterConfig() && this.column.getFilterConfig().true) || true;
            const falseVal = (this.column.getFilterConfig() && this.column.getFilterConfig().false) || false;
            this.query = checked ? trueVal : falseVal;
            this.setFilter();
        });
    }
    resetFilter(event) {
        event.preventDefault();
        this.query = '';
        this.inputControl.setValue(false, { emitEvent: false });
        this.filterActive = false;
        this.setFilter();
    }
}
CheckboxFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CheckboxFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CheckboxFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CheckboxFilterComponent, selector: "checkbox-filter", usesInheritance: true, ngImport: i0, template: `
    <input type="checkbox" [formControl]="inputControl" [ngClass]="inputClass" class="form-control">
    <a href="#" *ngIf="filterActive"
                (click)="resetFilter($event)">{{column.getFilterConfig()?.resetText || 'reset'}}</a>
  `, isInline: true, directives: [{ type: i1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CheckboxFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'checkbox-filter',
                    template: `
    <input type="checkbox" [formControl]="inputControl" [ngClass]="inputClass" class="form-control">
    <a href="#" *ngIf="filterActive"
                (click)="resetFilter($event)">{{column.getFilterConfig()?.resetText || 'reset'}}</a>
  `,
                }]
        }], ctorParameters: function () { return []; } });

class CompleterFilterComponent extends DefaultFilter {
    constructor(completerService) {
        super();
        this.completerService = completerService;
        this.completerContent = new Subject();
    }
    ngOnInit() {
        const config = this.column.getFilterConfig().completer;
        config.dataService = this.completerService.local(config.data, config.searchFields, config.titleField);
        config.dataService.descriptionField(config.descriptionField);
        this.changesSubscription = this.completerContent
            .pipe(map((ev) => (ev && ev.title) || ev || ''), distinctUntilChanged(), debounceTime(this.delay))
            .subscribe((search) => {
            this.query = search;
            this.setFilter();
        });
    }
    inputTextChanged(event) {
        // workaround to trigger the search event when the home/end buttons are clicked
        // when this happens the [(ngModel)]="query" is set to "" but the (selected) method is not called
        // so here it gets called manually
        if (event === '') {
            this.completerContent.next(event);
        }
    }
}
CompleterFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CompleterFilterComponent, deps: [{ token: i1$2.CompleterService }], target: i0.ɵɵFactoryTarget.Component });
CompleterFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CompleterFilterComponent, selector: "completer-filter", usesInheritance: true, ngImport: i0, template: `
    <ng2-completer [(ngModel)]="query"
                   (ngModelChange)="inputTextChanged($event)"
                   [dataService]="column.getFilterConfig().completer.dataService"
                   [minSearchLength]="column.getFilterConfig().completer.minSearchLength || 0"
                   [pause]="column.getFilterConfig().completer.pause || 0"
                   [placeholder]="column.getFilterConfig().completer.placeholder || 'Start typing...'"
                   (selected)="completerContent.next($event)">
    </ng2-completer>
  `, isInline: true, components: [{ type: i1$2.CompleterCmp, selector: "ng2-completer", inputs: ["inputName", "inputId", "pause", "minSearchLength", "maxChars", "overrideSuggested", "clearSelected", "clearUnselected", "fillHighlighted", "placeholder", "autoMatch", "disableInput", "autofocus", "openOnFocus", "openOnClick", "selectOnClick", "selectOnFocus", "autoHighlight", "datasource", "dataService", "textNoResults", "textSearching", "matchClass", "fieldTabindex", "inputClass", "initialValue"], outputs: ["selected", "highlighted", "blur", "click", "focus", "opened", "keyup", "keydown"] }], directives: [{ type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CompleterFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'completer-filter',
                    template: `
    <ng2-completer [(ngModel)]="query"
                   (ngModelChange)="inputTextChanged($event)"
                   [dataService]="column.getFilterConfig().completer.dataService"
                   [minSearchLength]="column.getFilterConfig().completer.minSearchLength || 0"
                   [pause]="column.getFilterConfig().completer.pause || 0"
                   [placeholder]="column.getFilterConfig().completer.placeholder || 'Start typing...'"
                   (selected)="completerContent.next($event)">
    </ng2-completer>
  `,
                }]
        }], ctorParameters: function () { return [{ type: i1$2.CompleterService }]; } });

class DateFilterComponent extends DefaultFilter {
    constructor() {
        super();
        this.startDate = new FormControl();
        this.endDate = new FormControl();
        this.dateBefore = new FormControl();
        this.dateAfter = new FormControl();
        this.dateEqual = new FormControl();
        this.filterTypeSelect = new FormControl();
        this.filterType = 'after';
        this.filterOptions = ['before', 'after', 'equal', 'between'];
    }
    ngOnInit() {
        this.changesSubscription2 = this.filterTypeSelect.valueChanges.subscribe(value => {
            this.filterType = value;
            if (this.changesSubscription) {
                this.changesSubscription.unsubscribe();
            }
            this.changesSubscription = this.getFilterType()
                .subscribe((value) => {
                this.query = value;
                this.setFilter();
            });
        });
    }
    getFilterType() {
        switch (this.filterType) {
            case 'before': {
                return this.dateBefore.valueChanges.pipe(map((value) => '_date_before_' + value));
            }
            case 'after': {
                return this.dateAfter.valueChanges.pipe(map((value) => '_date_after_' + value));
            }
            case 'equal': {
                return this.dateEqual.valueChanges.pipe(map((value) => '_date_equal_' + value));
            }
            case 'between': {
                return combineLatest([this.startDate.valueChanges, this.endDate.valueChanges])
                    .pipe(map(([val1, val2]) => {
                    return '_start_date_' + val1 + '_end_date_' + val2;
                }));
            }
            default:
                return of('');
        }
    }
}
DateFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DateFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DateFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: DateFilterComponent, selector: "date-filter", usesInheritance: true, ngImport: i0, template: `
    <select [formControl]="filterTypeSelect">
      <option [value]="option" *ngFor="let  option of filterOptions">{{option}}</option>
    </select>
    <div [ngSwitch]="filterType">
     <input *ngSwitchCase="'before'" type="date" [formControl]="dateBefore" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'after'" type="date" [formControl]="dateAfter" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'equal'" type="date" [formControl]="dateEqual" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'between'" type="date" [formControl]="startDate" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'between'" type="date" [formControl]="endDate" [ngClass]="inputClass" class="form-control">
    </div>
  `, isInline: true, directives: [{ type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DateFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'date-filter',
                    template: `
    <select [formControl]="filterTypeSelect">
      <option [value]="option" *ngFor="let  option of filterOptions">{{option}}</option>
    </select>
    <div [ngSwitch]="filterType">
     <input *ngSwitchCase="'before'" type="date" [formControl]="dateBefore" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'after'" type="date" [formControl]="dateAfter" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'equal'" type="date" [formControl]="dateEqual" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'between'" type="date" [formControl]="startDate" [ngClass]="inputClass" class="form-control">
     <input *ngSwitchCase="'between'" type="date" [formControl]="endDate" [ngClass]="inputClass" class="form-control">
    </div>
  `,
                }]
        }], ctorParameters: function () { return []; } });

class MselectFilterComponent extends DefaultFilter {
    constructor() {
        super(...arguments);
        this.selector = "*;*";
        this.dropdownList = [];
        this.selectedItems = [];
        this.dropdownSettings = {};
    }
    ngOnInit() {
        this.column.filterFunction = this.onFilterValues.bind(this);
        const config = this.column.getFilterConfig();
        this.dropdownList = config.dropdownList || [];
        this.selectedItems = config.selectedItems || [];
        let setting = {
            singleSelection: false,
            text: "Select",
            selectAllText: "Select All",
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            classes: "myclass",
            maxHeight: 200,
            position: 'top',
            autoPosition: true,
        };
        this.dropdownSettings = Object.assign(setting, config.dropdownSettings);
    }
    onFilterValues(cellValue, search, data, cellName) {
        var _a, _b;
        if (search.indexOf(this.selector) != -1) {
            let searchArray = search.split(this.selector);
            return searchArray.indexOf(cellValue) != -1;
        }
        const strictFilter = (_b = (_a = this.column.getFilterConfig()) === null || _a === void 0 ? void 0 : _a.strict) !== null && _b !== void 0 ? _b : false;
        if (strictFilter) {
            return defaultStringEqualsFilter(cellValue, search, data, cellName);
        }
        else {
            return defaultStringInclusionFilter(cellValue, search, data, cellName);
        }
    }
    onItemSelect(item) {
        this.updateQuery();
    }
    OnItemDeSelect(item) {
        this.updateQuery();
    }
    onSelectAll(items) {
        this.updateQuery();
    }
    onDeSelectAll(items) {
        this.updateQuery();
    }
    updateQuery() {
        this.query = this.selectedItems.map(item => item.id).join(this.selector); //.replace(/ /g, '')
        this.setFilter();
    }
}
MselectFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: MselectFilterComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
MselectFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: MselectFilterComponent, selector: "mselect-filter", usesInheritance: true, ngImport: i0, template: `<angular2-multiselect [data]="dropdownList"
    [(ngModel)]="selectedItems"
    [settings]="dropdownSettings"
    (onSelect)="onItemSelect($event)"
    (onDeSelect)="OnItemDeSelect($event)"
    (onSelectAll)="onSelectAll($event)"
    (onDeSelectAll)="onDeSelectAll($event)">
    </angular2-multiselect>`, isInline: true, components: [{ type: i1$3.AngularMultiSelect, selector: "angular2-multiselect", inputs: ["settings", "data", "loading"], outputs: ["onSelect", "onDeSelect", "onSelectAll", "onDeSelectAll", "onOpen", "onClose", "onScrollToEnd", "onFilterSelectAll", "onFilterDeSelectAll", "onAddFilterNewItem", "onGroupSelect", "onGroupDeSelect"] }], directives: [{ type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: MselectFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'mselect-filter',
                    template: `<angular2-multiselect [data]="dropdownList"
    [(ngModel)]="selectedItems"
    [settings]="dropdownSettings"
    (onSelect)="onItemSelect($event)"
    (onDeSelect)="OnItemDeSelect($event)"
    (onSelectAll)="onSelectAll($event)"
    (onDeSelectAll)="onDeSelectAll($event)">
    </angular2-multiselect>`
                }]
        }] });

class InputFilterComponent extends DefaultFilter {
    constructor() {
        super();
        this.inputControl = new FormControl();
    }
    ngOnInit() {
        if (this.query) {
            this.inputControl.setValue(this.query);
        }
        this.inputControl.valueChanges
            .pipe(distinctUntilChanged(), debounceTime(this.delay))
            .subscribe((value) => {
            this.query = this.inputControl.value;
            this.setFilter();
        });
    }
    ngOnChanges(changes) {
        if (changes.query) {
            this.inputControl.setValue(this.query);
        }
    }
}
InputFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: InputFilterComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
InputFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: InputFilterComponent, selector: "input-filter", usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <input
      [ngClass]="inputClass"
      [formControl]="inputControl"
      class="form-control"
      type="text"
      placeholder="{{ column.placeholder || column.title }}"/>
  `, isInline: true, directives: [{ type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: InputFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'input-filter',
                    template: `
    <input
      [ngClass]="inputClass"
      [formControl]="inputControl"
      class="form-control"
      type="text"
      placeholder="{{ column.placeholder || column.title }}"/>
  `,
                }]
        }], ctorParameters: function () { return []; } });

class DefaultFilterComponent extends FilterDefault {
}
DefaultFilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultFilterComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
DefaultFilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: DefaultFilterComponent, selector: "default-table-filter", inputs: { query: "query" }, usesInheritance: true, ngImport: i0, template: `
    <ng-container [ngSwitch]="column.getFilterType()">
      <select-filter *ngSwitchCase="'list'"
                     [query]="query"
                     [ngClass]="inputClass"
                     [column]="column"
                     (filter)="onFilter($event)">
      </select-filter>
      <checkbox-filter *ngSwitchCase="'checkbox'"
                       [query]="query"
                       [ngClass]="inputClass"
                       [column]="column"
                       (filter)="onFilter($event)">
      </checkbox-filter>
      <completer-filter *ngSwitchCase="'completer'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </completer-filter>
      <date-filter *ngSwitchCase="'date'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </date-filter>
      <mselect-filter *ngSwitchCase="'multiple'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </mselect-filter>
      <input-filter *ngSwitchDefault
                    [query]="query"
                    [ngClass]="inputClass"
                    [column]="column"
                    (filter)="onFilter($event)">
      </input-filter>
    </ng-container>
  `, isInline: true, components: [{ type: SelectFilterComponent, selector: "select-filter" }, { type: CheckboxFilterComponent, selector: "checkbox-filter" }, { type: CompleterFilterComponent, selector: "completer-filter" }, { type: DateFilterComponent, selector: "date-filter" }, { type: MselectFilterComponent, selector: "mselect-filter" }, { type: InputFilterComponent, selector: "input-filter" }], directives: [{ type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultFilterComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'default-table-filter',
                    template: `
    <ng-container [ngSwitch]="column.getFilterType()">
      <select-filter *ngSwitchCase="'list'"
                     [query]="query"
                     [ngClass]="inputClass"
                     [column]="column"
                     (filter)="onFilter($event)">
      </select-filter>
      <checkbox-filter *ngSwitchCase="'checkbox'"
                       [query]="query"
                       [ngClass]="inputClass"
                       [column]="column"
                       (filter)="onFilter($event)">
      </checkbox-filter>
      <completer-filter *ngSwitchCase="'completer'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </completer-filter>
      <date-filter *ngSwitchCase="'date'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </date-filter>
      <mselect-filter *ngSwitchCase="'multiple'"
                        [query]="query"
                        [ngClass]="inputClass"
                        [column]="column"
                        (filter)="onFilter($event)">
      </mselect-filter>
      <input-filter *ngSwitchDefault
                    [query]="query"
                    [ngClass]="inputClass"
                    [column]="column"
                    (filter)="onFilter($event)">
      </input-filter>
    </ng-container>
  `,
                }]
        }], propDecorators: { query: [{
                type: Input
            }] } });

class FilterComponent extends FilterDefault {
    constructor() {
        super(...arguments);
        this.query = '';
    }
    ngOnChanges(changes) {
        if (changes.source) {
            if (!changes.source.firstChange) {
                this.dataChangedSub.unsubscribe();
            }
            this.dataChangedSub = this.source.onChanged().subscribe((dataChanges) => {
                const filterConf = this.source.getFilter();
                if (filterConf && filterConf.filters && filterConf.filters.length === 0) {
                    this.query = '';
                    // add a check for existing filters an set the query if one exists for this column
                    // this covers instances where the filter is set by user code while maintaining existing functionality
                }
                else if (filterConf && filterConf.filters && filterConf.filters.length > 0) {
                    filterConf.filters.forEach((k, v) => {
                        if (k.field == this.column.id) {
                            this.query = k.search;
                        }
                    });
                }
            });
        }
    }
}
FilterComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
FilterComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: FilterComponent, selector: "angular2-smart-table-filter", usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
      <div class="angular2-smart-filter" *ngIf="column.isFilterable" [ngSwitch]="column.getFilterType()">
        <custom-table-filter *ngSwitchCase="'custom'"
                             [query]="query"
                             [column]="column"
                             [source]="source"
                             [inputClass]="inputClass"
        ></custom-table-filter>
        <default-table-filter *ngSwitchDefault
                              [query]="query"
                              [column]="column"
                              [source]="source"
                              [inputClass]="inputClass"
        ></default-table-filter>
      </div>
    `, isInline: true, styles: [":host .angular2-smart-filter ::ng-deep input,:host .angular2-smart-filter ::ng-deep select{width:100%;line-height:normal;padding:.375em .75em;font-weight:400}:host .angular2-smart-filter ::ng-deep input[type=search]{box-sizing:inherit}:host .angular2-smart-filter ::ng-deep .completer-dropdown-holder{font-weight:400}:host .angular2-smart-filter ::ng-deep a{font-weight:400}\n"], components: [{ type: CustomFilterComponent, selector: "custom-table-filter", inputs: ["query"] }, { type: DefaultFilterComponent, selector: "default-table-filter", inputs: ["query"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterComponent, decorators: [{
            type: Component,
            args: [{ selector: 'angular2-smart-table-filter', template: `
      <div class="angular2-smart-filter" *ngIf="column.isFilterable" [ngSwitch]="column.getFilterType()">
        <custom-table-filter *ngSwitchCase="'custom'"
                             [query]="query"
                             [column]="column"
                             [source]="source"
                             [inputClass]="inputClass"
        ></custom-table-filter>
        <default-table-filter *ngSwitchDefault
                              [query]="query"
                              [column]="column"
                              [source]="source"
                              [inputClass]="inputClass"
        ></default-table-filter>
      </div>
    `, styles: [":host .angular2-smart-filter ::ng-deep input,:host .angular2-smart-filter ::ng-deep select{width:100%;line-height:normal;padding:.375em .75em;font-weight:400}:host .angular2-smart-filter ::ng-deep input[type=search]{box-sizing:inherit}:host .angular2-smart-filter ::ng-deep .completer-dropdown-holder{font-weight:400}:host .angular2-smart-filter ::ng-deep a{font-weight:400}\n"] }]
        }] });

class TheadFitlersRowComponent {
    constructor() {
        this.create = new EventEmitter();
    }
    ngOnChanges() {
        this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
        this.showActionColumnLeft = this.grid.showActionColumn('left');
        this.showActionColumnRight = this.grid.showActionColumn('right');
        this.filterInputClass = this.grid.getSetting('filter.inputClass');
    }
    getVisibleColumns(columns) {
        return (columns || []).filter((column) => !column.hide);
    }
}
TheadFitlersRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadFitlersRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TheadFitlersRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TheadFitlersRowComponent, selector: "[angular2-st-thead-filters-row]", inputs: { grid: "grid", source: "source" }, outputs: { create: "create" }, usesOnChanges: true, ngImport: i0, template: `
    <th *ngIf="isMultiSelectVisible"></th>
    <th angular2-st-add-button *ngIf="showActionColumnLeft"
                          [grid]="grid"
                          (create)="create.emit($event)">
    </th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())" class="angular2-smart-th {{ column.id }}">
      <angular2-smart-table-filter [source]="source"
                              [column]="column"
                              [inputClass]="filterInputClass"
      ></angular2-smart-table-filter>
    </th>
    <th angular2-st-add-button *ngIf="showActionColumnRight"
                          [grid]="grid"
                          [source]="source"
                          (create)="create.emit($event)">
    </th>
  `, isInline: true, components: [{ type: AddButtonComponent, selector: "[angular2-st-add-button]", inputs: ["grid", "source"], outputs: ["create"] }, { type: FilterComponent, selector: "angular2-smart-table-filter" }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadFitlersRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[angular2-st-thead-filters-row]',
                    template: `
    <th *ngIf="isMultiSelectVisible"></th>
    <th angular2-st-add-button *ngIf="showActionColumnLeft"
                          [grid]="grid"
                          (create)="create.emit($event)">
    </th>
    <th *ngFor="let column of getVisibleColumns(grid.getColumns())" class="angular2-smart-th {{ column.id }}">
      <angular2-smart-table-filter [source]="source"
                              [column]="column"
                              [inputClass]="filterInputClass"
      ></angular2-smart-table-filter>
    </th>
    <th angular2-st-add-button *ngIf="showActionColumnRight"
                          [grid]="grid"
                          [source]="source"
                          (create)="create.emit($event)">
    </th>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], source: [{
                type: Input
            }], create: [{
                type: Output
            }] } });

class TheadCreateCancelComponent {
    constructor() {
        this.bypassSecurityTrust = 'none';
    }
    onCreate(event) {
        event.preventDefault();
        event.stopPropagation();
        this.grid.create(this.grid.getNewRow(), this.createConfirm);
    }
    onCancelCreate(event) {
        event.preventDefault();
        event.stopPropagation();
        this.grid.createFormShown = false;
        this.createCancel.emit({
            discardedData: this.grid.getNewRow().getNewData(),
            source: this.grid.source,
        });
    }
    ngOnChanges() {
        var _a, _b;
        this.createButtonContent = this.grid.getSetting('add.createButtonContent');
        this.cancelButtonContent = this.grid.getSetting('add.cancelButtonContent');
        this.bypassSecurityTrust = ((_b = (_a = this.grid.settings.add) === null || _a === void 0 ? void 0 : _a.sanitizer) === null || _b === void 0 ? void 0 : _b.bypassHtml) ? 'html' : 'none';
    }
}
TheadCreateCancelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadCreateCancelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TheadCreateCancelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TheadCreateCancelComponent, selector: "angular2-st-actions", inputs: { grid: "grid", createConfirm: "createConfirm", createCancel: "createCancel" }, usesOnChanges: true, ngImport: i0, template: `
    <a href="#" class="angular2-smart-action angular2-smart-action-add-create"
        [innerHTML]="createButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onCreate($event)"></a>
    <a href="#" class="angular2-smart-action angular2-smart-action-add-cancel"
        [innerHTML]="cancelButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onCancelCreate($event)"></a>
  `, isInline: true, pipes: { "bypassSecurityTrust": BypassSecurityTrustPipe } });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadCreateCancelComponent, decorators: [{
            type: Component,
            args: [{
                    // TODO: @breaking-change rename the selector to angular2-st-thead-create-cancel in the next major version
                    selector: 'angular2-st-actions',
                    template: `
    <a href="#" class="angular2-smart-action angular2-smart-action-add-create"
        [innerHTML]="createButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onCreate($event)"></a>
    <a href="#" class="angular2-smart-action angular2-smart-action-add-cancel"
        [innerHTML]="cancelButtonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onCancelCreate($event)"></a>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], createConfirm: [{
                type: Input
            }], createCancel: [{
                type: Input
            }] } });

class CustomViewComponent {
    ngOnInit() {
        if (this.cell && !this.customComponent) {
            this.customComponent = this.dynamicTarget.createComponent(this.cell.getColumn().renderComponent);
            Object.assign(this.customComponent.instance, this.getPatch());
            const onComponentInitFunction = this.cell.getColumn().getOnComponentInitFunction();
            onComponentInitFunction && onComponentInitFunction(this.customComponent.instance, this.getPatch());
        }
    }
    ngOnDestroy() {
        this.customComponent.destroy();
    }
    getPatch() {
        return {
            value: this.cell.getValue(),
            rowData: this.cell.getRow().getData()
        };
    }
}
CustomViewComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CustomViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CustomViewComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CustomViewComponent, selector: "custom-view-component", inputs: { cell: "cell" }, viewQueries: [{ propertyName: "dynamicTarget", first: true, predicate: ["dynamicTarget"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <ng-template #dynamicTarget></ng-template>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CustomViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'custom-view-component',
                    template: `
    <ng-template #dynamicTarget></ng-template>
  `,
                }]
        }], propDecorators: { cell: [{
                type: Input
            }], dynamicTarget: [{
                type: ViewChild,
                args: ['dynamicTarget', { read: ViewContainerRef, static: true }]
            }] } });

class ViewCellComponent {
    get bypassSecurityTrust() {
        return this.cell.getColumn().sanitizer.bypassHtml ? 'html' : 'none';
    }
    get cssClass() {
        var _a;
        return (_a = this.cell.getColumn().classContent) !== null && _a !== void 0 ? _a : '';
    }
}
ViewCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ViewCellComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
ViewCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: ViewCellComponent, selector: "table-cell-view-mode", inputs: { cell: "cell" }, ngImport: i0, template: `
    <div [ngSwitch]="cell.getColumn().type">
        <custom-view-component *ngSwitchCase="'custom'" [cell]="cell"></custom-view-component>
        <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue() | bypassSecurityTrust: bypassSecurityTrust" [ngClass]="cssClass"></div>
        <div *ngSwitchDefault [ngClass]="cssClass">{{ cell.getValue() }}</div>
    </div>
    `, isInline: true, components: [{ type: CustomViewComponent, selector: "custom-view-component", inputs: ["cell"] }], directives: [{ type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }], pipes: { "bypassSecurityTrust": BypassSecurityTrustPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: ViewCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'table-cell-view-mode',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <div [ngSwitch]="cell.getColumn().type">
        <custom-view-component *ngSwitchCase="'custom'" [cell]="cell"></custom-view-component>
        <div *ngSwitchCase="'html'" [innerHTML]="cell.getValue() | bypassSecurityTrust: bypassSecurityTrust" [ngClass]="cssClass"></div>
        <div *ngSwitchDefault [ngClass]="cssClass">{{ cell.getValue() }}</div>
    </div>
    `,
                }]
        }], propDecorators: { cell: [{
                type: Input
            }] } });

class EditCellDefault {
    constructor() {
        this.inputClass = '';
        this.edited = new EventEmitter();
        this.stopEditing = new EventEmitter();
    }
    onEdited() {
        this.edited.emit();
        return false;
    }
    onStopEditing() {
        this.stopEditing.emit();
        return false;
    }
    onClick(event) {
        event.stopPropagation();
    }
}
EditCellDefault.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: EditCellDefault, deps: [], target: i0.ɵɵFactoryTarget.Component });
EditCellDefault.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: EditCellDefault, selector: "ng-component", inputs: { cell: "cell", inputClass: "inputClass" }, outputs: { edited: "edited", stopEditing: "stopEditing" }, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: EditCellDefault, decorators: [{
            type: Component,
            args: [{
                    template: ''
                }]
        }], propDecorators: { cell: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], edited: [{
                type: Output
            }], stopEditing: [{
                type: Output
            }] } });

class CustomEditComponent extends EditCellDefault {
    ngOnChanges(changes) {
        if (this.cell && !this.customComponent) {
            const editor = this.cell.getColumn().editor;
            if (!editor)
                return;
            this.customComponent = this.dynamicTarget.createComponent(editor.component);
            // set @Inputs and @Outputs of custom component
            this.customComponent.instance.cell = this.cell;
            this.customComponent.instance.inputClass = this.inputClass;
            this.customComponent.instance.onStopEditing.subscribe(() => this.onStopEditing());
            this.customComponent.instance.onEdited.subscribe(() => this.onEdited());
            this.customComponent.instance.onClick.subscribe((event) => this.onClick(event));
        }
    }
    ngOnDestroy() {
        if (this.customComponent) {
            this.customComponent.destroy();
        }
    }
}
CustomEditComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CustomEditComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
CustomEditComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CustomEditComponent, selector: "table-cell-custom-editor", viewQueries: [{ propertyName: "dynamicTarget", first: true, predicate: ["dynamicTarget"], descendants: true, read: ViewContainerRef, static: true }], usesInheritance: true, usesOnChanges: true, ngImport: i0, template: `
    <ng-template #dynamicTarget></ng-template>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CustomEditComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'table-cell-custom-editor',
                    template: `
    <ng-template #dynamicTarget></ng-template>
  `,
                }]
        }], propDecorators: { dynamicTarget: [{
                type: ViewChild,
                args: ['dynamicTarget', { read: ViewContainerRef, static: true }]
            }] } });

class DefaultEditor {
    constructor() {
        this.onStopEditing = new EventEmitter();
        this.onEdited = new EventEmitter();
        this.onClick = new EventEmitter();
    }
    get disableEnterKeySave() {
        return this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().disableEnterKeySave;
    }
}
DefaultEditor.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultEditor, deps: [], target: i0.ɵɵFactoryTarget.Component });
DefaultEditor.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: DefaultEditor, selector: "ng-component", inputs: { cell: "cell", inputClass: "inputClass" }, outputs: { onStopEditing: "onStopEditing", onEdited: "onEdited", onClick: "onClick" }, ngImport: i0, template: '', isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultEditor, decorators: [{
            type: Component,
            args: [{
                    template: '',
                }]
        }], propDecorators: { cell: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], onStopEditing: [{
                type: Output
            }], onEdited: [{
                type: Output
            }], onClick: [{
                type: Output
            }] } });

class SelectEditorComponent extends DefaultEditor {
    constructor() {
        super();
    }
    onSelectionChanged(newValue) {
        this.cell.newValue = newValue;
    }
}
SelectEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: SelectEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SelectEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: SelectEditorComponent, selector: "select-editor", usesInheritance: true, ngImport: i0, template: `
    <select [ngClass]="inputClass"
            class="form-control"
            [value]="cell.newValue"
            (change)="onSelectionChanged($any($event.target).value)"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            (click)="onClick.emit($event)"
            [multiple]="cell.getColumn().getConfig()?.multiple">
            (keydown.enter)="disableEnterKeySave || onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">

        <option *ngFor="let option of cell.getColumn().getConfig()?.list" [value]="option.value"
                [selected]="option.value === cell.getRawValue()">{{ option.title }}
        </option>
    </select>
    `, isInline: true, directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: SelectEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'select-editor',
                    template: `
    <select [ngClass]="inputClass"
            class="form-control"
            [value]="cell.newValue"
            (change)="onSelectionChanged($any($event.target).value)"
            [name]="cell.getId()"
            [disabled]="!cell.isEditable()"
            (click)="onClick.emit($event)"
            [multiple]="cell.getColumn().getConfig()?.multiple">
            (keydown.enter)="disableEnterKeySave || onEdited.emit($event)"
            (keydown.esc)="onStopEditing.emit()">

        <option *ngFor="let option of cell.getColumn().getConfig()?.list" [value]="option.value"
                [selected]="option.value === cell.getRawValue()">{{ option.title }}
        </option>
    </select>
    `,
                }]
        }], ctorParameters: function () { return []; } });

class TextareaEditorComponent extends DefaultEditor {
    constructor() {
        super();
    }
}
TextareaEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TextareaEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TextareaEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TextareaEditorComponent, selector: "textarea-editor", usesInheritance: true, ngImport: i0, template: `
    <textarea [ngClass]="inputClass"
              class="form-control"
              [(ngModel)]="cell.newValue"
              [name]="cell.getId()"
              [disabled]="!cell.isEditable()"
              [placeholder]="cell.getTitle()"
              (click)="onClick.emit($event)"
              (keydown.enter)="disableEnterKeySave || onEdited.emit()"
              (keydown.esc)="onStopEditing.emit()">
    </textarea>
    `, isInline: true, styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em}\n"], directives: [{ type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TextareaEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'textarea-editor', template: `
    <textarea [ngClass]="inputClass"
              class="form-control"
              [(ngModel)]="cell.newValue"
              [name]="cell.getId()"
              [disabled]="!cell.isEditable()"
              [placeholder]="cell.getTitle()"
              (click)="onClick.emit($event)"
              (keydown.enter)="disableEnterKeySave || onEdited.emit()"
              (keydown.esc)="onStopEditing.emit()">
    </textarea>
    `, styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em}\n"] }]
        }], ctorParameters: function () { return []; } });

class CheckboxEditorComponent extends DefaultEditor {
    constructor() {
        super();
    }
    onChange(event) {
        const trueVal = (this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().true) || true;
        const falseVal = (this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().false) || false;
        this.cell.newValue = event.target.checked ? trueVal : falseVal;
    }
}
CheckboxEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CheckboxEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CheckboxEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CheckboxEditorComponent, selector: "checkbox-editor", usesInheritance: true, ngImport: i0, template: `
    <input [ngClass]="inputClass"
           type="checkbox"
           class="form-control"
           [name]="cell.getId()"
           [disabled]="!cell.isEditable()"
           [checked]="cell.getValue() == (cell.getColumn().getConfig()?.true || true)"
           (click)="onClick.emit($event)"
           (change)="onChange($event)">
    `, isInline: true, styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em}\n"], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CheckboxEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'checkbox-editor', template: `
    <input [ngClass]="inputClass"
           type="checkbox"
           class="form-control"
           [name]="cell.getId()"
           [disabled]="!cell.isEditable()"
           [checked]="cell.getValue() == (cell.getColumn().getConfig()?.true || true)"
           (click)="onClick.emit($event)"
           (change)="onChange($event)">
    `, styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em}\n"] }]
        }], ctorParameters: function () { return []; } });

class CompleterEditorComponent extends DefaultEditor {
    constructor(completerService) {
        super();
        this.completerService = completerService;
        this.completerStr = '';
    }
    ngOnInit() {
        this.completerStr = this.cell.getRawValue(); // initialize with current value
        const config = this.completerConfig = this.cell.getColumn().getConfig().completer;
        config.dataService = this.completerService.local(config.data, config.searchFields, config.titleField);
        config.dataService.descriptionField(config.descriptionField);
    }
    onEditedCompleter(event) {
        this.cell.newValue = event.title;
        return false;
    }
}
CompleterEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CompleterEditorComponent, deps: [{ token: i1$2.CompleterService }], target: i0.ɵɵFactoryTarget.Component });
CompleterEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CompleterEditorComponent, selector: "completer-editor", usesInheritance: true, ngImport: i0, template: `
    <ng2-completer [(ngModel)]="completerStr"
                   [dataService]="completerConfig.dataService"
                   [minSearchLength]="completerConfig.minSearchLength || 0"
                   [pause]="completerConfig.pause || 0"
                   [placeholder]="completerConfig.placeholder || 'Start typing...'"
                   (selected)="onEditedCompleter($event)">
    </ng2-completer>
    `, isInline: true, components: [{ type: i1$2.CompleterCmp, selector: "ng2-completer", inputs: ["inputName", "inputId", "pause", "minSearchLength", "maxChars", "overrideSuggested", "clearSelected", "clearUnselected", "fillHighlighted", "placeholder", "autoMatch", "disableInput", "autofocus", "openOnFocus", "openOnClick", "selectOnClick", "selectOnFocus", "autoHighlight", "datasource", "dataService", "textNoResults", "textSearching", "matchClass", "fieldTabindex", "inputClass", "initialValue"], outputs: ["selected", "highlighted", "blur", "click", "focus", "opened", "keyup", "keydown"] }], directives: [{ type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CompleterEditorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'completer-editor',
                    template: `
    <ng2-completer [(ngModel)]="completerStr"
                   [dataService]="completerConfig.dataService"
                   [minSearchLength]="completerConfig.minSearchLength || 0"
                   [pause]="completerConfig.pause || 0"
                   [placeholder]="completerConfig.placeholder || 'Start typing...'"
                   (selected)="onEditedCompleter($event)">
    </ng2-completer>
    `,
                }]
        }], ctorParameters: function () { return [{ type: i1$2.CompleterService }]; } });

class InputEditorComponent extends DefaultEditor {
    constructor() {
        super();
    }
}
InputEditorComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: InputEditorComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
InputEditorComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: InputEditorComponent, selector: "input-editor", usesInheritance: true, ngImport: i0, template: `
    <input [ngClass]="inputClass"
           class="form-control"
           [(ngModel)]="cell.newValue"
           [name]="cell.getId()"
           [placeholder]="cell.getTitle()"
           [disabled]="!cell.isEditable()"
           (click)="onClick.emit($event)"
           (keydown.enter)="disableEnterKeySave || onEdited.emit()"
           (keydown.esc)="onStopEditing.emit()">
    `, isInline: true, styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em}\n"], directives: [{ type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: InputEditorComponent, decorators: [{
            type: Component,
            args: [{ selector: 'input-editor', template: `
    <input [ngClass]="inputClass"
           class="form-control"
           [(ngModel)]="cell.newValue"
           [name]="cell.getId()"
           [placeholder]="cell.getTitle()"
           [disabled]="!cell.isEditable()"
           (click)="onClick.emit($event)"
           (keydown.enter)="disableEnterKeySave || onEdited.emit()"
           (keydown.esc)="onStopEditing.emit()">
    `, styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em}\n"] }]
        }], ctorParameters: function () { return []; } });

class DefaultEditComponent extends EditCellDefault {
    constructor() {
        super();
    }
    getEditorType() {
        const editor = this.cell.getColumn().editor;
        if (!editor) {
            return 'default';
        }
        return editor.type;
    }
}
DefaultEditComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultEditComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
DefaultEditComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: DefaultEditComponent, selector: "table-cell-default-editor", usesInheritance: true, ngImport: i0, template: "<div [ngSwitch]=\"getEditorType()\">\n    <select-editor *ngSwitchCase=\"'list'\"\n                   [cell]=\"cell\"\n                   [inputClass]=\"inputClass\"\n                   (onClick)=\"onClick($event)\"\n                   (onEdited)=\"onEdited()\"\n                   (onStopEditing)=\"onStopEditing()\">\n    </select-editor>\n\n    <textarea-editor *ngSwitchCase=\"'textarea'\"\n                     [cell]=\"cell\"\n                     [inputClass]=\"inputClass\"\n                     (onClick)=\"onClick($event)\"\n                     (onEdited)=\"onEdited()\"\n                     (onStopEditing)=\"onStopEditing()\">\n    </textarea-editor>\n\n    <checkbox-editor *ngSwitchCase=\"'checkbox'\"\n                     [cell]=\"cell\"\n                     [inputClass]=\"inputClass\"\n                     (onClick)=\"onClick($event)\">\n    </checkbox-editor>\n\n    <completer-editor *ngSwitchCase=\"'completer'\"\n                      [cell]=\"cell\">\n    </completer-editor>\n\n    <input-editor *ngSwitchDefault\n                  [cell]=\"cell\"\n                  [inputClass]=\"inputClass\"\n                  (onClick)=\"onClick($event)\"\n                  (onEdited)=\"onEdited()\"\n                  (onStopEditing)=\"onStopEditing()\">\n    </input-editor>\n</div>\n", components: [{ type: SelectEditorComponent, selector: "select-editor" }, { type: TextareaEditorComponent, selector: "textarea-editor" }, { type: CheckboxEditorComponent, selector: "checkbox-editor" }, { type: CompleterEditorComponent, selector: "completer-editor" }, { type: InputEditorComponent, selector: "input-editor" }], directives: [{ type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DefaultEditComponent, decorators: [{
            type: Component,
            args: [{ selector: 'table-cell-default-editor', template: "<div [ngSwitch]=\"getEditorType()\">\n    <select-editor *ngSwitchCase=\"'list'\"\n                   [cell]=\"cell\"\n                   [inputClass]=\"inputClass\"\n                   (onClick)=\"onClick($event)\"\n                   (onEdited)=\"onEdited()\"\n                   (onStopEditing)=\"onStopEditing()\">\n    </select-editor>\n\n    <textarea-editor *ngSwitchCase=\"'textarea'\"\n                     [cell]=\"cell\"\n                     [inputClass]=\"inputClass\"\n                     (onClick)=\"onClick($event)\"\n                     (onEdited)=\"onEdited()\"\n                     (onStopEditing)=\"onStopEditing()\">\n    </textarea-editor>\n\n    <checkbox-editor *ngSwitchCase=\"'checkbox'\"\n                     [cell]=\"cell\"\n                     [inputClass]=\"inputClass\"\n                     (onClick)=\"onClick($event)\">\n    </checkbox-editor>\n\n    <completer-editor *ngSwitchCase=\"'completer'\"\n                      [cell]=\"cell\">\n    </completer-editor>\n\n    <input-editor *ngSwitchDefault\n                  [cell]=\"cell\"\n                  [inputClass]=\"inputClass\"\n                  (onClick)=\"onClick($event)\"\n                  (onEdited)=\"onEdited()\"\n                  (onStopEditing)=\"onStopEditing()\">\n    </input-editor>\n</div>\n" }]
        }], ctorParameters: function () { return []; } });

class EditCellComponent {
    constructor() {
        this.inputClass = '';
        this.edited = new EventEmitter();
        this.stopEditing = new EventEmitter();
    }
    ngOnInit() {
        this.cell.resetValue();
    }
    getEditorType() {
        const editor = this.cell.getColumn().editor;
        if (!editor) {
            return 'default';
        }
        return editor.type;
    }
}
EditCellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: EditCellComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
EditCellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: EditCellComponent, selector: "table-cell-edit-mode", inputs: { cell: "cell", inputClass: "inputClass" }, outputs: { edited: "edited", stopEditing: "stopEditing" }, ngImport: i0, template: `
      <div [ngSwitch]="getEditorType()">
        <table-cell-custom-editor *ngSwitchCase="'custom'"
                                  [cell]="cell"
                                  [inputClass]="inputClass"
                                  (edited)="edited.emit()"
                                  (stopEditing)="stopEditing.emit()"
        ></table-cell-custom-editor>
        <table-cell-default-editor *ngSwitchDefault
                                   [cell]="cell"
                                   [inputClass]="inputClass"
                                   (edited)="edited.emit()"
                                   (stopEditing)="stopEditing.emit()"
        ></table-cell-default-editor>
      </div>
    `, isInline: true, components: [{ type: CustomEditComponent, selector: "table-cell-custom-editor" }, { type: DefaultEditComponent, selector: "table-cell-default-editor" }], directives: [{ type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { type: i2.NgSwitchDefault, selector: "[ngSwitchDefault]" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: EditCellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'table-cell-edit-mode',
                    template: `
      <div [ngSwitch]="getEditorType()">
        <table-cell-custom-editor *ngSwitchCase="'custom'"
                                  [cell]="cell"
                                  [inputClass]="inputClass"
                                  (edited)="edited.emit()"
                                  (stopEditing)="stopEditing.emit()"
        ></table-cell-custom-editor>
        <table-cell-default-editor *ngSwitchDefault
                                   [cell]="cell"
                                   [inputClass]="inputClass"
                                   (edited)="edited.emit()"
                                   (stopEditing)="stopEditing.emit()"
        ></table-cell-default-editor>
      </div>
    `,
                }]
        }], propDecorators: { cell: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], edited: [{
                type: Output
            }], stopEditing: [{
                type: Output
            }] } });

class CellComponent {
    constructor() {
        this.inputClass = '';
        this.mode = 'inline';
        this.isInEditing = false;
    }
    onEdited() {
        if (this.isNew) {
            this.grid.create(this.grid.getNewRow(), this.createConfirm);
        }
        else {
            this.grid.save(this.row, this.editConfirm);
        }
    }
    onStopEditing() {
        if (this.isNew) {
            this.grid.createFormShown = false;
            this.createCancel.emit({
                discardedData: this.grid.getNewRow().getNewData(),
                source: this.grid.source,
            });
        }
        else {
            this.row.isInEditing = false;
            this.editCancel.emit({
                data: this.row.getData(),
                discardedData: this.row.getNewData(),
                source: this.grid.source,
            });
        }
    }
}
CellComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
CellComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: CellComponent, selector: "angular2-smart-table-cell", inputs: { grid: "grid", row: "row", cell: "cell", inputClass: "inputClass", mode: "mode", isInEditing: "isInEditing", isNew: "isNew", editConfirm: "editConfirm", editCancel: "editCancel", createConfirm: "createConfirm", createCancel: "createCancel" }, ngImport: i0, template: `
    <table-cell-view-mode *ngIf="!isInEditing" [cell]="cell"></table-cell-view-mode>
    <table-cell-edit-mode *ngIf="isInEditing" [cell]="cell"
                          [inputClass]="inputClass"
                          (edited)="onEdited()"
                          (stopEditing)="onStopEditing()"
    ></table-cell-edit-mode>
  `, isInline: true, components: [{ type: ViewCellComponent, selector: "table-cell-view-mode", inputs: ["cell"] }, { type: EditCellComponent, selector: "table-cell-edit-mode", inputs: ["cell", "inputClass"], outputs: ["edited", "stopEditing"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-smart-table-cell',
                    template: `
    <table-cell-view-mode *ngIf="!isInEditing" [cell]="cell"></table-cell-view-mode>
    <table-cell-edit-mode *ngIf="isInEditing" [cell]="cell"
                          [inputClass]="inputClass"
                          (edited)="onEdited()"
                          (stopEditing)="onStopEditing()"
    ></table-cell-edit-mode>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], cell: [{
                type: Input
            }], inputClass: [{
                type: Input
            }], mode: [{
                type: Input
            }], isInEditing: [{
                type: Input
            }], isNew: [{
                type: Input
            }], editConfirm: [{
                type: Input
            }], editCancel: [{
                type: Input
            }], createConfirm: [{
                type: Input
            }], createCancel: [{
                type: Input
            }] } });

class TheadFormRowComponent {
    ngOnChanges() {
        this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
        this.showActionColumnLeft = this.grid.showActionColumn('left');
        this.showActionColumnRight = this.grid.showActionColumn('right');
        this.addInputClass = this.grid.getSetting('add.inputClass');
    }
    getVisibleCells(cells) {
        return (cells || []).filter((cell) => !cell.getColumn().hide);
    }
}
TheadFormRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadFormRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TheadFormRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TheadFormRowComponent, selector: "[angular2-st-thead-form-row]", inputs: { grid: "grid", row: "row", createConfirm: "createConfirm", createCancel: "createCancel" }, usesOnChanges: true, ngImport: i0, template: `
    <td *ngIf="isMultiSelectVisible"></td>
    <td *ngIf="showActionColumnLeft" class="angular2-smart-actions">
      <angular2-st-actions [grid]="grid" [createConfirm]="createConfirm" [createCancel]="createCancel"></angular2-st-actions>
    </td>
    <td *ngFor="let cell of getVisibleCells(grid.getNewRow().getCells())">
      <angular2-smart-table-cell
        [cell]="cell"
        [grid]="grid"
        [isNew]="true"
        [createConfirm]="createConfirm"
        [createCancel]="createCancel"
        [inputClass]="addInputClass"
        [isInEditing]="grid.getNewRow().isInEditing"
      ></angular2-smart-table-cell>
    </td>
    <td *ngIf="showActionColumnRight" class="angular2-smart-actions">
      <angular2-st-actions [grid]="grid" [createConfirm]="createConfirm" [createCancel]="createCancel"></angular2-st-actions>
    </td>
  `, isInline: true, components: [{ type: TheadCreateCancelComponent, selector: "angular2-st-actions", inputs: ["grid", "createConfirm", "createCancel"] }, { type: CellComponent, selector: "angular2-smart-table-cell", inputs: ["grid", "row", "cell", "inputClass", "mode", "isInEditing", "isNew", "editConfirm", "editCancel", "createConfirm", "createCancel"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TheadFormRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[angular2-st-thead-form-row]',
                    template: `
    <td *ngIf="isMultiSelectVisible"></td>
    <td *ngIf="showActionColumnLeft" class="angular2-smart-actions">
      <angular2-st-actions [grid]="grid" [createConfirm]="createConfirm" [createCancel]="createCancel"></angular2-st-actions>
    </td>
    <td *ngFor="let cell of getVisibleCells(grid.getNewRow().getCells())">
      <angular2-smart-table-cell
        [cell]="cell"
        [grid]="grid"
        [isNew]="true"
        [createConfirm]="createConfirm"
        [createCancel]="createCancel"
        [inputClass]="addInputClass"
        [isInEditing]="grid.getNewRow().isInEditing"
      ></angular2-smart-table-cell>
    </td>
    <td *ngIf="showActionColumnRight" class="angular2-smart-actions">
      <angular2-st-actions [grid]="grid" [createConfirm]="createConfirm" [createCancel]="createCancel"></angular2-st-actions>
    </td>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], createConfirm: [{
                type: Input
            }], createCancel: [{
                type: Input
            }] } });

class NgxSmartTableTheadComponent {
    constructor(tableService) {
        this.tableService = tableService;
        this.hide = new EventEmitter();
        this.selectAllRows = new EventEmitter();
        this.create = new EventEmitter();
    }
    ngOnChanges() {
        this.isHideHeader = this.grid.getSetting('hideHeader');
        this.isHideSubHeader = this.grid.getSetting('hideSubHeader');
    }
    mouseMove(event) {
        this.tableService.mouseMoveEvent$.next(event);
    }
}
NgxSmartTableTheadComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: NgxSmartTableTheadComponent, deps: [{ token: TableService }], target: i0.ɵɵFactoryTarget.Component });
NgxSmartTableTheadComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: NgxSmartTableTheadComponent, selector: "[angular2-st-thead]", inputs: { grid: "grid", source: "source", isAllSelected: "isAllSelected", createConfirm: "createConfirm", createCancel: "createCancel" }, outputs: { hide: "hide", selectAllRows: "selectAllRows", create: "create" }, host: { listeners: { "mousemove": "mouseMove($event)" } }, usesOnChanges: true, ngImport: i0, template: "<tr angular2-st-thead-titles-row *ngIf=\"!isHideHeader\"\n    class=\"angular2-smart-titles\"\n    [grid]=\"grid\"\n    [isAllSelected]=\"isAllSelected\"\n    [source]=\"source\"\n    (hide)=\"hide.emit($event)\"\n    (selectAllRows)=\"selectAllRows.emit()\"\n></tr>\n\n<tr angular2-st-thead-filters-row *ngIf=\"!isHideSubHeader\"\n    class=\"angular2-smart-filters\"\n    [grid]=\"grid\"\n    [source]=\"source\"\n    (create)=\"create.emit($event)\"\n></tr>\n\n<tr angular2-st-thead-form-row *ngIf=\"grid.createFormShown\"\n    [grid]=\"grid\"\n    [createConfirm]=\"createConfirm\"\n    [createCancel]=\"createCancel\"\n></tr>\n", styles: [":host ::ng-deep angular2-st-actions a:first-child{margin-right:.25rem}\n"], components: [{ type: TheadTitlesRowComponent, selector: "[angular2-st-thead-titles-row]", inputs: ["grid", "isAllSelected", "source"], outputs: ["hide", "selectAllRows"] }, { type: TheadFitlersRowComponent, selector: "[angular2-st-thead-filters-row]", inputs: ["grid", "source"], outputs: ["create"] }, { type: TheadFormRowComponent, selector: "[angular2-st-thead-form-row]", inputs: ["grid", "row", "createConfirm", "createCancel"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: NgxSmartTableTheadComponent, decorators: [{
            type: Component,
            args: [{ selector: '[angular2-st-thead]', template: "<tr angular2-st-thead-titles-row *ngIf=\"!isHideHeader\"\n    class=\"angular2-smart-titles\"\n    [grid]=\"grid\"\n    [isAllSelected]=\"isAllSelected\"\n    [source]=\"source\"\n    (hide)=\"hide.emit($event)\"\n    (selectAllRows)=\"selectAllRows.emit()\"\n></tr>\n\n<tr angular2-st-thead-filters-row *ngIf=\"!isHideSubHeader\"\n    class=\"angular2-smart-filters\"\n    [grid]=\"grid\"\n    [source]=\"source\"\n    (create)=\"create.emit($event)\"\n></tr>\n\n<tr angular2-st-thead-form-row *ngIf=\"grid.createFormShown\"\n    [grid]=\"grid\"\n    [createConfirm]=\"createConfirm\"\n    [createCancel]=\"createCancel\"\n></tr>\n", styles: [":host ::ng-deep angular2-st-actions a:first-child{margin-right:.25rem}\n"] }]
        }], ctorParameters: function () { return [{ type: TableService }]; }, propDecorators: { grid: [{
                type: Input
            }], source: [{
                type: Input
            }], isAllSelected: [{
                type: Input
            }], createConfirm: [{
                type: Input
            }], createCancel: [{
                type: Input
            }], hide: [{
                type: Output
            }], selectAllRows: [{
                type: Output
            }], create: [{
                type: Output
            }], mouseMove: [{
                type: HostListener,
                args: ['mousemove', ['$event']]
            }] } });

class TbodyCustomItemComponent {
    ngOnInit() {
        this.customComponent = this.dynamicTarget.createComponent(this.action.renderComponent);
        Object.assign(this.customComponent.instance, this.getPatch());
    }
    ngOnDestroy() {
        this.customComponent.destroy();
    }
    getPatch() {
        return {
            action: this.action,
            rowData: this.row.getData(),
        };
    }
}
TbodyCustomItemComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyCustomItemComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TbodyCustomItemComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TbodyCustomItemComponent, selector: "angular2-st-tbody-custom-item", inputs: { action: "action", row: "row" }, viewQueries: [{ propertyName: "dynamicTarget", first: true, predicate: ["dynamicTarget"], descendants: true, read: ViewContainerRef, static: true }], ngImport: i0, template: `
    <ng-template #dynamicTarget></ng-template>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyCustomItemComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-st-tbody-custom-item',
                    template: `
    <ng-template #dynamicTarget></ng-template>
  `,
                }]
        }], propDecorators: { action: [{
                type: Input
            }], row: [{
                type: Input
            }], dynamicTarget: [{
                type: ViewChild,
                args: ['dynamicTarget', { read: ViewContainerRef, static: true }]
            }] } });

class TbodyCustomComponent {
    constructor() {
        this.custom = new EventEmitter();
    }
    get customActions() {
        var _a;
        return (_a = this.grid.getSetting('actions.custom')) !== null && _a !== void 0 ? _a : [];
    }
    onCustom(action, event) {
        event.preventDefault();
        event.stopPropagation();
        this.custom.emit({
            action: action.name,
            row: this.row,
            data: this.row.getData(),
            source: this.source,
        });
    }
}
TbodyCustomComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyCustomComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TbodyCustomComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TbodyCustomComponent, selector: "angular2-st-tbody-custom", inputs: { grid: "grid", row: "row", source: "source" }, outputs: { custom: "custom" }, ngImport: i0, template: `
    <ng-container *ngFor="let action of customActions">
      <a href="#" class="angular2-smart-action angular2-smart-action-custom-custom"
         *ngIf="!action.renderComponent"
         [innerHTML]="action.title"
         (click)="onCustom(action, $event)"></a>
      <a href="#" class="angular2-smart-action angular2-smart-action-custom-custom"
         *ngIf="action.renderComponent"
         (click)="onCustom(action, $event)">
        <angular2-st-tbody-custom-item class="angular2-smart-action angular2-smart-action-custom-custom"
                                  [action]="action"
                                  [row]="row"></angular2-st-tbody-custom-item>
      </a>

    </ng-container>
  `, isInline: true, components: [{ type: TbodyCustomItemComponent, selector: "angular2-st-tbody-custom-item", inputs: ["action", "row"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyCustomComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-st-tbody-custom',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <ng-container *ngFor="let action of customActions">
      <a href="#" class="angular2-smart-action angular2-smart-action-custom-custom"
         *ngIf="!action.renderComponent"
         [innerHTML]="action.title"
         (click)="onCustom(action, $event)"></a>
      <a href="#" class="angular2-smart-action angular2-smart-action-custom-custom"
         *ngIf="action.renderComponent"
         (click)="onCustom(action, $event)">
        <angular2-st-tbody-custom-item class="angular2-smart-action angular2-smart-action-custom-custom"
                                  [action]="action"
                                  [row]="row"></angular2-st-tbody-custom-item>
      </a>

    </ng-container>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], source: [{
                type: Input
            }], custom: [{
                type: Output
            }] } });

class TbodyExpandRowComponent {
    constructor() {
        this.onExpandRow = new EventEmitter();
        this.bypassSecurityTrust = 'none';
        this.hiddenWhenFunction = (_) => false;
        this.disabledWhenFunction = (_) => false;
    }
    get visible() {
        return !this.hiddenWhenFunction(this.row);
    }
    get disabled() {
        return this.disabledWhenFunction(this.row);
    }
    onExpand(event) {
        event.preventDefault();
        event.stopPropagation();
        if (!this.disabled) {
            this.onExpandRow.emit(this.row);
        }
    }
    ngOnChanges() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        this.buttonContent = (_d = (_b = (_a = this.grid.settings.expand) === null || _a === void 0 ? void 0 : _a.buttonContent) !== null && _b !== void 0 ? _b : (_c = this.grid.settings.expand) === null || _c === void 0 ? void 0 : _c.expandRowButtonContent) !== null && _d !== void 0 ? _d : 'Expand';
        this.bypassSecurityTrust = ((_f = (_e = this.grid.settings.expand) === null || _e === void 0 ? void 0 : _e.sanitizer) === null || _f === void 0 ? void 0 : _f.bypassHtml) ? 'html' : 'none';
        this.hiddenWhenFunction = (_h = (_g = this.grid.settings.expand) === null || _g === void 0 ? void 0 : _g.hiddenWhen) !== null && _h !== void 0 ? _h : this.hiddenWhenFunction;
        this.disabledWhenFunction = (_k = (_j = this.grid.settings.expand) === null || _j === void 0 ? void 0 : _j.disabledWhen) !== null && _k !== void 0 ? _k : this.disabledWhenFunction;
    }
}
TbodyExpandRowComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyExpandRowComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TbodyExpandRowComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TbodyExpandRowComponent, selector: "angular2-st-tbody-expand", inputs: { grid: "grid", row: "row" }, outputs: { onExpandRow: "onExpandRow" }, usesOnChanges: true, ngImport: i0, template: `
      <a *ngIf="visible" href="#" class="angular2-smart-action angular2-smart-action-expand-expand"
         [ngClass]="{'not-allowed': disabled}"
         [innerHTML]="buttonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onExpand($event)"></a>
    `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "bypassSecurityTrust": BypassSecurityTrustPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyExpandRowComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-st-tbody-expand',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
      <a *ngIf="visible" href="#" class="angular2-smart-action angular2-smart-action-expand-expand"
         [ngClass]="{'not-allowed': disabled}"
         [innerHTML]="buttonContent | bypassSecurityTrust: bypassSecurityTrust" (click)="onExpand($event)"></a>
    `,
                }]
        }], ctorParameters: function () { return []; }, propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], onExpandRow: [{
                type: Output
            }] } });

class TbodyEditDeleteComponent {
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.editRowSelect = new EventEmitter();
        this.editButtonBypassSecurityTrust = 'none';
        this.editHiddenWhenFunction = (_) => false;
        this.editDisabledWhenFunction = (_) => false;
        this.deleteHiddenWhenFunction = (_) => false;
        this.deleteDisabledWhenFunction = (_) => false;
        this.deleteButtonBypassSecurityTrust = 'none';
    }
    onEdit(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.editDisabled)
            return;
        this.editRowSelect.emit(this.row);
        if (this.grid.getSetting('mode') === 'external') {
            this.edit.emit({
                row: this.row,
                data: this.row.getData(),
                source: this.source,
            });
        }
        else {
            this.grid.edit(this.row);
        }
    }
    onDelete(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.deleteDisabled)
            return;
        if (this.grid.getSetting('mode') === 'external') {
            this.delete.emit({
                row: this.row,
                data: this.row.getData(),
                source: this.source,
            });
        }
        else {
            this.grid.delete(this.row, this.deleteConfirm);
        }
    }
    get editVisible() {
        return !this.editHiddenWhenFunction(this.row);
    }
    get editDisabled() {
        return this.editDisabledWhenFunction(this.row);
    }
    get deleteVisible() {
        return !this.deleteHiddenWhenFunction(this.row);
    }
    get deleteDisabled() {
        return this.deleteDisabledWhenFunction(this.row);
    }
    ngOnChanges() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        const actions = this.grid.settings.actions;
        if (actions === false || actions === undefined) {
            // handle the "flexibility" of this property....
            this.editHiddenWhenFunction = (_) => (actions === false);
            this.deleteHiddenWhenFunction = (_) => (actions === false);
            return;
        }
        this.editRowButtonContent = (_b = (_a = this.grid.settings.edit) === null || _a === void 0 ? void 0 : _a.editButtonContent) !== null && _b !== void 0 ? _b : 'Edit';
        this.editButtonBypassSecurityTrust = ((_d = (_c = this.grid.settings.edit) === null || _c === void 0 ? void 0 : _c.sanitizer) === null || _d === void 0 ? void 0 : _d.bypassHtml) ? 'html' : 'none';
        this.editHiddenWhenFunction = (_f = (_e = this.grid.settings.edit) === null || _e === void 0 ? void 0 : _e.hiddenWhen) !== null && _f !== void 0 ? _f : ((_) => (actions.edit === false));
        this.editDisabledWhenFunction = (_h = (_g = this.grid.settings.edit) === null || _g === void 0 ? void 0 : _g.disabledWhen) !== null && _h !== void 0 ? _h : this.editDisabledWhenFunction;
        this.deleteRowButtonContent = (_k = (_j = this.grid.settings.delete) === null || _j === void 0 ? void 0 : _j.deleteButtonContent) !== null && _k !== void 0 ? _k : 'Delete';
        this.deleteButtonBypassSecurityTrust = ((_m = (_l = this.grid.settings.delete) === null || _l === void 0 ? void 0 : _l.sanitizer) === null || _m === void 0 ? void 0 : _m.bypassHtml) ? 'html' : 'none';
        this.deleteHiddenWhenFunction = (_p = (_o = this.grid.settings.delete) === null || _o === void 0 ? void 0 : _o.hiddenWhen) !== null && _p !== void 0 ? _p : ((_) => (actions.delete === false));
        this.deleteDisabledWhenFunction = (_r = (_q = this.grid.settings.delete) === null || _q === void 0 ? void 0 : _q.disabledWhen) !== null && _r !== void 0 ? _r : this.deleteDisabledWhenFunction;
    }
}
TbodyEditDeleteComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyEditDeleteComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TbodyEditDeleteComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TbodyEditDeleteComponent, selector: "angular2-st-tbody-edit-delete", inputs: { grid: "grid", row: "row", source: "source", deleteConfirm: "deleteConfirm" }, outputs: { edit: "edit", delete: "delete", editRowSelect: "editRowSelect" }, usesOnChanges: true, ngImport: i0, template: `
    <a href="#" *ngIf="editVisible" class="angular2-smart-action angular2-smart-action-edit-edit"
       [ngClass]="{'not-allowed': editDisabled}"
       [innerHTML]="editRowButtonContent | bypassSecurityTrust: editButtonBypassSecurityTrust"
       (click)="onEdit($event)"></a>
    <a href="#" *ngIf="deleteVisible" class="angular2-smart-action angular2-smart-action-delete-delete"
       [ngClass]="{'not-allowed': deleteDisabled}"
       [innerHTML]="deleteRowButtonContent | bypassSecurityTrust: deleteButtonBypassSecurityTrust" (click)="onDelete($event)"></a>
  `, isInline: true, directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "bypassSecurityTrust": BypassSecurityTrustPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodyEditDeleteComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'angular2-st-tbody-edit-delete',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <a href="#" *ngIf="editVisible" class="angular2-smart-action angular2-smart-action-edit-edit"
       [ngClass]="{'not-allowed': editDisabled}"
       [innerHTML]="editRowButtonContent | bypassSecurityTrust: editButtonBypassSecurityTrust"
       (click)="onEdit($event)"></a>
    <a href="#" *ngIf="deleteVisible" class="angular2-smart-action angular2-smart-action-delete-delete"
       [ngClass]="{'not-allowed': deleteDisabled}"
       [innerHTML]="deleteRowButtonContent | bypassSecurityTrust: deleteButtonBypassSecurityTrust" (click)="onDelete($event)"></a>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], source: [{
                type: Input
            }], deleteConfirm: [{
                type: Input
            }], edit: [{
                type: Output
            }], delete: [{
                type: Output
            }], editRowSelect: [{
                type: Output
            }] } });

class TbodySaveCancelComponent {
    constructor() {
        this.bypassSecurityTrust = 'none';
    }
    onSave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.grid.save(this.row, this.editConfirm);
    }
    onCancelEdit(event) {
        event.preventDefault();
        event.stopPropagation();
        this.row.isInEditing = false;
        this.editCancel.emit({
            data: this.row.getData(),
            discardedData: this.row.getNewData(),
            source: this.grid.source,
        });
    }
    ngOnChanges() {
        var _a, _b;
        this.saveButtonContent = this.grid.getSetting('edit.saveButtonContent');
        this.cancelButtonContent = this.grid.getSetting('edit.cancelButtonContent');
        this.bypassSecurityTrust = ((_b = (_a = this.grid.settings.edit) === null || _a === void 0 ? void 0 : _a.sanitizer) === null || _b === void 0 ? void 0 : _b.bypassHtml) ? 'html' : 'none';
    }
}
TbodySaveCancelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodySaveCancelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
TbodySaveCancelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: TbodySaveCancelComponent, selector: "angular2-st-tbody-create-cancel", inputs: { grid: "grid", row: "row", editConfirm: "editConfirm", editCancel: "editCancel" }, usesOnChanges: true, ngImport: i0, template: `
    <a href="#" class="angular2-smart-action angular2-smart-action-edit-save"
        [innerHTML]="saveButtonContent" (click)="onSave($event)"></a>
    <a href="#" class="angular2-smart-action angular2-smart-action-edit-cancel"
        [innerHTML]="cancelButtonContent" (click)="onCancelEdit($event)"></a>
  `, isInline: true });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TbodySaveCancelComponent, decorators: [{
            type: Component,
            args: [{
                    // TODO: @breaking-change rename the selector to angular2-st-tbody-save-cancel in the next major version
                    selector: 'angular2-st-tbody-create-cancel',
                    template: `
    <a href="#" class="angular2-smart-action angular2-smart-action-edit-save"
        [innerHTML]="saveButtonContent" (click)="onSave($event)"></a>
    <a href="#" class="angular2-smart-action angular2-smart-action-edit-cancel"
        [innerHTML]="cancelButtonContent" (click)="onCancelEdit($event)"></a>
  `,
                }]
        }], propDecorators: { grid: [{
                type: Input
            }], row: [{
                type: Input
            }], editConfirm: [{
                type: Input
            }], editCancel: [{
                type: Input
            }] } });

class NgxSmartTableTbodyComponent {
    constructor() {
        this.edit = new EventEmitter();
        this.delete = new EventEmitter();
        this.custom = new EventEmitter();
        this.userSelectRow = new EventEmitter();
        this.editRowSelect = new EventEmitter();
        this.multipleSelectRow = new EventEmitter();
        this.rowHover = new EventEmitter();
        this.onExpandRow = new EventEmitter();
        this.hasChildComponent = false;
    }
    ngAfterViewInit() {
        let cmp = this.getExpandedRowComponentFromSettings();
        if (cmp && !this.expandedRowComponent) {
            this.expandedRowChild.forEach(c => c.clear());
            this.hasChildComponent = true;
            this.createCustomComponent();
        }
    }
    ngOnDestroy() {
        if (this.expandedRowComponent)
            this.expandedRowComponent.destroy();
    }
    getExpandedRowComponentFromSettings() {
        var _a, _b;
        return (_b = (_a = this.grid.settings.expand) === null || _a === void 0 ? void 0 : _a.component) !== null && _b !== void 0 ? _b : this.grid.settings.expandedRowComponent;
    }
    createCustomComponent() {
        let cmp = this.getExpandedRowComponentFromSettings();
        if (cmp) {
            this.expandedRowChild.changes
                .pipe(delay(0))
                .subscribe((list) => {
                if (list.length) {
                    this.expandedRowComponent = list.first.createComponent(cmp);
                    Object.assign(this.expandedRowComponent.instance, this.grid.dataSet.expandRow, {
                        rowData: this.grid.dataSet.getExpandedRow().getData(),
                    });
                }
            });
        }
    }
    get tableColumnsCount() {
        const actionColumn = this.isActionAdd || this.isActionEdit || this.isActionDelete ? 1 : 0;
        const selectColumn = this.isMultiSelectVisible ? 1 : 0;
        return this.grid.getColumns().length + actionColumn + selectColumn;
    }
    ngOnChanges() {
        this.isMultiSelectVisible = this.grid.isMultiSelectVisible();
        this.showActionColumnLeft = this.grid.showActionColumn('left');
        this.mode = this.grid.getSetting('mode');
        this.editInputClass = this.grid.getSetting('edit.inputClass');
        this.showActionColumnRight = this.grid.showActionColumn('right');
        this.isActionAdd = this.grid.getSetting('actions.add');
        this.isActionEdit = this.grid.getSetting('actions.edit');
        this.isActionDelete = this.grid.getSetting('actions.delete');
        this.noDataMessage = this.grid.getSetting('noDataMessage');
    }
    getVisibleCells(cells) {
        return (cells || []).filter((cell) => !cell.getColumn().hide);
    }
    onExpandRowClick(row) {
        this.onExpandRow.emit(row);
    }
}
NgxSmartTableTbodyComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: NgxSmartTableTbodyComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
NgxSmartTableTbodyComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: NgxSmartTableTbodyComponent, selector: "[angular2-st-tbody]", inputs: { grid: "grid", source: "source", deleteConfirm: "deleteConfirm", editConfirm: "editConfirm", editCancel: "editCancel", rowClassFunction: "rowClassFunction" }, outputs: { edit: "edit", delete: "delete", custom: "custom", userSelectRow: "userSelectRow", editRowSelect: "editRowSelect", multipleSelectRow: "multipleSelectRow", rowHover: "rowHover", onExpandRow: "onExpandRow" }, viewQueries: [{ propertyName: "expandedRowChild", predicate: ["expandedRowChild"], descendants: true, read: ViewContainerRef }], usesOnChanges: true, ngImport: i0, template: "<ng-container  *ngFor=\"let row of grid.getRows()\">\n  <tr (click)=\"userSelectRow.emit(row)\" (mouseover)=\"rowHover.emit(row)\" class=\"angular2-smart-row\" [className]=\"rowClassFunction(row)\" [ngClass]=\"{selected: row.isSelected}\">\n    <td *ngIf=\"isMultiSelectVisible\" class=\"angular2-smart-actions angular2-smart-action-multiple-select\" (click)=\"multipleSelectRow.emit(row)\">\n      <input type=\"checkbox\" class=\"form-check-input\" [ngModel]=\"row.isSelected\">\n    </td>\n    <td *ngIf=\"!row.isInEditing && showActionColumnLeft\" class=\"angular2-smart-actions\">\n\n      <angular2-st-tbody-custom\n        [grid]=\"grid\"\n        (custom)=\"custom.emit($event)\"\n        [row]=\"row\"\n        [source]=\"source\">\n      </angular2-st-tbody-custom>\n\n      <angular2-st-tbody-expand\n          *ngIf=\"hasChildComponent\"\n          [grid]=\"grid\"\n          [row]=\"row\"\n          (onExpandRow)=\"onExpandRow.emit(row)\">\n      </angular2-st-tbody-expand>\n\n      <angular2-st-tbody-edit-delete [grid]=\"grid\"\n                                [deleteConfirm]=\"deleteConfirm\"\n                                (edit)=\"edit.emit($event)\"\n                                (delete)=\"delete.emit($event)\"\n                                (editRowSelect)=\"editRowSelect.emit($event)\"\n                                [row]=\"row\"\n                                [source]=\"source\">\n      </angular2-st-tbody-edit-delete>\n    </td>\n    <td *ngIf=\"row.isInEditing && showActionColumnLeft\"  class=\"angular2-smart-actions\">\n      <angular2-st-tbody-create-cancel [grid]=\"grid\" [row]=\"row\" [editConfirm]=\"editConfirm\" [editCancel]=\"editCancel\"></angular2-st-tbody-create-cancel>\n    </td>\n    <td *ngFor=\"let cell of getVisibleCells(row.cells)\">\n      <angular2-smart-table-cell [cell]=\"cell\"\n                            [grid]=\"grid\"\n                            [row]=\"row\"\n                            [isNew]=\"false\"\n                            [mode]=\"mode\"\n                            [editConfirm]=\"editConfirm\"\n                            [editCancel]=\"editCancel\"\n                            [inputClass]=\"editInputClass\"\n                            [isInEditing]=\"row.isInEditing\">\n      </angular2-smart-table-cell>\n    </td>\n\n    <td *ngIf=\"row.isInEditing && showActionColumnRight\"  class=\"angular2-smart-actions\">\n      <angular2-st-tbody-create-cancel [grid]=\"grid\" [row]=\"row\" [editConfirm]=\"editConfirm\" [editCancel]=\"editCancel\"></angular2-st-tbody-create-cancel>\n    </td>\n\n    <td *ngIf=\"!row.isInEditing && showActionColumnRight\" class=\"angular2-smart-actions\">\n      <angular2-st-tbody-custom [grid]=\"grid\" (custom)=\"custom.emit($event)\" [row]=\"row\" [source]=\"source\"></angular2-st-tbody-custom>\n\n      <angular2-st-tbody-expand\n          *ngIf=\"hasChildComponent\"\n          [grid]=\"grid\"\n          [row]=\"row\"\n          (onExpandRow)=\"onExpandRow.emit(row)\">\n      </angular2-st-tbody-expand>\n\n      <angular2-st-tbody-edit-delete [grid]=\"grid\"\n                                [deleteConfirm]=\"deleteConfirm\"\n                                [row]=\"row\"\n                                [source]=\"source\"\n                                (edit)=\"edit.emit($event)\"\n                                (delete)=\"delete.emit($event)\"\n                                (editRowSelect)=\"editRowSelect.emit($event)\">\n      </angular2-st-tbody-edit-delete>\n    </td>\n  </tr>\n  <tr class=\"angular2-smart-row angular2-smart-row-detail\" *ngIf=\"row.isExpanded\">\n    <td [attr.colspan]=\"tableColumnsCount\" class=\"angular2-smart-column-expandedDetail\">\n      <ng-template #expandedRowChild ></ng-template>\n    </td>\n  </tr>\n</ng-container>\n<tr *ngIf=\"grid.getRows().length == 0\">\n  <td [attr.colspan]=\"tableColumnsCount\">\n    {{ noDataMessage }}\n  </td>\n</tr>\n", styles: [":host .angular2-smart-row.selected{background:rgba(0,0,0,.05)}:host .angular2-smart-row .angular2-smart-actions.angular2-smart-action-multiple-select{text-align:center}:host ::ng-deep angular2-st-tbody-edit-delete a:first-child,:host ::ng-deep angular2-st-tbody-create-cancel a:first-child,:host ::ng-deep angular2-st-tbody-expand a:first-child{margin-right:.25rem}\n"], components: [{ type: TbodyCustomComponent, selector: "angular2-st-tbody-custom", inputs: ["grid", "row", "source"], outputs: ["custom"] }, { type: TbodyExpandRowComponent, selector: "angular2-st-tbody-expand", inputs: ["grid", "row"], outputs: ["onExpandRow"] }, { type: TbodyEditDeleteComponent, selector: "angular2-st-tbody-edit-delete", inputs: ["grid", "row", "source", "deleteConfirm"], outputs: ["edit", "delete", "editRowSelect"] }, { type: TbodySaveCancelComponent, selector: "angular2-st-tbody-create-cancel", inputs: ["grid", "row", "editConfirm", "editCancel"] }, { type: CellComponent, selector: "angular2-smart-table-cell", inputs: ["grid", "row", "cell", "inputClass", "mode", "isInEditing", "isNew", "editConfirm", "editCancel", "createConfirm", "createCancel"] }], directives: [{ type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i1.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: NgxSmartTableTbodyComponent, decorators: [{
            type: Component,
            args: [{ selector: '[angular2-st-tbody]', template: "<ng-container  *ngFor=\"let row of grid.getRows()\">\n  <tr (click)=\"userSelectRow.emit(row)\" (mouseover)=\"rowHover.emit(row)\" class=\"angular2-smart-row\" [className]=\"rowClassFunction(row)\" [ngClass]=\"{selected: row.isSelected}\">\n    <td *ngIf=\"isMultiSelectVisible\" class=\"angular2-smart-actions angular2-smart-action-multiple-select\" (click)=\"multipleSelectRow.emit(row)\">\n      <input type=\"checkbox\" class=\"form-check-input\" [ngModel]=\"row.isSelected\">\n    </td>\n    <td *ngIf=\"!row.isInEditing && showActionColumnLeft\" class=\"angular2-smart-actions\">\n\n      <angular2-st-tbody-custom\n        [grid]=\"grid\"\n        (custom)=\"custom.emit($event)\"\n        [row]=\"row\"\n        [source]=\"source\">\n      </angular2-st-tbody-custom>\n\n      <angular2-st-tbody-expand\n          *ngIf=\"hasChildComponent\"\n          [grid]=\"grid\"\n          [row]=\"row\"\n          (onExpandRow)=\"onExpandRow.emit(row)\">\n      </angular2-st-tbody-expand>\n\n      <angular2-st-tbody-edit-delete [grid]=\"grid\"\n                                [deleteConfirm]=\"deleteConfirm\"\n                                (edit)=\"edit.emit($event)\"\n                                (delete)=\"delete.emit($event)\"\n                                (editRowSelect)=\"editRowSelect.emit($event)\"\n                                [row]=\"row\"\n                                [source]=\"source\">\n      </angular2-st-tbody-edit-delete>\n    </td>\n    <td *ngIf=\"row.isInEditing && showActionColumnLeft\"  class=\"angular2-smart-actions\">\n      <angular2-st-tbody-create-cancel [grid]=\"grid\" [row]=\"row\" [editConfirm]=\"editConfirm\" [editCancel]=\"editCancel\"></angular2-st-tbody-create-cancel>\n    </td>\n    <td *ngFor=\"let cell of getVisibleCells(row.cells)\">\n      <angular2-smart-table-cell [cell]=\"cell\"\n                            [grid]=\"grid\"\n                            [row]=\"row\"\n                            [isNew]=\"false\"\n                            [mode]=\"mode\"\n                            [editConfirm]=\"editConfirm\"\n                            [editCancel]=\"editCancel\"\n                            [inputClass]=\"editInputClass\"\n                            [isInEditing]=\"row.isInEditing\">\n      </angular2-smart-table-cell>\n    </td>\n\n    <td *ngIf=\"row.isInEditing && showActionColumnRight\"  class=\"angular2-smart-actions\">\n      <angular2-st-tbody-create-cancel [grid]=\"grid\" [row]=\"row\" [editConfirm]=\"editConfirm\" [editCancel]=\"editCancel\"></angular2-st-tbody-create-cancel>\n    </td>\n\n    <td *ngIf=\"!row.isInEditing && showActionColumnRight\" class=\"angular2-smart-actions\">\n      <angular2-st-tbody-custom [grid]=\"grid\" (custom)=\"custom.emit($event)\" [row]=\"row\" [source]=\"source\"></angular2-st-tbody-custom>\n\n      <angular2-st-tbody-expand\n          *ngIf=\"hasChildComponent\"\n          [grid]=\"grid\"\n          [row]=\"row\"\n          (onExpandRow)=\"onExpandRow.emit(row)\">\n      </angular2-st-tbody-expand>\n\n      <angular2-st-tbody-edit-delete [grid]=\"grid\"\n                                [deleteConfirm]=\"deleteConfirm\"\n                                [row]=\"row\"\n                                [source]=\"source\"\n                                (edit)=\"edit.emit($event)\"\n                                (delete)=\"delete.emit($event)\"\n                                (editRowSelect)=\"editRowSelect.emit($event)\">\n      </angular2-st-tbody-edit-delete>\n    </td>\n  </tr>\n  <tr class=\"angular2-smart-row angular2-smart-row-detail\" *ngIf=\"row.isExpanded\">\n    <td [attr.colspan]=\"tableColumnsCount\" class=\"angular2-smart-column-expandedDetail\">\n      <ng-template #expandedRowChild ></ng-template>\n    </td>\n  </tr>\n</ng-container>\n<tr *ngIf=\"grid.getRows().length == 0\">\n  <td [attr.colspan]=\"tableColumnsCount\">\n    {{ noDataMessage }}\n  </td>\n</tr>\n", styles: [":host .angular2-smart-row.selected{background:rgba(0,0,0,.05)}:host .angular2-smart-row .angular2-smart-actions.angular2-smart-action-multiple-select{text-align:center}:host ::ng-deep angular2-st-tbody-edit-delete a:first-child,:host ::ng-deep angular2-st-tbody-create-cancel a:first-child,:host ::ng-deep angular2-st-tbody-expand a:first-child{margin-right:.25rem}\n"] }]
        }], propDecorators: { grid: [{
                type: Input
            }], source: [{
                type: Input
            }], deleteConfirm: [{
                type: Input
            }], editConfirm: [{
                type: Input
            }], editCancel: [{
                type: Input
            }], rowClassFunction: [{
                type: Input
            }], edit: [{
                type: Output
            }], delete: [{
                type: Output
            }], custom: [{
                type: Output
            }], userSelectRow: [{
                type: Output
            }], editRowSelect: [{
                type: Output
            }], multipleSelectRow: [{
                type: Output
            }], rowHover: [{
                type: Output
            }], onExpandRow: [{
                type: Output
            }], expandedRowChild: [{
                type: ViewChildren,
                args: ['expandedRowChild', { read: ViewContainerRef }]
            }] } });

class PagerComponent {
    constructor() {
        this.count = 0;
    }
    ngOnChanges(changes) {
        if (changes.source) {
            if (!changes.source.firstChange) {
                this.dataChangedSub.unsubscribe();
            }
            this.dataChangedSub = this.source.onChanged().subscribe((dataChanges) => {
                this.page = this.source.getPaging().page;
                this.perPage = this.source.getPaging().perPage;
                this.currentPerPage = this.perPage;
                this.count = this.source.count();
                if (this.isPageOutOfBounce()) {
                    this.source.setPage(--this.page);
                }
                this.processPageChange(dataChanges);
                this.initPages();
            });
        }
    }
    /**
     * We change the page here depending on the action performed against data source
     * if a new element was added to the end of the table - then change the page to the last
     * if a new element was added to the beginning of the table - then to the first page
     * @param changes
     */
    processPageChange(changes) {
        if (changes.action === 'prepend') {
            this.source.setPage(1);
        }
        if (changes.action === 'append') {
            this.source.setPage(this.getLast());
        }
    }
    shouldShow() {
        return this.source.count() > this.perPage;
    }
    paginate(page) {
        this.source.setPage(page);
        this.page = page;
        return false;
    }
    next() {
        return this.paginate(this.getPage() + 1);
    }
    prev() {
        return this.paginate(this.getPage() - 1);
    }
    getPage() {
        return this.page;
    }
    getPages() {
        return this.pages;
    }
    getLast() {
        return Math.ceil(this.count / this.perPage);
    }
    isPageOutOfBounce() {
        return (this.page * this.perPage) >= (this.count + this.perPage) && this.page > 1;
    }
    initPages() {
        const pagesCount = this.getLast();
        let showPagesCount = 4;
        showPagesCount = pagesCount < showPagesCount ? pagesCount : showPagesCount;
        this.pages = [];
        if (this.shouldShow()) {
            let middleOne = Math.ceil(showPagesCount / 2);
            middleOne = this.page >= middleOne ? this.page : middleOne;
            let lastOne = middleOne + Math.floor(showPagesCount / 2);
            lastOne = lastOne >= pagesCount ? pagesCount : lastOne;
            const firstOne = lastOne - showPagesCount + 1;
            for (let i = firstOne; i <= lastOne; i++) {
                this.pages.push(i);
            }
        }
    }
    onChangePerPage(event) {
        if (this.currentPerPage) {
            this.source.getPaging().perPage = this.currentPerPage * 1;
            this.source.refresh();
            this.initPages();
        }
    }
}
PagerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: PagerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
PagerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: PagerComponent, selector: "angular2-smart-table-pager", inputs: { source: "source", perPageSelect: "perPageSelect", perPageSelectLabel: "perPageSelectLabel" }, usesOnChanges: true, ngImport: i0, template: `
    <nav *ngIf="shouldShow()" class="angular2-smart-pagination-nav">
      <ul class="angular2-smart-pagination pagination">
        <li class="angular2-smart-page-item page-item" [ngClass]="{disabled: getPage() == 1}">
          <a class="angular2-smart-page-link page-link" href="#"
          (click)="getPage() == 1 ? false : paginate(1)" aria-label="First">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">First</span>
          </a>
        </li>
        <li class="angular2-smart-page-item page-item" [ngClass]="{disabled: getPage() == 1}">
          <a class="angular2-smart-page-link page-link page-link-prev" href="#"
             (click)="getPage() == 1 ? false : prev()" aria-label="Prev">
            <span aria-hidden="true">&lt;</span>
            <span class="sr-only">Prev</span>
          </a>
        </li>
        <li class="angular2-smart-page-item page-item"
        [ngClass]="{active: getPage() == page}" *ngFor="let page of getPages()">
          <span class="angular2-smart-page-link page-link"
          *ngIf="getPage() == page">{{ page }} <span class="sr-only">(current)</span></span>
          <a class="angular2-smart-page-link page-link" href="#"
          (click)="paginate(page)" *ngIf="getPage() != page">{{ page }}</a>
        </li>

        <li class="angular2-smart-page-item page-item"
            [ngClass]="{disabled: getPage() == getLast()}">
          <a class="angular2-smart-page-link page-link page-link-next" href="#"
             (click)="getPage() == getLast() ? false : next()" aria-label="Next">
            <span aria-hidden="true">&gt;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>

        <li class="angular2-smart-page-item page-item"
        [ngClass]="{disabled: getPage() == getLast()}">
          <a class="angular2-smart-page-link page-link" href="#"
          (click)="getPage() == getLast() ? false : paginate(getLast())" aria-label="Last">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Last</span>
          </a>
        </li>
      </ul>
    </nav>
    <div *ngIf="!shouldShow()"><!-- placeholder to consume the space of the page selection --></div>

    <nav *ngIf="perPageSelect && perPageSelect.length > 0" class="angular2-smart-pagination-per-page">
      <label for="per-page" *ngIf="perPageSelectLabel">{{perPageSelectLabel}}</label>
      <select (change)="onChangePerPage($event)" [(ngModel)]="currentPerPage" id="per-page">
        <option *ngFor="let item of perPageSelect" [value]="item">{{ item }}</option>
      </select>
    </nav>
  `, isInline: true, styles: [".angular2-smart-pagination{display:inline-flex;font-size:.875em;padding:0}.angular2-smart-pagination .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.angular2-smart-pagination .angular2-smart-page-item{display:inline}.angular2-smart-pagination .page-link-next,.angular2-smart-pagination .page-link-prev{font-size:10px}:host{display:flex;justify-content:space-between}:host ul{margin:1rem 0}:host select{margin:1rem 0}:host label{margin:1rem 1rem 1rem 0;line-height:2.5rem}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i1.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: PagerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'angular2-smart-table-pager', template: `
    <nav *ngIf="shouldShow()" class="angular2-smart-pagination-nav">
      <ul class="angular2-smart-pagination pagination">
        <li class="angular2-smart-page-item page-item" [ngClass]="{disabled: getPage() == 1}">
          <a class="angular2-smart-page-link page-link" href="#"
          (click)="getPage() == 1 ? false : paginate(1)" aria-label="First">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">First</span>
          </a>
        </li>
        <li class="angular2-smart-page-item page-item" [ngClass]="{disabled: getPage() == 1}">
          <a class="angular2-smart-page-link page-link page-link-prev" href="#"
             (click)="getPage() == 1 ? false : prev()" aria-label="Prev">
            <span aria-hidden="true">&lt;</span>
            <span class="sr-only">Prev</span>
          </a>
        </li>
        <li class="angular2-smart-page-item page-item"
        [ngClass]="{active: getPage() == page}" *ngFor="let page of getPages()">
          <span class="angular2-smart-page-link page-link"
          *ngIf="getPage() == page">{{ page }} <span class="sr-only">(current)</span></span>
          <a class="angular2-smart-page-link page-link" href="#"
          (click)="paginate(page)" *ngIf="getPage() != page">{{ page }}</a>
        </li>

        <li class="angular2-smart-page-item page-item"
            [ngClass]="{disabled: getPage() == getLast()}">
          <a class="angular2-smart-page-link page-link page-link-next" href="#"
             (click)="getPage() == getLast() ? false : next()" aria-label="Next">
            <span aria-hidden="true">&gt;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>

        <li class="angular2-smart-page-item page-item"
        [ngClass]="{disabled: getPage() == getLast()}">
          <a class="angular2-smart-page-link page-link" href="#"
          (click)="getPage() == getLast() ? false : paginate(getLast())" aria-label="Last">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Last</span>
          </a>
        </li>
      </ul>
    </nav>
    <div *ngIf="!shouldShow()"><!-- placeholder to consume the space of the page selection --></div>

    <nav *ngIf="perPageSelect && perPageSelect.length > 0" class="angular2-smart-pagination-per-page">
      <label for="per-page" *ngIf="perPageSelectLabel">{{perPageSelectLabel}}</label>
      <select (change)="onChangePerPage($event)" [(ngModel)]="currentPerPage" id="per-page">
        <option *ngFor="let item of perPageSelect" [value]="item">{{ item }}</option>
      </select>
    </nav>
  `, styles: [".angular2-smart-pagination{display:inline-flex;font-size:.875em;padding:0}.angular2-smart-pagination .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0}.angular2-smart-pagination .angular2-smart-page-item{display:inline}.angular2-smart-pagination .page-link-next,.angular2-smart-pagination .page-link-prev{font-size:10px}:host{display:flex;justify-content:space-between}:host ul{margin:1rem 0}:host select{margin:1rem 0}:host label{margin:1rem 1rem 1rem 0;line-height:2.5rem}\n"] }]
        }], propDecorators: { source: [{
                type: Input
            }], perPageSelect: [{
                type: Input
            }], perPageSelectLabel: [{
                type: Input
            }] } });

class Angular2SmartTableComponent {
    constructor() {
        this.settings = {};
        this.rowSelect = new EventEmitter();
        this.userRowSelect = new EventEmitter();
        this.delete = new EventEmitter();
        this.edit = new EventEmitter();
        this.create = new EventEmitter();
        this.custom = new EventEmitter();
        this.deleteConfirm = new EventEmitter();
        this.editConfirm = new EventEmitter();
        this.editCancel = new EventEmitter();
        this.createConfirm = new EventEmitter();
        this.createCancel = new EventEmitter();
        this.rowHover = new EventEmitter();
        this.afterGridInit = new EventEmitter();
        this.perPageSelect = [];
        this.perPageSelectLabel = 'Per Page:';
        this.defaultSettings = {
            mode: 'inline',
            selectMode: 'single',
            /**
             * Points to an element in all data
             *
             * when < 0 all lines must be deselected
             */
            selectedRowIndex: 0,
            switchPageToSelectedRowPage: false,
            hideHeader: false,
            hideSubHeader: false,
            resizable: false,
            hideable: false,
            actions: {
                columnTitle: 'Actions',
                add: true,
                edit: true,
                delete: true,
                custom: [],
                position: 'left', // left|right
            },
            filter: {
                inputClass: '',
            },
            edit: {
                inputClass: '',
                editButtonContent: 'Edit',
                saveButtonContent: 'Update',
                cancelButtonContent: 'Cancel',
                confirmSave: false,
            },
            add: {
                inputClass: '',
                addButtonContent: 'Add New',
                createButtonContent: 'Create',
                cancelButtonContent: 'Cancel',
                confirmCreate: false,
            },
            delete: {
                deleteButtonContent: 'Delete',
                confirmDelete: false,
            },
            expand: {
                buttonContent: 'Expand'
            },
            attr: {
                id: '',
                class: '',
            },
            noDataMessage: 'No data found',
            columns: {},
            pager: {
                display: true,
                page: 1,
                perPage: 10,
            },
            rowClassFunction: () => '',
        };
        this.isAllSelected = false;
        this.destroyed$ = new Subject();
    }
    ngOnChanges(changes) {
        if (this.grid) {
            if (changes['settings']) {
                this.grid.setSettings(this.prepareSettings());
            }
            if (changes['source']) {
                this.source = this.prepareSource();
                this.grid.setSource(this.source);
            }
        }
        else {
            this.initGrid();
        }
        this.tableId = this.grid.getSetting('attr.id');
        this.tableClass = this.grid.getSetting('attr.class');
        this.isHideHeader = this.grid.getSetting('hideHeader');
        this.isHideSubHeader = this.grid.getSetting('hideSubHeader');
        this.isPagerDisplay = this.grid.getSetting('pager.display');
        this.isPagerDisplay = this.grid.getSetting('pager.display');
        this.perPageSelect = this.grid.getSetting('pager.perPageSelect', this.perPageSelect);
        this.perPageSelectLabel = this.grid.getSetting('pager.perPageSelectLabel', this.perPageSelectLabel);
        this.rowClassFunction = this.grid.getSetting('rowClassFunction');
    }
    ngOnDestroy() {
        this.destroyed$.next();
    }
    selectRow(index, switchPageToSelectedRowPage = this.grid.getSetting('switchPageToSelectedRowPage')) {
        if (!this.grid) {
            return;
        }
        this.grid.settings.selectedRowIndex = index;
        if (this.isIndexOutOfRange(index)) {
            // we need to deselect all rows if we got an incorrect index
            this.grid.dataSet.deselectAll();
            this.emitSelectRow(null);
            return;
        }
        if (switchPageToSelectedRowPage) {
            const source = this.source;
            const paging = source.getPaging();
            const page = getPageForRowIndex(index, paging.perPage);
            index = index % paging.perPage;
            this.grid.settings.selectedRowIndex = index;
            if (page !== paging.page) {
                source.setPage(page);
                return;
            }
        }
        const row = this.grid.getRows()[index];
        if (row) {
            this.grid.selectRow(row);
            this.emitSelectRow(row);
        }
    }
    onEditRowSelect(row) {
        if (this.grid.getSetting('selectMode') === 'single') {
            this.grid.selectRow(row);
            this.emitSelectRow(row);
        }
    }
    onUserSelectRow(row) {
        if (this.grid.getSetting('selectMode') === 'single') {
            this.grid.selectRow(row);
            this.emitUserSelectRow(row);
        }
    }
    onRowHover(row) {
        this.rowHover.emit(row);
    }
    onMultipleSelectRow(row) {
        this.grid.multipleSelectRow(row);
        // TODO: currently we make our life easy and just deselect the "select all" checkbox when needed
        //       but we do not check it, when we determine that the user has selected everything
        if (!row.isSelected)
            this.isAllSelected = false;
        this.emitUserSelectRow(row);
    }
    onSelectAllRows() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isAllSelected = !this.isAllSelected;
            yield this.grid.selectAllRows(this.isAllSelected);
            this.emitUserSelectRow(null);
        });
    }
    onExpandRow(row) {
        this.grid.expandRow(row);
    }
    initGrid() {
        this.source = this.prepareSource();
        this.grid = new Grid(this.source, this.prepareSettings());
        this.subscribeToOnSelectRow();
        /** Delay a bit the grid init event trigger to prevent empty rows */
        setTimeout(() => {
            this.afterGridInit.emit(this.grid.dataSet);
        }, 10);
    }
    prepareSource() {
        let source;
        if (this.source instanceof DataSource) {
            source = this.source;
        }
        else if (this.source instanceof Array) {
            source = new LocalDataSource(this.source);
        }
        else {
            source = new LocalDataSource();
        }
        // we have to hook up a listener to update some variables when the data source changes
        if (this.dataChangeSubscription)
            this.dataChangeSubscription.unsubscribe();
        this.dataChangeSubscription = source.onChanged().subscribe((changes) => this.processDataChange(changes));
        return source;
    }
    processDataChange(changes) {
        // here we can already assume that the source has been lifted to an instance of DataSource
        const source = this.source;
        this.isAllSelected = source.isEveryElementSelected(this.grid.getSetting('selectMode') === 'multi_filtered');
    }
    prepareSettings() {
        return deepExtend({}, this.defaultSettings, this.settings);
    }
    getNotVisibleColumns() {
        var _a, _b;
        return ((_b = (_a = this.grid) === null || _a === void 0 ? void 0 : _a.getColumns()) !== null && _b !== void 0 ? _b : []).filter((column) => column.hide);
    }
    onShowHeader(columnId) {
        this.settings.columns[columnId].hide = false;
        this.grid.setSettings(this.prepareSettings());
    }
    onHideHeader(columnId) {
        this.settings.columns[columnId].hide = true;
        this.grid.setSettings(this.prepareSettings());
    }
    createRowSelectionEvent(row) {
        return {
            row: row,
            data: row ? row.getData() : null,
            isSelected: row ? row.getIsSelected() : null,
            source: this.source,
            selected: this.grid.getSelectedItems(),
        };
    }
    emitUserSelectRow(row) {
        this.userRowSelect.emit(this.createRowSelectionEvent(row));
        // always also emit the general event
        this.emitSelectRow(row);
    }
    emitSelectRow(row) {
        this.rowSelect.emit(this.createRowSelectionEvent(row));
    }
    isIndexOutOfRange(index) {
        var _a;
        const dataAmount = (_a = this.source) === null || _a === void 0 ? void 0 : _a.count();
        return index < 0 || (typeof dataAmount === 'number' && index >= dataAmount);
    }
    subscribeToOnSelectRow() {
        if (this.onSelectRowSubscription) {
            this.onSelectRowSubscription.unsubscribe();
        }
        this.onSelectRowSubscription = this.grid.onSelectRow()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((row) => {
            this.emitSelectRow(row);
        });
    }
}
Angular2SmartTableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: Angular2SmartTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
Angular2SmartTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: Angular2SmartTableComponent, selector: "angular2-smart-table", inputs: { source: "source", settings: "settings" }, outputs: { rowSelect: "rowSelect", userRowSelect: "userRowSelect", delete: "delete", edit: "edit", create: "create", custom: "custom", deleteConfirm: "deleteConfirm", editConfirm: "editConfirm", editCancel: "editCancel", createConfirm: "createConfirm", createCancel: "createCancel", rowHover: "rowHover", afterGridInit: "afterGridInit" }, usesOnChanges: true, ngImport: i0, template: "<angular2-smart-table-tags-list\n  [tags]=\"getNotVisibleColumns()\" (close)=\"onShowHeader($event)\"\n></angular2-smart-table-tags-list>\n\n<div style=\"overflow-x: auto; -webkit-overflow-scrolling: touch\">\n  <table [id]=\"tableId\" [ngClass]=\"tableClass\">\n    <thead\n      angular2-st-thead\n      *ngIf=\"!isHideHeader || !isHideSubHeader\"\n      [grid]=\"grid\"\n      [isAllSelected]=\"isAllSelected\"\n      [source]=\"source\"\n      [createConfirm]=\"createConfirm\"\n      [createCancel]=\"createCancel\"\n      (create)=\"create.emit($event)\"\n      (selectAllRows)=\"onSelectAllRows()\"\n      (hide)=\"onHideHeader($event)\"\n    ></thead>\n\n    <tbody\n      angular2-st-tbody\n      [grid]=\"grid\"\n      [source]=\"source\"\n      [deleteConfirm]=\"deleteConfirm\"\n      [editConfirm]=\"editConfirm\"\n      [editCancel]=\"editCancel\"\n      [rowClassFunction]=\"rowClassFunction\"\n      (edit)=\"edit.emit($event)\"\n      (delete)=\"delete.emit($event)\"\n      (custom)=\"custom.emit($event)\"\n      (userSelectRow)=\"onUserSelectRow($event)\"\n      (editRowSelect)=\"onEditRowSelect($event)\"\n      (multipleSelectRow)=\"onMultipleSelectRow($event)\"\n      (onExpandRow)=\"onExpandRow($event)\"\n      (rowHover)=\"onRowHover($event)\"\n    ></tbody>\n  </table>\n</div>\n<angular2-smart-table-pager\n  *ngIf=\"isPagerDisplay\"\n  [source]=\"source\"\n  [perPageSelect]=\"perPageSelect\"\n  [perPageSelectLabel]=\"perPageSelectLabel\"\n>\n</angular2-smart-table-pager>\n", styles: [":host{font-size:1rem}:host ::ng-deep *{box-sizing:border-box}:host ::ng-deep button,:host ::ng-deep input,:host ::ng-deep optgroup,:host ::ng-deep select,:host ::ng-deep textarea{color:inherit;font:inherit;margin:0}:host ::ng-deep table{line-height:1.5em;border-collapse:collapse;border-spacing:0;display:table;width:100%;max-width:100%;overflow:auto;word-break:normal;word-break:keep-all}:host ::ng-deep table tr th{font-weight:700;position:relative}:host ::ng-deep table tr th .angular2-resizer-block{width:8px;height:100%;position:absolute;right:0;top:0;cursor:col-resize}:host ::ng-deep table tr section{font-size:.75em;font-weight:700}:host ::ng-deep table tr td,:host ::ng-deep table tr th{font-size:.875em;margin:0;padding:.5em 1em}:host ::ng-deep a{color:#1e6bb8;text-decoration:none}:host ::ng-deep a:hover{text-decoration:underline}:host ::ng-deep .not-allowed{cursor:not-allowed}\n"], components: [{ type: TagsListComponent, selector: "angular2-smart-table-tags-list", inputs: ["tags"], outputs: ["close"] }, { type: NgxSmartTableTheadComponent, selector: "[angular2-st-thead]", inputs: ["grid", "source", "isAllSelected", "createConfirm", "createCancel"], outputs: ["hide", "selectAllRows", "create"] }, { type: NgxSmartTableTbodyComponent, selector: "[angular2-st-tbody]", inputs: ["grid", "source", "deleteConfirm", "editConfirm", "editCancel", "rowClassFunction"], outputs: ["edit", "delete", "custom", "userSelectRow", "editRowSelect", "multipleSelectRow", "rowHover", "onExpandRow"] }, { type: PagerComponent, selector: "angular2-smart-table-pager", inputs: ["source", "perPageSelect", "perPageSelectLabel"] }], directives: [{ type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: Angular2SmartTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'angular2-smart-table', template: "<angular2-smart-table-tags-list\n  [tags]=\"getNotVisibleColumns()\" (close)=\"onShowHeader($event)\"\n></angular2-smart-table-tags-list>\n\n<div style=\"overflow-x: auto; -webkit-overflow-scrolling: touch\">\n  <table [id]=\"tableId\" [ngClass]=\"tableClass\">\n    <thead\n      angular2-st-thead\n      *ngIf=\"!isHideHeader || !isHideSubHeader\"\n      [grid]=\"grid\"\n      [isAllSelected]=\"isAllSelected\"\n      [source]=\"source\"\n      [createConfirm]=\"createConfirm\"\n      [createCancel]=\"createCancel\"\n      (create)=\"create.emit($event)\"\n      (selectAllRows)=\"onSelectAllRows()\"\n      (hide)=\"onHideHeader($event)\"\n    ></thead>\n\n    <tbody\n      angular2-st-tbody\n      [grid]=\"grid\"\n      [source]=\"source\"\n      [deleteConfirm]=\"deleteConfirm\"\n      [editConfirm]=\"editConfirm\"\n      [editCancel]=\"editCancel\"\n      [rowClassFunction]=\"rowClassFunction\"\n      (edit)=\"edit.emit($event)\"\n      (delete)=\"delete.emit($event)\"\n      (custom)=\"custom.emit($event)\"\n      (userSelectRow)=\"onUserSelectRow($event)\"\n      (editRowSelect)=\"onEditRowSelect($event)\"\n      (multipleSelectRow)=\"onMultipleSelectRow($event)\"\n      (onExpandRow)=\"onExpandRow($event)\"\n      (rowHover)=\"onRowHover($event)\"\n    ></tbody>\n  </table>\n</div>\n<angular2-smart-table-pager\n  *ngIf=\"isPagerDisplay\"\n  [source]=\"source\"\n  [perPageSelect]=\"perPageSelect\"\n  [perPageSelectLabel]=\"perPageSelectLabel\"\n>\n</angular2-smart-table-pager>\n", styles: [":host{font-size:1rem}:host ::ng-deep *{box-sizing:border-box}:host ::ng-deep button,:host ::ng-deep input,:host ::ng-deep optgroup,:host ::ng-deep select,:host ::ng-deep textarea{color:inherit;font:inherit;margin:0}:host ::ng-deep table{line-height:1.5em;border-collapse:collapse;border-spacing:0;display:table;width:100%;max-width:100%;overflow:auto;word-break:normal;word-break:keep-all}:host ::ng-deep table tr th{font-weight:700;position:relative}:host ::ng-deep table tr th .angular2-resizer-block{width:8px;height:100%;position:absolute;right:0;top:0;cursor:col-resize}:host ::ng-deep table tr section{font-size:.75em;font-weight:700}:host ::ng-deep table tr td,:host ::ng-deep table tr th{font-size:.875em;margin:0;padding:.5em 1em}:host ::ng-deep a{color:#1e6bb8;text-decoration:none}:host ::ng-deep a:hover{text-decoration:underline}:host ::ng-deep .not-allowed{cursor:not-allowed}\n"] }]
        }], propDecorators: { source: [{
                type: Input
            }], settings: [{
                type: Input
            }], rowSelect: [{
                type: Output
            }], userRowSelect: [{
                type: Output
            }], delete: [{
                type: Output
            }], edit: [{
                type: Output
            }], create: [{
                type: Output
            }], custom: [{
                type: Output
            }], deleteConfirm: [{
                type: Output
            }], editConfirm: [{
                type: Output
            }], editCancel: [{
                type: Output
            }], createConfirm: [{
                type: Output
            }], createCancel: [{
                type: Output
            }], rowHover: [{
                type: Output
            }], afterGridInit: [{
                type: Output
            }] } });

const PIPES = [
    BypassSecurityTrustPipe,
];
class PipesModule {
}
PipesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: PipesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PipesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: PipesModule, declarations: [BypassSecurityTrustPipe], exports: [BypassSecurityTrustPipe] });
PipesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: PipesModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: PipesModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [...PIPES],
                    exports: [...PIPES],
                }]
        }] });

const CELL_COMPONENTS = [
    CellComponent,
    EditCellDefault,
    DefaultEditor,
    CustomEditComponent,
    DefaultEditComponent,
    EditCellComponent,
    CheckboxEditorComponent,
    CompleterEditorComponent,
    InputEditorComponent,
    SelectEditorComponent,
    TextareaEditorComponent,
    CustomViewComponent,
    ViewCellComponent,
];
class CellModule {
}
CellModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
CellModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellModule, declarations: [CellComponent,
        EditCellDefault,
        DefaultEditor,
        CustomEditComponent,
        DefaultEditComponent,
        EditCellComponent,
        CheckboxEditorComponent,
        CompleterEditorComponent,
        InputEditorComponent,
        SelectEditorComponent,
        TextareaEditorComponent,
        CustomViewComponent,
        ViewCellComponent], imports: [CommonModule,
        FormsModule,
        Ng2CompleterModule,
        PipesModule], exports: [CellComponent,
        EditCellDefault,
        DefaultEditor,
        CustomEditComponent,
        DefaultEditComponent,
        EditCellComponent,
        CheckboxEditorComponent,
        CompleterEditorComponent,
        InputEditorComponent,
        SelectEditorComponent,
        TextareaEditorComponent,
        CustomViewComponent,
        ViewCellComponent] });
CellModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellModule, imports: [[
            CommonModule,
            FormsModule,
            Ng2CompleterModule,
            PipesModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: CellModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        Ng2CompleterModule,
                        PipesModule,
                    ],
                    declarations: [
                        ...CELL_COMPONENTS,
                    ],
                    exports: [
                        ...CELL_COMPONENTS,
                    ],
                }]
        }] });

const FILTER_COMPONENTS = [
    FilterDefault,
    DefaultFilter,
    FilterComponent,
    DateFilterComponent,
    DefaultFilterComponent,
    CustomFilterComponent,
    CheckboxFilterComponent,
    CompleterFilterComponent,
    InputFilterComponent,
    SelectFilterComponent,
    MselectFilterComponent
];
class FilterModule {
}
FilterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
FilterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterModule, declarations: [FilterDefault,
        DefaultFilter,
        FilterComponent,
        DateFilterComponent,
        DefaultFilterComponent,
        CustomFilterComponent,
        CheckboxFilterComponent,
        CompleterFilterComponent,
        InputFilterComponent,
        SelectFilterComponent,
        MselectFilterComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2CompleterModule,
        AngularMultiSelectModule], exports: [FilterDefault,
        DefaultFilter,
        FilterComponent,
        DateFilterComponent,
        DefaultFilterComponent,
        CustomFilterComponent,
        CheckboxFilterComponent,
        CompleterFilterComponent,
        InputFilterComponent,
        SelectFilterComponent,
        MselectFilterComponent] });
FilterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            Ng2CompleterModule,
            AngularMultiSelectModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: FilterModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        Ng2CompleterModule,
                        AngularMultiSelectModule
                    ],
                    declarations: [
                        ...FILTER_COMPONENTS,
                    ],
                    exports: [
                        ...FILTER_COMPONENTS,
                    ],
                }]
        }] });

class PagerModule {
}
PagerModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: PagerModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PagerModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: PagerModule, declarations: [PagerComponent], imports: [CommonModule,
        FormsModule], exports: [PagerComponent] });
PagerModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: PagerModule, imports: [[
            CommonModule,
            FormsModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: PagerModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                    ],
                    declarations: [
                        PagerComponent,
                    ],
                    exports: [
                        PagerComponent,
                    ],
                }]
        }] });

class TabsModule {
}
TabsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TabsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TabsModule, declarations: [TagComponent,
        TagsListComponent], imports: [CommonModule], exports: [TagComponent,
        TagsListComponent] });
TabsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TabsModule, imports: [[
            CommonModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TabsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                    ],
                    declarations: [
                        TagComponent,
                        TagsListComponent
                    ],
                    exports: [
                        TagComponent,
                        TagsListComponent
                    ],
                }]
        }] });

const TBODY_COMPONENTS = [
    TbodySaveCancelComponent,
    TbodyEditDeleteComponent,
    TbodyCustomComponent,
    TbodyExpandRowComponent,
    TbodyCustomItemComponent,
    NgxSmartTableTbodyComponent
];
class TBodyModule {
}
TBodyModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TBodyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TBodyModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TBodyModule, declarations: [TbodySaveCancelComponent,
        TbodyEditDeleteComponent,
        TbodyCustomComponent,
        TbodyExpandRowComponent,
        TbodyCustomItemComponent,
        NgxSmartTableTbodyComponent], imports: [CommonModule,
        FormsModule,
        CellModule,
        PipesModule], exports: [TbodySaveCancelComponent,
        TbodyEditDeleteComponent,
        TbodyCustomComponent,
        TbodyExpandRowComponent,
        TbodyCustomItemComponent,
        NgxSmartTableTbodyComponent] });
TBodyModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TBodyModule, imports: [[
            CommonModule,
            FormsModule,
            CellModule,
            PipesModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: TBodyModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        CellModule,
                        PipesModule,
                    ],
                    declarations: [
                        ...TBODY_COMPONENTS,
                    ],
                    exports: [
                        ...TBODY_COMPONENTS,
                    ],
                }]
        }] });

const DIRECTIVES = [
    NgxResizerDirective
];
class DirectivesModule {
}
DirectivesModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DirectivesModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
DirectivesModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DirectivesModule, declarations: [NgxResizerDirective], imports: [CommonModule], exports: [NgxResizerDirective] });
DirectivesModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DirectivesModule, imports: [[
            CommonModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: DirectivesModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        ...DIRECTIVES,
                    ],
                    exports: [
                        ...DIRECTIVES,
                    ],
                }]
        }] });

const THEAD_COMPONENTS = [
    TheadCreateCancelComponent,
    ActionsTitleComponent,
    AddButtonComponent,
    ColumnTitleComponent,
    TitleComponent,
    TheadFitlersRowComponent,
    TheadFormRowComponent,
    TheadTitlesRowComponent,
    NgxSmartTableTheadComponent
];
class THeadModule {
}
THeadModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: THeadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
THeadModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: THeadModule, declarations: [TheadCreateCancelComponent,
        ActionsTitleComponent,
        AddButtonComponent,
        ColumnTitleComponent,
        TitleComponent,
        TheadFitlersRowComponent,
        TheadFormRowComponent,
        TheadTitlesRowComponent,
        NgxSmartTableTheadComponent], imports: [CommonModule,
        FormsModule,
        FilterModule,
        CellModule,
        DirectivesModule,
        PipesModule], exports: [TheadCreateCancelComponent,
        ActionsTitleComponent,
        AddButtonComponent,
        ColumnTitleComponent,
        TitleComponent,
        TheadFitlersRowComponent,
        TheadFormRowComponent,
        TheadTitlesRowComponent,
        NgxSmartTableTheadComponent] });
THeadModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: THeadModule, imports: [[
            CommonModule,
            FormsModule,
            FilterModule,
            CellModule,
            DirectivesModule,
            PipesModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: THeadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        FilterModule,
                        CellModule,
                        DirectivesModule,
                        PipesModule
                    ],
                    declarations: [
                        ...THEAD_COMPONENTS,
                    ],
                    exports: [
                        ...THEAD_COMPONENTS,
                    ],
                }]
        }] });

class Angular2SmartTableModule {
}
Angular2SmartTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: Angular2SmartTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
Angular2SmartTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: Angular2SmartTableModule, declarations: [Angular2SmartTableComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CellModule,
        FilterModule,
        PagerModule,
        TBodyModule,
        THeadModule,
        TabsModule], exports: [Angular2SmartTableComponent] });
Angular2SmartTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: Angular2SmartTableModule, imports: [[
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            CellModule,
            FilterModule,
            PagerModule,
            TBodyModule,
            THeadModule,
            TabsModule
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: Angular2SmartTableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        Angular2SmartTableComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        CellModule,
                        FilterModule,
                        PagerModule,
                        TBodyModule,
                        THeadModule,
                        TabsModule
                    ],
                    exports: [
                        Angular2SmartTableComponent
                    ]
                }]
        }] });

class ServerSourceConf {
    constructor({ endPoint = '', sortFieldKey = '', sortDirKey = '', pagerPageKey = '', pagerLimitKey = '', filterFieldKey = '', totalKey = '', dataKey = '' } = {}) {
        this.endPoint = endPoint ? endPoint : '';
        this.sortFieldKey = sortFieldKey ? sortFieldKey : ServerSourceConf.SORT_FIELD_KEY;
        this.sortDirKey = sortDirKey ? sortDirKey : ServerSourceConf.SORT_DIR_KEY;
        this.pagerPageKey = pagerPageKey ? pagerPageKey : ServerSourceConf.PAGER_PAGE_KEY;
        this.pagerLimitKey = pagerLimitKey ? pagerLimitKey : ServerSourceConf.PAGER_LIMIT_KEY;
        this.filterFieldKey = filterFieldKey ? filterFieldKey : ServerSourceConf.FILTER_FIELD_KEY;
        this.totalKey = totalKey ? totalKey : ServerSourceConf.TOTAL_KEY;
        this.dataKey = dataKey ? dataKey : ServerSourceConf.DATA_KEY;
    }
}
ServerSourceConf.SORT_FIELD_KEY = '_sort';
ServerSourceConf.SORT_DIR_KEY = '_order';
ServerSourceConf.PAGER_PAGE_KEY = '_page';
ServerSourceConf.PAGER_LIMIT_KEY = '_limit';
ServerSourceConf.FILTER_FIELD_KEY = '#field#_like';
ServerSourceConf.TOTAL_KEY = 'x-total-count';
ServerSourceConf.DATA_KEY = '';

class ServerDataSource extends LocalDataSource {
    constructor(http, conf = {}) {
        super();
        this.http = http;
        this.lastRequestCount = 0;
        this.conf = new ServerSourceConf(conf);
        if (!this.conf.endPoint) {
            throw new Error('At least endPoint must be specified as a configuration of the server data source.');
        }
    }
    count() {
        return this.lastRequestCount;
    }
    getAll() {
        return this.loadData(false, false, false);
    }
    getElements() {
        return this.loadData(true, true, true);
    }
    getFilteredAndSorted() {
        return this.loadData(true, true, false);
    }
    loadData(filtered, sorted, paginated) {
        return lastValueFrom(this.requestElements(filtered, sorted, paginated)
            .pipe(map(res => {
            this.lastRequestCount = this.extractTotalFromResponse(res);
            // TODO: the following two lines are obviously incorrect
            //       but whoever hacked this ServerDataSource into the project did not think about compatibility to the interface
            this.data = this.extractDataFromResponse(res);
            this.filteredAndSorted = this.data;
            return this.data;
        })));
    }
    /**
     * Extracts array of data from server response
     * @param res
     * @returns {any}
     */
    extractDataFromResponse(res) {
        const rawData = res.body;
        const data = !!this.conf.dataKey ? getDeepFromObject(rawData, this.conf.dataKey, []) : rawData;
        if (data instanceof Array) {
            return data;
        }
        throw new Error(`Data must be an array.
    Please check that data extracted from the server response by the key '${this.conf.dataKey}' exists and is array.`);
    }
    /**
     * Extracts total rows count from the server response
     * Looks for the count in the heders first, then in the response body
     * @param res
     * @returns {any}
     */
    extractTotalFromResponse(res) {
        if (res.headers.has(this.conf.totalKey)) {
            return +res.headers.get(this.conf.totalKey);
        }
        else {
            const rawData = res.body;
            return getDeepFromObject(rawData, this.conf.totalKey, 0);
        }
    }
    requestElements(filtered, sorted, paginated) {
        let httpParams = new HttpParams();
        if (filtered)
            httpParams = this.addFilterRequestParams(httpParams);
        if (sorted)
            httpParams = this.addSortRequestParams(httpParams);
        if (paginated)
            httpParams = this.addPagerRequestParams(httpParams);
        return this.http.get(this.conf.endPoint, { params: httpParams, observe: 'response' });
    }
    addSortRequestParams(httpParams) {
        if (this.sortConf) {
            let fields = [];
            let directions = [];
            this.sortConf.forEach((fieldConf) => {
                if (fieldConf.direction !== null) {
                    fields.push(fieldConf.field);
                    directions.push(fieldConf.direction.toUpperCase());
                }
            });
            httpParams = httpParams.set(this.conf.sortFieldKey, fields.join(','));
            httpParams = httpParams.set(this.conf.sortDirKey, directions.join(','));
        }
        return httpParams;
    }
    addFilterRequestParams(httpParams) {
        if (this.filterConf.filters) {
            this.filterConf.filters.forEach((fieldConf) => {
                if (fieldConf['search']) {
                    httpParams = httpParams.set(this.conf.filterFieldKey.replace('#field#', fieldConf['field']), fieldConf['search']);
                }
            });
        }
        return httpParams;
    }
    addPagerRequestParams(httpParams) {
        httpParams = httpParams.set(this.conf.pagerPageKey, this.pagingConf.page);
        httpParams = httpParams.set(this.conf.pagerLimitKey, this.pagingConf.perPage);
        return httpParams;
    }
}

/*
 * Public API Surface of angular2-smart-table
 */

/**
 * Generated bundle index. Do not edit.
 */

export { Angular2SmartTableComponent, Angular2SmartTableModule, Cell, DataSet, DataSource, DefaultEditor, DefaultFilter, IColumnType, LocalDataSource, Row, SelectModeOptions, ServerDataSource };
//# sourceMappingURL=angular2-smart-table.mjs.map
