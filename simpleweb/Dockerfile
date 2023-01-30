FROM node:14-alpine

WORKDIR /usr/app

COPY ./package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]

#THEORY:
#En el CMD instruction, todos los comandos que se ejecutan van separados por [command 1, command 2, ...]
#Explain me this error when trying to run Docker build:

# > [2/2] RUN yarn:
#5 0.382 /bin/sh: yarn: not found

#This error message is indicating that the "yarn" command is not found when the Docker build is trying to run it.
#This could be because yarn is not installed in the image that is being used for the build, or it could be because the command is being run in the wrong location 
#and the yarn executable is not in the system's PATH.
# To fix this issue, you should ensure that yarn is installed in the image and that it is in the system's PATH when the command is being run. 
#You can also try to run 'which yarn' to check if yarn is installed in your image.

#What is which yarn command?
#The which command is a Linux and Unix command that tells you the location of a given executable command.
#It searches through the directories listed in the PATH environment variable for the executable file that would be run if you typed the command.
#When you run which yarn, the command will return the path of the yarn executable, if it is installed in the system.
#If yarn is not installed, or it is not in the system's PATH, the command will return nothing or 'yarn not found'.
#It can be used to check if a command is installed in the system and to find out the location of the installed command.

#What is /usr/bin/ folder in WSL?
#The /usr/bin/ folder in WSL (Windows Subsystem for Linux) is a directory that contains executable files for many of the Linux command-line utilities and programs.
#On a Linux system, this directory is typically one of the directories listed in the PATH environment variable
#which means that when you type a command in the terminal, the system will search this directory (and other directories listed in PATH) for an executable file with that name.
#Commands like ls, cd, mkdir, grep, apt-get and many others are located in the /usr/bin/ directory.
#The folder contain a lot of executables that are available in the Linux system and can be used by the user.

#What is PATH environment variable in Linux?
#In Linux and other Unix-based operating systems, the PATH environment variable is a list of directories that the system will search for executable files
#when a command is entered in the terminal.
#When you type a command in the terminal, the system will look for an executable file with that name in each of the directories listed in the PATH environment variable, 
#in the order that they are listed.
#The directories in the PATH variable are separated by a colon (:) character. For example, a typical PATH variable might look like this:

#/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/sbin

#This means that when you enter a command in the terminal, the system will first look in /usr/local/bin, then /usr/bin, then /bin, and so on.

#The directories included in the PATH variable are system-wide, meaning they apply to all users on the system
#In addition, each user can have their own PATH variable, which is stored in their shell profile file such as .bashrc or .bash_profile
#this allows users to add directories that are specific to their own use.

#In summary, the PATH environment variable is a list of directories that the system searches in order for the executable 
#files of commands entered in the terminal, and can be modified to include additional directories to the search path.

#40. Base Image Issues
#Alpine, como Base Image, no tiene yarn instalado.
#Alpine es muy lightweight -> 5MB la imagen. Esto hace que tenga pocos programas instalados por default. 
#En Alpine tenemos algunos programas básicos por default de Linux, tenemos el package manager que usamos anteriormente (apk)
#Y no mucho más...
#Para solucionar el problema de que la Base Image no tenga npm instalado tenemos dos opciones:
#1. Usar una imagen diferente (alguna que tenga Node y npm preinstalados). 
#2. Seguir usando Alpine image y RUN una instrucción adicional para instalar NodeJS y npm en nuestra imagen.

#Si vamos a hub.docker.com -> login -> explore, vamos a ver un listado de imágenes populares. 
#Alpine, busybox, redis, nginx, mongo, ubuntu, node, postgres, mysql -> imágenes populares. 
#Las imágenes populares deben tener una subdescripción de oficial.

#Dentro de la full description de la imagen que quiera usar, tenemos un "Supported tags and respective Dockerfile links".
#Esa es una lista de todas las versiones disponibles para la imagen. 
#Podemos obtener diferentes versiones de NodeJS encapsuladas en cada uno de esos tags. 
#Si tenemos una App que requiere especificamente la versión de node 6.14, en la FROM instruction puedo hacer:
#FROM node:6.14.

#Uno de los tags del Node image es "alpine". Hay varios 10-alpine (número-alpine), pero hay uno que tiene alpine a secas.
#Entonces, podríamos decir node:14-alpine.
#Deberemos especificar la version node:14-alpine. Caso contrario, veré varios errores (idealTree).

#Alpine -> término en el docker world para una imagen que es lo más pequeña y compacta posible. 
#Muchos de los popular repositories van a ofrece alpine versions de sus imágenes. 
#Ej: la default node installation podría incluir programas adicionales tales como Git, determinado package manager, fancy text editting tool.
#La Alpine version de la imagen quiere decir que tenemos la versión más bare bones de la imagen. 

#41. A Few Missing Files
#Cuando estemos generando una imagen, ninguno de los files adentro de nuestro project directory están disponibles por default en el container.
#Es decir, están segmentados y no se puede asumir que los files estén disponibles a menos que lo permitamos nosotros de forma específica en nuestro Dockerfile.

#42. Copying Build Files
#COPY instruction. Uitilizada para mover files y folders de nuestro local FS en nuestra local machine al FS adentro del Temporary Container 
#Que se genera durante el build process.
#Syntax -> COPY ./ ./ -> segundo argumento (path to folder para copiar desde nuestra máquina local relativo a build context) -> tercer argumento (
# lugar para copiar adentro del Container). ./ significa current working directory. 
#En nuestro caso, el primer argumento está seteado respecto del build context, el cual es "." -> es decir, el cwd. Entonces, el ./ significa que estamos
#En el cwd (simpleweb folder).
#Haciendo ./ ./ significa que vamos a copiar todo en el cwd al Docker Temporary Container.

#Queremos asegurarnos de que el package.json esté disponible antes de correr RUN npm install. Entonces el COPY instruction irá antes.

#Dado que no queremos estar trabajando todo el tiempo con los ids de los Containers, vamos a probar taggeando el mismo.
#docker build -t lasantoneta/simpleweb .
#Notar en este caso que no le pusimos el :latest tag. Esto se debe a que si no especificamos el :latest, se presupone que es la última versión
#Por default. 

