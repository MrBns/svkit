import type { ToastOptions } from './ToastBuilder.js';
import ToastBuilder from './ToastBuilder.js';

const toastInstance = new ToastBuilder();

interface ToastFn {
	(param: Partial<ToastOptions>): void;
	success: (msg: string, options?: Partial<ToastOptions>) => void;
	error: (msg: string, options?: Partial<ToastOptions>) => void;
	warning: (msg: string, options?: Partial<ToastOptions>) => void;
	info: (msg: string, options?: Partial<ToastOptions>) => void;
}

const toast: ToastFn = function (param) {
	toastInstance.toast(param);
};
toast.success = function (msg, param = {}) {
	console.log(param);
	toastInstance.toast({
		...param,
		text: msg,
		type: 'success'
	});
};
toast.error = function (msg, options = {}) {
	toastInstance.toast({
		...options,
		text: msg,
		type: 'error'
	});
};
toast.warning = function (msg, options = {}) {
	toastInstance.toast({
		...options,
		text: msg,
		type: 'warning'
	});
};

toast.info = function (msg, options = {}) {
	toastInstance.toast({
		...options,
		text: msg,
		type: 'info'
	});
};

export default toast;
