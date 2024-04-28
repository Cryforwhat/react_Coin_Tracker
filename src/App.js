// import Button from "./Button";
// import styles from "./App.module.css";
import { useState, useEffect } from "react";

let coinSelected = false;

function App() {
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState([]);
	const [budget, setBudget] = useState("");
	const [symbol, setSymbol] = useState("");
	const [price, setPrice] = useState("");

	const onChange = (e) => {
		setBudget(e.target.value);
	};

	useEffect(() => {
		fetch("https://api.coinpaprika.com/v1/tickers")
			.then((response) => response.json())
			.then((json) => {
				setCoins(json);
				setLoading(false);
			});
	}, []);

	const onSelectChange = (e) => {
		setPrice(coins[e.target.value].quotes.USD.price);
		setSymbol(coins[e.target.value].symbol);
		coinSelected = true;
	};
	return (
		<div>
			<h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
			<div>
				{!coinSelected ? (
					<strong> Please Select a Coin and Type your Budget</strong>
				) : (
					<strong>
						Your Budget is {budget / price} ({symbol})
					</strong>
				)}
			</div>
			<br />
			Budget: ${" "}
			{!coinSelected ? (
				<input disabled />
			) : (
				<input
					type="number"
					value={budget}
					onChange={onChange}
					placeholder="Your Budget in USD..."
				/>
			)}
			<br />
			<hr />
			{loading ? (
				<strong>Loading...</strong>
			) : (
				<select onChange={onSelectChange}>
					<option value={0}>Please select a coin...</option>
					{coins.map((coin, index) => (
						<option key={coin.id} value={index}>
							({coin.symbol}) {coin.name}: ${coin.quotes.USD.price}
						</option>
					))}
				</select>
			)}
		</div>
	);
}

export default App;
