import { useMemo, useState } from "react";
import { MediaCards } from "./mediaCards";
import { Pagination } from "./pagination";
import { useMediaData } from "../../api/hooks";
import { DataFilters, MediaData } from "../../types/types";
import { getFilterDateRanges, isMovie } from "../../utils/utility";
import { Filters } from "../filter/filters";

import { ring2 } from "ldrs";
ring2.register();

interface MediaProps {
	mediaType: "movie" | "tv";
}
export const Media = ({ mediaType }: MediaProps) => {
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
					return filters.selectedGenre.every((genre) =>
						media.genre_ids.includes(genre)
					);
				}
				return true; // if no genre is selected include all items
			})
			.filter((media) => {
				if (filters.selectedYear && filters.selectedYear?.length > 0) {
					const date = isMovie(media)
						? media.release_date
						: media.first_air_date;
					const releaseDate = new Date(date);
					const [filterStartDate, filterEndDate] =
						getFilterDateRanges(filters.selectedYear);
					return (
						releaseDate >= filterStartDate &&
						releaseDate <= filterEndDate
					);
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
		return (
			<div
				aria-live="polite"
				aria-busy={isLoading}
				className="flex justify-center items-center h-[40rem]"
			>
				<l-ring-2
					size="100"
					stroke="5"
					stroke-length="0.25"
					bg-opacity="0.1"
					speed="1"
					color="#A61731"
				></l-ring-2>
			</div>
		);
	} else if (error) {
		return <p>Run into Error: {error.message}</p>;
	}

	const lastCardIndex = currentPage * cardsPerPage;
	const firstCardIndex = lastCardIndex - cardsPerPage;
	const currentCards = filteredData?.slice(firstCardIndex, lastCardIndex);

	return (
		<>
			<Filters setFilters={setFilters} mediaType={mediaType} />
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
