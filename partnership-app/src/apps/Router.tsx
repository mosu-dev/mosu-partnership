import { RootLayout } from "@/apps/ui/RootLayout";
import FormPage from "@/pages/FormPage";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const routes = createRoutesFromElements(
    <Fragment>
        <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/form" element={<FormPage />} />
        </Route>
    </Fragment>
);

export const router = createBrowserRouter(routes);