#What is COPY instruction in the Dockerfile?
#The COPY instruction in a Dockerfile is used to copy files or directories from the host machine into a container. The basic syntax is:
#COPY [source] [destination]
#source: the path of the file or directory on the host machine that you want to copy. This can be a relative or absolute path
#destination: the path where the file or directory will be copied inside the container. This must be an absolute path.

#For example, the following line in a Dockerfile would copy the file app.py from the current directory on the host machine to the /app directory inside the container:
#COPY app.py /app/

#You can also copy a directory recursively using the source argument, for example:

#COPY my_folder /destination/

#This will copy all the files and subdirectories inside the my_folder to /destination/ in the container.
#It's important to note that the COPY instruction is executed during the build time, when the image is being built, so the files 
#will be available within the image and will be there when the container is run.
#This is different from the ADD instruction that could also fetch files from a remote location like an URL.

#What does it mean to copy a directory recursively in Computer Science?
#In computer science, copying a directory recursively means to copy the directory and all of its contents, including any subdirectories and their contents, and so on.
#The process continues until all files and subdirectories within the directory have been copied.
#A recursive copy process will create an exact copy of the original directory and its contents, with the same file and directory structure, and with 
#all files containing the same data.
#This is often used to create backups, or to move a directory and all of its contents to a new location.
#This can be done by using the -r or --recursive option in the command line when using a program such as cp (on Linux and macOS) or xcopy (on Windows) to copy the directory.
#In a Dockerfile, the COPY instruction can be used recursively by adding -r flag.
#COPY -r <src> <dest>

#What is the difference between an absolute path and a relative path?
#In general, a path is used to refer to a specific file or directory on a computer's file system.
#An absolute path is a path that starts from the root directory and includes the full path to a file or directory.
#For example, on Linux and Unix systems, an absolute path would begin with /, while on Windows systems, an absolute path would begin with a drive letter, such as C:\
#Because the path starts from the root directory, it is the same no matter where you are in the file system.
#A relative path, on the other hand, is a path that is relative to the current directory.
#It does not include the full path from the root directory, and only includes the path from the current directory to the file or directory.
#For example, if you are in the directory /home/user/documents and you want to refer to the file report.txt in the same directory, 
#you would use the relative path report.txt instead of the absolute path /home/user/documents/report.txt.
#It is important to note that when specifying a path in a programming context, like Dockerfiles, it depends on the context and the command, 
#for example a COPY command in a Dockerfile expects an absolute path for the destination, but the source can be relative to the build context.

#43. Container Port Mapping
#Cuando intentamos ir a localhost:8080, no vemos ningún output. Por qué?
#Nuestro Browser está intentando hacer una request a localhost:8080. Esta es una referencia a nuestra local computadora en el port 8080.
#Por default, ningún tráfico que venga a nuestra computadora, o a nuestro localhost:8080 será routeado a un Container.
#Es decir, el Container tendrá su set aislado de puertos que podrán recibir tráfico. Pero por default, ningún tráfico que llega a nuestra computadora
#Será dirigido a nuesto Container. 

#Para asegurarnos que cualquier request que venga de nuestra computadora/outside computadora se rediriga al Container tenemos que especificar un
#Explicit Port Mapping. 

#El port mappign nos dice -> cada vez que se haga un request en nuestra computadora local, tomar ese puerto y mapearlo a un determinado puerto en el
#Container.
#Es decir: si alguien hace una request al localhost:8080, tomar esa request y automáticamente forwardearla al puerto 8080 del Container.
#Dentro de ese puerto en el Container, la Node App puede recibir esa request, procesarla y responder. 

#Todo esto mencionado aplica para INCOMING REQUESTS. Por default, el Docker Container puede hacer requests al outside world. 
#Esto lo hicimos cada vez que instalamos una dependencia 
#Ej: cuando runneamos npm install, Docker corre la request al outside world. 
#No tenemos limitación para hacer requests al outside world. Es solo una limitación para hacer requests al Docker Container.

#El Port Forwarding no se realiza en el Dockerfile. 
#El Port Forward Mapping es una runtime constraint. Es decir, algo que cambiamos cuando runneamos el Container (o Starteamos el Container).

#Para comenzar el Docker container con port mapping, tenemos que runnearlo con la -p flag. 

#El comando que utilizamos para hacer el Port Mapping es:
#docker run -p 8080:8080 santoneta/simpleweb:latest
#Primer puerto -> routear las requests que vayan a ese puerto en nuestra local machine.
#Segundo puerto -> hacia este puerto adentro del Container.
#santoneta/simpleweb:latest -> <imageName>.

#No es necesario que ambos puertos sean idénticos. Ej: 5000:8080 puede hacer un mapping válido también.
#docker run -p 5000:8080 lasantoneta/simpleweb:latest -> esto es válido. Yendo a localhost:5000 tendremos el mismo resultado que antes.
#La app está escuchando en el puerto 8080, pero del Docker Container. Entonces, cuando hacemos una request al localhost:5000, eso se mappea
#Al pueto 8080 de Docker.

#El web server application siempre deberá escuchar al puerto que mapea en el Docker.

#Hi Chat, what is Port Mapping in Docker?
#In Docker, port mapping allows you to access a container's network ports from the host machine.
#This means that you can connect to a service running inside a container on a specific port, and that 
#connection will be forwarded to the corresponding port on the host machine.
#This allows you to run multiple containers on the same host machine, each with their own network ports, without them conflicting with one another.
#You can specify port mapping when you start a container using the -p or --publish option, followed by the host port and container port, separated by a colon.
#For example, docker run -p 8080:80 mycontainer would map port 80 in the container to port 8080 on the host machine.

#What is -p in docker run command?
#In the docker run command, the -p option is used to map a host machine's port to a container's port. This allows the host machine to access the container's service 
#through the specified port. The format for the -p option is -p host_port:container_port, where host_port is the port number on the host machine and container_port 
#is the port number on the container.

#44. Specifying a Working Directory
#Vamos a startear el Container con una shell, para poder hacer un poco de debugging adentro de él. 
#Podemos inicializar shells adentro de la mayoría de Alpine based containers -> docker run -it lasantoneta/simpleweb:latest sh
#En este caso, recordemos que estamos haciendo un override del default startup command, es decir, npm start.
#En este caso notar que no estamos especificando un port mapping.
#Esto dado que no vamos a startupear el server, solo quiero tener la chance de ver los files y los folders del Container.
#Cuando hicimos la COPY instruction, notar que copiamos todos los files del simpleweb folder en el root directory del Container.

