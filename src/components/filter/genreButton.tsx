import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { getGenreNameById } from "../../utils/utility";
import { genresData } from "../../utils/utility";

interface GenreButtonProps {
	onGenreSelect: (selected: number[]) => void;
	value: number[];
}

export const GenreButton = ({ value, onGenreSelect }: GenreButtonProps) => {
	const displaySelectedInfo = (): string => {
		const selectedGenresAmount = value.length;
		if (selectedGenresAmount < 1) {
			return "Genre";
		} else if (selectedGenresAmount === 1) {
			const message = getGenreNameById(value);
			if (message) {
				return message;
			}
		} else if (selectedGenresAmount <= 5) {
			return `Genre (${selectedGenresAmount}) `;
		} else {
			return `Genre (5+)`;
		}

		return "message";
	};

	return (
		<>
			<Listbox value={value} onChange={onGenreSelect} multiple>
				{({ open }) => (
					<>
						<Listbox.Button>{displaySelectedInfo()}</Listbox.Button>
						<Transition show={open}>
							<Listbox.Options className="absolute z-10 top-[15%] right-[45%] grid grid-cols-4 gap-2 mt-2 p-2 bg-[#201d1d] rounded-md shadow-lg">
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
