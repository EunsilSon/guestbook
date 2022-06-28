const form = document.getElementById('form');
const userId = document.getElementById('user_id');
const userPw = document.getElementById('user_pw');
const userName = document.getElementById('user_name');
const userTel = document.getElementById('user_tel');

let isRight = true;

// 입력 값 유효성 확인
function checkInput(inputArr) {

  if (inputArr.userId != "not existed") {
    isRight = (inputArr.userId.length) >= 8 ? true : false;
    // css : 8자 이상
  }

  if (inputArr.userPw != "not existed") {
    isRight = (inputArr.userPw.length) >= 10 ? true : false;
    // css : 10자 이상
  }

  if (inputArr.userName != "not existed") {
    isRight = (inputArr.userName.length) >= 2 ? true : false;
    // css : 2자 이상
  }

  if (inputArr.userTel != "not existed") {
    isRight = (inputArr.userTel.length) == 11 ? true : false;
    // css : 11자
  }

  return isRight;
}

// 입력 값 지우기 
function removeInput() {
  userId.value = null;
  userPw.value = null;
  userName.value = null;
  userTel.value = null;
}

// 로그인
function signIn() {

  let userInfoArr = {
    userId : userId.value,
    userPw : userPw.value,
    userName : "not existed",
    userTel : "not existed",
  };

  if (checkInput(userInfoArr)) {
  
    /*
    axios({
      method:'POST',
      url:'',
      data: {
        "user_id": id.value,
        "user_pw": pw.value
      }
    }).then((res) => {
      console.log(res);

      if (res) {
      } else {
        alert("아이디 및 비밀번호가 올바르지 않습니다.");
      }

    }).catch(error => {
      console.log(error);
    })
    */
   form.submit();
   removeInput();
  } else {
    alert("다시 입력하세요.");
  }
}


// 회원가입
function signUp() {

  let userInfoArr = {
    userId : userId.value,
    userPw : userPw.value,
    userName : userName.value,
    userTel : userTel.value,
  };

  if (checkInput(userInfoArr)) {

    /*
    axios ({

    })
    */

    alert("회원가입 성공");

    form.submit();
    removeInput();
  } else {
    alert("다시 입력하세요.");
  }
}

// id 찾기
function findId() {

  let userInfoArr = {
    userId : "not existed",
    userPw : "not existed",
    userName : userName.value,
    userTel : userTel.value,
  };

  if (checkInput(userInfoArr)) {

    /*
    axios ({

    })
    */
    alert("회원님의 아이디는 _ 입니다.");

    form.submit();
    removeInput();
  } else {
    alert("다시 입력하세요.");
  }
}

// pw 찾기
function findPw() {

  let userInfoArr = {
    userId : userId.value,
    userPw : "not existed",
    userName : userName.value,
    userTel : userTel.value,
  };

  if (checkInput(userInfoArr)) {

    /*
    axios ({

    })
    */
    alert("회원님의 비밀번호는 _ 입니다.");

    form.submit();
    removeInput();
  } else {
    alert("다시 입력하세요.");
  }
}