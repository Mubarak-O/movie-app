import { useMemo, useState } from "react";
import { MediaCards } from "./mediaCards";
import { Pagination } from "./pagination";
import { useMediaData } from "../../api/hooks";
import { DataFilters, MediaData } from "../../types/types";
import { isMovie } from "../../utils/utility";
import { Filters } from "../filter/filters";

interface MediaProps {
	mediaType: "movie" | "tv";
}
export const Media = ({ mediaType }: MediaProps) => {
	// const [mediaData, setMediaData] = useState<MediaData[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	// Having cardsPerPage be a state variable might not be needed
	// The only use case I see for it being one is if I wanted to set a different value
	//   for it depending on what screen media is being used, phone, tablet or PC
	// Otherwise I think just having it as a const variable should be fine
	const [cardsPerPage, _] = useState<number>(10);
	const [filters, setFilters] = useState<DataFilters>({
		searchQuery: "",
		selectedGenre: undefined,
		selectedYear: undefined,
		selectedSorting: undefined,
	});

	const { data: mediaData = [], isLoading, error } = useMediaData(mediaType);

	const filteredData = useMemo(() => {
		return mediaData
			.filter((media) => {
				if (filters.searchQuery) {
					const title = isMovie(media) ? media.title : media.name;
					return title
						.toLowerCase()
						.includes(filters.searchQuery.toLowerCase());
				}
				return true; // if no search query is present include all items
			})
			.filter((media) => {
				if (filters.selectedGenre && filters.selectedGenre.length > 0) {
					filters.selectedGenre.every((genre) =>
						media.genre_ids.includes(genre)
					);
				}
				return true; // if no genre is selected include all items
			})
			.filter((media) => {
				if (filters.selectedYear?.length == 2) {
					const date = isMovie(media)
						? media.release_date
						: media.first_air_date;
					const releaseDate = new Date(date);
					const startDate = new Date(filters.selectedYear[0]);
					const endDate = new Date(filters.selectedYear[1]);
					return releaseDate >= startDate && releaseDate <= endDate;
				}
				return true; // if no year is selected, include all items
			})
			.sort((a, b) => {
				const getTitle = (media: MediaData) =>
					isMovie(media) ? media.title : media.name;

				switch (filters.selectedSorting) {
					case "popularity.desc": {
						return b.popularity - a.popularity;
					}
					case "title.asc": {
						return getTitle(a).localeCompare(getTitle(b));
					}
					default:
						return 0; // maintain initial (default) sorting of Trending
				}
			});
	}, [mediaData, filters]);

	if (isLoading) {
		return <p>Loading Content...</p>;
	} else if (error) {
		return <p>Run into Error: {error.message}</p>;
	}

	const lastCardIndex = currentPage * cardsPerPage;
	const firstCardIndex = lastCardIndex - cardsPerPage;
	const currentCards = filteredData?.slice(firstCardIndex, lastCardIndex);

	return (
		<>
			<h1 className="font-k2d text-white text-3xl font-bold p-4">
				{mediaType === "movie" ? "Movies" : "TV Shows"}
			</h1>
			<Filters setFilters={setFilters} />
			<MediaCards mediaData={currentCards} />
			<Pagination
				totalCards={filteredData.length}
				cardsPerPage={cardsPerPage}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
			/>
		</>
	);
};
