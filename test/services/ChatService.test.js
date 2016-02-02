var assert = require('chai').assert;

describe('ChatService', function() {

    describe('#createRoom()', function() {
        it('should check the name before creating', function () {
            ChatService.createRoom('room one');
            ChatService.createRoom('room two');

            var count = ChatService.getRoomCount();

            try {
                ChatService.createRoom('room two');
            } catch (e) {

            }

            assert.equal(count, 2);
        });
    });

    describe('#addMessage()', function() {
        it('should check the name before creating', function () {
            ChatService.addMessage('Bob', 'room one', 'Hello John');
            ChatService.addMessage('Jonh', 'room one', 'Hello Bob');

            var room = ChatService.getRoom('room one');

            assert.equal(room.messages.length, 2);
        });
    });

});