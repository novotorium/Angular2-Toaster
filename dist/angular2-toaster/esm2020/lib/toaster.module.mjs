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
ToasterModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ToasterModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
ToasterModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ToasterModule, declarations: [ToastComponent,
        ToasterContainerComponent,
        TrustHtmlPipe], imports: [CommonModule], exports: [ToasterContainerComponent,
        ToastComponent] });
ToasterModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ToasterModule, imports: [[CommonModule]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ToasterModule, decorators: [{
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
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYW5ndWxhcjItdG9hc3Rlci9zcmMvbGliL3RvYXN0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQzs7QUFjbEQsTUFBTSxPQUFPLGFBQWE7SUFDdEIsTUFBTSxDQUFDLE9BQU87UUFDVixPQUFPO1lBQ0gsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMsY0FBYyxFQUFFLHlCQUF5QixDQUFDO1NBQ3pELENBQUE7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVE7UUFDWCxPQUFPO1lBQ0gsUUFBUSxFQUFFLGFBQWE7WUFDdkIsU0FBUyxFQUFFLENBQUMseUJBQXlCLENBQUM7U0FDekMsQ0FBQTtJQUNMLENBQUM7OzJHQWJRLGFBQWE7NEdBQWIsYUFBYSxpQkFUbEIsY0FBYztRQUNkLHlCQUF5QjtRQUN6QixhQUFhLGFBSlAsWUFBWSxhQU9sQix5QkFBeUI7UUFDekIsY0FBYzs0R0FHVCxhQUFhLFlBWGIsQ0FBQyxZQUFZLENBQUM7NEZBV2QsYUFBYTtrQkFaekIsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRTt3QkFDVixjQUFjO3dCQUNkLHlCQUF5Qjt3QkFDekIsYUFBYTtxQkFDaEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLHlCQUF5Qjt3QkFDekIsY0FBYztxQkFDakI7aUJBQ0oiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBUb2FzdENvbXBvbmVudCB9IGZyb20gJy4vdG9hc3QuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVG9hc3RlckNvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdG9hc3Rlci1jb250YWluZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVG9hc3RlclNlcnZpY2UgfSBmcm9tICcuL3RvYXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IFRydXN0SHRtbFBpcGUgfSBmcm9tICcuL3RydXN0LWh0bWwucGlwZSc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtcclxuICAgICAgICBUb2FzdENvbXBvbmVudCxcclxuICAgICAgICBUb2FzdGVyQ29udGFpbmVyQ29tcG9uZW50LFxyXG4gICAgICAgIFRydXN0SHRtbFBpcGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgVG9hc3RlckNvbnRhaW5lckNvbXBvbmVudCxcclxuICAgICAgICBUb2FzdENvbXBvbmVudFxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9hc3Rlck1vZHVsZSB7XHJcbiAgICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRvYXN0ZXJNb2R1bGU+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogVG9hc3Rlck1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbVG9hc3RlclNlcnZpY2UsIFRvYXN0ZXJDb250YWluZXJDb21wb25lbnRdXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBmb3JDaGlsZCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRvYXN0ZXJNb2R1bGU+IHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBuZ01vZHVsZTogVG9hc3Rlck1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbVG9hc3RlckNvbnRhaW5lckNvbXBvbmVudF1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiB9XHJcbiJdfQ==