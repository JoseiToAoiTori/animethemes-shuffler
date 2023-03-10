<template>
    <div class="column is-2">
        <nav class="panel is-platinum has-background-white">
            <p class="panel-heading">Playlist</p>
            <PlaylistLink v-for="(theme, index) in playlist" :key="current_index + index" @input="changeIndex(current_index + index)" :title="theme.title" :index="current_index + index"/>
        </nav>
    </div>
</template>

<script>
import PlaylistLink from './PlaylistLink.vue';

export default {
	components: {
		PlaylistLink,
	},
	computed: {
		playlist () {
			return this.$store.state.shuffled_anime.slice(this.$store.state.index, this.$store.state.index + 10);
		},
		current_index () {
			return this.$store.state.index;
		},
	},
	methods: {
		changeIndex (index) {
			this.$store.commit('SET_NEW_INDEX', index);
		},
	},
};
</script>
