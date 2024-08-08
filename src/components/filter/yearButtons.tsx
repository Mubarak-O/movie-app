import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { yearOptions, getYearNameById } from "../../utils/utility";

interface YearButtonProps {
	onYearSelect: (selected: string) => void;
	value: string;
}

export const YearButton = ({ value, onYearSelect }: YearButtonProps) => {
	return (
		<>
			<Listbox value={value} onChange={onYearSelect}>
				{({ open }) => (
					<>
						<Listbox.Button>
							{value ? getYearNameById(value) : "Year"}
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
								className="absolute z-10 top-12 -left-28 w-max grid grid-cols-4 gap-2 p-4 bg-[#201d1d] rounded-md shadow-lg"
								static
							>
								{yearOptions.map((year) => (
									<Listbox.Option
										key={year.id}
										value={year.id}
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
												{year.year}
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
