import { MosuLogo } from "@/apps/ui/MosuHeader";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
    return (
        <main className="min-h-screen container mx-auto p-4 max-w-2xl">
            <MosuLogo />
            <Outlet />
        </main>
    );
};
