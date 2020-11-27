#! /usr/bin/env node
"use strict";
var HID = require("node-hid");

const robot = require("robotjs");

const DEFAULT_KEYS = ["audio_prev", "audio_pause", "audio_next"];
const RETRY_INTERVAL = 5 * 1000;

const argv = require("yargs")
  .array("k")
  .alias("k", "keys")
  .alias("m", "vendorId")
  .alias("p", "productId")
  .default("vendorId", 1523)
  .default("productId", 255)
  .default("k", []).argv;

const keyMap = DEFAULT_KEYS.map((key, i) => argv.keys[i] || key);
const state = [false, false, false];

console.log("Current keymap:", keyMap);
console.log(
  `Current Product ID ${argv.productId}\nCurrent Vendor ID ${argv.vendorId}`
);

let lastStateIndex = -1;

function updateState(index) {
  if (index === 0) {
    if (lastStateIndex === -1) {
      return;
    }
    const key = keyMap[lastStateIndex];
    robot.keyToggle(key, "up");
    state[index] = false;
    lastStateIndex = -1;
  } else {
    index = index === 1 || index === 2 ? index - 1 : 2;
    const key = keyMap[index];
    robot.keyToggle(key, "down");
    lastStateIndex = index;
    state[index] = true;
  }
}

function openFile() {
  var device = new HID.HID(argv.productId, argv.vendorId);
  const size = 8;
  const offset = 4;
  device.on("data", (chunk) => {
    updateState(chunk[0]);
  });

  device.on("error", function (err) {
    console.log("failed to open file", err);
    setTimeout(openFile, RETRY_INTERVAL);
  });
}

openFile();
