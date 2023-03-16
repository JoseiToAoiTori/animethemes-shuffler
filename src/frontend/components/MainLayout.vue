<template>
  <div class="hero is-fullheight">
    <div class="hero-body has-text-centered has-text-grey-dark">
		<div v-if="!shuffled_themes" class="container">
			<AniListForm/>
		</div>
		<div v-else>
			<div class="columns is-centered">
				<PlayList/>
				<VideoPlayer :key="index"/>
			</div>
		</div>
    </div>
  </div>
</template>

<script>
import AniListForm from './AniListForm.vue';
import VideoPlayer from './VideoPlayer.vue';
import PlayList from './PlayList.vue';

export default {
	name: 'MainLayout',
	components: {
		AniListForm,
		VideoPlayer,
		PlayList,
	},
	props: {
		msg: String,
	},
	computed: {
		shuffled_themes () {
			return this.$store.state.shuffled_anime;
		},
		index () {
			return this.$store.state.index;
		},
	},
};
</script>
