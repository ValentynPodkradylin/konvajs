import Konva from "konva";
import { Stage, StageConfig } from "konva/lib/Stage";

const container = "konva-container";
const height = window.innerHeight;
const width = window.innerWidth / 1.2;

const config: StageConfig = {
  container,
  width,
  height,
};

export const stage = new Konva.Stage(config);
