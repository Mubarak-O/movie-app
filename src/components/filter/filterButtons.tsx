import { FaFilter, FaCircleChevronDown } from "react-icons/fa6";
import { GenreButton } from "./genreButton";
import { SortButton } from "./sortButton";
import { YearButton } from "./yearButtons";
import { genresData } from "../../utils/utility";
import { RefObject } from "react";

interface FilterButtonsProps {
	onGenreSelect: (selected: string) => void;
	onYearSelect: (selected: string) => void;
	onSortingSelect: (selectedOption: string) => void;
	onFilterEnter: () => void;
	inputValueRef: RefObject<HTMLInputElement>;
}

export const FilterButtons = ({
	onGenreSelect,
	onSortingSelect,
	onYearSelect,
	onFilterEnter,
	inputValueRef,
}: FilterButtonsProps) => {
	return (
		<div className=" flex flex-row w-[80%] justify-between mx-auto text-white text-xl font-k2d">
			<input
				type="text"
				ref={inputValueRef}
				placeholder="Search..."
				className="search-box"
			></input>
			<div className="flex flex-row filter-button">
				<GenreButton
					genres={genresData}
					onGenreSelect={onGenreSelect}
				/>
				<FaCircleChevronDown />
			</div>
			<div className="flex flex-row filter-button">
				<YearButton onYearSelect={onYearSelect} />
				<FaCircleChevronDown />
			</div>
			<div className="flex flex-row filter-button">
				<SortButton onSortingSelect={onSortingSelect} />
				<FaCircleChevronDown />
			</div>
			<button
				onClick={onFilterEnter}
				className="filter-button bg-accent-colour"
			>
				<FaFilter className="" />
			</button>
		</div>
	);
};
