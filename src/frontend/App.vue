<template>
  <MainLayout msg="Welcome to Your Vue.js App"/>
</template>

<script>
import MainLayout from './components/MainLayout.vue';

export default {
	name: 'App',
	components: {
		MainLayout,
	},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html, body {
  background-color: #DDD0C8;
}
</style>
