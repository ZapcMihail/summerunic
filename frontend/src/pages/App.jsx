import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import SearchPage from "./SearchPage"
import SearchByPars from "./SearchByPars";
import SearchByPartTime from "./SearchByPartTime";
import SearchByFullTime from "./SearchByFullTime"
import SearchByVacancy from "./SearchByVacancy";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SearchPage />,
    },
    {
      path: "/searchByPars",
      element: <SearchByPars />,
    },
    {
      path: "/searchByPartTime",
      element: <SearchByPartTime />,
    },
    {
      path: "/searchByFullTime",
      element: <SearchByFullTime />,
    },
    {
      path: "/searchByVacancy",
      element: <SearchByVacancy />,
    },
  ]);
  return (
      <RouterProvider router={router} />
  );
}

export default App;
