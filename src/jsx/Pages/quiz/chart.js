import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);
function combineTwoArraysIntoObjectArray(arr1, arr2) {
	let topFive = []


	for (let i = 0; i < arr1.length; i++) {
		let obj = new Object({})
		obj.userStats = arr1[i];
		obj.scores = arr2[i];
		topFive.push(obj)

	}
	return topFive;
};
function Chart() {
	// this chart will show only the top 5 scorers that saved on local storage.
	let topFive;
	let namesOfTopFive;
	let scoresOfTopFive;
	let namesOfUsers = JSON.parse(localStorage.getItem('userStats'));
	let scoresOfUsers = JSON.parse(localStorage.getItem('scores'));
	// if the number of usres are above 5, I need to filter the non relevant users.
	if (namesOfUsers !== null && namesOfUsers.length > 5) {
		scoresOfUsers = scoresOfUsers.map(data => parseInt(data));
		topFive = combineTwoArraysIntoObjectArray(namesOfUsers, scoresOfUsers);
		topFive = topFive.sort((a, b) => b.scores - a.scores).splice(0, 5);
		namesOfTopFive = topFive.map(data => data.userStats);
		scoresOfTopFive = topFive.map(data => data.scores);
	}

	return (
		<div className="App" style={{ position: "relative" }}>
			<h1>STATS - TOP 5 SCORERS</h1>
			<div style={{ position: "absolute", top: "27px", left: "54px", width: "66px", height: "21px", background: !localStorage.getItem('isDark') ? "#282c34" : localStorage.getItem('isDark') && localStorage.getItem('isDark') == "true" ? "#282c34" : "#dee4e7" }}></div>
			<div style={{ maxWidth: "200px" }}>
				<Bar
					data={{
						labels: namesOfTopFive === undefined ? JSON.parse(localStorage.getItem('userStats')) : namesOfTopFive,
						datasets: [
							{
								// Label for bars
								label: "",
								data: scoresOfTopFive === undefined ? JSON.parse(localStorage.getItem('scores')) : scoresOfTopFive,

								// Color of each bar
								backgroundColor: ["aqua", "green", "red", "yellow", "black"],
								// Border color of each bar
								borderColor: ["aqua", "green", "red", "yellow", "black"],
								borderWidth: 0.5,
							},
						],
					}}
					// Height of graph
					height={200}
					options={{
						maintainAspectRatio: false,
						scales: {
				
						},
						legend: {
							labels: {
								fontSize: 15,
							},
						},
					}}
				/>
			</div>
		</div>
	);
}

export default Chart;
