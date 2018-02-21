const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/javascript', (req, res) => {
    res.sendFile(__dirname + '/public/javascript.html');
});

app.get('/swift', (req, res) => {
    res.sendFile(__dirname + '/public/swift.html');
});

app.get('/css', (req, res) => {
    res.sendFile(__dirname + '/public/css.html');
});

// room chat
const tech = io.of('/tech');

tech.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(data.room);
        tech.in(data.room).emit('message', `New user joined ${data.room} room!`);
    })

    socket.on('message', (data) => {
        tech.in(data.room).emit('message', data.msg);
    });

    socket.on('disconnect', () => {
        tech.emit('message', 'user disconnected');
    })
})

// //general front chat

io.on("connection", function(socket) {
    socket.emit("tesmess", "messback")

    socket.on("test", function(ms) {
        console.log(ms)
    })



    io.on('connect', (socket) => {
        socket.on('tesmess', (msg) => {
            io.emit("'message', { msg: msg, idname: socket.id }");
        });
    })
    socket.on('disconnect', () => {
        io.emit("message", 'message disconected');
    })
})


//})