#1. Use an existing Docker image as a base. 
FROM alpine

#2. Download an install a dependancy.
RUN apk add --update redis
RUN apk add --update gcc

#3. Tell the image what to do when it starts as a Container. 
CMD ["redis-server"]


#THEORY----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
#Una vez que termino de escribir mi Dockerfile, tengo que volver a la terminal y voy a correr el comando:
#DOCKER BUILD .
#Por favor no olvidar el .
#Luego, con el id de la image buildeada, tengo que runnear el container. Docker run <containerId>

#What is docker build command?
#The docker build command is used to build an image from a specified Dockerfile.
#A Dockerfile is a script that contains instructions for building an image.
#The docker build command takes the path to the directory containing the Dockerfile as its first argument, and the desired image name as its second argument.
#For example, the command docker build -t my_image . will build an image called "my_image" from the Dockerfile in the current directory.
#The docker build command also allows you to pass build-time variables and use a cache for the build context
#this can be useful for example to define a specific version of a software or to speed up the build process.
#In summary, docker build command is used to build a Docker image using a Dockerfile and build context, it can take several arguments and options to customize the build process.

#What is -t flag in docker build command?
#The -t flag in the docker build command is used to specify the desired name and optionally a tag in the name:tag format for the image being built.
#For example, using the command docker build -t my_image:latest . will create an image called "my_image" with the tag "latest" based on the instructions 
#in the Dockerfile in the current directory.
#If no tag is specified, "latest" is used as a default. Without the -t flag, the image will be build but will be given an ID as the name.
#By giving a name and optionally a tag to an image, it becomes more identifiable and can be more easily referenced and managed, 
#allowing to have multiple versions of the same image and easily switch between them.

#What is a Dockerfile?
#A Dockerfile is a script that contains a set of instructions for building a Docker image. Each instruction in a Dockerfile creates a new layer in the image.
#A Dockerfile typically starts with a base image and then runs a series of commands to install software, copy files, and perform other configuration tasks.
#Once the instructions are completed, the image is built and can be used to start containers.
#Here is an example of a simple Dockerfile that starts with a base image of Ubuntu and installs Apache web server:

#FROM ubuntu:20.04
#RUN apt-get update && apt-get install -y apache2
#CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]

#The first line specifies the base image to use. The RUN command runs a shell command to update the package manager and install apache.
#The CMD command specifies the command that should be run when a container is started from the image.

#Dockerfile instruction set is simple and easy to understand, it includes instructions like 
#FROM, RUN, CMD, EXPOSE, ENV, ADD, COPY, ENTRYPOINT, VOLUME, USER, WORKDIR and others.
#They all have a specific function that can be used to customize the image as per the requirement.

#Cada línea de configuración del Dockerfile comienza con una sola palabra en mayúscula. Se la refiere como instrucción. 
#Esta instrucción le dice al Docker Server de hacer una preparación específica en la imagen que queremos crear. 
#FROM -> Docker Image que queremos usar como Base Image. 
#RUN -> ejecutar determinado comando (mientras estamos preparando nuestra custom image). 
#CMD -> "Command". Comando que se debe ejecutar cuando iniciamos un Container a través de nuestra imagen customizada que estamos creando.
#Luego de la instrucción (FROM, RUN o CMD) le proveemos un argumento a la instrucción. Esto customiza la forma en la que se ejecuta la instrucción. 
#FROM alpine = Queremos usar una Base Image de alpine cuando estemos preparando nuestra imagen. 

#Analogía: Escribir un Dockerfile === Ser una computadora sin OS a la cual se le pide que instales Chrome.
#Si sos una computadora sin OS, los pasos para instalar Google Chrome serían:
#1. Instalar un OS.
#2. Inicializar tu default Browser.
#3. Navegar a chrome.google.com
#4. Descargar un instalador de Google Chorme.
#5. Abrir el archivo / carpeta donde está ubicado el instalador.
#6. Ejecutar chrome_installer.exe.
#7. Ejecutar chrome.exe.

#Cuando intentamos prender una computadora sin OS, eventualmente vamos a ver un cartel que dice "Sorry, no OS" (o algo similar).

#Instalar la base image de Alpine es similar a instalar el OS (#1). 
#Cuando creamos una imagen, por default tenemos una imagen vacía. Es decir, no hay nada adentro de ella. No hay infraestructura, no hay programas
#que podamos usar para navegar hacia determinado archivo o carpeta. No hay nada que podamos usar para descargar o instalar o configurar dependencias.
#Es decir, nada.
#Entonces, el propósito de especificar una Base Image es darle un Starting Point a la imagen. Es decir, un set inicial de programas que luego podemos customizar
#Para customizar nuestra imagen. 
#Alpine base image es parecido a un sistema operativo básico. Es el Starting Point para la imagen que estamos creando. 
#Qué es Alpine? Por qué usamos Alpine como Base Image en vez de usar Windows, MacOS o Ubuntu? Nosotros usamos determinado OS dado que se adecúa a nuestras necesidades.
#apk === Apache Package ... Es un Package Manager que viene pre-instalado en la Alpine Imagen. Entonces, podemos usar ese Package Manager que viene configurado en la
#Alpine Image para automáticamente descargar e instalar Redis para nosotros. Es decir, usamos Alpine porque tiene el Package Manager que nos es de utilidad.


