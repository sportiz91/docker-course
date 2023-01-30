const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});

client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    res.send("Number of visits is " + visits);
    client.set("visits", parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log("Listening on Port 8081");
});

/*
En el caso que quiera definir en que host y port está corriendo el redis-server, podré pasarle un objeto de opciones.
Si no estuviera usando Docker para crear un container para el Redis Server Service, generalmente pondríamos algún tipo de address en el host.
Ej: 'https://my-redis-server.com'. Es decir, pondríamos un connection url en el host.
Pero, en este caso estamos usando Docker Compose. Entonces, queremos conectarnos al Container que está runneando el Redis-Server. 
Entonces, nos podremos conectar simplemente refiriéndonos al nombre del container -> 'redis-server'. Es decir, no necesito un connection url.
Sin embargo, express y redis library no tienen idea que significa redis-server. El Redis Client tomará el connection string y simplemente asumirá
Que es una valid URL -> https://my-redis-server.com.
Cuando especificamos createClient, también podremos especificar un port donde el redis-server estará runneando.
Por default, el port que se usa con redis es 6379. 
Sin embargo este port es un default port number.

*/
