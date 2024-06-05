import { threadId, parentPort } from "node:worker_threads";
import { request } from "https";
import Crypto from "node:crypto";
import { warn } from "node:console";
const start = Date.now();
const SALT = "1234Mudar";
const ITERATIONS = 1000000;
const ALGORITHM = "sha512";
parentPort.once("message", ({password}) => {
  console.log(`${new Date().toISOString()}: A thread: ${threadId} esta iniciando com ${password}`);
  Crypto.pbkdf2(password, SALT , ITERATIONS, 32, ALGORITHM, (error, key) => {
    const msg = `A thread ${threadId} terminou o processamento em ${Date.now() - start} ms. Gerou: [${key.toString('hex')}]`;
    parentPort.postMessage(msg);
  });
});
