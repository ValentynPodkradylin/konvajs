import "./../index.html";
import "./../index.sass";

import Konva from "konva";

const height = window.innerHeight;
const width = window.innerWidth / 1.2;

const stage = new Konva.Stage({
  container: "konva-container", // id of container <div>
  width,
  height,
});

// then create layer
const layer = new Konva.Layer();

// create our shape
const circle1 = new Konva.Circle({
  x: stage.width() / 4,
  y: stage.height() / 4,
  radius: 70,
  fill: "red",
  stroke: "black",
  strokeWidth: 4,
  draggable: true,
});

const circle2 = new Konva.Circle({
  x: stage.width() / 2,
  y: stage.height() / 2,
  radius: 70,
  fill: "blue",
  stroke: "black",
  strokeWidth: 4,
  draggable: true,
});

// add the shape to the layer
layer.add(circle1);
layer.add(circle2);
// add the layer to the stage
stage.add(layer);

// draw the image
layer.draw();
