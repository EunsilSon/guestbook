let username;
let pageCount = -1;
let myPageCount = -1;
let pageTotal = 3; // 임의
let isDrawCard = false;
let cardList = new Array();

const insert_btn = document.getElementById('insert_btn');
const update_btn = document.getElementById('update_btn');
const search_btn = document.getElementById('search_btn');

const commentInsertBtn = document.getElementById('comment_insert_btn');
const commentDeleteBtn = document.getElementById('comment_delete_btn');

const allCardsPagePrev = document.getElementById('allCardsPagePrev');
const allCardsPageNext = document.getElementById('allCardsPageNext');
const myCardsPagePrev = document.getElementById('myCardsPagePrev');
const myCardsPageNext = document.getElementById('myCardsPageNext');


if (localStorage.getItem('username')) {
  username = localStorage.getItem('username');
}

if (document.getElementById("insert_btn")) {
  insert_btn.addEventListener('click', () => insertCard());
}

if (document.getElementById("update_btn")) {
  update_btn.addEventListener('click', () => updateCard());
}

if (document.getElementById("delete_btn")) {
  delete_btn.addEventListener('click', () => deleteCard());
}

if (document.getElementById("search_btn")) {
  search_btn.addEventListener('click', () => searchCard());
}

if (document.getElementById("comment_insert_btn")) {
  commentInsertBtn.addEventListener('click', () => insertComment());
}

if (document.getElementById("comment_delete_btn")) {
  commentDeleteBtn.addEventListener('click', () => deleteComment());
}

if (document.getElementById('allCardsPagePrev')) {
  allCardsPagePrev.addEventListener('click', () => getAllCards("prev"));
}

if (document.getElementById('allCardsPageNext')) {
  allCardsPageNext.addEventListener('click', () => getAllCards("next"));
}

if (document.getElementById('myCardsPagePrev')) {
  myCardsPagePrev.addEventListener('click', () => getMyCards("prev"));
}

if (document.getElementById('myCardsPageNext')) {
  myCardsPageNext.addEventListener('click', () => getMyCards("next"));
}

// url 파라미터 가져오기
function getParam() {
  const urlParams = new URL(location.href).searchParams;
  return urlParams.get('id');
}

// 카드 상세 페이지
function loadDetailPage() {
  const cardId = getParam();
  
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card',
    params: {
      "id":cardId
    }
  }, { withCredentials : true })
    .then((Response)=>{
      console.log(Response.data);
      cardList = Response.data;
      drawDetailCard(cardList.name, cardList.postDate, cardList.content);
  }).catch((Error)=>{
      console.log(Error);
  })
}

// 카드 상세보기 그리기
function drawDetailCard(writer, postDate, content) {
  let cardDetail = document.getElementById('card_detail');
  let cardInfo = document.getElementById('card_info');

  let cardWriter = document.createElement('p');
  let cardPostDate = document.createElement('p');
  let cardContent = document.createElement('p');

  cardWriter.setAttribute('class', 'card_writer');
  cardWriter.innerHTML = writer;

  cardPostDate.setAttribute('class', 'card_post_date');
  cardPostDate.innerHTML = postDate;

  cardContent.setAttribute('class', 'card_content');
  cardContent.innerHTML = content;
  
  cardDetail.appendChild(cardInfo);
  cardInfo.appendChild(cardWriter);
  cardInfo.appendChild(cardPostDate);
  cardDetail.appendChild(cardContent);
}

// 카드 수정 페이지 (completed)
function loadEditPage() {
  const cardId = getParam();
  
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card',
    params: {
      "id":cardId
    }
  }, { withCredentials : true })
    .then((Response)=>{
      cardList = Response.data;
      drawUpdateCard(cardList.name, cardList.postDate, cardList.content);
  }).catch((Error)=>{
      console.log(Error);
  })
}


// 카드 작성 (completed)
function insertCard() {
  console.log(username);
  const cardContent = document.getElementById('card_content').value;
  
  if (cardContent.value == '') {
    alert("카드를 작성하세요.");
  } else {
    axios({
      method: 'post',
      url: 'http://54.180.95.53:8000/card',
      data: {
        "username": username,
        "content": cardContent
      }
    }, { withCredentials : true })
      .then((Response)=>{
        if (Response.data == "fail") {
          console.log(Response.data);
        } else {
          alert("카드가 작성되었습니다.");
          location.href="all_cards.html";
        }
  }).catch((Error)=>{
      console.log(Error);
  })
  }
}

// 카드 수정 (completed)
function updateCard() {
  const cardId = getParam();
  const cardContent = document.getElementById('card_content').value;

  axios({
    method: 'patch',
    url: 'http://54.180.95.53:8000/card',
    data: {
      "card_id":cardId,
      "content":cardContent
    }
  }, { withCredentials : true })
    .then((Response)=>{
      if (Response.data == "Not Existed Card") {
        console.log(Response.data);
      } else {
        alert("카드가 수정되었습니다.");
        location.href="my_cards.html"; // 수정한 카드로 이동
      }
  }).catch((Error)=>{
      console.log(Error);
  })
}

