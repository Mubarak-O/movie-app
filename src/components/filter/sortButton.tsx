import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { sortOptions, getOptionNameById } from "../../utils/utility";

interface SortButtonProps {
	onSortingSelect: (selectedOption: string) => void;
	value: string;
}

export const SortButton = ({ value, onSortingSelect }: SortButtonProps) => {
	return (
		<>
			<Listbox value={value} onChange={onSortingSelect}>
				{({ open }) => (
					<>
						<Listbox.Button>
							{getOptionNameById(value)}
						</Listbox.Button>
						<Transition show={open}>
							<Listbox.Options
								static
								className="flex flex-col space-y-1  absolute z-10 top-[15%] right-[20%] mt-2 p-4 bg-[#201d1d] rounded-md shadow-lg"
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
