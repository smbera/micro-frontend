export const performScriptForEval = (script, appName, global) => {
	const scriptText = `
		(() => () => {
			try {
				${script}
				return window['${appName}']
			} catch (err) {
				console.error('runScript error:' + err);
			}
		})()
	`
	return (() => eval(scriptText))().call(global, global)
}
