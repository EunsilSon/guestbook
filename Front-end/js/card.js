let username;
let prevPage;

let pageCount = -1;
let myPageCount = -1;
let searchPageCount = -1;
let commentPageCount = 0;

let pageMax; // 모든 카드
let myPageMax; // 내가 쓴 카드
let searchPageMax; // 카드 검색
let commentPageMax; // 댓글

let isDrawCard = false;
let isSearchCardList = false;

let cardList = new Array();
let commentList = new Array();

const insert_btn = document.getElementById('insert_btn');
const update_btn = document.getElementById('update_btn');
const search_btn = document.getElementById('search_btn');
const commentInsertBtn = document.getElementById('comment_insert_btn');
const commentDeleteBtn = document.getElementById('comment_delete_btn');
const allCardsPagePrev = document.getElementById('allCardsPagePrev');
const allCardsPageNext = document.getElementById('allCardsPageNext');
const myCardsPagePrev = document.getElementById('myCardsPagePrev');
const myCardsPageNext = document.getElementById('myCardsPageNext');
let pageCountElement = document.getElementById('pageCount');
let myPageCountElement = document.getElementById('myPageCount');
let cardTotalElement = document.getElementById('card_total');
let cardTrueElement = document.getElementById('card_true');
let cardFalseElement = document.getElementById('card_false');
let pageElement = document.getElementById('page');
let allSearchPageBtn;
let mySearchPageBtn;

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
  search_btn.addEventListener('click', () => {
    deleteCards(document.getElementById('card_list'));
    searchCard();
  });
}

if (document.getElementById("comment_insert_btn")) {
  commentInsertBtn.addEventListener('click', () => insertComment());
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

// 현재 접속한 사용자
if (localStorage.getItem('username')) {
  username = localStorage.getItem('username');
}

// 카드 검색 시 페이지 변수 초기화
function setSearchPageCount() {
  searchPageCount = -1;
}

// 카드 개수 집계
function setCardInfo() {
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card/count'
  }, { withCredentials : true })
    .then((Response)=>{
      console.log(Response.data);

      let cardTotal = Response.data.total;
      let cardStatusTrue = Response.data.true;
      let cardStatusFalse = Response.data.false;

      cardTotalElement.innerText = cardTotal;
      cardTrueElement.innerText = cardStatusTrue;
      cardFalseElement.innerText = cardStatusFalse;
  }).catch((Error)=>{
      console.log(Error);
  })
}

// 카드 상태 변경을 위한 사용자 확인
function checkUserForUpdateStatus(cardId) {
  console.log("checkUserForUpdateStatus");

  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/check',
    params: {
      "username":username
    }
  }, { withCredentials : true })
    .then((Response)=>{
      console.log(Response.data);
      if (Response.data == true) { // 관리자
        console.log("update function");
        updateStatus(cardId);
      }
  }).catch((Error)=>{
      console.log(Error);
  })
}

// 카드 상태 변경
function updateStatus(cardId){
  console.log("UpdateStatus");
  axios({
    method: 'patch',
    url: 'http://54.180.95.53:8000/card/status',
    params: {
      "card_id":cardId
    }
  }, { withCredentials : true })
    .then((Response)=>{
      setCardInfo();
  }).catch((Error)=>{
      console.log(Error);
  })
}

// url에 있는 card id 가져오기
function getParam() {
  const urlParams = new URL(location.href).searchParams;
  return urlParams.get('id');
}

// 카드 상세 페이지
function loadDetailPage() {
  const cardId = getParam();
  
  // 카드
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card',
    params: {
      "id":cardId
    }
  }, { withCredentials : true })
    .then((Response)=>{
      cardList = Response.data;
      drawDetailCard(cardList.name, cardList.postDate, cardList.content);
  }).catch((Error)=>{
      console.log(Error);
  })

  // 댓글
  getCommentList();
  checkUserForUpdateStatus(cardId);
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

// 댓글
function getCommentList() {
  const cardId = getParam();

  // 댓글 개수 가져오기
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/comment/total',
    params: {
      "cardId":cardId
    }
  }, { withCredentials : true })
    .then((Response)=>{
      commentPageMax = Response.data / 10;
  }).catch((Error)=>{
      console.log(Error);
  })

  if (commentPageCount == commentPageMax) {
    alert("마지막 페이지 입니다.");
  } else {
    axios({
      method: 'get',
      url: 'http://54.180.95.53:8000/comment',
      params: {
        "page":commentPageCount,
        "cardId":cardId
      }
    }, { withCredentials : true })
      .then((Response)=>{
        console.log(Response.data);
        commentList = Response.data;
        
        for (i = 0; i < commentList.length; i++) {
          drawComments(cardId, commentList[i].commentId, commentList[i].name, commentList[i].postDate, commentList[i].content);
        }
    }).catch((Error)=>{
        console.log(Error);
    })
  
    commentPageCount++;
  }
}

