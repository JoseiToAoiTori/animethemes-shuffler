<template>
  <div class="hero is-fullheight">
    <div class="hero-body has-text-centered has-text-grey-dark">
      <div class="container">
        <AniListUsername/>
      </div>
    </div>
  </div>
</template>

<script>
import AniListUsername from './AniListUsername.vue';

export default {
	name: 'MainLayout',
	components: {
		AniListUsername,
	},
	props: {
		msg: String,
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
