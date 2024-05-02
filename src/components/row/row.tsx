import { useEffect, useState } from "react";
import { savedMedia } from "../../types/types";
import { RowItem } from "./rowItem";
import { UserAuth } from "../../context/authContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface RowProps {
	title: string;
}

export const Row = ({ title }: RowProps) => {
	const [media, setMedia] = useState<savedMedia[]>([] as savedMedia[]);
	const { user } = UserAuth();

	useEffect(() => {
		onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
			setMedia(doc.data()?.savedMedia);
		});
	}, [user?.email]);

	const movieRef = doc(db, "users", `${user?.email}`);

	const removeMedia = async (passedId: string) => {
		try {
			const result = media.filter((item) => item.id !== passedId);
			await updateDoc(movieRef, {
				savedMedia: result,
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="mx-auto max-w-[75%] space-y-4">
			<h1 className="text-2xl text-white font-bold font-rubik">
				{title}
			</h1>
			{media.length > 0 ? (
				<div className="relative flex items-center">
					<div
						id={"slider"}
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
