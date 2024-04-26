import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
// import { Searchbar } from "./components/searchbar";
import "./App.css";
import { SignUp } from "./pages/signup";
import { Home } from "./pages/home";
import { Movies } from "./pages/movies";
import { MovieDetails } from "./components/movieDetails";
import { TVShows } from "./pages/tv-shows";
import { TVShowDetails } from "./components/tvshowDetails";
import { AuthContextProvider } from "./context/authContext";
import { LogIn } from "./pages/login";

function App() {
	return (
		<AuthContextProvider>
			<BrowserRouter>
				<Navbar />
				{/* <Searchbar /> */}
				<Routes>
					<Route path={"/"} element={<Home />} />
					<Route path={"/signup"} element={<SignUp />} />
					<Route path={"/login"} element={<LogIn />} />
					<Route path={"/movies"}>
						<Route index element={<Movies />} />
						<Route path={":movieId"} element={<MovieDetails />} />
					</Route>
					<Route path={"tv-shows"}>
						<Route index element={<TVShows />} />
						<Route path={":tvShowId"} element={<TVShowDetails />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthContextProvider>
	);
}

export default App;
