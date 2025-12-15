import Home from './pages/Home';
import Books from './pages/Books';
import Movies from './pages/Movies';
import About from './pages/About';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Books": Books,
    "Movies": Movies,
    "About": About,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};