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
						<Transition show={open}>
							<Listbox.Options
								static
								className="absolute z-10 top-[15%] right-[41%] grid grid-cols-4 gap-2 mt-2 p-2 bg-[#201d1d] rounded-md shadow-lg"
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
														? "bg-accent-colour rounded-md text-white"
														: "text-white"
												}  cursor-pointer select-none p-2`}
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
