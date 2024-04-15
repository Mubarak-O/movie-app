import { useEffect, useState } from "react";
import { Movie } from "../../types/types";
import axios from "axios";
import { CarouselCard } from "./carouselCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../index.css";

interface CarouselProps {
	fetchUrl: string;
}

export const Carousel = ({ fetchUrl }: CarouselProps) => {
	const [movies, setMovies] = useState<Movie[]>([]);

	useEffect(() => {
		axios.get(fetchUrl).then((response) => {
			setMovies(response.data.results);
		});
	}, []);

	const carouselCards = movies.map((_, index) => (
		<CarouselCard movie={movies[index]} />
	));

	return (
		<div className="">
			<Swiper
				pagination={true}
				grabCursor={true}
				modules={[Pagination, Navigation, Autoplay]}
				autoplay={{
					delay: 15000,
					disableOnInteraction: false,
				}}
				className="rounded-md"
			>
				{carouselCards.map((card, index) => (
					<SwiperSlide key={index}>{card}</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
