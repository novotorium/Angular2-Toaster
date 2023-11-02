import { Component, Input, Output, ViewChild, ViewContainerRef, EventEmitter, ComponentFactoryResolver, ChangeDetectorRef, HostListener, NgZone, ElementRef, Renderer2 } from '@angular/core';
import { BodyOutputType } from './bodyOutputType';
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
ToastComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
ToastComponent.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: ChangeDetectorRef },
    { type: NgZone },
    { type: ElementRef },
    { type: Renderer2 }
];
ToastComponent.propDecorators = {
    toasterconfig: [{ type: Input }],
    toast: [{ type: Input }],
    titleClass: [{ type: Input }],
    messageClass: [{ type: Input }],
    componentBody: [{ type: ViewChild, args: ['componentBody', { read: ViewContainerRef, static: false },] }],
    clickEvent: [{ type: Output }],
    removeToastEvent: [{ type: Output }],
    restartTimer: [{ type: HostListener, args: ['mouseleave',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyMi10b2FzdGVyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi90b2FzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLHdCQUF3QixFQUN4QixpQkFBaUIsRUFJakIsWUFBWSxFQUNaLE1BQU0sRUFDTixVQUFVLEVBQ1YsU0FBUyxFQUNaLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQXFCbEQsTUFBTSxPQUFPLGNBQWM7SUFzQnZCLFlBQ1Usd0JBQWtELEVBQ2xELGlCQUFvQyxFQUNwQyxNQUFjLEVBQ2QsT0FBbUIsRUFDbkIsU0FBb0I7UUFKcEIsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxzQkFBaUIsR0FBakIsaUJBQWlCLENBQW1CO1FBQ3BDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFwQnZCLHFCQUFnQixHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzlCLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBR2hDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFTLENBQUM7UUFFNUMsY0FBUyxHQUFZLElBQUksQ0FBQztRQUMxQixZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLDBCQUFxQixHQUFZLElBQUksQ0FBQztJQVczQyxDQUFDO0lBRUosUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7WUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxJ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QUU7eUJBS3BFLE1BQU07K0JBRU4sTUFBTTsyQkFnRU4sWUFBWSxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gICAgQ29tcG9uZW50LCBcclxuICAgIElucHV0LCBcclxuICAgIE91dHB1dCwgXHJcbiAgICBWaWV3Q2hpbGQsIFxyXG4gICAgVmlld0NvbnRhaW5lclJlZiwgXHJcbiAgICBFdmVudEVtaXR0ZXIsXHJcbiAgICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFxyXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsIFxyXG4gICAgT25Jbml0LCBcclxuICAgIEFmdGVyVmlld0luaXQsIFxyXG4gICAgT25EZXN0cm95LFxyXG4gICAgSG9zdExpc3RlbmVyLFxyXG4gICAgTmdab25lLCBcclxuICAgIEVsZW1lbnRSZWYsXHJcbiAgICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICcuL3RvYXN0JztcclxuaW1wb3J0IHsgQm9keU91dHB1dFR5cGUgfSBmcm9tICcuL2JvZHlPdXRwdXRUeXBlJztcclxuaW1wb3J0IHsgVG9hc3RlckNvbmZpZyB9IGZyb20gJy4vdG9hc3Rlci1jb25maWcnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ1t0b2FzdENvbXBdJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ0aXRsZUNsYXNzXCI+e3t0b2FzdC50aXRsZX19PC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgW25nQ2xhc3NdPVwibWVzc2FnZUNsYXNzXCIgW25nU3dpdGNoXT1cInRvYXN0LmJvZHlPdXRwdXRUeXBlXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJib2R5T3V0cHV0VHlwZS5Db21wb25lbnRcIiAjY29tcG9uZW50Qm9keT48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgKm5nU3dpdGNoQ2FzZT1cImJvZHlPdXRwdXRUeXBlLlRydXN0ZWRIdG1sXCIgW2lubmVySFRNTF09XCJ0b2FzdC5ib2R5IHwgdHJ1c3RIdG1sXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCJib2R5T3V0cHV0VHlwZS5EZWZhdWx0XCI+e3t0b2FzdC5ib2R5fX08L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvYXN0LWNsb3NlLWJ1dHRvblwiICpuZ0lmPVwidG9hc3Quc2hvd0Nsb3NlQnV0dG9uXCIgKGNsaWNrKT1cImNsaWNrKCRldmVudCwgdG9hc3QpXCJcclxuICAgICAgICAgICAgW2lubmVySFRNTF09XCJ0b2FzdC5jbG9zZUh0bWwgfCB0cnVzdEh0bWxcIj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwidG9hc3QucHJvZ3Jlc3NCYXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LXByb2dyZXNzLWJhclwiIFtzdHlsZS53aWR0aF09XCJwcm9ncmVzc0JhcldpZHRoICsgJyUnXCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+YFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9hc3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgICBASW5wdXQoKSB0b2FzdGVyY29uZmlnOiBUb2FzdGVyQ29uZmlnO1xyXG4gICAgQElucHV0KCkgdG9hc3Q6IFRvYXN0O1xyXG4gICAgQElucHV0KCkgdGl0bGVDbGFzczogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgbWVzc2FnZUNsYXNzOiBzdHJpbmc7XHJcbiAgICBAVmlld0NoaWxkKCdjb21wb25lbnRCb2R5JywgeyByZWFkOiBWaWV3Q29udGFpbmVyUmVmLCBzdGF0aWM6IGZhbHNlIH0pIGNvbXBvbmVudEJvZHk6IFZpZXdDb250YWluZXJSZWY7XHJcblxyXG4gICAgcHVibGljIHByb2dyZXNzQmFyV2lkdGg6IG51bWJlciA9IC0xO1xyXG4gICAgcHVibGljIGJvZHlPdXRwdXRUeXBlID0gQm9keU91dHB1dFR5cGU7XHJcblxyXG4gICAgQE91dHB1dCgpXHJcbiAgICBwdWJsaWMgY2xpY2tFdmVudCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAgIEBPdXRwdXQoKVxyXG4gICAgcHVibGljIHJlbW92ZVRvYXN0RXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPFRvYXN0PigpO1xyXG5cclxuICAgIHByaXZhdGUgdGltZW91dElkPzogbnVtYmVyID0gbnVsbDtcclxuICAgIHByaXZhdGUgdGltZW91dDogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgcHJvZ3Jlc3NCYXJJbnRlcnZhbElkPzogbnVtYmVyID0gbnVsbDtcclxuICAgIHByaXZhdGUgcmVtb3ZlVG9hc3RUaWNrOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVNb3VzZU92ZXJMaXN0ZW5lcjogKCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgcHJpdmF0ZSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICAgIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsXHJcbiAgICAgIHByaXZhdGUgZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgcHJpdmF0ZSByZW5kZXJlcjI6IFJlbmRlcmVyMlxyXG4gICAgKSB7fVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvYXN0LnByb2dyZXNzQmFyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3QucHJvZ3Jlc3NCYXJEaXJlY3Rpb24gPSB0aGlzLnRvYXN0LnByb2dyZXNzQmFyRGlyZWN0aW9uIHx8ICdkZWNyZWFzaW5nJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCB0aW1lb3V0ID0gKHR5cGVvZiB0aGlzLnRvYXN0LnRpbWVvdXQgPT09ICdudW1iZXInKVxyXG4gICAgICAgICAgICA/IHRoaXMudG9hc3QudGltZW91dCA6IHRoaXMudG9hc3RlcmNvbmZpZy50aW1lb3V0O1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRpbWVvdXQgPT09ICdvYmplY3QnKSB7IFxyXG4gICAgICAgICAgICB0aW1lb3V0ID0gdGltZW91dFt0aGlzLnRvYXN0LnR5cGVdOyBcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBpZiAodGhpcy50b2FzdC5ib2R5T3V0cHV0VHlwZSA9PT0gdGhpcy5ib2R5T3V0cHV0VHlwZS5Db21wb25lbnQpIHtcclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy50b2FzdC5ib2R5KTtcclxuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2U6IGFueSA9IHRoaXMuY29tcG9uZW50Qm9keS5jcmVhdGVDb21wb25lbnQoY29tcG9uZW50LCB1bmRlZmluZWQsIHRoaXMuY29tcG9uZW50Qm9keS5pbmplY3Rvcik7XHJcbiAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlLnRvYXN0ID0gdGhpcy50b2FzdDtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50b2FzdGVyY29uZmlnLm1vdXNlb3ZlclRpbWVyU3RvcCkge1xyXG4gICAgICAgICAgICAvLyBvbmx5IGFwcGx5IGEgbW91c2VlbnRlciBldmVudCB3aGVuIG5lY2Vzc2FyeSB0byBhdm9pZFxyXG4gICAgICAgICAgICAvLyB1bm5lY2Vzc2FyeSBldmVudCBhbmQgY2hhbmdlIGRldGVjdGlvbiBjeWNsZXMuXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW91c2VPdmVyTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyMi5saXN0ZW4oXHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgXHJcbiAgICAgICAgICAgICAgICAnbW91c2VlbnRlcicsIFxyXG4gICAgICAgICAgICAgICAgKCkgPT4gdGhpcy5zdG9wVGltZXIoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jb25maWd1cmVUaW1lcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCB0b2FzdDogVG9hc3QpIHtcclxuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLmNsaWNrRXZlbnQuZW1pdCh7IHZhbHVlIDogeyB0b2FzdDogdG9hc3QsIGlzQ2xvc2VCdXR0b246IHRydWUgfSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wVGltZXIoKSB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMDtcclxuICAgICAgICB0aGlzLmNsZWFyVGltZXJzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScpIFxyXG4gICAgcmVzdGFydFRpbWVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRvYXN0ZXJjb25maWcubW91c2VvdmVyVGltZXJTdG9wKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50aW1lb3V0SWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlndXJlVGltZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50aW1lb3V0ICYmICF0aGlzLnRpbWVvdXRJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlbW92ZU1vdXNlT3Zlckxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTW91c2VPdmVyTGlzdGVuZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jbGVhclRpbWVycygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29uZmlndXJlVGltZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRpbWVvdXQgfHwgdGhpcy50aW1lb3V0IDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0Jhcikge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0VGljayA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpICsgdGhpcy50aW1lb3V0O1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzQmFyV2lkdGggPSAtMTtcclxuICAgICAgICB9IFxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy50aW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMudGltZW91dCk7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy50b2FzdC5wcm9ncmVzc0Jhcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9ncmVzc0JhckludGVydmFsSWQgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZ3Jlc3NCYXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvZ3Jlc3NCYXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA9PT0gMCB8fCB0aGlzLnByb2dyZXNzQmFyV2lkdGggPT09IDEwMCkge1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gKCh0aGlzLnJlbW92ZVRvYXN0VGljayAtIG5ldyBEYXRlKCkuZ2V0VGltZSgpKSAvIHRoaXMudGltZW91dCkgKiAxMDA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYgKHRoaXMudG9hc3QucHJvZ3Jlc3NCYXJEaXJlY3Rpb24gPT09ICdpbmNyZWFzaW5nJykge1xyXG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMTAwIC0gdGhpcy5wcm9ncmVzc0JhcldpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5wcm9ncmVzc0JhcldpZHRoIDwgMCkge1xyXG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJXaWR0aCA+IDEwMCkge1xyXG4gICAgICAgICAgdGhpcy5wcm9ncmVzc0JhcldpZHRoID0gMTAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyVGltZXJzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnRpbWVvdXRJZCkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dElkKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMucHJvZ3Jlc3NCYXJJbnRlcnZhbElkKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMucHJvZ3Jlc3NCYXJJbnRlcnZhbElkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudGltZW91dElkID0gbnVsbDtcclxuICAgICAgICB0aGlzLnByb2dyZXNzQmFySW50ZXJ2YWxJZCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZW1vdmVUb2FzdCgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZVRvYXN0RXZlbnQuZW1pdCh0aGlzLnRvYXN0KTtcclxuICAgIH1cclxufVxyXG4iXX0=