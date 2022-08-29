import { Component, Input, Output, ViewChild, ViewContainerRef, EventEmitter, HostListener } from '@angular/core';
import { BodyOutputType } from './bodyOutputType';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./trust-html.pipe";
const _c0 = ["componentBody"];
const _c1 = ["toastComp", ""];
function ToastComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", null, 7);
} }
function ToastComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 8);
    i0.ɵɵpipe(1, "trustHtml");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r1.toast.body), i0.ɵɵsanitizeHtml);
} }
function ToastComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r2.toast.body);
} }
function ToastComponent_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 9);
    i0.ɵɵlistener("click", function ToastComponent_button_7_Template_button_click_0_listener($event) { i0.ɵɵrestoreView(_r7); const ctx_r6 = i0.ɵɵnextContext(); return ctx_r6.click($event, ctx_r6.toast); });
    i0.ɵɵpipe(1, "trustHtml");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(1, 1, ctx_r3.toast.closeHtml), i0.ɵɵsanitizeHtml);
} }
function ToastComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵelement(1, "div", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵstyleProp("width", ctx_r4.progressBarWidth + "%");
} }
export class ToastComponent {
    constructor(componentFactoryResolver, changeDetectorRef, ngZone, element, renderer2) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.changeDetectorRef = changeDetectorRef;
        this.ngZone = ngZone;
        this.element = element;
        this.renderer2 = renderer2;
        this.progressBarWidth = -1;
        this.bodyOutputType = BodyOutputType;
        this.clickEvent = new EventEmitter();
        this.removeToastEvent = new EventEmitter();
        this.timeoutId = null;
        this.timeout = 0;
        this.progressBarIntervalId = null;
    }
    ngOnInit() {
        if (this.toast.progressBar) {
            this.toast.progressBarDirection = this.toast.progressBarDirection || 'decreasing';
        }
        let timeout = (typeof this.toast.timeout === 'number')
            ? this.toast.timeout : this.toasterconfig.timeout;
        if (typeof timeout === 'object') {
            timeout = timeout[this.toast.type];
        }
        ;
        this.timeout = timeout;
    }
    ngAfterViewInit() {
        if (this.toast.bodyOutputType === this.bodyOutputType.Component) {
            const component = this.componentFactoryResolver.resolveComponentFactory(this.toast.body);
            const componentInstance = this.componentBody.createComponent(component, undefined, this.componentBody.injector);
            componentInstance.instance.toast = this.toast;
            this.changeDetectorRef.detectChanges();
        }
        if (this.toasterconfig.mouseoverTimerStop) {
            // only apply a mouseenter event when necessary to avoid
            // unnecessary event and change detection cycles.
            this.removeMouseOverListener = this.renderer2.listen(this.element.nativeElement, 'mouseenter', () => this.stopTimer());
        }
        this.configureTimer();
    }
    click(event, toast) {
        event.stopPropagation();
        this.clickEvent.emit({ value: { toast: toast, isCloseButton: true } });
    }
    stopTimer() {
        this.progressBarWidth = 0;
        this.clearTimers();
    }
    restartTimer() {
        if (this.toasterconfig.mouseoverTimerStop) {
            if (!this.timeoutId) {
                this.configureTimer();
            }
        }
        else if (this.timeout && !this.timeoutId) {
            this.removeToast();
        }
    }
    ngOnDestroy() {
        if (this.removeMouseOverListener) {
            this.removeMouseOverListener();
        }
        this.clearTimers();
    }
    configureTimer() {
        if (!this.timeout || this.timeout < 1) {
            return;
        }
        if (this.toast.progressBar) {
            this.removeToastTick = new Date().getTime() + this.timeout;
            this.progressBarWidth = -1;
        }
        this.ngZone.runOutsideAngular(() => {
            this.timeoutId = window.setTimeout(() => {
                this.ngZone.run(() => {
                    this.changeDetectorRef.markForCheck();
                    this.removeToast();
                });
            }, this.timeout);
            if (this.toast.progressBar) {
                this.progressBarIntervalId = window.setInterval(() => {
                    this.ngZone.run(() => {
                        this.updateProgressBar();
                    });
                }, 10);
            }
        });
    }
    updateProgressBar() {
        if (this.progressBarWidth === 0 || this.progressBarWidth === 100) {
            return;
        }
        this.progressBarWidth = ((this.removeToastTick - new Date().getTime()) / this.timeout) * 100;
        if (this.toast.progressBarDirection === 'increasing') {
            this.progressBarWidth = 100 - this.progressBarWidth;
        }
        if (this.progressBarWidth < 0) {
            this.progressBarWidth = 0;
        }
        if (this.progressBarWidth > 100) {
            this.progressBarWidth = 100;
        }
    }
    clearTimers() {
        if (this.timeoutId) {
            window.clearTimeout(this.timeoutId);
        }
        if (this.progressBarIntervalId) {
            window.clearInterval(this.progressBarIntervalId);
        }
        this.timeoutId = null;
        this.progressBarIntervalId = null;
    }
    removeToast() {
        this.removeToastEvent.emit(this.toast);
    }
}
ToastComponent.ɵfac = function ToastComponent_Factory(t) { return new (t || ToastComponent)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); };
ToastComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToastComponent, selectors: [["", "toastComp", ""]], viewQuery: function ToastComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5, ViewContainerRef);
    } if (rf & 2) {
        let _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.componentBody = _t.first);
    } }, hostBindings: function ToastComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("mouseleave", function ToastComponent_mouseleave_HostBindingHandler() { return ctx.restartTimer(); });
    } }, inputs: { toasterconfig: "toasterconfig", toast: "toast", titleClass: "titleClass", messageClass: "messageClass" }, outputs: { clickEvent: "clickEvent", removeToastEvent: "removeToastEvent" }, attrs: _c1, decls: 9, vars: 9, consts: [[1, "toast-content"], [3, "ngClass"], [3, "ngClass", "ngSwitch"], [4, "ngSwitchCase"], [3, "innerHTML", 4, "ngSwitchCase"], ["class", "toast-close-button", 3, "innerHTML", "click", 4, "ngIf"], [4, "ngIf"], ["componentBody", ""], [3, "innerHTML"], [1, "toast-close-button", 3, "innerHTML", "click"], [1, "toast-progress-bar"]], template: function ToastComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1);
        i0.ɵɵtext(2);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "div", 2);
        i0.ɵɵtemplate(4, ToastComponent_div_4_Template, 2, 0, "div", 3);
        i0.ɵɵtemplate(5, ToastComponent_div_5_Template, 2, 3, "div", 4);
        i0.ɵɵtemplate(6, ToastComponent_div_6_Template, 2, 1, "div", 3);
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(7, ToastComponent_button_7_Template, 2, 3, "button", 5);
        i0.ɵɵtemplate(8, ToastComponent_div_8_Template, 2, 2, "div", 6);
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.titleClass);
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.toast.title);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngClass", ctx.messageClass)("ngSwitch", ctx.toast.bodyOutputType);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.Component);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.TrustedHtml);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngSwitchCase", ctx.bodyOutputType.Default);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.toast.showCloseButton);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.toast.progressBar);
    } }, directives: [i1.NgClass, i1.NgSwitch, i1.NgSwitchCase, i1.NgIf], pipes: [i2.TrustHtmlPipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToastComponent, [{
        type: Component,
        args: [{
                selector: '[toastComp]',
                template: `
        <div class="toast-content">
            <div [ngClass]="titleClass">{{toast.title}}</div>
            <div [ngClass]="messageClass" [ngSwitch]="toast.bodyOutputType">
                <div *ngSwitchCase="bodyOutputType.Component" #componentBody></div>
                <div *ngSwitchCase="bodyOutputType.TrustedHtml" [innerHTML]="toast.body | trustHtml"></div>
                <div *ngSwitchCase="bodyOutputType.Default">{{toast.body}}</div>
            </div>
        </div>
        <button class="toast-close-button" *ngIf="toast.showCloseButton" (click)="click($event, toast)"
            [innerHTML]="toast.closeHtml | trustHtml">
        </button>
        <div *ngIf="toast.progressBar">
            <div class="toast-progress-bar" [style.width]="progressBarWidth + '%'"></div>
        </div>`
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, { toasterconfig: [{
            type: Input
        }], toast: [{
            type: Input
        }], titleClass: [{
            type: Input
        }], messageClass: [{
            type: Input
        }], componentBody: [{
            type: ViewChild,
            args: ['componentBody', { read: ViewContainerRef, static: false }]
        }], clickEvent: [{
            type: Output
        }], removeToastEvent: [{
            type: Output
        }], restartTimer: [{
            type: HostListener,
            args: ['mouseleave']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsWUFBWSxFQU1aLFlBQVksRUFJZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7SUFTbEMsK0JBQW1FOzs7SUFDbkUseUJBQTJGOzs7O0lBQTNDLHNGQUFvQzs7O0lBQ3BGLDJCQUE0QztJQUFBLFlBQWM7SUFBQSxpQkFBTTs7O0lBQXBCLGVBQWM7SUFBZCx1Q0FBYzs7OztJQUdsRSxpQ0FDOEM7SUFEbUIsb0tBQVMsa0NBQW9CLElBQUM7O0lBRS9GLGlCQUFTOzs7SUFETCwyRkFBeUM7OztJQUU3QywyQkFBK0I7SUFDM0IsMEJBQTZFO0lBQ2pGLGlCQUFNOzs7SUFEOEIsZUFBc0M7SUFBdEMsc0RBQXNDOztBQUdsRixNQUFNLE9BQU8sY0FBYztJQXNCdkIsWUFDVSx3QkFBa0QsRUFDbEQsaUJBQW9DLEVBQ3BDLE1BQWMsRUFDZCxPQUFtQixFQUNuQixTQUFvQjtRQUpwQiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFDcEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFDbkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQXBCdkIscUJBQWdCLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDOUIsbUJBQWMsR0FBRyxjQUFjLENBQUM7UUFHaEMsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVB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LGFBQUE7UUFDSyxZQUFlO1FBQUEsaUJBQU07UUFDakQsOEJBQWdFO1FBQzVELCtEQUFtRTtRQUNuRSwrREFBMkY7UUFDM0YsK0RBQWdFO1FBQ3BFLGlCQUFNLEVBQUE7UUFFVixxRUFFUztRQUNULCtEQUVNOztRQVpHLGVBQXNCO1FBQXRCLHdDQUFzQjtRQUFDLGVBQWU7UUFBZixxQ0FBZTtRQUN0QyxlQUF3QjtRQUF4QiwwQ0FBd0Isc0NBQUE7UUFDbkIsZUFBc0M7UUFBdEMsMkRBQXNDO1FBQ3RDLGVBQXdDO1FBQXhDLDZEQUF3QztRQUN4QyxlQUFvQztRQUFwQyx5REFBb0M7UUFHZCxlQUEyQjtRQUEzQixnREFBMkI7UUFHekQsZUFBdUI7UUFBdkIsNENBQXVCOzt1RkFJeEIsY0FBYztjQWxCMUIsU0FBUztlQUFDO2dCQUNQLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7O2VBY0M7YUFDZDtpTEFFWSxhQUFhO2tCQUFyQixLQUFLO1lBQ0csS0FBSztrQkFBYixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFDaUUsYUFBYTtrQkFBbkYsU0FBUzttQkFBQyxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtZQU05RCxVQUFVO2tCQURoQixNQUFNO1lBR0EsZ0JBQWdCO2tCQUR0QixNQUFNO1lBaUVQLFlBQVk7a0JBRFgsWUFBWTttQkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIENvbXBvbmVudCwgXHJcbiAgICBJbnB1dCwgXHJcbiAgICBPdXRwdXQsIFxyXG4gICAgVmlld0NoaWxkLCBcclxuICAgIFZpZXdDb250YWluZXJSZWYsIFxyXG4gICAgRXZlbnRFbWl0dGVyLFxyXG4gICAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBcclxuICAgIENoYW5nZURldGVjdG9yUmVmLCBcclxuICAgIE9uSW5pdCwgXHJcbiAgICBBZnRlclZpZXdJbml0LCBcclxuICAgIE9uRGVzdHJveSxcclxuICAgIEhvc3RMaXN0ZW5lcixcclxuICAgIE5nWm9uZSwgXHJcbiAgICBFbGVtZW50UmVmLFxyXG4gICAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi90b2FzdCc7XHJcbmltcG9ydCB7IEJvZHlPdXRwdXRUeXBlIH0gZnJvbSAnLi9ib2R5T3V0cHV0VHlwZSc7XHJcbmltcG9ydCB7IFRvYXN0ZXJDb25maWcgfSBmcm9tICcuL3RvYXN0ZXItY29uZmlnJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdbdG9hc3RDb21wXScsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwidGl0bGVDbGFzc1wiPnt7dG9hc3QudGl0bGV9fTwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIm1lc3NhZ2VDbGFzc1wiIFtuZ1N3aXRjaF09XCJ0b2FzdC5ib2R5T3V0cHV0VHlwZVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiYm9keU91dHB1dFR5cGUuQ29tcG9uZW50XCIgI2NvbXBvbmVudEJvZHk+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJib2R5T3V0cHV0VHlwZS5UcnVzdGVkSHRtbFwiIFtpbm5lckhUTUxdPVwidG9hc3QuYm9keSB8IHRydXN0SHRtbFwiPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiAqbmdTd2l0Y2hDYXNlPVwiYm9keU91dHB1dFR5cGUuRGVmYXVsdFwiPnt7dG9hc3QuYm9keX19PC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJ0b2FzdC1jbG9zZS1idXR0b25cIiAqbmdJZj1cInRvYXN0LnNob3dDbG9zZUJ1dHRvblwiIChjbGljayk9XCJjbGljaygkZXZlbnQsIHRvYXN0KVwiXHJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwidG9hc3QuY2xvc2VIdG1sIHwgdHJ1c3RIdG1sXCI+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPGRpdiAqbmdJZj1cInRvYXN0LnByb2dyZXNzQmFyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b2FzdC1wcm9ncmVzcy1iYXJcIiBbc3R5bGUud2lkdGhdPVwicHJvZ3Jlc3NCYXJXaWR0aCArICclJ1wiPjwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmBcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvYXN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gICAgQElucHV0KCkgdG9hc3RlcmNvbmZpZzogVG9hc3RlckNvbmZpZztcclxuICAgIEBJbnB1dCgpIHRvYXN0OiBUb2FzdDtcclxuICAgIEBJbnB1dCgpIHRpdGxlQ2xhc3M6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIG1lc3NhZ2VDbGFzczogc3RyaW5nO1xyXG4gICAgQFZpZXdDaGlsZCgnY29tcG9uZW50Qm9keScsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZiwgc3RhdGljOiBmYWxzZSB9KSBjb21wb25lbnRCb2R5OiBWaWV3Q29udGFpbmVyUmVmO1xyXG5cclxuICAgIHB1YmxpYyBwcm9ncmVzc0JhcldpZHRoOiBudW1iZXIgPSAtMTtcclxuICAgIHB1YmxpYyBib2R5T3V0cHV0VHlwZSA9IEJvZHlPdXRwdXRUeXBlO1xyXG5cclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIGNsaWNrRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgICBAT3V0cHV0KClcclxuICAgIHB1YmxpYyByZW1vdmVUb2FzdEV2ZW50ID0gbmV3IEV2ZW50RW1pdHRlcjxUb2FzdD4oKTtcclxuXHJcbiAgICBwcml2YXRlIHRpbWVvdXRJZD86IG51bWJlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIHRpbWVvdXQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIHByb2dyZXNzQmFySW50ZXJ2YWxJZD86IG51bWJlciA9IG51bGw7XHJcbiAgICBwcml2YXRlIHJlbW92ZVRvYXN0VGljazogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlTW91c2VPdmVyTGlzdGVuZXI6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxyXG4gICAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgIHByaXZhdGUgcmVuZGVyZXIyOiBSZW5kZXJlcjJcclxuICAgICkge31cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0Jhcikge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0LnByb2dyZXNzQmFyRGlyZWN0aW9uID0gdGhpcy50b2FzdC5wcm9ncmVzc0JhckRpcmVjdGlvbiB8fCAnZGVjcmVhc2luZyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdGltZW91dCA9ICh0eXBlb2YgdGhpcy50b2FzdC50aW1lb3V0ID09PSAnbnVtYmVyJylcclxuICAgICAgICAgICAgPyB0aGlzLnRvYXN0LnRpbWVvdXQgOiB0aGlzLnRvYXN0ZXJjb25maWcudGltZW91dDtcclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aW1lb3V0ID09PSAnb2JqZWN0JykgeyBcclxuICAgICAgICAgICAgdGltZW91dCA9IHRpbWVvdXRbdGhpcy50b2FzdC50eXBlXTsgXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gdGltZW91dDtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudG9hc3QuYm9keU91dHB1dFR5cGUgPT09IHRoaXMuYm9keU91dHB1dFR5cGUuQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMudG9hc3QuYm9keSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudEluc3RhbmNlOiBhbnkgPSB0aGlzLmNvbXBvbmVudEJvZHkuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCwgdW5kZWZpbmVkLCB0aGlzLmNvbXBvbmVudEJvZHkuaW5qZWN0b3IpO1xyXG4gICAgICAgICAgICBjb21wb25lbnRJbnN0YW5jZS5pbnN0YW5jZS50b2FzdCA9IHRoaXMudG9hc3Q7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG9hc3RlcmNvbmZpZy5tb3VzZW92ZXJUaW1lclN0b3ApIHtcclxuICAgICAgICAgICAgLy8gb25seSBhcHBseSBhIG1vdXNlZW50ZXIgZXZlbnQgd2hlbiBuZWNlc3NhcnkgdG8gYXZvaWRcclxuICAgICAgICAgICAgLy8gdW5uZWNlc3NhcnkgZXZlbnQgYW5kIGNoYW5nZSBkZXRlY3Rpb24gY3ljbGVzLlxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1vdXNlT3Zlckxpc3RlbmVyID0gdGhpcy5yZW5kZXJlcjIubGlzdGVuKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIFxyXG4gICAgICAgICAgICAgICAgJ21vdXNlZW50ZXInLCBcclxuICAgICAgICAgICAgICAgICgpID0+IHRoaXMuc3RvcFRpbWVyKClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlndXJlVGltZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGljayhldmVudDogTW91c2VFdmVudCwgdG9hc3Q6IFRvYXN0KSB7XHJcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5jbGlja0V2ZW50LmVtaXQoeyB2YWx1ZSA6IHsgdG9hc3Q6IHRvYXN0LCBpc0Nsb3NlQnV0dG9uOiB0cnVlIH0gfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RvcFRpbWVyKCkge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9IDA7XHJcbiAgICAgICAgdGhpcy5jbGVhclRpbWVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKSBcclxuICAgIHJlc3RhcnRUaW1lcigpIHtcclxuICAgICAgICBpZiAodGhpcy50b2FzdGVyY29uZmlnLm1vdXNlb3ZlclRpbWVyU3RvcCkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGltZW91dElkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZ3VyZVRpbWVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGltZW91dCAmJiAhdGhpcy50aW1lb3V0SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5yZW1vdmVNb3VzZU92ZXJMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZU1vdXNlT3Zlckxpc3RlbmVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbmZpZ3VyZVRpbWVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy50aW1lb3V0IHx8IHRoaXMudGltZW91dCA8IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG9hc3QucHJvZ3Jlc3NCYXIpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdFRpY2sgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSArIHRoaXMudGltZW91dDtcclxuICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gLTE7XHJcbiAgICAgICAgfSBcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudGltZW91dElkID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVG9hc3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCB0aGlzLnRpbWVvdXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHRoaXMudG9hc3QucHJvZ3Jlc3NCYXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJJbnRlcnZhbElkID0gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzQmFyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHVwZGF0ZVByb2dyZXNzQmFyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFyV2lkdGggPT09IDAgfHwgdGhpcy5wcm9ncmVzc0JhcldpZHRoID09PSAxMDApIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9ICgodGhpcy5yZW1vdmVUb2FzdFRpY2sgLSBuZXcgRGF0ZSgpLmdldFRpbWUoKSkgLyB0aGlzLnRpbWVvdXQpICogMTAwO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGlmICh0aGlzLnRvYXN0LnByb2dyZXNzQmFyRGlyZWN0aW9uID09PSAnaW5jcmVhc2luZycpIHtcclxuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9IDEwMCAtIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA8IDApIHtcclxuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFyV2lkdGggPiAxMDApIHtcclxuICAgICAgICAgIHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9IDEwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhclRpbWVycygpIHtcclxuICAgICAgICBpZiAodGhpcy50aW1lb3V0SWQpIHtcclxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXRJZClcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnByb2dyZXNzQmFySW50ZXJ2YWxJZCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJJbnRlcnZhbCh0aGlzLnByb2dyZXNzQmFySW50ZXJ2YWxJZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRpbWVvdXRJZCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhckludGVydmFsSWQgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlVG9hc3QoKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVUb2FzdEV2ZW50LmVtaXQodGhpcy50b2FzdCk7XHJcbiAgICB9XHJcbn1cclxuIl19