// 수정 할 카드 그리기 (completed)
function drawUpdateCard(writer, postDate, content) {
  let cardDetail = document.getElementById('card_detail');
  let cardInfo = document.getElementById('card_info');

  let cardWriter = document.createElement('p');
  let cardPostDate = document.createElement('p');
  let cardContent = document.createElement('textarea');

  cardWriter.setAttribute('class', 'card_writer');
  cardWriter.innerHTML = writer;

  cardPostDate.setAttribute('class', 'card_post_date');
  cardPostDate.innerHTML = postDate;

  cardContent.setAttribute('id', 'card_content');
  cardContent.setAttribute('class', 'card_content');
  cardContent.innerHTML = content;
  
  cardDetail.appendChild(cardInfo);
  cardInfo.appendChild(cardWriter);
  cardInfo.appendChild(cardPostDate);
  cardDetail.appendChild(cardContent);
}

// 카드 상세 그리기
function drawDetailCard(writer, postDate, content) {
  let cardDetail = document.getElementById('card_detail');
  let cardInfo = document.getElementById('card_info');

  let cardWriter = document.createElement('p');
  let cardPostDate = document.createElement('p');
  let cardContent = document.createElement('textarea');

  cardWriter.setAttribute('class', 'card_writer');
  cardWriter.innerHTML = writer;

  cardPostDate.setAttribute('class', 'card_post_date');
  cardPostDate.innerHTML = postDate;

  cardContent.setAttribute('id', 'card_content');
  cardContent.setAttribute('class', 'card_content');
  cardContent.innerHTML = content;
  
  cardDetail.appendChild(cardInfo);
  cardInfo.appendChild(cardWriter);
  cardInfo.appendChild(cardPostDate);
  cardDetail.appendChild(cardContent);
}


// 카드 삭제 (completed)
function deleteCard(cardId) {
  axios({
    method: 'delete',
    url: 'http://54.180.95.53:8000/card',
    data: {
      "card_id":cardId
    }
  }, { withCredentials : true })
    .then((Response)=>{
      if (Response.data == "Not Existed Card") {
        console.log(Response.data);
      } else {
        alert("카드가 삭제되었습니다.");
        location.href="my_cards.html";
      }
  }).catch((Error)=>{
      console.log(Error);
  })
}


// 카드 검색
function searchCard() {
  // TODO: 검색 바에 option 선택할 radio btn 만들기
  const searchOption = document.getElementById('search_option')
  const searchContent = document.getElementById('search_content')
  var fileName = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.lastIndexOf("/") + 30);

  if (fileName == 'all_cards.html') {
    axios({
      method: 'get',
      url: 'http://54.180.95.53:8000/card',
      params: {
        "location":"all",
        "option":searchOption, // user OR content
        "username":"",
        "content":searchContent
      }
    }, { withCredentials : true })
      .then((Response)=>{
        if (Response.data == "Not Existed Card") {
          alert("일치하는 카드가 없습니다."); // TODO: CSS로 표시
          console.log(Response.data);
        } else {
          console.log(Response.data);
        }
    }).catch((Error)=>{
        console.log(Error);
    })
  } else {
    // TODO: '내가 쓴 카드' 에서는 '내용'으로만 검색하기
    axios({
      method: 'get',
      url: 'http://54.180.95.53:8000/card',
      params: {
        "location":"user",
        "option":"content",
        "username":userName,
        "content":searchContent
      }
    }, { withCredentials : true })
      .then((Response)=>{
        if (Response.data == "Not Existed Card") {
          alert("일치하는 카드가 없습니다."); // TODO: CSS로 표시
          console.log(Response.data);
        } else {
          console.log(Response.data);
        }
    }).catch((Error)=>{
        console.log(Error);
    })
  }
}


// 모든 카드 (completed)
function getAllCards(option) {
  if (option == "prev") {
    if (pageCount <= 0) {
      alert("첫 페이지 입니다.");
    } else {
      pageCount--;
      getAllCardList();
    }
  } else {
    if ((pageTotal - pageCount) == 1) {
      alert("마지막 페이지 입니다.");
    } else {
      pageCount++;
      getAllCardList();
    }
  }
}

function getAllCardList() {
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card/all',
    params: {
      "page":pageCount
    }
  }, { withCredentials : true })
    .then((Response)=>{
      cardList = Response.data;

      deleteCards(document.getElementById('card_list'));

      for (i = 0; i < Response.data.length; i++) {
        drawCard(cardList[i].cardId, cardList[i].name, cardList[i].postDate, cardList[i].content);
      }
    
    }).catch((Error)=>{
        console.log(Error);
    })
}

// 내가 쓴 카드 (completed)
function getMyCards(option) {
  if (option == "prev") {
    if (myPageCount <= 0) {
      alert("첫 페이지 입니다.");
    } else {
      myPageCount--;
      getMyCardList();
    }
  } else {
    if ((pageTotal - myPageCount) == 1) {
      alert("마지막 페이지 입니다.");
    } else {
      myPageCount++;
      getMyCardList();
    }
  }
}

