const card_insert_btn = document.getElementById('card_insert_btn');


// 카드 작성
card_insert_btn.addEventListener('click', function(){
  const card = document.getElementById('card');
  console.log("insert : " + card.value);

  /*
  axios
  작성자, 내용
  */

  alert("카드가 작성되었습니다.");
  location.href="all_cards.html";
})
