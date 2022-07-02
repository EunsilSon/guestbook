const insert_btn = document.getElementById('insert_btn');
const delete_btn = document.getElementById('delete_btn');

// 댓글 작성
function insertComment() {
  const newComment = document.getElementById('new_comment');
  
  if (newComment.value == '') {
    alert("댓글을 작성하세요.");
  } else {
    console.log("comment insert : " + newComment.value);
    newComment.value = '';
  }

  /*
  axios
  작성자, 내용

  새 댓글 불러오기
  */
 
}

// 댓글 삭제
function deleteComment() {

}

insert_btn.addEventListener('click', () => insertComment());
delete_btn.addEventListener('click', () => deleteComment());