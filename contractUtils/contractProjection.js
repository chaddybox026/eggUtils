var
  chkPop = 0, //chk
  eggDel = 0, //egg
  chkRate = 0, //chk/min
  numHabs = 1, //number of hatcheries
  rateCalm = 0, //level
  eggRate = 0, //egg/min
  eggPerChkRate = 0, //egg/chk/min
  due = 0; //hours

let magnitudes = [
  "M",
  "B",
  "T",
  "q",
  "Q",
  "s",
  "S",
]

//calculates projected egg delivery with given parameters
//args: none
//return: none
function calcEggProj() {

  getData();

  var dueMins = due * 60; //convert hours to minutes

  var calc = ( getEggChkRate() * chkRate * getCalmBoost() * numHabs / 2 ) * ( dueMins * dueMins )
    + ( getEggChkRate() * chkPop ) * dueMins
    + eggDel * 1;

  document.getElementById("output").value = Number.parseFloat(calc).toExponential(2);

}

//calculates the boost of internal hatcheries due to calm upgrade
//args: none
//retun: multiplier value between 1 and 3
function getCalmBoost() {

  if (rateCalm > 20) return 3;
  else if (rateCalm < 0) return 1;
  else return 1 + 0.1*rateCalm;

}

//grabs data from HTML input fields
//args: none
//return: none
function getData() {

  chkPop = getFieldValue("_chkPop");
  chkRate = getFieldValue("_chkRate");
  rateCalm = getFieldValue("_rateCalm");
  numHabs = getFieldValue("_numHabs");
  if (numHabs < 1 || numHabs > 4) numHabs = 0; //avoids too many or too few habs
  eggDel = getFieldValue("_eggDel");
  eggRate = getFieldValue("_eggRate");
  due = getFieldValue("_due");

}

//calculates the rate of eggs per chicken per minute
//no arg
//return: rate num
function getEggChkRate() {

  if (chkPop <= 0) return 0;
  else return eggRate/chkPop; //egg/chk/min

}

//grabs the fields from arg id
//args: id, string of HTML id
//return: value of field in HTML
function getFieldValue(id) {

  return (document.getElementById(id).value) * 1; //*1 ensures number

}
