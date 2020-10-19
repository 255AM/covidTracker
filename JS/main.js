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
  var usChart = new Chart('usChart', {
    type: 'bar',
    data: {
      labels: [usDates],
      datasets: [{
        label: '# of Tomatoes',
        data: [usCases],
        backgroundColor: [
          'blue'
          
        ],
        borderColor: [
          'red'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        xAxes: [{
          ticks: {
            maxRotation: 90,
            minRotation: 80
          },
            gridLines: {
            offsetGridLines: false // à rajouter
          }
        },
        {
          
          ticks: {
            maxRotation: 90,
            minRotation: 80
          },
          gridLines: {
            offsetGridLines: false // et matcher pareil ici
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}