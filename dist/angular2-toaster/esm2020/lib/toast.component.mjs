import { Component, Input, Output, ViewChild, ViewContainerRef, EventEmitter, HostListener } from '@angular/core';
import { BodyOutputType } from './bodyOutputType';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./trust-html.pipe";
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
ToastComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ToastComponent, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.ChangeDetectorRef }, { token: i0.NgZone }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
ToastComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.12", type: ToastComponent, selector: "[toastComp]", inputs: { toasterconfig: "toasterconfig", toast: "toast", titleClass: "titleClass", messageClass: "messageClass" }, outputs: { clickEvent: "clickEvent", removeToastEvent: "removeToastEvent" }, host: { listeners: { "mouseleave": "restartTimer()" } }, viewQueries: [{ propertyName: "componentBody", first: true, predicate: ["componentBody"], descendants: true, read: ViewContainerRef }], ngImport: i0, template: `
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
        </div>`, isInline: true, dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i1.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "pipe", type: i2.TrustHtmlPipe, name: "trustHtml" }] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.12", ngImport: i0, type: ToastComponent, decorators: [{
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
        }], ctorParameters: function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ChangeDetectorRef }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { toasterconfig: [{
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
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsWUFBWSxFQU1aLFlBQVksRUFJZixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7QUFxQmxELE1BQU0sT0FBTyxjQUFjO0lBc0J2QixZQUNVLHdCQUFrRCxFQUNsRCxpQkFBb0MsRUFDcEMsTUFBYyxFQUNkLE9BQW1CLEVBQ25CLFNBQW9CO1FBSnBCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUNwQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNuQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBcEJ2QixxQkFBZ0IsR0FBVyxDQUFDLENBQUMsQ0FBQztRQUM5QixtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQUdoQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVoQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBUyxDQUFDO1FBRTVDLGNBQVMsR0FBWSxJQUFJLENBQUM7UUFDMUIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQiwwQkFBcUIsR0FBWSxJQUFJLENBQUM7SUFXM0MsQ0FBQztJQUVKLFFBQVE7UUFDSixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsSUFBSSxZQUFZLENBQUM7U0FDckY7UUFFRCxJ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RUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO2dCQU05RCxVQUFVO3NCQURoQixNQUFNO2dCQUdBLGdCQUFnQjtzQkFEdEIsTUFBTTtnQkFpRVAsWUFBWTtzQkFEWCxZQUFZO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LCBcclxuICAgIElucHV0LCBcclxuICAgIE91dHB1dCwgXHJcbiAgICBWaWV3Q2hpbGQsIFxyXG4gICAgVmlld0NvbnRhaW5lclJlZiwgXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsIFxyXG4gICAgT25Jbml0LCBcclxuICAgIEFmdGVyVmlld0luaXQsIFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgSG9zdExpc3RlbmVyLFxyXG4gICAgTmdab25lLCBcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICcuL3RvYXN0JztcclxuaW1wb3J0IHsgQm9keU91dHB1dFR5cGUgfSBmcm9tICcuL2JvZHlPdXRwdXRUeXBlJztcclxuaW1wb3J0IHsgVG9hc3RlckNvbmZpZyB9IGZyb20gJy4vdG9hc3Rlci1jb25maWcnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ1t0b2FzdENvbXBdJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ0aXRsZUNsYXNzXCI+e3t0b2FzdC50aXRsZX19PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwibWVzc2FnZUNsYXNzXCIgW25nU3dpdGNoXT1cInRvYXN0LmJvZHlPdXRwdXRUeXBlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJib2R5T3V0cHV0VHlwZS5Db21wb25lbnRcIiAjY29tcG9uZW50Qm9keT48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImJvZHlPdXRwdXRUeXBlLlRydXN0ZWRIdG1sXCIgW2lubmVySFRNTF09XCJ0b2FzdC5ib2R5IHwgdHJ1c3RIdG1sXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJib2R5T3V0cHV0VHlwZS5EZWZhdWx0XCI+e3t0b2FzdC5ib2R5fX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvYXN0LWNsb3NlLWJ1dHRvblwiICpuZ0lmPVwidG9hc3Quc2hvd0Nsb3NlQnV0dG9uXCIgKGNsaWNrKT1cImNsaWNrKCRldmVudCwgdG9hc3QpXCJcclxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJ0b2FzdC5jbG9zZUh0bWwgfCB0cnVzdEh0bWxcIj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwidG9hc3QucHJvZ3Jlc3NCYXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LXByb2dyZXNzLWJhclwiIFtzdHlsZS53aWR0aF09XCJwcm9ncmVzc0JhcldpZHRoICsgJyUnXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9hc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgICBASW5wdXQoKSB0b2FzdGVyY29uZmlnOiBUb2FzdGVyQ29uZmlnO1xyXG4gICAgQElucHV0KCkgdG9hc3Q6IFRvYXN0O1xyXG4gICAgQElucHV0KCkgdGl0bGVDbGFzczogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgbWVzc2FnZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBAVmlld0NoaWxkKCdjb21wb25lbnRCb2R5JywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IGZhbHNlIH0pIGNvbXBvbmVudEJvZHk6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gICAgcHVibGljIHByb2dyZXNzQmFyV2lkdGg6IG51bWJlciA9IC0xO1xyXG4gICAgcHVibGljIGJvZHlPdXRwdXRUeXBlID0gQm9keU91dHB1dFR5cGU7XHJcblxyXG4gICAgQE91dHB1dCgpXHJcbiAgICBwdWJsaWMgY2xpY2tFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIHJlbW92ZVRvYXN0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPFRvYXN0PigpO1xyXG5cclxuICAgIHByaXZhdGUgdGltZW91dElkPzogbnVtYmVyID0gbnVsbDtcclxuICAgIHByaXZhdGUgdGltZW91dDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgcHJvZ3Jlc3NCYXJJbnRlcnZhbElkPzogbnVtYmVyID0gbnVsbDtcclxuICAgIHByaXZhdGUgcmVtb3ZlVG9hc3RUaWNrOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVNb3VzZU92ZXJMaXN0ZW5lcjogKCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgcHJpdmF0ZSByZW5kZXJlcjI6IFJlbmRlcmVyMlxyXG4gICAgKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvYXN0LnByb2dyZXNzQmFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QucHJvZ3Jlc3NCYXJEaXJlY3Rpb24gPSB0aGlzLnRvYXN0LnByb2dyZXNzQmFyRGlyZWN0aW9uIHx8ICdkZWNyZWFzaW5nJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aW1lb3V0ID0gKHR5cGVvZiB0aGlzLnRvYXN0LnRpbWVvdXQgPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICA/IHRoaXMudG9hc3QudGltZW91dCA6IHRoaXMudG9hc3RlcmNvbmZpZy50aW1lb3V0O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRpbWVvdXQgPT09ICdvYmplY3QnKSB7IFxyXG4gICAgICAgICAgICB0aW1lb3V0ID0gdGltZW91dFt0aGlzLnRvYXN0LnR5cGVdOyBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy50b2FzdC5ib2R5T3V0cHV0VHlwZSA9PT0gdGhpcy5ib2R5T3V0cHV0VHlwZS5Db21wb25lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy50b2FzdC5ib2R5KTtcclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2U6IGFueSA9IHRoaXMuY29tcG9uZW50Qm9keS5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50LCB1bmRlZmluZWQsIHRoaXMuY29tcG9uZW50Qm9keS5pbmplY3Rvcik7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlLnRvYXN0ID0gdGhpcy50b2FzdDtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50b2FzdGVyY29uZmlnLm1vdXNlb3ZlclRpbWVyU3RvcCkge1xyXG4gICAgICAgICAgICAvLyBvbmx5IGFwcGx5IGEgbW91c2VlbnRlciBldmVudCB3aGVuIG5lY2Vzc2FyeSB0byBhdm9pZFxyXG4gICAgICAgICAgICAvLyB1bm5lY2Vzc2FyeSBldmVudCBhbmQgY2hhbmdlIGRldGVjdGlvbiBjeWNsZXMuXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW91c2VPdmVyTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyMi5saXN0ZW4oXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXHJcbiAgICAgICAgICAgICAgICAnbW91c2VlbnRlcicsIFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5zdG9wVGltZXIoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmVUaW1lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCB0b2FzdDogVG9hc3QpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLmNsaWNrRXZlbnQuZW1pdCh7IHZhbHVlIDogeyB0b2FzdDogdG9hc3QsIGlzQ2xvc2VCdXR0b246IHRydWUgfSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wVGltZXIoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMDtcclxuICAgICAgICB0aGlzLmNsZWFyVGltZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIFxyXG4gICAgcmVzdGFydFRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvYXN0ZXJjb25maWcubW91c2VvdmVyVGltZXJTdG9wKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50aW1lb3V0SWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJlVGltZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lb3V0ICYmICF0aGlzLnRpbWVvdXRJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlbW92ZU1vdXNlT3Zlckxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW91c2VPdmVyTGlzdGVuZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhclRpbWVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uZmlndXJlVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0IDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0Jhcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0VGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgdGhpcy50aW1lb3V0O1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyV2lkdGggPSAtMTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMudGltZW91dCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0Jhcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0JhckludGVydmFsSWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvZ3Jlc3NCYXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9PT0gMCB8fCB0aGlzLnByb2dyZXNzQmFyV2lkdGggPT09IDEwMCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gKCh0aGlzLnJlbW92ZVRvYXN0VGljayAtIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSAvIHRoaXMudGltZW91dCkgKiAxMDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMudG9hc3QucHJvZ3Jlc3NCYXJEaXJlY3Rpb24gPT09ICdpbmNyZWFzaW5nJykge1xyXG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMTAwIC0gdGhpcy5wcm9ncmVzc0JhcldpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0JhcldpZHRoIDwgMCkge1xyXG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA+IDEwMCkge1xyXG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMTAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyVGltZXJzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXRJZCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJJbnRlcnZhbElkKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMucHJvZ3Jlc3NCYXJJbnRlcnZhbElkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGltZW91dElkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFySW50ZXJ2YWxJZCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVUb2FzdCgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVRvYXN0RXZlbnQuZW1pdCh0aGlzLnRvYXN0KTtcclxuICAgIH1cclxufVxyXG4iXX0=