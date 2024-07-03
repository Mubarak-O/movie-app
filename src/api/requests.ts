import axios from "axios";
import { DetailedMediaData, MediaData, RequestOptions } from "../types/types";
import { filterIrregularData, sortDataByPopularity } from "../utils/utility";

const key = import.meta.env.VITE_MOVIEDB_API_KEY;
const token = import.meta.env.VITE_MOVIEDB_ACCESS_TOKEN;

export const requests = {
	movies: {
		requestDefault: `https://api.themoviedb.org/3/discover/movie?api_key=${key}`,
		requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
		requestTrending: `https://api.themoviedb.org/3/trending/movie/week?api_key=${key}`,
		requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
		requestNowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=en-US&page=1`,
		requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
	},
	tvshows: {
		requestDefault: `https://api.themoviedb.org/3/discover/tv?api_key=${key}&with_original_language=en`,
		requestPopular: `https://api.themoviedb.org/3/tv/popular?api_key=${key}&language=en-US&page=1`,
		requestTopRated: `https://api.themoviedb.org/3/tv/top_rated?api_key=${key}&language=en-US&page=1`,
		requestNewAiring: `https://api.themoviedb.org/3/tv/airing_today?${key}&language=en-US&page=1`,
		requestCurrentAiring: `
		https://api.themoviedb.org/3/tv/on_the_air?${key}&language=en-US&page=1`,
	},
};

async function accumulateMediaData(
	options: RequestOptions
): Promise<MediaData[] | []> {
	let accumulatedMediaData: MediaData[] = [];

	for (let page = 1; page <= 10; page++) {
		try {
			options.params.page = page.toString();

			const response = await axios.request(options);
			const mediaData: MediaData[] = response.data.results;

			accumulatedMediaData = [...accumulatedMediaData, ...mediaData];
		} catch (error) {
			console.error("Error fetching data: ", error);
			break;
		}
	}

	return accumulatedMediaData;
}

export async function initMediaData(
	mediaType: "movie" | "tv"
): Promise<MediaData[] | []> {
	const options: RequestOptions = {
		method: "GET",
		url: `https://api.themoviedb.org/3/discover/${mediaType}`,
		params: {
			include_adult: "false",
			...(mediaType == "movie" && { include_video: "false" }),
			...(mediaType == "tv" && { include_null_first_air_dates: "false" }),
			language: "en-US",
			page: "1",
			sort_by: "popularity.desc",
		},
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	var allMediaData: MediaData[] | [];
	allMediaData = await accumulateMediaData(options);
	allMediaData = filterIrregularData(allMediaData);

	return allMediaData;
}

export async function queryMediaData(
	query: string,
	mediaType: "movie" | "tv"
): Promise<MediaData[]> {
	const options: RequestOptions = {
		method: "GET",
		url: `https://api.themoviedb.org/3/search/${mediaType}`,
		params: {
			query: query,
			include_adult: "false",
			language: "en-US",
			page: "1",
		},
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const allMediaData = await accumulateMediaData(options);

	return allMediaData;
}

export async function getMediaDetails(
	id: string,
	mediaType: "movie" | "tv"
): Promise<DetailedMediaData> {
	const options: RequestOptions = {
		method: "GET",
		url: `https://api.themoviedb.org/3/${mediaType}/${id}`,
		params: { append_to_response: "credits", language: "en-US" },
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	let mediaDataDetails: DetailedMediaData = {} as DetailedMediaData;

	try {
		const response = await axios.request(options);
		mediaDataDetails = response.data;
	} catch (error) {
		console.error("Error fetching data: ", error);
	}

	return mediaDataDetails;
}

export async function getRecommendedMedia(
	id: string,
	mediaType: "movie" | "tv"
): Promise<MediaData[]> {
	const options: RequestOptions = {
		method: "GET",
		url: `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations`,
		params: { language: "en-US", page: "1" },
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	let recommendedMedia: MediaData[] = [];

	try {
		const response = await axios.request(options);
		const results = response.data.results;
		recommendedMedia = sortDataByPopularity(results).slice(0, 4);
	} catch (error) {
		console.error("Error fetching data: ", error);
	}

	return recommendedMedia;
}
