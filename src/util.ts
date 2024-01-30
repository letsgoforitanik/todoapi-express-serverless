import crypto from "crypto";

export function generateId() {
    const timestamp = Date.now().toString();
    const randomBytes = crypto.randomBytes(16).toString('hex');
    return crypto.createHash('sha256').update(timestamp + randomBytes).digest('hex');
}

export function getCurrentTime() {
    return new Date().toUTCString();
}