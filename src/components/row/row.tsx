import toast from "react-hot-toast";
import { dbMedia } from "../../types/types";
import { RowItem } from "./rowItem";
import { DocumentData, DocumentReference, updateDoc } from "firebase/firestore";

interface RowProps {
	title: string;
	media: dbMedia[];
	userRefDoc: DocumentReference<DocumentData, DocumentData>;
	type: "saved" | "bookmarked";
}

export const Row = ({ title, media, userRefDoc, type }: RowProps) => {
	const removeMedia = async (passedId: string) => {
		try {
			const result = media.filter((item) => item.id !== +passedId);
			if (type === "saved") {
				await updateDoc(userRefDoc, {
					savedMedia: result,
				});
				toast.success("Removed Item from your favourites list");
			} else {
				await updateDoc(userRefDoc, {
					toWatchMedia: result,
				});
				toast.success("Removed Item from your to watch later list");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="mx-auto max-w-[75%] space-y-4 my-10">
			<h1 className="text-2xl text-white font-bold font-rubik">
				{title}
			</h1>
			{media.length > 0 ? (
				<div className="relative flex items-center">
					<div
						id="slider"
						className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth bg-black/60 rounded-md space-x-2"
						aria-label="Scrollable content with movie posters and their respective titles"
						tabIndex={0}
					>
						{media.map((item, index) => (
							<RowItem
								key={index}
								media={item}
								handleRemoveMedia={removeMedia}
							/>
						))}
					</div>
				</div>
			) : (
				<p className="font-maven text-white">No shows added yet!</p>
			)}
		</div>
	);
};
