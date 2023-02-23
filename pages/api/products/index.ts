import { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@/types/product';
export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	try {
		// Save the data to the collection
		const getRes = await fetch(`https://dummyjson.com/products?offset=0&limit=6`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((data) => data.products);

		if (getRes.code) {
			throw new Error('An error occurred while fetching the data');
		}

		const formattedToProducts = getRes.map((data: Product) => {
			return {
				id: data.id,
				category: data.category.replace('-', ' '), // 'home-decoration' => 'home decoration'
				brand: data.brand,
				title: data.title,
				rating: Math.floor(data.rating),
				stock: data.stock * 100,
				price: data.price,
				discountPercentage: data.discountPercentage,
				type: '-',
				thumbnail: data.thumbnail
			};
		});

		// Send a response back to the client
		res.status(200).json(formattedToProducts);
	} catch (error) {
		// If the request fails, an error will be thrown
		console.error(error);

		// Send an error response back to the client
		res.status(500).json('An error occurred while fetching the data');
	}
}
