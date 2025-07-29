import { RootLayout } from "@/apps/ui/RootLayout";
import FormPage from "@/pages/FormPage";
import HomePage from "@/pages/HomePage";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import ErrorBoundary from "./ui/ErrorBoundary";
import SubmitSuccessPage from "@/pages/SubmitSuccessPage";

const routes = createRoutesFromElements(
    <Fragment>
        <Route path="/" element={<RootLayout />}>
            <Route
                index
                element={
                    <ErrorBoundary fallback={() => <div className="text-center">만료된 신청 폼입니다.</div>}>
                        <HomePage />
                    </ErrorBoundary>
                }
            />
            <Route path="/form" element={<FormPage />} />
            <Route path="/success" element={<SubmitSuccessPage />} />
        </Route>
    </Fragment>
);

export const router = createBrowserRouter(routes);
