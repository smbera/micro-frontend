export const isFunction = (value) => typeof value === 'function';

export class ProxySandBox {
	constructor() {
		this.proxy = window;
		this.active();
	}
	active() {
		const originWindow = window;

		const fakeWindow = Object.create(Object.getPrototypeOf(originWindow))

		this.proxy = new Proxy(originWindow, {
			get(target, propKey) {
				if (isFunction(fakeWindow[propKey])) {
					return fakeWindow[propKey].bind(originWindow)
				}
				if (isFunction(target[propKey])) {
					return target[propKey].bind(originWindow)
				}

				return fakeWindow[propKey] || target[propKey]
			},
			set(target, propKey, value) {
				fakeWindow[propKey] = value
				return true
			}
		})
	}
	inactive() {
		console.log('close sandBox');
	}
}
