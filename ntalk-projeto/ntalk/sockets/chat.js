module.exports = function(io) {
    var sockets = io.sockets;
    sockets.on("connection", function(client) {
        client.on("send-server", function(data) {
            var msg = "<br>" + data.nome + ":</b> " + data.msg + "<br>";
            client.emit("send-client", msg);
            client.broadcast.emit("send-client", msg);
        });
    });
}
