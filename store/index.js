export const state = () => ({
	user: {},
	messages: [],
	users: [],
	f: {}
});

export const mutations = {
	setUser(state, user) {
		state.user = user;
	},
	clearData(state) {
		state.user = {};
		state.messages = [];
		state.users = [];
	},
	IO_newMessage(state, message) {
		state.messages.push(message);
	},
	IO_updateUsers(state, users) {
		state.users = users;
	},
	deleteMessage(state, id) {
		state.messages = state.messages.filter(msg => msg.dataId !== id);
	}
};

