const form = document.getElementById('form');
const userName = document.getElementById('user_name');
const userPw = document.getElementById('user_pw');
const userTel = document.getElementById('user_tel');

let isRight = true;

// 입력 값 유효성 확인
function checkInput(inputArr) {

  if (inputArr.userName != "not existed") {
    isRight = (inputArr.userName.length) >= 2 ? true : false;
    // css : 2자 이상
  }

  if (inputArr.userPw != "not existed") {
    isRight = (inputArr.userPw.length) >= 8 ? true : false;
    // css : 8자 이상
  }

  if (inputArr.userTel != "not existed") {
    isRight = (inputArr.userTel.length) == 11 ? true : false;
    // css : 11자
  }

  return isRight;
}

// 입력 값 지우기 
function removeInput() {
  userPw.value = null;
  userName.value = null;
  userTel.value = null;
}

// 로그인
function signIn() {

  let userInfoArr = {
    userPw : userPw.value,
    userName : "not existed",
    userTel : "not existed",
  };

  if (checkInput(userInfoArr)) {
    axios({
      method: 'post', //통신 방식
      url: 'http://54.180.95.53:8000/sign_in',
      data: {
        "username": userName.value,
        "password": userPw.value
      }
    }, { withCredentials : true })
      .then((Response)=>{
        if (Response.data == "fail") {
          alert("아이디 및 비밀번호가 올바르지 않습니다.");  
          removeInput();
        } else {
          alert("로그인 되었습니다.");
          form.submit();
          removeInput();
        }
  }).catch((Error)=>{
      console.log(Error);
  })
  }
}


// 회원가입
function signUp() {

  let userInfoArr = {
    userPw : userPw.value,
    userName : userName.value,
    userTel : userTel.value,
  };

  if (checkInput(userInfoArr)) {

    axios({
      method: 'post', //통신 방식
      url: 'http://54.180.95.53:8000/sign_up',
      data: {
        "username": userName.value,
        "password": userPw.value,
        "telephone": userTel.value
      }
    }, { withCredentials : true })
      .then((Response)=>{
        if (Response.data == "Existed") {
          alert("존재하는 아이디입니다.");  
        } else {
          alert("회원가입에 성공했습니다.");
          form.submit();
          removeInput();
        }
  }).catch((Error)=>{
      console.log(Error);
  })
  }
}

// id 찾기
function findId() {

  let userInfoArr = {
    userPw : "not existed",
    userName : "not existed",
    userTel : userTel.value,
  };

  if (checkInput(userInfoArr)) {
    axios({
      method: 'get', //통신 방식
      url: 'http://54.180.95.53:8000/id',
      params: {
        "tel": userTel.value
      }
    }, { withCredentials : true })
      .then((Response)=>{
        if (Response.data == "fail") {
          alert("일치하는 사용자가 없습니다.");  
        } else {
          alert("아이디는 " + Response.data + "입니다.");
          form.submit();
          removeInput();
        }
  }).catch((Error)=>{
      console.log(Error);
  })
  }
}

// pw 찾기
function findPw() {

  let userInfoArr = {
    userPw : "not existed",
    userName : userName.value,
    userTel : userTel.value,
  };

  if (checkInput(userInfoArr)) {

    axios({
      method: 'get', //통신 방식
      url: 'http://54.180.95.53:8000/pw',
      params: {
        "name": userName.value,
        "tel" : userTel.value
      }
    }, { withCredentials : true })
      .then((Response)=>{
        if (Response.data == "fail") {
          alert("일치하는 사용자가 없습니다.");  
        } else {
          alert("비밀번호는 " + Response.data + "입니다.");
          form.submit();
          removeInput();
        }
  }).catch((Error)=>{
      console.log(Error);
  })
  }
}