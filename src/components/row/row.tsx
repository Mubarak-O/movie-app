import axios from "axios";
import { useEffect, useState } from "react";
import { Movie } from "../../types/types";
import { RowItem } from "./rowItem";

interface RowProps {
	title: string;
	fetchUrl: string;
}

export const Row = ({ title, fetchUrl }: RowProps) => {
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		axios.get(fetchUrl).then((response) => {
			setMovies(response.data.results);
		});
	}, []);

	return (
		<div className="pl-10">
			<h1 className="text-2xl text-white font-bold font-rubik">
				{title}
			</h1>
			<div className="relative flex items-center group">
				<div
					id={"slider"}
					className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth bg-black/20 rounded-md space-x-2"
					aria-label="Scrollable content with movie posters and their respective titles"
					tabIndex={0}
				>
					{movies.map((movie, index) => (
						<RowItem key={index} movie={movie} />
					))}
				</div>
			</div>
		</div>
	);
};
