import SearchPage from "./pages/SearchPage";
import SeparatePage from "./pages/separatePage";

export const publicRoutes = [
    {
        path: '/main',
        Component: SearchPage
    },
    {
        path: '/search/:text?/:categor?/:order?',
        Component: SearchPage
    },
    {
        path:  '/book/:id',
        Component: SeparatePage 

    },
]