import uid from '$lib/helpers/randomId.js';
import toastDefaultConfig from './toastDefaultConfig.js';

export type ToastOptions = {
	type: 'success' | 'warning' | 'error' | 'info';
	html: string;
	text: string;
	id: string;
	animationDuration: number;
	autoClose: boolean;
	duration: number;
	position:
		| 'top-left'
		| 'top-right'
		| 'top-middle'
		| 'bottom-left'
		| 'bottom-middle'
		| 'bottom-right';
};

export type ToastInstance = {
	content: Element;
	container: Element;
	close: (triggerEvent: boolean) => void;
	onClose: () => void;
};

/**
 *  Configuration interface for ToastBuilder class
 */
export interface ToastBuilderConfig {
	/** return the container element. */
	containerTemplate(config: ToastBuilderConfig, position: ToastOptions['position']): Element;

	/**  Return the content. Custom Content element. will get `ToastParam` and `ToastBuilderConfig` as param  */
	contentTemplate(
		toastParam: ToastOptions,
		config: ToastBuilderConfig
	): { content: Element; closeBtn?: HTMLButtonElement };
	closeBtnSelector: string | undefined;

	id: string;
	icons: {
		success: string;
		error: string;
		warning: string;
		info: string;
	};
}

/**
 * ### Advance \@mrbns/Svkit ToastBuilder
 *  there is three callback. `containerTemplate`, `contentTemplate`, `contentTemplate`. every template function should return html element.
 * 1. `containerTemplate(config)` should return a container where to insert the toast; you have to handle the logic if container already exist or not.
 * 2. `contentTemplate` should return a toast .if you want a total custom toast otherwise you can customize via CSS variable;
 * 3. `closeBtnTemplate` should return a button. at later we will place event handler on that button to close/remove that specific created toast;
 */
export default class ToastBuilder {
	private config: ToastBuilderConfig = toastDefaultConfig;

	constructor(config: Partial<ToastBuilderConfig> = {}) {
		this.config = { ...config, ...this.config };
	}

	/**
	 * The main Toast caller function
	 * @param param  {Partial<ToastOptions>} // Accept all ToastParam as Partial object.
	 * @param position default position is "top-right".
	 * @returns
	 */
	toast(param: Partial<ToastOptions>) {
		const toastParam: ToastOptions = {
			html: '',
			text: '',
			type: 'info',
			id: 'svkit-toast-' + uid(),
			animationDuration: 250,
			position: 'top-right',
			duration: 5000,
			autoClose: true,
			...param
		};
		console.log(toastParam.autoClose);

		const container = this.config.containerTemplate(this.config, toastParam.position);
		const { content, closeBtn } = this.config.contentTemplate(toastParam, this.config);

		if (!container)
			return console.trace('Container not found, when creating Toast. Submit a issue');
		if (!content) return console.trace('Content not found, when creating Toast. Submit a issue');

		if (!document.body.contains(container)) {
			document.body.insertAdjacentElement('beforeend', container);
		}

		container.insertAdjacentElement('afterbegin', content);
		setTimeout(() => {
			content.classList.add('animate');
		}, 20);

		closeBtn?.addEventListener('click', () =>
			this.removeByElement(content, container, toastParam.animationDuration)
		);

		if (toastParam.autoClose) {
			setTimeout(() => {
				this.removeByElement(content, container, toastParam.animationDuration);
			}, toastParam.duration + 200);
		}
	}

	private removeByElement(_content: Element, _container: Element, animationDuration: number) {
		_content?.classList.remove('animate');

		setTimeout(() => {
			_content?.remove();
			if (_container.children.length == 0) {
				_container.remove();
			}
		}, animationDuration / 1.2);
	}
}
