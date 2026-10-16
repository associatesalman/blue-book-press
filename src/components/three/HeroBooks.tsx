"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { MathUtils, type Group } from "three";
import { BookModel, preloadModel } from "@/components/three/BookModel";
import type { ModelId } from "@/data/models";
import { MOBILE_BAND_PX, WIDE_MIN_PX } from "./heroLayout";

/**
 * Hero 3D books (one of only two 3D areas on the site, with the Bookshelf).
 *
 * Wide screens: books flank the centred headline — a large book each side,
 * with smaller ones set back in depth. Narrow screens: a compact row of three
 * books in the band reserved below the hero buttons (`MOBILE_BAND_PX`).
 */


type Pose = { x: number; y: number; z: number; rx: number; ry: number; rz: number; s: number };
type Placement = { model: ModelId; wide: Pose | null; narrow: Pose | null };

/** Positions are fractions of the visible world (x of width, y of height); `s` is book height as a fraction of height. */
const books: Placement[] = [
  {
    model: "mindToBend",
    wide: { x: -0.355, y: -0.04, z: 0, rx: 0.05, ry: 0.5, rz: 0.04, s: 0.5 },
    narrow: { x: 0, y: 0, z: 0.3, rx: 0.05, ry: -0.3, rz: 0, s: 0.72 },
  },
  {
    model: "darkestCraving",
    wide: { x: 0.355, y: 0.02, z: 0, rx: 0.05, ry: -0.5, rz: -0.04, s: 0.5 },
    narrow: { x: -0.3, y: -0.03, z: -0.4, rx: 0.05, ry: 0.55, rz: 0.06, s: 0.6 },
  },
  {
    model: "littleBird",
    wide: { x: -0.44, y: 0.33, z: -1.6, rx: 0.3, ry: 0.65, rz: 0.32, s: 0.24 },
    narrow: { x: 0.3, y: -0.03, z: -0.4, rx: 0.05, ry: -0.55, rz: -0.06, s: 0.6 },
  },
  {
    model: "loserLuna",
    wide: { x: 0.43, y: -0.3, z: -1.3, rx: -0.2, ry: -0.7, rz: -0.3, s: 0.22 },
    narrow: null,
  },
];

books.forEach((b) => preloadModel(b.model));

export default function HeroBooks({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas
      className="pointer-events-none !absolute inset-0"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], fov: 30 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 8]} intensity={2.2} />
      <directionalLight position={[-6, 2, 4]} intensity={0.7} />
      {/* Neutral studio reflections built from light panels — no HDR download, no coloured light. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2} position={[0, 4, 5]} scale={[10, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.2} position={[-5, 0, 3]} scale={[2, 8, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1} position={[5, 1, 2]} scale={[2, 8, 1]} target={[0, 0, 0]} />
      </Environment>
      <Suspense fallback={null}>
        <Stage reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function Stage({ reducedMotion }: { reducedMotion: boolean }) {
  const rig = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  // Pointer and scroll come from the window: the canvas itself ignores pointer events.
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => (scroll.current = window.scrollY);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useFrame((state, delta) => {
    const g = rig.current;
    if (!g || reducedMotion) return;
    // Soft parallax toward the pointer, and books lag slightly behind the page on scroll.
    g.rotation.y = MathUtils.damp(g.rotation.y, pointer.current.x * 0.08, 3, delta);
    g.rotation.x = MathUtils.damp(g.rotation.x, pointer.current.y * 0.05, 3, delta);
    // Scroll drift only on wide screens; on narrow screens the books sit at the bottom of the hero.
    const worldPerPx = state.viewport.height / state.size.height;
    const drift = state.size.width >= WIDE_MIN_PX ? -scroll.current * worldPerPx * 0.3 : 0;
    g.position.y = MathUtils.damp(g.position.y, drift, 6, delta);
  });

  return (
    <group ref={rig}>
      {books.map((b, i) => (
        <HeroBook key={b.model} placement={b} index={i} reducedMotion={reducedMotion} />
      ))}
    </group>
  );
}

function HeroBook({ placement, index, reducedMotion }: { placement: Placement; index: number; reducedMotion: boolean }) {
  const ref = useRef<Group>(null);
  const startedAt = useRef<number | null>(null);
  const { size, viewport } = useThree();

  const wide = size.width >= WIDE_MIN_PX;
  const pose = wide ? placement.wide : placement.narrow;

  useFrame((state) => {
    const g = ref.current;
    if (!g || !pose) return;
    const now = state.clock.elapsedTime;
    startedAt.current ??= now;

    const { width: w, height: h } = viewport;
    let x = pose.x * w;
    let y = pose.y * h;
    let s = pose.s * h;
    if (wide) {
      // Never let a flanking book grow into the headline column.
      s = Math.min(s, (pose.s / 0.5) * 0.27 * w);
    } else {
      // Narrow: sit inside the band below the content, sized from the band height.
      const band = (MOBILE_BAND_PX / size.height) * h;
      y = -h / 2 + band * 0.5 + pose.y * band;
      s = pose.s * band;
      x = pose.x * Math.min(w, band * 2.4);
    }

    // Staggered cinematic entrance: rise from below and turn into place.
    const p = reducedMotion ? 1 : MathUtils.clamp((now - startedAt.current - 0.35 - index * 0.16) / 1.6, 0, 1);
    const e = easeOutExpo(p);
    const float = reducedMotion ? 0 : Math.sin(now * 0.8 + index * 1.7) * 0.025 * s;
    const sway = reducedMotion ? 0 : Math.sin(now * 0.45 + index) * 0.05;

    g.position.set(x, y - (1 - e) * s * 0.9 + float, pose.z);
    g.rotation.set(pose.rx + (1 - e) * 0.4, pose.ry + (1 - e) * (pose.x < 0 ? 1.4 : -1.4) + sway, pose.rz);
    g.scale.setScalar(Math.max(0.001, s * (0.7 + 0.3 * e)));
    g.visible = e > 0.001;
  });

  if (!pose) return null;
  return (
    <group ref={ref} visible={false}>
      <BookModel model={placement.model} />
    </group>
  );
}
