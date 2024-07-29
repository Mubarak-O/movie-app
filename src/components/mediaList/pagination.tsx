import {
	PiCaretLeftBold,
	PiCaretDoubleLeftBold,
	PiCaretRightBold,
	PiCaretDoubleRightBold,
} from "react-icons/pi";

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
	const totalPages: number = Math.ceil(totalCards / cardsPerPage);
	const maxPageButtons = 5;

	const getPageRange = () => {
		let start = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
		let end = Math.min(totalPages, start + maxPageButtons - 1);

		if (end - start + 1 < maxPageButtons) {
			start = Math.max(1, end - maxPageButtons + 1);
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	const pageRange: number[] = getPageRange();

	return (
		<div className="pg-container">
			{currentPage > 1 && (
				<>
					<button
						onClick={() => setCurrentPage(1)}
						className="pg-button-nav"
						id="first"
					>
						<PiCaretDoubleLeftBold size={32} />
					</button>
					<button
						onClick={() => setCurrentPage(currentPage - 1)}
						className="pg-button-nav"
					>
						<PiCaretLeftBold size={35} />
					</button>
				</>
			)}
			{pageRange.map((page) => (
				<button
					key={page}
					onClick={() => setCurrentPage(page)}
					className={`pg-button-num ${
						page === currentPage ? "pg-button-active" : ""
					}`}
				>
					{page}
				</button>
			))}
			{currentPage < totalPages && (
				<>
					<button
						onClick={() => setCurrentPage(currentPage + 1)}
						className="pg-button-nav"
					>
						<PiCaretRightBold size={32} />
					</button>
					<button
						onClick={() => setCurrentPage(totalPages)}
						className="pg-button-nav"
						id="last"
					>
						<PiCaretDoubleRightBold size={35} />
					</button>
				</>
			)}
		</div>
	);
};
