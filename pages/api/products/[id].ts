import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		// Fetch a product by id
		const product = await fetch(`https://dummyjson.com/products/${String(req.query.id)}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());

		if (product.code) {
			throw new Error('An error occurred while fetching the data');
		}

		const formattedToQuests = {
			id: product.id,
			category: product.category.replace('-', ' '), // 'home-decoration' => 'home decoration'
			brand: product.brand,
			title: product.title,
			rating: Math.floor(product.rating),
			stock: product.stock * 100,
			price: product.price,
			discountPercentage: product.discountPercentage,
			type: '-',
			cover: product.thumbnail
		};

		// Send a response back to the client
		res.status(200).json(formattedToQuests);
	} catch (error) {
		// If the request fails, an error will be thrown
		console.error(error);

		// Send an error response back to the client
		res.status(500).json('An error occurred while fetching the data');
	}
}
