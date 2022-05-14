let content = document.getElementById("content");
let question = document.getElementById("q");
let nQuestion = document.getElementById("nq");
let radios = document.getElementsByName("answer");
let lableValue = document.getElementsByTagName("label");

let count = 0;
let rAnswer = 0;
let valueChoses = ""
let falseQuestion = []

renderQuestion(count);
function renderQuestion(count) {
  content.innerHTML = `
    <input type="radio" name="answer" id="f">
    <label for="f">${data[count].a1}</label> <br><br>
    <input type="radio" name="answer" id="s">
    <label for="s">${data[count].a2}</label> <br><br>
    <input type="radio" name="answer" id="t">
    <label for="t">${data[count].a3}</label> <br><br>
    <input type="radio" name="answer" id="fo">
    <label for="fo">${data[count].a4}</label>
    `;

  question.innerHTML = data[count].q;
  nQuestion.innerHTML = data[count].nq;

  for(let i in radios){
    radios[i].addEventListener("click" , ()=>{
      valueChoses = lableValue[i].innerHTML;
    })
  }
}

function checkAnswer(){
  if(valueChoses == data[count].ra){
    rAnswer++
    localStorage.setItem("rAnswer" , rAnswer)
  }else{
    falseQuestion.push({
      id : data[count].nq,
      q : data[count].q
    })
    localStorage.setItem("fAnswer" , JSON.stringify(falseQuestion))
  }

  if(count < data.length - 1){
    count++;
    renderQuestion(count);
  }else{
    window.close();
    window.open("../../practice1/27/first1.html");
  }
}