#No es una best practice copiar todos los files de nuestra app en el Root directory del Container.
#Si tenemos cualquier file o folder que haga conflicto con las carpetas del default system. Ej: si tenemos en nuestra web app un folder llamado
#var, root, run, lib -> lo más probable es que hagamos un override de algunos files existentes en la Alpine default instalation.

#Vamos a hacer un leve cambio en nuestro Dockerfile. En vez de copiar todos los files en nuestro Container Root Directory, 
#Vamos a copiar todos los files en un nested directory. 

#En Docker existe una instrucción específica justamente para evitar el overriding de copiar todos los files y folders en el root directory del Container.
#WORKDIR instruction.
#WORKDIR /usr/app.
#Cuando le hayamos pasado la instrucción de arriba, cualquier otra instrucción o comando que le pasemos al Dockerfile será ejecutado dentro de dicha carpeta.
#Entonces, si ponemos la WORKDIR instruction arriba de la COPY instruction, la COPY instruction se ejecutará no en el Root directory, sino en 
#el directorio que especificamos como working directory.

#Si el directorio no existe adentro del Docker Container, lo creará automáticamente para nosotros. 

#The usr folder es un espacio seguro para nuestra aplicación.

#Existen algunos Linux diehards que te van a decir que tenemos que poner nuestra App en var, algunos otros que dicen que la tenemos que poner el Home directory,
#Hay ciertos disagreements out there de dónde poner nuestra app.

#Recordemos que para startupear una shell adentro del Container, no hace falta stoppear el Container que tenemos currently running y rerunearlo overrideando el default
#Commando por sh. Sino que puedo utilizar el docker exec command para ejecutar comandos adicionales adentro del Container.

#Para ir al root directory del Alpine fs -> cd /.

#What is WORKDIR instruction in a Dockerfile?
#The WORKDIR instruction in a Dockerfile sets the working directory for any subsequent RUN, CMD, ENTRYPOINT, COPY, and ADD instructions. 
#It sets the current directory for these instructions to the specified path.
#The syntax for the WORKDIR instruction is WORKDIR /path/to/directory.
#For example, if you have a WORKDIR instruction in your Dockerfile like this WORKDIR /app, any following instructions that run executables or 
#copy files into the container will have their context set to the /app directory.
#It is worth noting that the WORKDIR instruction only affects the filesystem of the container, not the host machine.

#What is the bin directory in a Linux file system?
#The /bin directory in a Linux file system contains executable binary files that are essential for the system to boot and run.
#These are the commands that are necessary for the system to function, and are used by both the system and users.
#The /bin directory contains executable files that are used by all the users on the system. 
#Some examples of the commands that can be found in this directory include ls, cat, echo, cp, rm, mkdir, and mv
#These commands are used for basic file and directory manipulation, and are necessary for the system to function.
#It also contains some essential utilities like sh, bash, ls, cp, rm and mv etc.
#These utilities are used to interact with the system and perform common tasks like navigating the file system, creating and 
#manipulating files and directories, and running other programs.
#It should be noted that some Linux distributions use /usr/bin instead of /bin to store user's utilities.

#What is cat command in Linux?
#The cat command in Linux is a command-line utility used to concatenate and display the contents of one or more files in the terminal.
#The command takes the name of one or more files as arguments and prints their contents to the standard output (usually the terminal screen).
#The basic syntax for the cat command is as follows:
#cat [options] [file1] [file2] ...
#For example, to display the contents of a file called "file.txt", you would use the following command:
#cat file.txt
#If you want to display the contents of multiple files at once, you can list the names of the files as arguments to the command:
#cat file1.txt file2.txt file3.txt
#The cat command also has a few options that can be used to customize its behavior. For example, the -n option can be used to number the lines of output, 
#and the -b option can be used to number only non-blank lines.
#The cat command can also be used to create new files, by redirecting the output to a file, for example cat file1.txt file2.txt > newfile.txt creates 
#a new file called newfile.txt and put the content of file1 and file2 in it.
#In Linux, the cat command is a simple but useful command that is often used in combination with other commands and utilities to perform various tasks.

#What is echo command in Linux?
#The echo command in Linux is a command-line utility that is used to display a line of text or a string of characters in the terminal.
#The basic syntax of the echo command is as follows:
#It can also be used to print the value of a variable or to concatenate strings. The basic syntax for using the echo command is echo [string], 
#where [string] is the text that you want to display on the screen.

#What is the etc directory in a Linux file system?
#The /etc directory in a Linux file system contains configuration files for the system and applications.
#These files are used to configure various aspects of the system and its applications, 
#such as network settings, system-wide defaults for applications, and user account information.
#The /etc directory is where most of the system-wide configuration files are located.
#These files control various aspects of the system's operation, such as network settings, system-wide defaults for applications, and user account information.
#Some common files that can be found in this directory include passwd, shadow, group, fstab, and init.d
#For example, the /etc/passwd file contains information about the user accounts on the system, such as the username, UID, GID, home directory, and default shell.
#The /etc/shadow file contains encrypted passwords for the user accounts, and is not readable by regular users.
#The /etc/fstab file is used to configure the system's file systems and the way they are mounted at boot time.
#It also contains configuration files for services and applications like systemd, Apache, Nginx, SSH and etc.
#It's important to note that some files in the /etc directory may be modified by the system administrator to configure the system or applications in a specific way,
#and it's important to be careful when making changes to these files as an incorrect configuration can cause the system to stop working.

#What is the lib directory in a Linux file system?
#The /lib directory in a Linux file system contains libraries that are required by system executables and applications.
#Libraries are collections of pre-written code that can be used by programs to perform specific tasks, such as connecting to a network, manipulating files, or processing data.
#They are often shared across multiple programs to reduce the amount of code that needs to be written and maintained.
#The /lib directory contains libraries that are essential for the system to boot and run. 
#These libraries are used by the system and by many of the applications that run on the system.
#Some examples of libraries that can be found in this directory include libc, libm, libpthread, and libdl.
#These libraries provide basic functionality for the system, such as memory management, threading, and dynamic linking.
#It also contains libraries for specific libraries like libmysqlclient.so, libssl.so, libgmp.so and etc. These libraries 
#are used by specific programs or applications to perform certain tasks.
#It's important to note that some Linux distributions use /usr/lib instead of /lib to store libraries.
#Also, with the advent of 64-bit systems, some distributions also have /lib64 directory to store 64-bit libraries.

