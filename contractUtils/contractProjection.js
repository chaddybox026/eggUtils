var chkPop = 0, //chk
  eggDel = 0, //egg
  chkRate = 0, //chk/min
  rateCalm = 0, //level
  eggRate = 0, //egg/min
  eggPerChkRate = 0, //egg/chk/min
  due = 0; //hours

//calculates projected egg delivery with given parameters
function calcEggProj() {

  getData();

  var dueMins = due*60;

  var calc = (getEggChkRate()*chkRate*getCalmBoost()/2)*(dueMins*dueMins);
  console.log(calc);
  calc = calc + getEggChkRate()*chkPop*dueMins;
  console.log(calc);
  calc = calc + eggDel*1;
  console.log(calc);

  document.getElementById("output").innerHTML = Number.parseFloat(calc).toFixed(0);


}

//calculates the boost of internal hatcheries due to calm upgrade
//retuns a value between 1 and 3
function getCalmBoost() {

  if (rateCalm > 20) return 3;
  else if (rateCalm < 0) return 1;
  else return 1 + 0.1*rateCalm;

}

//grabs data from HTML input fields
function getData() {

  chkPop = document.getElementById("_chkPop").value;
  chkRate = document.getElementById("_chkRate").value;
  rateCalm = document.getElementById("_rateCalm").value;
  eggDel = document.getElementById("_eggDel").value;
  eggRate = document.getElementById("_eggRate").value;
  due = document.getElementById("_due").value;

}

//calculates the rate of eggs per chicken per minute
function getEggChkRate() {

  if (chkPop <= 0) return 0;
  else return eggRate/chkPop; //egg/chk/min

}
