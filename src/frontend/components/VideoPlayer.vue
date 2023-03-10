<template>
    <div class="column is-10">
        <video controls="" autoplay="" name="media" @ended="onEnd()" :volume="current_volume"><source :src="current_video" type="video/webm"></video>
    </div>
</template>

<script>
export default {
	methods: {
		onEnd () {
			this.$store.commit('INCREMENT_INDEX');
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
			// console.log(event.target.volume);
			this.$store.commit('CHANGE_VOLUME', event.target.volume);
		});
	},
};
</script>