#What is the mnt directory in a Linux file system?
#The /mnt directory in a Linux file system is typically used as a mount point for temporarily attaching file systems
#such as external hard drives, USB drives, and other removable storage devices.
#When a device is mounted, it becomes accessible as a directory in the file system, and its files can be read, written, and manipulated like any other files on the system.
#When a device is mounted, it is typically assigned a directory in the file system under /mnt/ directory.
#For example, if you have a USB drive that you want to mount, you would typically mount it at /mnt/usbdrive/
#Once the drive is mounted, you can navigate to the directory and access the files on the drive as if they were on your local file system.
#It's also used to mount remote file systems over the network via NFS, SMB and other protocols.
#It's important to note that the /mnt directory is a convention, and it's not necessary that all distributions use this directory,
#some distributions use /media instead of /mnt to store the mounted file systems.
#It's also important to note that, in order to mount a file system, the user must have appropriate permissions, typically the root user can mount a file system.

#What is the difference between ~ and / directories in Linux?
#In Linux, the tilde (~) character is used as a shorthand to represent the home directory of the current user. For example, 
#if the current user's home directory is '/home/user', then the command 'cd ~' would change the current directory to '/home/user'.
#The forward slash (/) character is used as the directory separator in Linux
#It is used to specify the location of a file or directory in the file system hierarchy. For example, '/home/user/documents' 
#specifies the 'documents' directory located within the 'user' directory located within the 'home' directory located at the root of the file system.

#Can you explain me the concept of users in Linux? How can I check what kind of user am I and what permissions do I have?
#In Linux, a user is a person or a system that is given access to the resources of a computer.
#Each user has a unique username and password, and is assigned certain permissions that determine what actions they are allowed to perform on the system.
#here are several types of users in Linux, including:
#Regular users: These are regular users who have a home directory, a shell, and can run commands and access files as determined by their permissions.
#System users: These are users that are used by system processes and daemons, and typically have UIDs (user IDs) lower than 1000.
#Superuser (root): This is the most powerful user on the system and has complete control over the system.
#You can check what kind of user you are by running the whoami command.
#This command will print your username to the screen. To check your permissions, you can use the ls -l command to view the permissions of a file or directory
#or the id command to view your UID and group information.
#You can also check your privileges by using sudo command, which is used to execute a command as the superuser (root)
#If you are able to execute command with sudo it means that you have the privilege to execute commands with root level access.

#What is whoami command in Linux?
#The "whoami" command in Linux is a command line utility that returns the username of the current user.
#It is used to display the username of the current user logged in to the system. When executed, the command will return the username of the user who is currently running it.

#What is -l flag in ls in Linux?
#The "-l" flag, when used with the "ls" command in Linux, displays the files and directories in a long format.
#This format includes additional information about the files and directories, such as their permissions, owner, group, size, and timestamp of the last modification.
#When the "-l" option is used, the output will be arranged in multiple columns, with each file or directory taking up one line.

#What is -rw-r--r-- in the first column of the ls -l command of Linux?
#When the "ls -l" command is used in Linux, the first column of the output shows the file permissions for the listed files and directories. 
#The string "-rw-r--r--" is an example of such permissions.
#The first character (-) represents the file type (directory or file), and next nine characters represent the permissions.
#The permissions are grouped into three sets of three characters, each representing the permissions for the owner, group, and others respectively.
#The "rw-" represents the permissions for the owner, meaning the owner has read and write permissions but no execute permissions.
#The "r--" represents the permissions for the group, meaning the group has read permissions but no write or execute permissions.
#The "r--" represents the permissions for others, meaning others have read permissions but no write or execute permissions.
#So "-rw-r--r--" means that the file owner has read and write permissions, the group and others only have read permissions.

#What are the differences between owner, group and others in Linux?
#In Linux, every file and directory has an owner and a group associated with it.
#The owner and group determine who has access to the file and what level of access they have.
#The owner is the user who created the file or directory. The owner has the most privileges and can change the file's permissions, rename it or delete it.
#The group is a collection of users that share common access permissions to the file or directory.
#A user can be a member of multiple groups, but a file or directory can only belong to one group at a time.
#The group permissions are applied to all users who are members of the group that the file or directory belongs to.
#Others refers to any user who is not the owner or a member of the group associated with the file or directory. The other permissions apply to all other users on the system.
#So, in summary, the owner of a file has the most privileges, the group has less privileges and the others have the least privileges. 
#The permissions set for these three entities determine who can read, write, execute or access the file or directory.

#Can you explain all read, write, execute and access permissions in Linux? Can you teach me the basic stuff?
#In Linux, there are three types of permissions that can be set for a file or directory: read, write, and execute.
#These permissions are used to determine who can access a file or directory and what they can do with it.
#Read (r) permission allows a user to read the contents of a file or view the list of files in a directory.
#Write (w) permission allows a user to modify the contents of a file or add/remove files from a directory.
#Execute (x) permission allows a user to execute a file as a program or script, or to enter a directory and access its contents.
#These permissions can be set for three distinct entities: the owner, the group and others. 
#This means that you can set different permissions for the file owner, the group associated with the file, and all other users.
#To set or modify permissions, you can use the chmod command. The basic syntax for chmod is:
#chmod [permissions] [file or directory]
#You can use either numerical or symbolic mode to set permissions.
#Numerical mode: use numbers to represent permissions. Read permission is represented by 4, write permission is represented by 2, and execute permission is represented by 1.
#For example, to give read and write permissions to the owner and read permission to others and group you can use
#chmod 644 file.txt
#Symbolic mode: you can use characters to represent permissions. Use 'r' to represent read, 'w' to represent write, and 'x' to represent execute.
#For example, to give read, write, and execute permissions to the owner, and read and execute permissions to the group and others, you can use
#chmod 755 file.txt
#You can also use "u" for user(owner), "g" for group, "o" for others and "a" for all.
#For example, to give execute permission to owner and group and no permission to others you can use
#chmod u+x,g+x,o-rwx file.txt
#It's also worth noting that special permissions such as SUID (set user ID) and SGID (set group ID) can be set on files to 
#change the effective user and group of the process running the file.

