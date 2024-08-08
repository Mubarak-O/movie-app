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
								className="flex-col space-y-2 w-full absolute top-12 right-0 p-4 bg-[#201d1d] rounded-md shadow-lg"
								static
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
														? "bg-accent-colour/85 rounded-md"
														: "text-white"
												}  cursor-pointer select-none p-1.5 flex justify-center`}
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
