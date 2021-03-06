import { Request, Response } from 'express';
import knex from '../databases/connection';

class ItemsController {
    async index (req: Request, res: Response) {
        const items = await knex('items').select('*');

        const serializedItems = items.map(item => ({
            id: item.id,
            title: item.title,
            image_url: `http://192.168.0.15:3333/uploads/${item.image}`,
        }))

        return res.json(serializedItems);
    }
}

export default ItemsController;