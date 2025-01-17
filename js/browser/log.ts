import config from "../config";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";
import log from "loglevel";

/** Record log statements and show some to the user via overlays. */
export default function initLog(): void {
	const notyf = new Notyf({
		duration: 10000,
		types: [
			{
				type: "warn",
				backgroundColor: "orange",
				icon: {
					className: "material-icons",
					tagName: "i",
					text: "warning",
				},
			},
			{
				type: "info",
				backgroundColor: "green",
				icon: {
					className: "material-icons",
					tagName: "i",
					text: "info",
				},
			},
			{
				type: "debug",
				backgroundColor: "blue",
				icon: {
					className: "material-icons",
					tagName: "i",
					text: "debug",
				},
			},
			{
				type: "trace",
				backgroundColor: "darkgray",
				icon: {
					className: "material-icons",
					tagName: "i",
					text: "trace",
				},
			},
		],
	});

	log.setLevel(config.logLevelConsole);
	const levels = ["error", "warn", "info", "debug", "trace"]; // no point in decorating silent
	const value = { silent: 0, error: 1, warn: 2, info: 3, debug: 4, trace: 5 };
	// wrap the loglevel functions in a "decorator" that adds logging to memory and to display
	for (const level of levels) {
		const tmp = log[level]; // save that particular original logging function of the loglevel library
		log[level] = (
			message // overwrite that function with a new function
		) => {
			tmp(message); // execute the saved original function, which writes to console
			if (value[level] <= value[config.logLevelMemory]) {
				if (!log["logs"]) {
					log["logs"] = [];
				}
				log["logs"].push(message);
			}
			if (value[level] <= value[config.logLevelDisplay]) {
				notyf.open({ type: level, message: message });
			}
		};
	}
}
