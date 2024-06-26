import { MediaData, Movie, GenresData, Crew, Cast } from "../types/types";

export const genresData: GenresData = {
	genres: [
		{
			id: 28,
			name: "Action",
		},
		{
			id: 12,
			name: "Adventure",
		},
		{
			id: 16,
			name: "Animation",
		},
		{
			id: 35,
			name: "Comedy",
		},
		{
			id: 80,
			name: "Crime",
		},
		{
			id: 99,
			name: "Documentary",
		},
		{
			id: 18,
			name: "Drama",
		},
		{
			id: 10751,
			name: "Family",
		},
		{
			id: 14,
			name: "Fantasy",
		},
		{
			id: 36,
			name: "History",
		},
		{
			id: 27,
			name: "Horror",
		},
		{
			id: 10402,
			name: "Music",
		},
		{
			id: 9648,
			name: "Mystery",
		},
		{
			id: 10749,
			name: "Romance",
		},
		{
			id: 878,
			name: "Sci-Fi",
		},
		{
			id: 10770,
			name: "TV Movie",
		},
		{
			id: 53,
			name: "Thriller",
		},
		{
			id: 10752,
			name: "War",
		},
		{
			id: 37,
			name: "Western",
		},
	],
};

export function isMovie(data: MediaData): data is Movie {
	return "title" in data;
}

export function getDirector(crewMembers: Crew[]): string {
	const director = crewMembers?.find((member) => member.job === "Director");
	return director ? director.name : "N/A";
}

export function getCast(castMembers: Cast[]): string[] {
	const cast = castMembers?.slice(0, 10)?.map((cast) => cast.name);
	return cast ? cast : ["N/A"];
}

export function getGenreNameById(
	genreId: number | number[]
): string | undefined {
	if (typeof genreId === "number") {
		const genre = genresData.genres.find((genre) => genre.id == genreId);
		return genre ? genre.name : undefined;
	}

	if (Array.isArray(genreId)) {
		const genre = genresData.genres.find(
			(genre) => genre.id === genreId[0]
		);
		return genre ? genre.name : undefined;
	}

	return undefined;
}

type SortOptions = {
	name: string;
	id: string;
};

export const sortOptions: SortOptions[] = [
	{
		name: "Popularity",
		id: "popularity.desc",
	},
	{
		name: "Title A-Z",
		id: "title.asc",
	},
	{
		name: "Title Z-A",
		id: "title.desc",
	},
	{
		name: "Release Date",
		id: "primary_release_date.desc",
	},
	{
		name: "Scores",
		id: "vote_average.desc",
	},
];

export function getOptionNameById(id: string): string | undefined {
	const option = sortOptions.find((option) => option.id === id);
	return option ? option.name : undefined;
}

export const yearOptions = [
	{
		year: "2024",
		id: "2024",
	},
	{
		year: "2023",
		id: "2023",
	},
	{
		year: "2022",
		id: "2022",
	},
	{
		year: "2021",
		id: "2021",
	},
	{
		year: "2020",
		id: "2020",
	},
	{
		year: "2010s",
		id: "2010-2019",
	},
	{
		year: "2000s",
		id: "2000-2009",
	},
	{
		year: "1990s",
		id: "1990-1999",
	},
	{
		year: "1980s",
		id: "1980-1989",
	},
	{
		year: "1970s",
		id: "1970-1979",
	},
	{
		year: "1960s",
		id: "1960-1969",
	},
	{
		year: "1950s",
		id: "1950-1959",
	},
	{
		year: "1940s",
		id: "1940-1949",
	},
	{
		year: "1930s",
		id: "1930-1939",
	},
	{
		year: "1920s",
		id: "1920-1929",
	},
	{
		year: "1910s",
		id: "1910-1919",
	},
];

export function getYearNameById(id: string): string | undefined {
	const year = yearOptions.find((option) => option.id === id);
	return year ? year.year : undefined;
}

export function filterNullPosterPath(mediaData: MediaData[]): MediaData[] {
	return mediaData.filter((item) => item.poster_path !== null);
}

export function sortDataByPopularity(mediaData: MediaData[]): MediaData[] {
	return mediaData
		.slice()
		.sort((mediaA, mediaB) => mediaB.popularity - mediaA.popularity);
}
