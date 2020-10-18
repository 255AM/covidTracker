const usCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv"
const stateCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
const countyCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
let usData = []
let stateData = []
let countyData = []


function saveData(location, fileName ){
    d3.csv(location, function(data) {
    fileName.push(data)
    console.log('donesavedata')
});

}

saveData(usCsv, usData)
saveData(stateCsv, stateData)
saveData(countyCsv, countyData)
 


function makeChart(usData) {
    var usDates = usData.map(function(d) {return d.date});
    var usCases = usData.map(function(d) {return d.cases});
    console.log('donemakechartssssssssssssssssa')
    var usChart = new Chart('usChart', {
      type: 'bar',
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
  makeChart(usData)
  