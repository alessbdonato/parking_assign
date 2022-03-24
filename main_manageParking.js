var dictAll = new Object();
var dictAssegnate = new Object();
var dictParcheggi = new Object();
var dictPriorita1 = new Object();
var dictPriorita2 = new Object();
var dictPriorita3 = new Object();
var dictAllUpdate = new Object();
var dictRnd = new Object();
var parcheggi = new Array();
var dictTemp = new Object();
var parcheggiGeneati = new Array();
var targheGenerate = new Array();
var filter;
var range;
const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
const dateObj = new Date(Date.now()+12096e5);
const month = monthNames[dateObj.getMonth()];
const day = String(dateObj.getDate()).padStart(2, '0');
const year = dateObj.getFullYear();
const dataProssimaAssegnazione = day  + '/'+ month  + '/' + year;


function getRandomAuto(obj){ 
    var randomElement;
    randomElement = obj[Math.floor(Math.random() * (obj.length)- 1)+1]; 
    return randomElement;

}



function setDictAutoToWrite(numParcheggi,objRnd,objP1,objP2,objP3,objN){
  var toBreak = false;
  var parcheggio;

do{
  if(Object.keys(objP1).length > 0){
  for (const [key, value] of Object.entries(objP1)) {
    if(! Object.keys(objN).includes(key)){
    parcheggio = getRandomParcheggio(parcheggi)
    objRnd[key] = parcheggio;
    }
    if (parcheggiGeneati.length == numParcheggi){
      toBreak = true;
      break;
    }
  }
  }
  if(toBreak){
    break;
  }
  if(Object.keys(objP2).length > 0){
   for (const [key, value] of Object.entries(objP2)) {
      if(! Object.keys(objN).includes(key)){
     parcheggio = getRandomParcheggio(parcheggi)
    objRnd[key] = parcheggio;
      }
    if (parcheggiGeneati.length == numParcheggi){
      toBreak = true;
      break;
    }
  } 
   }
if(toBreak){
    break;
  }
    if(Object.keys(objP3).length > 0){
   for (const [key, value] of Object.entries(objP3)) {
      if(! Object.keys(objN).includes(key)){
        parcheggio = getRandomParcheggio(parcheggi)
        objRnd[key] = parcheggio;
      }
    if (parcheggiGeneati.length == numParcheggi){
      toBreak = true;
      break;
    }
  } 
  if(toBreak){
    break;
  }
  }
  }while(!parcheggiGeneati.length == numParcheggi)
}








function readAutoParcheggiate() {
var sheet = SpreadsheetApp.getActiveSpreadsheet();
SpreadsheetApp.setActiveSheet(sheet.getSheetByName('Parcheggi assegnati'))
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
//    Logger.log('Targa auto: ' + data[i][0]);
    dictAssegnate[data[i][0]] = data[i][1]
 //   Logger.log('Posto assegnato: ' + data[i][1]);
  }
}



function readFilter() {
var sheet = SpreadsheetApp.getActiveSpreadsheet();
SpreadsheetApp.setActiveSheet(sheet.getSheetByName('filter'))
  var data = sheet.getDataRange().getValues();

//    Logger.log('Targa auto: ' + data[i][0]);
    filter = data[0][0]
   Logger.log(filter);
}


function sortDict(dict){
 var i=0
 var newDict = new Object();
 var k = Object.keys(dict);
 var a = new Array();
  if (filter === "asc"){
     a = k.sort(function(a, b){return a-b})
  }else{
   a = k.sort(function(a, b){return b-a})
  }
    for (var key in a){
      newDict[key] = dict[key];
    i++
}
dict = newDict

}







function setFilter(filter) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet.getSheetByName('filter'))
  if (filter==="asc"){
      filter = "desc"
    }else{
      filter = "asc"
      }

  SpreadsheetApp.getActiveSheet().getRange('A1').setValue(filter);
}



  
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min)
}


function readAllParcheggi() {
var sheet = SpreadsheetApp.getActiveSpreadsheet();
SpreadsheetApp.setActiveSheet(sheet.getSheetByName('Parcheggi e targhe'))
  var data = sheet.getDataRange().getValues();
  for (var i = 4; i < data.length; i++) {
    if (data[i][2]) {
    parcheggi[i-4] = data[i][2];
    }
  }
}
function getRange() {

  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet.getSheetByName('startRange'))
  var data = sheet.getDataRange().getValues();
  return data[0][0]
  
  }
  
  function readAutoRange(start) {
  start = start-1
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet.getSheetByName('Parcheggi e targhe'))
  var data = sheet.getDataRange().getValues();
  do{
  for (var i = start; i < data.length; i++) {
    dictRnd[data[i][0]] = getRandomParcheggio(parcheggi)
    if(Object.keys(dictRnd).length == parcheggi.length){
       break;
    }
    //console.log(data.slice(3).length)
    if (i === data.length-1){
      start=4;
      break;
    }
  }
    }while(Object.keys(dictRnd).length != parcheggi.length)
  }
function setRange() {
  var srange;
var sheet1 = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet1.getSheetByName('Parcheggi e targhe'))
  var data1 = sheet1.getDataRange().getValues();
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet.getSheetByName('startRange'))
  var data = sheet.getDataRange().getValues();
  srange = data[0][0]

    //srange = (data1.length-srange) + (data1.length-srange)-7
   // if (data1.length - srange > 14){
    
      //srange = Math.trunc(srange+(parcheggi.length/srange)+getRandomIntInclusive(1,3))
      do{
      srange = getRandomIntInclusive(5,data1.length-4)
      }while(srange == range)
       console.log(srange)
     //  }
  
  SpreadsheetApp.getActiveSheet().getRange('A1').setValue(srange);


  }

function writeAssegnazioni(obj){
  var i = 2;
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.setActiveSheet(sheet.getSheetByName('Parcheggi assegnati'))

for (var key in obj){
  SpreadsheetApp.getActiveSheet().getRange('A'+i).setValue(key);
  SpreadsheetApp.getActiveSheet().getRange('B'+i).setValue(obj[key]);
  SpreadsheetApp.getActiveSheet().getRange('C'+i).setValue(dataProssimaAssegnazione);
  i++
}

}

function getRandomParcheggio(arr){ 
  var randomParcheggio;
  do{
    randomParcheggio = arr[Math.floor(Math.random() * (arr.length)-1)+1];


  }while(parcheggiGeneati.includes(randomParcheggio))
  parcheggiGeneati.push(randomParcheggio)
  return randomParcheggio;
    

}

        

function main() {
  Logger.log('Tutti i parcheggi');
  readAllParcheggi()
  range = getRange()
  readAutoRange(range);
  setRange()
  writeAssegnazioni(dictRnd)
  }
