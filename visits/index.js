const express = require("express");
const redis = require("redis");
const process = require("process");

const app = express();
const client = redis.createClient({
  host: "redis-server",
  port: 6379,
});

client.set("visits", 0);

app.get("/", (req, res) => {
  // process.exit(1);

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

55. Container Maintenance with Compose
Queremos hacer que la App crashee cada vez que alguien visite nuestra home route. Eso lo hacemos a través de process.exit(0).

Entonces, para startupear denuevo el container, vamos a escribir docker-compose up --build. Hicimos un cambio en una de las imágenes, y por eso
Es necesario startupear nuevamente el container.

Cuando hacemos el docker-compose up y volvemos a lanzar los dos containers y hacemos la visita a localhost:4001, veremos que crashea la página.
El mensaje que nos tira la consola es: visits-node-app-1 exited with code 0 -> veamos que tenemos visits (que es el nombre del Docker Project)
Y luego tenemos el nombre del service node-app (service = tipo especial de container).

Cuando tiramos el docker ps, vemos que el container node-app no está corriendo más, y solo quedó el redis-server container running.

Entonces, claramente el container node-app ha crasheado, y en el futuro querríamos hacer un re-start automático.

1. Can yo teach me about the nodeJS process library?
The process library in Node.js is a global object that provides information and control over the current Node.js process.
It can be used to get information about the environment in which the current process is running and also to interact with the process itself.
Some of the common properties and methods of the process library are:
process.env: An object that contains the environment variables of the current process.
process.argv: An array that contains the command-line arguments passed to the process.
process.pid: The process ID of the current process.
process.cwd(): The current working directory of the process.
process.exit([code]): Terminates the process with the specified exit code.
process.stdin: The standard input stream of the process.
process.stdout: The standard output stream of the process.
process.stderr: The standard error stream of the process.
process.nextTick(callback): Schedules a callback function to be executed on the next iteration of the event loop.
These are just a few of the many properties and methods provided by the process library in Node.js. You can refer to the Node.js documentation 
for more information on the process library: https://nodejs.org/api/process.html

1a. What does it means stdin, from a Computer Science perspective? What does it means in the context of node?
"stdin" stands for "Standard Input". It is a mechanism in computer science that allows a user to feed data into an application or process.
In the context of Node.js, "stdin" is a stream that allows you to read data from the user's terminal, for example when you run a command-line script.
In Node.js, you can access the standard input stream using the "process.stdin" object, which provides a readable stream. You can then listen to the 
"data" event and process the incoming data, or you can use a library like readline to simplify this process.

1b. Can you show me a practical example with code of process.stdin?
Certainly! Here is a simple example of using the process.stdin in Node.js to read input from the command line:
process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
  const chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write(`data: ${chunk}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
In this example, we set the encoding for process.stdin to UTF-8. We then attach a readable event listener to process.stdin, 
which will be called whenever there is data available to be read from the standard input stream.
In the event listener, we use the read() method to read the data and write it to the standard output stream using process.stdout.write()
We also attach an end event listener to process.stdin, which will be called when the end of the stream has been reached.
lasantoneta@PCW10:~/learning/docker-course/stdin-example$ node index
dsadasdas
data: dsadasdas
lasantoneta@PCW10:~/learning/docker-course/stdin-example$
This is the result I had.

1c. So, can it be thought as a way to change the output of the console?
Yes, that's correct. The process.stdin in Node.js allows you to read data from the standard input stream, which is typically used for reading user input from the console.
By processing the input from process.stdin, you can change the output of the console. Here's a simple example that demonstrates this:
process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (input) {
  console.log('Input received: ' + input);
});
In this example, we use the process.stdin.resume() method to enable reading from process.stdin. The process.stdin.setEncoding('utf8')
method sets the encoding to utf8, so that the data read from process.stdin is treated as a string
Finally, the process.stdin.on('data', ...) method sets up an event listener that listens for data events from process.stdin and logs the received input to the console.



2. What is process.exit? What does it imply the code "0"?
process.exit is a method in Node.js that causes the Node.js process to exit. The code argument is the exit code that the process will return to the parent process.
In Node.js, exit codes can be used to indicate success or failure to the parent process. A code of 0 typically indicates success, while a non-zero code indicates failure.
The exact meaning of the code depends on the context in which the process is running, but it is commonly used to indicate different types of errors or success conditions.

2a. What is the parent process in the case? Can you teach me about it in a Computer Science perspective?
In computer science, a process is an instance of a computer program that is being executed by one or many threads.
It has its own memory space, system resources, and a unique process ID. The parent process is the process that started the current process.
In the context of a computer program, the parent process is the process that created the current process.
When a new process is created, it is typically created by an existing process, which becomes the parent of the new process. 
The parent process can use the process ID of its child process to monitor its execution, retrieve its exit status, or wait for its completion.

2b. And who is the parent process of a NodeJS process running?
The parent process of a Node.js process is the process that started the Node.js process. Typically, it is the terminal or shell from which the Node.js process was launched.
The parent process can have its own parent process, and so on, forming a process hierarchy tree.
The parent process can interact with the child process, for example, by sending signals or waiting for its completion.



3. What are some of the other well known codes for process.exit? Can you point me to the Node docs of process core module?
In the context of Node.js, the process.exit method allows a Node.js process to exit with a specified exit code.
The exit code is an integer value between 0 and 255, and it is typically used to indicate the success or failure of the process.
The well-known exit codes include:
0: Successful exit
1: General error
2: Misuse of shell builtins (e.g., missing argument to cd)
126: Command invoked cannot execute
127: Command not found
128: Invalid argument to exit
130: Script terminated by Control-C
You can find more information about the process.exit method and the process core module in the Node.js official documentation:

3a. What is "successfull exit"?
In computing, a successful exit refers to the termination of a process or program with an exit code of zero. Zero is typically 
the code used to indicate that the process completed its execution without encountering any errors or problems.
It is a conventional standard to return zero as the exit code of a process if it executed successfully
and other values for different types of errors or problems that might have occurred.
When the process exits successfully, it indicates to the calling process that everything went well, and it can continue with any 
subsequent actions that depend on the result of the process.

3b. And what does it mean to "gracefully exit" and handle exit gracefully?
"Graceful exit" or "handle exit gracefully" refers to the process of orderly and clean shutdown of an application or a program.
This is typically done by catching the termination signal and performing necessary cleanup operations, 
such as releasing resources, saving data, or sending notifications to other systems, before terminating the process.
The goal is to avoid data loss, corruption or other unintended consequences, as well as to provide a more user-friendly experience to the end user.
In Node.js, graceful exit can be achieved by using the process events, such as the process.on('exit') or process.on('SIGINT') 
events, to handle termination signals and perform the necessary cleanup operations.

3c. What is the SIGINT exit signal?
SIGINT is an exit signal in the Unix operating system. It stands for "interrupt signal" and is used to interrupt a running process, typically by the user. 
The signal is generated by pressing the "Ctrl + C" keys.
The process can catch the SIGINT signal and handle it in a specific way, such as shutting down gracefully or logging information about why the process was terminated.

3d. And which is the signal triggered when finishing a process inmeditately without giving the possibility to make cleanup operations before termination?
The signal that is triggered when finishing a process immediately without giving the possibility to make cleanup operations before termination is the SIGKILL signal. 
This signal cannot be intercepted or handled and will immediately terminate the process.




4. If I have a docker compose project... And I make a change to one of the images, do I need to re-build when I run docker-compose up?
It depends on how you run the docker-compose up command. By default, docker-compose up will only build an image if it does not already exist or if the image was changed. 
However, if you include the --build option when running docker-compose up, it will force a rebuild of all images, even if they have not changed.
So, if you have made changes to one of the images in your Docker Compose project and want to ensure that these changes are reflected when starting the containers
you should either include the --build option or run docker-compose build followed by docker-compose up.




*/
