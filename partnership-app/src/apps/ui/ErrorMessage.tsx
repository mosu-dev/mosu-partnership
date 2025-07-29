export const ErrorMessage = ({ children }: { children?: string }) => {
    return <p className="text-sm text-red-600">{children}</p>;
};
