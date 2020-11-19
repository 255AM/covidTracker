
const usCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv"
const stateCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"

let usData = []
let allStateData = []
let countyData = []
let selectedStateData = []
let uniqueStates = []
let x = 0
let lastReportedUsDate = x

//bring in data from remote csv using d3 library
d3.csv(usCsv, function(data) {
  usData.push(data)
}).then(makeUsChart)

d3.csv(stateCsv, function(data) {
  allStateData.push(data)
  //console.log('im here state')
}).then(makeStateChart)

function makeUsChart(){
  usDates = usData.map(function(d) {return d.date})
  usCases = usData.map(function(d) {return d.cases})
  usDeaths = usData.map(function(d) {return d.deaths})

  newUsCases = []  
  for (index = 1 ; index <= usCases.length-1; index++){
      newUsCases.push(usCases[index] - usCases[index - 1])
    } 
  
  newUsDeaths = []  
  for (index = 1 ; index <= usDeaths.length-1; index++){
      newUsDeaths.push(usDeaths[index] - usDeaths[index - 1])
    } 

  let mostRecentUsDeaths = numberWithCommas(mostRecent(usDeaths))
  let mostRecentUsCases = numberWithCommas(mostRecent(usCases))
  let mostRecentNewUsCases = numberWithCommas(mostRecent(newUsCases))
  let mostRecentNewUsDeaths = numberWithCommas(mostRecent(newUsDeaths))
  let mostRecentUsDates = mostRecent(usDates)

  drawChart(usChart, 'usChart', usCases, 'orange', 'darkorange', 'Us Reported Cases', usDates)
  drawChart(newUsCasesChart, 'newUsCasesChart', newUsCases, 'purple', 'darkpurple', 'Daily Us Reported Cases', usDates) 
  drawChart(usDeathsChart, 'usDeathsChart', usDeaths, 'red', 'darkred', ' Total U.S. Deaths', usDates)
  drawChart(window.newUsDeathsChart, 'newUsDeathsChart', newUsDeaths, 'maroon', 'darkmaroon', ' Daily U.S. reported deaths', usDates)
 
  document.getElementById("usCasesSummary").textContent= `As of ${mostRecentUsDates}, the number of U.S. reported cases is ${mostRecentUsCases}.`
  document.getElementById("usNewCasesSummary").textContent= `On ${mostRecentUsDates}, there were ${mostRecentNewUsCases} new cases reported in the U.S.`
  document.getElementById("usDeathsSummary").textContent= `As of ${mostRecentUsDates},  ${mostRecentUsDeaths} people have died in the U.S.`
  document.getElementById("usNewDeathsSummary").textContent= `On ${mostRecentUsDates}, there were ${mostRecentNewUsDeaths} new deaths reported in the U.S.`

  }
  
//********************************************************************************************************************************************//
    //*****************************************************beginning of state charts******************************************************//
        //***************************************************************************************************************************//
