import { lifecycle } from "../lifecycle/lifecycle"
import { isTurnChild } from "../util"

export const turnApp = async () => {
	if (isTurnChild()) {
		await lifecycle()
	}
}
