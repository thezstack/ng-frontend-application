describe('Product API', () => {
	it('should return a list of products', () => {
		cy.request('https://dummyjson.com/products?offset=0&limit=6').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.products).to.have.length(6);
		});
	});

	it('should format the products correctly', () => {
		cy.request('https://dummyjson.com/products?offset=0&limit=6').then((response) => {
			const products = response.body.products;
			const formattedProducts = products.map((product) => {
				return {
					id: product.id,
					category: product.category.replace('-', ' '),
					brand: product.brand,
					title: product.title,
					rating: Math.floor(product.rating),
					stock: product.stock * 100,
					price: product.price,
					discountPercentage: product.discountPercentage,
					type: '-',
					thumbnail: product.thumbnail
				};
			});

			cy.wrap(formattedProducts).should('deep.equal', response.body);
		});
	});
});
