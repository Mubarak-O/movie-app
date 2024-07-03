import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { DataFilters } from "../../types/types";
import { FaFilter, FaCircleChevronDown } from "react-icons/fa6";
import { GenreButton } from "./genreButton";
import { SortButton } from "./sortButton";
import { YearButton } from "./yearButtons";

type FilterProps = {
	setFilters: Dispatch<SetStateAction<DataFilters>>;
};

export const Filters = ({ setFilters }: FilterProps) => {
	const inputValueRef = useRef<HTMLInputElement>(null);
	const [selectedGenre, setSelectedGenre] = useState<number[]>([]); // number array e.g: [1,25,3]
	const [selectedYear, setselectedYear] = useState<string[] | undefined>();
	const [selectedSorting, setSelectedSorting] = useState<string>("");

	const handleSelectGenres = (selectedGenres: number[]) => {
		setSelectedGenre(selectedGenres);
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

	const handleSelectSorting = (selectedOption: string) => {
		setSelectedSorting(selectedOption);
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const input = inputValueRef.current?.value.trim();

		setFilters({
			searchQuery: input || "",
			selectedGenre,
			selectedYear,
			selectedSorting,
		});
	};

	return (
		<form
			className="flex flex-row mx-auto justify-between w-[80%] text-white text-xl font-k2d"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				ref={inputValueRef}
				placeholder="Search..."
				className="search-box"
			/>
			<div className="flex flex-row filter-button">
				<GenreButton onGenreSelect={handleSelectGenres} />
				<FaCircleChevronDown />
			</div>
			<div className="flex flex-row filter-button">
				<YearButton onYearSelect={handleSelectedYears} />
				<FaCircleChevronDown />
			</div>
			<div className="flex flex-row filter-button">
				<SortButton onSortingSelect={handleSelectSorting} />
				<FaCircleChevronDown />
			</div>
			<button className="filter-button bg-accent-colour">
				<FaFilter className="" />
			</button>
		</form>
	);
};
