import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Best-effort: block common browser zoom shortcuts (not guaranteed).
window.addEventListener("keydown", (event) => {
	const isZoomKey = event.key === "+" || event.key === "-" || event.key === "=";
	if ((event.ctrlKey || event.metaKey) && isZoomKey) {
		event.preventDefault();
	}
}, { capture: true });

window.addEventListener(
	"wheel",
	(event) => {
		if (event.ctrlKey) {
			event.preventDefault();
		}
	},
	{ passive: false, capture: true }
);

window.addEventListener("gesturestart", (event) => {
	event.preventDefault();
}, { capture: true });

window.addEventListener("gesturechange", (event) => {
	event.preventDefault();
}, { capture: true });

window.addEventListener("gestureend", (event) => {
	event.preventDefault();
}, { capture: true });

createRoot(document.getElementById("root")!).render(<App />);
