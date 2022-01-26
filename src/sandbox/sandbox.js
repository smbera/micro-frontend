import { ProxySandBox } from './proxySandBox';
import { findAppByName } from '../util';
import { performScriptForEval } from './performScript';

export const lackOfLifecycle = (lifecycles) => !lifecycles ||
	!lifecycles.bootstrap ||
	!lifecycles.mount ||
	!lifecycles.unmount;

export const sandbox = (script, appName) => {
	const app = findAppByName(appName);

	const global = new ProxySandBox();

	window.__MICRO_FRONTEND__ = true;

	const lifeCycles = performScriptForEval(script, appName, global.proxy);

	app.sandBox = global;

	const isLack = lackOfLifecycle(lifeCycles)
	if (isLack) {
		return;
	}

	app.bootstrap = lifeCycles.bootstrap;
	app.mount = lifeCycles.mount;
	app.unmount = lifeCycles.unmount;
}
