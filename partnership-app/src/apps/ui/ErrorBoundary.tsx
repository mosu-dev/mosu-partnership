import { Component, type ErrorInfo, type ReactNode } from "react";
import { MarkdownEmptyDateException, MarkdownInvalidDateException } from "@/utils/MarkdownException";

interface Props {
    children: ReactNode;
    fallback: () => ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        console.error("ErrorBoundary에서 에러 캐치:", error);
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("에러 바운더리에서 에러가 잡혔습니다:", error, errorInfo);

        if (error instanceof MarkdownEmptyDateException || error instanceof MarkdownInvalidDateException) {
            console.error("날짜 관련 에러 감지:", error.message);
        }
    }

    handleReset = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            return <div role="alert">{this.props.fallback()}</div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
