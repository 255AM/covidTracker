
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
  console.log('incmakeuschart')

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

  
 
 


  drawChart(usChart, 'usChart', usCases, usDates, 'orange', 'darkorange', 'U.S. total cases')
 
 
  document.getElementById("usCasesSummary").textContent= `As of ${mostRecentUsDates}, the number of U.S. reported cases is up to ${mostRecentUsCases}.`
  document.getElementById("usNewCasesSummary").textContent= `On ${mostRecentUsDates}, there were ${mostRecentNewUsCases} new cases reported in the U.S.`
  document.getElementById("usDeathsSummary").textContent= `As of ${mostRecentUsDates}, its reported that ${mostRecentUsDeaths} people have died in the U.S.`
  document.getElementById("usNewDeathsSummary").textContent= `On ${mostRecentUsDates}, there were ${mostRecentNewUsDeaths} new deaths reported in the U.S.`

  drawChart( newUsCasesChart, 'newUsCasesChart', newUsCases, usDates, 'purple', 'darkpurple', ' Daily U.S. reported cases')
  drawChart( usDeathsChart, 'usDeathsChart', usDeaths, usDates, 'red', 'darkred', 'Total U.S. deaths')
  drawChart(newUsDeathsChart, 'newUsDeathsChart', newUsDeaths, usDates, 'maroon', 'darkmaroon', 'Daily U.S. reported deaths')
  
}
/*********************************************************************************************************************************************************
  **************************************************************Chart Of State Cases ********************************************************************
    ***************************************************************************************************************************************************/

function makeStateChart(value){
  if (x==0){value = 'Alabama'; x=+1}
  console.log('inmakestatechart')
  console.log(x)
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

    document.getElementById("stateCasesSummary").textContent= `As of ${mostRecentStateDates}, the number of cases reported in ${stateName} is up to ${mostRecentStateCases}.`
    document.getElementById("newStateCasesSummary").textContent= `On ${mostRecentStateDates}, there were ${mostRecentNewStateCases} new cases reported in ${stateName}`
    document.getElementById("stateDeathsSummary").textContent= `As of ${mostRecentStateDates}, its reported that ${mostRecentStateDeaths} people have died in ${stateName}.`
    document.getElementById("newStateDeathsSummary").textContent= `On ${mostRecentStateDates}, there were ${mostRecentNewStateDeaths} new deaths reported in ${stateName}.`
    
  
    console.log('indrawchartareastate')
    drawChart('stateCasesChart',  'stateCasesChart', stateCases, stateDates, 'orange', 'darkorange', stateName + ' total cases')
    drawChart('newStateCasesChart', 'newStateCasesChart', newStateCases, stateDates, 'purple', 'darkpurple', stateName + ' daily reported cases')
    drawChart('stateDeathsChart', 'stateDeathsChart', stateDeaths, stateDates, 'red', 'darkred', stateName + ' total deaths')
    drawChart('newStateDeathsChart',  'newStateDeathsChart', newStateDeaths, stateDates, 'maroon', 'darkmaroon', stateName + ' daily reported deaths')
    
}  
let n=1 
/************************************************************************************************************************************************************************************
  ****************************************************************Begin Function Defs***********************************************************************************************
    *******************************************************************************************************************************************************************************/ 
function drawChart(chart, htmlCanvasElement, yData, xData, lineColor, lineHoverPointColor, chartLabel){
  console.log('inchartdraw fntion def')
  //defines chart options data and draws chart
  // chartTitle cariable assigned to new chart; htmlcanvas is spot to be drawn. 
  
    
    

    chart= new Chart(htmlCanvasElement, {
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
          pointHoverBackgroundColor: lineHoverPointColor,
          pointHoverBorderColor: "",
          pointHoverBorderWidth: 1,
          pointRadius: 0,
          pointHitRadius: 5,
          pointBackgroundColor: '',
          backgroundColor: 'red',
          label: chartLabel,
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

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
function mostRecent(array){
  return array[Object.keys(array)[Object.keys(array).length - 1]]
}
function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}
function destroyChart(){
  stateCasesChart.destroy()
  newStateCasesChart.destroy()
  stateDeathsChart.destroy()
  newStateCasesChart.destroy()
 }





