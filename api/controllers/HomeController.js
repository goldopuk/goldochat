var _ = require('lodash');

module.exports = {
    home: function (req, res) {

        if ( ! req.session.username) {
            return res.redirect('/home/login');
        }

        var rooms = ChatService.getRooms();
        return res.view({rooms: rooms, username: req.session.username});
    },

    login: function (req, res) {

        var username = req.param('username');

        if (username) {
            req.session.username = username;
            return res.redirect('/');
        }

        return res.view();
    },

    logout: function (req, res) {

        req.session.username = null;

        return res.redirect('/');
    },

    leave: function (req, res) {

        var roomId = req.param('id');

        ChatService.leaveRoom(roomId, req.session.username);

        return res.redirect('/');
    },

    chatRoom: function (req, res) {

        if ( ! req.session.username) {
          return res.redirect('/home/login');
        }

        ChatService.init();

        var roomId = req.param('id');

        var room = ChatService.getRoom(roomId);

        ChatService.joinRoom(roomId, req.session.username);

        return res.view({room: room});
    }
};