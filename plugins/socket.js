import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

export default function({store}) {
	Vue.use(new VueSocketIO({
		debug: false,
		connection: '',
		vuex: {
			store,
			actionPrefix: 'IO_',
			mutationPrefix: 'IO_'
		}
	}))
}
