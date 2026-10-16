/**
 * 3D book models — used ONLY by the homepage hero and the Bookshelf section.
 *
 * Files live in /public/3d. They are web-optimised copies of the originals in
 * /public/3d models (textures re-encoded to 1024px WebP, ~0.85 MB in total
 * instead of ~5.2 MB). Geometry is unchanged.
 */
export type ModelId = "mindToBend" | "darkestCraving" | "littleBird" | "kingpinsBaby" | "loserLuna";

export type ModelDef = {
  file: string;
  /**
   * Euler rotation applied before normalising, so height = +Y, the front
   * cover faces +Z and the spine sits on the left.
   */
  fix: [number, number, number, "XYZ" | "ZYX"];
};

const HALF_PI = Math.PI / 2;

export const models: Record<ModelId, ModelDef> = {
  mindToBend: { file: "book_model.glb", fix: [HALF_PI, 0, 0, "XYZ"] },
  darkestCraving: { file: "book.glb", fix: [HALF_PI, 0, 0, "XYZ"] },
  littleBird: { file: "little_bird_closed_book.glb", fix: [0, 0, 0, "XYZ"] },
  kingpinsBaby: { file: "simple_3d_black_book.glb", fix: [HALF_PI, 0, 0, "XYZ"] },
  loserLuna: { file: "simple_book.glb", fix: [HALF_PI, 0, HALF_PI, "ZYX"] },
};

export const modelUrl = (id: ModelId) => `/3d/${models[id].file}`;
