import { Component, Input } from '@angular/core';
import { Transitions } from './transitions';
import { ToasterConfig } from './toaster-config';
import { ToasterService } from './toaster.service';
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
ToasterContainerComponent.decorators = [
    { type: Component, args: [{
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
            },] }
];
ToasterContainerComponent.ctorParameters = () => [
    { type: ToasterService }
];
ToasterContainerComponent.propDecorators = {
    toasterconfig: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyMi10b2FzdGVyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi90b2FzdGVyLWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBR1IsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM1QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakQsT0FBTyxFQUFFLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBeUJsRCxNQUFNLE9BQU8seUJBQXlCO0lBU2xDLFlBQVksY0FBOEI7UUFGbkMsV0FBTSxHQUFZLEVBQUUsQ0FBQztRQUd4QixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUM1QyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7U0FDNUM7SUFDTCxDQUFDO0lBRUQsaUJBQWlCO0lBQ2pCLEtBQUssQ0FBQyxLQUFZLEVBQUUsYUFBdUI7UUFDdkMsSUFBSSxLQUFLLENBQUMsZUFBZSxFQUFFO1lBQ3ZCLEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7UUFFRCxNQUFNLFlBQVksR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO1lBQzVELENBQUMsQ0FBQyxLQUFLLENBQUMsWUFBWTtZQUNwQixDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFF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LENBQUMsS0FBVTtRQUNoQyxPQUFPLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTyxLQUFLLEtBQUssV0FBVyxDQUFDO0lBQzFELENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FBRTtRQUN2RSxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFO0lBQ2pGLENBQUM7OztZQTFLSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7O1NBZ0JMO2dCQUNMLFVBQVUsRUFBRSxXQUFXO2FBQzFCOzs7WUF4QlEsY0FBYzs7OzRCQThCbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFxyXG4gICAgQ29tcG9uZW50LFxyXG4gICAgSW5wdXQsIFxyXG4gICAgT25Jbml0LFxyXG4gICAgT25EZXN0cm95IFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBUcmFuc2l0aW9ucyB9IGZyb20gJy4vdHJhbnNpdGlvbnMnO1xyXG5pbXBvcnQgeyBUb2FzdGVyQ29uZmlnIH0gZnJvbSAnLi90b2FzdGVyLWNvbmZpZyc7XHJcbmltcG9ydCB7IFRvYXN0ZXJTZXJ2aWNlfSBmcm9tICcuL3RvYXN0ZXIuc2VydmljZSc7XHJcbmltcG9ydCB7IElDbGVhcldyYXBwZXIgfSBmcm9tICcuL2NsZWFyV3JhcHBlcic7XHJcbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi90b2FzdCc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndG9hc3Rlci1jb250YWluZXInLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9hc3QtY29udGFpbmVyXCIgW25nQ2xhc3NdPVwiW3RvYXN0ZXJjb25maWcucG9zaXRpb25DbGFzc11cIj5cclxuICAgICAgICAgICAgPGRpdiB0b2FzdENvbXAgKm5nRm9yPVwibGV0IHRvYXN0IG9mIHRvYXN0c1wiIGNsYXNzPVwidG9hc3RcIiBbdG9hc3RdPVwidG9hc3RcIlxyXG4gICAgICAgICAgICAgICAgW3RvYXN0ZXJjb25maWddPVwidG9hc3RlcmNvbmZpZ1wiXHJcbiAgICAgICAgICAgICAgICBbQHRvYXN0U3RhdGVdPVwidG9hc3RlcmNvbmZpZy5hbmltYXRpb25cIlxyXG4gICAgICAgICAgICAgICAgW3RpdGxlQ2xhc3NdPVwidG9hc3RlcmNvbmZpZy50aXRsZUNsYXNzXCJcclxuICAgICAgICAgICAgICAgIFttZXNzYWdlQ2xhc3NdPVwidG9hc3RlcmNvbmZpZy5tZXNzYWdlQ2xhc3NcIlxyXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwiW1xyXG4gICAgICAgICAgICAgICAgICAgIHRvYXN0ZXJjb25maWcuaWNvbkNsYXNzZXNbdG9hc3QudHlwZV0sXHJcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RlcmNvbmZpZy50eXBlQ2xhc3Nlc1t0b2FzdC50eXBlXVxyXG4gICAgICAgICAgICAgICAgXVwiXHJcbiAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2xpY2sodG9hc3QpXCIgKGNsaWNrRXZlbnQpPVwiY2hpbGRDbGljaygkZXZlbnQpXCJcclxuICAgICAgICAgICAgICAgIChyZW1vdmVUb2FzdEV2ZW50KT1cInJlbW92ZVRvYXN0KCRldmVudClcIlxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGAsXHJcbiAgICBhbmltYXRpb25zOiBUcmFuc2l0aW9uc1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9hc3RlckNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAgIHByaXZhdGUgYWRkVG9hc3RTdWJzY3JpYmVyOiBhbnk7XHJcbiAgICBwcml2YXRlIGNsZWFyVG9hc3RzU3Vic2NyaWJlcjogYW55O1xyXG4gICAgcHJpdmF0ZSB0b2FzdGVyU2VydmljZTogVG9hc3RlclNlcnZpY2U7XHJcblxyXG4gICAgQElucHV0KCkgdG9hc3RlcmNvbmZpZzogVG9hc3RlckNvbmZpZztcclxuXHJcbiAgICBwdWJsaWMgdG9hc3RzOiBUb2FzdFtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IodG9hc3RlclNlcnZpY2U6IFRvYXN0ZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy50b2FzdGVyU2VydmljZSA9IHRvYXN0ZXJTZXJ2aWNlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJTdWJzY3JpYmVycygpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzTnVsbE9yVW5kZWZpbmVkKHRoaXMudG9hc3RlcmNvbmZpZykpIHtcclxuICAgICAgICAgICAgdGhpcy50b2FzdGVyY29uZmlnID0gbmV3IFRvYXN0ZXJDb25maWcoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZXZlbnQgaGFuZGxlcnNcclxuICAgIGNsaWNrKHRvYXN0OiBUb2FzdCwgaXNDbG9zZUJ1dHRvbj86IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodG9hc3Qub25DbGlja0NhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgIHRvYXN0Lm9uQ2xpY2tDYWxsYmFjayh0b2FzdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0YXBUb0Rpc21pc3MgPSAhdGhpcy5pc051bGxPclVuZGVmaW5lZCh0b2FzdC50YXBUb0Rpc21pc3MpIFxyXG4gICAgICAgICAgICA/IHRvYXN0LnRhcFRvRGlzbWlzc1xyXG4gICAgICAgICAgICA6IHRoaXMudG9hc3RlcmNvbmZpZy50YXBUb0Rpc21pc3M7XHJcblxyXG4gICAgICAgIGlmICh0YXBUb0Rpc21pc3MgfHwgKHRvYXN0LnNob3dDbG9zZUJ1dHRvbiAmJiBpc0Nsb3NlQnV0dG9uKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KHRvYXN0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY2hpbGRDbGljaygkZXZlbnQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2xpY2soJGV2ZW50LnZhbHVlLnRvYXN0LCAkZXZlbnQudmFsdWUuaXNDbG9zZUJ1dHRvbik7XHJcbiAgICB9XHJcblxyXG4gICAgcmVtb3ZlVG9hc3QodG9hc3Q6IFRvYXN0KSB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnRvYXN0cy5pbmRleE9mKHRvYXN0KTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7IHJldHVybiB9O1xyXG5cclxuICAgICAgICBjb25zdCB0b2FzdElkID0gdGhpcy50b2FzdElkT3JEZWZhdWx0KHRvYXN0KTtcclxuXHJcbiAgICAgICAgdGhpcy50b2FzdHMuc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgaWYgKHRvYXN0Lm9uSGlkZUNhbGxiYWNrKSB7IHRvYXN0Lm9uSGlkZUNhbGxiYWNrKHRvYXN0KTsgfVxyXG4gICAgICAgIHRoaXMudG9hc3RlclNlcnZpY2UuX3JlbW92ZVRvYXN0U3ViamVjdC5uZXh0KHsgdG9hc3RJZDogdG9hc3RJZCwgdG9hc3RDb250YWluZXJJZDogdG9hc3QudG9hc3RDb250YWluZXJJZCB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBwcml2YXRlIGZ1bmN0aW9uc1xyXG4gICAgcHJpdmF0ZSByZWdpc3RlclN1YnNjcmliZXJzKCkge1xyXG4gICAgICAgIHRoaXMuYWRkVG9hc3RTdWJzY3JpYmVyID0gdGhpcy50b2FzdGVyU2VydmljZS5hZGRUb2FzdC5zdWJzY3JpYmUoKHRvYXN0OiBUb2FzdCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFRvYXN0KHRvYXN0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5jbGVhclRvYXN0c1N1YnNjcmliZXIgPSB0aGlzLnRvYXN0ZXJTZXJ2aWNlLmNsZWFyVG9hc3RzLnN1YnNjcmliZSgoY2xlYXJXcmFwcGVyOiBJQ2xlYXJXcmFwcGVyKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUb2FzdHMoY2xlYXJXcmFwcGVyKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZFRvYXN0KHRvYXN0OiBUb2FzdCkge1xyXG4gICAgICAgIGlmICh0b2FzdC50b2FzdENvbnRhaW5lcklkICYmIHRoaXMudG9hc3RlcmNvbmZpZy50b2FzdENvbnRhaW5lcklkXHJcbiAgICAgICAgICAgICYmIHRvYXN0LnRvYXN0Q29udGFpbmVySWQgIT09IHRoaXMudG9hc3RlcmNvbmZpZy50b2FzdENvbnRhaW5lcklkKSB7IHJldHVybiB9O1xyXG5cclxuICAgICAgICBpZiAoIXRvYXN0LnR5cGUgXHJcbiAgICAgICAgICAgIHx8ICF0aGlzLnRvYXN0ZXJjb25maWcudHlwZUNsYXNzZXNbdG9hc3QudHlwZV1cclxuICAgICAgICAgICAgfHwgIXRoaXMudG9hc3RlcmNvbmZpZy5pY29uQ2xhc3Nlc1t0b2FzdC50eXBlXSkge1xyXG4gICAgICAgICAgICB0b2FzdC50eXBlID0gdGhpcy50b2FzdGVyY29uZmlnLmRlZmF1bHRUb2FzdFR5cGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50b2FzdGVyY29uZmlnLnByZXZlbnREdXBsaWNhdGVzICYmIHRoaXMudG9hc3RzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaWYgKHRvYXN0LnRvYXN0SWQgJiYgdGhpcy50b2FzdHMuc29tZSh0ID0+IHQudG9hc3RJZCA9PT0gdG9hc3QudG9hc3RJZCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRvYXN0cy5zb21lKHQgPT4gdC5ib2R5ID09PSB0b2FzdC5ib2R5KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc051bGxPclVuZGVmaW5lZCh0b2FzdC5zaG93Q2xvc2VCdXR0b24pKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy50b2FzdGVyY29uZmlnLnNob3dDbG9zZUJ1dHRvbiA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0LnNob3dDbG9zZUJ1dHRvbiA9IHRoaXMudG9hc3RlcmNvbmZpZy5zaG93Q2xvc2VCdXR0b25bdG9hc3QudHlwZV07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMudG9hc3RlcmNvbmZpZy5zaG93Q2xvc2VCdXR0b24gPT09ICdib29sZWFuJykge1xyXG4gICAgICAgICAgICAgICAgdG9hc3Quc2hvd0Nsb3NlQnV0dG9uID0gPGJvb2xlYW4+dGhpcy50b2FzdGVyY29uZmlnLnNob3dDbG9zZUJ1dHRvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRvYXN0LnNob3dDbG9zZUJ1dHRvbikge1xyXG4gICAgICAgICAgICB0b2FzdC5jbG9zZUh0bWwgPSB0b2FzdC5jbG9zZUh0bWwgfHwgdGhpcy50b2FzdGVyY29uZmlnLmNsb3NlSHRtbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvYXN0LmJvZHlPdXRwdXRUeXBlID0gdG9hc3QuYm9keU91dHB1dFR5cGUgfHwgdGhpcy50b2FzdGVyY29uZmlnLmJvZHlPdXRwdXRUeXBlO1xyXG5cclxuICAgICAgICBpZiAodGhpcy50b2FzdGVyY29uZmlnLm5ld2VzdE9uVG9wKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9hc3RzLnVuc2hpZnQodG9hc3QpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0xpbWl0RXhjZWVkZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b2FzdHMucG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRvYXN0cy5wdXNoKHRvYXN0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNMaW1pdEV4Y2VlZGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudG9hc3RzLnNoaWZ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0b2FzdC5vblNob3dDYWxsYmFjaykge1xyXG4gICAgICAgICAgICB0b2FzdC5vblNob3dDYWxsYmFjayh0b2FzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaXNMaW1pdEV4Y2VlZGVkKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvYXN0ZXJjb25maWcubGltaXQgJiYgdGhpcy50b2FzdHMubGVuZ3RoID4gdGhpcy50b2FzdGVyY29uZmlnLmxpbWl0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlQWxsVG9hc3RzKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSB0aGlzLnRvYXN0cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KHRoaXMudG9hc3RzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjbGVhclRvYXN0cyhjbGVhcldyYXBwZXI6IElDbGVhcldyYXBwZXIpIHtcclxuICAgICAgICBjb25zdCB0b2FzdElkID0gY2xlYXJXcmFwcGVyLnRvYXN0SWQgO1xyXG4gICAgICAgIGNvbnN0IHRvYXN0Q29udGFpbmVySWQgPSBjbGVhcldyYXBwZXIudG9hc3RDb250YWluZXJJZDtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNOdWxsT3JVbmRlZmluZWQodG9hc3RDb250YWluZXJJZCkgfHwgKHRvYXN0Q29udGFpbmVySWQgPT09IHRoaXMudG9hc3RlcmNvbmZpZy50b2FzdENvbnRhaW5lcklkKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyVG9hc3RzQWN0aW9uKHRvYXN0SWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNsZWFyVG9hc3RzQWN0aW9uKHRvYXN0SWQ/OiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodG9hc3RJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRvYXN0KHRoaXMudG9hc3RzLmZpbHRlcih0ID0+IHQudG9hc3RJZCA9PT0gdG9hc3RJZClbMF0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlQWxsVG9hc3RzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdG9hc3RJZE9yRGVmYXVsdCh0b2FzdDogVG9hc3QpIHtcclxuICAgICAgICByZXR1cm4gdG9hc3QudG9hc3RJZCB8fCAnJztcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGlzTnVsbE9yVW5kZWZpbmVkKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJztcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpIHtcclxuICAgICAgICBpZiAodGhpcy5hZGRUb2FzdFN1YnNjcmliZXIpIHsgdGhpcy5hZGRUb2FzdFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTsgfVxyXG4gICAgICAgIGlmICh0aGlzLmNsZWFyVG9hc3RzU3Vic2NyaWJlcikgeyB0aGlzLmNsZWFyVG9hc3RzU3Vic2NyaWJlci51bnN1YnNjcmliZSgpOyB9XHJcbiAgICB9XHJcbn1cclxuIl19