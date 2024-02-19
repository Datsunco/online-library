import SearchPage from "./pages/SearchPage";
import TestPage from "./pages/TestPage";
import SeparatePage from "./pages/separatePage";

export const publicRoutes = [
    {
        path: '/main',
        Component: SearchPage
    },
    {
        path:  '/book/:id',
        Component: SeparatePage 

    },
    {
        path:  '/test',
        Component: TestPage 

    },
]