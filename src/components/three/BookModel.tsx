"use client";

import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Group, Mesh, MeshStandardMaterial, SRGBColorSpace, Vector3, type Material } from "three";
import { models, modelUrl, type ModelId } from "@/data/models";

/**
 * Loads a book GLB, re-orients it, centres it and scales it to height 1, so
 * every model can be positioned and sized the same way. Each instance clones
 * the scene and materials, so one file can appear in several places at once.
 */
export function BookModel({ model }: { model: ModelId }) {
  const { scene } = useGLTF(modelUrl(model));

  const object = useMemo(() => {
    const def = models[model];
    const inner = scene.clone(true);
    inner.rotation.set(...def.fix);
    const root = new Group();
    root.add(inner);
    root.updateMatrixWorld(true);

    const box = new Box3().setFromObject(inner);
    const size = box.getSize(new Vector3());
    inner.position.sub(box.getCenter(new Vector3()));
    root.scale.setScalar(1 / size.y);

    const finish = (source: Material) => {
      const m = source.clone();
      if (m instanceof MeshStandardMaterial) {
        m.envMapIntensity = 1;
        if (m.map) {
          // Cover artwork: true colours and a soft satin print finish.
          m.map.colorSpace = SRGBColorSpace;
          m.map.anisotropy = 8;
          m.roughness = Math.max(Math.min(m.roughness, 0.6), 0.45);
          m.metalness = 0;
        }
      }
      return m;
    };
    inner.traverse((o) => {
      if (o instanceof Mesh) o.material = Array.isArray(o.material) ? o.material.map(finish) : finish(o.material);
    });
    return root;
  }, [scene, model]);

  return <primitive object={object} />;
}

export const preloadModel = (id: ModelId) => useGLTF.preload(modelUrl(id));
