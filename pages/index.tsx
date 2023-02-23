import Head from 'next/head';
import CardList from '../components/CardList';
export default function Home() {
	return (
		<>
			<Head>
				<title>Node Guardians</title>
				<meta name='description' content='Node Guardians frontend' />
			</Head>

			<main>
				<CardList />
			</main>
		</>
	);
}
