import toast from '$lib/components/Toast/index.js';
const html = String.raw;
export const customToast = () =>
	toast({
		html: html` <div></div> `
	});
