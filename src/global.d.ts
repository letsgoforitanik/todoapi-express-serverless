interface Todo {
    id: string;
    userId: string;
    title: string;
    completed: boolean;
    createdAt: string;
}

interface TodoCreatePayload {
    title: string;
    completed: boolean;
}