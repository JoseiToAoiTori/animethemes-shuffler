<template>
    <div class="column is-10">
        <video controls="" autoplay="" name="media" @ended="onEnd()" :volume="current_volume"><source :src="current_video" type="video/webm"></video>
    </div>
</template>

<script>
export default {
	methods: {
		onEnd () {
			if (this.$store.state.index + 1 >= this.$store.state.shuffled_anime.length) {
				this.$store.commit('POPULATE_SHUFFLED_ANIME', null);
				this.$store.commit('SET_NEW_INDEX', 0);
			} else {
				this.$store.commit('INCREMENT_INDEX');
			}
		},
	},
	computed: {
		current_video () {
			return this.$store.state.shuffled_anime[this.$store.state.index].video;
		},
		current_volume () {
			return this.$store.state.volume;
		},
	},
	mounted () {
		const video = document.querySelector('video');

		video.addEventListener('volumechange', event => {
			this.$store.commit('CHANGE_VOLUME', event.target.volume);
		});
	},
};
</script>
