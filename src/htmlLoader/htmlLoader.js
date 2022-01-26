import { sandbox } from '../sandbox/sandbox';
import { findAppByName } from '../util';

const cache = {};

export const parseHtml = async (url, appName) => {
	if (cache[appName]) {
		return cache[appName];
	}
	const div = document.createElement('div');
	let scriptsArray = [];

	div.innerHTML = await fetch(url).then(async res => res.text());

	const [scriptUrls, scripts, elements] = getResources(div, findAppByName(appName));
	const fetchedScript = await Promise.all(scriptUrls.map(url => fetch(url).then(async res => res.text())));

	scriptsArray = scripts.concat(fetchedScript);
	cache[appName] = [elements, scriptsArray];

	return [elements, scriptsArray];
}

export const getResources = (root, app) => {
	const scriptUrls = [];
	const scripts = [];

	function deepParse(element) {
		const children = element.children;
		const parent = element.parentNode;

		if (element.nodeName.toLowerCase() === 'script') {
			const src = element.getAttribute('src');
			if (!src) {
				let script = element.outerHTML;
				scripts.push(script);
			} else {
				if (src.startsWith('http')) {
					scriptUrls.push(src);
				} else {
					scriptUrls.push(`http:${app.entry}/${src}`);
				}
			}

			if (parent) {
				let comment = document.createComment('replaced by micro-frontend');
				parent.replaceChild(comment, element);
			}
		}

		if (element.nodeName.toLowerCase() === 'link') {
			const href = element.getAttribute('href');
			if (href.endsWith('.js')) {
				if (href.startsWith('http')) {
					scriptUrls.push(href);
				} else {
					scriptUrls.push(`http:${app.entry}/${href}`);
				}
			}
		}
		children.forEach(child => deepParse(child))
	}
	deepParse(root);

	return [scriptUrls, scripts, root.outerHTML];
}

export const htmlLoader = async (app) => {
	const {
		container: cantainerName, entry, name
	} = app
	let [dom, scriptsArray] = await parseHtml(entry, name);

	let container = document.querySelector(cantainerName);
	if (!container) {
		throw Error(` ${name} is no exist!!!`);
	}

	container.innerHTML = dom;
	scriptsArray.map((script) => {
		sandbox(script, name);
	});
}
