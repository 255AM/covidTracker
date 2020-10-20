const usCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv"
const stateCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
const countyCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
let usData = []
let allStateData = []
let countyData = []
let selectedStateData = []
let uniqueStates = []

d3.csv(usCsv, function(data) {
  usData.push(data)
}).then(makeUsChart)

d3.csv(stateCsv, function(data) {
  allStateData.push(data)
}).then(makeStateChart)

window.onload = makeStateChart

 
  
 function makeUsChart(){
  usDates = usData.map(function(d) {return d.date});
  usCases = usData.map(function(d) {return d.cases})
  usDeaths = usData.map(function(d) {return d.deaths})
  
  var usChart = new Chart('usChart', {
    type: "bar",
    data: {
      datasets: [{
          data: usCases,
          label: 'US Cases',
          yAxisID: 'left-y-axis'
      },  {
          data: usDeaths,
          label: 'US Deaths',
          yAxisID: 'right-y-axis'
      }],
      labels: usDates
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
            
        }],
        xAxis:[{
          type: 'time',
          time: {
            unit: 'month',
                }
        
        }] 
          
      }
    }
  });
}
function makeStateChart(){
  
  for (index = 0 ; index <= allStateData.length-1; index++){
      if (allStateData[index].state == 'Alabama'){
          selectedStateData.push(allStateData[index])
      }                   
} 
  stateDates = selectedStateData.map(function(d) {return d.date});
  stateCases = selectedStateData.map(function(d) {return d.cases})
  stateDeaths = selectedStateData.map(function(d) {return d.deaths})
  stateName = 'Alabama'
  usStates = allStateData.map(function(d) {return d.state})
  uniqueStates = usStates.filter(onlyUnique).sort(); 
  
  let stateSelctor = uniqueStates;     
  let sel = document.getElementById('statesList');
    for(let i = 0; i < uniqueStates.length; i++) {
    let opt = document.createElement('option');
    opt.innerHTML = uniqueStates[i];
    opt.value = uniqueStates[i];
    sel.appendChild(opt);
}
  if (stateChart == true){
    stateChart.destroy()
  }

  var stateChart = new Chart('stateChart', {
    type: "bar",
    data: {
      datasets: [{
          data: stateCases,
          label: stateName + ' Cases',
          yAxisID: 'left-y-axis'
      },  {
          data: stateDeaths,
          label: stateName + ' Deaths',
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
              max:Number(stateDeaths[stateDeaths.length-1])*3,
              min: 0,
               
            }
        }],
        xAxis:[{
          type: 'time',
          time: {
            unit: 'month',
                }
        
        }] 
          
      }
    }
  });
}



function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

