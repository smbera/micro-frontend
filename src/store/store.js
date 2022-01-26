export const initGlobalState = (state) => {
	let store = state
	let callbacks = []

	const onGlobalStateChange = (callback) => {
		callbacks.push(callback)
	}

	const setGlobalState = (newState) => {
		if (newState !== store) {
			callbacks.forEach(callback => callback(newState, store))
			store = newState
		}
	}

	const offGlobalStateChange = () => {
		callbacks = []
	}

	return { onGlobalStateChange, setGlobalState, offGlobalStateChange }
}