#31. The Build Process in Detail:
#Docker Build . -> el "." es lo que se llama Build Context. El Build Context es esencialmente un set de files y folders que pertenecen a nuestro proyecto.
#Es un set de Files y Folders que queremos encapsular o wrappear en este Container. 
#Paso 1 -> FROM alpine. El Docker Server inicialmente mira nuestro local Build Cache para ver si alguna vez descargó la alpine Image. 
#En caso que no tenga la Imagen en el local Build Cache, el Docker Server se pone en contacto con el Docker Hub para descargar la Alpine Image. 
#Paso 2 -> run apk add --update redis. La primera cosa interesante a notar en este output es que dice "Running in <containerId>". Y luego, veamos que más abajo
#Dirá algo parecido a "Removing intermediate container <containerId>". Vemos que el output es similar al del Paso 3.
#Paso 3 -> CMD ["redis-server"]. Tenemos un Running in <containerId> y luego Removing Intermediate container <containerId>. 

#Recordemos en primer lugar que una imagen tiene un FS Snapshot y un Startup Command. Para la Alpine Image, no sabemos bien cual es el Startup Command,
#Pero no importa. 
#Cuando Docker Server ve el comando RUN apk add --update redis, toma la Imagen del paso anterior, y a raíz de la misma, crea un Container desde esa última imagen.
#Entonces, temporariamente, en memoria, tenemos un Brand New Container creado al comienzo del Step 2 RUN. 
#Entonces, básicamente tomamos el FS Snapshot de la Alpine Image y lo ponemos en el Container temporario que se crea al comienzo del paso 2. Luego de crear ese container
#Temporario en memoria con el FS Snapshot de la Alpine Image, se pasa el command de apk add --update redis como el Primary Running Process.
#Entonces, este comando se ejecuta dentro del Container y, mientras se ejecuta, fue al proceso de descargar Redis e instalarlo (junto a un par de dependencias). 
#Entonces, podemos imaginarnos que dentro de ese Installation Process, a lo mejor tuvimos nuevos files y folders que se crearon en el FS de nuestro Temporary Container.
#Ahora tenemos un Container que tiene Redis Instalado en su FS Snapshot. 
#Luego de que se instaló ese paquete, stopeamos el Container, tomamos un FS Snapshot de dicho Container y lo Stopeamos enteramente. Es decir,
#Se guarda temporariamente la imagen de ese nuevo Container con determinado id que aparece más abajo. 
#Entonces, ya no tenemos la Alpine Image (Base Image), sino que tenemos una imagen modificada temporariamente. Adentro de esa imagen, tenemos, todo lo que tenía la
#Alpine Image inicialmente + Redis folder and files. 
#Luego nos movemos al Paso 3. Con CMD, vamos a buscar la imagen que se generó en el Paso anterior. Vamos a crear entonces un nuevo Container con la imagen temporaria
#Que resulta del paso anterior. El FS Snapshot del nuevo Container es el de la imagen del paso anterior. Como Primary Running Process le ponemos redis-server.
#Es decir, "Hey Container, si alguna vez corrés realmente, este es el comando que tenés que ejecutar como Primary Running Process". Luego, Shut Down el Container
#Intermedio creado nuevamente y toma el Snapshot del FS y su Primary Running Process. 
#El Final Output es el Succssfully Built <containerId>. El Redis-server en realidad no es el Primary Running Process, sino el StartUp Command que se ejecutará
#En el futuro. 

#Lo importante a destacar es que, con cada paso adicional que tiene el Dockerfile, tomamos la imagen que se generó temporariamente en el paso anterior, creamos un nuevo
#Container a partir de ella, ejecutamos un comando en el Container como Primary Running Process o realizamos determinado cambio en el FS Snapshot. Luego, miramos al
#Container resultante, tomamos un Snapshot del FS y lo guardamos como output de la próxima instrucción del Dockerfile. Por último, cuando no hay más instrucciones
#Para ejecutar, la imagen que se generó durante el último paso es el output para el proceso entero como la Imagen final que necesitamos. 

