/*
    48. App Server Starter Code:
    Eventualmente vamos a ir agregando más info a nuestra App. Eventualmente vamos a especificar host o la URL (address) del Redis Server. 
    Y su puerto también.
    A destacar: el visits dentro del client.get vedrá en la forma de un String, en vez de un integer. Por eso wrapeamos todo en un parseInt()

    Hi chat, good morning, what does the SET method in Redis? Can you teach me about it?
    The SET command in Redis is used to set the value of a key.
    If the key already exists, it will overwrite the existing value.
    The command takes two arguments: the key and the value. Here's an example of how you might use the SET command:
    127.0.0.1:6379> SET mykey "Hello, Redis!"
    OK
    127.0.0.1:6379> GET mykey
    "Hello, Redis!"

    You can also set a key with an expiration time (in seconds) using the EX option, for example:
    127.0.0.1:6379> SETEX mykey 10 "Hello, Redis!"
    OK

    This will set the key "mykey" with the value "Hello, Redis!" and it will expire in 10 seconds.
    Additionally, Redis SET command also accept some other options such as NX(set the key only if it does not already exist)
    ,XX(set the key only if it already exist)
    You can use it as SET key value [EX seconds] [PX milliseconds] [NX|XX]

    Ok, and how can I use the NX and XX options in Redis SET command? Can you show me example code, please?
    Sure! The NX and XX options in the SET command in Redis are used to specify the behavior of the SET command when the key already exists.
    Here's an example of how you might use these options:
    127.0.0.1:6379> SET mykey "Hello, Redis!" NX
    OK
    127.0.0.1:6379> SET mykey "Hello, again!" NX
    (nil)

    In this example, the first SET command sets the key "mykey" with the value "Hello, Redis!" because the key did not already exist.
    The second SET command does not set the key again because the key already exists and the NX option is used.

    127.0.0.1:6379> SET mykey "Hello, Redis!"
    OK
    127.0.0.1:6379> SET mykey "Hello, again!" XX
    OK

    In this example, the first SET command sets the key "mykey" with the value "Hello, Redis!". 
    The second SET command also sets the key to "Hello, again!" because the key already exists and the XX option is used.

    You can also combine the EX and PX options with the NX and XX options like this:
    127.0.0.1:6379> SET mykey "Hello, Redis!" NX EX 10
    OK

    This sets the key "mykey" with the value "Hello, Redis!" and expires it in 10 seconds only if the key does not already exist.
    127.0.0.1:6379> SET mykey "Hello, Redis!" XX PX 100
    OK

    This sets the key "mykey" with the value "Hello, Redis!" and expires it in 100 milliseconds only if the key already exists.

    49. Assembling a Dockerfile
    Por ahora vamos a hacer el Dockerfile de la Node App, y no del Redis Server.

    In the WORKDIR instruction of Docker, can I put the path to folder as a string? For example: WORKDIR '/app'?
    Yes, in the WORKDIR instruction of Docker, you can specify the path to a folder as a string. 
    The WORKDIR instruction sets the current working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile.
    For example, you can use the following command to set the current working directory to /app:
    WORKDIR /app
    or
    WORKDIR '/app'
    This sets the working directory to the /app directory in the container file system. All subsequent commands will be executed relative to this directory.
    It's worth noting that if the directory doesn't exist, it will be created by the WORKDIR instruction.
    Also, the WORKDIR instruction can be used multiple times in a Dockerfile, and the last one will take precedence over the previous ones.
    It's recommended to use the absolute path, it's more predictable, and it's less error prone.

    In the COPY instruction of a Dockerfile, can I omit the /? For example, if I want to copy a package.json file located in the 
    current directory into the root folder of the Docker container. Can I do COPY package.json . instead of COPY ./package.json ./?
    Yes, you can omit the / in the COPY instruction of a Dockerfile. The COPY instruction copies new files or directories from the host file 
    system and adds them to the file system of the container.
    For example, if you want to copy a package.json file located in the current directory into the root folder of the Docker container, you can use the following command:
    COPY package.json .
    or
    COPY ./package.json .
    Both will copy the package.json file into the current working directory, which should be the root folder of the container if you haven't changed it before.
    The . at the end of the command specifies the destination directory inside the container, and the / is not necessary. The . means the current folder, and 
    since the file package.json 
    is already in the current folder, it's not necessary to specify the path again.
    It's worth noting that when you use COPY command, the files are copied from the build context (typically the folder where the Dockerfile is located) 
    to the container file system.
    If the path to the file is relative, it's relative to the build context, not to the current working directory.
    It's recommended to use the absolute path, it's more predictable, and it's less error prone.

    What does COPY . . does in a Dockerfile?
    The COPY . . command in a Dockerfile is used to copy all the files and directories in the current working directory (.) 
    to the current working directory (.) inside the container.
    The COPY instruction copies new files or directories from the host file system and adds them to the file system of the container. The first . 
    specifies the source directory on the host, which is the current working directory.
    The second . specifies the destination directory inside the container, which is also the current working directory.
    This command is typically used when you want to copy all the files and directories from the build context (the folder where the Dockerfile is located) to the container.
    It's useful when you have a project with multiple files and directories and you want to copy all of them to the container, 
    without specifying each file and directory individually.
    It's important to note that the files are copied as-is, this means that the ownership, permissions, timestamps, and other metadata of the files will be preserved.
    It's worth noting that when you use COPY . . command, you're copying all the files and directories, including the ones you don't need.
    This will increase the size of the image, and it may also cause security issues if some files contain sensitive information.
    It's recommended to use the COPY command with a specific file or directory, instead of using COPY . . command.

    Can you explain me the following Dockerfile?

    FROM node:alpine

    WORKDIR '/app'

    COPY package.json .
    RUN npm install
    COPY . .

    CMD ["npm", "start"]

    Sure! The Dockerfile you provided is a basic Dockerfile that creates a Node.js application container. Here is what each instruction does:
    FROM node:alpine: This instruction sets the base image for the container to be the official Node.js image based on Alpine Linux.
    This image contains the necessary dependencies and tools to run a Node.js application.
    WORKDIR '/app': This instruction sets the current working directory inside the container to be '/app'.
    All subsequent instructions will be executed relative to this directory. If the directory '/app' doesn't exist, it will be created by this instruction.
    COPY package.json .: This instruction copies the package.json file from the build context to the current working directory inside the container.
    This file contains information about the application's dependencies and other metadata.
    RUN npm install: This instruction runs the command npm install, which installs the dependencies specified in the package.json file.
    This step is necessary to install all the necessary libraries for the application to run.
    COPY . .: This instruction copies all files and directories from the build context to the current working directory inside the container. 
    This step is necessary to copy the rest of the application code into the container.
    CMD ["npm", "start"]: This instruction sets the default command to be run when the container is started.
    This command runs npm start, which starts the application using the start script defined in the package.json file.
    In summary, this Dockerfile sets the base image to be Node.js, sets the working directory to be '/app', copies the package.json file and runs npm install, 
    then copies the rest of the application code

    50. Introducing Docker Compose

    Can you explain me the following error?

    node:events:491
        throw er; // Unhandled 'error' event
        ^

    Error: connect ECONNREFUSED 127.0.0.1:6379
        at TCPConnectWrap.afterConnect [as oncomplete] (node:net:1495:16)
    Emitted 'error' event on RedisClient instance at:
        at RedisClient.on_error (/app/node_modules/redis/index.js:406:14)
        at Socket.<anonymous> (/app/node_modules/redis/index.js:279:14)
        at Socket.emit (node:events:513:28)
        at emitErrorNT (node:internal/streams/destroy:151:8)
        at emitErrorCloseNT (node:internal/streams/destroy:116:3)
        at process.processTicksAndRejections (node:internal/process/task_queues:82:21) {
    errno: -111,
    code: 'ECONNREFUSED',
    syscall: 'connect',
    address: '127.0.0.1',
    port: 6379

    This error message indicates that your application is unable to connect to the Redis server. 
    Specifically, the error message is saying that there was a "connection refused" error (ECONNREFUSED) 
    when trying to connect to the Redis server running on IP address 127.0.0.1 (localhost) on port 6379.
    
    There are several possible causes for this error:
    The Redis server is not running: Make sure that the Redis server is running and accepting connections on the specified IP address and port.
    The IP address or port is incorrect: Make sure that the IP address and port specified in your application's Redis client configuration 
    match the IP address and port that the Redis server is running on.
    Firewall is blocking the connection: Make sure that the firewall on your machine or network is not blocking the connection to the Redis server.
    The Redis server is running on a different host: Make sure that the IP address and port specified in your application's Redis client configuration 
    match the IP address and port of the host where the Redis server is running.
    Password mismatch: If you have set a password in your Redis server then make sure that it is the same which you are passing in the Redis client.

    I suggest you to check the Redis server status, and check if the Redis server is running and accepting connections on the specified IP address and port
    and then double check your Redis client configuration to make sure that the IP address and port are correct.

    What is the errno -111 ?
    "errno -111" is a system error code that is generated when a specific error occurs.
    The code -111 is the value of the errno variable, which stands for "error number". The code itself has different 
    meanings depending on the operating system, but in general it indicates a "connection refused" error.
    In the context of Redis, it means that the Redis client is unable to connect to the Redis server because the server is refusing the connection.
    This could happen for various reasons, such as the Redis server not running, the IP address or port specified in the client configuration is incorrect, 
    or a firewall is blocking the connection.
    As I mentioned earlier, check the Redis server status, and check if the Redis server is running and accepting connections on the specified IP address and port,
    and then double check your Redis client configuration to make sure that the IP address and port are correct, and also check the firewall settings.

    What is syscall 'connect'? Can you teach me about syscalls in Computer Science?
    In computer science, a system call (or syscall) is a way for a program to request a service from the operating system.
    A system call is typically made by a program to request services from the kernel, such as input/output operations, process management, memory management, and so on.
    The connect() syscall is a specific system call that allows a program to initiate a connection with another program on a different machine or on the same machine.

    It is used to initiate a connection on a socket descriptor.

    The connect() system call is typically used by the TCP/IP stack to establish a connection with a remote host.

    It is also important to note that system call are specific to the operating system, each OS has its own implementation of system calls.
    For example, the way the connect() syscall works on Linux is different from how it works on Windows or MacOS.
    In the error message you provided, the syscall 'connect' refers to the system call that the Redis client is trying to make in order to connect to the Redis server.
    The error message is saying that the system call failed because the server is refusing the connection.

    And what is a connection on a socket descriptor in Computer Science? Can you teach me the basic about socket descriptors?
    In computer networking, a socket descriptor is a unique non-negative integer that the operating system assigns to a socket when it is created.
    A socket descriptor is used by a program to refer to a socket, and it is used to read and write data to the socket.
    A socket descriptor is a handle to a socket, it is a unique non-negative integer that the operating system assigns to a socket when it is created.
    A socket descriptor is used by a program to refer to a socket, and it is used to read and write data to the socket.
    
    A socket descriptor is used to identify a socket in the operating system. It is returned by the socket system call and it is 
    used by other system calls such as connect, bind, listen and accept.
    A socket descriptor is a handle to a socket and it is used to read and write data to the socket. A socket descriptor can be used to read and write data to a socket, 
    it can also be used to establish a connection with another machine using the connect() syscall.

    A socket descriptor is a low-level representation of a socket and it is not intended to be used directly by applications. Instead, applications use 
    higher-level libraries, such as the sockets library in C, to interact with sockets.

    In summary, a socket descriptor is a unique non-negative integer assigned by the operating system to a socket and is used to read and write data to the socket and to 
    refer to the socket by the program. It is also used to establish a connection with another machine using the connect syscall.

    When you want to establish connection with a different program in the same or another machine, 
    are sockets involved in the connection? Can you teach me with basic Computer Science concepts?
    Yes, sockets are typically used to establish connections between programs running on different machines, or even on the same machine.
    A socket is a endpoint for sending or receiving data across a computer network.
    It is a combination of an IP address and a port number.
    Sockets provide a common interface for network communication in many operating systems.

    In order to establish a connection between two programs, they must first create a socket and then bind it to a specific IP address and port number.
    Once a socket is bound to an IP address and port, the program can use the socket to send and receive data over the network.

    When a program wants to establish a connection with another program, it uses the connect() system call to initiate a connection. 
    The connect() system call is typically used by the TCP/IP stack to establish a connection with a remote host.
    The system call takes as input the socket descriptor, and the IP address and port of the remote host to which the connection should be established.

    Once the connection is established, the two programs can send and receive data to and from each other using the socket descriptor.

    In summary, sockets are used to establish connections between programs running on different machines or even on the same machine
    The basic steps to establish a connection between two programs are:
    creating a socket
    binding the socket to a specific IP address and port number.
    using the connect() system call to initiate a connection with the remote host
    Once the connection is established, the two programs can send and receive data to and from each other using the socket descriptor.

    What is the TCP/IP stack? Can you teach me the basic stuff about it?
    The TCP/IP stack is a set of protocols and services that are used to transmit data over a network.
    The name "TCP/IP" stands for Transmission Control Protocol/Internet Protocol. It is a set of rules that govern how data is sent and received over a network, 
    and it is the backbone of the internet.

    The TCP/IP stack is made up of several layers, each with a specific purpose. These layers are:
    The Application Layer: This is the topmost layer of the stack, and it is the layer that is closest to the user. 
    This layer provides the interface between the user and the network. 
    Applications such as web browsers, email clients, and file transfer programs operate at this layer.

    The Transport Layer: This layer is responsible for end-to-end communication between two hosts.
    The two most common protocols at this layer are TCP (Transmission Control Protocol) and UDP (User Datagram Protocol).
    TCP is used for reliable, connection-oriented communication, while UDP is used for unreliable, connectionless communication.

    The Internet Layer: This layer is responsible for routing data packets between networks. 
    The most common protocol at this layer is IP (Internet Protocol). IP is responsible for addressing and routing data packets across networks.

    The Link Layer: This is the bottommost layer of the stack, and it is responsible for communicating directly with the physical network.
    The most common protocols at this layer are Ethernet and WiFi.

    Data is sent down the stack, layer by layer, as it is transmitted over the network. When a packet of data is received, 
    it is passed up the stack, layer by layer, to the application that sent it.

    In summary, TCP/IP stack is a set of protocols and services that are used to transmit data over a network.
    It is the backbone of the internet, it is made up of several layers, each with a specific purpose, The Application Layer, The Transport Layer, 
    The Internet Layer, and The Link Layer.

    Data is sent down the stack, layer by layer, as it is transmitted over the network. When a packet of data is received, 
    it is passed up the stack, layer by layer, to the application that sent it.

    Entonces, en este video, nos vamos a focalizar en tener un segundo container corriendo que runee el Redis Server. 
    Para instanciar el Redis Server en un Docker container corremos: docker run redis.

    A pesar que estamos corriendo el Redis Server a través de docker run redis, cuando intentamos runnear nuestra propia imagen, tenemos el mismo error.
    ¿Cuál es el problema? -> En nuestra computadora tenemos la Node App que intentamos correr en un container y el Redis App en un Docker Container separado.
    No obstante... Estos dos containers no tienen comunicación automática. Son PROCESOS AISLADOS. 

    Entonces, tenemos que establecer cierta networking infraestructure entre ambos containers. Para setear la networking functionality, tenemos dos opciones.
    Las dos opciones para conectar los dos containers:
    1. Docker CLI. Nos permite establecer una network entre dos containers separados. No obstante, no es lo ideal porque deberemos correr muchos comandos
    Cada vez que queramos establecer la comunicación entre ambos containers. Podemos crear un Script para correr todos esos comandos por nosotros.
    No obstante, involucra mucho trabajo setupear la network de esta forma. No se usa la Docker CLI para realizar la conexión entre Containers.
    2. Para realizar la conexión entre dos o más containers vamos a usar una CLI diferente. Se llama DOCKER COMPOSE. Docker Compose es una herramienta que viene en la
    Instalación de Docker. 

    Docker Compose es una CLI separada la Docker CLI. El objetivo de Docker Compose es evitarte correr muchos comandos repetitivos con la Docker Cli.
    Docker Compose también nos facilita runnear múltiples Docker Containers al mismo tiempo y automáticamente conectarlos en una forma de networking
    O red específica para dichos containers.

    Preguntas al chat:
    a. What does it mean that a Docker Container is an isolated process in your computer?
    When a Docker container is running, it is an isolated process that runs on the host computer.
    This means that the container runs as a separate and independent process, with its own file system, environment variables, and network stack.
    Isolation in Docker containers is achieved by using namespaces and control groups (cgroups), which are Linux kernel features.
    Namespaces provide isolation of the container's process tree, networking, and user IDs, while cgroups provide isolation of the container's 
    resource usage (e.g. CPU, memory, etc).
    This isolation means that the container can only access the host's resources that have been explicitly exposed to it.
    The container does not have direct access to the host's kernel or system libraries, and it can only access the host's file system and network stack 
    through the interfaces exposed by the host.
    This isolation also means that a container can't interfere with other processes running on the host or with other containers, and that the container's 
    resources are isolated from the host's resources.
    This makes it easy to run multiple containers on the same host without interference.
    This isolation also means that the container can't access the host's resources unless they're explicitly exposed to it, and it can't interfere with other processes 
    running on the host or with other containers.
     This makes it easy to run multiple containers on the same host without interference.
    It's worth noting that, the level of isolation can change depending on the configuration of the host and the container

    Can you teach me about Namespaces feature of a Linux Kernel?
    Sure! Namespaces is a feature of the Linux kernel that allows for isolation of various aspects of a process's environment
    Namespaces provide a way to isolate a process and its children from the rest of the system, by providing a private and isolated view of certain system resources.
    Docker uses several different namespaces to provide isolation for a container:
    pid namespace: isolates the process IDs of the container, so that the processes inside the container have different process IDs than the host system.
    net namespace: isolates the network stack of the container, so that the container has its own set of network interfaces, IP addresses, and routing tables.
    ipc namespace: isolates the inter-process communication (IPC) resources of the container, so that the container has its own set of System V IPC objects 
    and POSIX message queues.
    mnt namespace: isolates the file system view of the container, so that the container has its own set of mount points.
    uts namespace: isolates the hostname and domain name of the container, so that the container has its own hostname and domain name.
    user namespace: isolates the user and group IDs of the container, so that the processes inside the container have different user and group IDs than the host system.
    Each of these namespaces provides a separate and isolated view of the corresponding system resource, making it possible to run multiple containers 
    on the same host without interference
    For example, each container has its own network stack and IP addresses, so that they can communicate with the outside world without interfering with each other.
    It's worth noting that, Namespaces are a powerful feature of Linux kernel, they're not limited to Docker, they're used in many other projects 
    such as Kubernetes, LXC, systemd-nspawn and so on.
    They're also widely used in scenarios such as testing, development, and production environments.

    Can you teach me about Control Groups feature of a Linux Kernel?
    Sure! Control Groups (cgroups) is a feature of the Linux kernel that allows for the control and management of system resources of processes.
    cgroups provide a way to group processes together and apply limits and constraints on their usage of resources such as CPU, memory, and I/O.
    Docker uses cgroups to limit and control the resources used by a container.
    When a container is created, it is placed in a cgroup that controls its usage of resources.
    For example, the cgroup can be used to limit the amount of memory the container can use, or to restrict the amount of CPU time the container can use.
    Here are some examples of how cgroups are used in Docker:
    Memory constraint: You can use cgroups to limit the amount of memory a container can use. For example, you can set a memory limit of 512MB for a container, 
    so that the container will not be able to use more than 512MB of memory.
    CPU constraint: You can use cgroups to restrict the amount of CPU time a container can use. For example, you can set a CPU share for a container, 
    so that the container will only be able to use a certain percentage of the host's CPU.
    Block I/O constraint: You can use cgroups to limit the amount of I/O operations a container can perform. For example, you can set a 
    limit on the number of IOPS a container can perform, so that the container will not be able to use more than a certain number of IOPS.
    PID constraint: You can use cgroups to limit the number of processes that can run in a container.
    For example, you can set a limit on the number of processes that can run in a container, so that the container will not be able to run more processes than the limit.

    What is the difference between memory and CPU time?
    Memory and CPU time are two different resources that a computer uses to run processes.
    Memory refers to the physical memory (RAM) of a computer. It is used to store data that the CPU needs to access quickly. When a program runs, 
    it uses memory to store data such as variables, arrays, and other data structures.
    If a program needs more memory than is available, the system can use virtual memory, which is stored on the hard disk.
    CPU time, on the other hand, refers to the amount of time the CPU spends executing instructions for a particular process.
    The CPU is the "brain" of the computer, and it executes instructions from programs in the form of machine code.
    When a program runs, the CPU uses clock cycles to execute the instructions in the program. The more instructions a program has, the more CPU time it will use.
    In summary, Memory refers to the physical memory of a computer that stores data that the CPU needs to access quickly, and CPU time refers to the amount of time the 
    CPU spends executing instructions for a particular process.
    When a computer runs multiple processes, it needs to manage and allocate these resources accordingly, and cgroups is a feature 
    that allows for the control and management of these resources
    and it's used by Docker to limit and control the resources used by a container.

    What is a process in Computer Science? Can you teach me the basic stuff?
    In computer science, a process is an instance of a program that is being executed by the operating system.
    A process is a program in execution, and it's the basic unit of execution in an operating system.
    Each process runs in its own separate environment and has its own set of system resources such as memory, CPU time, file handles, and network connections.
    A process has several characteristics that make it different from a program:
    A process has an execution state that can change over time, while a program is a static set of instructions.
    A process has its own memory space and can access memory addresses that are unique to it, while a program is stored in memory and can be shared by multiple processes.
    A process can be scheduled by the operating system to run on one or more processors, while a program is not scheduled by the operating system.
    A process can interact with other processes and with the operating system, while a program cannot interact with other programs or the operating system.
    A process can have multiple threads, which are individual sequences of execution that can run independently within the process.
    In summary, A process is an instance of a program that is being executed by the operating system, it has its own set of system resources and its own execution state
    it can be scheduled by the operating system and it can interact with other processes and with the operating system.
    It's the basic unit of execution in an operating system and it's a key concept in computer science and is used in many fields such as operating systems, 
    distributed systems and parallel computing.

    What is a Thread in Computer Science? Can you teach me the basic stuff? Is it different than a process? Can you show me some visual representation of Threads?
    A thread, in computer science, is a lightweight, independent unit of execution within a process.
    It is sometimes called a lightweight process and it shares the same memory space with other threads in the same process.
    Each thread has its own program counter (instruction pointer) and stack, but multiple threads can share the same data space with the main program.
    Threads have several characteristics that make them different from processes:
    Threads share the same memory space with other threads in the same process, while processes have their own separate memory space.
    Threads have a faster context switching time than processes because they share the same memory space, while processes require memory copying and other operations.
    Threads are sometimes called lightweight processes, because they have the same basic structure as a process, but with a smaller overhead.
    Threads are useful for achieving parallelism within a single process, while processes are useful for achieving parallelism across multiple processes.
    A visual representation of threads could be a process with multiple arrows pointing to different parts of the code, each arrow representing a thread, 
    and all arrows share the same memory space.
    In summary, A thread is a lightweight, independent unit of execution within a process, it shares the same memory space with other threads, 
    has a faster context switching time than processes,
    and useful for achieving parallelism within a single process.
    It's a key concept in computer science and is used in many fields such as operating systems, distributed systems, and parallel computing.
    
    What does it mean that NodeJS is single threaded? Can you explain it in Computer Science terms? (Making an emphasis in what Threads are)
    Node.js is a single-threaded programming environment, which means that the Node.js runtime only uses a single thread to execute JavaScript code
    This is in contrast to other programming environments that use multiple threads to handle multiple tasks simultaneously.
    In computer science terms, a single-threaded environment means that only one set of instructions can be executed at a time.
    When a single-threaded program encounters a blocking operation, such as reading from a file or waiting for a network request to complete, 
    the program is unable to execute other code until the blocking operation is finished.
    Threads are a way of achieving parallelism in a program, and it's a way of handling multiple tasks simultaneously.
    When a single-threaded program encounters a blocking operation, it can't execute other tasks until the blocking operation is finished.
    This is why Node.js uses a different approach to handle concurrent operations, it uses an event-driven, non-blocking I/O model
    which allows it to handle a large number of connections concurrently using a single thread.
    Node.js uses a technique called "event loop" to handle multiple tasks simultaneously.
    The event loop is a mechanism that allows the Node.js runtime to handle multiple tasks at the same time, by registering callbacks 
    that are executed when the corresponding event occurs.
    The event loop is executed within a single thread, and it's responsible for managing all the asynchronous events, like I/O operations, timers, and other events.
    In summary, NodeJS is single threaded, meaning that the Node.js runtime only uses a single thread to execute JavaScript code.
    This can be a limitation when dealing with blocking operations, but Node.js uses an event-driven, non-blocking I/O model and an event loop
    to handle multiple tasks simultaneously using a single thread.
    It's a way of achieving parallelism in a program using a single thread, and it's a key concept in Node.js and its performance.

    How can I see if a process is getting executed in a Single Thread or in a Multiple Thread environment? Can you show me some commands?
    There are several ways to check if a process is running in a single-threaded or multi-threaded environment, depending on the operating system you are using.
    Here are some commands you can use to check the number of threads for a process on a Linux or Windows operating system:
    Linux:
    You can use the ps -T -p PID command to check the number of threads for a specific process.
    The -T option shows the threads and -p PID option specifies the process ID. 
    For example, if you want to check the number of threads for process with ID 1234, you would use the command ps -T -p 1234.
    Windows:
    You can use the tasklist /fi "pid eq PID" command to check the number of threads for a specific process.
    The /fi option is used to filter the process by ID and PID is the process ID.
    For example, if you want to check the number of threads for process with ID 1234, you would use the command tasklist /fi "pid eq 1234"
    You can also use graphical tools like htop, top, and task manager in both windows and linux to check the number of threads and more information about the running process.
    Please note that depending on the process and the programming language used, a process can have multiple threads and still be single threaded, this 
    is the case of Node.js and some other programming languages that use Event loop and other similar mechanisms to handle multiple tasks simultaneously using a single thread.
    In summary, You can use commands like ps -T -p PID or tasklist /fi "pid eq PID" to check the number of threads for a specific process, also you can use graphical tools like htop
    top and task manager to check the number of threads and more information about the running process.

    And how can I list all the processes that are running on Linux and see their PID?
    There are several ways to list all the processes that are running on a Linux system and see their PID (Process ID). Here are some common commands you can use:
    ps -ef or ps aux: This command shows all processes running on the system. The -e option shows all processes, while the -f option provides a full listing.
    The aux option is similar to ef, but it provides additional information like the user who started the process and the percentage of CPU usage.
    top: This command provides a real-time, dynamic view of the processes running on the system. It displays a list of processes sorted by the percentage of CPU usage. 
    You can also press 'P' in the top command to sort the processes by the PID.
    htop: This command is similar to top, but it provides additional features like the ability to scroll through the list of processes and the ability 
    to display additional information about the processes.
    pgrep: This command allows you to search for processes by name, and it returns the process ID. For example, pgrep apache2 will return the PID of the apache2 process.
    pstree: This command shows the running process as a tree structure, it shows parent-child relationships between processes, it's a useful command when you 
    want to see the relationship of the processes.
    lsof: This command lists all open files and the processes that opened them. This command can be useful if you want to see which processes 
    are using a specific file or network port.
    In summary, you can use commands like ps -ef, top, htop, pgrep, pstree and lsof to list all the processes that are running on a Linux system and see their PID.
    Each command has its own set of options, and each command provides a different set of information about the running processes.

    How can I check the memory consumption and CPU usage of a Docker Container compared to the whole computer?
    You can use the docker stats command to check the memory consumption and CPU usage of a running Docker container compared to the whole computer.
    The docker stats command shows a real-time live stream of container(s) resource usage statistics.
    The docker stats command takes one or more container names or ids as an argument. If you don't specify any container name/id, it will display the statistics 
    for all running containers.
    Here is an example of how to use the docker stats command:
    docker stats container_name
    The output of the command shows the following columns of information:
    CONTAINER ID: The ID of the container
    NAME: The name of the container
    CPU %: The percentage of CPU usage for the container
    MEM USAGE / LIMIT: The memory usage and limit for the container
    MEM %: The percentage of memory usage for the container
    NET I/O: The network input/output for the container
    BLOCK I/O: The block input/output for the container
    PIDS: The number of PIDs for the container
    This command shows you the real-time resource usage statistics of the container and you can compare them with the statistics of your host machine to have 
    an idea of the resources that the container is using.
    Please note that for this command to work, the container must be running.
    In summary, you can use the docker stats command to check the memory consumption and CPU usage of a running Docker container compared to the whole computer.
    This command shows you the real-time resource usage statistics of the container and you can compare them with the statistics of your host machine.


    b. What does it mean "networking infraestructure" between two Docker Containers? Can you teach me basic struff around it?
    Docker uses a virtual networking infrastructure to allow communication between multiple containers running on the same host.
    This virtual networking infrastructure is a layer on top of the host's physical network interfaces,
    and it allows containers to communicate with each other as if they were on the same network.
    When you start a container, Docker automatically creates a virtual network interface for the container and assigns it an IP address from the Docker bridge network.
    This bridge network is a virtual network created by Docker, and all containers on the same host are connected to it by default.
    You can also create your own custom networks and connect containers to them.
    For example, you can create a network named "frontend" and connect a container running a web server to it.
    Then you can create another network named "backend" and connect a container running a database to it.
    This way, the web server container can communicate with the database container only through the "backend" network and not through the bridge network.
    You can also use the docker network command to create, inspect and manage networks. 
    For example, you can use the docker network create command to create a new network, the docker network connect command to connect a container 
    to a network and the docker network ls command to list all networks.
    In summary, Docker uses a virtual networking infrastructure to allow communication between multiple containers running on the same host
    this virtual networking infrastructure allows containers to communicate with each other as if they were on the same 
    network, when you start a container, Docker automatically creates a virtual network interface for the container and assigns it an IP address from the Docker bridge network
    and you can create your own custom networks and connect containers to them. You can use the docker network command to create, inspect and manage networks.

    What is the host's physical network in Computer Science? Can you teach me basic things about networking?
    In computer science, a physical network refers to the underlying infrastructure of cables, switches, routers, 
    and other hardware that connects devices together to form a network.
    The host's physical network is the network that the host, or the computer running the Docker container, is connected to.
    A physical network can be a LAN (Local Area Network), a WAN (Wide Area Network), or the Internet.
    The host's physical network could be a home network, a corporate network or an Internet Service Provider (ISP) network, for example.
    Networking is the practice of connecting multiple devices together to share resources and exchange information.
    It is a critical component of modern computing, as it allows multiple devices to communicate with each other and share resources such as files, printers, and internet access.
    The most basic form of networking is a peer-to-peer network, where two or more devices connect directly to each other to share resources.
    A more advanced form of networking is a client-server network, where one or more devices act as servers and provide resources to other devices that act as clients.
    The primary protocol used to transmit data over networks is TCP/IP (Transmission Control Protocol/Internet Protocol).
    TCP/IP is a suite of protocols that define how data is transmitted over networks, including the format of packets, how addresses are assigned, 
    and how routing decisions are made.
    In summary, the host's physical network refers to the underlying infrastructure of cables, switches, routers and other hardware 
    that connects devices together to form a network.
    The host's physical network could be a LAN, a WAN or the Internet. Networking is the practice of connecting multiple devices together 
    to share resources and exchange information.
    The most basic form of networking is a peer-to-peer network, and the most advanced form is a client-server network.
    The primary protocol used to transmit data over networks is TCP/IP, which is a suite of protocols that define how data is transmitted over networks.

    What are switches, routers and other hardware that connect devices together in a network?
    Switches, routers, and other networking hardware are devices that connect devices together in a network and help control the flow of data between them.
    Switches: A switch is a networking device that connects multiple devices together on a LAN (Local Area Network)
    It receives data from one device and forwards it to the correct destination device.
    Switches use MAC addresses to determine which device to forward data to, and they can also segment 
    a network into multiple LANs, called VLANs, to improve security and performance.
    Routers: A router is a networking device that connects multiple LANs together to form a WAN (Wide Area Network).
    It uses IP addresses to determine where to forward data, and it can also use routing protocols to determine the best path for data to travel across the network.
    Firewalls: A firewall is a networking device that monitors and controls incoming and outgoing network traffic based on a set of security rules
    It can be a hardware device or a software application, and it helps to protect a network from unauthorized access and attacks.
    Modems: A modem is a networking device that connects a computer or a LAN to the Internet.
    It modulates and demodulates signals to convert digital data from a computer into analog signals for transmission over a telephone line or cable, and vice versa.
    Access Point: Access points are networking devices that allow wireless devices to connect to a wired network. They act as a bridge between wired Ethernet 
    networks and wireless 802.11 networks.
    These are some of the basic hardware devices that connect devices together in a network, there are other devices like gateways,
    hubs, load balancers, etc. that also play a vital role in connecting different devices, networks and services together.
    In summary, switches, routers, firewalls, modems, and access points are examples of networking hardware that connect devices together in a network 
    and help control the flow of data between them.
    Switches connect devices together on a LAN, routers connect LANs together to form a WAN, firewalls monitor and control incoming and outgoing network traffic,
    modems connect a computer or a LAN to the internet and access points allow wireless devices to connect to a wired network.

    What is a virtual networking interface?
    A virtual networking interface, also known as a virtual NIC (Network Interface Card), is a software-based implementation of a physical NIC.
    It is used to provide network connectivity to a virtual machine or a container, such as a Docker container.
    When a virtual machine or a container is created, the virtualization software or container engine automatically creates a virtual NIC and assigns it an IP address.
    This virtual NIC is connected to the host's physical network, allowing the virtual machine or container to communicate with other devices on the network.
    A virtual NIC can be configured with various network settings such as IP address, subnet mask, and gateway.
    Virtual NICs can also be connected to virtual switches, which are software-based implementations of physical switches.
    Virtual NICs are useful because they allow multiple virtual machines or containers to share the same physical network interface,
    and they also provide a layer of isolation between the virtual machines or containers and the host's physical network.
    In summary, A virtual networking interface is a software-based implementation of a physical NIC, it is used to provide network connectivity to a virtual 
    machine or a container, such as a Docker container
    when a virtual machine or a container is created, the virtualization software or container engine automatically creates a virtual NIC and assigns it an IP address, 
    a virtual NIC can be connected to virtual switches, which are software-based implementations of physical switches
    virtual NICs are useful because they allow multiple virtual machines or containers to share the same physical network interface,
    and they also provide a layer of isolation between the virtual machines or containers and the host's physical network.

    What are mask and gateway in networking?
    In networking, a mask and a gateway are used to define the network address and routing information for a device.
    Mask: A mask, also known as a subnet mask, is a set of numbers that define the size of a network.
    It is used to divide an IP address into a network address and a host address.
    The mask is used to determine which part of the IP address represents the network address and which part represents the host address.
    The most common mask used is 255.255.255.0, which is also known as a Class C mask
    it indicates that the first three octets of the IP address are the network address, and the last octet is the host address.
    Gateway: A gateway is a device or a software that acts as an entry point to another network.
    It is the IP address of a router that is used to forward packets between different networks.
    The gateway is used to determine the next hop for a packet that is destined for a different network.
    When a device wants to communicate with a device on a different network, it sends the packet to the gateway,
    which then forwards the packet to the next hop on its way to the destination.
    In summary, a mask and a gateway are used to define the network address and routing information for a device.
    A mask is a set of numbers that define the size of a network and is used to divide an IP address into a network address and a host address.
    A gateway is a device or a software that acts as an entry point to another network, and it is the IP address of a router 
    that is used to forward packets between different networks.
    The gateway is used to determine the next hop for a packet that is destined for a different network.

    Which is the difference between IP Address and Mask?
    An IP address is a unique numerical label assigned to each device connected to a computer network that uses the 
    Internet Protocol for communication. It serves two main functions: identifying the host or network interface, and providing the location of the host in the network.
    A mask, also known as a subnet mask, is a set of numbers used to divide an IP address into a network address and a host address.
    It is used to determine which part of the IP address represents the network address and which part represents the host address.
    The mask is used to identify the network and the host address within that network.
    The main difference between an IP address and a mask is that an IP address is a unique identifier assigned to a device, while a mask is used to 
    divide that address into a network and host address.
    An IP address is used to identify a device on a network, and a mask is used to identify the network and the host address within that network.

    What are the host address and the network address of a Mask?
    In networking, a mask (also known as a subnet mask) is used to divide an IP address into a network address and a host address.
    Network Address: The network address is the portion of the IP address that represents the network to which the device belongs.
    It is used to identify the network on which a device is located.
    For example, if the IP address is 192.168.1.100 and the mask is 255.255.255.0, the network address would be 192.168.1.0.
    Host Address: The host address is the portion of the IP address that represents the specific device on a network.
    It is used to identify the device on the network. For example, if the IP address is 192.168.1.100 and the mask is 255.255.255.0, the host address would be 100.
    The host address is often used to identify the device on a network, while the network address is used to identify the network to which the device belongs.
    In summary, when using a mask (subnet mask) to divide an IP address into a network address and a host address
    the network address is the portion of the IP address that represents the network to which the device belongs and is used to identify the network on which a device is located.
    The host address is the portion of the IP address that represents the specific device on a network and is used to identify the device on the network.

    What is the Docker Bridge network?
    In Docker, a Bridge network is a built-in network driver that allows containers to communicate with each other and with the host.
    It is the default network driver when creating a new container, and it creates a virtual network interface on the host.
    This virtual interface acts as a bridge between the container and the host's physical network, allowing containers to communicate with each other and with the host.
    When a container is created on a Bridge network, it is assigned a unique IP address on the virtual network,
    and the container can communicate with other containers on the same network.
    Additionally, the container can also communicate with the host and with other devices on the host's physical network.
    The Docker Bridge network allows for easy communication between containers and the host, and it is useful for scenarios where 
    multiple containers need to share the same network.
    In summary, The Docker Bridge network is a built-in network driver that allows containers to communicate with each other and with the host
    it creates a virtual network interface on the host, and this virtual interface acts as a bridge between the container and the host's physical network
    allowing containers to communicate with each other and with the host
    when a container is created on a Bridge network, it is assigned a unique IP address on the virtual network
    and the container can communicate with other containers on the same network, 
    the Docker Bridge network allows for easy communication between containers and the host, 
    and it is useful for scenarios where multiple containers need to share the same network.

    How can I see the IP address asigned to a Docker Container?
    To see the IP address assigned to a Docker container, you can use the command docker inspect <container-name> or docker inspect <container-id>
    For example, if the container name is "my_container", you can run the command:
    docker inspect my_container
    This command will return a JSON object containing information about the container, including the IP address.
    The IP address can be found in the "NetworkSettings" section of the output, under the "IPAddress" field.
    Another way to get the IP address of a container is by using the command docker container ls which will list 
    all the running containers and the IP addresses associated to them.
    You can also use the command docker network inspect bridge to see all the containers that are currently connected to the bridge network
    with their respective IP addresses, container names and id's.
    In summary, to see the IP address assigned to a Docker container you can use the command docker inspect <container-name> or docker inspect <container-id>
    this command will return a JSON object containing information about the container, including the IP address. 
    The IP address can be found in the "NetworkSettings" section of the output, under the "IPAddress" field.
    Other ways are using the command docker container ls and docker network inspect bridge.

    What is Docker Compose? Can you teach me the basic around it?
    Docker Compose is a tool for defining and running multi-container Docker applications.
    It allows you to define the services that make up your application in a single file, and then start and stop them together using a single command.
    A Compose file is a YAML file that defines the services, networks, and volumes that make up your application.
    It also allows you to specify environment variables, volumes, ports and other configurations for each service.
    To use Docker Compose, you first need to install it on your machine. Once installed, you can use the docker-compose command to start, stop, and manage your services.
    To start an application defined in a compose file, you can use the docker-compose up command.
    This command will start all the defined services and create any necessary networks and volumes.
    You can also use the docker-compose down command to stop and remove the services, networks, and volumes.
    Docker Compose also allows you to scale the number of container instances for each service using the docker-compose scale command.
    Docker Compose is useful for managing multi-container applications, as it allows you to define and run all the services that make up your application with a single command
    and also allows you to easily scale and update your services.
    In summary, Docker Compose is a tool for defining and running multi-container Docker applications.
    It allows you to define the services that make up your application in a single file, and then start and stop them together using a single command
    it uses a YAML file to define the services, networks, and volumes that make up your application,
    it also allows you to specify environment variables, volumes, ports and other configurations for each service,
    it allows you to scale the number of container instances for each service using the docker-compose scale command
    and it is useful for managing multi-container applications, as it allows you to define and run all the services that make up your application with a single command
    and also allows you to easily scale and update your services.

    What is a YAML file in a Docker Compose? Can you show me an example of a YAML file?
    A YAML file is a file format that is used in Docker Compose to define the services, networks, and volumes that make up your application.
    YAML stands for "YAML Ain't Markup Language", and it is a human-readable data serialization format that is easy to understand and write.
    A YAML file in Docker Compose is used to define the services, networks, and volumes that make up your application, and it also allows 
    you to specify environment variables, ports, and other configurations for each service.
    Here is an example of a simple YAML file that defines a service called "web" that runs a container using the "nginx" image.

    version: '3'
        services:
        web:
            image: nginx
            ports:
            - "80:80"
    
    This YAML file defines a single service called "web" that runs a container using the "nginx" image.
    It also maps port 80 on the host to port 80 on the container, so that you can access the web server from your host's browser.
    You can also use this file to define multiple services, networks, and volumes.

    You can also use this file to define multiple services, networks, and volumes.

    version: '3'
        services:
        web:
            image: nginx
            ports:
            - "80:80"
        redis:
            image: redis
        volumes:
        data:

    This example, defines a web service that runs on nginx and redis service, also it defines a volume called "data" that can be used by the services.
    In summary, YAML is a file format that is used in Docker Compose to define the services, networks, and volumes that make up your application,
    it is a human-readable data serialization format that is easy to understand and write.
    A YAML file in Docker Compose is used to define the services, networks, and volumes that make up your application
    and it also allows you to specify environment variables, ports, and other configurations for each service,
    It is a simple way to specify your application structure, dependencies and configurations in a single file.

    What are volumes in Docker?
    In Docker, a volume is a way to store data outside of a container's filesystem.
    Volumes are useful for a number of reasons, including:
    Persistence: Volumes allow data to persist even if the container is deleted.
    Isolation: Volumes allow data to be isolated from the container's filesystem, so that it is not deleted when the container is deleted.
    Sharing: Volumes can be shared between multiple containers, allowing data to be shared between different parts of an application.
    Backups: Volumes can be backed up and restored, allowing data to be easily saved and restored.
    There are two types of volumes in Docker:
    Bind Mounts: This type of volume allows you to mount a directory from the host machine into a container.
    This allows you to easily share data between the host and container.
    Named Volumes: This type of volume is managed by Docker and stored in a location specified by the Docker daemon.
    This allows you to easily share data between containers and also allows for data to persist even if the container is deleted.
    You can create, list and manage volumes using docker volume commands. 
    You can also specify volumes in the docker run or docker-compose command by using the -v or --mount flag.
    In summary, In Docker, a volume is a way to store data outside of a container's filesystem, it allows data to persist even if the container is deleted, it allows 
    data to be isolated from the container's filesystem
    so that it is not deleted when the container is deleted, it allows for data to be shared between multiple containers and backups can be easily done.
    There are two types of volumes in Docker: Bind Mounts and Named Volumes, you can create, list and manage volumes using docker volume commands
    and you can also specify volumes in the docker run or docker-compose command by using the -v or --mount flag.

    Can you explain me the following output when running docker volume inspect?
    [
        {
            "CreatedAt": "2023-01-25T21:07:53Z",
            "Driver": "local",
            "Labels": {
                "com.docker.compose.project": "clunk-api",
                "com.docker.compose.version": "2.12.1",
                "com.docker.compose.volume": "postgresql-v10.4-data"
            },
            "Mountpoint": "/var/lib/docker/volumes/clunk-api_postgresql-v10.4-data/_data",
            "Name": "clunk-api_postgresql-v10.4-data",
            "Options": null,
            "Scope": "local"
        }
    ]
    The output you provided is the result of running the docker volume inspect command on a volume named "clunk-api_postgresql-v10.4-data"
    It is an array of JSON objects containing information about the volume.
    Here is an explanation of each field in the JSON output:
    "CreatedAt": This field indicates the date and time the volume was created.
    "Driver": This field indicates the volume driver used for the volume. In this case, it is "local".
    "Labels": This field contains any labels that have been associated with the volume.
        "com.docker.compose.project": The name of the project the volume belongs to.
        "com.docker.compose.version": The version of the compose file used to create the volume.
        "com.docker.compose.volume": The name of the volume as defined in the compose file.
    "Mountpoint": This field indicates the location on the host machine where the volume data is stored.
    "Name": This field indicates the name of the volume.
    "Options": This field contains any options passed to the volume driver when the volume was created. In this case, it is null.
    "Scope": This field indicates the scope of the volume. In this case, it is "local" which means the volume is only visible to the host it was created on.
    This output is showing information of a volume, specifically a volume named "clunk-api_postgresql-v10.4-data" which was created at "2023-01-25T21:07:53Z", 
    it is a local volume,
    it has labels associated to it, the mountpoint is "/var/lib/docker/volumes/clunk-api_postgresql-v10.4-data/_data" and has no options set.

    How can I see the mountpoint folder of the above result if I'm using WSL?
    If you are running Docker in Windows Subsystem for Linux (WSL), the mountpoint of a volume will be located within the WSL file system, 
    but the path to the mountpoint will be in the Windows file system.
    To see the mountpoint folder in WSL, you can use the command ls /var/lib/docker/volumes/ and check for the folder that corresponds to the volume.
    and check for the folder that corresponds to the volume.
    Alternatively, you can use the command wslpath -w /var/lib/docker/volumes/ to convert the WSL path to a Windows path, and then navigate to the folder in Windows Explorer.
    Additionally, you can use the following command to open the folder in Windows explorer:
    explorer.exe $(wslpath -w /var/lib/docker/volumes/)
    This will open the windows explorer in the folder corresponding to the mountpoint in the volumes, you can then navigate to the 
    mountpoint folder of the volume you are inspecting.
    Please keep in mind that if you have any issues with permissions, you may have to run the commands as an administrator or change the permissions of the folder.

    Every commando you listed gave me the following output:
    "/var/lib/docker/volumes/: No such file or directory"
    How can I see the volume folder then?
    I apologize for the confusion, it seems that the location of the volumes in your system is different from the one I provided in my previous answer.
    The location of the volumes depends on the configuration of your Docker daemon and it may be different for different systems.
    You can check the location of the volumes by inspecting the Docker daemon's settings.
    You can use the command docker info to check the settings of the Docker daemon, among the information provided you will see a line like
    ...
    Volumes:
    local                  xxxx
    ...
    This line will indicate where the volumes are located in your system.
    You can also use the command docker volume ls to list all the volumes, and use docker volume inspect <volume_name> to inspect the specific volume
    this command will give you the information of the volume, including the "Mountpoint" field, where the volume's data is stored.
    You can then navigate to the folder specified in the Mountpoint field to see the files and folders stored in that volume.

    What is the difference between docker-compose.yml and docker-compose.override.yml?
    docker-compose.yml and docker-compose.override.yml are both configuration files used in conjunction with the docker-compose command.
    docker-compose.yml is the main configuration file that defines the services, networks and volumes for your application. It describes how your 
    application's services should be built, configured, and run.
    docker-compose.override.yml, on the other hand, is an optional file that allows you to override the settings in the docker-compose.yml file
    It is typically used to provide environment-specific configurations, such as different ports or environment variables for development, testing, and production environments.
    When you run docker-compose up, it will read both the docker-compose.yml and docker-compose.override.yml files and merge them together
    with the settings in the docker-compose.override.yml file taking precedence over the settings in the docker-compose.yml file.
    This allows you to keep your environment-specific configurations separate from your base configurations
    and to easily switch between different environments by changing the docker-compose.override.yml file.
    It is also important to note that the docker-compose.override.yml file is not created by default, it's a file that you have to create by yourself if you want to use it,
    also if you don't specify a docker-compose.override.yml file, the docker-compose up command will only read the docker-compose.yml file.

    Can you explain docker-compose run command? What about the --rm flag?
    docker-compose run is a command that allows you to run a one-off command in a specific service defined in your docker-compose.yml file.
    This command allows you to run a command in a new container, rather than in an existing container.
    The basic syntax for docker-compose run is as follows:
    docker-compose run [options] [service] [command]
    [options]: Additional options to pass to the command.
    [service]: The service defined in the docker-compose.yml file that the command will run in.
    [command]: The command you want to run in the container.
    The --rm flag is an option that automatically removes the container when the command completes
    By default, when you run docker-compose run, the container will remain on the host after the command completes.
    This can be useful for debugging or for inspecting the container's file system. However, if you don't need to keep the container, you can 
    add the --rm flag to automatically remove the container after the command completes.
    For example, if you have a service named web in your docker-compose.yml file and you want to run a command to check the version of the package npm 
    in that service, you can use the following command:
    docker-compose run --rm web npm -v
    This command will run the command npm -v in the container of the web service, and after the command completes the container will be removed.
    It's worth to mention that the docker-compose run command creates a new container, it's useful when you want to run a command that you don't 
    want to keep running in the background
    also the --rm flag is useful when you want to keep your host clean, in case you're running multiple commands or you're testing different things.

    Can you explain me the following command?
    docker-compose run --rm api yarn
    Yes, the command docker-compose run --rm api yarn is using docker-compose to run a command within a container, specifically the command yarn in a service called api.
    The command docker-compose run is used to run a command in a new container, rather than in an existing container.
    In this case, the command is running the command yarn within the container of the service named api. 
    This command is useful for running one-off commands or for testing purposes.
    The flag --rm is used to automatically remove the container when the command completes.
    In this case, after the yarn command finishes running, the api container will be removed from the host
    This flag is useful for keeping your host clean and to avoid unnecessary containers.
    yarn is a package manager for javascript, similar to npm, it can be used to install, update and manage dependencies in a javascript project.
    So this command will run yarn package manager within the container of the api service, it could be used for example to install new dependencies, run test, update, etc.
    It's important to mention that this command assumes that the service api is defined in the docker-compose.yml file, and that the api service has yarn installed in it.
    Also, the command is running the yarn command in the context of the working directory of the container.
    this means that the command will look for a package.json file in the current working directory and it will use the dependencies defined in that file.

    Can you explain me the following command?
    docker-compose run --rm api yarn seed
    Sure, the command docker-compose run --rm api yarn seed is using docker-compose to run a command within a container, specifically the command 
    yarn seed in a service called api.
    This command is similar to the previous one I explained, however this time, the command is running yarn seed instead of just yarn.
    yarn seed is a custom command that might be defined in the package.json file of your application, it could be a script that runs database seeders or any other 
    script that you want to run in your project.
    The docker-compose run command will start a new container based on the api service defined in the docker-compose.yml file, it will run the command yarn seed 
    in that container, this command will look for a script named seed in the package.json file and it will run it.
    The --rm flag is used to automatically remove the container when the command completes

    Can you explain me the docker-compose up command? What about the -d flag? Can you teach me?
    docker-compose up is a command that is used to start and run all the services defined in the docker-compose.yml file.
    This command will create and start the defined containers, networks and volumes.
    The basic syntax for docker-compose up is as follows:
    docker-compose up [options] [service...]
    [options]: Additional options to pass to the command.
    [service...]: The services defined in the docker-compose.yml file that you want to start. If you don't specify any services, 
    all services defined in the file will be started.
    The -d flag is an option that is used to run the containers in detached mode.
    By default, when you run docker-compose up, the command will run in the foreground and you will see the logs of all the services in the terminal.
    If you add the -d flag, the containers will be started in detached mode, which means that they will run in the background and the logs will not be shown in the terminal.
    For example, if you have a docker-compose.yml file with three services (web, api and db) and you want to start all of them in detached mode, 
    you can use the following command:
    docker-compose up -d
    This command will start all the services defined in the docker-compose.yml file, and they will run in the background.
    You can also specify only some services that you want to start using the command:
    docker-compose up -d api
    This command will start only the service named api in detached mode.
    It's important to mention that the docker-compose up command will also create the containers, networks and volumes if they don't exist, 
    if you run the command again the containers, networks and volumes will be started again if they're not running.
    In summary, the docker-compose up command is used to start and run the services defined in the docker-compose.yml file, creating the containers, networks and volumes 
    if they don't exist.
    The -d flag is used to run the containers in detached mode, which means that they will run in the background and the logs will not be shown in the terminal.

    In Docker Desktop, when you click the Start command in a Container that have "sub containers". What command exactly am I executing?
    When you click the "Start" button in Docker Desktop for a container that has "sub containers" (also known as linked containers), 
    you are executing the docker-compose up command for that specific container.
    When you start a container that has "sub containers" in Docker Desktop, it will automatically look for a docker-compose.yml file in the root directory 
    of that container and it will use it to start the container and any linked containers that are defined in the file.
    The docker-compose up command will start all the services defined in the docker-compose.yml file and it will create the containers, networks and volumes if they don't exist. 
    By default, the docker-compose up command will run in the foreground, but in Docker Desktop when you click the "Start" button, it runs the docker-compose 
    up command in detached mode
    which means that the containers will run in the background and the logs will not be shown in the terminal.
    It's important to mention that when you start a container in Docker Desktop, it will automatically run the command with the -d flag, 
    which means that the container will run in detached mode.
    In summary, when you click the "Start" button in Docker Desktop for a container that has "sub containers" 
    you are executing the docker-compose up command for that specific container,
    which will start the container and any linked containers that are defined in the docker-compose.yml file, and it will run them in detached mode.

    In Docker Desktop, when you click the Start command in a Container that DON'T have "sub containers". What command exactly am I executing?
    When you click the "Start" button in Docker Desktop for a container that doesn't have "sub containers" (also known as linked containers), 
    you are executing the docker run command for that specific container.
    The docker run command is used to start a new container. It takes the image name as an argument and starts a new container based on that image.

    Can you explain me the following docker-compose.yml?
    This is a Docker Compose file in version 3. It specifies the configuration for a service called "api" in a multi-container environment.
    The build section specifies that the context for building the Docker image is the current directory (".").
    The volumes section creates a volume that maps the current directory to the /usr/src/app directory inside the container.
    This allows changes made to the code on the host machine to be reflected in the container, without the need to rebuild the image.
    The restart section specifies that the container should be restarted if it fails.
    The depends_on section specifies that the "api" service depends on the "postgresql", "elasticsearch", and "redis" services.
    This means that those services should be started before the "api" service and that they should be considered healthy before starting the "api" service.
    The ports section maps the host machine's port specified by the SERVER_PORT environment variable to the same port on the container.
    The environment section sets a number of environment variables for the container, 
    including SERVER_PORT, API_HOST, NODE_ENV, REMOTE_STORE, SYSTEM_KEY, INSTANCE_ID, INSTANCE_ENV, SECURE_ENV, SECURE_ENV_SERVICE, AWS_REGION, and ROARR_LOG
    These environment variables are used by the application running inside the container to configure its behavior.

    What is the volumes section inside of a service defined on a docker-compose.yml? 
    Can you explain the syntax of the section? And the syntax of a docker-compose.yml in general?
    In the volumes section of a service defined in a docker-compose.yml file, you can specify the volumes that should be created 
    and/or mounted to the container when it is launched. The basic syntax of the volumes section is as follows:
    services:
    <service-name>:
        ...
        volumes:
        - <host-directory-path>:<container-directory-path>
    Here, <host-directory-path> is the path of the directory on the host machine that you want to mount to the container,
    and <container-directory-path> is the path of the directory inside the container where you want to mount the host directory.
    The - before the <host-directory-path> and <container-directory-path> specifies that it is a volume.
    In the example you provided, the volume is being created by mounting the current directory (.) on the host machine to the /usr/src/app directory inside the container.
    volumes:
      - .:/usr/src/app
    Regarding the general syntax of a docker-compose.yml, it is a file that defines how Docker containers should behave in production.
    It allows you to configure your application’s services, networks and volumes in a single file. The file consists of a version number, services, networks and volumes.
    version: '3'

    services:
    <service-name-1>:
        ...
    <service-name-2>:
        ...
    ...

    volumes:
    <volume-name-1>:
        ...
    <volume-name-2>:
        ...
    ...

    networks:
    <network-name-1>:
        ...
    <network-name-2>:
        ...
    ...
    In this case, services section is where you define the different services that make up your application, volumes section is where you configure named volumes
    for your application and networks section is where you configure the networks for your application.

    What is the restart section inside of a service defined on a docker-compose.yml? 
    Can you explain the syntax of the section? What does it mean on-failure?
    The restart section inside of a service defined in a docker-compose.yml file is used to configure the behavior of a service when it exits.
    The restart section can have several options including always, unless-stopped, on-failure, no.
    The default option is no which means that the service will not automatically restart.
    The on-failure option tells Docker Compose to automatically restart the service if it exits with a non-zero exit code.
    This is useful for ensuring that a service stays running even if it encounters an error.
    You can also specify a maximum number of restarts that should occur in a certain amount of time before giving up on trying to restart the service 
    with the on-failure:<number>
    For example, the following docker-compose.yml file would configure a service named my-service to always restart:
    version: '3'
    services:
    my-service:
        restart: always
    and this would configure a service named my-service to restart only on failure and retry 5 times before giving up:
    version: '3'
    services:
    my-service:
        restart: on-failure:5
    
    
    What is the depends_on section inside of a service defined on a docker-compose.yml? 
    Can you explain the syntax of the section? What does it mean the '-' before a dependancy defined in this section?
    The depends_on section inside of a service defined in a docker-compose.yml file is used to specify the services that a given service depends on.
    The depends_on option allows you to specify that a service should not be started until one or more other services have started. 
    The syntax for the depends_on option is a list of service names, like this:
    version: '3'
    services:
    my-service:
        depends_on:
        - service1
        - service2
    This will ensure that service1 and service2 are started before my-service is started.

    What is the ports section inside of a service defined on a docker-compose.yml? 
    Can you explain the syntax of the section?
    The ports section inside of a service defined in a docker-compose.yml file is used to configure the ports that the service will expose.
    The ports option allows you to map ports on the host to ports inside the container. The syntax for the ports option is a list of port mappings, like this:
    version: '3'
    services:
    my-service:
        ports:
        - "8080:80"
        - "443:443"
    This will expose port 80 inside the container as port 8080 on the host and port 443 inside the container as port 443 on the host.
    It is also possible to use the host's IP address instead of the hostname "localhost" when mapping ports.
    This can be useful if you want to access the service from a different machine or if you want to use a specific IP address for your container. The syntax for this is:
    version: '3'
    services:
    my-service:
        ports:
        - "127.0.0.1:8080:80"
    This will map port 80 inside the container to port 8080 on the host's IP address 127.0.0.1.
    You can also use a range of host ports, this can be useful when you want to run multiple instances of the same container on a single host, the syntax for this is:
    version: '3'
    services:
    my-service:
        ports:
        - "8000-8100:80"
    This will map port 80 inside the container to a random port between 8000-8100 on the host.
    It's also possible to use the published keyword to specify the host port explicitly and target keyword to specify the container port, like this:
    version: '3'
    services:
    my-service:
        ports:
        - published: 8080
            target: 80
    This will expose port 80 inside the container as port 8080 on the host.

    What is the ports environment inside of a service defined on a docker-compose.yml? 
    Can you explain the syntax of the section?
    The environment section inside of a service defined in a docker-compose.yml file is used to set environment variables for the service's container.
    The environment option allows you to pass in key-value pairs that can be used to configure the service or provide configuration information to the service's application.
    The syntax for the environment option is a list of key-value pairs, like this:
    version: '3'
    services:
    my-service:
        environment:
        - VAR1=value1
        - VAR2=value2
    This will set the environment variables VAR1 and VAR2 to value1 and value2 respectively.
    It's also possible to use the env_file option to specify an external file that contains the environment variables, like this:
    version: '3'
    services:
    my-service:
        env_file:
        - my-env-file.env
    This will read the environment variables from the file my-env-file.env and set them to the container.
    Environment variables can also be set with .env file that should be located in the same directory as the docker-compose.yml file.
    This file is used to store environment variables that are common to all the services defined in the docker-compose.yml file.
    It's also possible to use the environment and env_file together, in that case, the environment variables defined in the docker-compose.yml file 
    will take precedence over the ones defined in the env_file.

    In the environment section of the docker-compose.yml, can you set the env variable as VAR1: ${SERVER_PORT}?
    Yes, it is possible to set an environment variable in the environment section of the docker-compose.yml file to reference a variable that is defined elsewhere, 
    such as the example you provided:
    version: '3'
    services:
    my-service:
        environment:
        - VAR1: ${SERVER_PORT}
    This sets the environment variable VAR1 to the value of the variable SERVER_PORT.
    The SERVER_PORT variable could be defined in the .env file, which should be located in the same directory as the docker-compose.yml file.
    It could also be passed to the docker-compose command using the -e flag or defined as an environment variable in the host system.
    It's important to note that if the variable is not defined in any of the above places, the container will start with the variable VAR1 with the value ${SERVER_PORT}.
    It is also possible to use the syntax ${VAR:-default} to specify a default value for the variable in case it is not defined. This allows you to avoid unexpected behavior 
    if the variable is not defined.
    version: '3'
    services:
    my-service:
        environment:
        - VAR1: ${SERVER_PORT:-80}
    This sets the environment variable VAR1 to the value of the variable SERVER_PORT if it's defined, otherwise it's set to 80.

    In the ports section of the docker-compose.yml, can you set the mapping as "${SERVER_PORT}:${SERVER_PORT}"?
    Yes, it is possible to set the port mapping in the ports section of the docker-compose.yml file to reference a variable that is defined elsewhere, 
    such as the example you provided:
    version: '3'
    services:
    my-service:
        ports:
        - "${SERVER_PORT}:${SERVER_PORT}"
    This maps the host's port SERVER_PORT to the container's port SERVER_PORT.
    The SERVER_PORT variable could be defined in the .env file, which should be located in the same directory as the docker-compose.yml file.
    It could also be passed to the docker-compose command using the -e flag or defined as an environment variable in the host system.
    It's important to note that if the variable is not defined in any of the above places, the container will start without a port mapping.
    It is also possible to use the syntax ${VAR:-default} to specify a default value for the variable in case it is not defined.
    This allows you to avoid unexpected behavior if the variable is not defined.
    version: '3'
    services:
    my-service:
        ports:
        - "${SERVER_PORT:-80}:${SERVER_PORT:-80}"
    This maps the host's port SERVER_PORT to the container's port SERVER_PORT if it's defined, otherwise it maps the host's port 80 to the container's port 80.
    It's worth noting that in this case the container and host ports must be the same.

    And why do we wrap the port mapping of the port section in "", and we don't wrap the variable defined in the environment section in ""?
    The reason for wrapping the port mapping in quotes (") in the ports section of the docker-compose.yml file is because the value is a string, and it 
    allows you to include variables that reference other environment variables.
    The quotes are used to indicate that the value of the variable is a string rather than a numeric value.
    Without the quotes, the value of the variable would be interpreted as a numeric value, and the variable would not be expanded.
    On the other hand, the environment section of the docker-compose.yml file, the variable does not need to be wrapped in quotes, 
    because the values are interpreted as strings by default.
    Wrapping a variable in quotes in the environment section causes the variable to be passed as a string rather than expanding the variable.
    version: '3'
    services:
    my-service:
        environment:
        - VAR1: ${SERVER_PORT}
    This sets the environment variable VAR1 to the value of the variable SERVER_PORT.
    version: '3'
    services:
    my-service:
        environment:
        - VAR1: "${SERVER_PORT}"
    This sets the environment variable VAR1 to the string "${SERVER_PORT}" rather than expanding the variable
    In summary, wrapping the port mapping in quotes in the ports section allows you to include variables that reference other environment variables,
    and it's not necessary to do the same in the environment section, since the values are interpreted as strings by default.

    Can you explain me the following docker-compose.override.yml?
    This is a docker-compose.override.yml file, which allows you to override the configuration of your services defined in the docker-compose.yml file.
    In this file, it defines 4 services: api, postgresql, elasticsearch, and redis.
    The api service depends on the postgresql, elasticsearch, and redis services, 
    and is given several environment variables which are used to connect to the dependent services. 
    The postgresql service uses the postgres:10.4-alpine image and maps the host port 6543 to the container port 5432.
    It also defines environment variables for the POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, PGDATA
    and also mounts a named volume postgresql-v10.4-data to /var/lib/postgresql/data/pgdata path.
    The elasticsearch service is built using the current directory and the Dockerfile.elasticsearch file.
    It maps the host port 9200 to the container port 9200 and also defines environment variables for http.host=0.0.0.0, transport.host=127.0.0.1
    xpack.security.enabled=true, ELASTIC_PASSWORD=${ELASTIC_SEARCH_PASSWORD} and also mounts a named volume es-v7.3.2-data to /usr/share/elasticsearch/data path.
    The redis service uses the redis:5.0.1-alpine image and it exposed the container port 6379 and maps the host port 6379 to the container port 6379.
    It also mounts a named volume redis-v5.0.1-data to /data path.
    At the bottom of the file, it defines named volumes postgresql-v10.4-data, es-v7.3.2-data, redis-v5.0.1-data for the respective services.

    What is the image section inside of a service defined on a docker-compose.override.yml?
    In a docker-compose.override.yml file, the image section specifies the Docker image that should be used for a particular service.
    The value should be the name of the image, optionally followed by a tag or digest.
    For example, the image section in the postgresql service in your provided docker-compose.override.yml is set to postgres:10.4-alpine, 
    which specifies the official PostgreSQL image at version 10.4 and the Alpine Linux variant of the image.
    The image section is typically used to specify a different image than the one specified in the docker-compose.yml file for a given service.
    This allows you to use different images for different environments, such as using a smaller image for development and a larger image with more features for production.

    Can you explain me the dockerfile section inside of build section of a defined service in the docker-compose.override.yml?
    In the docker-compose.override.yml file you provided, there is a build section within the elasticsearch service.
    The build section is used to specify the context and Dockerfile that should be used to build the image for the service.
    The context key is used to specify the path to the directory containing the Dockerfile and any other files that are needed to build the image.
    The dockerfile key is used to specify the name of the Dockerfile within the context directory.
    The elasticsearch service's build section specified the context as "." this means the current directory where the docker-compose.override.yml file is located
    and the dockerfile as Dockerfile.elasticsearch which means there's a file named Dockerfile.elasticsearch in the same directory of docker-compose.override.yml
    and this file will be used to build the image for the elasticsearch service.
    The Dockerfile is a script that contains instructions for building a Docker image.
    These instructions include things like what base image to use, what files to copy into the image, and what commands to run within the image
    By using the build section in docker-compose.override.yml you can easily configure your services to use custom images that you build yourself.

    Can you explain me the expose section inside of the redis defined service in the docker-compose.override.yml?
    The "expose" section in the "redis" service of the "docker-compose.override.yml" file is used to inform Docker 
    that the container listens on the specified network ports at runtime.
    It does not publish the ports to the host machine.
    It only informs Docker that the container uses these ports, without specifying how they should be mapped to the host.
    In the example you provided, the redis service is exposing port 6379 within the container, but it is not publishing it to the host machine
    This means that other containers on the same network as this one can communicate with the redis container on port 6379, 
    but it will not be accessible from outside of the network.

    What are the difference between mapping a port from host to container, publishing and exposing a port?
    When you map a port from the host to a container in the docker-compose.yml file, you are specifying that a specific port on the host will 
    be forwarded to a specific port within the container.
    This is done using the ports configuration option.
    For example, if you have a service running on port 80 in a container, and you want to access it on port 8080 on the host, you would map the ports 
    like this: ports: - "8080:80".
    Publishing a port with the -p option or --publish option when running docker run command, is similar to mapping a port in a docker-compose.yml file.
    It tells Docker to map the port on the host to the port in the container.
    Exposing a port with the EXPOSE instruction in a Dockerfile or with the expose option in docker-compose.yml file, is a way to inform Docker that a specific 
    port or range of ports is used by the container.
    This is done during the image build process and it is not a direct mapping of the host port to the container port.
    This is useful for other people who will be using your image to know which ports they should use when running the container.
    In summary, mapping a port is a way to access the container's port from the host, publishing a port is a way to access 
    the container's port from the host, exposing a port is a way to inform other people about the ports used by the container.

    Why do we define the environment section of the elasticsearch service in the format "- http.host=0.0.0.0" (the http.host variable is an example). 
    Can you explain me the syntax? Which is the difference for the syntax VAR1: ${VAR_VALUE} ?
    In the environment section of the elasticsearch service in the docker-compose.override.yml file, the environment variables are being defined 
    in a format of - http.host=0.0.0.0
    This is the format used to define environment variables in a docker-compose.yml file when using the version 2 or version 3 schema. The syntax used is - VAR1=VALUE.
    In contrast, the syntax VAR1: ${VAR_VALUE} is used in version 2 or 3 of the compose file to refer to an environment variable defined outside the compose file.
    This allows us to separate our configuration from our code and keep sensitive data like passwords and keys out of our codebase.
    For example, in the same compose file, you would define the variables in a .env file.
    The difference between the two syntax is that the first one is defining a constant value, the second one is defining a reference to an environment variable.

    Why do we have volumes inside each service and volumes outside (let's say, at the "root level" of the docker-compose.override.yml) ?
    The volumes key inside each service specifies the volumes that are specific to that service and are used by that service. These volumes 
    are created and managed by Compose and are specific to the project.
    The volumes key outside of any service (at the root level) is used to define named volumes that can be shared across services in the compose file
    and are not tied to any one service. 
    This allows you to reuse the same volume across different services or different compose files. Also, these volumes can be used to persist 
    data between container restarts and/or updates.

    How can I start a shell to inspect the Docker containers filesystem with Docker compose in the above application scenario?
    To start a shell and inspect the filesystem of a container defined in your docker-compose.override.yml file, you can use the docker-compose exec command.
    For example, if you want to start a shell in the "api" container, you can use the following command:
    docker-compose exec api sh
    You can also use bash instead of sh if you prefer.
    This will start a shell session inside the container, allowing you to navigate the filesystem and inspect the files and directories. 
    You can exit the shell by typing exit.
    You can also use docker-compose exec command to start a shell in the other services defined in the compose file, like postgresql, elasticsearch or redis, 
    just replacing the service name accordingly.

    If we have a docker-compose.yml, a docker-compose.override.yml and a Dockerfile in our application, which is the 
    order that the files are read when executing docker-compose up command?
    When you run the docker-compose up command, Docker Compose reads the docker-compose.yml file first, 
    and then any overrides specified in the docker-compose.override.yml file.
    The Dockerfile is not read by the docker-compose up command, as it is used to build the image for the service defined in the docker-compose.yml 
    and docker-compose.override.yml files.
    So the order is:
    docker-compose.yml
    docker-compose.override.yml
    Dockerfile
    It's important to notice that the Dockerfile is not read by the docker-compose command, the Dockerfile is used to build the image and the 
    docker-compose command uses this image to run the service.

    How can I establish a networking infraestructure between two Docker Containers using Docker Compose?
    You can establish a networking infrastructure between two Docker containers using Docker Compose by defining a network in your docker-compose.yml file
    and then specifying that network in the networks section of each service that you want to connect.
    An example of a docker-compose.yml file that creates a network and connects two services to it would look like this:
    version: '3'
    services:
    service1:
        networks:
        - mynetwork
        ...
    service2:
        networks:
        - mynetwork
        ...
    networks:
    mynetwork:
    With this configuration, the two services service1 and service2 are connected to the mynetwork network, 
    and can communicate with each other using the hostnames or IP addresses of the containers.
    You can also use the links option in the docker-compose.yml file to link services together.
    Services that are linked to each other are automatically added to the default network, and can communicate with each other using their service name as hostname.
    version: '3'
    services:
    service1:
        ...
    service2:
        links:
        - service1
        ...
    By this way you can connect two containers in the same network and they can communicate with each other.

    If we don't define any network in our docker-compose.yml nor docker-compose.override.yml. Can the containers communicate and are members of a network?
    By default, when you use docker-compose up command to start your containers, they will be connected to a default network that is created automatically by Docker Compose.
    This default network allows the containers to communicate with each other using their container name as the hostname.
    However, if you want to customize the network settings, such as network name, subnet, and IP ranges, you can define your own 
    network in the docker-compose.yml or docker-compose.override.yml files using the networks section.
    Then, you can specify which network each service should be connected to using the network key in the service definition.

    Can you show me the link to the official docs that explains the different options for docker-compose.yml?

    50. Introducing Docker Compose
    Dockerfile y creamos una nueva imagen para nuestra app.
    Cuando intentamos correr docker run lasantoneta/visits:latest, veremos que tenemos un error diciendo que no se puede conectar al Redis Server básicamente.
    Entonces, intentamos runnear el redis server en otro container.
    Tenemos la instancia de redis corriendo. 
    Cuando intentamos correr nuevamente docker run lasantoneta/visits:latest, veremos que seguimos teniendo el mismo error.
    Hasta el momento tenemos la Node App running en un Container, y el Redis Server running en otro container. Pero no tienen comunicación entre ellos.
    Es decir, son procesos aislados que no tienen comunicación entre ellos.
    Para desarrollar la habilida de que la Node App pueda comunicarse con el Redis Server y guardar información, necesitamos setupear una networking infraestructure.

    Opciones para networking infraestructure:
    1. Docker CLI -> pain in the ass.
    2. Docker Compose -> solución sencilla para multi-container.

    Docker compose existe para que evites correr muchos comandos repetitivos con la Docker CLI.

    51. Docker Compose Files
    Docker Compose -> CLI separada a la Docker CLI que se instala con Docker.
    Nos permite startear múltiples containers al mismo tiempo.
    Automatiza alguno de los comandos que pasamos al Docker run.
    Con Docker Compose vamos a tomar los mismos comandos que escribíamos en la Docker CLI, pero los vamos a codificar en un file especial en nuestro directorio de proyecto
    llamado docker-compose.yml. docker-compose.yml contiene todas las opciones que normalmente pasaríamos a través de la Docker CLI.

    Estos es lo que quiero escribir esencialmente en el docker-compose.yml:
    Estos son los containers que creamos:
        redis-server
            Usando la redis image:
        node-app
            Realizar esta imagen usando el Dockerfile en el current directory
            Mapear puerto 8081:8081.
    
    Tendremos dos containers. Uno llamado redis-server, que se crea usando la imagen "redis" que se obtendrá del Docker Hub.
    Un segundo container llamado node-app. Se crea utilizando el Dockerfile del Current Directory. 
    Luego queremos mapear algunos puertos desde nuestro Container hacia la local machine. 

















    




    


*/
