type Genre = {
	id: number;
	name: string;
};

export type GenresData = {
	genres: Genre[];
};

type Person = {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string;
	credit_id: string;
};

export type Cast = Person & {
	character: string;
	order: number;
};

export type Crew = Person & {
	department: string;
	job: string;
};

type Media = {
	adult: boolean;
	backdrop_path: string;
	media_type?: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	overview: string;
	popularity: number;
	poster_path: string;
	vote_average: number;
	vote_count: number;
};

export type Movie = Media & {
	original_title: string;
	release_date: string;
	title: string;
	video: boolean;
};

export type TVShow = Media & {
	origin_country: string[];
	original_name: string;
	first_air_date: string;
	name: string;
};

export type MediaData = Movie | TVShow;

type ProdCountries = {
	iso_3166_1: string;
	name: string;
};

export type DetailedMediaData = MediaData & {
	production_countries: ProdCountries[];
	genres: Genre[];
	credits: {
		cast: Cast[];
		crew: Crew[];
	};
	number_of_seasons: number;
};

export type RequestOptions = {
	method: string;
	url: string;
	params: {
		language: string;
		include_adult?: string;
		page?: string;
		append_to_response?: string;
		query?: string;
		include_video?: string;
		with_genres?: string;
		sort_by?: string;
		"primary_release_date.gte"?: string;
		"primary_release_date.lte"?: string;
	};
	headers: {
		accept: string;
		Authorization: string;
	};
};

export type dbMedia = {
	id: string;
	img: string;
	title: string;
	type: string;
};
