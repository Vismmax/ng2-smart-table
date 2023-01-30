import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataSource } from './lib/data-source/data-source';
import { LocalDataSource } from './lib/data-source/local/local.data-source';
import { Grid } from './lib/grid';
import { deepExtend, getPageForRowIndex } from './lib/helpers';
import * as i0 from "@angular/core";
import * as i1 from "./components/tags/tags-list/tags-list.component";
import * as i2 from "./components/thead/thead.component";
import * as i3 from "./components/tbody/tbody.component";
import * as i4 from "./components/pager/pager.component";
import * as i5 from "@angular/common";
export class Angular2SmartTableComponent {
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
    async onSelectAllRows() {
        this.isAllSelected = !this.isAllSelected;
        await this.grid.selectAllRows(this.isAllSelected);
        this.emitUserSelectRow(null);
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
        return (this.grid?.getColumns() ?? []).filter((column) => column.hide);
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
}
Angular2SmartTableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: Angular2SmartTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
Angular2SmartTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.12", type: Angular2SmartTableComponent, selector: "angular2-smart-table", inputs: { source: "source", settings: "settings" }, outputs: { rowSelect: "rowSelect", userRowSelect: "userRowSelect", delete: "delete", edit: "edit", create: "create", custom: "custom", deleteConfirm: "deleteConfirm", editConfirm: "editConfirm", editCancel: "editCancel", createConfirm: "createConfirm", createCancel: "createCancel", rowHover: "rowHover", afterGridInit: "afterGridInit" }, usesOnChanges: true, ngImport: i0, template: "<angular2-smart-table-tags-list\n  [tags]=\"getNotVisibleColumns()\" (close)=\"onShowHeader($event)\"\n></angular2-smart-table-tags-list>\n\n<div style=\"overflow-x: auto; -webkit-overflow-scrolling: touch\">\n  <table [id]=\"tableId\" [ngClass]=\"tableClass\">\n    <thead\n      angular2-st-thead\n      *ngIf=\"!isHideHeader || !isHideSubHeader\"\n      [grid]=\"grid\"\n      [isAllSelected]=\"isAllSelected\"\n      [source]=\"source\"\n      [createConfirm]=\"createConfirm\"\n      [createCancel]=\"createCancel\"\n      (create)=\"create.emit($event)\"\n      (selectAllRows)=\"onSelectAllRows()\"\n      (hide)=\"onHideHeader($event)\"\n    ></thead>\n\n    <tbody\n      angular2-st-tbody\n      [grid]=\"grid\"\n      [source]=\"source\"\n      [deleteConfirm]=\"deleteConfirm\"\n      [editConfirm]=\"editConfirm\"\n      [editCancel]=\"editCancel\"\n      [rowClassFunction]=\"rowClassFunction\"\n      (edit)=\"edit.emit($event)\"\n      (delete)=\"delete.emit($event)\"\n      (custom)=\"custom.emit($event)\"\n      (userSelectRow)=\"onUserSelectRow($event)\"\n      (editRowSelect)=\"onEditRowSelect($event)\"\n      (multipleSelectRow)=\"onMultipleSelectRow($event)\"\n      (onExpandRow)=\"onExpandRow($event)\"\n      (rowHover)=\"onRowHover($event)\"\n    ></tbody>\n  </table>\n</div>\n<angular2-smart-table-pager\n  *ngIf=\"isPagerDisplay\"\n  [source]=\"source\"\n  [perPageSelect]=\"perPageSelect\"\n  [perPageSelectLabel]=\"perPageSelectLabel\"\n>\n</angular2-smart-table-pager>\n", styles: [":host{font-size:1rem}:host ::ng-deep *{box-sizing:border-box}:host ::ng-deep button,:host ::ng-deep input,:host ::ng-deep optgroup,:host ::ng-deep select,:host ::ng-deep textarea{color:inherit;font:inherit;margin:0}:host ::ng-deep table{line-height:1.5em;border-collapse:collapse;border-spacing:0;display:table;width:100%;max-width:100%;overflow:auto;word-break:normal;word-break:keep-all}:host ::ng-deep table tr th{font-weight:700;position:relative}:host ::ng-deep table tr th .angular2-resizer-block{width:8px;height:100%;position:absolute;right:0;top:0;cursor:col-resize}:host ::ng-deep table tr section{font-size:.75em;font-weight:700}:host ::ng-deep table tr td,:host ::ng-deep table tr th{font-size:.875em;margin:0;padding:.5em 1em}:host ::ng-deep a{color:#1e6bb8;text-decoration:none}:host ::ng-deep a:hover{text-decoration:underline}:host ::ng-deep .not-allowed{cursor:not-allowed}\n"], components: [{ type: i1.TagsListComponent, selector: "angular2-smart-table-tags-list", inputs: ["tags"], outputs: ["close"] }, { type: i2.NgxSmartTableTheadComponent, selector: "[angular2-st-thead]", inputs: ["grid", "source", "isAllSelected", "createConfirm", "createCancel"], outputs: ["hide", "selectAllRows", "create"] }, { type: i3.NgxSmartTableTbodyComponent, selector: "[angular2-st-tbody]", inputs: ["grid", "source", "deleteConfirm", "editConfirm", "editCancel", "rowClassFunction"], outputs: ["edit", "delete", "custom", "userSelectRow", "editRowSelect", "multipleSelectRow", "rowHover", "onExpandRow"] }, { type: i4.PagerComponent, selector: "angular2-smart-table-pager", inputs: ["source", "perPageSelect", "perPageSelectLabel"] }], directives: [{ type: i5.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i5.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }] });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhcjItc21hcnQtdGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9hbmd1bGFyMi1zbWFydC10YWJsZS5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBd0IsTUFBTSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3pHLE9BQU8sRUFBQyxPQUFPLEVBQWUsTUFBTSxNQUFNLENBQUM7QUFDM0MsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBR3pDLE9BQU8sRUFBQyxVQUFVLEVBQXdCLE1BQU0sK0JBQStCLENBQUM7QUFDaEYsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDaEMsT0FBTyxFQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7Ozs7OztBQW9CN0QsTUFBTSxPQUFPLDJCQUEyQjtJQUx4QztRQVFXLGFBQVEsR0FBYSxFQUFFLENBQUM7UUFFdkIsY0FBUyxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FBQ2xELGtCQUFhLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDdEQsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFlLENBQUM7UUFDekMsU0FBSSxHQUFHLElBQUksWUFBWSxFQUFhLENBQUM7UUFDckMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFlLENBQUM7UUFDekMsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFxQixDQUFDO1FB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dkIsTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRUksU0FBUztzQkFBbEIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxJQUFJO3NCQUFiLE1BQU07Z0JBQ0csTUFBTTtzQkFBZixNQUFNO2dCQUNHLE1BQU07c0JBQWYsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLFdBQVc7c0JBQXBCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLFlBQVk7c0JBQXJCLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPdXRwdXQsIFNpbXBsZUNoYW5nZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge3Rha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtEYXRhU2V0fSBmcm9tICcuL2xpYi9kYXRhLXNldC9kYXRhLXNldCc7XG5pbXBvcnQge1Jvd30gZnJvbSAnLi9saWIvZGF0YS1zZXQvcm93JztcbmltcG9ydCB7RGF0YVNvdXJjZSwgRGF0YVNvdXJjZUNoYW5nZUV2ZW50fSBmcm9tICcuL2xpYi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQge0xvY2FsRGF0YVNvdXJjZX0gZnJvbSAnLi9saWIvZGF0YS1zb3VyY2UvbG9jYWwvbG9jYWwuZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHtHcmlkfSBmcm9tICcuL2xpYi9ncmlkJztcbmltcG9ydCB7ZGVlcEV4dGVuZCwgZ2V0UGFnZUZvclJvd0luZGV4fSBmcm9tICcuL2xpYi9oZWxwZXJzJztcbmltcG9ydCB7SUNvbHVtbiwgU2V0dGluZ3N9IGZyb20gJy4vbGliL3NldHRpbmdzJztcbmltcG9ydCB7XG4gIENyZWF0ZUNhbmNlbEV2ZW50LFxuICBDcmVhdGVDb25maXJtRXZlbnQsXG4gIENyZWF0ZUV2ZW50LFxuICBDdXN0b21BY3Rpb25FdmVudCxcbiAgRGVsZXRlQ29uZmlybUV2ZW50LFxuICBEZWxldGVFdmVudCxcbiAgRWRpdENhbmNlbEV2ZW50LFxuICBFZGl0Q29uZmlybUV2ZW50LFxuICBFZGl0RXZlbnQsXG4gIFJvd1NlbGVjdGlvbkV2ZW50LFxufSBmcm9tICcuL2xpYi9ldmVudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhbmd1bGFyMi1zbWFydC10YWJsZScsXG4gIHN0eWxlVXJsczogWycuL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlLmNvbXBvbmVudC5zY3NzJ10sXG4gIHRlbXBsYXRlVXJsOiAnLi9hbmd1bGFyMi1zbWFydC10YWJsZS5jb21wb25lbnQuaHRtbCcsXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXIyU21hcnRUYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSBzb3VyY2U6IGFueTtcbiAgQElucHV0KCkgc2V0dGluZ3M6IFNldHRpbmdzID0ge307XG5cbiAgQE91dHB1dCgpIHJvd1NlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8Um93U2VsZWN0aW9uRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSB1c2VyUm93U2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxSb3dTZWxlY3Rpb25FdmVudD4oKTtcbiAgQE91dHB1dCgpIGRlbGV0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8RGVsZXRlRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBlZGl0ID0gbmV3IEV2ZW50RW1pdHRlcjxFZGl0RXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSBjcmVhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPENyZWF0ZUV2ZW50PigpO1xuICBAT3V0cHV0KCkgY3VzdG9tID0gbmV3IEV2ZW50RW1pdHRlcjxDdXN0b21BY3Rpb25FdmVudD4oKTtcbiAgQE91dHB1dCgpIGRlbGV0ZUNvbmZpcm0gPSBuZXcgRXZlbnRFbWl0dGVyPERlbGV0ZUNvbmZpcm1FdmVudD4oKTtcbiAgQE91dHB1dCgpIGVkaXRDb25maXJtID0gbmV3IEV2ZW50RW1pdHRlcjxFZGl0Q29uZmlybUV2ZW50PigpO1xuICBAT3V0cHV0KCkgZWRpdENhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8RWRpdENhbmNlbEV2ZW50PigpO1xuICBAT3V0cHV0KCkgY3JlYXRlQ29uZmlybSA9IG5ldyBFdmVudEVtaXR0ZXI8Q3JlYXRlQ29uZmlybUV2ZW50PigpO1xuICBAT3V0cHV0KCkgY3JlYXRlQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjxDcmVhdGVDYW5jZWxFdmVudD4oKTtcbiAgQE91dHB1dCgpIHJvd0hvdmVyOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCkgYWZ0ZXJHcmlkSW5pdDogRXZlbnRFbWl0dGVyPERhdGFTZXQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXRhU2V0PigpO1xuXG4gIGRhdGFDaGFuZ2VTdWJzY3JpcHRpb24/OiBTdWJzY3JpcHRpb247XG5cbiAgdGFibGVDbGFzcyE6IHN0cmluZztcbiAgdGFibGVJZCE6IHN0cmluZztcbiAgcGVyUGFnZVNlbGVjdDogbnVtYmVyW10gPSBbXTtcbiAgcGVyUGFnZVNlbGVjdExhYmVsOiBzdHJpbmcgPSAnUGVyIFBhZ2U6JztcbiAgaXNIaWRlSGVhZGVyITogYm9vbGVhbjtcbiAgaXNIaWRlU3ViSGVhZGVyITogYm9vbGVhbjtcbiAgaXNQYWdlckRpc3BsYXkhOiBib29sZWFuO1xuICByb3dDbGFzc0Z1bmN0aW9uITogRnVuY3Rpb247XG5cbiAgZ3JpZCE6IEdyaWQ7XG4gIGRlZmF1bHRTZXR0aW5nczogU2V0dGluZ3MgPSB7XG4gICAgbW9kZTogJ2lubGluZScsIC8vIGlubGluZXxleHRlcm5hbFxuICAgIHNlbGVjdE1vZGU6ICdzaW5nbGUnLCAvLyBzaW5nbGV8bXVsdGl8bXVsdGlfZmlsdGVyZWRcbiAgICAvKipcbiAgICAgKiBQb2ludHMgdG8gYW4gZWxlbWVudCBpbiBhbGwgZGF0YVxuICAgICAqXG4gICAgICogd2hlbiA8IDAgYWxsIGxpbmVzIG11c3QgYmUgZGVzZWxlY3RlZFxuICAgICAqL1xuICAgIHNlbGVjdGVkUm93SW5kZXg6IDAsXG4gICAgc3dpdGNoUGFnZVRvU2VsZWN0ZWRSb3dQYWdlOiBmYWxzZSxcbiAgICBoaWRlSGVhZGVyOiBmYWxzZSxcbiAgICBoaWRlU3ViSGVhZGVyOiBmYWxzZSxcbiAgICByZXNpemFibGU6IGZhbHNlLFxuICAgIGhpZGVhYmxlOiBmYWxzZSxcbiAgICBhY3Rpb25zOiB7XG4gICAgICBjb2x1bW5UaXRsZTogJ0FjdGlvbnMnLFxuICAgICAgYWRkOiB0cnVlLFxuICAgICAgZWRpdDogdHJ1ZSxcbiAgICAgIGRlbGV0ZTogdHJ1ZSxcbiAgICAgIGN1c3RvbTogW10sXG4gICAgICBwb3NpdGlvbjogJ2xlZnQnLCAvLyBsZWZ0fHJpZ2h0XG4gICAgfSxcbiAgICBmaWx0ZXI6IHtcbiAgICAgIGlucHV0Q2xhc3M6ICcnLFxuICAgIH0sXG4gICAgZWRpdDoge1xuICAgICAgaW5wdXRDbGFzczogJycsXG4gICAgICBlZGl0QnV0dG9uQ29udGVudDogJ0VkaXQnLFxuICAgICAgc2F2ZUJ1dHRvbkNvbnRlbnQ6ICdVcGRhdGUnLFxuICAgICAgY2FuY2VsQnV0dG9uQ29udGVudDogJ0NhbmNlbCcsXG4gICAgICBjb25maXJtU2F2ZTogZmFsc2UsXG4gICAgfSxcbiAgICBhZGQ6IHtcbiAgICAgIGlucHV0Q2xhc3M6ICcnLFxuICAgICAgYWRkQnV0dG9uQ29udGVudDogJ0FkZCBOZXcnLFxuICAgICAgY3JlYXRlQnV0dG9uQ29udGVudDogJ0NyZWF0ZScsXG4gICAgICBjYW5jZWxCdXR0b25Db250ZW50OiAnQ2FuY2VsJyxcbiAgICAgIGNvbmZpcm1DcmVhdGU6IGZhbHNlLFxuICAgIH0sXG4gICAgZGVsZXRlOiB7XG4gICAgICBkZWxldGVCdXR0b25Db250ZW50OiAnRGVsZXRlJyxcbiAgICAgIGNvbmZpcm1EZWxldGU6IGZhbHNlLFxuICAgIH0sXG4gICAgZXhwYW5kOiB7XG4gICAgICBidXR0b25Db250ZW50OiAnRXhwYW5kJ1xuICAgIH0sXG4gICAgYXR0cjoge1xuICAgICAgaWQ6ICcnLFxuICAgICAgY2xhc3M6ICcnLFxuICAgIH0sXG4gICAgbm9EYXRhTWVzc2FnZTogJ05vIGRhdGEgZm91bmQnLFxuICAgIGNvbHVtbnM6IHt9LFxuICAgIHBhZ2VyOiB7XG4gICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgcGFnZTogMSxcbiAgICAgIHBlclBhZ2U6IDEwLFxuICAgIH0sXG4gICAgcm93Q2xhc3NGdW5jdGlvbjogKCkgPT4gJycsXG4gIH07XG5cbiAgaXNBbGxTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgb25TZWxlY3RSb3dTdWJzY3JpcHRpb24hOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgb25EZXNlbGVjdFJvd1N1YnNjcmlwdGlvbiE6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBkZXN0cm95ZWQkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7IFtwcm9wZXJ0eU5hbWU6IHN0cmluZ106IFNpbXBsZUNoYW5nZSB9KSB7XG4gICAgaWYgKHRoaXMuZ3JpZCkge1xuICAgICAgaWYgKGNoYW5nZXNbJ3NldHRpbmdzJ10pIHtcbiAgICAgICAgdGhpcy5ncmlkLnNldFNldHRpbmdzKHRoaXMucHJlcGFyZVNldHRpbmdzKCkpO1xuICAgICAgfVxuICAgICAgaWYgKGNoYW5nZXNbJ3NvdXJjZSddKSB7XG4gICAgICAgIHRoaXMuc291cmNlID0gdGhpcy5wcmVwYXJlU291cmNlKCk7XG4gICAgICAgIHRoaXMuZ3JpZC5zZXRTb3VyY2UodGhpcy5zb3VyY2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluaXRHcmlkKCk7XG4gICAgfVxuICAgIHRoaXMudGFibGVJZCA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdhdHRyLmlkJyk7XG4gICAgdGhpcy50YWJsZUNsYXNzID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ2F0dHIuY2xhc3MnKTtcbiAgICB0aGlzLmlzSGlkZUhlYWRlciA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdoaWRlSGVhZGVyJyk7XG4gICAgdGhpcy5pc0hpZGVTdWJIZWFkZXIgPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygnaGlkZVN1YkhlYWRlcicpO1xuICAgIHRoaXMuaXNQYWdlckRpc3BsYXkgPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygncGFnZXIuZGlzcGxheScpO1xuICAgIHRoaXMuaXNQYWdlckRpc3BsYXkgPSB0aGlzLmdyaWQuZ2V0U2V0dGluZygncGFnZXIuZGlzcGxheScpO1xuICAgIHRoaXMucGVyUGFnZVNlbGVjdCA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdwYWdlci5wZXJQYWdlU2VsZWN0JywgdGhpcy5wZXJQYWdlU2VsZWN0KTtcbiAgICB0aGlzLnBlclBhZ2VTZWxlY3RMYWJlbCA9IHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdwYWdlci5wZXJQYWdlU2VsZWN0TGFiZWwnLCB0aGlzLnBlclBhZ2VTZWxlY3RMYWJlbCk7XG4gICAgdGhpcy5yb3dDbGFzc0Z1bmN0aW9uID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ3Jvd0NsYXNzRnVuY3Rpb24nKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveWVkJC5uZXh0KCk7XG4gIH1cblxuICBzZWxlY3RSb3coaW5kZXg6IG51bWJlciwgc3dpdGNoUGFnZVRvU2VsZWN0ZWRSb3dQYWdlOiBib29sZWFuID0gdGhpcy5ncmlkLmdldFNldHRpbmcoJ3N3aXRjaFBhZ2VUb1NlbGVjdGVkUm93UGFnZScpKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmdyaWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5ncmlkLnNldHRpbmdzLnNlbGVjdGVkUm93SW5kZXggPSBpbmRleDtcbiAgICBpZiAodGhpcy5pc0luZGV4T3V0T2ZSYW5nZShpbmRleCkpIHtcbiAgICAgIC8vIHdlIG5lZWQgdG8gZGVzZWxlY3QgYWxsIHJvd3MgaWYgd2UgZ290IGFuIGluY29ycmVjdCBpbmRleFxuICAgICAgdGhpcy5ncmlkLmRhdGFTZXQuZGVzZWxlY3RBbGwoKTtcbiAgICAgIHRoaXMuZW1pdFNlbGVjdFJvdyhudWxsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc3dpdGNoUGFnZVRvU2VsZWN0ZWRSb3dQYWdlKSB7XG4gICAgICBjb25zdCBzb3VyY2U6IERhdGFTb3VyY2UgPSB0aGlzLnNvdXJjZTtcbiAgICAgIGNvbnN0IHBhZ2luZzogeyBwYWdlOiBudW1iZXIsIHBlclBhZ2U6IG51bWJlciB9ID0gc291cmNlLmdldFBhZ2luZygpO1xuICAgICAgY29uc3QgcGFnZTogbnVtYmVyID0gZ2V0UGFnZUZvclJvd0luZGV4KGluZGV4LCBwYWdpbmcucGVyUGFnZSk7XG4gICAgICBpbmRleCA9IGluZGV4ICUgcGFnaW5nLnBlclBhZ2U7XG4gICAgICB0aGlzLmdyaWQuc2V0dGluZ3Muc2VsZWN0ZWRSb3dJbmRleCA9IGluZGV4O1xuXG4gICAgICBpZiAocGFnZSAhPT0gcGFnaW5nLnBhZ2UpIHtcbiAgICAgICAgc291cmNlLnNldFBhZ2UocGFnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgIH1cblxuICAgIGNvbnN0IHJvdzogUm93ID0gdGhpcy5ncmlkLmdldFJvd3MoKVtpbmRleF07XG4gICAgaWYgKHJvdykge1xuICAgICAgdGhpcy5ncmlkLnNlbGVjdFJvdyhyb3cpO1xuICAgICAgdGhpcy5lbWl0U2VsZWN0Um93KHJvdyk7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0Um93U2VsZWN0KHJvdzogUm93KSB7XG4gICAgaWYgKHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdzZWxlY3RNb2RlJykgPT09ICdzaW5nbGUnKSB7XG4gICAgICB0aGlzLmdyaWQuc2VsZWN0Um93KHJvdyk7XG4gICAgICB0aGlzLmVtaXRTZWxlY3RSb3cocm93KTtcbiAgICB9XG4gIH1cblxuICBvblVzZXJTZWxlY3RSb3cocm93OiBSb3cpIHtcbiAgICBpZiAodGhpcy5ncmlkLmdldFNldHRpbmcoJ3NlbGVjdE1vZGUnKSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgIHRoaXMuZ3JpZC5zZWxlY3RSb3cocm93KTtcbiAgICAgIHRoaXMuZW1pdFVzZXJTZWxlY3RSb3cocm93KTtcbiAgICB9XG4gIH1cblxuICBvblJvd0hvdmVyKHJvdzogUm93KSB7XG4gICAgdGhpcy5yb3dIb3Zlci5lbWl0KHJvdyk7XG4gIH1cblxuICBvbk11bHRpcGxlU2VsZWN0Um93KHJvdzogUm93KSB7XG4gICAgdGhpcy5ncmlkLm11bHRpcGxlU2VsZWN0Um93KHJvdyk7XG4gICAgLy8gVE9ETzogY3VycmVudGx5IHdlIG1ha2Ugb3VyIGxpZmUgZWFzeSBhbmQganVzdCBkZXNlbGVjdCB0aGUgXCJzZWxlY3QgYWxsXCIgY2hlY2tib3ggd2hlbiBuZWVkZWRcbiAgICAvLyAgICAgICBidXQgd2UgZG8gbm90IGNoZWNrIGl0LCB3aGVuIHdlIGRldGVybWluZSB0aGF0IHRoZSB1c2VyIGhhcyBzZWxlY3RlZCBldmVyeXRoaW5nXG4gICAgaWYgKCFyb3cuaXNTZWxlY3RlZCkgdGhpcy5pc0FsbFNlbGVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5lbWl0VXNlclNlbGVjdFJvdyhyb3cpO1xuICB9XG5cbiAgYXN5bmMgb25TZWxlY3RBbGxSb3dzKCkge1xuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCA9ICF0aGlzLmlzQWxsU2VsZWN0ZWQ7XG4gICAgYXdhaXQgdGhpcy5ncmlkLnNlbGVjdEFsbFJvd3ModGhpcy5pc0FsbFNlbGVjdGVkKTtcbiAgICB0aGlzLmVtaXRVc2VyU2VsZWN0Um93KG51bGwpO1xuICB9XG5cbiAgb25FeHBhbmRSb3cocm93OiBSb3cpIHtcbiAgICB0aGlzLmdyaWQuZXhwYW5kUm93KHJvdyk7XG4gIH1cblxuICBpbml0R3JpZCgpIHtcbiAgICB0aGlzLnNvdXJjZSA9IHRoaXMucHJlcGFyZVNvdXJjZSgpO1xuICAgIHRoaXMuZ3JpZCA9IG5ldyBHcmlkKHRoaXMuc291cmNlLCB0aGlzLnByZXBhcmVTZXR0aW5ncygpKTtcblxuICAgIHRoaXMuc3Vic2NyaWJlVG9PblNlbGVjdFJvdygpO1xuICAgIC8qKiBEZWxheSBhIGJpdCB0aGUgZ3JpZCBpbml0IGV2ZW50IHRyaWdnZXIgdG8gcHJldmVudCBlbXB0eSByb3dzICovXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmFmdGVyR3JpZEluaXQuZW1pdCh0aGlzLmdyaWQuZGF0YVNldCk7XG4gICAgfSwgMTApO1xuXG4gIH1cblxuICBwcmVwYXJlU291cmNlKCk6IERhdGFTb3VyY2Uge1xuICAgIGxldCBzb3VyY2U6IERhdGFTb3VyY2U7XG4gICAgaWYgKHRoaXMuc291cmNlIGluc3RhbmNlb2YgRGF0YVNvdXJjZSkge1xuICAgICAgc291cmNlID0gdGhpcy5zb3VyY2U7XG4gICAgfSBlbHNlIGlmICh0aGlzLnNvdXJjZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBzb3VyY2UgPSBuZXcgTG9jYWxEYXRhU291cmNlKHRoaXMuc291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc291cmNlID0gbmV3IExvY2FsRGF0YVNvdXJjZSgpO1xuICAgIH1cblxuICAgIC8vIHdlIGhhdmUgdG8gaG9vayB1cCBhIGxpc3RlbmVyIHRvIHVwZGF0ZSBzb21lIHZhcmlhYmxlcyB3aGVuIHRoZSBkYXRhIHNvdXJjZSBjaGFuZ2VzXG4gICAgaWYgKHRoaXMuZGF0YUNoYW5nZVN1YnNjcmlwdGlvbikgdGhpcy5kYXRhQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5kYXRhQ2hhbmdlU3Vic2NyaXB0aW9uID0gc291cmNlLm9uQ2hhbmdlZCgpLnN1YnNjcmliZSgoY2hhbmdlczogYW55KSA9PiB0aGlzLnByb2Nlc3NEYXRhQ2hhbmdlKGNoYW5nZXMpKTtcblxuICAgIHJldHVybiBzb3VyY2U7XG4gIH1cblxuICBwcm9jZXNzRGF0YUNoYW5nZShjaGFuZ2VzOiBEYXRhU291cmNlQ2hhbmdlRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBoZXJlIHdlIGNhbiBhbHJlYWR5IGFzc3VtZSB0aGF0IHRoZSBzb3VyY2UgaGFzIGJlZW4gbGlmdGVkIHRvIGFuIGluc3RhbmNlIG9mIERhdGFTb3VyY2VcbiAgICBjb25zdCBzb3VyY2UgPSB0aGlzLnNvdXJjZSBhcyBEYXRhU291cmNlO1xuICAgIHRoaXMuaXNBbGxTZWxlY3RlZCA9IHNvdXJjZS5pc0V2ZXJ5RWxlbWVudFNlbGVjdGVkKHRoaXMuZ3JpZC5nZXRTZXR0aW5nKCdzZWxlY3RNb2RlJykgPT09ICdtdWx0aV9maWx0ZXJlZCcpXG4gIH1cblxuICBwcmVwYXJlU2V0dGluZ3MoKTogU2V0dGluZ3Mge1xuICAgIHJldHVybiBkZWVwRXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRTZXR0aW5ncywgdGhpcy5zZXR0aW5ncyk7XG4gIH1cblxuICBnZXROb3RWaXNpYmxlQ29sdW1ucygpOiBBcnJheTxJQ29sdW1uPiB7XG4gICAgcmV0dXJuICh0aGlzLmdyaWQ/LmdldENvbHVtbnMoKSA/PyBbXSkuZmlsdGVyKChjb2x1bW46IElDb2x1bW4pID0+IGNvbHVtbi5oaWRlKTtcbiAgfVxuXG4gIG9uU2hvd0hlYWRlcihjb2x1bW5JZDogc3RyaW5nKSB7XG4gICAgKHRoaXMuc2V0dGluZ3MgYXMgYW55KS5jb2x1bW5zW2NvbHVtbklkXS5oaWRlID0gZmFsc2U7XG4gICAgdGhpcy5ncmlkLnNldFNldHRpbmdzKHRoaXMucHJlcGFyZVNldHRpbmdzKCkpO1xuICB9XG5cbiAgb25IaWRlSGVhZGVyKGNvbHVtbklkOiBzdHJpbmcpIHtcbiAgICAodGhpcy5zZXR0aW5ncyBhcyBhbnkpLmNvbHVtbnNbY29sdW1uSWRdLmhpZGUgPSB0cnVlO1xuICAgIHRoaXMuZ3JpZC5zZXRTZXR0aW5ncyh0aGlzLnByZXBhcmVTZXR0aW5ncygpKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlUm93U2VsZWN0aW9uRXZlbnQocm93OiBSb3cgfCBudWxsKTogUm93U2VsZWN0aW9uRXZlbnQge1xuICAgIHJldHVybiB7XG4gICAgICByb3c6IHJvdyxcbiAgICAgIGRhdGE6IHJvdyA/IHJvdy5nZXREYXRhKCkgOiBudWxsLFxuICAgICAgaXNTZWxlY3RlZDogcm93ID8gcm93LmdldElzU2VsZWN0ZWQoKSA6IG51bGwsXG4gICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgc2VsZWN0ZWQ6IHRoaXMuZ3JpZC5nZXRTZWxlY3RlZEl0ZW1zKCksXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgZW1pdFVzZXJTZWxlY3RSb3cocm93OiBSb3cgfCBudWxsKSB7XG4gICAgdGhpcy51c2VyUm93U2VsZWN0LmVtaXQodGhpcy5jcmVhdGVSb3dTZWxlY3Rpb25FdmVudChyb3cpKTtcbiAgICAvLyBhbHdheXMgYWxzbyBlbWl0IHRoZSBnZW5lcmFsIGV2ZW50XG4gICAgdGhpcy5lbWl0U2VsZWN0Um93KHJvdyk7XG4gIH1cblxuICBwcml2YXRlIGVtaXRTZWxlY3RSb3cocm93OiBSb3cgfCBudWxsKSB7XG4gICAgdGhpcy5yb3dTZWxlY3QuZW1pdCh0aGlzLmNyZWF0ZVJvd1NlbGVjdGlvbkV2ZW50KHJvdykpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0luZGV4T3V0T2ZSYW5nZShpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgY29uc3QgZGF0YUFtb3VudCA9IHRoaXMuc291cmNlPy5jb3VudCgpO1xuICAgIHJldHVybiBpbmRleCA8IDAgfHwgKHR5cGVvZiBkYXRhQW1vdW50ID09PSAnbnVtYmVyJyAmJiBpbmRleCA+PSBkYXRhQW1vdW50KTtcbiAgfVxuXG4gIHByaXZhdGUgc3Vic2NyaWJlVG9PblNlbGVjdFJvdygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5vblNlbGVjdFJvd1N1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5vblNlbGVjdFJvd1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICB0aGlzLm9uU2VsZWN0Um93U3Vic2NyaXB0aW9uID0gdGhpcy5ncmlkLm9uU2VsZWN0Um93KClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCQpKVxuICAgICAgLnN1YnNjcmliZSgocm93KSA9PiB7XG4gICAgICAgIHRoaXMuZW1pdFNlbGVjdFJvdyhyb3cpO1xuICAgICAgfSk7XG4gIH1cbn1cbiIsIjxhbmd1bGFyMi1zbWFydC10YWJsZS10YWdzLWxpc3RcbiAgW3RhZ3NdPVwiZ2V0Tm90VmlzaWJsZUNvbHVtbnMoKVwiIChjbG9zZSk9XCJvblNob3dIZWFkZXIoJGV2ZW50KVwiXG4+PC9hbmd1bGFyMi1zbWFydC10YWJsZS10YWdzLWxpc3Q+XG5cbjxkaXYgc3R5bGU9XCJvdmVyZmxvdy14OiBhdXRvOyAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2hcIj5cbiAgPHRhYmxlIFtpZF09XCJ0YWJsZUlkXCIgW25nQ2xhc3NdPVwidGFibGVDbGFzc1wiPlxuICAgIDx0aGVhZFxuICAgICAgYW5ndWxhcjItc3QtdGhlYWRcbiAgICAgICpuZ0lmPVwiIWlzSGlkZUhlYWRlciB8fCAhaXNIaWRlU3ViSGVhZGVyXCJcbiAgICAgIFtncmlkXT1cImdyaWRcIlxuICAgICAgW2lzQWxsU2VsZWN0ZWRdPVwiaXNBbGxTZWxlY3RlZFwiXG4gICAgICBbc291cmNlXT1cInNvdXJjZVwiXG4gICAgICBbY3JlYXRlQ29uZmlybV09XCJjcmVhdGVDb25maXJtXCJcbiAgICAgIFtjcmVhdGVDYW5jZWxdPVwiY3JlYXRlQ2FuY2VsXCJcbiAgICAgIChjcmVhdGUpPVwiY3JlYXRlLmVtaXQoJGV2ZW50KVwiXG4gICAgICAoc2VsZWN0QWxsUm93cyk9XCJvblNlbGVjdEFsbFJvd3MoKVwiXG4gICAgICAoaGlkZSk9XCJvbkhpZGVIZWFkZXIoJGV2ZW50KVwiXG4gICAgPjwvdGhlYWQ+XG5cbiAgICA8dGJvZHlcbiAgICAgIGFuZ3VsYXIyLXN0LXRib2R5XG4gICAgICBbZ3JpZF09XCJncmlkXCJcbiAgICAgIFtzb3VyY2VdPVwic291cmNlXCJcbiAgICAgIFtkZWxldGVDb25maXJtXT1cImRlbGV0ZUNvbmZpcm1cIlxuICAgICAgW2VkaXRDb25maXJtXT1cImVkaXRDb25maXJtXCJcbiAgICAgIFtlZGl0Q2FuY2VsXT1cImVkaXRDYW5jZWxcIlxuICAgICAgW3Jvd0NsYXNzRnVuY3Rpb25dPVwicm93Q2xhc3NGdW5jdGlvblwiXG4gICAgICAoZWRpdCk9XCJlZGl0LmVtaXQoJGV2ZW50KVwiXG4gICAgICAoZGVsZXRlKT1cImRlbGV0ZS5lbWl0KCRldmVudClcIlxuICAgICAgKGN1c3RvbSk9XCJjdXN0b20uZW1pdCgkZXZlbnQpXCJcbiAgICAgICh1c2VyU2VsZWN0Um93KT1cIm9uVXNlclNlbGVjdFJvdygkZXZlbnQpXCJcbiAgICAgIChlZGl0Um93U2VsZWN0KT1cIm9uRWRpdFJvd1NlbGVjdCgkZXZlbnQpXCJcbiAgICAgIChtdWx0aXBsZVNlbGVjdFJvdyk9XCJvbk11bHRpcGxlU2VsZWN0Um93KCRldmVudClcIlxuICAgICAgKG9uRXhwYW5kUm93KT1cIm9uRXhwYW5kUm93KCRldmVudClcIlxuICAgICAgKHJvd0hvdmVyKT1cIm9uUm93SG92ZXIoJGV2ZW50KVwiXG4gICAgPjwvdGJvZHk+XG4gIDwvdGFibGU+XG48L2Rpdj5cbjxhbmd1bGFyMi1zbWFydC10YWJsZS1wYWdlclxuICAqbmdJZj1cImlzUGFnZXJEaXNwbGF5XCJcbiAgW3NvdXJjZV09XCJzb3VyY2VcIlxuICBbcGVyUGFnZVNlbGVjdF09XCJwZXJQYWdlU2VsZWN0XCJcbiAgW3BlclBhZ2VTZWxlY3RMYWJlbF09XCJwZXJQYWdlU2VsZWN0TGFiZWxcIlxuPlxuPC9hbmd1bGFyMi1zbWFydC10YWJsZS1wYWdlcj5cbiJdfQ==