// 댓글 그리기
function drawComments(cardId, commentId, writer, postDate, content) {
  let commentList = document.getElementById("comment_list");
  let comment = document.createElement('div');
  let commentTop = document.createElement('div');
  let commentWriter = document.createElement('p');
  let commentContent = document.createElement('p');
  let commentPostDate = document.createElement('p');

  comment.setAttribute('class', 'comment');
  commentTop.setAttribute('class', 'comment_top');

  commentWriter.setAttribute('class', 'comment_writer');
  commentWriter.innerHTML = writer;
  commentContent.setAttribute('class', 'comment_content');
  commentContent.innerHTML = content;
  commentPostDate.setAttribute('class', 'comment_post_date');
  commentPostDate.innerHTML = postDate;

  commentList.appendChild(comment);
  comment.appendChild(commentTop);
  comment.appendChild(commentContent);
  comment.appendChild(commentPostDate);
  commentTop.appendChild(commentWriter);

  if (writer == username) {
    let deleteBtnImg = document.createElement('img');
    deleteBtnImg.setAttribute('id', 'comment_delete_btn');
    deleteBtnImg.src = "../img/delete_btn.png";
    deleteBtnImg.setAttribute('onclick', 'deleteComment(' + commentId + ',' + cardId + String.fromCharCode(41));
    commentTop.appendChild(deleteBtnImg);
  }
}

// 댓글 작성
function insertComment() {
  const cardId = getParam();
  const newComment = document.getElementById('new_comment').value;

  if (newComment.value == '') {
    alert("댓글을 작성하세요.");
  } else {
    axios({
      method: 'post',
      url: 'http://54.180.95.53:8000/comment',
      data: {
        "card_id":cardId,
        "name": username,
        "content": newComment
      }
    }, { withCredentials : true })
      .then((Response)=>{
        if (Response.data == "fail") {
          console.log(Response.data);
        } else {
          alert("댓글이 작성되었습니다.");
          location.href="card_detail.html?id=" + cardId;
          newComment.value = '';
        }
  }).catch((Error)=>{
      console.log(Error);
  })
  }

}

// 댓글 삭제
function deleteComment(commentId, cardId) {
  axios({
    method: 'delete',
    url: 'http://54.180.95.53:8000/comment',
    data: {
      "comment_id":commentId
    }
  }, { withCredentials : true })
    .then((Response)=>{
      if (Response.data == "Not Existed Comment") {
        console.log(Response.data);
      } else {
        alert("댓글이 삭제되었습니다.");
        location.href="card_detail.html?id=" + cardId;
      }
  }).catch((Error)=>{
      console.log(Error);
  })
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
  cardContent.setAttribute('class', 'edit_card_content');
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
  cardContent.setAttribute('readonly', 'readonly');
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

// 카드 총 개수
function getAllCardTotal() {
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card/all_total'
  }, { withCredentials : true })
    .then((Response)=>{
      allCardTotal = Response.data;
      pageMax = Math.ceil(allCardTotal / 5); // 소수점 이하 숫자를 올림함

      pageMaxElement = document.getElementById('pageMax');
      pageMaxElement.innerText = pageMax;
      if (pageMax != 0) {
        pageCountElement.innerText = pageCount + 1;
      }

  }).catch((Error)=>{
      console.log(Error);
  })
}

// 내가 쓴 카드 총 개수
function getMyCardTotal() {
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card/my_total',
    params: {
      "username":username
    }
  }, { withCredentials : true })
    .then((Response)=>{
      myCardTotal = Response.data;

      myPageMax = Math.ceil(myCardTotal / 5);
      myPageMaxElement = document.getElementById('myPageMax');
      myPageMaxElement.innerText = myPageMax;
      if (myPageMax != 0) {
        myPageCountElement.innerText = myPageCount + 1;
      }
  }).catch((Error)=>{
      console.log(Error);
  })
}

// 모든 카드 (completed)
function getAllCards(option) {
  setSearchPageCount();
  localStorage.setItem('prevPage', "all"); // card_detail에서 뒤로가기를 위한 경로 저장
  setCardInfo(); // 카드 확인 유무 개수
  getAllCardTotal(); // 페이지 표시를 위한 카드 총 개수

  if (option == "prev") {
    if (pageCount <= 0) {
      alert("첫 페이지 입니다.");
    } else {
      pageCount--;
      getAllCardList();
    }
  }
  
  if (option == "next") {
    if ((pageMax - pageCount) == 1) {
      alert("마지막 페이지 입니다.");
    } else {
      pageCount++;
      getAllCardList();
    }
  }
}

