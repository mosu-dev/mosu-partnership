import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { RootLayout } from "@/apps/ui/RootLayout";

import FormPage from "@/pages/FormPage";
import HomePage from "@/pages/HomePage";
import SubmitSuccessPage from "@/pages/SubmitSuccessPage";

const routes = createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/success" element={<SubmitSuccessPage />} />
    </Route>
);

export const router = createBrowserRouter(routes);
