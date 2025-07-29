export function isValidPayload(payload) {
    if (!payload || typeof payload !== "object") {
        return false;
    }

    const requiredFields = [
        "orgName",
        "password",
        "userName",
        "gender",
        "birth",
        "phoneNumber",
        "subject",
        "subject2",
        "lunch",
        "area",
        "schoolName",
        "admissionTicket",
    ];

    for (const field of requiredFields) {
        if (!payload.hasOwnProperty(field) || payload[field] === null || payload[field] === "") {
            return false;
        }
    }

    return true;
}
