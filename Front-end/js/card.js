let username;
let pageCount = -1;
let myPageCount = -1;
let pageTotal = 3; // 임의
let isDrawCard = false;
let cardList = new Array();


const insert_btn = document.getElementById('insert_btn');
const update_btn = document.getElementById('update_btn');
const search_btn = document.getElementById('search_btn');

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


// 카드 수정
function updateCard(cardId) {
  const cardContent = document.getElementById('card_content');
  axios({
    method: 'patch',
    url: 'http://54.180.95.53:8000/card',
    data: {
      "card_id":cardId,
      "content":cardContent.value
    }
  }, { withCredentials : true })
    .then((Response)=>{
      if (Response.data == "Not Existed Card") {
        console.log(Response.data);
      } else {
        alert("카드가 수정되었습니다.");
        location.href="card_detail.html"; // 수정한 카드로 이동
      }
  }).catch((Error)=>{
      console.log(Error);
  })
}


// 카드 삭제
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


// 모든 카드
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


// 내가 쓴 카드
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


// 카드 상세
function getCardDetail(cardId) {
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card',
    params: {
      "id":cardId
    }
  }, { withCredentials : true })
    .then((Response)=>{
      location.href='card_detail.html'
  }).catch((Error)=>{
      console.log(Error);
  })
}

// create card
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

  card.setAttribute('onclick', 'getCardDetail(' + cardId.innerText + ');');
  
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

  //editBtn.setAttribute('onclick', 'getCardUpdate(' + cardId.innerText + ');');
  deleteBtn.setAttribute('onclick', 'deleteCard(' + cardId.innerText + ');');

  
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

// delete card
function deleteCards(div) {
  while(div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
}