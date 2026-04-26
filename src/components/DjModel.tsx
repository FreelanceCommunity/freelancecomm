import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import "@google/model-viewer";
import djUrl from "@/assets/dj_music_man.glb?url";

type ModelViewerElement = HTMLElement & {
  play?: () => Promise<void>;
  updateFraming?: () => void;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        src?: string;
        autoplay?: boolean;
        "animation-name"?: string;
        exposure?: string;
        "shadow-intensity"?: string;
        "camera-orbit"?: string;
        "camera-target"?: string;
        "field-of-view"?: string;
        "min-camera-orbit"?: string;
        "max-camera-orbit"?: string;
        "interaction-prompt"?: string;
        loading?: "auto" | "lazy" | "eager";
        reveal?: "auto" | "interaction" | "manual";
      };
    }
  }
}

const DjModel = ({ scrollMV: _scrollMV }: { scrollMV?: MotionValue<number> }) => {
  const viewerRef = useRef<ModelViewerElement>(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const onLoad = () => {
      viewer.updateFraming?.();
      void viewer.play?.();
    };

    viewer.addEventListener("load", onLoad);
    return () => viewer.removeEventListener("load", onLoad);
  }, []);

  return (
    <model-viewer
      ref={viewerRef}
      src={djUrl}
      autoplay
      animation-name="*"
      exposure="1.15"
      shadow-intensity="0.75"
      camera-orbit="-25deg 80deg 70%"
      camera-target="0m 1m 0m"
      field-of-view="18deg"
      min-camera-orbit="-25deg 80deg 70%"
      max-camera-orbit="-25deg 80deg 70%"
      interaction-prompt="none"
      loading="eager"
      reveal="auto"
      className="block h-full w-full"
      style={{ width: "100%", height: "100%", background: "transparent" }}
    />
  );
};

export default DjModel;