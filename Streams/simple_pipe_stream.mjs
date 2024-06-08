import fs from 'node:fs';
import CSV from 'csv-parser';
import { Transform, Writable } from 'node:stream';

/// Ler o arquivo

// 1. LER: Criar o stream de leitura :readeableStream
const readableStream = fs.createReadStream('./Streams/data/customers.csv');

// 2. PARSER: Usar uma transformStream 
const transformStream = CSV({ separator: ','});

// 3. GARAVÇÃO: Criar destino dos dados WritableStream que devem vir em buffer (encoded string) e não Objeto
//    por isso temos de fazer mais um transform aqui.
const transformToString = new Transform({
  objectMode: true, // Marca que os dados recebidos serão como objeto
  transform(chunk, encoding, cb) {
    cb(null, JSON.stringify(chunk));
  }
});

const writableStream = new Writable({ write(chunk, encoding, cb) {
  // Converter buffer em string;
  const str = chunk.toString();
  const obj = JSON.parse(str);
  // console.log(obj);

  // Sempre temos de chamar a função de callback, pois é ela que vai dar o next para a próxima linha 
  cb();
}});


// 4. Usar uma esteira de passagem do dado, ou seja um pipeline 
const startTime = Date.now();
console.log(`[${new Date().toISOString()}]: Iniciando processo de importação`);

readableStream
  .pipe(transformStream)
  .pipe(transformToString)
  .pipe(writableStream)
  .on('close', () => console.log(`[${new Date().toISOString()}]: Finalizado o processo em ${Date.now() - startTime} ms`));
