"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface HalftoneHeroProps {
  videoSrc: string;
  posterSrc?: string;
  dotSpacing?: number;
  colorDark?: string;
  colorLight?: string;
  vignette?: number;
  className?: string;
  children?: React.ReactNode;
}

export default function HalftoneHero({
  videoSrc,
  posterSrc,
  dotSpacing = 8,
  colorDark = "#191811",
  colorLight = "#F4EED1",
  vignette = 0.0,
  className,
  children,
}: HalftoneHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);
  const offCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number>(0);
  const [ready, setReady] = useState(false);

  const parsedDark = useRef(parseHex(colorDark));

  useEffect(() => {
    parsedDark.current = parseHex(colorDark);
  }, [colorDark]);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoSrc;
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    if (posterSrc) video.poster = posterSrc;

    videoRef.current = video;

    const onCanPlay = () => {
      setReady(true);
      video.play().catch(() => {});
    };
    video.addEventListener("canplaythrough", onCanPlay);

    return () => {
      video.removeEventListener("canplaythrough", onCanPlay);
      video.pause();
      video.src = "";
    };
  }, [videoSrc, posterSrc]);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const video = videoRef.current;
    const container = containerRef.current;
    if (!canvas || !ctx || !video || !container) return;
    if (video.readyState < 2) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const cw = Math.floor(rect.width * dpr);
    const ch = Math.floor(rect.height * dpr);
    if (cw < 1 || ch < 1) return;

    if (canvas.width !== cw) canvas.width = cw;
    if (canvas.height !== ch) canvas.height = ch;

    if (!offscreenRef.current) {
      offscreenRef.current = document.createElement("canvas");
      offCtxRef.current = offscreenRef.current.getContext("2d", {
        willReadFrequently: true,
      });
    }
    const off = offscreenRef.current;
    const offCtx = offCtxRef.current;
    if (!off || !offCtx) return;

    const spacing = Math.max(3, Math.round(dotSpacing * dpr));
    const cols = Math.ceil(cw / spacing);
    const rows = Math.ceil(ch / spacing);

    if (off.width !== cols) off.width = cols;
    if (off.height !== rows) off.height = rows;

    const vidW = video.videoWidth;
    const vidH = video.videoHeight;
    const vidAspect = vidW / vidH;
    const canvasAspect = cols / rows;
    let sw: number, sh: number, sx: number, sy: number;
    if (vidAspect > canvasAspect) {
      sh = vidH;
      sw = sh * canvasAspect;
      sx = (vidW - sw) / 2;
      sy = 0;
    } else {
      sw = vidW;
      sh = sw / canvasAspect;
      sx = 0;
      sy = (vidH - sh) / 2;
    }

    offCtx.drawImage(video, sx, sy, sw, sh, 0, 0, cols, rows);
    const imageData = offCtx.getImageData(0, 0, cols, rows);
    const pixels = imageData.data;

    const dark = parsedDark.current;

    ctx.fillStyle = colorLight;
    ctx.fillRect(0, 0, cw, ch);

    const maxR = spacing * 0.52;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const i = (row * cols + col) * 4;
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        const darkness = 1 - lum;
        const radius = maxR * darkness;

        if (radius > 0.3) {
          const cx = col * spacing + spacing * 0.5;
          const cy = row * spacing + spacing * 0.5;

          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${dark.r},${dark.g},${dark.b})`;
          ctx.fill();
        }
      }
    }

    if (vignette > 0) {
      const grad = ctx.createRadialGradient(
        cw * 0.5,
        ch * 0.5,
        Math.min(cw, ch) * 0.2,
        cw * 0.5,
        ch * 0.5,
        Math.max(cw, ch) * 0.75,
      );
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, `rgba(0,0,0,${0.7 * vignette})`);
      ctx.globalCompositeOperation = "multiply";
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = "source-over";
    }
  }, [dotSpacing, colorLight, vignette]);

  useEffect(() => {
    if (!ready) return;

    let running = true;

    function loop() {
      if (!running) return;
      drawFrame();
      rafRef.current = requestAnimationFrame(loop);
    }
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, [ready, drawFrame]);

  useEffect(() => {
    if (!ready || !containerRef.current) return;

    const observer = new ResizeObserver(() => drawFrame());
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [ready, drawFrame]);

  return (
    <section
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: colorLight,
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
      {children && (
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      )}
    </section>
  );
}

function parseHex(hex: string) {
  const h = hex.replace("#", "");
  const v =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  const num = parseInt(v, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}
