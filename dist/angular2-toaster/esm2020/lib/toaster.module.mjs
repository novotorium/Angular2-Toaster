import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { ToasterContainerComponent } from './toaster-container.component';
import { ToasterService } from './toaster.service';
import { TrustHtmlPipe } from './trust-html.pipe';
import * as i0 from "@angular/core";
export class ToasterModule {
    static forRoot() {
        return {
            ngModule: ToasterModule,
            providers: [ToasterService, ToasterContainerComponent]
        };
    }
    static forChild() {
        return {
            ngModule: ToasterModule,
            providers: [ToasterContainerComponent]
        };
    }
}
ToasterModule.ɵfac = function ToasterModule_Factory(t) { return new (t || ToasterModule)(); };
ToasterModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ToasterModule });
ToasterModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [[CommonModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToasterModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [
                    ToastComponent,
                    ToasterContainerComponent,
                    TrustHtmlPipe
                ],
                exports: [
                    ToasterContainerComponent,
                    ToastComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ToasterModule, { declarations: [ToastComponent,
        ToasterContainerComponent,
        TrustHtmlPipe], imports: [CommonModule], exports: [ToasterContainerComponent,
        ToastComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYW5ndWxhcjItdG9hc3Rlci9zcmMvbGliL3RvYXN0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFjbEQsTUFBTSxPQUFPLGFBQWE7SUFDdEIsTUFBTSxDQUFDLE9BQU87UUFDVixPQUFPO1lBQ0gsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMsY0FBYyxFQUFFLHlCQUF5QixDQUFDO1NBQ3pELENBQUE7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPO1lBQ0gsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDekMsQ0FBQTtJQUNMLENBQUM7OzBFQWJRLGFBQWE7K0RBQWIsYUFBYTttRUFYYixDQUFDLFlBQVksQ0FBQzt1RkFXZCxhQUFhO2NBWnpCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3ZCLFlBQVksRUFBRTtvQkFDVixjQUFjO29CQUNkLHlCQUF5QjtvQkFDekIsYUFBYTtpQkFDaEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLHlCQUF5QjtvQkFDekIsY0FBYztpQkFDakI7YUFDSjs7d0ZBQ1ksYUFBYSxtQkFUbEIsY0FBYztRQUNkLHlCQUF5QjtRQUN6QixhQUFhLGFBSlAsWUFBWSxhQU9sQix5QkFBeUI7UUFDekIsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IFRvYXN0Q29tcG9uZW50IH0gZnJvbSAnLi90b2FzdC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUb2FzdGVyQ29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi90b2FzdGVyLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUb2FzdGVyU2VydmljZSB9IGZyb20gJy4vdG9hc3Rlci5zZXJ2aWNlJztcclxuaW1wb3J0IHsgVHJ1c3RIdG1sUGlwZSB9IGZyb20gJy4vdHJ1c3QtaHRtbC5waXBlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIFRvYXN0Q29tcG9uZW50LFxyXG4gICAgICAgIFRvYXN0ZXJDb250YWluZXJDb21wb25lbnQsXHJcbiAgICAgICAgVHJ1c3RIdG1sUGlwZVxyXG4gICAgXSxcclxuICAgIGV4cG9ydHM6IFtcclxuICAgICAgICBUb2FzdGVyQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgICAgIFRvYXN0Q29tcG9uZW50XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb2FzdGVyTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VG9hc3Rlck1vZHVsZT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBUb2FzdGVyTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtUb2FzdGVyU2VydmljZSwgVG9hc3RlckNvbnRhaW5lckNvbXBvbmVudF1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIGZvckNoaWxkKCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VG9hc3Rlck1vZHVsZT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBUb2FzdGVyTW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtUb2FzdGVyQ29udGFpbmVyQ29tcG9uZW50XVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuIH1cclxuIl19