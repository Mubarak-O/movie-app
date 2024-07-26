import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { getGenreNameById } from "../../utils/utility";
import { genresData } from "../../utils/utility";

interface GenreButtonProps {
	onGenreSelect: (selected: number[]) => void;
}

export const GenreButton = ({ onGenreSelect }: GenreButtonProps) => {
	const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

	const handleGenreSelection = (selected: number[]) => {
		console.log(selected);
		setSelectedGenres(selected);
		onGenreSelect(selected);
	};

	return (
		<>
			<Listbox
				value={selectedGenres}
				onChange={handleGenreSelection}
				multiple
			>
				{({ open }) => (
					<>
						<Listbox.Button>
							{selectedGenres.length < 1
								? "Genre"
								: selectedGenres.length === 1
								? getGenreNameById(selectedGenres)
								: `${selectedGenres.length} selected`}
						</Listbox.Button>
						<Transition show={open}>
							<Listbox.Options
								static
								className="absolute z-10 top-[15%] right-[45%] grid grid-cols-4 gap-2 mt-2 p-2 bg-[#201d1d] rounded-md shadow-lg"
							>
								{genresData.genres.map((genre) => (
									<Listbox.Option
										key={genre.id}
										value={genre.id}
										as={Fragment}
									>
										{({ active, selected }) => (
											<li
												className={`${
													selected || active
														? "bg-accent-colour rounded-md text-white"
														: "text-white"
												}  cursor-pointer select-none p-2`}
											>
												{genre.name}
											</li>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</>
				)}
			</Listbox>
		</>
	);
};