#32. A Brief Recap:
#Comenzamos con la FROM instruction. Eso le avisa al Docker Server o Docker Daemon que tiene que descargar la Alpine Image del Docker Hub. 
#Usamos la Alpine Image como Base Image, dado que viene con programas útiles pre instalados. 
#Luego, se corre la RUN instruction por el Docker Server. Lo primero que ocurre ahí es que se mira a la imagen del paso anterior (en este caso, Alpine Image).
#Esa imagen luego se utiliza para crear un Container temporal. Luego, el comando que especificamos como parámetro del RUN apk add --update redis se ejecuta
#Dentro del Container temporal. Entonces, se instala Redis adentro de dicho Container. Entonces, como resultado, tenemos un Container con un FS modificado.
#Luego, tomamos un Snapshot del FS modificado de dicho Container. Y el resultado es un FS Snapshot. Luego, hacemos el Shut Down del temporary Container.
#Y tenemos nuestra imagen lista para el próximo paso. Esta imagen que estamos usando es el FS modificado que obtuvimos al instalar Redis en la Base Imagen
#De Alpine. 
#Nos podemos imaginar que al próximo paso estamos pasando la Alpine Image con Redis on top.
#Luego, nos movemos a la CMD["redis-server"] instruction. Al igual que antes, tomamos la imagen resultante del paso anterior. Creamos un temporary container.
#Pero ahora, en vez de ejecutar un comando dentro del Container (que es el propósito de la RUN instruction). En vez de eso, usamos el CMD instruction, que se utiliza
#Para especificar que debe hacer la imagen cuando se Startea como Container. Entonces, instrumos a la imagen que cuando se ejecute como Container en el futuro,
#Tenga que inicializar el Container ejecutando el redis-server command. El resultado es un Container que tiene un Primary Command modificado. 
#Luego shut down el temporary container y tenemos la imagen lista para la siguiente instrucción. 
#Pueso que no tenemos más pasos en este Dockerfile, el output de todo el proceso es la imagen que se generó en el último paso. 

#Why docker run temporary container when using Docker build out of a Dockerfile?
#When using the docker build command, a temporary container is created in order to execute the instructions in the Dockerfile.
#Each instruction in the Dockerfile creates a new layer in the final image, and these layers are built up using the filesystem changes made by the command in each instruction.
#The temporary container allows the build process to isolate the filesystem changes made by the instructions in the Dockerfile, so that they do not affect the host system.
#Once the build process is complete, the temporary container is discarded.

#What is the RUN instruction in the Dockerfile?
#The RUN instruction in a Dockerfile is used to execute commands in a new layer on top of the current image.
#The syntax for the RUN instruction is:

#RUN <command>

#For example, the following RUN instruction in a Dockerfile will update the package manager's package list and then install the nginx package:

#RUN apt-get update && \
#    apt-get install -y nginx

#Each RUN instruction creates a new layer in the image, which can add to the size of the final image.
#To reduce the size of the final image, you can use && to chain multiple commands together in a single RUN instruction, 
#or use the /bin/sh -c command to run multiple commands in a single layer, like this:

#RUN /bin/sh -c "apt-get update && apt-get install -y nginx"

#It's important to note that the commands in a RUN instruction will be executed during the build process of the image, 
#whereas the command passed to docker run will be executed at runtime of the container.

#What is apt in Linux?
#apt (Advanced Packaging Tool) is a package management system for Linux distributions, such as Debian and Ubuntu. 
#It is used to install, remove, and manage software packages in a Linux system.

#apt uses a database of software packages, called a repository, to manage the software installed on the system.
#The repository contains package information and the package files themselves.
#apt can access these repositories over the internet to download and install packages, or to upgrade existing packages to newer versions.

#apt command line tool is used to interact with the package management system. Some of the most commonly used apt commands include:

#apt-get update: updates the package list from the repositories.
#apt-get upgrade: upgrades all installed packages to the newest version.
#apt-get install: installs one or more packages.
#apt-get remove: removes one or more packages.
#apt-get autoremove: removes packages that were installed as dependencies but are no longer required.

#apt is considered as one of the most powerful package management system due to its flexibility and ease of use, which makes it a popular tool among Linux users.

#Explain me this line of code, of a Dockerfile RUN instruction:

#RUN apt-get update && \
#    apt-get install -y nginx

#This line of code in a Dockerfile uses the RUN instruction to execute two commands. The two commands are separated by &&, 
#which means that the second command will only be executed if the first command completes successfully.

#The first command apt-get update updates the package list from the repositories. This command synchronizes the local package index files from their sources. 
#This is necessary to ensure that you have the latest package versions available to install.

#The second command apt-get install -y nginx installs the package nginx. apt-get is the command line tool for interacting 
#with the package management system and install is the command to install packages.

#The -y option automatically confirms any prompts that the package manager may ask during the installation process, 
#otherwise the build process would pause, waiting for user input.

#Together, these commands update the package list and then install nginx package. The backslash \ at the end 
#of the first command allows you to split a long command into multiple lines for readability purpose.

#It's important to note that this line of code will be executed during the build process of the image, and the nginx package 
#will be installed and available in the final image.

#What is /bin/sh -c in a Dockerfile?
#In a Dockerfile, /bin/sh -c is used as a prefix for commands that are passed to the RUN instruction. It is used to execute the command in a shell
#the /bin/sh part specifies the shell to use, and the -c flag is used to pass a command to the shell.

