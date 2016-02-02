var _ = require('lodash');

var chatRooms = {};

var initialized = false;

module.exports = {

    createRoom: function(roomName, roomId) {

        // room already exists
        if (chatRooms[roomName]) {
            throw new Error('The room ' + roomName + ' already exists.');
        }

        var room = {};
        room.name = roomName;
        room.id = roomId;
        room.messages = [];
        room.users = {};

        chatRooms[roomId] = room;

        return room;
    },

    getRoom: function (roomId) {
        if (! chatRooms[roomId]) {
            throw new Error('The room ' + roomId + ' does not exists.');
        }

        return chatRooms[roomId];
    },

    getRooms: function () {
        return chatRooms;
    },

    getRoomCount: function () {
        return _.keys(chatRooms).length;
    },

    addMessage: function (username, roomId, message) {
        var room = this.getRoom(roomId);

        var messageObj = { text: message, username: username, date: new Date()};

        room.messages.push(messageObj);
    },

    joinRoom: function (roomId, username) {
        var room = this.getRoom(roomId);
        room.users[username] = true;
    },

    leaveRoom: function (roomId, username) {
        var room = this.getRoom(roomId);
        delete room.users[username];
    },

    init: function() {
        if (initialized) {
            return;
        }

        var self = this;

        sails.io.on('connection', function(socket){
            console.log('a user connected', socket.id);

            socket.on('disconnect', function(){
                console.log('user disconnected');
            });

            socket.on('chat message', function(messageObj){
                sails.log.info(messageObj);
                self.addMessage(messageObj.username, messageObj.roomId, messageObj.message);
                sails.io.emit('chat message', messageObj);
            });
        });

        initialized = true;
    }

};