# Guía de Ejecución de la Aplicación

Para ejecutar la aplicacion he documentado dos metodos, sugiero el metodo de docker pues es mas confiable y menos propenso a errores, igualmente se encuentra el procedimiento para ejecutar el programa sin ayuda de docker pero este procedimiento es mas complejo y pueden haber errores imprevistos

[Credenciales de ingreso](ExampleUsers.md)<br>
[Aplication once is running](http://localhost:3005/)<br>


## Docker (Recomendada)

Pasos para ejecutar la aplicacion

1. Tener docker instalado Y corriendo

para veriicar si tienes docker instalado puedes correr el comando en el cmd de windows o la consola de linux: 
``` 
docker -v 
```
si lo tienes instalado deberia responder con algo asi:
```
Docker version 24.0.5, build ced0996
```
en caso de no tener docker instalado puedes intalar docker desde:

windows: https://docs.docker.com/desktop/install/windows-install/ <br>
linux: https://docs.docker.com/desktop/install/linux-install/ <br>

al terminar la intalacion verificar su ejecucion

2. Verificar la disponibilidad de los puertos

Esta aplicacion usa por defecto los puerto ``5000`` Y ``3005`` asi que debes asegurarte que estos puertos no esten ocupados en tu maquina
Por defecto tanto en windows como linux estos puerto no son usados, pero si tienes otra aplicacion en ejecucion en tu maquina local es posible que los este ocupando, si ese es el caso al ejecutar docker obtendras un mensaje similar a este:
```
Bind for 0.0.0.0:5000 failed: port is already allocated
```
Es necesario desocupar estos puerto mencionados (5000, 3005) para la correcta ejecucion de la aplicacion
O en su defecto cambiar la configuracion de docker-compose.yml para usar otros puertos pero si no has trabajado con docker no lo recomiendo

3. ejecutar docker compose

Debes abrir la terminal (ya sea cmd de windows o la linea de comandos de linux) y navegar hasta la carpeta de la aplicacion
una vez estas ubicado en la carpeta de aplicacion, seguidamente vamos a ejecutar el comando:
```
docker compose -f "docker-compose.yml" up -d --build
```
Una vez ejecutado el comando docker se encargara de configurar y ejecutar la aplicacion de la manera que fue indicada, este proceso puede tardar unos minutos, pero una vez haya terminado de manera exitosa tendras la aplicacion corriendo en el ``puerto 3005 y 5000`` y podras acceder a ella desde el navegador en la siguiente url: `http://localhost:3005/`


## Ejecucion manual 

En caso de no ser posible el uso de docker se puede ejecutar la aplicacion manualmente pero esto requiere multiples requisitos previos.

### Prerequisitos:

1. tener instalado node 18 o superior (https://nodejs.org/en/download)
2. tener postgreSQL instalado (https://www.postgresql.org/download/)
3. tener instalado nest CLI (https://docs.nestjs.com/cli/overview)

### Procedimiento

una vez se tienen los pre requisitos cumplidos vamos a ejecutar los siguientes pasos:

#### Backend

1. Instalar las dependencias necesarias <br>
Debes abrir la terminal (ya sea cmd de windows o la linea de comandos de linux) y navegar hasta la carpeta de la aplicacion.
Una vez alli vas a moverte a la carpeta backend y ejecutar el comando:
```
npm install
```

2. Modificar variables de entorno<br>
Debemos modificar en el archivo `.env` la variable `DATABASE_URL=` donde debemos colocar la uri de conexion a nuestra base de datos la cual normalmente luce asi:
```
postgresql://user:password@Hostname:port/dbname
```
3. Migrar los esquemas a la Base de datos<br>
Una vez tenos la url de nuesta base de datos configurada vamos a ejecutar los siguientes comandos en la terminal:
```
npx prisma generate
```
```
npx prisma db push
```
Estos comandos sincronizaran los esquemas del codigo con la base de datos

4. Ejecutar el backend<br>
Una vez tenemos la base de datos sincronizada con los esquemas vamos a ejecutar el backend con el comando:
```
npm run start:prod
```
**Importante** no cerrar esta consola, el cerrar la consola detiene la ejecucion del programa

#### Frontend

1. Instalar las dependencias necesarias <br>
Debes abrir la terminal (ya sea cmd de windows o la linea de comandos de linux) y navegar hasta la carpeta de la aplicacion.
Una vez alli vas a moverte a la carpeta frontend y ejecutar el comando:
```
npm install
```
2. Ejecutar la aplicacion<br>
Por motivos de facilidad vamos a ejecutar la aplicacion en modo desarrollo. 
Vamos a ejecutar ele comando:
```
npm start
```
Este comando deberia iniciar el frontend en el `puerto 3000` y abrir el navegador en la aplicacion.
En caso de que no se abra el navegador puedes ver la aplicacion en el navegador en la URL ```http://localhost:3000/```<br>
**Importante** no cerrar esta consola, el cerrar la consola detiene la ejecucion del programa<br>
Nota: para produccion tendriamos que configurar nginx o una forma de servir archivos estaticos y ejecutar npm run build