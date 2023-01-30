import { IColumnType } from '../settings';
export class Column {
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
        // the pattern is "X = lookup(key) ?? X" - this keeps the default value in case the setting is undefined
        this.placeholder = this.lookupSetting('placeholder');
        this.sanitizer = this.lookupSetting('sanitizer') ?? {};
        this.title = this.lookupSetting('title') ?? this.title;
        this.classHeader = this.lookupSetting('classHeader', ['class']) ?? this.classHeader;
        this.classContent = this.lookupSetting('classContent', ['class']) ?? this.classContent;
        this.width = this.lookupSetting('width') ?? this.width;
        this.hide = this.lookupSetting('hide') ?? this.hide;
        this.type = this.lookupSetting('type') ?? this.determineType();
        this.editor = this.lookupSetting('editor') ?? this.editor;
        this.filter = this.lookupSetting('filter') ?? this.filter;
        this.renderComponent = this.lookupSetting('renderComponent') ?? this.renderComponent;
        this.isFilterable = this.filter !== undefined && !!this.filter;
        this.isSortable = this.lookupSetting('isSortable', ['sort']) ?? this.isSortable;
        this.isEditable = this.lookupSetting('isEditable', ['editable']) ?? this.isEditable;
        this.isAddable = this.lookupSetting('isAddable') ?? this.isAddable;
        this.defaultSortDirection = this.lookupSetting('sortDirection') ?? this.defaultSortDirection;
        this.sortDirection = this.defaultSortDirection ?? this.sortDirection;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvYW5ndWxhcjItc21hcnQtdGFibGUvc3JjL2xpYi9saWIvZGF0YS1zZXQvY29sdW1uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFJTCxXQUFXLEVBR1osTUFBTSxhQUFhLENBQUM7QUFHckIsTUFBTSxPQUFPLE1BQU07SUF3QmpCLFlBQW1CLEVBQVUsRUFBWSxRQUFhLEVBQVksT0FBZ0I7UUFBL0QsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFZLGFBQVEsR0FBUixRQUFRLENBQUs7UUFBWSxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBckJsRixVQUFLLEdBQVcsRUFBRSxDQUFDO1FBQ25CLFNBQUksR0FBWSxLQUFLLENBQUM7UUFDdEIsU0FBSSxHQUFpQixXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3RDLGNBQVMsR0FBc0IsRUFBRSxDQUFDO1FBQ2xDLGdCQUFXLEdBQVksRUFBRSxDQUFDO1FBQzFCLGlCQUFZLEdBQVksRUFBRSxDQUFDO1FBQzNCLFVBQUssR0FBWSxFQUFFLENBQUM7UUFDcEIsZUFBVSxHQUFhLElBQUksQ0FBQztRQUM1QixlQUFVLEdBQWEsSUFBSSxDQUFDO1FBQzVCLGNBQVMsR0FBYSxJQUFJLENBQUM7UUFDM0IsaUJBQVksR0FBYSxLQUFLLENBQUM7UUFDL0Isa0JBQWEsR0FBbUIsS0FBSyxDQUFDO1FBQ3RDLHlCQUFvQixHQUFvQixTQUFTLENBQUM7UUFDbEQsV0FBTSxHQUFtRCxFQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUM7UUFDakcsV0FBTSxHQUFtRCxFQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFDLENBQUM7UUFDakcsb0JBQWUsR0FBUyxJQUFJLENBQUM7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Y3Rpb24sXG4gIENvbHVtblZhbHVlUHJlcGFyZUZ1bmN0aW9uLFxuICBJQ29sdW1uLFxuICBJQ29sdW1uVHlwZSxcbiAgSVNvcnREaXJlY3Rpb24sXG4gIFNhbml0aXplclNldHRpbmdzXG59IGZyb20gJy4uL3NldHRpbmdzJztcbmltcG9ydCB7RGF0YVNldH0gZnJvbSAnLi9kYXRhLXNldCc7XG5cbmV4cG9ydCBjbGFzcyBDb2x1bW4gaW1wbGVtZW50cyBJQ29sdW1uIHtcblxuICBwbGFjZWhvbGRlcj86IHN0cmluZztcbiAgdGl0bGU6IHN0cmluZyA9ICcnO1xuICBoaWRlOiBib29sZWFuID0gZmFsc2U7XG4gIHR5cGU/OiBJQ29sdW1uVHlwZSA9IElDb2x1bW5UeXBlLlRleHQ7XG4gIHNhbml0aXplcjogU2FuaXRpemVyU2V0dGluZ3MgPSB7fTtcbiAgY2xhc3NIZWFkZXI/OiBzdHJpbmcgPSAnJztcbiAgY2xhc3NDb250ZW50Pzogc3RyaW5nID0gJyc7XG4gIHdpZHRoPzogc3RyaW5nID0gJyc7XG4gIGlzU29ydGFibGU/OiBib29sZWFuID0gdHJ1ZTtcbiAgaXNFZGl0YWJsZT86IGJvb2xlYW4gPSB0cnVlO1xuICBpc0FkZGFibGU/OiBib29sZWFuID0gdHJ1ZTtcbiAgaXNGaWx0ZXJhYmxlPzogYm9vbGVhbiA9IGZhbHNlO1xuICBzb3J0RGlyZWN0aW9uOiBJU29ydERpcmVjdGlvbiA9ICdhc2MnO1xuICBkZWZhdWx0U29ydERpcmVjdGlvbj86IElTb3J0RGlyZWN0aW9uID0gdW5kZWZpbmVkO1xuICBlZGl0b3I/OiB7IHR5cGU6IHN0cmluZywgY29uZmlnOiBhbnksIGNvbXBvbmVudDogYW55IH0gPSB7dHlwZTogJycsIGNvbmZpZzoge30sIGNvbXBvbmVudDogbnVsbH07XG4gIGZpbHRlcj86IHsgdHlwZTogc3RyaW5nLCBjb25maWc6IGFueSwgY29tcG9uZW50OiBhbnkgfSA9IHt0eXBlOiAnJywgY29uZmlnOiB7fSwgY29tcG9uZW50OiBudWxsfTtcbiAgcmVuZGVyQ29tcG9uZW50PzogYW55ID0gbnVsbDtcbiAgY29tcGFyZUZ1bmN0aW9uPzogRnVuY3Rpb247XG4gIHZhbHVlUHJlcGFyZUZ1bmN0aW9uPzogQ29sdW1uVmFsdWVQcmVwYXJlRnVuY3Rpb247XG4gIGZpbHRlckZ1bmN0aW9uPzogQ29sdW1uRmlsdGVyRnVuY3Rpb247XG4gIG9uQ29tcG9uZW50SW5pdEZ1bmN0aW9uPzogRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3IocHVibGljIGlkOiBzdHJpbmcsIHByb3RlY3RlZCBzZXR0aW5nczogYW55LCBwcm90ZWN0ZWQgZGF0YVNldDogRGF0YVNldCkge1xuICAgIHRoaXMucHJvY2VzcygpO1xuICB9XG5cbiAgZ2V0T25Db21wb25lbnRJbml0RnVuY3Rpb24oKTogRnVuY3Rpb24gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLm9uQ29tcG9uZW50SW5pdEZ1bmN0aW9uO1xuICB9XG5cbiAgZ2V0Q29tcGFyZUZ1bmN0aW9uKCk6IEZ1bmN0aW9uIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5jb21wYXJlRnVuY3Rpb247XG4gIH1cblxuICBnZXRWYWx1ZVByZXBhcmVGdW5jdGlvbigpOiBGdW5jdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMudmFsdWVQcmVwYXJlRnVuY3Rpb247XG4gIH1cblxuICBnZXRGaWx0ZXJGdW5jdGlvbigpOiBGdW5jdGlvbiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyRnVuY3Rpb247XG4gIH1cblxuICBnZXRDb25maWcoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuY29uZmlnO1xuICB9XG5cbiAgZ2V0RmlsdGVyVHlwZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLmZpbHRlciAmJiB0aGlzLmZpbHRlci50eXBlO1xuICB9XG5cbiAgZ2V0RmlsdGVyQ29uZmlnKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuZmlsdGVyICYmIHRoaXMuZmlsdGVyLmNvbmZpZztcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgYSBzZXR0aW5nIGJ5IG5hbWUuXG4gICAqXG4gICAqIEBwYXJhbSBrZXkgdGhlIGN1cnJlbnQga2V5IG5hbWVcbiAgICogQHBhcmFtIGNvbXBhdEtleXMga2V5IG5hbWVzIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBsb29rdXBTZXR0aW5nPFQ+KGtleTogc3RyaW5nLCBjb21wYXRLZXlzOiBzdHJpbmdbXSA9IFtdKTogVCB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzW2tleV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgZm9yIChjb25zdCBrIG9mIGNvbXBhdEtleXMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnNldHRpbmdzW2tdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5zZXR0aW5nc1trXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0dGluZ3Nba2V5XSBhcyBUO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBwcm9jZXNzKCkge1xuICAgIC8vIHRoZSBwYXR0ZXJuIGlzIFwiWCA9IGxvb2t1cChrZXkpID8/IFhcIiAtIHRoaXMga2VlcHMgdGhlIGRlZmF1bHQgdmFsdWUgaW4gY2FzZSB0aGUgc2V0dGluZyBpcyB1bmRlZmluZWRcblxuICAgIHRoaXMucGxhY2Vob2xkZXIgPSB0aGlzLmxvb2t1cFNldHRpbmcoJ3BsYWNlaG9sZGVyJyk7XG4gICAgdGhpcy5zYW5pdGl6ZXIgPSB0aGlzLmxvb2t1cFNldHRpbmcoJ3Nhbml0aXplcicpID8/IHt9O1xuICAgIHRoaXMudGl0bGUgPSB0aGlzLmxvb2t1cFNldHRpbmcoJ3RpdGxlJykgPz8gdGhpcy50aXRsZTtcbiAgICB0aGlzLmNsYXNzSGVhZGVyID0gdGhpcy5sb29rdXBTZXR0aW5nKCdjbGFzc0hlYWRlcicsIFsnY2xhc3MnXSkgPz8gdGhpcy5jbGFzc0hlYWRlcjtcbiAgICB0aGlzLmNsYXNzQ29udGVudCA9IHRoaXMubG9va3VwU2V0dGluZygnY2xhc3NDb250ZW50JywgWydjbGFzcyddKSA/PyB0aGlzLmNsYXNzQ29udGVudDtcbiAgICB0aGlzLndpZHRoID0gdGhpcy5sb29rdXBTZXR0aW5nKCd3aWR0aCcpID8/IHRoaXMud2lkdGg7XG4gICAgdGhpcy5oaWRlID0gdGhpcy5sb29rdXBTZXR0aW5nKCdoaWRlJykgPz8gdGhpcy5oaWRlO1xuICAgIHRoaXMudHlwZSA9IHRoaXMubG9va3VwU2V0dGluZygndHlwZScpID8/IHRoaXMuZGV0ZXJtaW5lVHlwZSgpO1xuICAgIHRoaXMuZWRpdG9yID0gdGhpcy5sb29rdXBTZXR0aW5nKCdlZGl0b3InKSA/PyB0aGlzLmVkaXRvcjtcbiAgICB0aGlzLmZpbHRlciA9IHRoaXMubG9va3VwU2V0dGluZygnZmlsdGVyJykgPz8gdGhpcy5maWx0ZXI7XG4gICAgdGhpcy5yZW5kZXJDb21wb25lbnQgPSB0aGlzLmxvb2t1cFNldHRpbmcoJ3JlbmRlckNvbXBvbmVudCcpID8/IHRoaXMucmVuZGVyQ29tcG9uZW50O1xuXG4gICAgdGhpcy5pc0ZpbHRlcmFibGUgPSB0aGlzLmZpbHRlciAhPT0gdW5kZWZpbmVkICYmICEhdGhpcy5maWx0ZXI7XG4gICAgdGhpcy5pc1NvcnRhYmxlID0gdGhpcy5sb29rdXBTZXR0aW5nKCdpc1NvcnRhYmxlJywgWydzb3J0J10pID8/IHRoaXMuaXNTb3J0YWJsZTtcbiAgICB0aGlzLmlzRWRpdGFibGUgPSB0aGlzLmxvb2t1cFNldHRpbmcoJ2lzRWRpdGFibGUnLCBbJ2VkaXRhYmxlJ10pID8/IHRoaXMuaXNFZGl0YWJsZTtcbiAgICB0aGlzLmlzQWRkYWJsZSA9IHRoaXMubG9va3VwU2V0dGluZygnaXNBZGRhYmxlJykgPz8gdGhpcy5pc0FkZGFibGU7XG4gICAgdGhpcy5kZWZhdWx0U29ydERpcmVjdGlvbiA9IHRoaXMubG9va3VwU2V0dGluZygnc29ydERpcmVjdGlvbicpID8/IHRoaXMuZGVmYXVsdFNvcnREaXJlY3Rpb247XG4gICAgdGhpcy5zb3J0RGlyZWN0aW9uID0gdGhpcy5kZWZhdWx0U29ydERpcmVjdGlvbiA/PyB0aGlzLnNvcnREaXJlY3Rpb247XG5cbiAgICB0aGlzLmNvbXBhcmVGdW5jdGlvbiA9IHRoaXMubG9va3VwU2V0dGluZygnY29tcGFyZUZ1bmN0aW9uJyk7XG4gICAgdGhpcy52YWx1ZVByZXBhcmVGdW5jdGlvbiA9IHRoaXMubG9va3VwU2V0dGluZygndmFsdWVQcmVwYXJlRnVuY3Rpb24nKTtcbiAgICB0aGlzLmZpbHRlckZ1bmN0aW9uID0gdGhpcy5sb29rdXBTZXR0aW5nKCdmaWx0ZXJGdW5jdGlvbicpO1xuICAgIHRoaXMub25Db21wb25lbnRJbml0RnVuY3Rpb24gPSB0aGlzLmxvb2t1cFNldHRpbmcoJ29uQ29tcG9uZW50SW5pdEZ1bmN0aW9uJyk7XG4gIH1cblxuICBkZXRlcm1pbmVUeXBlKCk6IElDb2x1bW5UeXBlIHtcbiAgICAvLyBUT0RPOiBkZXRlcm1pbmUgdHlwZSBieSBkYXRhXG4gICAgcmV0dXJuIElDb2x1bW5UeXBlLlRleHQ7XG4gIH1cbn1cbiJdfQ==