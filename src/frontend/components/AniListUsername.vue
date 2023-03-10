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
import util from '../util';

const query = `query ($name: String, $page: Int) {
  Page(page: $page, perPage: 50) {
    pageInfo {
      hasNextPage
    }
    mediaList(userName: $name, type: ANIME, status: COMPLETED) {
      media {
        id
      }
    }
  }
}
`;

function chunkArray (array, chunkSize) {
	return Array(Math.ceil(array.length / chunkSize)).fill()
		.map((_, index) => index * chunkSize)
		.map(begin => array.slice(begin, begin + chunkSize));
}

// https://stackoverflow.com/a/6274381/1070107
function shuffle (a) {
	let j; let x; let i;
	for (i = a.length - 1; i > 0; i--) {
		j = Math.floor(Math.random() * (i + 1));
		x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

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
				animeArr = [...animeArr, ...mediaList.map(media => media.media.id)];
				page++;
				hasNextPage = response.Page.pageInfo.hasNextPage;
			}
			const chunkedArr = chunkArray([...new Set(animeArr)], 100);
			// this.$store.commit('POPULATE_SHUFFLED_ANIME', chunkedArr);
			// console.log(this.$store.state.shuffled_anime);
			const themePromises = [];
			for (const chunk of chunkedArr) {
				// eslint-disable-next-line no-await-in-loop
				themePromises.push(new Promise((resolve, reject) => {
					try {
						resolve(util.getAnimeThemes(chunk.join(',')));
					} catch (error) {
						reject(error);
					}
				}));
			}
			Promise.all(themePromises).then(values => {
				this.$store.commit('POPULATE_SHUFFLED_ANIME', shuffle(values.flat()));
			});
		},
	},
};
</script>
