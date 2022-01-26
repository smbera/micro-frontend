import { getList } from '../const/subApps';

export const patchRouter = (event, ListerName) => {
	return function () {
		const e = new Event(ListerName);
		event.apply(this, arguments);
		window.dispatchEvent(e);
	};
};

export const isTurnChild = () => {
	const { pathname, hash } = window.location
	const url = pathname + hash
	const currentPrefix = url.match(/(\/\w+)/g)

	if (
		currentPrefix &&
		(currentPrefix[0] === window.__CURRENT_SUB_APP__) &&
		hash === window.__CURRENT_HASH__
	) {
		return false;
	}

	window.__PRE_APP__ = window.__CURRENT_SUB_APP__;

	const currentSubApp = window.location.pathname.match(/(\/\w+)/)

	if (!currentSubApp) {
		return false
	}

	window.__CURRENT_SUB_APP__ = currentSubApp[0];
	window.__CURRENT_HASH__ = hash

	return true;
};

export const currentApp = () => {
	const currentRouter = window.location.pathname.match(/(\/\w+)/)[0];
	return filterApp('activeRule', currentRouter);
};

export const findAppByRoute = (router) => {
	return filterApp('activeRule', router);
};

export const findAppByName = (name) => {
	return filterApp('name', name);
};

export const filterApp = (key, rule) => {
	const currentApp = getList().filter(app => app[key] === rule);
	return currentApp.length ? currentApp[0] : false;
};
