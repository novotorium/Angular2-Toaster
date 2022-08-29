import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class TrustHtmlPipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(content) {
        return this.sanitizer.bypassSecurityTrustHtml(content);
    }
}
TrustHtmlPipe.ɵfac = function TrustHtmlPipe_Factory(t) { return new (t || TrustHtmlPipe)(i0.ɵɵdirectiveInject(i1.DomSanitizer, 16)); };
TrustHtmlPipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "trustHtml", type: TrustHtmlPipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TrustHtmlPipe, [{
        type: Pipe,
        args: [{
                name: 'trustHtml',
                pure: true
            }]
    }], function () { return [{ type: i1.DomSanitizer }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJ1c3QtaHRtbC5waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90cnVzdC1odG1sLnBpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7OztBQU9wRCxNQUFNLE9BQU8sYUFBYTtJQUN0QixZQUFvQixTQUF1QjtRQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO0lBQzNDLENBQUM7SUFFRCxTQUFTLENBQUMsT0FBWTtRQUNsQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDM0QsQ0FBQzs7MEVBTlEsYUFBYTsrRUFBYixhQUFhO3VGQUFiLGFBQWE7Y0FKekIsSUFBSTtlQUFDO2dCQUNGLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsSUFBSTthQUNiIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVIdG1sIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcblxyXG5AUGlwZSh7XHJcbiAgICBuYW1lOiAndHJ1c3RIdG1sJyxcclxuICAgIHB1cmU6IHRydWVcclxufSlcclxuZXhwb3J0IGNsYXNzIFRydXN0SHRtbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm0oY29udGVudDogYW55KTogU2FmZUh0bWwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChjb250ZW50KTtcclxuICAgIH1cclxufVxyXG4iXX0=