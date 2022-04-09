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
  function combineTwoArraysIntoObjectArray (arr1, arr2)  {
	let topFive  = []
	

	for(let i = 0 ; i<arr1.length;i++)
	{
		let obj = new Object({})
		obj.userStats = arr1[i];
		obj.scores = arr2[i];
		topFive.push(obj)

	}
	return topFive;	
 	};
 	function Chart() {
	let topFive;
	let namesOfTopFive;
	let scoresOfTopFive;
	let namesOfUsers = JSON.parse(localStorage.getItem('userStats'));
	let scoresOfUsers = JSON.parse(localStorage.getItem('scores'));
	 if(namesOfUsers !== null && namesOfUsers.length > 5){
	 scoresOfUsers = scoresOfUsers.map(data => parseInt(data));	
	 topFive = combineTwoArraysIntoObjectArray(namesOfUsers,scoresOfUsers);
	 topFive = topFive.sort((a,b) => b.scores - a.scores).splice(0,5);
	 namesOfTopFive = topFive.map(data => data.userStats);
	 scoresOfTopFive = topFive.map(data => data.scores);
	 }

return (
	<div className="App">
	<h1>STATS - TOP 5 SCORERS</h1>
	<div style={{ maxWidth: "200px" }}>
		<Bar
		data={{
			// Name of the variables on x-axies for each bar
			// labels: JSON.parse(localStorage.getItem('userStats')),
			labels: namesOfTopFive === undefined ? JSON.parse(localStorage.getItem('userStats')) : namesOfTopFive ,
			
			datasets: [
			{
				// Label for bars
				label: "",
				// Data or value of your each variable
				// data: JSON.parse(localStorage.getItem('scores')),
				data: scoresOfTopFive === undefined ? JSON.parse(localStorage.getItem('scores')) : scoresOfTopFive ,

				// Color of each bar
				backgroundColor: ["aqua", "green", "red", "yellow" , "black"],
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
