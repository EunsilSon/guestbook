const insert_btn = document.getElementById('insert_btn');
const update_btn = document.getElementById('update_btn');
const search_btn = document.getElementById('search_btn');
const allCardsPagePrev = document.getElementById('allCardsPagePrev');
const allCardsPageNext = document.getElementById('allCardsPageNext');
const myCardsPagePrev = document.getElementById('myCardsPagePrev');
const myCardsPageNext = document.getElementById('myCardsPageNext');

let username;
let pageCount = -1;

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
function updateCard() {
  const cardContent = document.getElementById('card_content');
  axios({
    method: 'patch',
    url: 'http://54.180.95.53:8000/card',
    data: {
      "card_id":"2",
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
function deleteCard() {
  axios({
    method: 'delete',
    url: 'http://54.180.95.53:8000/card',
    data: {
      "card_id":"2"
    }
  }, { withCredentials : true })
    .then((Response)=>{
      if (Response.data == "Not Existed Card") {
        console.log(Response.data);
      } else {
        alert("카드가 삭제되었습니다.");
        location.href="my_card.html";
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

// 모든 카드 보기
function getAllCardList() {
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card/all',
    params: {
      "page":pageCount
    }
  }, { withCredentials : true })
    .then((Response)=>{
      if (Response.data.length < 5) {
        console.log(Response.data);
        alert("마지막 페이지 입니다.")
      } else {
        console.log(Response.data);
      }
  }).catch((Error)=>{
      console.log(Error);
  })
}

// 모든 카드
function getAllCards(option) {
  if (option == "prev") {
    if (pageCount <= 0) {
      alert("첫 페이지 입니다.");
    } else {
      pageCount = pageCount-1;
      getAllCardList();
    }
  } else {
    pageCount = pageCount+1;
    getAllCardList();
  }
}

// 내가 쓴 카드 보기
function getMyCardList() {
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card/search',
    params: {
      "page":pageCount,
      "username":username,
      "location":"",
      "option":"",
      "content":""
    }
  }, { withCredentials : true })
    .then((Response)=>{
      if (Response.data.length < 5) {
        console.log(Response.data);
        alert("마지막 페이지 입니다.")
      } else {
        console.log(Response.data);
      }
  }).catch((Error)=>{
      console.log(Error);
  })
}

// 내가 쓴 카드
function getMyCards(option) {
  if (option == "prev") {
    if (pageCount <= 0) {
      alert("첫 페이지 입니다.");
    } else {
      pageCount = pageCount-1;
      getMyCardList();
    }
  } else {
    pageCount = pageCount+1;
    getMyCardList();
  }
}


// 카드 상세
