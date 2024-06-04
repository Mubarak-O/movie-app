import { useRef, useState } from "react";
import { FilterButtons } from "../filter/filterButtons";
import { MediaCards } from "./mediaCards";
import { Pagination } from "./pagination";
import { useFilteredMedia, useSearchedMedia } from "../../api/hooks";

interface MediaProps {
	fetchUrl: string;
	mediaType: "movie" | "tv";
}
export const Media = ({ fetchUrl, mediaType }: MediaProps) => {
	// const [mediaData, setMediaData] = useState<MediaData[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	// Having cardsPerPage be a state variable might not be needed
	// The only use case I see for it being one is if I wanted to set a different value
	//   for it depending on what screen media is being used, phone, tablet or PC
	// Otherwise I think just having it as a const variable should be fine
	const [cardsPerPage, _] = useState<number>(10);
	const [selectedGenre, setSelectedGenre] = useState<string | undefined>(); // comma seperated string e.g: '1,25,3'
	const [selectedSorting, setSelectedSorting] =
		useState<string>("popularity.desc");
	const [selectedYear, setselectedYear] = useState<string[] | undefined>();
	const inputValueRef = useRef<HTMLInputElement>(null);
	const [searchQuery, setSearchQuery] = useState<string>("");

	const { data: filteredMediaData = [] } = useFilteredMedia(
		fetchUrl,
		selectedGenre,
		selectedSorting,
		selectedYear
	);

	const { data: searchMediaData = [] } = useSearchedMedia(
		searchQuery,
		mediaType
	);

	const mediaData = searchQuery ? searchMediaData : filteredMediaData;

	const handleSelectGenres = (selectedGenres: string) => {
		setSelectedGenre(selectedGenres);
	};

	const handleSelectSorting = (selectedOption: string) => {
		setSelectedSorting(selectedOption);
	};

	const handleSelectedYears = (selectedYears: string) => {
		if (selectedYears.length < 5) {
			const yearGte = `${selectedYears}-01-01`;
			const yearLte = `${selectedYears}-12-31`;
			setselectedYear([yearGte, yearLte]);
		} else {
			const years = selectedYears.split("-");
			const yearGte = `${years[0]}-01-01`;
			const yearLte = `${years[1]}-12-31`;
			setselectedYear([yearGte, yearLte]);
		}
	};

	function handleDisplayMediaData(): void {
		const input = inputValueRef.current?.value.trim();
		if (input) {
			setSearchQuery(input);
			setSelectedGenre(undefined);
			setSelectedSorting("popularity.desc");
			setselectedYear(undefined);
		}
	}

	const lastCardIndex = currentPage * cardsPerPage;
	const firstCardIndex = lastCardIndex - cardsPerPage;
	const currentCards = mediaData?.slice(firstCardIndex, lastCardIndex);

	// console.log(mediaData);

	return (
		<>
			<h1 className="font-k2d text-white text-3xl font-bold p-4">
				{mediaType === "movie" ? "Movies" : "TV Shows"}
			</h1>
			<FilterButtons
				onGenreSelect={handleSelectGenres}
				onYearSelect={handleSelectedYears}
				onSortingSelect={handleSelectSorting}
				onFilterEnter={handleDisplayMediaData}
				inputValueRef={inputValueRef}
			/>
			<MediaCards mediaData={currentCards} />
			<Pagination
				totalCards={mediaData.length}
				cardsPerPage={cardsPerPage}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
			/>
		</>
	);
};