#For example, this line of code in a Dockerfile:

#RUN /bin/sh -c "apt-get update && apt-get install -y nginx"

#This command will update the package list and install the nginx package in a single RUN instruction. 
#The && operator is used to chain the two commands together and execute them sequentially.

#By using /bin/sh -c in a RUN instruction, it allows to run multiple commands in a single layer, which can help to reduce the size of the final image.
#This is because each RUN instruction creates a new layer in the image, and if you have multiple RUN instructions, each one will create a new layer.

#Also, it's important to note that the command passed after /bin/sh -c will be executed during the build process of the image, whereas the command passed 
#to docker run will be executed at runtime of the container.

#What is bin in Linux?
#In Linux, the "bin" directory typically contains binary executable files
#These are files that can be run or executed by the operating system.
#The name "bin" is short for "binary." The directory is typically located in the root of the file system and 
#is used to store essential command-line utilities, such as ls, cp, and mv.

#What are binary executable files in Linux?
#Binary executable files in Linux are files that contain machine code that can be executed directly by the system's CPU.
#These files typically have the file extension ".bin" or ".exe" and can be run from the command line by typing the name of the file and pressing enter.
# In Linux, executables files typically have the execute permission bit set, indicating that the file can be executed by a user.
#These files are typically generated when a program is compiled from source code.

#What is the CMD instruction in a Dockerfile?
#In a Dockerfile, the CMD instruction is used to specify the command that will be run when a container is started from the image.
#The command specified in the CMD instruction is the default command that will be run if no command is provided when starting the container.
#The CMD instruction has the following syntax:
#CMD ["executable","param1","param2",...]
#CMD command param1 param2 ...
#It is important to note that if a command is already specified in the ENTRYPOINT instruction, the command provided in the CMD instruction will be ignored.
#It is also possible to provide a shell command, instead of an executable, in the CMD instruction, 
#in that case the shell specified in the ENTRYPOINT instruction or /bin/sh -c will be used as default.
#CMD ["echo","Hello World!"]
#Or
#CMD echo "Hello World!"
#It's important to note that a CMD instruction can be overridden by providing a command at the end of the docker run command.

#33. Rebuilds with Cache:
#Como ya sabemos hacia este punto, de cada instrucción del Dockerfile tenemos una nueva imagen.
#FROM alpine -> tenemos una Alpine image.
#RUN ... -> tenemos una temporary image <containerId>
#CMD ... -> tenemos una temporary image <containerId>. 
#En cada paso tenemos una temporary image con un FS Snapshot y un StartUp Command.
#Supongamos que agregamos una nueva dependencia, además de redis, llamada gcc. En este caso, vamos a tener una Temporary Image adicional que tiene el FS Snapshot
#Alpine + Redis + Gcc. 

#[+] Building 9.7s (8/8) FINISHED
# => [internal] load build definition from Dockerfile                       0.1s 
# => => transferring dockerfile: 9.79kB                                     0.0s 
# => [internal] load .dockerignore                                          0.1s 
# => => transferring context: 2B                                            0.0s 
# => [internal] load metadata for docker.io/library/alpine:latest           2.3s 
# => [auth] library/alpine:pull token for registry-1.docker.io              0.0s 
# => [1/3] FROM docker.io/library/alpine@sha256:f271e74b17ced29b915d351685  0.0s 
# => CACHED [2/3] RUN apk add --update redis                                0.0s 
# => [3/3] RUN apk add --update gcc                                         6.7s 
# => exporting to image                                                     0.6s 
# => => exporting layers                                                    0.6s 
# => => writing image sha256:4dfec74f5c16b8d85b912e15b3daf547482fc01696c9e  0.0s

#Logs explained by ChatGPT:
#The logs are showing the progress and details of building a Docker image using a Dockerfile.
#Each line in the logs represents a step in the build process, and the time in seconds it took to complete that step.
#The first line states that the build process has finished and took 9.7 seconds in total.
#The second line states that the build process is loading the build definition from the Dockerfile, which took 0.1 seconds
#The third line states that the build process is transferring the Dockerfile to the build context, which took 9.79 kB of data and 0.0 seconds.
#The fourth line states that the build process is loading the .dockerignore file, which took 0.1 seconds.
#The fifth line states that the build process is transferring the build context, which took 2 bytes of data and 0.0 seconds.
#The sixth line states that the build process is loading metadata for the base image which is docker.io/library/alpine:latest and it took 2.3 seconds.
#The seventh line states that the build process is performing an authentication step to pull the base image from the Docker registry, which took 0.0 seconds.
#The eight line states that the build process is starting the first step of the build process which is pulling the base image from the Docker registry, which took 0.0 seconds.
#The ninth line states that the second step of the build process is being cached, which is running the command apk add --update redis and it took 0.0 seconds.
#The tenth line states that the third step of the build process is running the command apk add --update gcc which took 6.7 seconds.
#The eleventh line states that the build process is exporting the image, which took 0.6 seconds
#The twelfth line states that the build process is writing the image to the local machine, which has sha256:4dfec74f5c16b8d85b912e15b3daf547482fc01696c9e and it took 0.0 seconds.
#It's worth noting that CACHED on the 9th line means that this step has already been executed and the image layer from it already exist, so no need to execute it again, 
#this speeds up the build process.

#Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them

#Notemos algunas cosas interesantes de este nuevo output. Notar que no vemos algunos de los pasos de fetching que vimos en el build anterior.
#Esto dado que ya tenemos la imagen en el Local Image Cache. 
#Pero, notar además, que durante el paso de RUN apk add --update redis, no vemos todo el output del build anterior. No vemos fetch, no vemos instalación de dependencias,
#En vez de eso, vemos un único paso que dice CACHED [2/3]. Esto significa que Docker se dio cuenta que, del paso anterior, nada cambió de la vez pasada que runneamos
#Docker build. 
#Estas imágenes intermedias se van guardando en el Local Cache. 
#Pero, luego de ese paso vemos que se agrega un nuevo comando: RUN apk add --update gcc, y entonces Docker decide no seguir utilizando las imágenes del Local Image Cache.
#Entonces, de allí en adelante seguimos en el proceso de generar un Container y correr comandos dentro del mismo y sacar los snapshots y hacer todo eso sin el cache.

#[+] Building 2.2s (8/8) FINISHED
# => [internal] load build definition from Dockerfile                       0.0s 
# => => transferring dockerfile: 11.88kB                                    0.0s 
# => [internal] load .dockerignore                                          0.1s 
# => => transferring context: 2B                                            0.0s 
# => [internal] load metadata for docker.io/library/alpine:latest           2.1s 
# => [auth] library/alpine:pull token for registry-1.docker.io              0.0s 
# => [1/3] FROM docker.io/library/alpine@sha256:f271e74b17ced29b915d351685  0.0s 
# => CACHED [2/3] RUN apk add --update redis                                0.0s 
# => CACHED [3/3] RUN apk add --update gcc                                  0.0s 
# => exporting to image                                                     0.0s 
# => => exporting layers                                                    0.0s 
# => => writing image sha256:4dfec74f5c16b8d85b912e15b3daf547482fc01696c9e  0.0s

#En este caso vemos que se utiliza absolutamente todo del Local Cache.

#Si cambio el orden de operaciones, por ejemplo, RUN gcc image antes que la de Redis, dado que cambia el orden de operaciones,
#Tiene que correr todo el proceso denuevo sin poder usar el Cache.

#Conclusión importante! Siempre que queremos realizar cambios en nuestro Dockerfile, conviene ponerlos lo más abajo de todo posible. Esto para que se aproveche
#El cacheo lo máximo posible. 

#34. Tagging an Image
#Hacia este punto tenemos la posibilidad de crear una nueva Imagen de nuestro Dockerfile. Lo hacemos con Docker build .
#Luego, para crear un container con el id (output de la creación de la imagen) -> Docker run <containerId>
#Podemos ponerle un tag a la imagen que estamos buildeando, cambiando el Docker build command. 
#Docker build -t <tagName>:latest. 
#Convención en los nombres de las imágenes: yourDockerId/repoOrProjectName:latest (el latest es la versión).
#En mi caso sería: docker build -t lasantoneta/redis-server:latest .
#Siempre al final tengo que poner el ".". Es el source de todos los files y folders que vamos a estar usando.
#Técnicamente el tag de la imagen es el ":<version>" -> ej: ":latest". A este proceso se lo llama "taggear la imagen". 
#Todo el resto, que no es el ":<version>" es el repository name -> dockerHubUsername/repoOrProjectName.

#36. Manual Image Generation with Docker Commit
#Proceso de generación de imagen en pasos.
#Tomamos la imagen temporaria construida en el paso anterior, creamos un container con ella, realizamos cierta modificación a ese container, 
#Y luego, creamos una imagen de ese running container temporario. 
#Hacia este punto, sabemos bastante bien que utilizamos imágenes para crear containers, pero... Basado en lo que vimos en esta sección,
#Parece que lo opuesto también se cumple: desde un container podemos crear una imagen. Esto es cierto.
#Nosotros manualmente podemos: crear un container, correr determinados comandos adentro de él o cambiar su FS y luego generar una imagen
#que podamos utilizar en algún punto en el futuro. 
#Es decir, podemos hacer MANUALMENTE lo mismo que hace el Dockerfile: crear un container, correr determinado comando (ej -> apk add --update redis).
#Y luego generar una imagen de ese running container.
#Vamos a tratar de emular el Dockerfile de arriba.
#You can manually generate an image out of a running container by using the docker commit command. The basic syntax for the command is:
#docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
#CONTAINER is the ID or name of the running container from which you want to create the image.
#REPOSITORY is the name of the repository to which you want to save the image (e.g., "myimage").
#TAG is the tag for the image (e.g., "latest").
#For example, if you have a running container with ID "abc123" and you want to create an image called "myimage" with the tag "latest", you would use the following command:

