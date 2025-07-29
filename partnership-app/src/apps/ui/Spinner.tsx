import { type CSSProperties } from "react";

export interface SpinnerProps {
    size?: CSSProperties["width"];
    borderSize?: CSSProperties["borderWidth"];
    color?: string;
}

export const Spinner = ({ color, size = "20px", borderSize = "2px" }: SpinnerProps) => {
    const spinnerStyle: CSSProperties = {
        width: size,
        height: size,
        border: `${borderSize} solid ${color ?? "#fff"}`,
        borderBottomColor: "transparent",
        borderRadius: "50%",
        display: "inline-block",
        boxSizing: "border-box",
        animation: "rotation 1s linear infinite",
    };

    return (
        <>
            <span style={spinnerStyle} />
            <style>
                {`
                    @keyframes rotation {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}
            </style>
        </>
    );
};
