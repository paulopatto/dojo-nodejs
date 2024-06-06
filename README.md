# Estudos de NodeJS Multi Thread


## Iniciando com threads 

No arquivo `main.mjs` temos um processo principal que delega a geração de hashs em threads para o `job.mjs`.


Para uma execução normal com 4 jobs rodando:

```js 
const results = await Promise.all([
  createThread({ password: "file01", }),
  createThread({ password: "file02", }),
  createThread({ password: "file03", }),
  createThread({ password: "file04", })
]);
```

```bash 
npm run start 
```

Temos a seguinte saída, onde podemos ver que foge muito do padrão 
```
2024-06-05T23:49:25.909Z: A thread: 1 esta iniciando com file01
2024-06-05T23:49:25.910Z: A thread: 3 esta iniciando com file03
2024-06-05T23:49:25.911Z: A thread: 2 esta iniciando com file02
2024-06-05T23:49:25.912Z: A thread: 4 esta iniciando com file04
[                                                             
  'A thread 1 terminou o processamento em 602 ms. Gerou: [37a8003b360d9196601a4f596da20ed9937c6a5ca0d6bd224fe143a88f6c74f9]',
  'A thread 2 terminou o processamento em 630 ms. Gerou: [c9fd3de5aada16108d62164ef094a8045d75cb8abbe015b21d91eafb92423953]',
  'A thread 3 terminou o processamento em 640 ms. Gerou: [f0962dd2da6c428cb23d88bb71c85fed6efdbd2249dab572442c6a28a7f391ac]',
  'A thread 4 terminou o processamento em 630 ms. Gerou: [383b1be483b15dfdacd988085c54b866a835c5b3beea8fc3e524d53759065e60]'
]
```


Porém quando rodamos com 5 ou 6 jobs, vemos que alguns se destoam:

```js 
const results = await Promise.all([
  createThread({ password: "file01", }),
  createThread({ password: "file02", }),
  createThread({ password: "file03", }),
  createThread({ password: "file04", })
]);
```

Pode se observar que a thread 5 fugiu muito do padrão de tempo de execução.

```
2024-06-05T23:52:39.835Z: A thread: 2 esta iniciando com file02
2024-06-05T23:52:39.855Z: A thread: 3 esta iniciando com file03
2024-06-05T23:52:39.858Z: A thread: 4 esta iniciando com file04
2024-06-05T23:52:39.858Z: A thread: 1 esta iniciando com file01
2024-06-05T23:52:39.861Z: A thread: 5 esta iniciando com file05
[                                                                                                                                              
  'A thread 1 terminou o processamento em 632 ms. Gerou: [37a8003b360d9196601a4f596da20ed9937c6a5ca0d6bd224fe143a88f6c74f9]',
  'A thread 2 terminou o processamento em 618 ms. Gerou: [c9fd3de5aada16108d62164ef094a8045d75cb8abbe015b21d91eafb92423953]',
  'A thread 3 terminou o processamento em 630 ms. Gerou: [f0962dd2da6c428cb23d88bb71c85fed6efdbd2249dab572442c6a28a7f391ac]',
  'A thread 4 terminou o processamento em 633 ms. Gerou: [383b1be483b15dfdacd988085c54b866a835c5b3beea8fc3e524d53759065e60]',
  'A thread 5 terminou o processamento em 1194 ms. Gerou: [55476fd86d6c6532ec05a93568d08bd0cb64f3d63113a62c282f1df49d58c46a]'
]
```

