var assert = require('chai').assert;

describe('ChatService', function() {

    describe('#createRoom()', function() {
        it('should check the name before creating', function () {
            ChatService.createRoom('Room one', 'room-one');
            ChatService.createRoom('Room two', 'room-two');

            try {
                ChatService.createRoom('Room two', 'room-two');
            } catch (e) {

            }

            var count = ChatService.getRoomCount();

            assert.equal(count, 2);
        });
    });

    describe('#addMessage()', function() {
        it('should create messages', function () {
            ChatService.addMessage('Bob', 'room-one', 'Hello John');
            ChatService.addMessage('John', 'room-one', 'Hello Bob');

            var room = ChatService.getRoom('room-one');

            assert.equal(room.messages.length, 2);
        });
    });

});