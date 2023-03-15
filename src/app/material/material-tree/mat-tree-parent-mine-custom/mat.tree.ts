export interface FoodNode {
    name: string;
    id: string;
    children?: FoodNode[];
}

export const TREE_DATA: FoodNode[] = [
    {
        name: 'Fruit',
        id: '1',
        children: [
            { name: 'Apple', id: '2' },
            { name: 'Banana', id: '3' },
            { name: 'Fruit loops', id: '4' }
        ],
    },
    {
        name: 'Vegetables',
        id: '5',
        children: [
            {
                name: 'Green',
                id: '6',
                children: [{ name: 'Broccoli', id: '7' }, { name: 'Brussels sprouts', id: '8' }],
            },
            {
                name: 'Orange',
                id: '9',
                children: [{ name: 'Pumpkins', id: '10' }, { name: 'Carrots', id: '11' }],
            },
        ],
    },
];