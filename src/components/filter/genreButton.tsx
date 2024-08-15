import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { getGenreNameById, genres } from "../../utils/utility";

interface GenreButtonProps {
	onGenreSelect: (selected: number[]) => void;
	value: number[];
	mediaType: "movie" | "tv";
}

export const GenreButton = ({
	onGenreSelect,
	value,
	mediaType,
}: GenreButtonProps) => {
	const displaySelectedInfo = (): string => {
		const selectedGenresAmount = value.length;
		if (selectedGenresAmount < 1) {
			return "Genre";
		} else if (selectedGenresAmount === 1) {
			const message = getGenreNameById(value, mediaType);
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

	const genresData = mediaType === "movie" ? genres.movie : genres.tv;

	return (
		<>
			<Listbox value={value} onChange={onGenreSelect} multiple>
				{({ open }) => (
					<>
						<Listbox.Button className="truncate">
							{displaySelectedInfo()}
						</Listbox.Button>
						<Transition
							show={open}
							enter="transition duration-150 ease-in"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition duration-150 ease-out"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Listbox.Options
								className="absolute grid grid-cols-3 gap-2 top-12 -left-36 w-max p-4 bg-[#201d1d] rounded-md shadow-lg"
								static
							>
								{genresData.map((genre) => (
									<Listbox.Option
										key={genre.id}
										value={genre.id}
										as={Fragment}
									>
										{({ active, selected }) => (
											<li
												className={`${
													selected || active
														? "bg-accent-colour/85 rounded-md text-white"
														: "text-white"
												}  cursor-pointer select-none p-1.5 flex justify-center`}
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
