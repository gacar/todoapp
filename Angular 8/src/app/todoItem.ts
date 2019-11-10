import { Category } from './category';

export class TodoItem {

    id: number;
    name: string;
    description: string;
    deadline: Date;
    status: boolean;

    category: Category;

    constructor(id?: number, name?: string, category?: Category) {
        this.id = id;
        this.name = name;
        this.category = category;
    }
}