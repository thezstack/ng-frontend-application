import { GetStaticPaths, GetStaticProps } from 'next';
import { Product } from '@/types/product';
import styled from 'styled-components';
import Link from 'next/link';
type ProductPageProps = {
	product: Product; // Define the type of the quest prop
};
type ModalProps = {
	open: boolean;
};
const ModalContainer = styled.div`
  display: block
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ModalContent = styled.div`
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
	margin: 10% auto;
	padding: 20px;
	max-width: 600px;
`;

const CloseButton = styled.button`
	position: absolute;
	top: 10px;
	right: 10px;
	font-size: 1rem;
	font-weight: bold;
	background-color: transparent;
	border: none;
	cursor: pointer;
`;

const QuestContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const QuestTitle = styled.h2`
	font-size: 1.2rem;
	font-weight: bold;
	margin-bottom: 10px;
`;

const QuestItem = styled.p`
	font-size: 1rem;
	color: #666;
`;

const QuestButton = styled.button`
	margin-top: 20px;
	padding: 10px 20px;
	font-size: 1rem;
	font-weight: bold;
	background-color: #fcbf49;
	color: #fff;
	border: none;
	border-radius: 5px;
	cursor: pointer;
`;

const ProductPage = ({ product }: ProductPageProps) => {
	return (
		<ModalContainer>
			<ModalContent>
				<CloseButton>X</CloseButton>
				<QuestContainer>
					<QuestTitle>{product.title}</QuestTitle>
					<QuestItem>Brand: {product.brand}</QuestItem>
					<QuestItem>Category: {product.category}</QuestItem>
					<QuestItem>Rating: {product.rating}</QuestItem>
					<QuestItem>Price: {product.price}</QuestItem>
					<QuestItem>Stock: {product.stock}</QuestItem>
					<Link href={`/`}>
						<QuestButton>Close</QuestButton>
					</Link>
				</QuestContainer>
			</ModalContent>
		</ModalContainer>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const productIds = [1, 2, 3, 4, 5]; // Example product IDs
	const paths = productIds.map((id) => ({ params: { id: id.toString() } }));
	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	try {
		const product = await fetch(`https://dummyjson.com/products/${params.id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => response.json());

		const formattedProduct: Product = {
			id: product.id,
			category: product.category.replace('-', ' '),
			brand: product.brand,
			title: product.title,
			rating: Math.floor(product.rating),
			stock: product.stock * 100,
			price: product.price,
			discountPercentage: product.discountPercentage,
			thumbnail: product.thumbnail,
			type: '-'
		};

		return { props: { product: formattedProduct } };
	} catch (error) {
		console.error(error);
		return { props: { product: null } };
	}
};

export default ProductPage;
