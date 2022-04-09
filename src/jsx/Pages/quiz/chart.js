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
 
function Chart() {
	// let namesOfTopFive = JSON.parse(localStorage.getItem('userStats'));

	// if(namesOfTopFive !== null){
	// namesOfTopFive=namesOfTopFive.sort((a,b) => a-b).splice(0,5);
	// }
return (
	<div className="App">
	<h1>STATS OF GAME</h1>
	<div style={{ maxWidth: "200px" }}>
		<Bar
		data={{
			// Name of the variables on x-axies for each bar
			labels: JSON.parse(localStorage.getItem('userStats')),
			datasets: [
			{
				// Label for bars
				label: "TOP 5 SCORERS",
				// Data or value of your each variable
				data: JSON.parse(localStorage.getItem('scores')),
				// Color of each bar
				backgroundColor: ["aqua", "green", "red", "yellow"],
				// Border color of each bar
				borderColor: ["aqua", "green", "red", "yellow"],
				borderWidth: 0.5,
			},
			],
		}}
		// Height of graph
		height={200}
		options={{
			maintainAspectRatio: false,
			scales: {
			yAxes: [
				{
				ticks: {
					// The y-axis value will start from zero
					beginAtZero: true,
				},
				},
			],
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
