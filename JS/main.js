const usCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv"
const stateCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
const countyCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
let usData = []
let stateData = []
let countyData = []
let inData = []

d3.csv(usCsv, function(data) {
  usData.push(data)
}).then(makeUsChart)

d3.csv(stateCsv, function(data) {
  stateData.push(data)
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
  for (index = 0 ; index <= stateData.length-1; index++){
    if (stateData[index].fips == 18){
        inData.push(stateData[index])
    }                   
} 
  stateDates = inData.map(function(d) {return d.date});
  stateCases = inData.map(function(d) {return d.cases})

  var stateChart = new Chart('stateChart', {
    type: "bar",
    options: {
      maintainAspectRatio: false,
      legend: {
        display: true
      }
    },
    data: {
      labels: stateDates,
      datasets: [
        {
          data: stateCases
        }
      ]
    }
  });
}