function makeStateChart(value){
  // alabama to be first chart drawn on load
  if (x==0){value = 'Alabama'; x=+1}
  // pull out data based on the identifying key (fip number) of the state
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
  
    //populate the dropdown selector box with 1 of each state
    let sel = document.getElementById('statesList');
      if (sel.length == 0){
      for(let i = 0; i < uniqueStates.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = uniqueStates[i];
        opt.value = uniqueStates[i];
        sel.appendChild(opt);
      }
    }
  let newStateCases = []  
  for (index = 1 ; index <= stateCases.length-1; index++){
       newStateCases.push(stateCases[index] - stateCases[index - 1])
    } 
  let newStateDeaths = []  
  for (index = 1 ; index <= stateDeaths.length-1; index++){
        newStateDeaths.push(stateDeaths[index] - stateDeaths[index - 1])
    } 
    let mostRecentStateDeaths = numberWithCommas(mostRecent(stateDeaths))
    let mostRecentStateCases = numberWithCommas(mostRecent(stateCases))
    let mostRecentNewStateCases = numberWithCommas(mostRecent(newStateCases))
    let mostRecentNewStateDeaths = numberWithCommas(mostRecent(newStateDeaths))
    let mostRecentStateDates = mostRecent(stateDates)

    document.getElementById("stateCasesSummary").textContent= `As of ${mostRecentStateDates}, there were ${mostRecentStateCases} cases reported in ${stateName}.`
    document.getElementById("newStateCasesSummary").textContent= `On ${mostRecentStateDates}, there were ${mostRecentNewStateCases} new cases reported in ${stateName}`
    document.getElementById("stateDeathsSummary").textContent= `As of ${mostRecentStateDates}, ${mostRecentStateDeaths} people have died in ${stateName}.`
    document.getElementById("newStateDeathsSummary").textContent= `On ${mostRecentStateDates}, there were ${mostRecentNewStateDeaths} new deaths reported in ${stateName}.`
    
    //Define and create all state charts
    window.stateCasesChart = new Chart('stateCasesChart', {
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
          label: stateName + ' total cases',
          fill: false,
        }],
        labels: stateDates
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
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
              suggestedMin: 5,
              beginAtZero: true
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
    //**************************************************************Chart Of Daily State Cases **********************************************************************//

    window.newStateCasesChart = new Chart('newStateCasesChart', {
    type: "line",
    data: {
      datasets: [{
        data: newStateCases,
        drawBorder: true,
        pointBorderColor: "",
        pointBackgroundColor: "",
        borderColor: 'purple',
        borderWidth: 0,
        pointBorderWidth: 0,
        pointHoverRadius: 20,
        pointHoverBackgroundColor: "darkpurple",
        pointHoverBorderColor: "",
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        pointHitRadius: 5,
        pointBackgroundColor: '',
        backgroundColor: 'red',
        label: stateName + ' daily reported cases',
        fill: false,
      }],
      labels: stateDates
    },
    options: {
      maintainAspectRatio: true,
      responsive: true,
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
            suggestedMin: 5,
            beginAtZero: true
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
    //**************************************************************Chart Of State Deaths **********************************************************************//
  stateDeathsChart = new Chart('stateDeathsChart', {
    type: "line",
    data: {
      datasets: [{
        data: stateDeaths,
        drawBorder: true,
        pointBorderColor: "",
        pointBackgroundColor: "",
        borderColor: 'red',
        borderWidth: 0,
        pointBorderWidth: 0,
        pointHoverRadius: 20,
        pointHoverBackgroundColor: "darkred",
        pointHoverBorderColor: "",
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        pointHitRadius: 5,
        pointBackgroundColor: '',
        backgroundColor: 'red',
        label: stateName + ' total deaths',
        fill: false,
      }],
      labels: stateDates
    },
    options: {
      maintainAspectRatio: true,
      responsive: true,
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
            suggestedMin: 5,
            beginAtZero: true
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

    //**************************************************************Chart Of New State deaths **********************************************************************//
  window.newStateDeathsChart = new Chart('newStateDeathsChart', {
    type: "line",
    data: {
      datasets: [{
        data: newStateDeaths,
        drawBorder: true,
        pointBorderColor: "",
        pointBackgroundColor: "",
        borderColor: 'maroon',
        borderWidth: 0,
        pointBorderWidth: 0,
        pointHoverRadius: 20,
        pointHoverBackgroundColor: "darkmaroon",
        pointHoverBorderColor: "",
        pointHoverBorderWidth: 1,
        pointRadius: 0,
        pointHitRadius: 5,
        pointBackgroundColor: '',
        backgroundColor: 'red',
        label: stateName + ' daily reported deaths',
        fill: false,
      }],
      labels: stateDates
    },
    
    options: {
      maintainAspectRatio: true,
      responsive: true,
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
            autoSkip: true,
            maxTicksLimit: 5,
            suggestedMin: 5,
            beginAtZero: true
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
//select states only once to populate dropdown 
function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
//method to clear state charts after selecting a new state
function destroyChart(chartToDestroy){
  
  window.stateCasesChart.destroy()
  window.newStateCasesChart.destroy()
  window.stateDeathsChart.destroy()
  window.newStateDeathsChart.destroy()
}
//function defined to create US charts
function drawChart(chartName, htmlElement, yData, lineColor, hoverColor, label, xData){

  new Chart(htmlElement, {
    type: "line",
    data: {
      datasets: [{
          data: yData,
          drawBorder: true,
          pointBorderColor: "",
          pointBackgroundColor: "",
          borderColor: lineColor,
          borderWidth: 0,
          pointBorderWidth: 0,
          pointHoverRadius: 20,
          pointHoverBackgroundColor: hoverColor,
          pointHoverBorderColor: "",
          pointHoverBorderWidth: 1,
          pointRadius: 0,
          pointHitRadius: 5,
          pointBackgroundColor: '',
          backgroundColor: 'red',
          label: label,
          fill: false,
      }],
      labels: xData
    },
    options: {
      maintainAspectRatio: true,
      responsive: true,
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
            suggestedMin: 5,
            beginAtZero: true

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
//function to grab 'most recent' numberWithCommas. Dates, cases, deaths
function mostRecent(array){
  return array[Object.keys(array)[Object.keys(array).length - 1]]
}
// add commas to number for readability
function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}