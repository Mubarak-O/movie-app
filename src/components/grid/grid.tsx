import toast from "react-hot-toast";
import { dbMedia } from "../../types/types";
import { GridItem } from "./gridItem";
import { DocumentData, DocumentReference, updateDoc } from "firebase/firestore";

interface GridProps {
	media: dbMedia[];
	userRefDoc: DocumentReference<DocumentData, DocumentData>;
	type: "saved" | "bookmarked";
}

export const Grid = ({ media, userRefDoc, type }: GridProps) => {
	const removeMedia = async (passedId: number) => {
		try {
			const mediaToRemove = media.find((item) => item.id === passedId);
			const result = media.filter((item) => item.id !== passedId);
			if (type === "saved") {
				await updateDoc(userRefDoc, {
					savedMedia: result,
				});
				toast.success(
					<p>
						Removed <b>{mediaToRemove?.title}</b> from your
						favourites list!
					</p>,
					{
						icon: "🗑️",
					}
				);
			} else {
				await updateDoc(userRefDoc, {
					toWatchMedia: result,
				});
				toast.success(
					<p>
						Removed <b>{mediaToRemove?.title}</b> from your watch
						later list!
					</p>,
					{
						icon: "🗑️",
					}
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col items-center mb-10">
			{media.length > 0 ? (
				<div className="p-8 rounded-xl bg-neutral-950/85 grid grid-cols-4 gap-12 max-w-fit">
					{media.map((item, index) => (
						<GridItem
							key={index}
							media={item}
							handleRemoveMedia={removeMedia}
						/>
					))}
				</div>
			) : (
				<p className="font-maven text-white">No media added yet!</p>
			)}
		</div>
	);
};