#docker commit -c='CMD ["node", "server.js"]' abc123 myimage:latest

#You can also add the -a (--author) flag to specify the author of the image or -m (--message) flag to specify the commit message.
#This command will create a new image with the same file system changes and configurations made to the container, 
#it's like emulating a Dockerfile in a way that you are building an image out of a running container.
#Please be aware that this command will not include the history of the image, and only the current state of the container will be included in the image.

#Recordemos que -it es para inicializar un shell en el container:
#The -it flag is used in the docker run command to start a container in interactive mode with a TTY.
#The -i flag stands for --interactive which keeps stdin open even if not attached, this flag 
#is useful when you want to run a container in interactive mode, which means you will be able to interact with the container by typing commands into the terminal.
#The -t flag stands for --tty which allocates a pseudo-TTY, this flag is useful when you want to run a container in a way that emulates a terminal.
#This means that the terminal output will be properly formatted and you will be able to see the results of your commands as you type them.

#When combined -it flag allows you to run a container in interactive mode with a TTY, 
#this means that you will be able to interact with the container and see the results of your commands in real-time.

#For example, if you want to start a container running a bash shell and interact with it you can run the command:
#docker run -it --name my_container ubuntu:20.04 bash

#This will start the container, and drop you into a bash shell inside the container where you can run commands and interact with the container.

#--name flag:
#The --name flag in the docker run command is used to specify a name for a new container.
#When you run a container without specifying a name, Docker will automatically assign a random name to the container. 
#By using the --name flag, you can specify a custom name for the container, making it easier to identify and manage.

#docker run --name my-container ubuntu:20.04

#This command will start a new container based on the "ubuntu:20.04" image and name it "my-container".
#After you have named a container, you can use that name to reference the container in other Docker commands, such as docker start, docker stop, and docker logs.
#You can also use the docker ps command with the -a option to see all running and stopped containers and check the container name.

#It's important to note that if a container with the same name already exists, docker will return an error and 
#you will need to choose a different name or use the --force-recreate flag to recreate the container with the same name.

#Volvemos a la teoría:
#Para replicar el Dockerfile de forma manual utilizando comandos de Docker:
#1. docker run -it alpine sh
#Logs:
#Unable to find image 'alpine:latest' locally
#latest: Pulling from library/alpine
#8921db27df28: Already exists
#Digest: sha256:f271e74b17ced29b915d351685fd4644785c6d1559dd1f2d4189a5e851ef753a
#Status: Downloaded newer image for alpine:latest

#2. apk add --update redis (en la shell - sh - unix like - Alpine Linux distribution):
#fetch https://dl-cdn.alpinelinux.org/alpine/v3.17/main/x86_64/APKINDEX.tar.gz
#fetch https://dl-cdn.alpinelinux.org/alpine/v3.17/community/x86_64/APKINDEX.tar.gz
#(1/1) Installing redis (7.0.7-r0)
#Executing redis-7.0.7-r0.pre-install
#Executing redis-7.0.7-r0.post-install
#Executing busybox-1.35.0-r29.trigger
#OK: 10 MiB in 16 packages

#What is Alpine?
#Alpine Linux is a lightweight, security-oriented, and resource-efficient Linux distribution that is popular for use as the base image for Docker containers.
#Alpine Linux is based on the musl libc and busybox, making it a small image size of typically around 5MB.
#An Alpine Linux image in Docker is a minimal image that is based on the Alpine Linux distribution.
#It is designed to be small, lightweight, and easy to use. Alpine Linux images are particularly useful when you need to run a container that requires minimal resources
#and in many cases, it's the go-to choice for base images of other images.

#The Alpine Linux image is available on the official Docker Hub repository, and you can download it by running the command:
#docker pull alpine

#The Alpine Linux image can be used as the base image for building other images, it's often used to create minimal images for running microservices
#command-line tools, or other lightweight applications.

#You can also use the Alpine Linux image to run a shell in the container like this:

#docker run -it --name my-alpine-container alpine sh

#What is sh in Docker?
#In Docker, sh stands for the Bourne shell, which is a command-line interpreter that is used in many Unix-like operating systems.
#The Bourne shell is the default shell for the Alpine Linux distribution, which is frequently used as a base image for Docker containers.

#When you run a command like docker run -it alpine sh, you are starting a new container based on the "alpine" image and running the "sh" command inside the container.
#This will give you an interactive shell prompt inside the container, where you can run commands and interact with the container.

#The sh shell is similar to other shells like bash, but it is smaller and more lightweight.
#This makes it a good choice for running in small, resource-constrained environments like a Docker container.

#You can also use sh to run a script or command inside a container for example:

