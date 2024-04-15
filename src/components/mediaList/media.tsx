import { useEffect, useState } from "react";
import { MediaData } from "../../types/types";
import {
	createFilteredMediaData,
	createSearchMediaData,
} from "../../api/requests";
import { FilterButtons } from "../filter/filterButtons";
import { MediaCards } from "./mediaCards";
import { Pagination } from "./pagination";

interface MediaProps {
	fetchUrl: string;
	mediaType: "movie" | "tv";
}
export const Media = ({ fetchUrl, mediaType }: MediaProps) => {
	const [mediaData, setMediaData] = useState<MediaData[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	// Having cardsPerPage be a state variable might not be needed
	// The only use case I see for it being one is if I wanted to set a different value
	//   for it depending on what screen media is being used, phone, tablet or PC
	// Otherwise I think just having it as a const variable should be fine
	const [cardsPerPage, _] = useState<number>(10);
	const [selectedGenre, setSelectedGenre] = useState<string | undefined>(); // comma seperated string e.g: '1,25,3'
	const [selectedYear, setselectedYear] = useState<string[] | undefined>();
	const [selectedSorting, setSelectedSorting] =
		useState<string>("popularity.desc");
	const [inputValue, setInputValue] = useState<string>("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const newData = await createFilteredMediaData(fetchUrl);
				setMediaData(newData);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

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

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	async function handleDisplayMediaData(): Promise<MediaData[]> {
		let media = [] as MediaData[];
		if (inputValue.trim() === "") {
			media = await createFilteredMediaData(
				fetchUrl,
				selectedGenre,
				selectedSorting,
				selectedYear
			);
			setMediaData(media);
		} else {
			media = await createSearchMediaData(inputValue, mediaType);
			setMediaData(media);
		}
		return media;
	}

	const lastCardIndex = currentPage * cardsPerPage;
	const firstCardIndex = lastCardIndex - cardsPerPage;
	const currentCards = mediaData?.slice(firstCardIndex, lastCardIndex);

	console.log(mediaData);

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
				onInputChange={handleInputChange}
				inputValue={inputValue}
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
