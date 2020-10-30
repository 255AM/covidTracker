const usCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us.csv"
const stateCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
const countyCsv = "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv"
let usData = []
let allStateData = []
let countyData = []
let selectedStateData = []
let uniqueStates = []
let x = 0
let lastReportedUsDate = x

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

  newUsCases = []  
  for (index = 1 ; index <= usCases.length-1; index++){
      newUsCases.push(usCases[index] - usCases[index - 1])
    } 
  
  newUsDeaths = []  
  for (index = 1 ; index <= usDeaths.length-1; index++){
      newUsDeaths.push(usDeaths[index] - usDeaths[index - 1])
    } 

    let mostRecentUsDeaths = mostRecent(usDeaths)
    let mostRecentUsCases = mostRecent(usCases)
    let mostRecentNewUsCases = mostRecent(newUsCases)
    let mostRecentNewUsDeaths = mostRecent(newUsDeaths)
    let mostRecentUsDates = mostRecent(usDates)

  
 
 //**************************************************************Chart Of US Cases **********************************************************************//

 console.log( 'As of ' +  mostRecentUsDates + ', ' + mostRecentUsCases + ' cases have been reported in the US')
   

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

  //**************************************************************Chart Of New US Cases **********************************************************************//

  //console.log( 'On ' +  mostRecentUsDates + ', ' + mostRecentNewUsCases + ' new cases were reported in the US')
  //console.log( 'As of  ' +  mostRecentUsDates + ', ' + 'the seven day running average of new cases in the US is '  + newUsCaseseSevenDay)
  document.getElementById("usCasesSummary").textContent= `As of ${mostRecentUsDates}, the number of US reported cases is up to ${mostRecentUsCases}.`
  document.getElementById("usNewCasesSummary").textContent= `On ${mostRecentUsDates}, there were ${mostRecentNewUsCases} new cases reported in the US`
  document.getElementById("usDeathsSummary").textContent= `As of ${mostRecentUsDates}, its reported that ${mostRecentUsDeaths} people have died in the US.`
  document.getElementById("usNewDeathsSummary").textContent= `On ${mostRecentUsDates}, there were ${mostRecentNewUsDeaths} new deaths reported in the US.`

  window.newUsCasesChart = new Chart('newUsCasesChart', {
    type: "line",
    data: {
      datasets: [{
        data: newUsCases,
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
        label: ' New US Reported Cases',
        fill: false,
        
      }],
      labels: usDates
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
  //**************************************************************Chart Of US Deaths **********************************************************************//

  console.log( 'As of ' +  mostRecentUsDates + ', ' + mostRecentUsDeaths + ' deaths have been reported in the US')
   

  usDeathsChart = new Chart('usDeathsChart', {
    type: "line",
    data: {
      datasets: [{
        data: usDeaths,
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
        label: 'US Deaths',
        fill: false,
        
      }],
      labels: usDates
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

  //**************************************************************Chart Of Daily Reported US Deaths **********************************************************************//

  console.log( 'On ' +  mostRecentUsDates + ', ' + mostRecentNewUsDeaths + ' new deaths were reported in the US')
  //console.log( 'As of  ' +  mostRecentUsDates + ', ' + 'the seven day running average of deaths reported daily in the US is '  + newUsDeathsSevenDay)

window.newUsDeathsChart = new Chart('newUsDeathsChart', {
  type: "line",
  data: {
    datasets: [{
      data: newUsDeaths,
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
      label: ' Daily US Reported Deaths',
      fill: false,
      
    }],
    labels: usDates
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
  
}
//*********************************************************************************************************************************************************//
//**************************************************************Chart Of State Cases **********************************************************************//
//*********************************************************************************************************************************************************//
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
  

  
  //let stateSelector = uniqueStates;
    let sel = document.getElementById('statesList');
      if (sel.length == 0){
      for(let i = 0; i < uniqueStates.length; i++) {
        let opt = document.createElement('option');
        opt.innerHTML = uniqueStates[i];
        opt.value = uniqueStates[i];
        console.log(sel.length)
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

    let mostRecentStateDeaths = mostRecent(stateDeaths)
    let mostRecentStateCases = mostRecent(stateCases)
    let mostRecentNewStateCases = mostRecent(newStateCases)
    let mostRecentNewStateDeaths = mostRecent(newStateDeaths)
    let mostRecentStateDates = mostRecent(stateDates)

    document.getElementById("stateCasesSummary").textContent= `As of ${mostRecentStateDates}, the number of cases reported in ${stateName} is up to ${mostRecentStateCases}.`
    document.getElementById("newStateCasesSummary").textContent= `On ${mostRecentStateDates}, there were ${mostRecentNewStateCases} new cases reported in ${stateName}`
    document.getElementById("stateDeathsSummary").textContent= `As of ${mostRecentStateDates}, its reported that ${mostRecentStateDeaths} people have died in ${stateName}.`
    document.getElementById("newStateDeathsSummary").textContent= `On ${mostRecentStateDates}, there were ${mostRecentNewStateDeaths} new deaths reported in ${stateName}.`
    
  
   
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
          label: stateName + ' Cases',
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

console.log( 'On ' +  mostRecentStateDates + ', ' + mostRecentNewStateCases + ' new cases were reported in ' + stateName)
//console.log( 'As of  ' +  mostRecentStateDates + ', ' + 'the seven day running average of new cases in ' + stateName + ' is'  +  newStateCaseseSevenDay)

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
        
        label: stateName + ' Daily Reported Cases',
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

  console.log( 'As of ' +  mostRecentStateDates + ', ' + mostRecentStateDeaths + ' deaths have been reported in ' + stateName)

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
        label: stateName + ' Deaths',
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

  console.log( 'On ' +  mostRecentStateDates + ', ' + mostRecentNewStateDeaths + ' new Deaths were reported in ' + stateName)
  //console.log( 'As of  ' +  mostRecentStateDates + ', ' + 'the seven day running average of new cases in ' + stateName + ' is'  +  newStateDeathsSevenDay + ' cases)

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
        label: stateName + ' Cases',
        fill: false,
        label: stateName + ' Daily reported Deaths',
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
  
  


function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function destroyChart(){
  window.stateCasesChart.destroy()
  window.newStateCasesChart.destroy()
  window.stateDeathsChart.destroy()
  window.newStateDeathsChart.destroy()
  console.log('yup')
}


function mostRecent(array){
  return array[Object.keys(array)[Object.keys(array).length - 1]]
}
