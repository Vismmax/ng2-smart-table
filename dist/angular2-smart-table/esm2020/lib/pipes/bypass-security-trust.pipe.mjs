import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class BypassSecurityTrustPipe {
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
BypassSecurityTrustPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: BypassSecurityTrustPipe, deps: [{ token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Pipe });
BypassSecurityTrustPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: BypassSecurityTrustPipe, name: "bypassSecurityTrust" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.12", ngImport: i0, type: BypassSecurityTrustPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'bypassSecurityTrust'
                }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnlwYXNzLXNlY3VyaXR5LXRydXN0LnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9hbmd1bGFyMi1zbWFydC10YWJsZS9zcmMvbGliL3BpcGVzL2J5cGFzcy1zZWN1cml0eS10cnVzdC5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDOzs7QUFRbEQsTUFBTSxPQUFPLHVCQUF1QjtJQUVsQyxZQUFzQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQUcsQ0FBQztJQUUxQyxTQUFTLENBQUMsS0FBYSxFQUFFLElBQXVCO1FBQ3JELFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxNQUFNLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEUsS0FBSyxPQUFPLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEUsS0FBSyxRQUFRLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEUsS0FBSyxLQUFLLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEUsS0FBSyxhQUFhLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEYsS0FBSyxNQUFNLENBQUMsQ0FBQyxPQUFPLEtBQUssQ0FBQztTQUMzQjtJQUNILENBQUM7O3FIQWJVLHVCQUF1QjttSEFBdkIsdUJBQXVCOzRGQUF2Qix1QkFBdUI7a0JBSG5DLElBQUk7bUJBQUM7b0JBQ0osSUFBSSxFQUFFLHFCQUFxQjtpQkFDNUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVIdG1sLCBTYWZlUmVzb3VyY2VVcmwsIFNhZmVTY3JpcHQsIFNhZmVTdHlsZSwgU2FmZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmV4cG9ydCB0eXBlIFNlY3VyaXR5VHJ1c3RUeXBlID0gJ2h0bWwnfCdzdHlsZSd8J3NjcmlwdCd8J3VybCd8J3Jlc291cmNlVXJsJ3wnbm9uZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2J5cGFzc1NlY3VyaXR5VHJ1c3QnXG59KVxuZXhwb3J0IGNsYXNzIEJ5cGFzc1NlY3VyaXR5VHJ1c3RQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIHB1YmxpYyB0cmFuc2Zvcm0odmFsdWU6IHN0cmluZywgdHlwZTogU2VjdXJpdHlUcnVzdFR5cGUpOiBTYWZlSHRtbCB8IFNhZmVTdHlsZSB8IFNhZmVTY3JpcHQgfCBTYWZlVXJsIHwgU2FmZVJlc291cmNlVXJsIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2h0bWwnOiByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwodmFsdWUpO1xuICAgICAgY2FzZSAnc3R5bGUnOiByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKHZhbHVlKTtcbiAgICAgIGNhc2UgJ3NjcmlwdCc6IHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U2NyaXB0KHZhbHVlKTtcbiAgICAgIGNhc2UgJ3VybCc6IHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0VXJsKHZhbHVlKTtcbiAgICAgIGNhc2UgJ3Jlc291cmNlVXJsJzogcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh2YWx1ZSk7XG4gICAgICBjYXNlICdub25lJzogcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19