#docker run -it --name my-alpine-container alpine sh -c "echo hello world"
#This command will start a new container based on the "alpine" image, it will run the command "echo hello world" inside the container using sh shell, 
#and the output "hello world" will be shown on the screen.
#In summary, sh is a command-line interpreter that is used to run commands and interact with a Docker container based on the Alpine Linux distribution.

#What is the difference between sh and bash?
#sh (Bourne shell) and bash (Bourne-Again shell) are both Unix-like command-line interpreters, but they have some differences:
#sh is the original Unix shell that was developed in the 1970s.
#It is the default shell for many Unix-like operating systems including Alpine Linux, which is often used as a base image for Docker containers.
#sh is small and lightweight, making it a good choice for resource-constrained environments.
#bash is a more recent shell that was developed in the late 1980s as a free software replacement for the Bourne shell.
#It is an enhanced version of the Bourne shell, which is compatible with sh but includes many additional features such as command line editing
#command history, and more advanced scripting capabilities. It is the default shell for most Linux distributions and macOS.
#sh syntax and command are slightly different than bash, for example, sh uses ;; to end case statement while bash uses ;;;
#bash has more built-in commands and features than sh, for example, bash has the for loop which sh doesn't.
#bash supports more advanced scripting features such as arrays, associative arrays, and regular expressions, which sh does not.
#In summary, while sh and bash are both command-line interpreters, bash is more feature-rich and better suited for 
#more advanced scripting tasks, while sh is smaller and more lightweight, making it a good choice for resource-constrained environments like a Docker container.

#What are the most common command line interpreters in Windows?
#The most common command line interpreters in Windows are:
#Command Prompt (cmd.exe): This is the default command-line interpreter in Windows. 
#It is based on the Microsoft Disk Operating System (MS-DOS) and is used to run commands and execute scripts on Windows.
#Windows PowerShell (powershell.exe): This is a more advanced command-line interpreter that is built on top of the .NET framework.
#It is designed to provide a more powerful and flexible scripting environment than the Command Prompt.
#It is the recommended command-line interpreter for advanced users and system administrators.
#Windows Subsystem for Linux (WSL) : This is a compatibility layer for running Linux binary executables natively on Windows.
#It allows you to run Linux command-line tools and utilities on Windows, including popular shells like bash, zsh and more.
#Git Bash: Git Bash is a command-line interface for Git on Windows. It is based on the Unix-like environment and provides a Unix-like shell and command-line interface.

#What are Unix Like environments?
#A Unix-like environment is a type of operating system that is modeled after the Unix operating system, which was developed in the 1970s at Bell Labs
#Unix-like environments are characterized by their use of a command-line interface (CLI) and a hierarchical file system.
#Some of the common features of Unix-like environments include:
#A CLI for running commands and executing scripts.
#A hierarchical file system that organizes files and directories in a tree structure.
#Support for multiple users and permissions.
#Support for multiple processes running concurrently.
#Support for pipes and redirection, which allows the output of one command to be used as the input for another command.
#Some examples of popular Unix-like operating systems include:
#Linux: Linux is a free and open-source operating system that is widely used on servers, desktops, and mobile devices.
#macOS: macOS is the operating system used on Apple's Macintosh computers.
#BSD: BSD is a family of open-source operating systems based on the Berkeley Software Distribution (BSD) version of Unix.
#Solaris: Solaris is a proprietary operating system developed by Oracle.
#Unix-like environments are widely used in the industry for servers, supercomputers and embedded systems, due to their stability, security, and flexibility
#They also provide a rich set of command-line tools, utilities and scripts that allow for automation and efficient system management.

#Is windows a Unix Like environment?
#Windows is not a Unix-like environment, it is a proprietary operating system developed by Microsoft.
# While Windows shares some similarities with Unix-like operating systems, such as support for multiple users and a hierarchical file system
# it also has significant differences in terms of architecture, file system, and command-line interface.
#The main differences between Windows and Unix-like environments are:
#Windows uses a proprietary file system (NTFS) while Unix-like environments use a variety of file systems, 
#most commonly the hierarchical file system (HFS+) on macOS and the ext file system on Linux.
#Windows uses a different set of commands and utilities than Unix-like environments
#The Windows command prompt (cmd.exe) uses a different syntax and set of commands than the Unix shells like bash, zsh and csh.
#Windows has a graphical user interface (GUI) as the primary means of interacting with the operating system, 
#while Unix-like environments primarily use a command-line interface (CLI).
#Windows has a different way to manage processes, services and drivers than Unix-like environments, which rely on systemd, launchd or init.
#However, Windows now offers Windows Subsystem for Linux (WSL) which allows running Linux binary executables natively on Windows
#and offers the ability to run Linux command-line tools and utilities on Windows, including popular shells like bash, zsh and more.
#In summary, Windows is not a Unix-like environment, it has its own architecture, file system, and command-line interface
#but Windows now offers a Unix-like environment through WSL that allows you to run Linux command-line tools and utilities on Windows.