#What are the default permissions for a file or directory in Linux, when not specified?
#In Linux, when a file or directory is created, it is assigned default permissions. The default permissions vary depending on the file system and the user creating the file.
#When a file is created, it is usually assigned read and write permissions for the owner and no permissions for others. 
#The permissions are represented in the form of rw- --- ---.
#When a directory is created, it is usually assigned read, write, and execute permissions for the owner and read and execute permissions for others. 
#The permissions are represented in the form of rwx r-x r-x.
#The default permissions can be modified using the umask command.
#The umask command sets the default file mode creation mask (umask) of a process.
#The umask is used to determine the file permission for newly created files.
#The default value of umask is 022, which means that newly created files will have permission 666 (rw-rw-rw-) and newly created directories will have permission 777 (rwxrwxrwx).
#You can change the default permissions for files and directories by changing the umask value. For example, to change the default permissions for files to 
#600 (rw- --- ---) and directories to 700 (rwx --- ---) you can use the command
#umask 077
#This sets the umask to 077, which will cause newly created files to have permission 600 (rw- --- ---) and directories 700 (rwx --- ---).

#What is sudo in Linux? Can you teach me the basic stuff?
#"sudo" is a command in Linux that allows a user to run commands with the privileges of another user, typically the root user.
#The root user is the superuser in Linux, and has full access to the system, including the ability to install software, create and delete users, and modify system settings.
#The "sudo" command is used to temporarily gain superuser privileges for a single command.
#This allows regular users to perform administrative tasks without having to log in as the root user.
#When a user runs a command with "sudo", they are prompted for their own password, and the command is executed as the root user.
#Here is the basic syntax of the "sudo" command:
#sudo [command]
#For example, to install a package using apt package manager, you can use the command
#sudo apt-get install [package-name]
#It is important to note that the use of "sudo" command should be used with caution, as it allows a user to make changes to the system 
#that can potentially cause damage or disrupt service.
#It is also worth noting that the sudo command is configured through the /etc/sudoers file. 
#This file controls who can use sudo and what commands they can run. By default, the root user and members of the "sudo" group are allowed to use the sudo command.
#Also, the sudo command by default keeps a log of all commands executed via "sudo" in the file /var/log/auth.log.

#How can I create users and give permissions to them in Linux? Can you teach me the basic stuff?
#In Linux, you can create new users and manage their permissions using the command line. 
#Here are the basic steps to create a new user and set permissions:
#Use the "adduser" or "useradd" command to create a new user. The basic syntax for these commands is:
#adduser [username]
#useradd [username]
#Set a password for the new user using the "passwd" command. The basic syntax for this command is:
#passwd [username]
#Assign the user to a group using the "usermod" command. The basic syntax for this command is:
#usermod -a -G [groupname] [username]
#This will add the user to the specified group and allow them to share the group's permissions.
#To set permissions for a specific user or group, use the "chmod" command. The basic syntax for this command is:
#chmod [permissions] [file or directory]
#You can use either numerical or symbolic mode to set permissions.
#For example, to give read and write permissions to the user and read permission to the group, you can use
#chmod u+rw,g+r,o-rwx file.txt
#To set permissions for a specific directory, you can use "chown" command to change the ownership of a file or directory. The basic syntax for this command is:
#chown [user]:[group] [file or directory]
#For example, to change the ownership of a file to user1 and group1 you can use
#chown user1:group1 file.txt
#It's worth noting that, you need to have root privilege to create users, set passwords and change ownership of files. 
#You can use "sudo" command to execute the above commands as root user.

#How can I list all the users in a Linux installation? How can I remove users? Can you teach me the basic stuff?
#In Linux, you can list all users and remove users using the command line. Here are the basic steps to list and remove users:
#To list all users in a Linux installation, you can use the command "cat /etc/passwd" . This command will display the content of the /etc/passwd file, 
#which contains information about all users on the system, including the username, user ID (UID), group ID (GID), and home directory.
#To list all users that are currently logged in, you can use the command "who" or "w" . 
#This command will display the username, terminal, and login time for all currently logged-in users.
#To remove a user, you can use the "userdel" command. The basic syntax for this command is:
#userdel [username]
#You can also use the "deluser" command which is similar to userdel.
#It's worth noting that by default, this command will not remove the user's home directory or mail spool. To remove these as well, you can use the -r option.
#userdel -r [username]
#To delete a user's home directory and mail spool you can use the command "rm -r /home/[username]"
#It's worth noting that, you need to have root privilege to remove users, delete home directory and mail spool. 
#You can use "sudo" command to execute the above commands as root user.
#It is also important to note that, when you delete a user, it will not delete the files owned by that user, you need to take care of them separately
#Also, be cautious when deleting users, as it can cause data loss or break dependencies if the user or the files owned by that 
#user are being used by other system services or applications.

#Can you explain me what root:x:0:0:root:/root:/bin/bash means when listing all the users in /etc/passwd file in Linux?
#In Linux, the /etc/passwd file contains information about all users on the system.
#Each line in the file represents a single user, and the fields are separated by colons (:).
#When you use the command "cat /etc/passwd" it will show you the content of the file and each line will have the following format:
#username:password:user_id:group_id:user_info:home_directory:shell
#When you look at the line "root:x:0:0:root:/root:/bin/bash", it means:
#"root" is the username of the user. This is the name that is used to log in to the system.
#"x" is the password field. In most Linux distributions, the password is stored in a separate file called /etc/shadow, 
#and the /etc/passwd file has an "x" in this field to indicate that.
#"0" is the user ID (UID). This is a unique number that identifies the user. UID 0 is reserved for the superuser or root account.
#"0" is the group ID (GID). This is a unique number that identifies the user's primary group. GID 0 is usually reserved for the root group.
#"root" is the user information field. It contains information about the user, such as their full name and contact information.
#"/root" is the home directory. This is the directory that the user is placed in when they log in to the system.
#"/bin/bash" is the shell. This is the program that is used to interpret the user's commands. /bin/bash is the default shell for most Linux distributions.
#So "root:x:0:0:root:/root:/bin/bash" means that the root user has UID 0, GID 0, user information is root, home directory is /root and the default shell is /bin/bash.

