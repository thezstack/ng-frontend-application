import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

const fetcher = async (): Promise<Product[]> => {
	const response = await fetch('/api/products');
	const data = await response.json();
	return data;
};

const CardContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 20px;
`;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
	overflow: hidden;
	width: 400px;
	height: auto;
`;

const Thumbnail = styled(Image)`
	width: 100%;
	height: 200px;
	object-fit: cover;
`;

const Content = styled.div`
	display: flex;
	flex-wrap: wrap;
	list-style: disc;
	list-style-position: inside;
	padding-left: 10px;
`;

const Title = styled.h2`
	font-size: 1.2rem;
	font-weight: bold;
	margin-bottom: 10px;
`;

const CardItem = styled.p`
	flex-basis: 50%;
	font-size: 1rem;
	color: #666;
`;

const Loading = styled.div`
	color: #fff;
`;

const Error = styled.div`
	color: red;
`;

export default function CardList() {
	const { isLoading, isError, data } = useQuery<Product[]>(['product'], fetcher);
	console.log(data);
	if (isLoading) {
		return <Loading>Loading...</Loading>;
	}

	if (isError) {
		return <Error>Error fetching data</Error>;
	}

	return (
		<CardContainer>
			{data?.map((product) => (
				<Card key={product.id}>
					<Thumbnail src={product.thumbnail} width={300} height={400} alt={product.title} />
					<Link href={`/product/${product.id}`}>
						<Title>{product.title}</Title>{' '}
					</Link>
					<Content>
						<CardItem>Category: {product.category}</CardItem>
						<CardItem>Brand: {product.brand}</CardItem>
						<CardItem>Price: {product.price}</CardItem>
						<CardItem>Rating: {product.rating}</CardItem>
						<CardItem>Stock: {product.stock}</CardItem>
						<CardItem>Discount: {product.discountPercentage}</CardItem>
					</Content>
				</Card>
			))}
		</CardContainer>
	);
}
