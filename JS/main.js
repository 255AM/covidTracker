const usCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv"
const stateCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
const countyCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
let usData = []
let allStateData = []
let countyData = []
let selectedStateData = []
let uniqueStates = []
let x = 0

d3.csv(usCsv, function(data) {
  usData.push(data)
}).then(makeUsChart)

d3.csv(stateCsv, function(data) {
  allStateData.push(data)
}).then(makeStateChart)

function makeUsChart(){
  usDates = usData.map(function(d) {return d.date});
  usCases = usData.map(function(d) {return d.cases})
  usDeaths = usData.map(function(d) {return d.deaths})
  
  var usChart = new Chart('usChart', {
    type: "line",
    data: {
      datasets: [{
          data: usCases,
          drawBorder: true,
          pointBorderColor: "",
          pointBackgroundColor: "",
          borderColor: 'orange',
          borderWidth: 0,
          pointBorderWidth: 0,
          pointHoverRadius: 20,
          pointHoverBackgroundColor: "darkorange",
          pointHoverBorderColor: "",
          pointHoverBorderWidth: 1,
          pointRadius: 0,
          pointHitRadius: 5,
          pointBackgroundColor: '',
          backgroundColor: 'red',
          label: 'US Cases',
          fill: false,
          
          
      }],
      labels: usDates
    },
    options: {
      maintainAspectRatio: false,
      tooltips: {
        enabled:true,
        mode: 'index',
        intersect: true
      },
      scales:{
        yAxes:[
        {
          id: 'left-y-axis',
          type: 'linear',
          position: 'left',
          ticks: {
            display: true,
            drawTicks: true,
            padding: 15,
            autoSkip: false,
            maxTicksLimit: 5,
            suggestedMin: 5

          },
          gridLines: {
            display: true,
            drawTicks: false,
            drawBorder: true,
            drawOnChartArea: false,
            lineWidth: 2,
            color: 'grey'
          }
        },{
          id: 'dummyRightForFormat',
          type: 'linear',
          position: 'right',
          ticks: {
            display: false,
            drawTicks: false,
          },
          gridLines: {
            display: true,
            drawTicks: false,
            drawBorder: true,
            drawOnChartArea: false,
            borderWidth: 5,
            lineWidth: 2,
            color: 'grey'
            
          },
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            tooltips: {
              enabled: false,
              mode: 'index'
           }
        },
      }
        
        ],
        xAxes:[
          {
          id: 'date',
          type: 'time',
            time: {
              unit: 'month'
            },

          gridLines: {
            display: true,
            drawTicks: false,
            drawBorder: true,
            drawOnChartArea: false,
            lineWidth: 2,
            color: 'grey'
          },
          ticks: {
            display: true,
            drawTicks: false,
            padding: 15,
            autoSkip: false,
            maxTicksLimit: 20,
            
            
          },
          display: true
        },
        {
          id: 'dummyTopForFormat',
          type: 'linear',
          position: 'top',
          ticks: {
            display: false,
            drawTicks: false,
          },
          gridLines: {
            display: true,
            drawTicks: false,
            drawBorder: true,
            drawOnChartArea: false,
            borderWidth: 5,
            lineWidth: 2,
            color: 'grey'
            
          },
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
      }
        

      
      ] 
      }
    }
  });
}

function makeStateChart(value){
  console.log('im here', typeof value)
  if (x==0){value = 'Alabama'; x=+1}

  selectedStateData = []
  for (index = 0 ; index <= allStateData.length-1; index++){
      if (allStateData[index].state == value){
          selectedStateData.push(allStateData[index])
      }                   
  } 
  stateDates = selectedStateData.map(function(d) {return d.date});
  stateCases = selectedStateData.map(function(d) {return d.cases})
  stateDeaths = selectedStateData.map(function(d) {return d.deaths})
  stateName = value
  usStates = allStateData.map(function(d) {return d.state})
  uniqueStates = usStates.filter(onlyUnique).sort(); 
  
  let stateSelector = uniqueStates;     
  let sel = document.getElementById('statesList');
    for(let i = 0; i < uniqueStates.length; i++) {
      let opt = document.createElement('option');
      opt.innerHTML = uniqueStates[i];
      opt.value = uniqueStates[i];
      sel.appendChild(opt);
    }

  window.stateChart = new Chart('stateChart', {
    type: "line",
    data: {
      datasets: [{
        data: stateCases,
        drawBorder: true,
        pointBorderColor: "",
        pointBackgroundColor: "",
        borderColor: 'orange',
        borderWidth: 0,
        pointBorderWidth: 0,
        pointHoverRadius: 20,
        pointHoverBackgroundColor: "darkorange",
        pointHoverBorderColor: "",
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        pointHitRadius: 5,
        pointBackgroundColor: '',
        backgroundColor: 'red',
        label: stateName + ' Cases',
        fill: false,
        label: stateName + ' Cases',
        fill: false,
      }],
      labels: stateDates
    },
    
    options: {
      maintainAspectRatio: false,
      scales:{
        yAxes:[
        {
          id: 'left-y-axis',
          type: 'linear',
          position: 'left',
          ticks: {
            display: true,
            drawTicks: true,
            padding: 15,
            autoSkip: false,
            maxTicksLimit: 5,
            suggestedMin: 5
          },
          gridLines: {
            display: true,
            drawTicks: false,
            drawBorder: true,
            drawOnChartArea: false,
            lineWidth: 2,
            color: 'grey',
          },
          tooltips: {
            mode: 'index'
         }

        },{
          id: 'dummyRightForFormat',
          type: 'linear',
          position: 'right',
          ticks: {
            display: false,
            drawTicks: false,
            
          },
          gridLines: {
            display: true,
            drawTicks: false,
            drawBorder: true,
            drawOnChartArea: false,
            borderWidth: 5,
            lineWidth: 2,
            color: 'grey'
            
          },
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
      }
        
        ],
        xAxes:[
          {
          id: 'date',
          type: 'time',
            time: {
              unit: 'month'
            },

          gridLines: {
            display: true,
            drawTicks: false,
            drawBorder: true,
            drawOnChartArea: false,
            lineWidth: 2,
            color: 'grey'
          },
          ticks: {
            display: true,
            drawTicks: false,
            padding: 15,
            autoSkip: true,
            maxTicksLimit: 20
          },
          display: true
        },
        {
          id: 'dummyTopForFormat',
          type: 'linear',
          position: 'top',
          ticks: {
            display: false,
            drawTicks: false,
          },
          gridLines: {
            display: true,
            drawTicks: false,
            drawBorder: true,
            drawOnChartArea: false,
            borderWidth: 5,
            lineWidth: 2,
            color: 'grey'
            
          },
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
      }
        

      
      ] 
      }
    }
  });
}


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function destroyChart(stateChart){
  window.stateChart.destroy()
  console.log('yup')
}
