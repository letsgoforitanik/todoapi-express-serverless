import express, { Request, Response } from "express";
import { DynamoDB } from "aws-sdk";
import { generateToken, authorize } from "./jwt-auth";
import { generateId, getCurrentTime } from "./util";

const todoApiRouter = express.Router();
const authRouter = express.Router();

const dynamoClient = new DynamoDB.DocumentClient();

// generate jwt token

authRouter.post('/create', createToken);

function createToken(req: Request, res: Response) {

    const { email, password } = req.body;

    if (email !== 'abc@xyz.com' || password !== '12345') {
        return res.status(404).json({ message: 'User not found' });
    }

    const token = generateToken({ email });

    return res.json({ token });
}


// create a todo

todoApiRouter.post('/', authorize(), createTodo);

async function createTodo(req: Request, res: Response) {

    const user = req.user as any;
    const payload = req.body as TodoCreatePayload;

    const newTodo: Todo = {
        id: generateId(),
        userId: user.id.toString(),
        completed: payload.completed,
        title: payload.title,
        createdAt: getCurrentTime()
    };

    await dynamoClient.put({ TableName: 'todo', Item: newTodo }).promise();
    return res.status(201).json({ message: 'Todo created successfully' });

}

// fetch all todos

todoApiRouter.get('/', authorize(), getTodos);

async function getTodos(req: Request, res: Response) {
    const response = await dynamoClient.scan({ TableName: 'todo' }).promise();
    return res.json(response.Items);
}

// fetch a particular todo by id 

todoApiRouter.get('/:id', authorize(), getTodoById);

async function getTodoById(req: Request, res: Response) {
    const todoId = req.params.id;
    const response = await dynamoClient.get({ TableName: 'todo', Key: { id: todoId } }).promise();
    return res.json(response.Item);
}


export { todoApiRouter, authRouter };