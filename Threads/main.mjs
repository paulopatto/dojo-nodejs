import { Worker } from "node:worker_threads";

function createThread(data) {
  const worker = new Worker("./job.mjs");
  worker.postMessage(data);

  /**
   * Como a comunicação de threads com o processo principal é por callbacks
   * é feita uma transformação para Promises;
   *
   * Ou seja é enviado uma mensagem :postMessage -> data 
   * E ela devolve através do evento :message e ai podemos resolver a promisse
   */
  const threadPromise = new Promise((resolve, reject) => {
    worker.once("message", (message) => {
      return resolve(message);
    });
    worker.once("error", reject);
  });

  return threadPromise;
}

const results = await Promise.all([
  createThread({ password: "file01", }),
  createThread({ password: "file02", }),
  createThread({ password: "file03", }),
  createThread({ password: "file04", }),
  createThread({ password: "file05", }),
  createThread({ password: "file06", }),
]);

console.log(results);
