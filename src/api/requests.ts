import axios from "axios";
import { DetailedMediaData, MediaData, RequestOptions } from "../types/types";
import { filterNullPosterPath, sortDataByPopularity } from "../utils/utility";

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
			const filteredMediaData = filterNullPosterPath(mediaData);

			accumulatedMediaData = [
				...accumulatedMediaData,
				...filteredMediaData,
			];
		} catch (error) {
			console.error("Error fetching data: ", error);
			break;
		}
	}

	return accumulatedMediaData;
}

export async function createFilteredMediaData(
	fetchUrl: string,
	selectedGenre?: string,
	selectedSorting?: string,
	selectedYear?: string[]
): Promise<MediaData[]> {
	const options: RequestOptions = {
		method: "GET",
		url: fetchUrl,
		params: {
			include_adult: "false",
			include_video: "false",
			language: "en-US",
			page: "1",
			sort_by: "popularity_desc",
		},
		headers: {
			accept: "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	if (selectedGenre) {
		options.params["with_genres"] = selectedGenre;
	}

	if (selectedSorting) {
		options.params["sort_by"] = selectedSorting;
	}

	if (selectedYear) {
		options.params["primary_release_date.gte"] = selectedYear[0];
		options.params["primary_release_date.lte"] = selectedYear[1];
	}

	const allMediaData = await accumulateMediaData(options);

	return allMediaData;
}

export async function createSearchMediaData(
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