#Can you explain me what root:*:19054:0:99999:7::: means when reading the content in the /etc/shadow file in Linux?
#In Linux, the /etc/shadow file contains information about the passwords of all users on the system.
#Each line in the file represents a single user, and the fields are separated by colons (:).
#When you use the command "cat /etc/shadow" it will show you the content of the file and each line will have the following format:
#username:password:lastchange:min:max:warn:inactive:expire:reserved
#When you look at the line "root:*:19054:0:99999:7:::", it means:
#"root" is the username of the user. This is the name that is used to log in to the system.
#"*" is the password field. The password is stored as a hash, and the * means that the password is locked and cannot be used.
#"19054" is the date of the last password change, represented as the number of days since January 1, 1970.
#"0" is the minimum number of days required between password changes.
#"99999" is the maximum number of days for which the password is valid.
#"7" is the number of days of warning before the password expires.
#":" is the number of days after the password expires that the account is disabled.
#":" is the number of days since January 1, 1970 when the account will be permanently disabled.
#":" is a reserved field.
#So "root:*:19054:0:99999:7:::" means that the root user's password is locked and the last time it was changed was on the date 
#that is represented by 19054 days since January 1, 1970. And the account never expires.
#It's worth noting that the /etc/shadow file is readable only by the root user, this is to ensure that only authorized users can access 
#the password hashes and prevent them from being used in a brute-force attack.

#Can you show me how can I see a list of the users that can execute a command with sudo in a Linux installation? Can you teach me the basic stuff?
#In Linux, you can see a list of users that are allowed to execute a command with "sudo" by checking the /etc/sudoers file.
#This file controls who can use "sudo" and what commands they can run.
#Here are the basic steps to see the list of users that are allowed to execute a command with "sudo":
#Open the /etc/sudoers file using a text editor. You can use the command "sudo nano /etc/sudoers" or "sudo visudo" to open the file.
#Look for a line that starts with "User_Alias" or "User alias" and has a list of users. For example:
#User_Alias ADMINS = user1, user2, user3
#This line defines an alias named "ADMINS" that contains the users user1, user2, and user3. These users are allowed to execute commands with "sudo"
#Look for lines that start with "sudo" and have the keyword "ALL" or an alias name like "ADMINS"
#%ADMINS  ALL=(ALL)       ALL
#This line means that the users in the "ADMINS" alias can run any command as any user.
#You can also use the command "sudo -l" as a user, it will show you the user's permissions.
#sudo -l
#It's worth noting that, you need to have root privilege to edit the /etc/sudoers file. Also, be cautious when modifying the /etc/sudo

#Can you explain me the output of running the command sudo -l? Can you teach me the basic stuff?
#The "sudo -l" command is used to list the commands that a user is allowed to run with "sudo"
#When you run this command, it will display information about the user's "sudo" privileges, including the commands that the user 
#is allowed to run, the users and groups that the user is allowed to run the commands as, and any restrictions on the user's "sudo" privileges.
#The basic output format of the "sudo -l" command is:
#User [username] may run the following commands on [host]:
#    (user)  command
#    (user)  command
#    ...
#"User [username]" is the username of the user that is running the command.
#"may run the following commands on [host]:" indicates that the user is allowed to run the listed commands on the specified host.
#"(user)" is the user that the user is allowed to run the command as. If the command can be run as any user, "ALL" will be displayed instead.
#"command" is the command that the user is allowed to run with "sudo".
#Here is an example of the output of the "sudo -l" command:
#User janedoe may run the following commands on host1:
#    (root) /usr/bin/apt-get
#    (root) /usr/bin/aptitude
#    (root) /usr/bin/dpkg

#This output means that the user "janedoe" can run the commands "/usr/bin/apt-get", "/usr/bin/aptitude", and "/usr/bin/dpkg" as the user "root" on the host "host1".
#If the user doesn't have any specific permissions, the output will show that "user is not allowed to run sudo on host"
#It's worth noting that, you need to have root privilege or a user with "sudo" privileges to run the "sudo -l" command. 
#Also, the output of the "sudo -l" command is based on the user's permissions in the /etc/sudoers file.

#Can you explain me the different columns that outputs ls -l command in Linux? Can you teach me the basic stuff about it?
#The "ls -l" command in Linux is used to list the contents of a directory in a detailed format.
#The output of this command shows information about each file or directory in the specified directory, including the file permissions, ownership, size, and modification time.
#Here is an example of the output of the "ls -l" command:
#-rw-rw-r-- 1 user1 user1  508 Jan 20 14:12 file1.txt
#drwxrwxr-x 2 user2 user2 4096 Jan 21 15:00 dir1
#The output is divided into several columns, each one represents different information, they are:
#File permissions: The first column shows the file permissions in the format of -rw-rw-r--, this means that the file is a regular file, the owner 
#has read and write permissions, the group has read and write permissions and others have only read permissions.
#Number of links: The second column shows the number of links to the file. A link is a way to access a file using more than one name.
#Owner: The third column shows the username of the owner of the file.
#Group: The fourth column shows the group that the file belongs to.
#File size: The fifth column shows the size of the file in bytes.
#Time of last modification: The sixth column shows the date and time of the last modification of the file.
#File name: The seventh column shows the name of the file.
#It's worth noting that the "d" at the beginning of the first column in the second example "drwxrwxr-x" means that it's a directory
#Also, the "l" at the beginning of the first column in the case of a symbolic link, means that it's a symbolic link to a file or a directory.
#In the case of the permissions column, the first character represents the type of the file, a "-" means it's a

#What is a link in Linux, when speaking about accessing files? Can you teach me the basic stuff about it?
#In Linux, a link is a way to access a file using more than one name. There are two types of links: hard links and symbolic links.
#A hard link is a direct link to the inode of a file.
#When you create a hard link to a file, you are creating an additional directory entry for the file.
#This means that if you delete the original file, the hard link will still point to the same data on the file system.
#And if you modify the content of the file, the change will be reflected to both the original file and the hard link.
#A symbolic link is a pointer to the file or directory. When you create a symbolic link, you are creating a new file that contains the path to the original file or directory.
#This means that if you delete the original file or directory, the symbolic link will be broken and will no longer point to anything.
#And if you modify the content of the file, the change will be reflected only to the original file, not the symbolic link.
#Here is an example of creating a hard link and a symbolic link:
#ln file1.txt hardlink1.txt
#ln -s file1.txt symlink1.txt
#The first command creates a hard link named "hardlink1.txt" that points to the file "file1.txt"
#The second command creates a symbolic link named "symlink1.txt" that points to the file "file1.txt"
#It's worth noting that, hard links can only be created within the same file system, whereas symbolic links 
#can be created across different file systems, and also, hard links can only link files, not directories, while symbolic links can link files and directories.

