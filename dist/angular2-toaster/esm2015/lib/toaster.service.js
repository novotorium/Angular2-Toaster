import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import * as i0 from "@angular/core";
// http://stackoverflow.com/questions/26501688/a-typescript-guid-class
class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
export class ToasterService {
    /**
     * Creates an instance of ToasterService.
     */
    constructor() {
        this.addToast = new Observable((observer) => this._addToast = observer).pipe(share());
        this.clearToasts = new Observable((observer) => this._clearToasts = observer).pipe(share());
        this._removeToastSubject = new Subject();
        this.removeToast = this._removeToastSubject.pipe(share());
    }
    /**
     * Synchronously create and show a new toast instance.
     *
     * @param {(string | Toast)} type The type of the toast, or a Toast object.
     * @param {string=} title The toast title.
     * @param {string=} body The toast body.
     * @returns {Toast}
     *          The newly created Toast instance with a randomly generated GUID Id.
     */
    pop(type, title, body) {
        const toast = typeof type === 'string' ? { type: type, title: title, body: body } : type;
        if (!toast.toastId) {
            toast.toastId = Guid.newGuid();
        }
        if (!this._addToast) {
            throw new Error('No Toaster Containers have been initialized to receive toasts.');
        }
        this._addToast.next(toast);
        return toast;
    }
    /**
     * Asynchronously create and show a new toast instance.
     *
     * @param {(string | Toast)} type The type of the toast, or a Toast object.
     * @param {string=} title The toast title.
     * @param {string=} body The toast body.
     * @returns {Observable<Toast>}
     *          A hot Observable that can be subscribed to in order to receive the Toast instance
     *          with a randomly generated GUID Id.
     */
    popAsync(type, title, body) {
        setTimeout(() => {
            this.pop(type, title, body);
        }, 0);
        return this.addToast;
    }
    /**
     * Clears a toast by toastId and/or toastContainerId.
     *
     * @param {string} toastId The toastId to clear.
     * @param {number=} toastContainerId
     *        The toastContainerId of the container to remove toasts from.
     */
    clear(toastId, toastContainerId) {
        const clearWrapper = {
            toastId: toastId, toastContainerId: toastContainerId
        };
        this._clearToasts.next(clearWrapper);
    }
}
ToasterService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ToasterService_Factory() { return new ToasterService(); }, token: ToasterService, providedIn: "root" });
ToasterService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
ToasterService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Rlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3NyYy9hbmd1bGFyMi10b2FzdGVyL3NyYy8iLCJzb3VyY2VzIjpbImxpYi90b2FzdGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sZ0JBQWdCLENBQUE7O0FBRXRDLHNFQUFzRTtBQUN0RSxNQUFNLElBQUk7SUFDTixNQUFNLENBQUMsT0FBTztRQUNWLE9BQU8sc0NBQXNDLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUM7WUFDckUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBRSxDQUFDO1lBQ3hFLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQUdELE1BQU0sT0FBTyxjQUFjO0lBV3ZCOztPQUVHO0lBQ0g7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksVUFBVSxDQUFRLENBQUMsUUFBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2xHLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxVQUFVLENBQWdCLENBQUMsUUFBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2hILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLE9BQU8sRUFBaUIsQ0FBQTtRQUN2RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxHQUFHLENBQUMsSUFBdUIsRUFBRSxLQUFjLEVBQUUsSUFBYTtRQUN0RCxNQUFNLEtBQUssR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRXpGLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFO1lBQ2hCLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2xDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO1NBQ3JGO1FBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsT0FBTyxLQUFLLENBQUM7SUFDakIsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFFBQVEsQ0FBQyxJQUF1QixFQUFFLEtBQWMsRUFBRSxJQUFhO1FBQzNELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsT0FBZ0IsRUFBRSxnQkFBeUI7UUFDN0MsTUFBTSxZQUFZLEdBQWtCO1lBQ2hDLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCO1NBQ3ZELENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUN4QyxDQUFDOzs7O1lBN0VKLFVBQVUsU0FBQyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRvYXN0LCBUb2FzdFR5cGUgfSBmcm9tICcuL3RvYXN0JztcclxuaW1wb3J0IHsgSUNsZWFyV3JhcHBlciB9IGZyb20gJy4vY2xlYXJXcmFwcGVyJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgc2hhcmUgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcclxuXHJcbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjY1MDE2ODgvYS10eXBlc2NyaXB0LWd1aWQtY2xhc3NcclxuY2xhc3MgR3VpZCB7XHJcbiAgICBzdGF0aWMgbmV3R3VpZCgpIHtcclxuICAgICAgICByZXR1cm4gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCBmdW5jdGlvbihjKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHIgPSBNYXRoLnJhbmRvbSgpICogMTYgfCAwLCB2ID0gYyA9PT0gJ3gnID8gciA6ICggciAmIDB4MyB8IDB4OCApO1xyXG4gICAgICAgICAgICByZXR1cm4gdi50b1N0cmluZygxNik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXHJcbmV4cG9ydCBjbGFzcyBUb2FzdGVyU2VydmljZSB7XHJcbiAgICBhZGRUb2FzdDogT2JzZXJ2YWJsZTxUb2FzdD47XHJcbiAgICBwcml2YXRlIF9hZGRUb2FzdDogT2JzZXJ2ZXI8VG9hc3Q+O1xyXG5cclxuICAgIGNsZWFyVG9hc3RzOiBPYnNlcnZhYmxlPElDbGVhcldyYXBwZXI+O1xyXG4gICAgcHJpdmF0ZSBfY2xlYXJUb2FzdHM6IE9ic2VydmVyPElDbGVhcldyYXBwZXI+O1xyXG5cclxuICAgIHJlbW92ZVRvYXN0OiBPYnNlcnZhYmxlPElDbGVhcldyYXBwZXI+O1xyXG4gICAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gICAgX3JlbW92ZVRvYXN0U3ViamVjdDogU3ViamVjdDxJQ2xlYXJXcmFwcGVyPjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVG9hc3RlclNlcnZpY2UuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYWRkVG9hc3QgPSBuZXcgT2JzZXJ2YWJsZTxUb2FzdD4oKG9ic2VydmVyOiBhbnkpID0+IHRoaXMuX2FkZFRvYXN0ID0gb2JzZXJ2ZXIpLnBpcGUoc2hhcmUoKSk7XHJcbiAgICAgICAgdGhpcy5jbGVhclRvYXN0cyA9IG5ldyBPYnNlcnZhYmxlPElDbGVhcldyYXBwZXI+KChvYnNlcnZlcjogYW55KSA9PiB0aGlzLl9jbGVhclRvYXN0cyA9IG9ic2VydmVyKS5waXBlKHNoYXJlKCkpO1xyXG4gICAgICAgIHRoaXMuX3JlbW92ZVRvYXN0U3ViamVjdCA9IG5ldyBTdWJqZWN0PElDbGVhcldyYXBwZXI+KClcclxuICAgICAgICB0aGlzLnJlbW92ZVRvYXN0ID0gdGhpcy5fcmVtb3ZlVG9hc3RTdWJqZWN0LnBpcGUoc2hhcmUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTeW5jaHJvbm91c2x5IGNyZWF0ZSBhbmQgc2hvdyBhIG5ldyB0b2FzdCBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmcgfCBUb2FzdCl9IHR5cGUgVGhlIHR5cGUgb2YgdGhlIHRvYXN0LCBvciBhIFRvYXN0IG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gdGl0bGUgVGhlIHRvYXN0IHRpdGxlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBib2R5IFRoZSB0b2FzdCBib2R5LlxyXG4gICAgICogQHJldHVybnMge1RvYXN0fVxyXG4gICAgICogICAgICAgICAgVGhlIG5ld2x5IGNyZWF0ZWQgVG9hc3QgaW5zdGFuY2Ugd2l0aCBhIHJhbmRvbWx5IGdlbmVyYXRlZCBHVUlEIElkLlxyXG4gICAgICovXHJcbiAgICBwb3AodHlwZTogVG9hc3RUeXBlIHwgVG9hc3QsIHRpdGxlPzogc3RyaW5nLCBib2R5Pzogc3RyaW5nKTogVG9hc3Qge1xyXG4gICAgICAgIGNvbnN0IHRvYXN0ID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnID8geyB0eXBlOiB0eXBlLCB0aXRsZTogdGl0bGUsIGJvZHk6IGJvZHkgfSA6IHR5cGU7XHJcblxyXG4gICAgICAgIGlmICghdG9hc3QudG9hc3RJZCkge1xyXG4gICAgICAgICAgICB0b2FzdC50b2FzdElkID0gR3VpZC5uZXdHdWlkKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2FkZFRvYXN0KSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignTm8gVG9hc3RlciBDb250YWluZXJzIGhhdmUgYmVlbiBpbml0aWFsaXplZCB0byByZWNlaXZlIHRvYXN0cy4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2FkZFRvYXN0Lm5leHQodG9hc3QpO1xyXG4gICAgICAgIHJldHVybiB0b2FzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFzeW5jaHJvbm91c2x5IGNyZWF0ZSBhbmQgc2hvdyBhIG5ldyB0b2FzdCBpbnN0YW5jZS5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0geyhzdHJpbmcgfCBUb2FzdCl9IHR5cGUgVGhlIHR5cGUgb2YgdGhlIHRvYXN0LCBvciBhIFRvYXN0IG9iamVjdC5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nPX0gdGl0bGUgVGhlIHRvYXN0IHRpdGxlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmc9fSBib2R5IFRoZSB0b2FzdCBib2R5LlxyXG4gICAgICogQHJldHVybnMge09ic2VydmFibGU8VG9hc3Q+fVxyXG4gICAgICogICAgICAgICAgQSBob3QgT2JzZXJ2YWJsZSB0aGF0IGNhbiBiZSBzdWJzY3JpYmVkIHRvIGluIG9yZGVyIHRvIHJlY2VpdmUgdGhlIFRvYXN0IGluc3RhbmNlXHJcbiAgICAgKiAgICAgICAgICB3aXRoIGEgcmFuZG9tbHkgZ2VuZXJhdGVkIEdVSUQgSWQuXHJcbiAgICAgKi9cclxuICAgIHBvcEFzeW5jKHR5cGU6IFRvYXN0VHlwZSB8IFRvYXN0LCB0aXRsZT86IHN0cmluZywgYm9keT86IHN0cmluZyk6IE9ic2VydmFibGU8VG9hc3Q+IHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5wb3AodHlwZSwgdGl0bGUsIGJvZHkpO1xyXG4gICAgICAgIH0sIDApO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcy5hZGRUb2FzdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENsZWFycyBhIHRvYXN0IGJ5IHRvYXN0SWQgYW5kL29yIHRvYXN0Q29udGFpbmVySWQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvYXN0SWQgVGhlIHRvYXN0SWQgdG8gY2xlYXIuXHJcbiAgICAgKiBAcGFyYW0ge251bWJlcj19IHRvYXN0Q29udGFpbmVySWRcclxuICAgICAqICAgICAgICBUaGUgdG9hc3RDb250YWluZXJJZCBvZiB0aGUgY29udGFpbmVyIHRvIHJlbW92ZSB0b2FzdHMgZnJvbS5cclxuICAgICAqL1xyXG4gICAgY2xlYXIodG9hc3RJZD86IHN0cmluZywgdG9hc3RDb250YWluZXJJZD86IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGNsZWFyV3JhcHBlcjogSUNsZWFyV3JhcHBlciA9IHtcclxuICAgICAgICAgICAgdG9hc3RJZDogdG9hc3RJZCwgdG9hc3RDb250YWluZXJJZDogdG9hc3RDb250YWluZXJJZFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuX2NsZWFyVG9hc3RzLm5leHQoY2xlYXJXcmFwcGVyKVxyXG4gICAgfVxyXG59XHJcbiJdfQ==