#What is the difference between zsh and bash?
#zsh (Z shell) and bash (Bourne-Again shell) are both Unix-like command-line interpreters, but they have some differences:
#zsh is an advanced shell that is built on top of the Bourne shell (sh), it is compatible with bash and includes
#many additional features such as improved command line editing, globbing, and more advanced scripting capabilities.
#It is considered by some to be more user-friendly and has a more interactive interface than bash.
#zsh has a lot more options for customization than bash, for example it has more advanced auto-completion capabilities and more powerful plugins.
#zsh also has better support for themes and custom prompts, allowing you to customize the look and feel of your command line environment.
#zsh has some built-in commands that are not available in bash, for example zsh has the vcs_info command which provides version control information for the current directory.
#zsh also has better support for handling different types of characters like emojis and Unicode characters.
#bash is considered to be more stable and widely used in production environments, while zsh is more popular among developers and power users.
#In summary, while zsh and bash are both command-line interpreters, zsh is more feature-rich and better suited for more advanced scripting tasks,
#interactive use and customization, while bash is more widely adopted, stable and reliable, making it a good choice for production environments.

#What is apk in Alpine?
#apk (Alpine Linux package manager) is the package manager for the Alpine Linux distribution.
#It is used to install, update, and remove software packages on an Alpine Linux system.
#apk is similar to other package managers such as apt or yum, but it is designed to be lightweight and efficient
#making it well-suited for use in resource-constrained environments such as embedded systems or Docker containers.
#apk is a command line tool that you can use to manage packages on an Alpine Linux system. Some common apk commands include:

#apk add: used to install one or more packages.
#apk del: used to remove one or more packages.
#apk update: used to update the package index and upgrade installed packages.
#apk info: used to display information about a specific package.
#apk search: used to search for packages in the package index.
#apk can also be used to build and manage custom package repositories, this allows you to create, distribute and manage your own set of packages.
#In summary, apk is the package manager for the Alpine Linux distribution, it is designed to be lightweight 
#and efficient and it is used to install, update, and remove software packages on an Alpine Linux system.

#What is --update flag in apk?
#The --update flag in the apk command is used to update the package index and upgrade installed packages.
#When you run the command apk update, it will check for updates to the package index and any installed packages, 
#and it will download and install the updated versions if available.

#apk update

#This command will update the package index and check for updates to all installed packages.
#You can also use apk update command with --no-cache flag to update the package index and installed packages without keeping the downloaded package in the cache.

#apk update --no-cache

#This command will update the package index and check for updates to all installed packages and it will not keep the downloaded packages in the cache.

#It's important to note that running apk update command regularly is a good practice in order to keep your system up to date with the latest security patches and bug fixes.

#In summary, the --update flag in the apk command is used to update the package index and upgrade installed packages
#it checks for updates to all installed packages and it downloads and installs the updated versions if available. Running `apk

#Paso 3: tenemos el running container. Vamos a abrir una segunda terminal y vamos a correr un nuevo comando usando Docker Cli que tome un Snapshot
#Del running Container y le asigne un default command a él y genere una imagen de todo.
#Para hacer esto, primero corremos docker ps.

#What is docker ps command in docker? 
#The docker ps command is used to list the running containers on a host machine. When you run the docker 
#ps command, it will display information about the containers that are currently running, including the container ID, image, command, created time, status, and ports.
#For example, if you run the command docker ps, it will show you the list of running containers and their information like this:

#CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS               NAMES
#b5f2e5c2b8e5        ubuntu:20.04        "bash"                   5 minutes ago       Up 5 minutes                            my-container

#You can also use different options to customize the output of the docker ps command, for example:

#-a or --all to show all containers, including the stopped ones
#-q or --quiet to display only the container IDs
#-l or --latest to show the last created container
#-n or --last to show n last created containers

#For example, if you want to see all containers including the stopped ones, you can run:

#docker ps -a

#In summary, docker ps command is used to list the running containers on a host machine, it shows the container ID, image, 
#command, created time, status and ports. You can use different options to customize the output of the command and show more information about the containers.

#Paso 4: docker commit -c (el -c nos permite establecer el default command).
#docker commit -c 'CMD ["redis-server"]' ece2fba79721

#$ docker commit -c 'CMD ["redis-server"]' ece2fba79721
#sha256:38c2a4b4975956f844bf28d55fc3c8af55816ab134c9cf49e6ef5b0223f7efeb

#El output es el id de la nueva imagen que customizamos para nuestros usos personales. 

#What does docker commit -c ?
#The docker commit command creates a new image from a container's changes.
#The -c option allows you to add a commit message to the image, which can be useful for documenting changes made to the container.
#For example, you might use docker commit -c "Added new software" my_container my_image to create a new image called "my_image" 
#from the changes made to the container "my_container", with the commit message "Added new software".

#--change , -c		Apply Dockerfile instruction to the created image





