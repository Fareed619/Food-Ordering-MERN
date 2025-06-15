import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthCallbackPage from "./pages/AuthCallbackPage.tsx";
import Profile from "./pages/Profile.tsx";
import ProtectRoute from "./components/ProtectRoute.tsx";
import OrderStatus from "./pages/OrderStatus.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import RestaurantDetails from "./pages/RestaurantDetails.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/order-status" element={<OrderStatus />} />
      <Route path="/search/:city" element={<SearchPage />} />
      <Route path="/detail/:restaurantId" element={<RestaurantDetails />} />

      <Route path="" element={<ProtectRoute />}>
        <Route path="/user-profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  </StrictMode>
);