function getMyCardList() {
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card/search',
    params: {
      "page":myPageCount,
      "username":username,
      "location":"",
      "option":"",
      "content":""
    }
  }, { withCredentials : true })
    .then((Response)=>{
      cardList = Response.data;

      deleteCards(document.getElementById('card_list'));

      for (i = 0; i < Response.data.length; i++) {
        drawMyCard(cardList[i].cardId, cardList[i].name, cardList[i].postDate, cardList[i].content);
      }
    
    }).catch((Error)=>{
        console.log(Error);
    })
}

// create card (completed)
function drawCard(id, writer, postDate, content) {
  let cardList = document.getElementById('card_list');
  let card = document.createElement('div');
  let cardInfo = document.createElement('div');
  let cardWriter = document.createElement('p');
  let cardPostDate = document.createElement('p');
  let cardContent = document.createElement('p');
  let cardId = document.createElement('p');

  card.setAttribute('class', 'card');
  cardInfo.setAttribute('class', 'card_info');

  cardWriter.setAttribute('class', 'card_writer');
  cardWriter.innerHTML = writer;
  cardPostDate.setAttribute('class', 'card_post_date');
  cardPostDate.innerHTML = postDate;
  cardContent.setAttribute('class', 'card_content');
  cardContent.innerHTML = content;
  cardId.innerHTML = id;
  cardId.style.visibility = "hidden";

  card.setAttribute('onclick', 'location.href="card_detail.html?id=' + cardId.innerText +'";');
  
  cardList.appendChild(card);
  card.appendChild(cardInfo);
  cardInfo.appendChild(cardWriter);
  cardInfo.appendChild(cardPostDate);
  card.appendChild(cardContent);
  card.appendChild(cardId);
}

function drawMyCard(id, writer, postDate, content) {
  let cardList = document.getElementById('card_list');
  let card = document.createElement('div');
  let cardInfo = document.createElement('div');
  let cardBtn = document.createElement('div');
  let cardWriter = document.createElement('p');
  let cardPostDate = document.createElement('p');
  let cardContent = document.createElement('p');
  let cardId = document.createElement('p');
  let editBtn = document.createElement('button');
  let deleteBtn = document.createElement('button');

  card.setAttribute('class', 'card');
  cardInfo.setAttribute('class', 'card_info');
  cardBtn.setAttribute('class', 'card_btn');

  cardWriter.setAttribute('class', 'card_writer');
  cardWriter.innerHTML = writer;

  cardPostDate.setAttribute('class', 'card_post_date');
  cardPostDate.innerHTML = postDate;

  cardContent.setAttribute('class', 'card_content');
  cardContent.innerHTML = content;

  cardId.innerHTML = id;
  cardId.style.visibility = "hidden";

  editText = document.createTextNode('수정');
  deleteText = document.createTextNode('삭제');
  editBtn.appendChild(editText);
  deleteBtn.appendChild(deleteText);

  editBtn.setAttribute('onclick', 'location.href="card_edit.html?id=' + cardId.innerText +'";');
  deleteBtn.setAttribute('onclick', 'deleteCard(' + cardId.innerText + ');');
  cardContent.setAttribute('onclick', 'location.href="card_detail.html?id=' + cardId.innerText +'";');
  
  // appendChild 순서에 따라 만들어지는 순서가 바뀜
  cardList.appendChild(card);
  card.appendChild(cardInfo);
  cardInfo.appendChild(cardWriter);
  cardInfo.appendChild(cardPostDate);
  card.appendChild(cardContent);
  card.appendChild(cardBtn);
  cardBtn.appendChild(deleteBtn);
  cardBtn.appendChild(editBtn);

  card.appendChild(cardId);
}

// delete card (completed)
function deleteCards(div) {
  while(div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
}

// 댓글 작성
function insertComment() {
  const newComment = document.getElementById('new_comment').value;
  console.log(username);
  if (newComment.value == '') {
    alert("댓글을 작성하세요.");
  } else {
    axios({
      method: 'post',
      url: 'http://54.180.95.53:8000/comment',
      data: {
        "card_id":"1",
        "username": username,
        "content": newComment
      }
    }, { withCredentials : true })
      .then((Response)=>{
        if (Response.data == "fail") {
          console.log(Response.data);
        } else {
          alert("댓글이 작성되었습니다.");
          location.href=""; // 해당 카드 ID 다시 그리기
          newComment.value = '';
        }
  }).catch((Error)=>{
      console.log(Error);
  })
  }

}

// 댓글 삭제
function deleteComment() {
  axios({
    method: 'delete',
    url: 'http://54.180.95.53:8000/comment',
    data: {
      "comment_id":""
    }
  }, { withCredentials : true })
    .then((Response)=>{
      if (Response.data == "Not Existed Comment") {
        console.log(Response.data);
      } else {
        alert("댓글이 삭제되었습니다.");
        location.href="";
      }
  }).catch((Error)=>{
      console.log(Error);
  })
}

// 뒤로가기
function goBack() {
  window.history.back()
}