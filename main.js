//랜덤번호 지정
//유저가 번호를 입력한다 그리고 go 라는 버튼을 누름 O
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다! O
// 랜덤번호가 < 유저번호 Down!!! O
// 랜덤번호가 < 유저번호 Up!!! O
// Reset버튼을 누르면 게임이 리셋된다 O
// 5번의 기회를 다쓰면 게임이 끝난다 (더이상 추측 불가, 버튼이 disable) O
// 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다. O
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회를 깍지 않는다. O


let computerNum = 0 ;
let playButton = document.querySelector("#play-button"); //선택자 시작버튼
let userInput = document.querySelector("#user-input"); //선택자 인풋박스
let resultArea = document.querySelector("#result-area"); //결과값
let resetButton = document.querySelector("#reset-button"); //선택자 리셋버튼 querySelector() <-이 선택자 함수는 #id , .class 넣자
let chances = 5; //기회
let gameOver = false;
let chancesArea = document.querySelector("#chances-area");
let historyUp=[];//배열1 - 정답값보다 높은히스토리
let historyDown=[];//배열2 - 정답값보다 낮은히스토리

(function(){
    chancesArea.textContent="남은 찬스: "+chances;
})();
playButton.addEventListener("click",play); //클릭시 play함수 실행.
resetButton.addEventListener("click",reset); //클릭시 리셋.
userInput.addEventListener("focus",()=>{userInput.value="";}) //인풋박스 클릭때마다 클리어.
pickRandomNum();



//함수 영역
function pickRandomNum(){ //0~100 랜덤값 정하기
    computerNum = Math.floor(Math.random()* 100 )+1; //소수점 없애기 함수  1~100사이 //100도 나중에 입력받을것
    console.log("랜덤정답값: "+computerNum);
    
}

function play(){
    let userValue = userInput.value;
    if(validation(userValue,historyUp,historyDown)){ //유효성검사 실행 정상값일경우 true;
        chances--; //찬스 한번 감소
        chancesArea.textContent="남은 찬스: "+chances;
        

        if (userValue < computerNum ){
            console.log("UP!!");
            resultArea.textContent = "UP!!"; //함수X
            historyUp.push(userValue); //히스토리에 쌓기
        }else if(userValue > computerNum ){
            console.log("DOWN!!");
            resultArea.textContent = "DOWN!!";
            historyDown.push(userValue); //히스토리에 쌓기
        }else{
            console.log("정답!");
            resultArea.textContent = "정답!";
            gameOver=true;
        }

        if(chances < 1){
            gameOver=true;
        }

        if(gameOver){
            playButton.disabled = true;
            resultArea.textContent="정답!! 마셔라!!";
        }
    }
}

function reset(){ //리셋버튼
    pickRandomNum(); //랜덤값 재실행
    userInput.value=""; //입력창 정리  //input태그인 경우 value
    resultArea.textContent="결과가 나온다"; //div와 같은 태그인경우 text
    chances=5;
    historyUp=[];//배열1 - 정답값보다 높은히스토리
    historyDown=[];//배열2 - 정답값보다 낮은히스토리
    playButton.disabled = false;
    gameOver= false;
    chancesArea.textContent="남은 찬스: "+chances;

}

function validation(userValue,historyUp,historyDown){ //유효성검사

    if(userValue<1||userValue>100){
        resultArea.textContent="1과100사이 숫자를 입력해 주세요";
        return false;
    }
    if(historyUp.includes(userValue) || historyDown.includes(userValue)){ //history에 있는 값을 입력하면
        resultArea.textContent="병신샷!! 이미 말했지요";
        return false;
    }
    if(userValue<computerNum){ //입력값<랜덤값
        for(let i=0;i<historyUp.length;i++){
            if(Number(historyUp[i])>Number(userValue)){
                resultArea.textContent="병신샷!! 이미 말했지요 말한거보다 더 작게말함!!!";
                historyUp.push(userValue);
                return false;
            }
        }
    }else if(userValue>computerNum){ //입력값>랜덤값
        for(let i=0;i<historyDown.length;i++){
            if(Number(historyDown[i])<Number(userValue)){
                resultArea.textContent="병신샷!! 이미 말했지요 말한거보다 더 크게말함!!!";
                historyDown.push(userValue);
                return false;
            }
        }
    }
  return true;
    
}
