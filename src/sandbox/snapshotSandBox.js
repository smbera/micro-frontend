export class SnapShotSandBox {
	constructor() {
		this.proxy = window;
		this.active();
	}
	active() {
		this.snapshot = new Map(); 
		for (const key in window) {
			if (window.hasOwnProperty(key)) {
				this.snapshot[key] = window[key];
			}
		}
	}
	inactive() {
		for (const key in window) {
			if (window.hasOwnProperty(key)) {
				if (window[key] !== this.snapshot[key]) {
					window[key] = this.snapshot[key];
				}
			}
		}
	}
}
