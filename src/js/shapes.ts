import Konva from "konva";
import { stage } from "./stage";

export const circles = Array(3)
  .fill(0)
  .map((_, i) => {
    return new Konva.Circle({
      x: stage.width() * Math.random(),
      y: stage.height() * Math.random(),
      radius: 70,
      fill: "blue",
      stroke: "black",
      strokeWidth: 4,
      draggable: true,
      name: `circle${i}`,
    });
  });
