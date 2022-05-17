//este archivo es para arrancar nuestro servidor

const express = require('express'); 
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

 // Inicializaciones
 const app = express(); 
 require('./database');

 // Setting - acá van todas nuestras configuraciones
app.set('port', process.env.port || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

 // Middlewares - acá van todas nuestras funciones q van a ser ejecutadas antes de que lleguen al servidor
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

 // Global variables - nos sirve para colocar ciertos datos que queremos que toda nuestra aplicacion tenga accesible
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
})

 // Routes
 app.use(require('./routes/index'))
 app.use(require('./routes/notes'))
 app.use(require('./routes/users'))

 // Static files - para configurar donde estara la carpeta de archivos estaticos

app.use(express.static(path.join(__dirname, 'public')));

 // Server is listenning
 app.listen(app.get('port'), () => {
     console.log('Server on port', app.get('port'));
 });