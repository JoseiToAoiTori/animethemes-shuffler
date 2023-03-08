<template>
    <div class="columns">
        <div class="column is-three-quarters">
            <input class="input is-primary" type="text" placeholder="Enter Your AniList Username" v-model="username">
        </div>
        <div class="column is-one-quarter">
            <button class="button is-responsive is-fullwidth is-primary" @click="getAniList">Create Playlist</button>
        </div>
    </div>
</template>

<script>
const superagent = require('superagent');

const query = `query ($name: String, $page: Int) {
  Page(page: $page, perPage: 50) {
    pageInfo {
      hasNextPage
    }
    mediaList(userName: $name, type: ANIME, sort: SCORE_DESC, status: COMPLETED) {
      media {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
      }
      score
    }
  }
}
`;

export default {
	data () {
		return {
			username: '',
		};
	},
	methods: {
		async getAniList () {
			let hasNextPage = true;
			let page = 1;
			let animeArr = [];

			while (hasNextPage) {
				// eslint-disable-next-line no-await-in-loop
				const response = await (await superagent.post('https://graphql.anilist.co').send({query, variables: {name: this.username, page}})).body.data;
				const mediaList = response.Page.mediaList;
				animeArr = [...animeArr, mediaList.map(media => media.media.title.romaji)];
				page++;
				hasNextPage = response.Page.pageInfo.hasNextPage;
			}
		},
	},
};
</script>
