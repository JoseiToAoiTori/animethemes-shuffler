<template>
    <div class="column is-10">
        <video controls="" autoplay="" name="media" @ended="onEnd()"><source :src="current_video" type="video/webm"></video>
    </div>
</template>

<script>
export default {
	methods: {
		onEnd () {
			this.$store.commit('INCREMENT_INDEX');
			console.log('it ended');
		},
	},
	computed: {
		current_video () {
			return this.$store.state.shuffled_anime[this.$store.state.index].video;
		},
	},
};
</script>
