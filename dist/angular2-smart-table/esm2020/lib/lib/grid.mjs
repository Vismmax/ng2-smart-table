import { Subject } from 'rxjs';
import { Deferred, getDeepFromObject, getPageForRowIndex } from './helpers';
import { DataSet } from './data-set/data-set';
export class Grid {
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
    async selectAllRows(status) {
        // remember that the data set of the grid only contains the visible elements on the current page
        this.dataSet.getRows().forEach(r => r.isSelected = status);
        // advise the data source to also update the selected elements
        await this.source.selectAllItems(status, this.getSetting('selectMode') === 'multi_filtered');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2FuZ3VsYXIyLXNtYXJ0LXRhYmxlL3NyYy9saWIvbGliL2dyaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFhLE9BQU8sRUFBZSxNQUFNLE1BQU0sQ0FBQztBQUV2RCxPQUFPLEVBQUMsUUFBUSxFQUFFLGlCQUFpQixFQUFFLGtCQUFrQixFQUFDLE1BQU0sV0FBVyxDQUFDO0FBRzFFLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQU81QyxNQUFNLE9BQU8sSUFBSTtJQWFmLFlBQVksTUFBa0IsRUFBRSxRQUFhO1FBWDdDLG9CQUFlLEdBQVksS0FBSyxDQUFDO1FBTWpDLHNCQUFpQixHQUFHLElBQUksT0FBTyxFQUFPLENBQUM7UUFNckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFHRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsMkJBQTJCLEVBQUU7WUFDcEMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2hEO1FBQ0QsSUFBSSxJQUFJLENBQUMsMkJBQTJCLEVBQUU7WUFDcEMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVELGdCQUFnQixDQUFDLFFBQWdCO1FBQy9CLE9BQU8sSUFBSSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzVFLENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxRQUFnQjtRQUN2QyxPQUFPLFFBQVEsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDO0lBQzVKLENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsT0FBTyxDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO0lBQzdCLENBQUM7SUFFRCxXQUFXLENBQUMsUUFBa0I7UUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBRTNELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDdkI7SUFDSCxDQUFDO0lBRUQsVUFBVTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQWtCO1FBQzFCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBRXhILElBQUksQ0FBQywyQkFBMkIsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO1lBQ2pGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BELFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsVUFBVSxDQUFDLElBQVksRUFBRSxZQUFrQjtRQUN6QyxPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxTQUFTLENBQUMsR0FBUTtRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxHQUFRO1FBQ3hCLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsV0FBVztRQUNULE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxTQUFTLENBQUMsR0FBUTtRQUNoQixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQVE7UUFDWCxHQUFHLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUN6QixDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVEsRUFBRSxjQUFnRDtRQUUvRCxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDaEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDL0MsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDNUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7YUFDOUI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7b0JBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNmLGdCQUFnQjtRQUNsQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQ3hDLGNBQWMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2xCLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBVSxFQUFFO2dCQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07Z0JBQ25CLE9BQU8sRUFBRSxRQUFRO2FBQ2xCLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDcEI7SUFDSCxDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQVEsRUFBRSxjQUE4QztRQUUzRCxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDaEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDL0MsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRTtnQkFDN0IsR0FBRyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ25ELEdBQUcsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUMxQixDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDZixnQkFBZ0I7UUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLENBQUMsRUFBRTtZQUN2QyxjQUFjLENBQUMsSUFBSSxDQUFDO2dCQUNsQixHQUFHLEVBQUUsR0FBRztnQkFDUixJQUFJLEVBQUUsR0FBRyxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsT0FBTyxFQUFFLFFBQVE7YUFDbEIsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsR0FBUSxFQUFFLGNBQWdEO1FBRS9ELE1BQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDaEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2YsZ0JBQWdCO1FBQ2xCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFDM0MsY0FBYyxDQUFDLElBQUksQ0FBQztnQkFDbEIsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQ25CLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTTtnQkFDbkIsT0FBTyxFQUFFLFFBQVE7YUFDbEIsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNwQjtJQUNILENBQUM7SUFFRCxpQkFBaUIsQ0FBQyxPQUE4QjtRQUM5QyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7WUFDaEUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxLQUFLLFFBQVEsRUFBRTtnQkFDOUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3JDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDL0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbEM7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkM7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVELG1CQUFtQixDQUFDLE9BQThCO1FBQ2hELElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM3RyxPQUFPLElBQUksQ0FBQztTQUNiO2FBQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNwRyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxvQkFBb0IsQ0FBQyxPQUE4QjtRQUVqRCxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDaEYsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsRUFBRTtZQUM5QixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUMvQixJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtnQkFDakMsb0VBQW9FO2dCQUNwRSxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDbEM7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLENBQUM7YUFDekM7U0FDRjtRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDL0Isb0VBQW9FO1lBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztTQUNsQztRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7WUFDNUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDdEM7UUFDRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFO1lBQ2hDLG9FQUFvRTtZQUNwRSxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLENBQUM7U0FDbkM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxhQUFhLENBQUMsTUFBVztRQUN2QixNQUFNLGFBQWEsR0FBUSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDakQsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUN6RSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDeEM7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4RixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDakIsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVELGNBQWM7UUFDWixNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQWMsRUFBRSxFQUFFO1lBQzNDLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsb0JBQW9CLEVBQUU7Z0JBQ3BELFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDO2dCQUM5QixRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDO2dCQUNwRCxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixFQUFFLENBQUM7YUFDbkQ7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxlQUFlO1FBQ2IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTthQUMxQixNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELGdCQUFnQjtRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQWU7UUFDakMsZ0dBQWdHO1FBQ2hHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsQ0FBQztRQUUzRCw4REFBOEQ7UUFDOUQsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQy9GLENBQUM7SUFFRCxXQUFXO1FBQ1QsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxVQUFVO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25DLENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsTUFBTSwyQkFBMkIsR0FBWSxJQUFJLENBQUMsVUFBVSxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDNUYsTUFBTSxnQkFBZ0IsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyRixNQUFNLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFzQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3BGLE9BQU8sRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLDJCQUEyQixFQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVPLG1CQUFtQjtRQUN6QixNQUFNLEVBQUMsMkJBQTJCLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDekYsTUFBTSxVQUFVLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUMvQzs7Ozs7Ozs7Ozs7V0FXRztRQUNILE9BQU8sQ0FDTCwyQkFBMkI7WUFDM0IsZ0JBQWdCLEdBQUcsVUFBVTtZQUM3QixnQkFBZ0IsSUFBSSxDQUFDLENBQ3RCLENBQUMsQ0FBQztZQUNELGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxDQUFDO1lBQzVCLGdCQUFnQixDQUFDO0lBQ3JCLENBQUM7SUFFTyxlQUFlLENBQUMsTUFBa0I7UUFDeEMsTUFBTSxFQUFDLDJCQUEyQixFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMvRixJQUFJLFlBQVksR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM3QyxJQUFJLDJCQUEyQixJQUFJLGdCQUFnQixJQUFJLENBQUMsRUFBRTtZQUN4RCxZQUFZLEdBQUcsa0JBQWtCLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDOUQ7UUFDRCxNQUFNLGFBQWEsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUNsRSxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQztJQUM5RSxDQUFDO0lBRU8sbUJBQW1CO1FBQ3pCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztRQUNyRSxPQUFPLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge09ic2VydmFibGUsIFN1YmplY3QsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7RGVmZXJyZWQsIGdldERlZXBGcm9tT2JqZWN0LCBnZXRQYWdlRm9yUm93SW5kZXh9IGZyb20gJy4vaGVscGVycyc7XG5pbXBvcnQge0NvbHVtbn0gZnJvbSAnLi9kYXRhLXNldC9jb2x1bW4nO1xuaW1wb3J0IHtSb3d9IGZyb20gJy4vZGF0YS1zZXQvcm93JztcbmltcG9ydCB7RGF0YVNldH0gZnJvbSAnLi9kYXRhLXNldC9kYXRhLXNldCc7XG5pbXBvcnQge0RhdGFTb3VyY2UsIERhdGFTb3VyY2VDaGFuZ2VFdmVudH0gZnJvbSAnLi9kYXRhLXNvdXJjZS9kYXRhLXNvdXJjZSc7XG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7U2V0dGluZ3N9IGZyb20gXCIuL3NldHRpbmdzXCI7XG5pbXBvcnQge0NyZWF0ZUNvbmZpcm1FdmVudCwgRGVsZXRlQ29uZmlybUV2ZW50LCBFZGl0Q29uZmlybUV2ZW50fSBmcm9tICcuL2V2ZW50cyc7XG5cbmV4cG9ydCBjbGFzcyBHcmlkIHtcblxuICBjcmVhdGVGb3JtU2hvd246IGJvb2xlYW4gPSBmYWxzZTtcblxuICBzb3VyY2UhOiBEYXRhU291cmNlO1xuICBzZXR0aW5ncyE6IFNldHRpbmdzO1xuICBkYXRhU2V0ITogRGF0YVNldDtcblxuICBvblNlbGVjdFJvd1NvdXJjZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcblxuICBwcml2YXRlIHNvdXJjZU9uQ2hhbmdlZFN1YnNjcmlwdGlvbiE6IFN1YnNjcmlwdGlvbjtcbiAgcHJpdmF0ZSBzb3VyY2VPblVwZGF0ZWRTdWJzY3JpcHRpb24hOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3Ioc291cmNlOiBEYXRhU291cmNlLCBzZXR0aW5nczogYW55KSB7XG4gICAgdGhpcy5zZXRTZXR0aW5ncyhzZXR0aW5ncyk7XG4gICAgdGhpcy5zZXRTb3VyY2Uoc291cmNlKTtcbiAgfVxuXG5cbiAgZGV0YWNoKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNvdXJjZU9uQ2hhbmdlZFN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zb3VyY2VPbkNoYW5nZWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc291cmNlT25VcGRhdGVkU3Vic2NyaXB0aW9uKSB7XG4gICAgICB0aGlzLnNvdXJjZU9uVXBkYXRlZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIHNob3dBY3Rpb25Db2x1bW4ocG9zaXRpb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzQ3VycmVudEFjdGlvbnNQb3NpdGlvbihwb3NpdGlvbikgJiYgdGhpcy5pc0FjdGlvbnNWaXNpYmxlKCk7XG4gIH1cblxuICBpc0N1cnJlbnRBY3Rpb25zUG9zaXRpb24ocG9zaXRpb246IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBwb3NpdGlvbiA9PSB0aGlzLmdldFNldHRpbmcoJ2FjdGlvbnMucG9zaXRpb24nKTtcbiAgfVxuXG4gIGlzQWN0aW9uc1Zpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2V0dGluZygnYWN0aW9ucy5hZGQnKSB8fCB0aGlzLmdldFNldHRpbmcoJ2FjdGlvbnMuZWRpdCcpIHx8IHRoaXMuZ2V0U2V0dGluZygnYWN0aW9ucy5kZWxldGUnKSB8fCB0aGlzLmdldFNldHRpbmcoJ2FjdGlvbnMuY3VzdG9tJykubGVuZ3RoO1xuICB9XG5cbiAgaXNNdWx0aVNlbGVjdFZpc2libGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFsnbXVsdGknLCAnbXVsdGlfZmlsdGVyZWQnXS5pbmRleE9mKHRoaXMuZ2V0U2V0dGluZygnc2VsZWN0TW9kZScpKSA+IC0xO1xuICB9XG5cbiAgZ2V0TmV3Um93KCk6IFJvdyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNldC5uZXdSb3c7XG4gIH1cblxuICBzZXRTZXR0aW5ncyhzZXR0aW5nczogU2V0dGluZ3MpIHtcbiAgICB0aGlzLnNldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgdGhpcy5kYXRhU2V0ID0gbmV3IERhdGFTZXQoW10sIHRoaXMuZ2V0U2V0dGluZygnY29sdW1ucycpKTtcblxuICAgIGlmICh0aGlzLnNvdXJjZSkge1xuICAgICAgdGhpcy5zb3VyY2UucmVmcmVzaCgpO1xuICAgIH1cbiAgfVxuXG4gIGdldERhdGFTZXQoKTogRGF0YVNldCB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNldDtcbiAgfVxuXG4gIHNldFNvdXJjZShzb3VyY2U6IERhdGFTb3VyY2UpIHtcbiAgICB0aGlzLmRldGFjaCgpO1xuICAgIHRoaXMuc291cmNlID0gdGhpcy5wcmVwYXJlU291cmNlKHNvdXJjZSk7XG5cbiAgICB0aGlzLnNvdXJjZU9uQ2hhbmdlZFN1YnNjcmlwdGlvbiA9IHRoaXMuc291cmNlLm9uQ2hhbmdlZCgpLnN1YnNjcmliZSgoY2hhbmdlczogYW55KSA9PiB0aGlzLnByb2Nlc3NEYXRhQ2hhbmdlKGNoYW5nZXMpKTtcblxuICAgIHRoaXMuc291cmNlT25VcGRhdGVkU3Vic2NyaXB0aW9uID0gdGhpcy5zb3VyY2Uub25VcGRhdGVkKCkuc3Vic2NyaWJlKChkYXRhOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGNoYW5nZWRSb3cgPSB0aGlzLmRhdGFTZXQuZmluZFJvd0J5RGF0YShkYXRhKTtcbiAgICAgIGNoYW5nZWRSb3cuc2V0RGF0YShkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFNldHRpbmcobmFtZTogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBnZXREZWVwRnJvbU9iamVjdCh0aGlzLnNldHRpbmdzLCBuYW1lLCBkZWZhdWx0VmFsdWUpO1xuICB9XG5cbiAgZ2V0Q29sdW1ucygpOiBBcnJheTxDb2x1bW4+IHtcbiAgICByZXR1cm4gdGhpcy5kYXRhU2V0LmdldENvbHVtbnMoKTtcbiAgfVxuXG4gIGdldFJvd3MoKTogQXJyYXk8Um93PiB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNldC5nZXRSb3dzKCk7XG4gIH1cblxuICBzZWxlY3RSb3cocm93OiBSb3cpIHtcbiAgICB0aGlzLmRhdGFTZXQuc2VsZWN0Um93KHJvdyk7XG4gICAgdGhpcy5zb3VyY2UudG9nZ2xlSXRlbShyb3cuZ2V0RGF0YSgpLCByb3cuaXNTZWxlY3RlZCk7XG4gIH1cblxuICBtdWx0aXBsZVNlbGVjdFJvdyhyb3c6IFJvdykge1xuICAgIHRoaXMuZGF0YVNldC5tdWx0aXBsZVNlbGVjdFJvdyhyb3cpO1xuICAgIHRoaXMuc291cmNlLnRvZ2dsZUl0ZW0ocm93LmdldERhdGEoKSwgcm93LmlzU2VsZWN0ZWQpO1xuICB9XG5cbiAgb25TZWxlY3RSb3coKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5vblNlbGVjdFJvd1NvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGV4cGFuZFJvdyhyb3c6IFJvdykge1xuICAgIHRoaXMuZGF0YVNldC5leHBhbmRSb3cocm93KTtcbiAgfVxuXG4gIGVkaXQocm93OiBSb3cpIHtcbiAgICByb3cuaXNJbkVkaXRpbmcgPSB0cnVlO1xuICB9XG5cbiAgY3JlYXRlKHJvdzogUm93LCBjb25maXJtRW1pdHRlcjogRXZlbnRFbWl0dGVyPENyZWF0ZUNvbmZpcm1FdmVudD4pIHtcblxuICAgIGNvbnN0IGRlZmVycmVkID0gbmV3IERlZmVycmVkKCk7XG4gICAgZGVmZXJyZWQucHJvbWlzZS50aGVuKChuZXdEYXRhKSA9PiB7XG4gICAgICBuZXdEYXRhID0gbmV3RGF0YSA/IG5ld0RhdGEgOiByb3cuZ2V0TmV3RGF0YSgpO1xuICAgICAgaWYgKGRlZmVycmVkLnJlc29sdmUuc2tpcEFkZCkge1xuICAgICAgICB0aGlzLmNyZWF0ZUZvcm1TaG93biA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zb3VyY2UucHJlcGVuZChuZXdEYXRhKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmNyZWF0ZUZvcm1TaG93biA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZGF0YVNldC5jcmVhdGVOZXdSb3coKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgLy8gZG9pbmcgbm90aGluZ1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuZ2V0U2V0dGluZygnYWRkLmNvbmZpcm1DcmVhdGUnKSkge1xuICAgICAgY29uZmlybUVtaXR0ZXIuZW1pdCh7XG4gICAgICAgIG5ld0RhdGE6IHJvdy5nZXROZXdEYXRhKCksXG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2UsXG4gICAgICAgIGNvbmZpcm06IGRlZmVycmVkLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlZmVycmVkLnJlc29sdmUoKTtcbiAgICB9XG4gIH1cblxuICBzYXZlKHJvdzogUm93LCBjb25maXJtRW1pdHRlcjogRXZlbnRFbWl0dGVyPEVkaXRDb25maXJtRXZlbnQ+KSB7XG5cbiAgICBjb25zdCBkZWZlcnJlZCA9IG5ldyBEZWZlcnJlZCgpO1xuICAgIGRlZmVycmVkLnByb21pc2UudGhlbigobmV3RGF0YSkgPT4ge1xuICAgICAgbmV3RGF0YSA9IG5ld0RhdGEgPyBuZXdEYXRhIDogcm93LmdldE5ld0RhdGEoKTtcbiAgICAgIGlmIChkZWZlcnJlZC5yZXNvbHZlLnNraXBFZGl0KSB7XG4gICAgICAgIHJvdy5pc0luRWRpdGluZyA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zb3VyY2UudXBkYXRlKHJvdy5nZXREYXRhKCksIG5ld0RhdGEpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgIHJvdy5pc0luRWRpdGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAvLyBkb2luZyBub3RoaW5nXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5nZXRTZXR0aW5nKCdlZGl0LmNvbmZpcm1TYXZlJykpIHtcbiAgICAgIGNvbmZpcm1FbWl0dGVyLmVtaXQoe1xuICAgICAgICByb3c6IHJvdyxcbiAgICAgICAgZGF0YTogcm93LmdldERhdGEoKSxcbiAgICAgICAgbmV3RGF0YTogcm93LmdldE5ld0RhdGEoKSxcbiAgICAgICAgc291cmNlOiB0aGlzLnNvdXJjZSxcbiAgICAgICAgY29uZmlybTogZGVmZXJyZWQsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZShyb3c6IFJvdywgY29uZmlybUVtaXR0ZXI6IEV2ZW50RW1pdHRlcjxEZWxldGVDb25maXJtRXZlbnQ+KSB7XG5cbiAgICBjb25zdCBkZWZlcnJlZCA9IG5ldyBEZWZlcnJlZCgpO1xuICAgIGRlZmVycmVkLnByb21pc2UudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnNvdXJjZS5yZW1vdmUocm93LmdldERhdGEoKSk7XG4gICAgfSkuY2F0Y2goKGVycikgPT4ge1xuICAgICAgLy8gZG9pbmcgbm90aGluZ1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuZ2V0U2V0dGluZygnZGVsZXRlLmNvbmZpcm1EZWxldGUnKSkge1xuICAgICAgY29uZmlybUVtaXR0ZXIuZW1pdCh7XG4gICAgICAgIHJvdzogcm93LFxuICAgICAgICBkYXRhOiByb3cuZ2V0RGF0YSgpLFxuICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlLFxuICAgICAgICBjb25maXJtOiBkZWZlcnJlZCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvY2Vzc0RhdGFDaGFuZ2UoY2hhbmdlczogRGF0YVNvdXJjZUNoYW5nZUV2ZW50KSB7XG4gICAgaWYgKHRoaXMuc2hvdWxkUHJvY2Vzc0NoYW5nZShjaGFuZ2VzKSkge1xuICAgICAgdGhpcy5kYXRhU2V0LnNldERhdGEoY2hhbmdlcy5lbGVtZW50cywgdGhpcy5nZXRTZWxlY3RlZEl0ZW1zKCkpO1xuICAgICAgaWYgKHRoaXMuZ2V0U2V0dGluZygnc2VsZWN0TW9kZScpID09PSAnc2luZ2xlJykge1xuICAgICAgICBpZiAodGhpcy5kYXRhU2V0LmdldFJvd3MoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgY29uc3Qgcm93ID0gdGhpcy5kZXRlcm1pbmVSb3dUb1NlbGVjdChjaGFuZ2VzKTtcbiAgICAgICAgICB0aGlzLm9uU2VsZWN0Um93U291cmNlLm5leHQocm93KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm9uU2VsZWN0Um93U291cmNlLm5leHQobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzaG91bGRQcm9jZXNzQ2hhbmdlKGNoYW5nZXM6IERhdGFTb3VyY2VDaGFuZ2VFdmVudCk6IGJvb2xlYW4ge1xuICAgIGlmIChbJ2ZpbHRlcicsICdzb3J0JywgJ3BhZ2UnLCAncmVtb3ZlJywgJ3JlZnJlc2gnLCAnbG9hZCcsICdlbXB0eScsICdwYWdpbmcnXS5pbmRleE9mKGNoYW5nZXMuYWN0aW9uKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoWydwcmVwZW5kJywgJ2FwcGVuZCddLmluZGV4T2YoY2hhbmdlcy5hY3Rpb24pICE9PSAtMSAmJiAhdGhpcy5nZXRTZXR0aW5nKCdwYWdlci5kaXNwbGF5JykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEuOC4wXG4gICAqIE5lZWQgdG8gYWRkIGB8IG51bGxgIGluIHJldHVybiB0eXBlXG4gICAqXG4gICAqIFRPRE86IG1vdmUgdG8gc2VsZWN0YWJsZT8gU2VwYXJhdGUgZGlyZWN0aXZlXG4gICAqL1xuICBkZXRlcm1pbmVSb3dUb1NlbGVjdChjaGFuZ2VzOiBEYXRhU291cmNlQ2hhbmdlRXZlbnQpOiBSb3cgfCBudWxsIHtcblxuICAgIGlmIChbJ2xvYWQnLCAncGFnZScsICdmaWx0ZXInLCAnc29ydCcsICdyZWZyZXNoJ10uaW5kZXhPZihjaGFuZ2VzLmFjdGlvbikgIT09IC0xKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhU2V0LnNlbGVjdCh0aGlzLmdldFJvd0luZGV4VG9TZWxlY3QoKSk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuc2hvdWxkU2tpcFNlbGVjdGlvbigpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlcy5hY3Rpb24gPT09ICdyZW1vdmUnKSB7XG4gICAgICBpZiAoY2hhbmdlcy5lbGVtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gd2UgaGF2ZSB0byBzdG9yZSB3aGljaCBvbmUgdG8gc2VsZWN0IGFzIHRoZSBkYXRhIHdpbGwgYmUgcmVsb2FkZWRcbiAgICAgICAgdGhpcy5kYXRhU2V0LndpbGxTZWxlY3RMYXN0Um93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhU2V0LnNlbGVjdFByZXZpb3VzUm93KCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmFjdGlvbiA9PT0gJ2FwcGVuZCcpIHtcbiAgICAgIC8vIHdlIGhhdmUgdG8gc3RvcmUgd2hpY2ggb25lIHRvIHNlbGVjdCBhcyB0aGUgZGF0YSB3aWxsIGJlIHJlbG9hZGVkXG4gICAgICB0aGlzLmRhdGFTZXQud2lsbFNlbGVjdExhc3RSb3coKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXMuYWN0aW9uID09PSAnYWRkJykge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YVNldC5zZWxlY3RGaXJzdFJvdygpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlcy5hY3Rpb24gPT09ICd1cGRhdGUnKSB7XG4gICAgICByZXR1cm4gdGhpcy5kYXRhU2V0LnNlbGVjdEZpcnN0Um93KCk7XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzLmFjdGlvbiA9PT0gJ3ByZXBlbmQnKSB7XG4gICAgICAvLyB3ZSBoYXZlIHRvIHN0b3JlIHdoaWNoIG9uZSB0byBzZWxlY3QgYXMgdGhlIGRhdGEgd2lsbCBiZSByZWxvYWRlZFxuICAgICAgdGhpcy5kYXRhU2V0LndpbGxTZWxlY3RGaXJzdFJvdygpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByZXBhcmVTb3VyY2Uoc291cmNlOiBhbnkpOiBEYXRhU291cmNlIHtcbiAgICBjb25zdCBpbml0aWFsU291cmNlOiBhbnkgPSB0aGlzLmdldEluaXRpYWxTb3J0KCk7XG4gICAgaWYgKGluaXRpYWxTb3VyY2UgJiYgaW5pdGlhbFNvdXJjZVsnZmllbGQnXSAmJiBpbml0aWFsU291cmNlWydkaXJlY3Rpb24nXSkge1xuICAgICAgc291cmNlLnNldFNvcnQoW2luaXRpYWxTb3VyY2VdLCBmYWxzZSk7XG4gICAgfVxuICAgIHNvdXJjZS5zZXRQYWdpbmcodGhpcy5nZXRQYWdlVG9TZWxlY3Qoc291cmNlKSwgdGhpcy5nZXRTZXR0aW5nKCdwYWdlci5wZXJQYWdlJyksIGZhbHNlKTtcblxuICAgIHNvdXJjZS5yZWZyZXNoKCk7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfVxuXG4gIGdldEluaXRpYWxTb3J0KCkge1xuICAgIGNvbnN0IHNvcnRDb25mOiBhbnkgPSB7fTtcbiAgICB0aGlzLmdldENvbHVtbnMoKS5mb3JFYWNoKChjb2x1bW46IENvbHVtbikgPT4ge1xuICAgICAgaWYgKGNvbHVtbi5pc1NvcnRhYmxlICYmIGNvbHVtbi5kZWZhdWx0U29ydERpcmVjdGlvbikge1xuICAgICAgICBzb3J0Q29uZlsnZmllbGQnXSA9IGNvbHVtbi5pZDtcbiAgICAgICAgc29ydENvbmZbJ2RpcmVjdGlvbiddID0gY29sdW1uLmRlZmF1bHRTb3J0RGlyZWN0aW9uO1xuICAgICAgICBzb3J0Q29uZlsnY29tcGFyZSddID0gY29sdW1uLmdldENvbXBhcmVGdW5jdGlvbigpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzb3J0Q29uZjtcbiAgfVxuXG4gIGdldFNlbGVjdGVkUm93cygpOiBBcnJheTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5kYXRhU2V0LmdldFJvd3MoKVxuICAgICAgLmZpbHRlcihyID0+IHIuaXNTZWxlY3RlZCk7XG4gIH1cblxuICBnZXRTZWxlY3RlZEl0ZW1zKCk6IEFycmF5PGFueT4ge1xuICAgIHJldHVybiB0aGlzLnNvdXJjZS5nZXRTZWxlY3RlZEl0ZW1zKCk7XG4gIH1cblxuICBhc3luYyBzZWxlY3RBbGxSb3dzKHN0YXR1czogYm9vbGVhbikge1xuICAgIC8vIHJlbWVtYmVyIHRoYXQgdGhlIGRhdGEgc2V0IG9mIHRoZSBncmlkIG9ubHkgY29udGFpbnMgdGhlIHZpc2libGUgZWxlbWVudHMgb24gdGhlIGN1cnJlbnQgcGFnZVxuICAgIHRoaXMuZGF0YVNldC5nZXRSb3dzKCkuZm9yRWFjaChyID0+IHIuaXNTZWxlY3RlZCA9IHN0YXR1cyk7XG5cbiAgICAvLyBhZHZpc2UgdGhlIGRhdGEgc291cmNlIHRvIGFsc28gdXBkYXRlIHRoZSBzZWxlY3RlZCBlbGVtZW50c1xuICAgIGF3YWl0IHRoaXMuc291cmNlLnNlbGVjdEFsbEl0ZW1zKHN0YXR1cywgdGhpcy5nZXRTZXR0aW5nKCdzZWxlY3RNb2RlJykgPT09ICdtdWx0aV9maWx0ZXJlZCcpO1xuICB9XG5cbiAgZ2V0Rmlyc3RSb3coKTogUm93IHtcbiAgICByZXR1cm4gdGhpcy5kYXRhU2V0LmdldEZpcnN0Um93KCk7XG4gIH1cblxuICBnZXRMYXN0Um93KCk6IFJvdyB7XG4gICAgcmV0dXJuIHRoaXMuZGF0YVNldC5nZXRMYXN0Um93KCk7XG4gIH1cblxuICBwcml2YXRlIGdldFNlbGVjdGlvbkluZm8oKTogeyBwZXJQYWdlOiBudW1iZXIsIHBhZ2U6IG51bWJlciwgc2VsZWN0ZWRSb3dJbmRleDogbnVtYmVyLCBzd2l0Y2hQYWdlVG9TZWxlY3RlZFJvd1BhZ2U6IGJvb2xlYW4gfSB7XG4gICAgY29uc3Qgc3dpdGNoUGFnZVRvU2VsZWN0ZWRSb3dQYWdlOiBib29sZWFuID0gdGhpcy5nZXRTZXR0aW5nKCdzd2l0Y2hQYWdlVG9TZWxlY3RlZFJvd1BhZ2UnKTtcbiAgICBjb25zdCBzZWxlY3RlZFJvd0luZGV4OiBudW1iZXIgPSBOdW1iZXIodGhpcy5nZXRTZXR0aW5nKCdzZWxlY3RlZFJvd0luZGV4JywgMCkpIHx8IDA7XG4gICAgY29uc3Qge3BlclBhZ2UsIHBhZ2V9OiB7IHBlclBhZ2U6IG51bWJlciwgcGFnZTogbnVtYmVyIH0gPSB0aGlzLmdldFNldHRpbmcoJ3BhZ2VyJyk7XG4gICAgcmV0dXJuIHtwZXJQYWdlLCBwYWdlLCBzZWxlY3RlZFJvd0luZGV4LCBzd2l0Y2hQYWdlVG9TZWxlY3RlZFJvd1BhZ2V9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSb3dJbmRleFRvU2VsZWN0KCk6IG51bWJlciB7XG4gICAgY29uc3Qge3N3aXRjaFBhZ2VUb1NlbGVjdGVkUm93UGFnZSwgc2VsZWN0ZWRSb3dJbmRleCwgcGVyUGFnZX0gPSB0aGlzLmdldFNlbGVjdGlvbkluZm8oKTtcbiAgICBjb25zdCBkYXRhQW1vdW50OiBudW1iZXIgPSB0aGlzLnNvdXJjZS5jb3VudCgpO1xuICAgIC8qKlxuICAgICAqIHNvdXJjZSAtIGNvbnRhaW5zIGFsbCB0YWJsZSBkYXRhXG4gICAgICogZGF0YVNldCAtIGNvbnRhaW5zIGRhdGEgZm9yIGN1cnJlbnQgcGFnZVxuICAgICAqIHNlbGVjdGVkUm93SW5kZXggLSBjb250YWlucyBpbmRleCBmb3IgZGF0YSBpbiBhbGwgZGF0YVxuICAgICAqXG4gICAgICogYmVjYXVzZSBvZiB0aGF0LCB3ZSBuZWVkIHRvIGNvdW50IGluZGV4IGZvciBhIHNwZWNpZmljIHJvdyBpbiBwYWdlXG4gICAgICogaWZcbiAgICAgKiBgc3dpdGNoUGFnZVRvU2VsZWN0ZWRSb3dQYWdlYCAtIHdlIG5lZWQgdG8gY2hhbmdlIHBhZ2UgYXV0b21hdGljYWxseVxuICAgICAqIGBzZWxlY3RlZFJvd0luZGV4IDwgZGF0YUFtb3VudCAmJiBzZWxlY3RlZFJvd0luZGV4ID49IDBgIC0gaW5kZXggcG9pbnRzIHRvIGV4aXN0aW5nIGRhdGFcbiAgICAgKiAoaWYgaW5kZXggcG9pbnRzIHRvIG5vbi1leGlzdGluZyBkYXRhIGFuZCB3ZSBjYWxjdWxhdGUgaW5kZXggZm9yIGN1cnJlbnQgcGFnZSAtIHdlIHdpbGwgZ2V0IHdyb25nIHNlbGVjdGVkIHJvdy5cbiAgICAgKiAgaWYgd2UgcmV0dXJuIGluZGV4IHdpdGNoIG5vdCBwb2ludHMgdG8gZXhpc3RpbmcgZGF0YSAtIG5vIGxpbmUgd2lsbCBiZSBoaWdobGlnaHRlZClcbiAgICAgKi9cbiAgICByZXR1cm4gKFxuICAgICAgc3dpdGNoUGFnZVRvU2VsZWN0ZWRSb3dQYWdlICYmXG4gICAgICBzZWxlY3RlZFJvd0luZGV4IDwgZGF0YUFtb3VudCAmJlxuICAgICAgc2VsZWN0ZWRSb3dJbmRleCA+PSAwXG4gICAgKSA/XG4gICAgICBzZWxlY3RlZFJvd0luZGV4ICUgcGVyUGFnZSA6XG4gICAgICBzZWxlY3RlZFJvd0luZGV4O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQYWdlVG9TZWxlY3Qoc291cmNlOiBEYXRhU291cmNlKTogbnVtYmVyIHtcbiAgICBjb25zdCB7c3dpdGNoUGFnZVRvU2VsZWN0ZWRSb3dQYWdlLCBzZWxlY3RlZFJvd0luZGV4LCBwZXJQYWdlLCBwYWdlfSA9IHRoaXMuZ2V0U2VsZWN0aW9uSW5mbygpO1xuICAgIGxldCBwYWdlVG9TZWxlY3Q6IG51bWJlciA9IE1hdGgubWF4KDEsIHBhZ2UpO1xuICAgIGlmIChzd2l0Y2hQYWdlVG9TZWxlY3RlZFJvd1BhZ2UgJiYgc2VsZWN0ZWRSb3dJbmRleCA+PSAwKSB7XG4gICAgICBwYWdlVG9TZWxlY3QgPSBnZXRQYWdlRm9yUm93SW5kZXgoc2VsZWN0ZWRSb3dJbmRleCwgcGVyUGFnZSk7XG4gICAgfVxuICAgIGNvbnN0IG1heFBhZ2VBbW91bnQ6IG51bWJlciA9IE1hdGguY2VpbChzb3VyY2UuY291bnQoKSAvIHBlclBhZ2UpO1xuICAgIHJldHVybiBtYXhQYWdlQW1vdW50ID8gTWF0aC5taW4ocGFnZVRvU2VsZWN0LCBtYXhQYWdlQW1vdW50KSA6IHBhZ2VUb1NlbGVjdDtcbiAgfVxuXG4gIHByaXZhdGUgc2hvdWxkU2tpcFNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICAvKipcbiAgICAgKiBGb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aGVuIHVzaW5nIGBzZWxlY3RlZFJvd0luZGV4YCB3aXRoIG5vbi1udW1iZXIgdmFsdWVzIC0gaWdub3JlZC5cbiAgICAgKlxuICAgICAqIFRoZXJlZm9yZSwgaW4gb3JkZXIgdG8gc2VsZWN0IGEgcm93IGFmdGVyIHNvbWUgY2hhbmdlcyxcbiAgICAgKiB0aGUgYHNlbGVjdGVkUm93SW5kZXhgIHZhbHVlIG11c3QgYmUgaW52YWxpZCBvciA+PSAwICg8IDAgbWVhbnMgdGhhdCBubyByb3cgaXMgc2VsZWN0ZWQpLlxuICAgICAqXG4gICAgICogYE51bWJlcih2YWx1ZSlgIHJldHVybnMgYE5hTmAgb24gYWxsIGludmFsaWQgY2FzZXMsIGFuZCBjb21wYXJpc29ucyB3aXRoIGBOYU5gIGFsd2F5cyByZXR1cm4gYGZhbHNlYC5cbiAgICAgKlxuICAgICAqICEhISBXZSBzaG91bGQgc2tpcCBhIHJvdyBvbmx5IGluIGNhc2VzIHdoZW4gYHNlbGVjdGVkUm93SW5kZXhgIDwgMFxuICAgICAqIGJlY2F1c2Ugd2hlbiA8IDAgYWxsIGxpbmVzIG11c3QgYmUgZGVzZWxlY3RlZFxuICAgICAqL1xuICAgIGNvbnN0IHNlbGVjdGVkUm93SW5kZXggPSBOdW1iZXIodGhpcy5nZXRTZXR0aW5nKCdzZWxlY3RlZFJvd0luZGV4JykpO1xuICAgIHJldHVybiBzZWxlY3RlZFJvd0luZGV4IDwgMDtcbiAgfVxufVxuIl19