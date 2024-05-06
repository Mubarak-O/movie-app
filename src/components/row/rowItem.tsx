import { Link } from "react-router-dom";
import { dbMedia } from "../../types/types";
import { AiOutlineClose } from "react-icons/ai";

interface RowItemProps {
	media: dbMedia;
	handleRemoveMedia: (id: string) => Promise<void>;
}

export const RowItem = ({ media, handleRemoveMedia }: RowItemProps) => {
	return (
		<div className="inline-block p-5" tabIndex={0}>
			<div className="relative group">
				<AiOutlineClose
					onClick={() => handleRemoveMedia(media.id)}
					size={30}
					className="fill-white absolute group-hover:z-10 right-1 top-1 cursor-pointer"
				/>
				<Link to={`../${media.type}/${media.id}`} className="">
					<img
						className="rounded-xl drop-shadow-lg group-hover:opacity-20 transition-opacity duration-300"
						src={`https://image.tmdb.org/t/p/w300/${media?.img}`}
						alt={media?.title}
					/>
				</Link>
			</div>
			<div className="p-2">
				<p className="truncate max-w-[16ch] font-maven text-white font-semibold text-2xl">
					{media.title}
				</p>
			</div>
		</div>
	);
};
