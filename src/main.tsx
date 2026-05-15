import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Best-effort: block common browser zoom shortcuts (not guaranteed).
window.addEventListener("keydown", (event) => {
	const isZoomKey = event.key === "+" || event.key === "-" || event.key === "=";
	if ((event.ctrlKey || event.metaKey) && isZoomKey) {
		event.preventDefault();
	}
});

window.addEventListener(
	"wheel",
	(event) => {
		if (event.ctrlKey) {
			event.preventDefault();
		}
	},
	{ passive: false }
);

window.addEventListener("gesturestart", (event) => {
	event.preventDefault();
});

createRoot(document.getElementById("root")!).render(<App />);
