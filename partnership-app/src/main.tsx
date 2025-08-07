import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "@/apps/styles/fonts.css";
import "@/apps/styles/globals.css";
import ErrorBoundary from "./apps/ui/ErrorBoundary.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ErrorBoundary fallback={() => <div className="text-center">만료된 신청 폼입니다.</div>}>
            <App />
        </ErrorBoundary>
    </StrictMode>
);
