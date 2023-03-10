const superagent = require('superagent');

async function getAnimeThemes (animeString) {
	const themesResponse = await superagent.get(`https://api.animethemes.moe/anime?filter[has]=resources&filter[site]=AniList&filter[external_id]=${animeString}&include=animethemes.animethemeentries.videos,animethemes.song&page[size]=100&sort=random`);
	return themesResponse.body.anime.map(anime => anime.animethemes.map(el => ({title: `${anime.name} ${el.slug} - ${el.song.title}`, video: el.animethemeentries[0].videos[0].link}))).flat();
}

export default {
	getAnimeThemes,
};
