import fs from 'node:fs';
import CSV from 'csv-parser';
import 'dotenv/config';
import { Transform, Writable } from 'node:stream';
import mysql from 'mysql2/promise';

// Create the connection to database
const pool = await mysql.createConnection({
  port: process.env.MYSQL_PORT,
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,

  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const BATCH_SIZE = 5000;

/// Ler o arquivo

// 1. LER: Criar o stream de leitura :readeableStream
const readableStream = fs.createReadStream('./Streams/data/customers.csv');

// 2. PARSER: Usar uma transformStream 
const transformStream = CSV({ separator: ','});

// 3. GARAVÇÃO: Criar destino dos dados WritableStream que devem vir em buffer (encoded string) e não Objeto
//    por isso temos de fazer mais um transform aqui.
const transformToORM = new Transform({
  objectMode: true, // Marca que os dados recebidos serão como objeto
  transform(chunk, encoding, cb) {
    delete chunk['Index'];
    const dict = {
      'Customer Id': 'customer_id',
      'First Name': 'first_name',
      'Last Name': 'last_name',
      Company: 'company',
      City: 'city',
      Country: 'country',
      'Phone 1': 'phone_1',
      'Phone 2': 'phone_2',
      Email: 'email',
      'Subscription Date': 'subscription_date',
      Website: 'website'
    };

    for (const k in dict) {
      const attr = dict[k];
      chunk[attr]  = chunk[k];
      delete chunk[k];
    }

    cb(null, chunk);
  }
});

const transformInBatchs = new Transform({
  objectMode: true,
  transform(register, encoding, cb) {
    let batch;

    if (typeof this.buffer === 'undefined') { 
      // Ensure buffer exists as Array
      this.buffer = []; 
    }
    this.buffer.push(register);
    
    if (this.buffer.length >= BATCH_SIZE) {
      batch = this.buffer.slice();
      this.buffer.length = 0;

      cb(null, JSON.stringify(batch));
      return;
    }

    cb(null, JSON.stringify(batch));

  }
});

const writableStream = new Writable({ write(batch, encoding, cb) {
  const chunk = JSON.parse(batch);
  const SQL = `INSERT INTO customers(customer_id, first_name, last_name,  company, city, country, phone_1, phone_2, email, subscription_date, website) VALUES ?`;
  const values = chunk.map((item) => {
    return [
      item.customer_id,
      item.first_name,
      item.last_name,
      item.company,
      item.city,
      item.country,
      item.phone_1,
      item.phone_2,
      item.email,
      item.subscription_date,
      item.website
    ];
  })
  pool.query(SQL, [values])
  cb();
}});

// 4. Usar uma esteira de passagem do dado, ou seja um pipeline 
const startTime = Date.now();
console.log(`[${new Date().toISOString()}]: Iniciando processo de importação`);

readableStream
  .pipe(transformStream)
  .pipe(transformToORM)
  .pipe(transformInBatchs)
  .pipe(writableStream)
  .on('close', () => { 
    pool.end()
    console.log(`[${new Date().toISOString()}]: Finalizado o processo em ${Date.now() - startTime} ms`)
  });
