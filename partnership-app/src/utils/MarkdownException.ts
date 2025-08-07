export class MarkdownException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "MarkdownException";
        Object.setPrototypeOf(this, MarkdownException.prototype);
    }
}

export class MarkdownNotFoundException extends MarkdownException {
    constructor() {
        super(`해당 날짜에 해당하는 문서를 찾을 수 없습니다.`);
        this.name = "MarkdownNotFoundException";
        Object.setPrototypeOf(this, MarkdownNotFoundException.prototype);
    }
}

export class MarkdownEmptyDateException extends MarkdownException {
    constructor() {
        super("날짜가 비어 있습니다. YYYY-MM-DD 형식이어야 합니다.");
        this.name = "MarkdownEmptyDateException";
        Object.setPrototypeOf(this, MarkdownEmptyDateException.prototype);
    }
}

export class MarkdownInvalidDateException extends MarkdownException {
    constructor() {
        super(`날짜 형식이 잘못되었습니다. YYYY-MM-DD 형식이어야 합니다.`);
        this.name = "MarkdownInvalidDateException";
        Object.setPrototypeOf(this, MarkdownInvalidDateException.prototype);
    }
}

export class MarkdownDateMismatchException extends MarkdownException {
    constructor(examYear: number, examMonth: number, examDate: number) {
        super(`날짜 ${examYear}-${examMonth}-${examDate}에 해당하는 문서를 찾을 수 없습니다.`);
        this.name = "MarkdownDateMismatchException";
        Object.setPrototypeOf(this, MarkdownDateMismatchException.prototype);
    }
}

export class MarkdownProcessingException extends MarkdownException {
    constructor(error: Error) {
        super(`문서 처리 중 오류: ${error.message}`);
        this.name = "MarkdownProcessingException";
        Object.setPrototypeOf(this, MarkdownProcessingException.prototype);
    }
}

export class MarkdownExpiredFormException extends MarkdownException {
    constructor() {
        super("만료된 폼입니다.");
        this.name = "MarkdownExpiredFormException";
        Object.setPrototypeOf(this, MarkdownExpiredFormException.prototype);
    }
}
