import { parseHtml } from './htmlLoader';
import { getList } from '../const/subApps';

export const prefetch = async () => {
	const appPieces = getList().filter(item => !window.location.pathname.startsWith(item.activeRule));
	await Promise.all(appPieces.map(async app => await parseHtml(app.entry, app.name)))
};
