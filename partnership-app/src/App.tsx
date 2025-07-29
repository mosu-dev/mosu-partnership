import { router } from "@/apps/Router";
import { RouterProvider } from "react-router-dom";

export default function MockTestForm() {
    return <RouterProvider router={router} />;
}