function getAllCardList() {
  setSearchPageCount();

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
  setSearchPageCount();
  localStorage.setItem('prevPage', "my");
  setCardInfo();
  getMyCardTotal();

  if (option == "prev") {
    if (myPageCount <= 0) {
      alert("첫 페이지 입니다.");
    } else {
      myPageCount--;
      getMyCardList();
    }
  }
  
  if (option == "next") {
    if ((myPageMax - myPageCount) == 1) {
      alert("마지막 페이지 입니다.");
    } else {
      myPageCount++;
      getMyCardList();
    }
  }
}

function getMyCardList() {
  setSearchPageCount();
  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card/my',
    params: {
      "page":myPageCount,
      "username":username
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

// 뒤로가기
function goBack() {
  if (localStorage.getItem('prevPage') == "all") {
    location.href = "all_cards.html";
  } else {
    location.href = "my_cards.html";
  }
}

let selectedOptionParam;
let searchContent;

// 카드 검색
function searchCard() {
  setSearchPageCount();
  
  // 선택된 옵션 가져오기 + 입력값 저장 ('모든 카드' 에서만 사용)
  if (document.getElementById("search_option")) {
    const searchOption = document.getElementById("search_option");
    const selectedOption = searchOption.options[searchOption.selectedIndex].value;

    if (selectedOption == "none") {
      alert("검색 옵션을 선택하세요.");
      window.location.reload();
    } else {
      selectedOptionParam = (selectedOption == "username") ? selectedOptionParam = "username" : selectedOptionParam = "content";
    }
  }
  localStorage.setItem('selectedOptionParam', selectedOptionParam);
 

  // 현재 경로 가져오기
  var fileName = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.lastIndexOf("/") + 30);

  // 입력 값 가져오기
  searchContent = document.getElementById("search_content").value;
  localStorage.setItem('searchContent', searchContent);
  
  while (pageElement.hasChildNodes()) {
    pageElement.removeChild(pageElement.firstChild);
  }
  
  let allSearchPageBtn = document.createElement("button");
  let mySearchPageBtn = document.createElement("button");

  if (fileName == 'all_cards.html') {
    allSearchPageBtn.setAttribute("class", "search_page_btn");
    allSearchPageBtn.setAttribute("onclick", "searchAllCards()");
    allSearchPageBtn.innerText = "더보기";
    pageElement.appendChild(allSearchPageBtn);
    searchAllCards();

  } else {
    mySearchPageBtn.setAttribute("class", "search_page_btn");
    mySearchPageBtn.setAttribute("onclick", "searchMyCards()");
    mySearchPageBtn.innerText = "더보기";
    pageElement.appendChild(mySearchPageBtn);
    searchMyCards() ;
  }

}

function searchAllCards() {
  searchPageCount++;

  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card/search',
    params: {
      "page":searchPageCount,
      "location":"all",
      "option":localStorage.getItem('selectedOptionParam'), // 아이디 OR 내용
      "username":username,
      "content":localStorage.getItem('searchContent')
    }
  }, { withCredentials : true })
  .then((Response)=>{
    if (Response.data.length < 5) {
      while (pageElement.hasChildNodes()) {
        pageElement.removeChild(pageElement.firstChild);
      }
    }

    if (Response.data.length == 0) {
      alert("일치하는 카드가 없습니다.");
    } else {
      cardList = Response.data;

      if (isSearchCardList == false) {
        deleteCards(document.getElementById('card_list'));
      }

      isSearchCardList = true;
      for (i = 0; i < Response.data.length; i++) {
        drawCard(cardList[i].cardId, cardList[i].name, cardList[i].postDate, cardList[i].content);
      }
    }
  }).catch((Error)=>{
      console.log(Error);
  })
}


function searchMyCards() {
  searchPageCount++;

  axios({
    method: 'get',
    url: 'http://54.180.95.53:8000/card/search',
    params: {
      "page":searchPageCount,
      "location":"user",
      "option":"content",
      "username":username,
      "content":localStorage.getItem('searchContent')
    }
  }, { withCredentials : true })
    .then((Response)=>{
      if (Response.data.length < 5) {
        while (pageElement.hasChildNodes()) {
          pageElement.removeChild(pageElement.firstChild);
        }
      }

      if (Response.data.length == 0) {
        alert("일치하는 카드가 없습니다.");

      } else {
        cardList = Response.data;

        if (isSearchCardList == false) {
          deleteCards(document.getElementById('card_list'));
        }

        isSearchCardList = true;
        for (i = 0; i < Response.data.length; i++) {
          drawMyCard(cardList[i].cardId, cardList[i].name, cardList[i].postDate, cardList[i].content);
        }
      }
  }).catch((Error)=>{
      console.log(Error);
  })
}