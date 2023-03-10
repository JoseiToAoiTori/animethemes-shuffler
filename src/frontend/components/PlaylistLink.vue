<template>
    <a class="panel-block" :class="activeLink" @click="$emit('input')">{{ title }}</a>
</template>

<script>
export default {
	props: ['title', 'index'],
	computed: {
		activeLink () {
			if (this.$store.state.index === this.index) {
				return 'has-background-primary has-text-dark';
			}
			return 'has-text-dark';
		},
	},
};
</script>
