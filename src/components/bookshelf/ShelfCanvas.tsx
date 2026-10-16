"use client";

import { Suspense, useRef, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, View } from "@react-three/drei";
import { MathUtils, type Group } from "three";
import { BookModel } from "@/components/three/BookModel";
import { shelfBooks } from "@/data/books";

type Props = {
  /** Element that receives pointer events and bounds the canvas. */
  container: RefObject<HTMLDivElement | null>;
  /** One DOM slot per book; each book renders exactly inside its slot. */
  slots: RefObject<HTMLDivElement | null>[];
  /** Start the one-by-one entrance once the section is in view. */
  play: boolean;
  /** Index of the slot under the pointer (book turns gently towards the viewer). */
  hovered: number | null;
  /** Keep rendering only while the section is on screen. */
  active: boolean;
  reducedMotion: boolean;
};

/**
 * Bookshelf 3D (one of only two 3D areas on the site, with the hero). A
 * single WebGL canvas covers the shelf and draws each book into its own DOM
 * slot via drei <View>, so books stay aligned with their captions at every
 * breakpoint.
 */
export default function ShelfCanvas({ container, slots, play, hovered, active, reducedMotion }: Props) {
  return (
    <Canvas
      eventSource={container as RefObject<HTMLElement>}
      className="pointer-events-none !absolute inset-0"
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    >
      {shelfBooks.map((book, i) => (
        <View key={book.model} track={slots[i] as RefObject<HTMLElement>}>
          <PerspectiveCamera makeDefault position={[0, 0.05, 2.75]} fov={30} />
          <ambientLight intensity={1.1} />
          <directionalLight position={[2.5, 3, 4]} intensity={2.4} />
          <directionalLight position={[-3, 1, 2]} intensity={0.8} />
          <hemisphereLight args={["#ffffff", "#dddddd", 0.6]} />
          <Suspense fallback={null}>
            <ShelfBook index={i} play={play} hovered={hovered === i} reducedMotion={reducedMotion}>
              <BookModel model={book.model} />
            </ShelfBook>
          </Suspense>
        </View>
      ))}
    </Canvas>
  );
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

function ShelfBook({
  index,
  play,
  hovered,
  reducedMotion,
  children,
}: {
  index: number;
  play: boolean;
  hovered: boolean;
  reducedMotion: boolean;
  children: React.ReactNode;
}) {
  const group = useRef<Group>(null);
  const startedAt = useRef<number | null>(null);
  const turn = useRef(0);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const now = state.clock.elapsedTime;

    // Entrance: books rise and turn to face the reader, one after another.
    let p = 0;
    if (reducedMotion) p = 1;
    else if (play) {
      startedAt.current ??= now;
      p = MathUtils.clamp((now - startedAt.current - index * 0.28) / 1.3, 0, 1);
    }
    const e = easeOut(p);

    // Hover: a gentle turn that reveals the spine.
    turn.current = MathUtils.damp(turn.current, hovered ? -0.45 : 0, 5, delta);
    const sway = reducedMotion ? 0 : Math.sin(now * 0.5 + index * 1.3) * 0.06;

    g.position.y = (1 - e) * -0.5 + (reducedMotion ? 0 : Math.sin(now * 0.8 + index) * 0.012 * e);
    g.rotation.y = (1 - e) * 0.9 + sway * e + turn.current - 0.18;
    g.rotation.x = 0.04;
    g.scale.setScalar(Math.max(0.001, e) * 1.05);
  });

  return <group ref={group}>{children}</group>;
}
