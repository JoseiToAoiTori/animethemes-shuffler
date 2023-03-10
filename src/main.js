import {createApp} from 'vue';
import {createStore} from 'vuex';

import App from './frontend/App.vue';

require('@/frontend/assets/main.scss');

const store = createStore({
	state () {
		return {
			shuffled_anime: null,
			index: 0,
			volume: 1,
		};
	},
	mutations: {
		POPULATE_SHUFFLED_ANIME (state, shuffledAnime) {
			state.shuffled_anime = shuffledAnime;
		},
		INCREMENT_INDEX (state) {
			state.index++;
		},
		SET_NEW_INDEX (state, index) {
			state.index = index;
		},
		CHANGE_VOLUME (state, volume) {
			state.volume = volume;
		},
	},
});

const app = createApp(App);

app.use(store);

app.mount('#app');