Para melhorar isso podemos aumentar o thread pool size com a variável `UV_THREADPOOL_SIZE` onde vamos configurar a [libuv](https://libuv.org/) para usar mais threads. Vamos a um exemplo usando 10 jobs em 15 threads:

```js 
const results = await Promise.all([
  createThread({ password: "file01", }),
  createThread({ password: "file02", }),
  createThread({ password: "file03", }),
  createThread({ password: "file04", }),
  createThread({ password: "file05", }),
  createThread({ password: "file06", }),
  createThread({ password: "file07", }),
  createThread({ password: "file08", }),
  createThread({ password: "file09", }),
  createThread({ password: "file10", }),
]);
```

Vamos rodar com o comando: `npm run start` e depois o `npm run start-15`


```
$ npm run start 

2024-06-06T00:00:24.667Z: A thread: 1 esta iniciando com file01
2024-06-06T00:00:24.677Z: A thread: 3 esta iniciando com file03
2024-06-06T00:00:24.675Z: A thread: 5 esta iniciando com file05
2024-06-06T00:00:24.691Z: A thread: 8 esta iniciando com file08
2024-06-06T00:00:24.697Z: A thread: 4 esta iniciando com file04
2024-06-06T00:00:24.703Z: A thread: 7 esta iniciando com file07
2024-06-06T00:00:24.705Z: A thread: 2 esta iniciando com file02
2024-06-06T00:00:24.708Z: A thread: 6 esta iniciando com file06
2024-06-06T00:00:24.709Z: A thread: 10 esta iniciando com file10
2024-06-06T00:00:24.711Z: A thread: 9 esta iniciando com file09
[                                                                                                                                              
  'A thread 1 terminou o processamento em 646 ms. Gerou: [37a8003b360d9196601a4f596da20ed9937c6a5ca0d6bd224fe143a88f6c74f9]',
  'A thread 2 terminou o processamento em 1259 ms. Gerou: [c9fd3de5aada16108d62164ef094a8045d75cb8abbe015b21d91eafb92423953]',
  'A thread 3 terminou o processamento em 678 ms. Gerou: [f0962dd2da6c428cb23d88bb71c85fed6efdbd2249dab572442c6a28a7f391ac]',
  'A thread 4 terminou o processamento em 603 ms. Gerou: [383b1be483b15dfdacd988085c54b866a835c5b3beea8fc3e524d53759065e60]',
  'A thread 5 terminou o processamento em 686 ms. Gerou: [55476fd86d6c6532ec05a93568d08bd0cb64f3d63113a62c282f1df49d58c46a]',
  'A thread 6 terminou o processamento em 1252 ms. Gerou: [7adfdedf4981bbe435b3e44f124d4b0c933cfa81d52e71746431440f8f4809b2]',
  'A thread 7 terminou o processamento em 1217 ms. Gerou: [01528b679a1834aa6f3aea4139c79f00bf5ce0c3eb475589db19547d73994e03]',
  'A thread 8 terminou o processamento em 1211 ms. Gerou: [8355392e984d02a2b119d3a9d94757c5dda546c7e9867246304d63ad985e5b3b]',
  'A thread 9 terminou o processamento em 1800 ms. Gerou: [af706e34fc1afa9043bfd17baabdb8d270a38d8cbaf35dd0142c2efd4b707911]',
  'A thread 10 terminou o processamento em 1788 ms. Gerou: [cbb4e5da19b7b3630b96e1366b28850921219f050dd5019866172b1a6fa346b8]'
]
```

Observe que as threads 1, 3, 4 e 5 que pegaram o pool inicial foram bem mais rápidas. E a 9 e 10 pelo jeito pegaram os final da fila no pool.

Agora o mesmo código com `15` threads.
```
$ npm run start-15 

2024-06-06T00:04:00.059Z: A thread: 1 esta iniciando com file01
2024-06-06T00:04:00.068Z: A thread: 2 esta iniciando com file02
2024-06-06T00:04:00.069Z: A thread: 5 esta iniciando com file05
2024-06-06T00:04:00.072Z: A thread: 3 esta iniciando com file03
2024-06-06T00:04:00.073Z: A thread: 7 esta iniciando com file07
2024-06-06T00:04:00.078Z: A thread: 6 esta iniciando com file06
2024-06-06T00:04:00.094Z: A thread: 8 esta iniciando com file08
2024-06-06T00:04:00.112Z: A thread: 10 esta iniciando com file10
2024-06-06T00:04:00.115Z: A thread: 9 esta iniciando com file09 
2024-06-06T00:04:00.117Z: A thread: 4 esta iniciando com file04 
[                                                              
  'A thread 1 terminou o processamento em 544 ms. Gerou: [37a8003b360d9196601a4f596da20ed9937c6a5ca0d6bd224fe143a88f6c74f9]',
  'A thread 2 terminou o processamento em 586 ms. Gerou: [c9fd3de5aada16108d62164ef094a8045d75cb8abbe015b21d91eafb92423953]',
  'A thread 3 terminou o processamento em 587 ms. Gerou: [f0962dd2da6c428cb23d88bb71c85fed6efdbd2249dab572442c6a28a7f391ac]',
  'A thread 4 terminou o processamento em 500 ms. Gerou: [383b1be483b15dfdacd988085c54b866a835c5b3beea8fc3e524d53759065e60]',
  'A thread 5 terminou o processamento em 553 ms. Gerou: [55476fd86d6c6532ec05a93568d08bd0cb64f3d63113a62c282f1df49d58c46a]',
  'A thread 6 terminou o processamento em 547 ms. Gerou: [7adfdedf4981bbe435b3e44f124d4b0c933cfa81d52e71746431440f8f4809b2]',
  'A thread 7 terminou o processamento em 550 ms. Gerou: [01528b679a1834aa6f3aea4139c79f00bf5ce0c3eb475589db19547d73994e03]',
  'A thread 8 terminou o processamento em 592 ms. Gerou: [8355392e984d02a2b119d3a9d94757c5dda546c7e9867246304d63ad985e5b3b]',
  'A thread 9 terminou o processamento em 552 ms. Gerou: [af706e34fc1afa9043bfd17baabdb8d270a38d8cbaf35dd0142c2efd4b707911]',
  'A thread 10 terminou o processamento em 549 ms. Gerou: [cbb4e5da19b7b3630b96e1366b28850921219f050dd5019866172b1a6fa346b8]'
]
```

----

## Link's

- [Article: Don't Block the Event Loop (or the Worker Pool)](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)
- [Article: Maximizing Node.js Performance with Thread Pools](https://rabisiddique.medium.com/maximizing-node-js-performance-with-thread-pools-912bacbe529a)
- [Article: Node.js Thread Pool Performance Limitations](https://chedidomar.medium.com/nodejs-thread-pool-performance-limitations-33e77811ff5b)
