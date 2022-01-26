import { currentApp } from './util';
import { prefetch } from './htmlLoader/prefetch';
import { setList } from './const/subApps'
import { rewriteRouter } from './router/rewriteRouter'
import { setMainLifecycle } from './const/mainLifecycles';

rewriteRouter()

export const registerMicroApps = (apps, mainLifecycle) => {
	setList(apps)
	setMainLifecycle(mainLifecycle)
}

export const start = async () => {
	const app = currentApp();
	if (app) {
		const { pathname, hash } = window.location
		const url = pathname + hash

		window.history.pushState(url, app.name, url || app.activeRule)
	}

	window.__CURRENT_SUB_APP__ = app.activeRule;

	await prefetch()
}