#What is the proc directory in a Linux file system?
#The /proc directory in a Linux file system is a virtual filesystem that contains information about the system's processes and kernel.
#It is often referred to as a "process information pseudo-file system"
#It does not contain real files but instead holds virtual files that contain information about system status.
#The /proc directory contains a number of subdirectories, each of which corresponds to a specific process running on the system.
#Each subdirectory is named after the process ID (PID) of the process, and contains virtual files that provide information about the process, 
#such as its memory usage, status, and file handles.
#Additionally, /proc contains various other files and directories that provide information about the system as a whole, such as system memory, CPU usage, and system uptime.
#This information can be accessed and read by various command-line utilities, such as cat, more, grep, and ps.
#In summary, /proc is a virtual filesystem that contains information about the system's processes and kernel status, it's useful for debugging, monitoring and troubleshooting 
#of the system.

#What is the run directory in a Linux file system?
#The /run directory in a Linux file system is a temporary filesystem (tmpfs) that holds runtime data, it's used to store transient data 
#that is needed while the system is running but that does not need to be preserved across reboots.
#The /run directory is intended to be used as a "tmpfs" filesystem, which means that the data it contains is stored in the system's RAM and is not written to disk.
#This makes it faster to access and eliminates the need for the system to write data to disk and then read it back when the system starts up.
#This is different from /var/run which is a symlink to /run.
#The /run directory contains a number of subdirectories, such as /run/user, /run/lock, /run/systemd, which contains various runtime data, such as user 
#sessions, lock files, and systemd state data, respectively.
#It also contains various other files and directories that provide information about the system as a whole, such as system status, and process IDs.
#In summary, /run is a temporary filesystem that holds runtime data and it's intended to be used for transient data that is needed while the system is running 
#but that does not need to be preserved across reboots,
#it's faster and efficient to access, and it's different from /var/run which is a symlink to /run.

#What is the srv directory in a Linux file system?
#In a Linux file system, the /srv directory is traditionally used to store data for services provided by the system.
#The name srv is short for service, this directory is not present by default in all distributions, but it's part of the 
#Filesystem Hierarchy Standard (FHS) which is a set of guidelines for organizing the files and directories on a Linux or other Unix-like systems.
#The /srv directory is intended to hold data that is served by the system, such as web content, FTP data, and other service-specific data
#This directory typically contains subdirectories for each service, such as /srv/ftp, /srv/www, and /srv/cvs, which contain the data for the FTP, 
#web, and CVS services, respectively.
#The idea behind the /srv directory is to separate the data served by the system from the configuration and binary files used to run the services.
#This makes it easier to manage the data and to back it up, and it allows the system administrator to have better control over the data.
#In summary, /srv is a directory that is used to store data for services provided by the system, 
#it's intended to hold data that is served by the system, such as web content, FTP data, and other service-specific data.
#It's part of the Filesystem Hierarchy Standard and it separates the data served by the system from the configuration and binary files used to run the services.

#Can you explain me with detail the Filesystem Hierachy Standard of a Linux or other Unix-like systems?
#The Filesystem Hierarchy Standard (FHS) is a set of guidelines for organizing the files and directories on a Linux or other Unix-like systems.
#It defines a standard directory layout for all Unix and Unix-like systems, including Linux.
#The purpose of the FHS is to provide a consistent and well-organized file system structure that makes it easy for users, administrators, and developers to 
#understand the layout of a Unix-like system and to locate the files they need.
#The FHS divides the file system into several top-level directories, each with a specific purpose:

#/: The root directory, which is the top-level directory in the file system hierarchy. It contains all other directories and files on the system.
#/bin: Contains binary executable files that are needed for both the system to boot and for regular system and command-line usage.
#/sbin: Contains binary executable files that are needed for system maintenance, such as system administration commands.
#/etc: Contains configuration files for the system and for various applications.
#/lib: Contains libraries that are needed to run the executables in /bin and /sbin.
#/usr: Contains user-related data, such as applications, documentation, and user home directories. It's intended to be shareable among different systems.
#/var: Contains variable data files such as log files, databases, and email spool.
#/tmp: Contains temporary files that are not needed across reboots.
#/home: Contains the home directories of users.
#/opt: Contains third-party software applications, this directory is optional and not all distributions include it.
#/mnt: Contains mount points for file systems that are temporarily mounted, such as a USB drive.
#/media: Contains mount points for removable media such as CDs, DVDs, and USB drives.
#/srv: contains data for services provided by the system.
#/run: contains runtime data that is needed while the system is running but that does not need to be preserved across reboots.
#/proc: is a virtual filesystem that contains information about the system's processes and kernel.

#These are the main directories defined by the FHS, but there are other directories that are not included in the FHS but are 
#common in most distributions such as /dev, /sys and /boot.

#In summary, The Filesystem Hierarchy Standard (FHS) is a set of guidelines for organizing the files and directories on a Linux or other Unix-like systems
# it defines a standard directory layout for all Unix and Unix-like systems, including Linux, it provides a consistent and well-organized file system structure 
#that makes it easy for users,
#administrators, and developers to understand the layout of a Unix-like system and to locate the files they need
#it divides the file system into several top-level directories, each with a specific purpose.

#What is the tmp directory in a Linux file system?
#The tmp directory in a Linux file system is a location where temporary files are stored
#These files are typically not needed for long-term storage and can be deleted by the system or by a user without affecting the overall functioning of the system.
#The location of the tmp directory can vary depending on the distribution of Linux, but it is commonly found in the root directory under the name "/tmp".

#What is the var directory in a Linux file system?
#The var directory in a Linux file system is a location where variable data is stored. This includes files and directories that are expected 
#to change during the normal operation of the system, such as log files, spool files, and transient and temporary files created by system processes.
#The location of the var directory can vary depending on the distribution of Linux, but it is commonly found in the root directory and it's usually 
#used for storing things like system logs, caches, and user mailboxes.
#It's also used for storing the data for some application, for example, the data for a web server.

