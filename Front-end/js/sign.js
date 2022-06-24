const form = document.getElementById('form');
const id = document.getElementById('user_id');
const pw = document.getElementById('user_pw');
const sign_btn = document.getElementById('sign_in');

sign_btn.addEventListener('click', (e) => signIn(e))

// 로그인
function signIn(e) {
  e.preventDefault();

  if (checkInput(id, pw)) {
    id.value = null;
    
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
        form.submit();
      } else {
        alert("아이디 및 비밀번호가 올바르지 않습니다.");
      }

    }).catch(error => {
      console.log(error);
    })
    */

    form.submit();
  }

}

// 입력 값 확인
function checkInput(id, pw) {
  let isRight = true;

  if (id.value.length < 8) {
    isRight = false;
    alert("아이디를 8자 이상 입력하세요.");
  }

  if (pw.value.length < 10) {
    isRight = false;
    alert("비밀번호를 10자 이상 입력하세요.");
  }

  return isRight;
}