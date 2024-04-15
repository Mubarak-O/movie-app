import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { sortOptions, getOptionNameById } from "../../utils/utility";

interface SortButtonProps {
	onSortingSelect: (selectedOption: string) => void;
}

export const SortButton = ({ onSortingSelect }: SortButtonProps) => {
	const [selectedOption, setSelectedOption] = useState<string | null>("");

	const handleSelectedOption = (selectedOption: string) => {
		setSelectedOption(selectedOption);
		onSortingSelect(selectedOption);
	};

	return (
		<>
			<Listbox value={selectedOption} onChange={handleSelectedOption}>
				{({ open }) => (
					<>
						<Listbox.Button>
							{selectedOption
								? getOptionNameById(selectedOption)
								: "Sort By"}
						</Listbox.Button>
						<Transition show={open}>
							<Listbox.Options
								static
								className="flex flex-col space-y-1  absolute z-10 top-[15%] right-[20%] mt-2 p-4 bg-slate-700 rounded-md shadow-lg"
							>
								{sortOptions.map((option) => (
									<Listbox.Option
										key={option.id}
										value={option.id}
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
												{option.name}
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
