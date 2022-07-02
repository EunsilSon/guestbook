const insert_btn = document.getElementById('insert_btn');
const update_btn = document.getElementById('update_btn');


if (document.getElementById("insert_btn")) {
  insert_btn.addEventListener('click', () => insertCard());
}

if (document.getElementById("update_btn")) {
  update_btn.addEventListener('click', () => updateCard());
}

if (document.getElementById("delete_btn")) {
  update_btn.addEventListener('click', () => deleteCard());
}

// 카드 작성
function insertCard() {
  const cardContent = document.getElementById('card_content');
  
  if (cardContent.value == '') {
    alert("카드를 작성하세요.");
  } else {
    console.log("insert : " + cardContent.value);

  /*
  axios
  작성자, 내용
  */

  alert("카드가 작성되었습니다.");
  location.href="all_cards.html";
  }
}

// 카드 수정
function updateCard() {
  const cardContent = document.getElementById('card_content');

  console.log("update : " + cardContent.value);
  /*
  axios
  카드 id, 내용
  */

  alert("카드가 수정되었습니다.");
  location.href="card_detail.html"; // 수정한 카드로 이동
}

// 카드 삭제
function deleteCard() {
  // 카드의 id 를 가져온다
  // 서버에 id를 보낸다
  // 리턴 값을 받는다
  alert("카드가 삭제되었습니다.");
}