#What is the dev directory in a Linux file system?
#The dev directory in a Linux file system is a location where device files are stored.
#These files provide an interface to various hardware devices connected to the system, such as hard drives, CD-ROMs, keyboards, and printers.
#The device files in the dev directory are created by the kernel and represent the devices to the system and to user-space programs.
#They allow programs to interact with the devices as if they were regular files, even though they are not actual files on disk.
#The location of the dev directory can vary depending on the distribution of Linux, but it is commonly found in the 
#root directory and it's usually used for storing device files which can be used to interact with the hardware.

#What is the home directory in a Linux file system?
#The home directory in a Linux file system is a location where users' personal files and settings are stored.
#Each user on a Linux system typically has their own home directory, which is identified by their username.
#The home directory is where users store their personal files, such as documents, music, and photos, as well as configuration files for their programs. 
#The location of the home directory can vary depending on the distribution of Linux, but it is commonly found in the root directory under 
#the name "/home" or "/Users" and it's usually used for storing users' personal files and settings.

#What is the media directory in a Linux file system?
#The media directory in a Linux file system is a location where external devices such as USB drives, CDs, DVDs, 
#and external hard drives are automatically mounted when they are connected to the system.
#The location of the media directory can vary depending on the distribution of Linux, but it is commonly found in the root directory under the name "/media" or "/mnt".
#The media directory is usually used for mounting the external devices and providing the access to the files stored on these devices.

#What is the opt directory in a Linux file system?
#The opt directory in a Linux file system is a location where optional software packages are typically installed.
#It's a convention that's been established by the Filesystem Hierarchy Standard (FHS) to store third-party software packages.
#The location of the opt directory can vary depending on the distribution of Linux, but it is commonly found in the root directory under the name "/opt".
#The opt directory is usually used for installing additional or optional software packages which are not part of the base system and not managed by the package manager.

#What is the root directory in a Linux file system?
#The root directory in a Linux file system is the top-most directory in the file system hierarchy. It is represented by the "/" (forward slash) 
#symbol and serves as the starting point for all other directories and files on the system.
#The root directory contains several other important directories such as bin, dev, etc, home, media, opt, tmp, usr, var and many more.
#All the other directories and files on the system are organized and located under the root directory. The root directory is also known as the 
#"base directory" and has the highest level of access to the whole file system.

#What is the sbin directory in a Linux file system?
#The sbin directory in a Linux file system is a location where system executables are stored. These are programs that are typically 
#used by system administrators and are not intended for use by regular users.
#The sbin directory contains executables that are required for booting the system, managing system processes, and performing system maintenance tasks.
#The sbin directory is usually used for storing the system-level commands and daemons which are executed by root or other privileged users.

#What is the sys directory in a Linux file system?
#The sys directory in a Linux file system is a location where the kernel provides information about the system's hardware and configuration.
#It is part of the sysfs filesystem, which is a virtual filesystem that the kernel uses to export information about various devices and kernel subsystems to user space.
#The sysfs filesystem contains information about devices, drivers, and kernel features, and can be used to configure certain aspects of the kernel and the system at runtime.
#It is used to give access to the kernel's internal data structures, and it's mainly used by system administrators and developers.

#What is the usr directory in a Linux file system?
#The usr directory in a Linux file system is a location where user-related data and programs are stored.
#The usr directory is intended to be shareable across different systems and is typically used to store programs, libraries, 
#and documentation that are not specific to a particular system.
#The usr directory is usually used to store all the user-related files and programs that are not specific to a 
#particular system, such as libraries, headers, executables, documentation, and other files that are shared by different users or different systems.

#45. Unnecessary Rebuilds
#Lo que estamos haciendo es cambiar el Web Server code. Cambiamos Hi there cuando tappeamos la home route de nuestra Web App por HELLO FUCKER, pero cuando refresheamos
#La página (recordemos que tenemos hecho el port mapping en el docker run -p 8080:8080 lasantoneta/simpleweb:latest), no vemos que se actualice la misma.
#Recordemos que cuando creamos la imagen o el Container, estamos tomando un Snapshot del FS. Es decir, tomamos un Snapshot de Index.js luego de que haya sido copiado el
#File en la instrucción COPY ./ ./.
#Cuando realizamos el cambio en Index.js, el mismo no se verá automáticamente reflejado en el Container. 
#Si queremos actualizar el File en el container, tendremos que realizar configuraciones adicionales. 
#Para tener los cambios que realizamos, tendríamos que completamente REBUILDEAR el Container.

#46. Minimizing Cache Busting and Rebuilds
#Realizar un cambio a Index.js y luego rebuildear la imagen causó que el COPY instruction quedara invalidado completamente. 
#Tuvimos que re-runnear copy y todos los pasos luego de él, lo cual implica que tuvimos que las dependencias se instalaran denuevo dado
#que RUN npm install instruction viene después.

#Vamos a ver un posible método para evitar instalar todos los Npm packages solo por hacer un cambio a Index.js.

#Vamos a separar la COPY instruction en dos pasos diferentes. Todo lo que necesitamos para runnear el npm install successfully es el package.json.
#No nos importa nada más, ni ningún otro file dentro de la carpeta para poder runnear exitosamente esa instrucción.

#Entonces, en la primer parte de la COPY instruction, lo primero que vamos a decir es que quiero copiar el package.json file.
#La nueva instrucción sería: COPY ./package.json ./. Es decir, estamos diciendo, buscar en el current directory del build context especificado en el docker build
#Y encontrar el file package.json. Ese file lo vamos a copiar en el Container's current working directory (definido por WORKDIR) -> /usr/app.
#Luego de haber instalado todas las dependencias, vamos a copiar todo el resto de los files.
#Por eso nos queda:
#COPY ./package.json ./
#RUN npm install
#COPY ./ ./

#Entonces, ahora cada vez que hagamos un cambio en index.js file, no invalidará el cache del re-run de package.json, dado que son instrucciones que vienen antes.
#Solo se volverá a re-instalar todos los packages en el caso que haga un cambio en el COPY ./package.json ./ step, o cualquiera de los de arriba.











