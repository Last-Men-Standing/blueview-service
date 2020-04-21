"use strict";
const app = require("./services/server");

/**
 * Starts up application and handles kill signals
 */

setImmediate(async () => await app.start());

process.on("exit", async () => await app.stop());
process.on("SIGINT", async () => await app.stop());
