import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { yearOptions, getYearNameById } from "../../utils/utility";

interface YearButtonProps {
	onYearSelect: (selected: string) => void;
}

export const YearButton = ({ onYearSelect }: YearButtonProps) => {
	const [selectedYears, setSelectedYears] = useState<string | null>("");

	const handleYearSelection = (selected: string) => {
		setSelectedYears(selected);
		onYearSelect(selected);
	};

	return (
		<>
			<Listbox value={selectedYears} onChange={handleYearSelection}>
				{({ open }) => (
					<>
						<Listbox.Button>
							{selectedYears
								? getYearNameById(selectedYears)
								: "Year"}
						</Listbox.Button>
						<Transition show={open}>
							<Listbox.Options
								static
								className="absolute z-10 top-[15%] right-[41%] grid grid-cols-4 gap-2 mt-2 p-2 bg-slate-700 rounded-md shadow-lg"
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
