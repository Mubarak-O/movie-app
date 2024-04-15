interface PaginationProps {
	totalCards: number;
	cardsPerPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
	currentPage: number;
}

export const Pagination = ({
	totalCards,
	cardsPerPage,
	setCurrentPage,
	currentPage,
}: PaginationProps) => {
	let pages = [];

	for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
		pages.push(i);
	}

	return (
		<div className="flex flex-row justify-between max-w-[85%] mx-auto">
			{pages.map((page, index) => {
				return (
					<button
						key={index}
						onClick={() => setCurrentPage(page)}
						className={`pg-button ${
							page === currentPage
								? "bg-accent-colour/35 shadow-xl"
								: ""
						}`}
					>
						{page}
					</button>
				);
			})}
		</div>
	);
};
