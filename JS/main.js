const usCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv"
const stateCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
const countyCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
let usData = []
let allStateData = []
let countyData = []
let selectedStateData = []

d3.csv(usCsv, function(data) {
  usData.push(data)
}).then(makeUsChart)

d3.csv(stateCsv, function(data) {
  allStateData.push(data)
}).then(makeStateChart)



  //d3.csv(stateCsv, function(data) {
  //stateData.push(data)  
  
 function makeUsChart(){
  usDates = usData.map(function(d) {return d.date});
  usCases = usData.map(function(d) {return d.cases})

  var chart = new Chart('usChart', {
    type: "bar",
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true
      }
    },
    data: {
      labels: usDates,
      datasets: [
        {
          data: usCases
        }
      ]
    }
  });
}

function makeStateChart(){
  for (index = 0 ; index <= allStateData.length-1; index++){
    if (allStateData[index].fips == 18){
        selectedStateData.push(allStateData[index])
    }                   
} 
  stateDates = selectedStateData.map(function(d) {return d.date});
  stateCases = selectedStateData.map(function(d) {return d.cases})
  stateDeaths = selectedStateData.map(function(d) {return d.deaths})
  stateName = selectedStateData[0].state

  var stateChart = new Chart('stateChart', {
    type: "bar",
    data: {
      datasets: [{
          data: stateCases,
          label: 'Left dataset',
          yAxisID: 'left-y-axis'
      },  {
          data: stateDeaths,
          label: 'Right dataset',
          yAxisID: 'right-y-axis'
      }],
      labels: stateDates
    },
    options: {
      maintainAspectRatio: false,
      scales:{
        yAxes:[{
          id: 'left-y-axis',
          type: 'linear',
          position: 'left'
        }, {
          id: 'right-y-axis',
          type: 'linear',
          position: 'right',
            ticks: {
              max: 9000,
              min: 0,
              stepSize: 1000,
            }

        }],
        xAxis:[{
          id: 'x-axis',
          type: 'linear',
            ticks: {
              max: 12,
              min: 12,
              stepSize: 1
        }
        }] 
          
      }
    }
  });
}

// options: {
//   maintainAspectRatio: false,
//   legend: {
//     display: true
//   }
// },