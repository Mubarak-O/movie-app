import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { DataFilters } from "../../types/types";
import { FaChevronDown } from "react-icons/fa6";
import { GenreButton } from "./genreButton";
import { SortButton } from "./sortButton";
import { YearButton } from "./yearButtons";

type FilterProps = {
	setFilters: Dispatch<SetStateAction<DataFilters>>;
};

export const Filters = ({ setFilters }: FilterProps) => {
	const inputValueRef = useRef<HTMLInputElement>(null);
	const [selectedGenre, setSelectedGenre] = useState<number[]>([]); // number array e.g: [1,25,3]
	const [selectedYear, setSelectedYear] = useState<string>("");
	const [selectedSorting, setSelectedSorting] = useState<string>("trending");

	const handleSelectGenres = (selectedGenres: number[]) => {
		setSelectedGenre(selectedGenres);
	};

	const handleSelectedYears = (selectedYear: string) => {
		setSelectedYear(selectedYear);
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

	const handleClearFilters = () => {
		if (inputValueRef.current?.value.trim()) {
			inputValueRef.current.value = "";
		}
		setSelectedGenre([]);
		setSelectedYear("");
		setSelectedSorting("trending");
	};

	return (
		<form className="filters-container" onSubmit={handleSubmit}>
			<input
				type="text"
				ref={inputValueRef}
				placeholder="Search..."
				className="search-box"
			/>
			<div className="filter-button w-44">
				<GenreButton
					value={selectedGenre}
					onGenreSelect={handleSelectGenres}
				/>
				<FaChevronDown />
			</div>
			<div className="filter-button w-36">
				<YearButton
					value={selectedYear}
					onYearSelect={handleSelectedYears}
				/>
				<FaChevronDown />
			</div>
			<div className="filter-button w-44">
				<SortButton
					value={selectedSorting}
					onSortingSelect={handleSelectSorting}
				/>
				<FaChevronDown />
			</div>
			<button className="filter-button border-transparent bg-accent-colour">
				Apply
			</button>
			<button
				onClick={handleClearFilters}
				className="filter-button border-transparent bg-accent-colour"
			>
				Clear
			</button>
		</form>
	);
};
