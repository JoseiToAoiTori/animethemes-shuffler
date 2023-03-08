import {createApp} from 'vue';
import {createStore} from 'vuex';

import App from './frontend/App.vue';

require('@/frontend/assets/main.scss');

const store = createStore({
	state () {
		return {
			count: 0,
		};
	},
	mutations: {

	},
	actions: {

	},
});

const app = createApp(App);

app.use(store);

app.mount('#app');
