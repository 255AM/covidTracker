const usCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv"
const stateCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
const countyCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
let usData = []
let usDates = []

d3.csv("https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv", function(data) {
  usData.push(data)
  
  
//usData.forEach(element => usDate.push(element.date));
}).then(makeChart)  
  
function makeChart(){
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
