import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { RootLayout } from "@/apps/ui/RootLayout";

import ErrorPage from "@/apps/ui/ErrorPage";
import FormPage from "@/pages/FormPage";
import HomePage from "@/pages/HomePage";
import SubmitSuccessPage from "@/pages/SubmitSuccessPage";

const routes = createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="/form" element={<FormPage />} errorElement={<ErrorPage />} />
        <Route path="/success" element={<SubmitSuccessPage />} />
    </Route>
);

export const router = createBrowserRouter(routes);
