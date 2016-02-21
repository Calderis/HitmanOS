/* LIBRAIRIES */
var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
	ejs = require("ejs"),
    fs = require('fs');

/* SERVER CONFIG */
app.set('port', process.env.PORT || 4444);
app.set('views', './public/views');

app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

//Loading files
app.use('/public', express.static('public'));
app.use('/node_modules', express.static('public'));

var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json 
app.use(bodyParser.json())


/*********** POST / GET ***********/

//When a user ask for "/" road we send him the index page
app.get('/',function(req,res){
    res.render('index', {
        title: 'Accueil',
        message: 'Hello from Master'
    });
});

/* WHEN SOMEONE IS CONNECTING TO THE SERVER */
io.sockets.on('connection', function (socket) {
    
    console.log("User created : " + socket.id); // ← Write in console
    
    socket.join('general');// ← Socket (client) join room 'general'
    
    socket.on('disconnect', function(){
        console.log("User disconnected");
    });
    socket.broadcast.emit("truc",0);
});

/*********** RUNNING ***********/
server.listen(app.get('port'),function(){
    //When 
    console.log("Server running at PORT : "+app.get('port'));
});
/*********** RUNNING ***********/



/*********** ON SHUTDOWN SERVER ***********/
process.on('SIGINT', function() {
    process.exit(0);
});
/*********** ON SHUTDOWN SERVER *******/