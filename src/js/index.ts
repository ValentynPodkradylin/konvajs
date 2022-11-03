import "./../index.html";
import "./../index.sass";
import { stage } from "./stage";
import Konva from "konva";
import { circles } from "./shapes";
import type { Shape, ShapeConfig } from "konva/lib/Shape";

const layer = new Konva.Layer();

stage.add(layer);

const tempLayer = new Konva.Layer();
stage.add(tempLayer);

const text = new Konva.Text({
  fill: "black",
});

layer.add(text);

circles.forEach((circle) => layer.add(circle));

stage.on("dragstart", function (e) {
  e.target.moveTo(tempLayer);
  layer.draw();
  text.text("Moving " + e.target.name());
});

let previousShape: Shape<ShapeConfig> | undefined;
stage.on("dragmove", function (evt) {
  const pos = stage.getPointerPosition();
  if (!pos) {
    return;
  }
  const shape = layer.getIntersection(pos);
  if (previousShape && shape) {
    if (previousShape !== shape) {
      previousShape.fire(
        "dragleave",
        {
          evt: evt.evt,
        },
        true
      );

      shape.fire(
        "dragenter",
        {
          evt: evt.evt,
        },
        true
      );
      previousShape = shape;
    } else {
      previousShape.fire(
        "dragover",
        {
          evt: evt.evt,
        },
        true
      );
    }
  } else if (!previousShape && shape) {
    previousShape = shape;
    shape.fire(
      "dragenter",
      {
        evt: evt.evt,
      },
      true
    );
  } else if (previousShape && !shape) {
    previousShape.fire(
      "dragleave",
      {
        evt: evt.evt,
      },
      true
    );
    previousShape = undefined;
  }
});

stage.on("dragend", function (e) {
  const pos = stage.getPointerPosition();
  if (!pos) {
    return;
  }

  const shape = layer.getIntersection(pos);
  if (shape) {
    if (!previousShape) {
      return;
    }

    previousShape.fire(
      "drop",
      {
        evt: e.evt,
      },
      true
    );
  }
  previousShape = undefined;
  e.target.moveTo(layer);
});

stage.on("dragenter", function (e) {
  // @ts-ignore
  e.target.fill("green");
  text.text("dragenter " + e.target.name());
});

stage.on("dragleave", function (e) {
  // @ts-ignore
  e.target.fill("blue");
  text.text("dragleave " + e.target.name());
});

stage.on("dragover", function (e) {
  text.text("dragover " + e.target.name());
});

stage.on("drop", function (e) {
  // @ts-ignore
  e.target.fill("red");
  text.text("drop " + e.target.name());
});
