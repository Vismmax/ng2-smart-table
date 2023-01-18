import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Grid } from './lib/grid';
import { DataSource } from './lib/data-source/data-source';
import { deepExtend, getPageForRowIndex } from './lib/helpers';
import { LocalDataSource } from './lib/data-source/local/local.data-source';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./components/pager/pager.component";
import * as i3 from "./components/tbody/tbody.component";
import * as i4 from "./components/thead/thead.component";
export class Ng2SmartTableComponent {
    constructor() {
        this.settings = {};
        this.rowSelect = new EventEmitter();
        this.rowDeselect = new EventEmitter();
        this.userRowSelect = new EventEmitter();
        this.delete = new EventEmitter();
        this.edit = new EventEmitter();
        this.create = new EventEmitter();
        this.custom = new EventEmitter();
        this.deleteConfirm = new EventEmitter();
        this.editConfirm = new EventEmitter();
        this.createConfirm = new EventEmitter();
        this.rowHover = new EventEmitter();
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
        this.perPageSelect = this.grid.getSetting('pager.perPageSelect');
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
            this.deselectAllRows();
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
            this.onSelectRow(row);
        }
        else {
            // we need to deselect all rows if we got an incorrect index
            this.deselectAllRows();
        }
    }
    deselectAllRows() {
        this.grid.dataSet.deselectAll();
        this.emitDeselectRow(null);
    }
    editRowSelect(row) {
        if (this.grid.getSetting('selectMode') === 'multi') {
            this.onMultipleSelectRow(row);
        }
        else {
            this.onSelectRow(row);
        }
    }
    onUserSelectRow(row) {
        if (this.grid.getSetting('selectMode') !== 'multi') {
            this.grid.selectRow(row);
            this.emitUserSelectRow(row);
            this.emitSelectRow(row);
        }
    }
    onRowHover(row) {
        this.rowHover.emit(row);
    }
    multipleSelectRow(row) {
        this.grid.multipleSelectRow(row);
        this.emitUserSelectRow(row);
        this.emitSelectRow(row);
    }
    onSelectAllRows($event) {
        this.isAllSelected = !this.isAllSelected;
        this.grid.selectAllRows(this.isAllSelected);
        this.emitUserSelectRow(null);
        this.emitSelectRow(null);
    }
    onSelectRow(row) {
        this.grid.selectRow(row);
        this.emitSelectRow(row);
    }
    onMultipleSelectRow(row) {
        this.emitSelectRow(row);
    }
    initGrid() {
        this.source = this.prepareSource();
        this.grid = new Grid(this.source, this.prepareSettings());
        this.subscribeToOnSelectRow();
        this.subscribeToOnDeselectRow();
    }
    prepareSource() {
        if (this.source instanceof DataSource) {
            return this.source;
        }
        else if (this.source instanceof Array) {
            return new LocalDataSource(this.source);
        }
        return new LocalDataSource();
    }
    prepareSettings() {
        return deepExtend({}, this.defaultSettings, this.settings);
    }
    changePage($event) {
        this.resetAllSelector();
    }
    sort($event) {
        this.resetAllSelector();
    }
    filter($event) {
        this.resetAllSelector();
    }
    resetAllSelector() {
        this.isAllSelected = false;
    }
    emitUserSelectRow(row) {
        const selectedRows = this.grid.getSelectedRows();
        this.userRowSelect.emit({
            data: row ? row.getData() : null,
            isSelected: row ? row.getIsSelected() : null,
            source: this.source,
            selected: selectedRows && selectedRows.length ? selectedRows.map((r) => r.getData()) : [],
        });
    }
    emitSelectRow(row) {
        const data = {
            data: row ? row.getData() : null,
            isSelected: row ? row.getIsSelected() : null,
            source: this.source,
        };
        this.rowSelect.emit(data);
        if (!row?.isSelected) {
            this.rowDeselect.emit(data);
        }
    }
    emitDeselectRow(row) {
        this.rowDeselect.emit({
            data: row ? row.getData() : null,
            isSelected: row ? row.getIsSelected() : null,
            source: this.source,
        });
    }
    isIndexOutOfRange(index) {
        const dataAmount = this.source?.count();
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
    subscribeToOnDeselectRow() {
        if (this.onDeselectRowSubscription) {
            this.onDeselectRowSubscription.unsubscribe();
        }
        this.onDeselectRowSubscription = this.grid.onDeselectRow()
            .pipe(takeUntil(this.destroyed$))
            .subscribe((row) => {
            this.emitDeselectRow(row);
        });
    }
}
Ng2SmartTableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: Ng2SmartTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
Ng2SmartTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: Ng2SmartTableComponent, selector: "ng2-smart-table", inputs: { source: "source", settings: "settings" }, outputs: { rowSelect: "rowSelect", rowDeselect: "rowDeselect", userRowSelect: "userRowSelect", delete: "delete", edit: "edit", create: "create", custom: "custom", deleteConfirm: "deleteConfirm", editConfirm: "editConfirm", createConfirm: "createConfirm", rowHover: "rowHover" }, usesOnChanges: true, ngImport: i0, template: "<table [id]=\"tableId\" [ngClass]=\"tableClass\">\n\n  <thead ng2-st-thead *ngIf=\"!isHideHeader || !isHideSubHeader\"\n                      [grid]=\"grid\"\n                      [isAllSelected]=\"isAllSelected\"\n                      [source]=\"source\"\n                      [createConfirm]=\"createConfirm\"\n                      (create)=\"create.emit($event)\"\n                      (selectAllRows)=\"onSelectAllRows($event)\"\n                      (sort)=\"sort($event)\"\n                      (filter)=\"filter($event)\">\n  </thead>\n\n  <tbody ng2-st-tbody [grid]=\"grid\"\n                      [source]=\"source\"\n                      [deleteConfirm]=\"deleteConfirm\"\n                      [editConfirm]=\"editConfirm\"\n                      [rowClassFunction]=\"rowClassFunction\"\n                      (edit)=\"edit.emit($event)\"\n                      (delete)=\"delete.emit($event)\"\n                      (custom)=\"custom.emit($event)\"\n                      (userSelectRow)=\"onUserSelectRow($event)\"\n                      (editRowSelect)=\"editRowSelect($event)\"\n                      (multipleSelectRow)=\"multipleSelectRow($event)\"\n                      (rowHover)=\"onRowHover($event)\">\n  </tbody>\n\n</table>\n\n<ng2-smart-table-pager *ngIf=\"isPagerDisplay\"\n                        [source]=\"source\"\n                        [perPageSelect]=\"perPageSelect\"\n                        (changePage)=\"changePage($event)\">\n</ng2-smart-table-pager>\n", styles: [":host{font-size:1rem}:host ::ng-deep *{box-sizing:border-box}:host ::ng-deep button,:host ::ng-deep input,:host ::ng-deep optgroup,:host ::ng-deep select,:host ::ng-deep textarea{color:inherit;font:inherit;margin:0}:host ::ng-deep table{line-height:1.5em;border-collapse:collapse;border-spacing:0;display:table;width:100%;max-width:100%;overflow:auto;word-break:normal;word-break:keep-all}:host ::ng-deep table tr th{font-weight:700}:host ::ng-deep table tr section{font-size:.75em;font-weight:700}:host ::ng-deep table tr td,:host ::ng-deep table tr th{font-size:.875em;margin:0;padding:.5em 1em}:host ::ng-deep a{color:#1e6bb8;text-decoration:none}:host ::ng-deep a:hover{text-decoration:underline}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.PagerComponent, selector: "ng2-smart-table-pager", inputs: ["source", "perPageSelect"], outputs: ["changePage"] }, { kind: "component", type: i3.Ng2SmartTableTbodyComponent, selector: "[ng2-st-tbody]", inputs: ["grid", "source", "deleteConfirm", "editConfirm", "rowClassFunction"], outputs: ["save", "cancel", "edit", "delete", "custom", "edited", "userSelectRow", "editRowSelect", "multipleSelectRow", "rowHover"] }, { kind: "component", type: i4.Ng2SmartTableTheadComponent, selector: "[ng2-st-thead]", inputs: ["grid", "source", "isAllSelected", "createConfirm"], outputs: ["sort", "selectAllRows", "create", "filter"] }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: Ng2SmartTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ng2-smart-table', template: "<table [id]=\"tableId\" [ngClass]=\"tableClass\">\n\n  <thead ng2-st-thead *ngIf=\"!isHideHeader || !isHideSubHeader\"\n                      [grid]=\"grid\"\n                      [isAllSelected]=\"isAllSelected\"\n                      [source]=\"source\"\n                      [createConfirm]=\"createConfirm\"\n                      (create)=\"create.emit($event)\"\n                      (selectAllRows)=\"onSelectAllRows($event)\"\n                      (sort)=\"sort($event)\"\n                      (filter)=\"filter($event)\">\n  </thead>\n\n  <tbody ng2-st-tbody [grid]=\"grid\"\n                      [source]=\"source\"\n                      [deleteConfirm]=\"deleteConfirm\"\n                      [editConfirm]=\"editConfirm\"\n                      [rowClassFunction]=\"rowClassFunction\"\n                      (edit)=\"edit.emit($event)\"\n                      (delete)=\"delete.emit($event)\"\n                      (custom)=\"custom.emit($event)\"\n                      (userSelectRow)=\"onUserSelectRow($event)\"\n                      (editRowSelect)=\"editRowSelect($event)\"\n                      (multipleSelectRow)=\"multipleSelectRow($event)\"\n                      (rowHover)=\"onRowHover($event)\">\n  </tbody>\n\n</table>\n\n<ng2-smart-table-pager *ngIf=\"isPagerDisplay\"\n                        [source]=\"source\"\n                        [perPageSelect]=\"perPageSelect\"\n                        (changePage)=\"changePage($event)\">\n</ng2-smart-table-pager>\n", styles: [":host{font-size:1rem}:host ::ng-deep *{box-sizing:border-box}:host ::ng-deep button,:host ::ng-deep input,:host ::ng-deep optgroup,:host ::ng-deep select,:host ::ng-deep textarea{color:inherit;font:inherit;margin:0}:host ::ng-deep table{line-height:1.5em;border-collapse:collapse;border-spacing:0;display:table;width:100%;max-width:100%;overflow:auto;word-break:normal;word-break:keep-all}:host ::ng-deep table tr th{font-weight:700}:host ::ng-deep table tr section{font-size:.75em;font-weight:700}:host ::ng-deep table tr td,:host ::ng-deep table tr th{font-size:.875em;margin:0;padding:.5em 1em}:host ::ng-deep a{color:#1e6bb8;text-decoration:none}:host ::ng-deep a:hover{text-decoration:underline}\n"] }]
        }], propDecorators: { source: [{
                type: Input
            }], settings: [{
                type: Input
            }], rowSelect: [{
                type: Output
            }], rowDeselect: [{
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
            }], createConfirm: [{
                type: Output
            }], rowHover: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLXNtYXJ0LXRhYmxlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25nMi1zbWFydC10YWJsZS9zcmMvbGliL25nMi1zbWFydC10YWJsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItc21hcnQtdGFibGUvc3JjL2xpYi9uZzItc21hcnQtdGFibGUuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFnQixZQUFZLEVBQXdCLE1BQU0sZUFBZSxDQUFDO0FBQzNHLE9BQU8sRUFBRSxPQUFPLEVBQWdCLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ2xDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUUzRCxPQUFPLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQ0FBMkMsQ0FBQzs7Ozs7O0FBTzVFLE1BQU0sT0FBTyxzQkFBc0I7SUFMbkM7UUFRVyxhQUFRLEdBQVcsRUFBRSxDQUFDO1FBRXJCLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3BDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN0QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDL0IsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDakMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQ3hDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUN0QyxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7UUFDeEMsYUFBUSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBV2hFLG9CQUFlLEdBQVc7WUFDeEIsSUFBSSxFQUFFLFFBQVE7WUFDZCxVQUFVLEVBQUUsUUFBUTtZQUNwQjs7OztlQUlHO1lBQ0gsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQiwyQkFBMkIsRUFBRSxLQUFLO1lBQ2xDLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLE9BQU8sRUFBRTtnQkFDUCxXQUFXLEVBQUUsU0FBUztnQkFDdEIsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsTUFBTSxFQUFFLElBQUk7Z0JBQ1osTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsUUFBUSxFQUFFLE1BQU0sRUFBRSxhQUFhO2FBQ2hDO1lBQ0QsTUFBTSxFQUFFO2dCQUNOLFVBQVUsRUFBRSxFQUFFO2FBQ2Y7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsaUJBQWlCLEVBQUUsTUFBTTtnQkFDekIsaUJBQWlCLEVBQUUsUUFBUTtnQkFDM0IsbUJBQW1CLEVBQUUsUUFBUTtnQkFDN0IsV0FBVyxFQUFFLEtBQUs7YUFDbkI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0gsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsZ0JBQWdCLEVBQUUsU0FBUztnQkFDM0IsbUJBQW1CLEVBQUUsUUFBUTtnQkFDN0IsbUJBQW1CLEVBQUUsUUFBUTtnQkFDN0IsYUFBYSxFQUFFLEtBQUs7YUFDckI7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sbUJBQW1CLEVBQUUsUUFBUTtnQkFDN0IsYUFBYSxFQUFFLEtBQUs7YUFDckI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osRUFBRSxFQUFFLEVBQUU7Z0JBQ04sS0FBSyxFQUFFLEVBQUU7YUFDVjtZQUNELGFBQWEsRUFBRSxlQUFlO1lBQzlCLE9BQU8sRUFBRSxFQUFFO1lBQ1gsS0FBSyxFQUFFO2dCQUNMLE9BQU8sRUFBRSxJQUFJO2dCQUNiLElBQUksRUFBRSxDQUFDO2dCQUNQLE9BQU8sRUFBRSxFQUFFO2FBQ1o7WUFDRCxnQkFBZ0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO1NBQzNCLENBQUM7UUFFRixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUl2QixlQUFVLEdBQWtCLElBQUksT0FBTyxFQUFRLENBQUM7S0E4TXpEO0lBNU1DLFdBQVcsQ0FBQyxPQUFpRDtRQUMzRCxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7YUFDL0M7WUFDRCxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNsQztTQUNGO2FBQU07WUFDTCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7U0FDakI7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxTQUFTLENBQUMsS0FBYSxFQUFFLDhCQUF1QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQztRQUNqSCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM1QyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQyw0REFBNEQ7WUFDNUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLE9BQU87U0FDUjtRQUVELElBQUksMkJBQTJCLEVBQUU7WUFDL0IsTUFBTSxNQUFNLEdBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN2QyxNQUFNLE1BQU0sR0FBc0MsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3JFLE1BQU0sSUFBSSxHQUFXLGtCQUFrQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDL0QsS0FBSyxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO1lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztZQUU1QyxJQUFJLElBQUksS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFO2dCQUN4QixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNyQixPQUFPO2FBQ1I7U0FFRjtRQUVELE1BQU0sR0FBRyxHQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsSUFBSSxHQUFHLEVBQUU7WUFDUCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO2FBQU07WUFDTCw0REFBNEQ7WUFDNUQsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztJQUVPLGVBQWU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsYUFBYSxDQUFDLEdBQVE7UUFDcEIsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxPQUFPLEVBQUU7WUFDbEQsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO0lBQ0gsQ0FBQztJQUVELGVBQWUsQ0FBQyxHQUFRO1FBQ3RCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEtBQUssT0FBTyxFQUFFO1lBQ2xELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQUVELFVBQVUsQ0FBQyxHQUFRO1FBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxHQUFRO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELGVBQWUsQ0FBQyxNQUFXO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQVE7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDO0lBRUQsbUJBQW1CLENBQUMsR0FBUTtRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBRTFELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxJQUFJLENBQUMsTUFBTSxZQUFZLFVBQVUsRUFBRTtZQUNyQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDcEI7YUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLFlBQVksS0FBSyxFQUFFO1lBQ3ZDLE9BQU8sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsT0FBTyxJQUFJLGVBQWUsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxVQUFVLENBQUMsTUFBVztRQUNwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsSUFBSSxDQUFDLE1BQVc7UUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQVc7UUFDaEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUM3QixDQUFDO0lBRU8saUJBQWlCLENBQUMsR0FBUTtRQUNoQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRWpELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO1lBQ3RCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNoQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1lBQ25CLFFBQVEsRUFBRSxZQUFZLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDL0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLGFBQWEsQ0FBQyxHQUFRO1FBQzVCLE1BQU0sSUFBSSxHQUFHO1lBQ1gsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ2hDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUM1QyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07U0FDcEIsQ0FBQztRQUNGLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVPLGVBQWUsQ0FBQyxHQUFRO1FBQzlCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3BCLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNoQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUk7WUFDNUMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxLQUFhO1FBQ3JDLE1BQU0sVUFBVSxHQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7UUFDaEQsT0FBTyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxVQUFVLEtBQUssUUFBUSxJQUFJLEtBQUssSUFBSSxVQUFVLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRU8sc0JBQXNCO1FBQzVCLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUM1QztRQUNELElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTthQUNuRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNqQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLHdCQUF3QjtRQUM5QixJQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRTtZQUNsQyxJQUFJLENBQUMseUJBQXlCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDOUM7UUFDRCxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7YUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEMsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDakIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7O29IQWpTVSxzQkFBc0I7d0dBQXRCLHNCQUFzQix1WkNmbkMsKzlDQWtDQTs0RkRuQmEsc0JBQXNCO2tCQUxsQyxTQUFTOytCQUNFLGlCQUFpQjs4QkFNbEIsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUksU0FBUztzQkFBbEIsTUFBTTtnQkFDRyxXQUFXO3NCQUFwQixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLElBQUk7c0JBQWIsTUFBTTtnQkFDRyxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLGFBQWE7c0JBQXRCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLFFBQVE7c0JBQWpCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIFNpbXBsZUNoYW5nZSwgRXZlbnRFbWl0dGVyLCBPbkNoYW5nZXMsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEdyaWQgfSBmcm9tICcuL2xpYi9ncmlkJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuL2xpYi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBSb3cgfSBmcm9tICcuL2xpYi9kYXRhLXNldC9yb3cnO1xuaW1wb3J0IHsgZGVlcEV4dGVuZCwgZ2V0UGFnZUZvclJvd0luZGV4IH0gZnJvbSAnLi9saWIvaGVscGVycyc7XG5pbXBvcnQgeyBMb2NhbERhdGFTb3VyY2UgfSBmcm9tICcuL2xpYi9kYXRhLXNvdXJjZS9sb2NhbC9sb2NhbC5kYXRhLXNvdXJjZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nMi1zbWFydC10YWJsZScsXG4gIHN0eWxlVXJsczogWycuL25nMi1zbWFydC10YWJsZS5jb21wb25lbnQuc2NzcyddLFxuICB0ZW1wbGF0ZVVybDogJy4vbmcyLXNtYXJ0LXRhYmxlLmNvbXBvbmVudC5odG1sJyxcbn0pXG5leHBvcnQgY2xhc3MgTmcyU21hcnRUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBzb3VyY2U6IGFueTtcbiAgQElucHV0KCkgc2V0dGluZ3M6IE9iamVjdCA9IHt9O1xuXG4gIEBPdXRwdXQoKSByb3dTZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIHJvd0Rlc2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSB1c2VyUm93U2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBkZWxldGUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGVkaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgpIGNyZWF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgY3VzdG9tID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBkZWxldGVDb25maXJtID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoKSBlZGl0Q29uZmlybSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgY3JlYXRlQ29uZmlybSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgcm93SG92ZXI6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgdGFibGVDbGFzczogc3RyaW5nO1xuICB0YWJsZUlkOiBzdHJpbmc7XG4gIHBlclBhZ2VTZWxlY3Q6IGFueTtcbiAgaXNIaWRlSGVhZGVyOiBib29sZWFuO1xuICBpc0hpZGVTdWJIZWFkZXI6IGJvb2xlYW47XG4gIGlzUGFnZXJEaXNwbGF5OiBib29sZWFuO1xuICByb3dDbGFzc0Z1bmN0aW9uOiBGdW5jdGlvbjtcblxuICBncmlkOiBHcmlkO1xuICBkZWZhdWx0U2V0dGluZ3M6IE9iamVjdCA9IHtcbiAgICBtb2RlOiAnaW5saW5lJywgLy8gaW5saW5lfGV4dGVybmFsfGNsaWNrLXRvLWVkaXRcbiAgICBzZWxlY3RNb2RlOiAnc2luZ2xlJywgLy8gc2luZ2xlfG11bHRpXG4gICAgLyoqXG4gICAgICogUG9pbnRzIHRvIGFuIGVsZW1lbnQgaW4gYWxsIGRhdGFcbiAgICAgKlxuICAgICAqIHdoZW4gPCAwIGFsbCBsaW5lcyBtdXN0IGJlIGRlc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBzZWxlY3RlZFJvd0luZGV4OiAwLFxuICAgIHN3aXRjaFBhZ2VUb1NlbGVjdGVkUm93UGFnZTogZmFsc2UsXG4gICAgaGlkZUhlYWRlcjogZmFsc2UsXG4gICAgaGlkZVN1YkhlYWRlcjogZmFsc2UsXG4gICAgYWN0aW9uczoge1xuICAgICAgY29sdW1uVGl0bGU6ICdBY3Rpb25zJyxcbiAgICAgIGFkZDogdHJ1ZSxcbiAgICAgIGVkaXQ6IHRydWUsXG4gICAgICBkZWxldGU6IHRydWUsXG4gICAgICBjdXN0b206IFtdLFxuICAgICAgcG9zaXRpb246ICdsZWZ0JywgLy8gbGVmdHxyaWdodFxuICAgIH0sXG4gICAgZmlsdGVyOiB7XG4gICAgICBpbnB1dENsYXNzOiAnJyxcbiAgICB9LFxuICAgIGVkaXQ6IHtcbiAgICAgIGlucHV0Q2xhc3M6ICcnLFxuICAgICAgZWRpdEJ1dHRvbkNvbnRlbnQ6ICdFZGl0JyxcbiAgICAgIHNhdmVCdXR0b25Db250ZW50OiAnVXBkYXRlJyxcbiAgICAgIGNhbmNlbEJ1dHRvbkNvbnRlbnQ6ICdDYW5jZWwnLFxuICAgICAgY29uZmlybVNhdmU6IGZhbHNlLFxuICAgIH0sXG4gICAgYWRkOiB7XG4gICAgICBpbnB1dENsYXNzOiAnJyxcbiAgICAgIGFkZEJ1dHRvbkNvbnRlbnQ6ICdBZGQgTmV3JyxcbiAgICAgIGNyZWF0ZUJ1dHRvbkNvbnRlbnQ6ICdDcmVhdGUnLFxuICAgICAgY2FuY2VsQnV0dG9uQ29udGVudDogJ0NhbmNlbCcsXG4gICAgICBjb25maXJtQ3JlYXRlOiBmYWxzZSxcbiAgICB9LFxuICAgIGRlbGV0ZToge1xuICAgICAgZGVsZXRlQnV0dG9uQ29udGVudDogJ0RlbGV0ZScsXG4gICAgICBjb25maXJtRGVsZXRlOiBmYWxzZSxcbiAgICB9LFxuICAgIGF0dHI6IHtcbiAgICAgIGlkOiAnJyxcbiAgICAgIGNsYXNzOiAnJyxcbiAgICB9LFxuICAgIG5vRGF0YU1lc3NhZ2U6ICdObyBkYXRhIGZvdW5kJyxcbiAgICBjb2x1bW5zOiB7fSxcbiAgICBwYWdlcjoge1xuICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgIHBhZ2U6IDEsXG4gICAgICBwZXJQYWdlOiAxMCxcbiAgICB9LFxuICAgIHJvd0NsYXNzRnVuY3Rpb246ICgpID0+ICcnLFxuICB9O1xuXG4gIGlzQWxsU2VsZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIG9uU2VsZWN0Um93U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgb25EZXNlbGVjdFJvd1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIGRlc3Ryb3llZCQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IHsgW3Byb3BlcnR5TmFtZTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlIH0pIHtcbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICBpZiAoY2hhbmdlc1snc2V0dGluZ3MnXSkge1xuICAgICAgICB0aGlzLmdyaWQuc2V0U2V0dGluZ3ModGhpcy5wcmVwYXJlU2V0dGluZ3MoKSk7XG4gICAgICB9XG4gICAgICBpZiAoY2hhbmdlc1snc291cmNlJ10pIHtcbiAgICAgICAgdGhpcy5zb3VyY2UgPSB0aGlzLnByZXBhcmVTb3VyY2UoKTtcbiAgICAgICAgdGhpcy5ncmlkLnNldFNvdXJjZSh0aGlzLnNvdXJjZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaW5pdEdyaWQoKTtcbiAgICB9XG4gICAgdGhpcy50YWJsZUlkID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ2F0dHIuaWQnKTtcbiAgICB0aGlzLnRhYmxlQ2xhc3MgPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygnYXR0ci5jbGFzcycpO1xuICAgIHRoaXMuaXNIaWRlSGVhZGVyID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ2hpZGVIZWFkZXInKTtcbiAgICB0aGlzLmlzSGlkZVN1YkhlYWRlciA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdoaWRlU3ViSGVhZGVyJyk7XG4gICAgdGhpcy5pc1BhZ2VyRGlzcGxheSA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdwYWdlci5kaXNwbGF5Jyk7XG4gICAgdGhpcy5pc1BhZ2VyRGlzcGxheSA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdwYWdlci5kaXNwbGF5Jyk7XG4gICAgdGhpcy5wZXJQYWdlU2VsZWN0ID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ3BhZ2VyLnBlclBhZ2VTZWxlY3QnKTtcbiAgICB0aGlzLnJvd0NsYXNzRnVuY3Rpb24gPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygncm93Q2xhc3NGdW5jdGlvbicpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95ZWQkLm5leHQoKTtcbiAgfVxuXG4gIHNlbGVjdFJvdyhpbmRleDogbnVtYmVyLCBzd2l0Y2hQYWdlVG9TZWxlY3RlZFJvd1BhZ2U6IGJvb2xlYW4gPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygnc3dpdGNoUGFnZVRvU2VsZWN0ZWRSb3dQYWdlJykpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuZ3JpZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmdyaWQuc2V0dGluZ3Muc2VsZWN0ZWRSb3dJbmRleCA9IGluZGV4O1xuICAgIGlmICh0aGlzLmlzSW5kZXhPdXRPZlJhbmdlKGluZGV4KSkge1xuICAgICAgLy8gd2UgbmVlZCB0byBkZXNlbGVjdCBhbGwgcm93cyBpZiB3ZSBnb3QgYW4gaW5jb3JyZWN0IGluZGV4XG4gICAgICB0aGlzLmRlc2VsZWN0QWxsUm93cygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChzd2l0Y2hQYWdlVG9TZWxlY3RlZFJvd1BhZ2UpIHtcbiAgICAgIGNvbnN0IHNvdXJjZTogRGF0YVNvdXJjZSA9IHRoaXMuc291cmNlO1xuICAgICAgY29uc3QgcGFnaW5nOiB7IHBhZ2U6IG51bWJlciwgcGVyUGFnZTogbnVtYmVyIH0gPSBzb3VyY2UuZ2V0UGFnaW5nKCk7XG4gICAgICBjb25zdCBwYWdlOiBudW1iZXIgPSBnZXRQYWdlRm9yUm93SW5kZXgoaW5kZXgsIHBhZ2luZy5wZXJQYWdlKTtcbiAgICAgIGluZGV4ID0gaW5kZXggJSBwYWdpbmcucGVyUGFnZTtcbiAgICAgIHRoaXMuZ3JpZC5zZXR0aW5ncy5zZWxlY3RlZFJvd0luZGV4ID0gaW5kZXg7XG5cbiAgICAgIGlmIChwYWdlICE9PSBwYWdpbmcucGFnZSkge1xuICAgICAgICBzb3VyY2Uuc2V0UGFnZShwYWdlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgfVxuXG4gICAgY29uc3Qgcm93OiBSb3cgPSB0aGlzLmdyaWQuZ2V0Um93cygpW2luZGV4XTtcbiAgICBpZiAocm93KSB7XG4gICAgICB0aGlzLm9uU2VsZWN0Um93KHJvdyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHdlIG5lZWQgdG8gZGVzZWxlY3QgYWxsIHJvd3MgaWYgd2UgZ290IGFuIGluY29ycmVjdCBpbmRleFxuICAgICAgdGhpcy5kZXNlbGVjdEFsbFJvd3MoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGRlc2VsZWN0QWxsUm93cygpOiB2b2lkIHtcbiAgICB0aGlzLmdyaWQuZGF0YVNldC5kZXNlbGVjdEFsbCgpO1xuICAgIHRoaXMuZW1pdERlc2VsZWN0Um93KG51bGwpO1xuICB9XG5cbiAgZWRpdFJvd1NlbGVjdChyb3c6IFJvdykge1xuICAgIGlmICh0aGlzLmdyaWQuZ2V0U2V0dGluZygnc2VsZWN0TW9kZScpID09PSAnbXVsdGknKSB7XG4gICAgICB0aGlzLm9uTXVsdGlwbGVTZWxlY3RSb3cocm93KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vblNlbGVjdFJvdyhyb3cpO1xuICAgIH1cbiAgfVxuXG4gIG9uVXNlclNlbGVjdFJvdyhyb3c6IFJvdykge1xuICAgIGlmICh0aGlzLmdyaWQuZ2V0U2V0dGluZygnc2VsZWN0TW9kZScpICE9PSAnbXVsdGknKSB7XG4gICAgICB0aGlzLmdyaWQuc2VsZWN0Um93KHJvdyk7XG4gICAgICB0aGlzLmVtaXRVc2VyU2VsZWN0Um93KHJvdyk7XG4gICAgICB0aGlzLmVtaXRTZWxlY3RSb3cocm93KTtcbiAgICB9XG4gIH1cblxuICBvblJvd0hvdmVyKHJvdzogUm93KSB7XG4gICAgdGhpcy5yb3dIb3Zlci5lbWl0KHJvdyk7XG4gIH1cblxuICBtdWx0aXBsZVNlbGVjdFJvdyhyb3c6IFJvdykge1xuICAgIHRoaXMuZ3JpZC5tdWx0aXBsZVNlbGVjdFJvdyhyb3cpO1xuICAgIHRoaXMuZW1pdFVzZXJTZWxlY3RSb3cocm93KTtcbiAgICB0aGlzLmVtaXRTZWxlY3RSb3cocm93KTtcbiAgfVxuXG4gIG9uU2VsZWN0QWxsUm93cygkZXZlbnQ6IGFueSkge1xuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCA9ICF0aGlzLmlzQWxsU2VsZWN0ZWQ7XG4gICAgdGhpcy5ncmlkLnNlbGVjdEFsbFJvd3ModGhpcy5pc0FsbFNlbGVjdGVkKTtcblxuICAgIHRoaXMuZW1pdFVzZXJTZWxlY3RSb3cobnVsbCk7XG4gICAgdGhpcy5lbWl0U2VsZWN0Um93KG51bGwpO1xuICB9XG5cbiAgb25TZWxlY3RSb3cocm93OiBSb3cpIHtcbiAgICB0aGlzLmdyaWQuc2VsZWN0Um93KHJvdyk7XG4gICAgdGhpcy5lbWl0U2VsZWN0Um93KHJvdyk7XG4gIH1cblxuICBvbk11bHRpcGxlU2VsZWN0Um93KHJvdzogUm93KSB7XG4gICAgdGhpcy5lbWl0U2VsZWN0Um93KHJvdyk7XG4gIH1cblxuICBpbml0R3JpZCgpIHtcbiAgICB0aGlzLnNvdXJjZSA9IHRoaXMucHJlcGFyZVNvdXJjZSgpO1xuICAgIHRoaXMuZ3JpZCA9IG5ldyBHcmlkKHRoaXMuc291cmNlLCB0aGlzLnByZXBhcmVTZXR0aW5ncygpKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlVG9PblNlbGVjdFJvdygpO1xuICAgIHRoaXMuc3Vic2NyaWJlVG9PbkRlc2VsZWN0Um93KCk7XG4gIH1cblxuICBwcmVwYXJlU291cmNlKCk6IERhdGFTb3VyY2Uge1xuICAgIGlmICh0aGlzLnNvdXJjZSBpbnN0YW5jZW9mIERhdGFTb3VyY2UpIHtcbiAgICAgIHJldHVybiB0aGlzLnNvdXJjZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuc291cmNlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHJldHVybiBuZXcgTG9jYWxEYXRhU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IExvY2FsRGF0YVNvdXJjZSgpO1xuICB9XG5cbiAgcHJlcGFyZVNldHRpbmdzKCk6IE9iamVjdCB7XG4gICAgcmV0dXJuIGRlZXBFeHRlbmQoe30sIHRoaXMuZGVmYXVsdFNldHRpbmdzLCB0aGlzLnNldHRpbmdzKTtcbiAgfVxuXG4gIGNoYW5nZVBhZ2UoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnJlc2V0QWxsU2VsZWN0b3IoKTtcbiAgfVxuXG4gIHNvcnQoJGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLnJlc2V0QWxsU2VsZWN0b3IoKTtcbiAgfVxuXG4gIGZpbHRlcigkZXZlbnQ6IGFueSkge1xuICAgIHRoaXMucmVzZXRBbGxTZWxlY3RvcigpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldEFsbFNlbGVjdG9yKCkge1xuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCA9IGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0VXNlclNlbGVjdFJvdyhyb3c6IFJvdykge1xuICAgIGNvbnN0IHNlbGVjdGVkUm93cyA9IHRoaXMuZ3JpZC5nZXRTZWxlY3RlZFJvd3MoKTtcblxuICAgIHRoaXMudXNlclJvd1NlbGVjdC5lbWl0KHtcbiAgICAgIGRhdGE6IHJvdyA/IHJvdy5nZXREYXRhKCkgOiBudWxsLFxuICAgICAgaXNTZWxlY3RlZDogcm93ID8gcm93LmdldElzU2VsZWN0ZWQoKSA6IG51bGwsXG4gICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgc2VsZWN0ZWQ6IHNlbGVjdGVkUm93cyAmJiBzZWxlY3RlZFJvd3MubGVuZ3RoID8gc2VsZWN0ZWRSb3dzLm1hcCgocjogUm93KSA9PiByLmdldERhdGEoKSkgOiBbXSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdFNlbGVjdFJvdyhyb3c6IFJvdykge1xuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICBkYXRhOiByb3cgPyByb3cuZ2V0RGF0YSgpIDogbnVsbCxcbiAgICAgIGlzU2VsZWN0ZWQ6IHJvdyA/IHJvdy5nZXRJc1NlbGVjdGVkKCkgOiBudWxsLFxuICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICB9O1xuICAgIHRoaXMucm93U2VsZWN0LmVtaXQoZGF0YSk7XG4gICAgaWYgKCFyb3c/LmlzU2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMucm93RGVzZWxlY3QuZW1pdChkYXRhKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGVtaXREZXNlbGVjdFJvdyhyb3c6IFJvdyk6IHZvaWQge1xuICAgIHRoaXMucm93RGVzZWxlY3QuZW1pdCh7XG4gICAgICBkYXRhOiByb3cgPyByb3cuZ2V0RGF0YSgpIDogbnVsbCxcbiAgICAgIGlzU2VsZWN0ZWQ6IHJvdyA/IHJvdy5nZXRJc1NlbGVjdGVkKCkgOiBudWxsLFxuICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNJbmRleE91dE9mUmFuZ2UoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRhdGFBbW91bnQ6IG51bWJlciA9IHRoaXMuc291cmNlPy5jb3VudCgpO1xuICAgIHJldHVybiBpbmRleCA8IDAgfHwgKHR5cGVvZiBkYXRhQW1vdW50ID09PSAnbnVtYmVyJyAmJiBpbmRleCA+PSBkYXRhQW1vdW50KTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9PblNlbGVjdFJvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vblNlbGVjdFJvd1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5vblNlbGVjdFJvd1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLm9uU2VsZWN0Um93U3Vic2NyaXB0aW9uID0gdGhpcy5ncmlkLm9uU2VsZWN0Um93KClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpKVxuICAgICAgLnN1YnNjcmliZSgocm93KSA9PiB7XG4gICAgICAgIHRoaXMuZW1pdFNlbGVjdFJvdyhyb3cpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN1YnNjcmliZVRvT25EZXNlbGVjdFJvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vbkRlc2VsZWN0Um93U3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLm9uRGVzZWxlY3RSb3dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgdGhpcy5vbkRlc2VsZWN0Um93U3Vic2NyaXB0aW9uID0gdGhpcy5ncmlkLm9uRGVzZWxlY3RSb3coKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveWVkJCkpXG4gICAgICAuc3Vic2NyaWJlKChyb3cpID0+IHtcbiAgICAgICAgdGhpcy5lbWl0RGVzZWxlY3RSb3cocm93KTtcbiAgICAgIH0pO1xuICB9XG5cbn1cbiIsIjx0YWJsZSBbaWRdPVwidGFibGVJZFwiIFtuZ0NsYXNzXT1cInRhYmxlQ2xhc3NcIj5cblxuICA8dGhlYWQgbmcyLXN0LXRoZWFkICpuZ0lmPVwiIWlzSGlkZUhlYWRlciB8fCAhaXNIaWRlU3ViSGVhZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICBbZ3JpZF09XCJncmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICBbaXNBbGxTZWxlY3RlZF09XCJpc0FsbFNlbGVjdGVkXCJcbiAgICAgICAgICAgICAgICAgICAgICBbc291cmNlXT1cInNvdXJjZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2NyZWF0ZUNvbmZpcm1dPVwiY3JlYXRlQ29uZmlybVwiXG4gICAgICAgICAgICAgICAgICAgICAgKGNyZWF0ZSk9XCJjcmVhdGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAoc2VsZWN0QWxsUm93cyk9XCJvblNlbGVjdEFsbFJvd3MoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgKHNvcnQpPVwic29ydCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAoZmlsdGVyKT1cImZpbHRlcigkZXZlbnQpXCI+XG4gIDwvdGhlYWQ+XG5cbiAgPHRib2R5IG5nMi1zdC10Ym9keSBbZ3JpZF09XCJncmlkXCJcbiAgICAgICAgICAgICAgICAgICAgICBbc291cmNlXT1cInNvdXJjZVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2RlbGV0ZUNvbmZpcm1dPVwiZGVsZXRlQ29uZmlybVwiXG4gICAgICAgICAgICAgICAgICAgICAgW2VkaXRDb25maXJtXT1cImVkaXRDb25maXJtXCJcbiAgICAgICAgICAgICAgICAgICAgICBbcm93Q2xhc3NGdW5jdGlvbl09XCJyb3dDbGFzc0Z1bmN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAoZWRpdCk9XCJlZGl0LmVtaXQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgKGRlbGV0ZSk9XCJkZWxldGUuZW1pdCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAoY3VzdG9tKT1cImN1c3RvbS5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgICh1c2VyU2VsZWN0Um93KT1cIm9uVXNlclNlbGVjdFJvdygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAoZWRpdFJvd1NlbGVjdCk9XCJlZGl0Um93U2VsZWN0KCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAgIChtdWx0aXBsZVNlbGVjdFJvdyk9XCJtdWx0aXBsZVNlbGVjdFJvdygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAocm93SG92ZXIpPVwib25Sb3dIb3ZlcigkZXZlbnQpXCI+XG4gIDwvdGJvZHk+XG5cbjwvdGFibGU+XG5cbjxuZzItc21hcnQtdGFibGUtcGFnZXIgKm5nSWY9XCJpc1BhZ2VyRGlzcGxheVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbc291cmNlXT1cInNvdXJjZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbcGVyUGFnZVNlbGVjdF09XCJwZXJQYWdlU2VsZWN0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjaGFuZ2VQYWdlKT1cImNoYW5nZVBhZ2UoJGV2ZW50KVwiPlxuPC9uZzItc21hcnQtdGFibGUtcGFnZXI+XG4iXX0=