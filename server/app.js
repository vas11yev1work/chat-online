const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const users = require('./users')();
const uniqid = require('uniqid');

const m = (name, text, id, dataId, color) => ({name, text, id, dataId, color});

io.on('connection', socket => {
	socket.on('userJoined', (data, callback) => {
		if (!data.name || !data.room) {
			return callback('Данные некорректны');
		}
		socket.join(data.room);
		users.remove(socket.id);
		users.add({
			id: socket.id,
			name: data.name,
			room: data.room,
			color: data.color
		});
		callback({userId: socket.id});
		io.to(data.room).emit('updateUsers', users.getByRoom(data.room));
		socket.emit('newMessage', m(
			'admin',
			`Добро пожаловать, ${data.name}.`,
			'admin',
			uniqid.time()
		));
		socket.broadcast
			.to(data.room)
			.emit('newMessage', m(
				'admin',
				`Пользователь ${data.name} присоединился(лась) к чату.`,
				'admin',
				uniqid.time()
			));
	});
	socket.on('userLeft', (id, callback) => {
		const user = users.remove(id);
		if (user) {
			io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
			io.to(user.room).emit('newMessage', m(
				'admin',
				`Пользователь ${user.name} покинул(а) чат.`,
				'admin',
				uniqid.time()
			));
		}
		callback();
	});
	socket.on('disconnect', () => {
		const user = users.remove(socket.id);
		if (user) {
			io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
			io.to(user.room).emit('newMessage', m(
				'admin',
				`Пользователь ${user.name} отсоединился(лась) от чата.`,
				'admin',
				uniqid.time()
			));
		}
	});
	socket.on('createMessage', (data, callback) => {
		if (!data.text) {
			return callback('Текст не может быть пустым');
		}
		const user = users.get(data.id);
		console.log(user);
		if (user) {
			io.to(user.room).emit('newMessage', m(
				user.name,
				data.text,
				data.id,
				uniqid.time(),
				user.color
			));
		}
		callback();
	});
});

module.exports = { app, server };
