import {
	Dispatch,
	FormEvent,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
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
	const [disabled, setDisabled] = useState<boolean>(true);
	const [isClearing, setIsClearing] = useState<boolean>(false);
	const [hidden, setHidden] = useState<boolean>(true);

	useEffect(() => {
		if (
			selectedGenre.length > 0 ||
			selectedYear.length > 0 ||
			selectedSorting !== "trending"
		) {
			setDisabled(false);
		}
	}, [selectedGenre, selectedYear, selectedSorting]);

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

		setHidden(false);
		setDisabled(true);
	};

	const handleClearFilters = () => {
		if (inputValueRef.current?.value.trim()) {
			inputValueRef.current.value = "";
		}
		setSelectedGenre([]);
		setSelectedYear("");
		setSelectedSorting("trending");

		setIsClearing(true);

		setTimeout(() => {
			setHidden(true);
			setIsClearing(false);
			setDisabled(true);
		}, 300);
	};

	return (
		<form className="filters-container" onSubmit={handleSubmit}>
			<input
				type="text"
				ref={inputValueRef}
				placeholder="Search..."
				className="search-box"
				onChange={() => setDisabled(false)}
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
			<button
				className={`filter-button border-transparent bg-accent-colour transition-opacity duration-200 ease-out ${
					disabled ? "opacity-50" : "opacity-100"
				}`}
				disabled={disabled}
			>
				Apply
			</button>
			{!hidden && (
				<button
					onClick={handleClearFilters}
					className={`filter-button border-transparent bg-accent-colour transition-opacity duration-300 ease-out ${
						isClearing
							? "opacity-0 pointer-events-none"
							: "opacity-100"
					}`}
				>
					Clear
				</button>
			)}
		</form>
	);
};
