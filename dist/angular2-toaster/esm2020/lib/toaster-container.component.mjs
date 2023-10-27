import { Component, Input } from '@angular/core';
import { Transitions } from './transitions';
import { ToasterConfig } from './toaster-config';
import * as i0 from "@angular/core";
import * as i1 from "./toaster.service";
import * as i2 from "./toast.component";
import * as i3 from "@angular/common";
export class ToasterContainerComponent {
    constructor(toasterService) {
        this.toasts = [];
        this.toasterService = toasterService;
    }
    ngOnInit() {
        this.registerSubscribers();
        if (this.isNullOrUndefined(this.toasterconfig)) {
            this.toasterconfig = new ToasterConfig();
        }
    }
    // event handlers
    click(toast, isCloseButton) {
        if (toast.onClickCallback) {
            toast.onClickCallback(toast);
        }
        const tapToDismiss = !this.isNullOrUndefined(toast.tapToDismiss)
            ? toast.tapToDismiss
            : this.toasterconfig.tapToDismiss;
        if (tapToDismiss || (toast.showCloseButton && isCloseButton)) {
            this.removeToast(toast);
        }
    }
    childClick($event) {
        this.click($event.value.toast, $event.value.isCloseButton);
    }
    removeToast(toast) {
        const index = this.toasts.indexOf(toast);
        if (index < 0) {
            return;
        }
        ;
        const toastId = this.toastIdOrDefault(toast);
        this.toasts.splice(index, 1);
        if (toast.onHideCallback) {
            toast.onHideCallback(toast);
        }
        this.toasterService._removeToastSubject.next({ toastId: toastId, toastContainerId: toast.toastContainerId });
    }
    // private functions
    registerSubscribers() {
        this.addToastSubscriber = this.toasterService.addToast.subscribe((toast) => {
            this.addToast(toast);
        });
        this.clearToastsSubscriber = this.toasterService.clearToasts.subscribe((clearWrapper) => {
            this.clearToasts(clearWrapper);
        });
    }
    addToast(toast) {
        if (toast.toastContainerId && this.toasterconfig.toastContainerId
            && toast.toastContainerId !== this.toasterconfig.toastContainerId) {
            return;
        }
        ;
        if (!toast.type
            || !this.toasterconfig.typeClasses[toast.type]
            || !this.toasterconfig.iconClasses[toast.type]) {
            toast.type = this.toasterconfig.defaultToastType;
        }
        if (this.toasterconfig.preventDuplicates && this.toasts.length > 0) {
            if (toast.toastId && this.toasts.some(t => t.toastId === toast.toastId)) {
                return;
            }
            else if (this.toasts.some(t => t.body === toast.body)) {
                return;
            }
        }
        if (this.isNullOrUndefined(toast.showCloseButton)) {
            if (typeof this.toasterconfig.showCloseButton === 'object') {
                toast.showCloseButton = this.toasterconfig.showCloseButton[toast.type];
            }
            else if (typeof this.toasterconfig.showCloseButton === 'boolean') {
                toast.showCloseButton = this.toasterconfig.showCloseButton;
            }
        }
        if (toast.showCloseButton) {
            toast.closeHtml = toast.closeHtml || this.toasterconfig.closeHtml;
        }
        toast.bodyOutputType = toast.bodyOutputType || this.toasterconfig.bodyOutputType;
        if (this.toasterconfig.newestOnTop) {
            this.toasts.unshift(toast);
            if (this.isLimitExceeded()) {
                this.toasts.pop();
            }
        }
        else {
            this.toasts.push(toast);
            if (this.isLimitExceeded()) {
                this.toasts.shift();
            }
        }
        if (toast.onShowCallback) {
            toast.onShowCallback(toast);
        }
    }
    isLimitExceeded() {
        return this.toasterconfig.limit && this.toasts.length > this.toasterconfig.limit;
    }
    removeAllToasts() {
        for (let i = this.toasts.length - 1; i >= 0; i--) {
            this.removeToast(this.toasts[i]);
        }
    }
    clearToasts(clearWrapper) {
        const toastId = clearWrapper.toastId;
        const toastContainerId = clearWrapper.toastContainerId;
        if (this.isNullOrUndefined(toastContainerId) || (toastContainerId === this.toasterconfig.toastContainerId)) {
            this.clearToastsAction(toastId);
        }
    }
    clearToastsAction(toastId) {
        if (toastId) {
            this.removeToast(this.toasts.filter(t => t.toastId === toastId)[0]);
        }
        else {
            this.removeAllToasts();
        }
    }
    toastIdOrDefault(toast) {
        return toast.toastId || '';
    }
    isNullOrUndefined(value) {
        return value === null || typeof value === 'undefined';
    }
    ngOnDestroy() {
        if (this.addToastSubscriber) {
            this.addToastSubscriber.unsubscribe();
        }
        if (this.clearToastsSubscriber) {
            this.clearToastsSubscriber.unsubscribe();
        }
    }
}
ToasterContainerComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ToasterContainerComponent, deps: [{ token: i1.ToasterService }], target: i0.ɵɵFactoryTarget.Component });
ToasterContainerComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.3.11", type: ToasterContainerComponent, selector: "toaster-container", inputs: { toasterconfig: "toasterconfig" }, ngImport: i0, template: `
        <div class="toast-container" [ngClass]="[toasterconfig.positionClass]">
            <div toastComp *ngFor="let toast of toasts" class="toast" [toast]="toast"
                [toasterconfig]="toasterconfig"
                [@toastState]="toasterconfig.animation"
                [titleClass]="toasterconfig.titleClass"
                [messageClass]="toasterconfig.messageClass"
                [ngClass]="[
                    toasterconfig.iconClasses[toast.type],
                    toasterconfig.typeClasses[toast.type]
                ]"
                (click)="click(toast)" (clickEvent)="childClick($event)"
                (removeToastEvent)="removeToast($event)"
            >
            </div>
        </div>
        `, isInline: true, components: [{ type: i2.ToastComponent, selector: "[toastComp]", inputs: ["toasterconfig", "toast", "titleClass", "messageClass"], outputs: ["clickEvent", "removeToastEvent"] }], directives: [{ type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { type: i3.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], animations: Transitions });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.11", ngImport: i0, type: ToasterContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'toaster-container',
                    template: `
        <div class="toast-container" [ngClass]="[toasterconfig.positionClass]">
            <div toastComp *ngFor="let toast of toasts" class="toast" [toast]="toast"
                [toasterconfig]="toasterconfig"
                [@toastState]="toasterconfig.animation"
                [titleClass]="toasterconfig.titleClass"
                [messageClass]="toasterconfig.messageClass"
                [ngClass]="[
                    toasterconfig.iconClasses[toast.type],
                    toasterconfig.typeClasses[toast.type]
                ]"
                (click)="click(toast)" (clickEvent)="childClick($event)"
                (removeToastEvent)="removeToast($event)"
            >
            </div>
        </div>
        `,
                    animations: Transitions
                }]
        }], ctorParameters: function () { return [{ type: i1.ToasterService }]; }, propDecorators: { toasterconfig: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBR1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7O0FBMEJqRCxNQUFNLE9BQU8seUJBQXlCO0lBU2xDLFlBQVksY0FBOEI7UUFGbkMsV0FBTSxHQUFZLEVBQUUsQ0FBQztRQUd4QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLEtBQUssQ0FBQyxLQUFZLEVBQUUsYUFBdUI7UUFDdkMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7UUFFRCxNQUFNLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQzVELENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWTtZQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFFdEMsSUFBSSxZQUFZLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxJ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QUksT0FBTyxLQUFLLEtBQUssV0FBVyxDQUFDO0lBQzFELENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FBRTtRQUN2RSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFO0lBQ2pGLENBQUM7O3VIQXJKUSx5QkFBeUI7MkdBQXpCLHlCQUF5QixxR0FuQnhCOzs7Ozs7Ozs7Ozs7Ozs7O1NBZ0JMLG9aQUNPLFdBQVc7NEZBRWQseUJBQXlCO2tCQXJCckMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkw7b0JBQ0wsVUFBVSxFQUFFLFdBQVc7aUJBQzFCO3FHQU1ZLGFBQWE7c0JBQXJCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBcclxuICAgIENvbXBvbmVudCxcclxuICAgIElucHV0LCBcclxuICAgIE9uSW5pdCxcclxuICAgIE9uRGVzdHJveSBcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVHJhbnNpdGlvbnMgfSBmcm9tICcuL3RyYW5zaXRpb25zJztcclxuaW1wb3J0IHsgVG9hc3RlckNvbmZpZyB9IGZyb20gJy4vdG9hc3Rlci1jb25maWcnO1xyXG5pbXBvcnQgeyBUb2FzdGVyU2VydmljZX0gZnJvbSAnLi90b2FzdGVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBJQ2xlYXJXcmFwcGVyIH0gZnJvbSAnLi9jbGVhcldyYXBwZXInO1xyXG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJy4vdG9hc3QnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3RvYXN0ZXItY29udGFpbmVyJyxcclxuICAgIHRlbXBsYXRlOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cInRvYXN0LWNvbnRhaW5lclwiIFtuZ0NsYXNzXT1cIlt0b2FzdGVyY29uZmlnLnBvc2l0aW9uQ2xhc3NdXCI+XHJcbiAgICAgICAgICAgIDxkaXYgdG9hc3RDb21wICpuZ0Zvcj1cImxldCB0b2FzdCBvZiB0b2FzdHNcIiBjbGFzcz1cInRvYXN0XCIgW3RvYXN0XT1cInRvYXN0XCJcclxuICAgICAgICAgICAgICAgIFt0b2FzdGVyY29uZmlnXT1cInRvYXN0ZXJjb25maWdcIlxyXG4gICAgICAgICAgICAgICAgW0B0b2FzdFN0YXRlXT1cInRvYXN0ZXJjb25maWcuYW5pbWF0aW9uXCJcclxuICAgICAgICAgICAgICAgIFt0aXRsZUNsYXNzXT1cInRvYXN0ZXJjb25maWcudGl0bGVDbGFzc1wiXHJcbiAgICAgICAgICAgICAgICBbbWVzc2FnZUNsYXNzXT1cInRvYXN0ZXJjb25maWcubWVzc2FnZUNsYXNzXCJcclxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cIltcclxuICAgICAgICAgICAgICAgICAgICB0b2FzdGVyY29uZmlnLmljb25DbGFzc2VzW3RvYXN0LnR5cGVdLFxyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ZXJjb25maWcudHlwZUNsYXNzZXNbdG9hc3QudHlwZV1cclxuICAgICAgICAgICAgICAgIF1cIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cImNsaWNrKHRvYXN0KVwiIChjbGlja0V2ZW50KT1cImNoaWxkQ2xpY2soJGV2ZW50KVwiXHJcbiAgICAgICAgICAgICAgICAocmVtb3ZlVG9hc3RFdmVudCk9XCJyZW1vdmVUb2FzdCgkZXZlbnQpXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgYW5pbWF0aW9uczogVHJhbnNpdGlvbnNcclxufSlcclxuZXhwb3J0IGNsYXNzIFRvYXN0ZXJDb250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XHJcbiAgICBwcml2YXRlIGFkZFRvYXN0U3Vic2NyaWJlcjogYW55O1xyXG4gICAgcHJpdmF0ZSBjbGVhclRvYXN0c1N1YnNjcmliZXI6IGFueTtcclxuICAgIHByaXZhdGUgdG9hc3RlclNlcnZpY2U6IFRvYXN0ZXJTZXJ2aWNlO1xyXG5cclxuICAgIEBJbnB1dCgpIHRvYXN0ZXJjb25maWc6IFRvYXN0ZXJDb25maWc7XHJcblxyXG4gICAgcHVibGljIHRvYXN0czogVG9hc3RbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHRvYXN0ZXJTZXJ2aWNlOiBUb2FzdGVyU2VydmljZSkge1xyXG4gICAgICAgIHRoaXMudG9hc3RlclNlcnZpY2UgPSB0b2FzdGVyU2VydmljZTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVyU3Vic2NyaWJlcnMoKTtcclxuICAgICAgICBpZiAodGhpcy5pc051bGxPclVuZGVmaW5lZCh0aGlzLnRvYXN0ZXJjb25maWcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3RlcmNvbmZpZyA9IG5ldyBUb2FzdGVyQ29uZmlnKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGV2ZW50IGhhbmRsZXJzXHJcbiAgICBjbGljayh0b2FzdDogVG9hc3QsIGlzQ2xvc2VCdXR0b24/OiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRvYXN0Lm9uQ2xpY2tDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0b2FzdC5vbkNsaWNrQ2FsbGJhY2sodG9hc3QpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGFwVG9EaXNtaXNzID0gIXRoaXMuaXNOdWxsT3JVbmRlZmluZWQodG9hc3QudGFwVG9EaXNtaXNzKSBcclxuICAgICAgICAgICAgPyB0b2FzdC50YXBUb0Rpc21pc3NcclxuICAgICAgICAgICAgOiB0aGlzLnRvYXN0ZXJjb25maWcudGFwVG9EaXNtaXNzO1xyXG5cclxuICAgICAgICBpZiAodGFwVG9EaXNtaXNzIHx8ICh0b2FzdC5zaG93Q2xvc2VCdXR0b24gJiYgaXNDbG9zZUJ1dHRvbikpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCh0b2FzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNoaWxkQ2xpY2soJGV2ZW50OiBhbnkpIHtcclxuICAgICAgICB0aGlzLmNsaWNrKCRldmVudC52YWx1ZS50b2FzdCwgJGV2ZW50LnZhbHVlLmlzQ2xvc2VCdXR0b24pO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZVRvYXN0KHRvYXN0OiBUb2FzdCkge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy50b2FzdHMuaW5kZXhPZih0b2FzdCk7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkgeyByZXR1cm4gfTtcclxuXHJcbiAgICAgICAgY29uc3QgdG9hc3RJZCA9IHRoaXMudG9hc3RJZE9yRGVmYXVsdCh0b2FzdCk7XHJcblxyXG4gICAgICAgIHRoaXMudG9hc3RzLnNwbGljZShpbmRleCwgMSk7XHJcblxyXG4gICAgICAgIGlmICh0b2FzdC5vbkhpZGVDYWxsYmFjaykgeyB0b2FzdC5vbkhpZGVDYWxsYmFjayh0b2FzdCk7IH1cclxuICAgICAgICB0aGlzLnRvYXN0ZXJTZXJ2aWNlLl9yZW1vdmVUb2FzdFN1YmplY3QubmV4dCh7IHRvYXN0SWQ6IHRvYXN0SWQsIHRvYXN0Q29udGFpbmVySWQ6IHRvYXN0LnRvYXN0Q29udGFpbmVySWQgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBmdW5jdGlvbnNcclxuICAgIHByaXZhdGUgcmVnaXN0ZXJTdWJzY3JpYmVycygpIHtcclxuICAgICAgICB0aGlzLmFkZFRvYXN0U3Vic2NyaWJlciA9IHRoaXMudG9hc3RlclNlcnZpY2UuYWRkVG9hc3Quc3Vic2NyaWJlKCh0b2FzdDogVG9hc3QpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5hZGRUb2FzdCh0b2FzdCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY2xlYXJUb2FzdHNTdWJzY3JpYmVyID0gdGhpcy50b2FzdGVyU2VydmljZS5jbGVhclRvYXN0cy5zdWJzY3JpYmUoKGNsZWFyV3JhcHBlcjogSUNsZWFyV3JhcHBlcikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVG9hc3RzKGNsZWFyV3JhcHBlcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRUb2FzdCh0b2FzdDogVG9hc3QpIHtcclxuICAgICAgICBpZiAodG9hc3QudG9hc3RDb250YWluZXJJZCAmJiB0aGlzLnRvYXN0ZXJjb25maWcudG9hc3RDb250YWluZXJJZFxyXG4gICAgICAgICAgICAmJiB0b2FzdC50b2FzdENvbnRhaW5lcklkICE9PSB0aGlzLnRvYXN0ZXJjb25maWcudG9hc3RDb250YWluZXJJZCkgeyByZXR1cm4gfTtcclxuXHJcbiAgICAgICAgaWYgKCF0b2FzdC50eXBlIFxyXG4gICAgICAgICAgICB8fCAhdGhpcy50b2FzdGVyY29uZmlnLnR5cGVDbGFzc2VzW3RvYXN0LnR5cGVdXHJcbiAgICAgICAgICAgIHx8ICF0aGlzLnRvYXN0ZXJjb25maWcuaWNvbkNsYXNzZXNbdG9hc3QudHlwZV0pIHtcclxuICAgICAgICAgICAgdG9hc3QudHlwZSA9IHRoaXMudG9hc3RlcmNvbmZpZy5kZWZhdWx0VG9hc3RUeXBlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG9hc3RlcmNvbmZpZy5wcmV2ZW50RHVwbGljYXRlcyAmJiB0aGlzLnRvYXN0cy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0b2FzdC50b2FzdElkICYmIHRoaXMudG9hc3RzLnNvbWUodCA9PiB0LnRvYXN0SWQgPT09IHRvYXN0LnRvYXN0SWQpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy50b2FzdHMuc29tZSh0ID0+IHQuYm9keSA9PT0gdG9hc3QuYm9keSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNOdWxsT3JVbmRlZmluZWQodG9hc3Quc2hvd0Nsb3NlQnV0dG9uKSkge1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMudG9hc3RlcmNvbmZpZy5zaG93Q2xvc2VCdXR0b24gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICB0b2FzdC5zaG93Q2xvc2VCdXR0b24gPSB0aGlzLnRvYXN0ZXJjb25maWcuc2hvd0Nsb3NlQnV0dG9uW3RvYXN0LnR5cGVdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLnRvYXN0ZXJjb25maWcuc2hvd0Nsb3NlQnV0dG9uID09PSAnYm9vbGVhbicpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0LnNob3dDbG9zZUJ1dHRvbiA9IDxib29sZWFuPnRoaXMudG9hc3RlcmNvbmZpZy5zaG93Q2xvc2VCdXR0b247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0b2FzdC5zaG93Q2xvc2VCdXR0b24pIHtcclxuICAgICAgICAgICAgdG9hc3QuY2xvc2VIdG1sID0gdG9hc3QuY2xvc2VIdG1sIHx8IHRoaXMudG9hc3RlcmNvbmZpZy5jbG9zZUh0bWw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0b2FzdC5ib2R5T3V0cHV0VHlwZSA9IHRvYXN0LmJvZHlPdXRwdXRUeXBlIHx8IHRoaXMudG9hc3RlcmNvbmZpZy5ib2R5T3V0cHV0VHlwZTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMudG9hc3RlcmNvbmZpZy5uZXdlc3RPblRvcCkge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0cy51bnNoaWZ0KHRvYXN0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMaW1pdEV4Y2VlZGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RzLnBvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdHMucHVzaCh0b2FzdCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTGltaXRFeGNlZWRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRvYXN0cy5zaGlmdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodG9hc3Qub25TaG93Q2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdG9hc3Qub25TaG93Q2FsbGJhY2sodG9hc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTGltaXRFeGNlZWRlZCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50b2FzdGVyY29uZmlnLmxpbWl0ICYmIHRoaXMudG9hc3RzLmxlbmd0aCA+IHRoaXMudG9hc3RlcmNvbmZpZy5saW1pdDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUFsbFRvYXN0cygpIHtcclxuICAgICAgICBmb3IgKGxldCBpID0gdGhpcy50b2FzdHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCh0aGlzLnRvYXN0c1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xlYXJUb2FzdHMoY2xlYXJXcmFwcGVyOiBJQ2xlYXJXcmFwcGVyKSB7XHJcbiAgICAgICAgY29uc3QgdG9hc3RJZCA9IGNsZWFyV3JhcHBlci50b2FzdElkIDtcclxuICAgICAgICBjb25zdCB0b2FzdENvbnRhaW5lcklkID0gY2xlYXJXcmFwcGVyLnRvYXN0Q29udGFpbmVySWQ7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzTnVsbE9yVW5kZWZpbmVkKHRvYXN0Q29udGFpbmVySWQpIHx8ICh0b2FzdENvbnRhaW5lcklkID09PSB0aGlzLnRvYXN0ZXJjb25maWcudG9hc3RDb250YWluZXJJZCkpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclRvYXN0c0FjdGlvbih0b2FzdElkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhclRvYXN0c0FjdGlvbih0b2FzdElkPzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRvYXN0SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUb2FzdCh0aGlzLnRvYXN0cy5maWx0ZXIodCA9PiB0LnRvYXN0SWQgPT09IHRvYXN0SWQpWzBdKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZUFsbFRvYXN0cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHRvYXN0SWRPckRlZmF1bHQodG9hc3Q6IFRvYXN0KSB7XHJcbiAgICAgICAgcmV0dXJuIHRvYXN0LnRvYXN0SWQgfHwgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc051bGxPclVuZGVmaW5lZCh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCc7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkVG9hc3RTdWJzY3JpYmVyKSB7IHRoaXMuYWRkVG9hc3RTdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7IH1cclxuICAgICAgICBpZiAodGhpcy5jbGVhclRvYXN0c1N1YnNjcmliZXIpIHsgdGhpcy5jbGVhclRvYXN0c1N1YnNjcmliZXIudW5zdWJzY3JpYmUoKTsgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==