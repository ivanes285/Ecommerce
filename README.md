# Ecommerce Full Stack Mern
Es una aplicación MERN que realiza la funcion de un ecommerce , es decir puesdes registrarte,logearte y hacer compras , asi mismo existe la manera de realizar
pago a travez de Paypal, tambien cuenta con un panel de administracion en la cual se agregan , editan o eliminan productos de la tienda.


## Ejecución de la aplicacion 
Una vez clonado o descargado el proyecto para ejecutarlo primero debemos instalar los modulos necesarios de esta manera
 ```
 nmp i 

```

# Variables de Entorno
Despues de clonar el proyecto debemos crear un archivo .env  en donde definiremos las siguientes variables de entorno 
- NOTES_APP_MONGODB_HOST= puede ser nuestra maquina (localhost) o una direcccion Ip 
- NOTES_APP_MONGODB_DATABASE= nombre de nuestra base de datos (notesapp)

Despues de instalado los modulos ejecutamos el comando 
```
 nmp run dev 

```


## Modulos Usados
- express                nos permite crear y configurara un servidor en nuestra app
- connect-flash          nos permite enviar algunos mensajes entre las vistas 
- bcryptjs               nos va a permitir cifrar algun texto por ejemplo las constraseñas
- express-handlebars     es un motor de plantillas que nos permite interactuar con hmtl y javascript a diferencia del modulo handlebars este tiene mejor integracion con express
- dotenv                 nos sirve para utilizar variables de entorno en nuestra app 
- nodemon                nos permite reiniciar el servidor cada que hacemos un cambio
- handlebars             modulo de handlebars
- npm-check-updates      nos va a notificar cuando haya nuevos y actualizaciones de modulos 
- passport               modulo que nos permite guardar, resgistrar y trabajar con las sesiones en el servidor
- passport-local         nos permite interactuar con la bdd para gestionar las sesiones 


### Acciones de la Web

- [x] Registro de usuario
- [x] Inicio de session de usuario
- [x] CRUD de notas 
- [ ] Eliminar usuarios
- [ ] Edicion de datos de usuario


 ### Preview

[https://tasknotes.com/](https://tasknotes.herokuapp.com/)



<p align="center">
    <img src="./src/assets/img/registro.PNG" />
<p/>


<p align="center">
    <img src="./src/assets/img/inicio.PNG" />
<p/>


<p align="center">
    <img src="./src/assets/img/notas.PNG" />
<p/>
