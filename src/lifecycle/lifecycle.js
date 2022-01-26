import { htmlLoader } from '../htmlLoader/htmlLoader';
import { findAppByRoute } from '../util';
import { getMainLifecycle } from '../const/mainLifecycles';

export const lifecycle = async () => {
	const prevApp = findAppByRoute(window.__PRE_APP__);
	const nextApp = findAppByRoute(window.__CURRENT_SUB_APP__);

	if (!nextApp) {
		return
	}

	if (prevApp) {
		await unmount(prevApp);
	}

	await boostrap(nextApp);
	await mount(nextApp);
}

const boostrap = async (app) => {
	await runMainLifeCycle('bootstrap', app)
	await htmlLoader(app);
	app && await app.bootstrap();
}

const mount = async (app) => {
	app && await app.mount(app);
	await runMainLifeCycle('mount', app)
}

const unmount = async (app) => {
	app && app.unmount && await app.unmount(app);
	await runMainLifeCycle('unmount', app)
}

const runMainLifeCycle = async (type, app) => {
	const mainLife = getMainLifecycle();
	await Promise.all(mainLife[type].map(item => item(app)))
}
