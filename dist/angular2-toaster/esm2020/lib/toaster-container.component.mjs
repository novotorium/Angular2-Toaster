import { Component, Input } from '@angular/core';
import { Transitions } from './transitions';
import { ToasterConfig } from './toaster-config';
import * as i0 from "@angular/core";
import * as i1 from "./toaster.service";
import * as i2 from "@angular/common";
import * as i3 from "./toast.component";
const _c0 = function (a0, a1) { return [a0, a1]; };
function ToasterContainerComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵlistener("click", function ToasterContainerComponent_div_1_Template_div_click_0_listener() { const restoredCtx = i0.ɵɵrestoreView(_r3); const toast_r1 = restoredCtx.$implicit; const ctx_r2 = i0.ɵɵnextContext(); return ctx_r2.click(toast_r1); })("clickEvent", function ToasterContainerComponent_div_1_Template_div_clickEvent_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r4 = i0.ɵɵnextContext(); return ctx_r4.childClick($event); })("removeToastEvent", function ToasterContainerComponent_div_1_Template_div_removeToastEvent_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r5 = i0.ɵɵnextContext(); return ctx_r5.removeToast($event); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const toast_r1 = ctx.$implicit;
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("toast", toast_r1)("toasterconfig", ctx_r0.toasterconfig)("@toastState", ctx_r0.toasterconfig.animation)("titleClass", ctx_r0.toasterconfig.titleClass)("messageClass", ctx_r0.toasterconfig.messageClass)("ngClass", i0.ɵɵpureFunction2(6, _c0, ctx_r0.toasterconfig.iconClasses[toast_r1.type], ctx_r0.toasterconfig.typeClasses[toast_r1.type]));
} }
const _c1 = function (a0) { return [a0]; };
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
ToasterContainerComponent.ɵfac = function ToasterContainerComponent_Factory(t) { return new (t || ToasterContainerComponent)(i0.ɵɵdirectiveInject(i1.ToasterService)); };
ToasterContainerComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ToasterContainerComponent, selectors: [["toaster-container"]], inputs: { toasterconfig: "toasterconfig" }, decls: 2, vars: 4, consts: [[1, "toast-container", 3, "ngClass"], ["toastComp", "", "class", "toast", 3, "toast", "toasterconfig", "titleClass", "messageClass", "ngClass", "click", "clickEvent", "removeToastEvent", 4, "ngFor", "ngForOf"], ["toastComp", "", 1, "toast", 3, "toast", "toasterconfig", "titleClass", "messageClass", "ngClass", "click", "clickEvent", "removeToastEvent"]], template: function ToasterContainerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵtemplate(1, ToasterContainerComponent_div_1_Template, 1, 9, "div", 1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(2, _c1, ctx.toasterconfig.positionClass));
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngForOf", ctx.toasts);
    } }, directives: [i2.NgClass, i2.NgForOf, i3.ToastComponent], encapsulation: 2, data: { animation: Transitions } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ToasterContainerComponent, [{
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
    }], function () { return [{ type: i1.ToasterService }]; }, { toasterconfig: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FuZ3VsYXIyLXRvYXN0ZXIvc3JjL2xpYi90b2FzdGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBR1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7Ozs7Ozs7O0lBU3JDLDhCQVdDO0lBRkcsK05BQVMsc0JBQVksSUFBQyxzS0FBZSx5QkFBa0IsSUFBakMsa0xBQ0YsMEJBQW1CLElBRGpCO0lBRzFCLGlCQUFNOzs7O0lBWm9ELGdDQUFlLHVDQUFBLCtDQUFBLCtDQUFBLG1EQUFBLHlJQUFBOzs7QUFpQnJGLE1BQU0sT0FBTyx5QkFBeUI7SUFTbEMsWUFBWSxjQUE4QjtRQUZuQyxXQUFNLEdBQVksRUFBRSxDQUFDO1FBR3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDM0IsSUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztTQUM1QztJQUNMLENBQUM7SUFFRCxpQkFBaUI7SUFDakIsS0FBSyxDQUFDLEtBQVksRUFBRSxhQUF1QjtRQUN2QyxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUU7WUFDdkIsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNoQztRQUVELE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUss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SUFDTCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsS0FBWTtRQUNqQyxPQUFPLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFTyxpQkFBaUIsQ0FBQyxLQUFVO1FBQ2hDLE9BQU8sS0FBSyxLQUFLLElBQUksSUFBSSxPQUFPLEtBQUssS0FBSyxXQUFXLENBQUM7SUFDMUQsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFO1FBQ3ZFLElBQUksSUFBSSxDQUFDLHFCQUFxQixFQUFFO1lBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQUU7SUFDakYsQ0FBQzs7a0dBckpRLHlCQUF5Qjs0RUFBekIseUJBQXlCO1FBbEI5Qiw4QkFBdUU7UUFDbkUsMEVBWU07UUFDVixpQkFBTTs7UUFkdUIscUZBQXlDO1FBQ2pDLGVBQVM7UUFBVCxvQ0FBUzt1R0FldEMsV0FBVzt1RkFFZCx5QkFBeUI7Y0FyQnJDLFNBQVM7ZUFBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkw7Z0JBQ0wsVUFBVSxFQUFFLFdBQVc7YUFDMUI7aUVBTVksYUFBYTtrQkFBckIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXQsIFxyXG4gICAgT25Jbml0LFxyXG4gICAgT25EZXN0cm95IFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2l0aW9ucyB9IGZyb20gJy4vdHJhbnNpdGlvbnMnO1xyXG5pbXBvcnQgeyBUb2FzdGVyQ29uZmlnIH0gZnJvbSAnLi90b2FzdGVyLWNvbmZpZyc7XHJcbmltcG9ydCB7IFRvYXN0ZXJTZXJ2aWNlfSBmcm9tICcuL3RvYXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElDbGVhcldyYXBwZXIgfSBmcm9tICcuL2NsZWFyV3JhcHBlcic7XHJcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi90b2FzdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndG9hc3Rlci1jb250YWluZXInLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9hc3QtY29udGFpbmVyXCIgW25nQ2xhc3NdPVwiW3RvYXN0ZXJjb25maWcucG9zaXRpb25DbGFzc11cIj5cclxuICAgICAgICAgICAgPGRpdiB0b2FzdENvbXAgKm5nRm9yPVwibGV0IHRvYXN0IG9mIHRvYXN0c1wiIGNsYXNzPVwidG9hc3RcIiBbdG9hc3RdPVwidG9hc3RcIlxyXG4gICAgICAgICAgICAgICAgW3RvYXN0ZXJjb25maWddPVwidG9hc3RlcmNvbmZpZ1wiXHJcbiAgICAgICAgICAgICAgICBbQHRvYXN0U3RhdGVdPVwidG9hc3RlcmNvbmZpZy5hbmltYXRpb25cIlxyXG4gICAgICAgICAgICAgICAgW3RpdGxlQ2xhc3NdPVwidG9hc3RlcmNvbmZpZy50aXRsZUNsYXNzXCJcclxuICAgICAgICAgICAgICAgIFttZXNzYWdlQ2xhc3NdPVwidG9hc3RlcmNvbmZpZy5tZXNzYWdlQ2xhc3NcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiW1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ZXJjb25maWcuaWNvbkNsYXNzZXNbdG9hc3QudHlwZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RlcmNvbmZpZy50eXBlQ2xhc3Nlc1t0b2FzdC50eXBlXVxyXG4gICAgICAgICAgICAgICAgXVwiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xpY2sodG9hc3QpXCIgKGNsaWNrRXZlbnQpPVwiY2hpbGRDbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgIChyZW1vdmVUb2FzdEV2ZW50KT1cInJlbW92ZVRvYXN0KCRldmVudClcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICBhbmltYXRpb25zOiBUcmFuc2l0aW9uc1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9hc3RlckNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgYWRkVG9hc3RTdWJzY3JpYmVyOiBhbnk7XHJcbiAgICBwcml2YXRlIGNsZWFyVG9hc3RzU3Vic2NyaWJlcjogYW55O1xyXG4gICAgcHJpdmF0ZSB0b2FzdGVyU2VydmljZTogVG9hc3RlclNlcnZpY2U7XHJcblxyXG4gICAgQElucHV0KCkgdG9hc3RlcmNvbmZpZzogVG9hc3RlckNvbmZpZztcclxuXHJcbiAgICBwdWJsaWMgdG9hc3RzOiBUb2FzdFtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IodG9hc3RlclNlcnZpY2U6IFRvYXN0ZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy50b2FzdGVyU2VydmljZSA9IHRvYXN0ZXJTZXJ2aWNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJTdWJzY3JpYmVycygpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudG9hc3RlcmNvbmZpZykpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdGVyY29uZmlnID0gbmV3IFRvYXN0ZXJDb25maWcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXZlbnQgaGFuZGxlcnNcclxuICAgIGNsaWNrKHRvYXN0OiBUb2FzdCwgaXNDbG9zZUJ1dHRvbj86IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodG9hc3Qub25DbGlja0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRvYXN0Lm9uQ2xpY2tDYWxsYmFjayh0b2FzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0YXBUb0Rpc21pc3MgPSAhdGhpcy5pc051bGxPclVuZGVmaW5lZCh0b2FzdC50YXBUb0Rpc21pc3MpIFxyXG4gICAgICAgICAgICA/IHRvYXN0LnRhcFRvRGlzbWlzc1xyXG4gICAgICAgICAgICA6IHRoaXMudG9hc3RlcmNvbmZpZy50YXBUb0Rpc21pc3M7XHJcblxyXG4gICAgICAgIGlmICh0YXBUb0Rpc21pc3MgfHwgKHRvYXN0LnNob3dDbG9zZUJ1dHRvbiAmJiBpc0Nsb3NlQnV0dG9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KHRvYXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hpbGRDbGljaygkZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2xpY2soJGV2ZW50LnZhbHVlLnRvYXN0LCAkZXZlbnQudmFsdWUuaXNDbG9zZUJ1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVG9hc3QodG9hc3Q6IFRvYXN0KSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnRvYXN0cy5pbmRleE9mKHRvYXN0KTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7IHJldHVybiB9O1xyXG5cclxuICAgICAgICBjb25zdCB0b2FzdElkID0gdGhpcy50b2FzdElkT3JEZWZhdWx0KHRvYXN0KTtcclxuXHJcbiAgICAgICAgdGhpcy50b2FzdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgaWYgKHRvYXN0Lm9uSGlkZUNhbGxiYWNrKSB7IHRvYXN0Lm9uSGlkZUNhbGxiYWNrKHRvYXN0KTsgfVxyXG4gICAgICAgIHRoaXMudG9hc3RlclNlcnZpY2UuX3JlbW92ZVRvYXN0U3ViamVjdC5uZXh0KHsgdG9hc3RJZDogdG9hc3RJZCwgdG9hc3RDb250YWluZXJJZDogdG9hc3QudG9hc3RDb250YWluZXJJZCB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gICAgcHJpdmF0ZSByZWdpc3RlclN1YnNjcmliZXJzKCkge1xyXG4gICAgICAgIHRoaXMuYWRkVG9hc3RTdWJzY3JpYmVyID0gdGhpcy50b2FzdGVyU2VydmljZS5hZGRUb2FzdC5zdWJzY3JpYmUoKHRvYXN0OiBUb2FzdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFRvYXN0KHRvYXN0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhclRvYXN0c1N1YnNjcmliZXIgPSB0aGlzLnRvYXN0ZXJTZXJ2aWNlLmNsZWFyVG9hc3RzLnN1YnNjcmliZSgoY2xlYXJXcmFwcGVyOiBJQ2xlYXJXcmFwcGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUb2FzdHMoY2xlYXJXcmFwcGVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFRvYXN0KHRvYXN0OiBUb2FzdCkge1xyXG4gICAgICAgIGlmICh0b2FzdC50b2FzdENvbnRhaW5lcklkICYmIHRoaXMudG9hc3RlcmNvbmZpZy50b2FzdENvbnRhaW5lcklkXHJcbiAgICAgICAgICAgICYmIHRvYXN0LnRvYXN0Q29udGFpbmVySWQgIT09IHRoaXMudG9hc3RlcmNvbmZpZy50b2FzdENvbnRhaW5lcklkKSB7IHJldHVybiB9O1xyXG5cclxuICAgICAgICBpZiAoIXRvYXN0LnR5cGUgXHJcbiAgICAgICAgICAgIHx8ICF0aGlzLnRvYXN0ZXJjb25maWcudHlwZUNsYXNzZXNbdG9hc3QudHlwZV1cclxuICAgICAgICAgICAgfHwgIXRoaXMudG9hc3RlcmNvbmZpZy5pY29uQ2xhc3Nlc1t0b2FzdC50eXBlXSkge1xyXG4gICAgICAgICAgICB0b2FzdC50eXBlID0gdGhpcy50b2FzdGVyY29uZmlnLmRlZmF1bHRUb2FzdFR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50b2FzdGVyY29uZmlnLnByZXZlbnREdXBsaWNhdGVzICYmIHRoaXMudG9hc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRvYXN0LnRvYXN0SWQgJiYgdGhpcy50b2FzdHMuc29tZSh0ID0+IHQudG9hc3RJZCA9PT0gdG9hc3QudG9hc3RJZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRvYXN0cy5zb21lKHQgPT4gdC5ib2R5ID09PSB0b2FzdC5ib2R5KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc051bGxPclVuZGVmaW5lZCh0b2FzdC5zaG93Q2xvc2VCdXR0b24pKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy50b2FzdGVyY29uZmlnLnNob3dDbG9zZUJ1dHRvbiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0LnNob3dDbG9zZUJ1dHRvbiA9IHRoaXMudG9hc3RlcmNvbmZpZy5zaG93Q2xvc2VCdXR0b25bdG9hc3QudHlwZV07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMudG9hc3RlcmNvbmZpZy5zaG93Q2xvc2VCdXR0b24gPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICAgICAgdG9hc3Quc2hvd0Nsb3NlQnV0dG9uID0gPGJvb2xlYW4+dGhpcy50b2FzdGVyY29uZmlnLnNob3dDbG9zZUJ1dHRvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRvYXN0LnNob3dDbG9zZUJ1dHRvbikge1xyXG4gICAgICAgICAgICB0b2FzdC5jbG9zZUh0bWwgPSB0b2FzdC5jbG9zZUh0bWwgfHwgdGhpcy50b2FzdGVyY29uZmlnLmNsb3NlSHRtbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvYXN0LmJvZHlPdXRwdXRUeXBlID0gdG9hc3QuYm9keU91dHB1dFR5cGUgfHwgdGhpcy50b2FzdGVyY29uZmlnLmJvZHlPdXRwdXRUeXBlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50b2FzdGVyY29uZmlnLm5ld2VzdE9uVG9wKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3RzLnVuc2hpZnQodG9hc3QpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0xpbWl0RXhjZWVkZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdHMucG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0cy5wdXNoKHRvYXN0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMaW1pdEV4Y2VlZGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0b2FzdC5vblNob3dDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0b2FzdC5vblNob3dDYWxsYmFjayh0b2FzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNMaW1pdEV4Y2VlZGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvYXN0ZXJjb25maWcubGltaXQgJiYgdGhpcy50b2FzdHMubGVuZ3RoID4gdGhpcy50b2FzdGVyY29uZmlnLmxpbWl0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlQWxsVG9hc3RzKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnRvYXN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KHRoaXMudG9hc3RzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhclRvYXN0cyhjbGVhcldyYXBwZXI6IElDbGVhcldyYXBwZXIpIHtcclxuICAgICAgICBjb25zdCB0b2FzdElkID0gY2xlYXJXcmFwcGVyLnRvYXN0SWQgO1xyXG4gICAgICAgIGNvbnN0IHRvYXN0Q29udGFpbmVySWQgPSBjbGVhcldyYXBwZXIudG9hc3RDb250YWluZXJJZDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNOdWxsT3JVbmRlZmluZWQodG9hc3RDb250YWluZXJJZCkgfHwgKHRvYXN0Q29udGFpbmVySWQgPT09IHRoaXMudG9hc3RlcmNvbmZpZy50b2FzdENvbnRhaW5lcklkKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVG9hc3RzQWN0aW9uKHRvYXN0SWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyVG9hc3RzQWN0aW9uKHRvYXN0SWQ/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodG9hc3RJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KHRoaXMudG9hc3RzLmZpbHRlcih0ID0+IHQudG9hc3RJZCA9PT0gdG9hc3RJZClbMF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsVG9hc3RzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG9hc3RJZE9yRGVmYXVsdCh0b2FzdDogVG9hc3QpIHtcclxuICAgICAgICByZXR1cm4gdG9hc3QudG9hc3RJZCB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTnVsbE9yVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5hZGRUb2FzdFN1YnNjcmliZXIpIHsgdGhpcy5hZGRUb2FzdFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTsgfVxyXG4gICAgICAgIGlmICh0aGlzLmNsZWFyVG9hc3RzU3Vic2NyaWJlcikgeyB0aGlzLmNsZWFyVG9hc3RzU3Vic2NyaWJlci51bnN1YnNjcmliZSgpOyB9XHJcbiAgICB9XHJcbn1cclxuIl19