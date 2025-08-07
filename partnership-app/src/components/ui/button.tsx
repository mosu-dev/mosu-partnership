import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { buttonVariants, type ButtonVariantsProps } from "./button-variants";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ComponentProps<"button"> &
    ButtonVariantsProps & {
        asChild?: boolean;
    };

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
    const Comp = asChild ? Slot : "button";

    return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button };
