import { TodoItem } from './todoItem';

export class Category {

    id: number;
    name: string;
    toDoItemList:TodoItem[];

    constructor(id?: number, name?: string) {
        this.id = id;
        this.name = name;
    }
}