import { MosuLogo } from "@/apps/ui/MosuHeader";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
    return (
        <main className="min-h-screen mx-auto p-4 w-full max-w-[640px]">
            <MosuLogo />
            <Outlet />
        </main>
    );
};
