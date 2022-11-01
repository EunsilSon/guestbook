# GUEST BOOK
['게스트북' 개발 회고록](https://velog.io/@eunsilson/%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B2%8C%EC%8A%A4%ED%8A%B8%EB%B6%81-%ED%9A%8C%EA%B3%A0%EB%A1%9D)

<br>

## 1. 프로젝트 개요
<br>
<p>졸업작품 프로젝트에 사용했던 기술들 중 직접 사용해 보지 않아 궁금했던 것들을 직접 사용해 보기 위해 수행하는 토이 프로젝트입니다.</p>
<p>직접 만든 웹 사이트로 지인들과 소통할 수 있는 창구를 만들고 싶었습니다.</p>
<br><br>

## 2. 프로젝트 설명
<br>
<p><b>게스트 북</b>은 여러 명의 사용자가 관리자에게 메시지를 남길 수 있는 <u>방명록 웹 사이트</u>입니다.</p>
<br><br>

## 3. 사용 기술

+ Server  
<b>AWS의 EC2</b>(Ubuntu 20.04)와 <b>RDS</b>(MariaDB 10.5)를 사용합니다.

<br>

+ Front-end  
<b>HTML, CSS, Vanila JS, Axios(HTTP 통신 라이브러리)</b>를 사용합니다.

<br>

+ Back-end  
Java 기반의 웹 프레임워크 <b>Spring Boot 2.7.1과 JPA(Hibernate)</b>를 사용합니다.

<br><br>

## 4. 테이블 구조*
<img width="399" alt="guest-book-db-table" src="https://user-images.githubusercontent.com/46162801/173296869-10d053a7-cfae-4fdc-a1b3-24b8e918acc4.png">

<br><br>

## 5. 이슈와 해결
* [Cors Policy로 인한 서버의 요청 거부](https://velog.io/@eunsilson/%EB%98%90-%EB%82%98%ED%83%80%EB%82%9C-Cors-Policy-feat.-Springboot-Axios)
* [[JPA] DELETE Query 에러 : Statement.executeQuery()](https://velog.io/@eunsilson/JPA-Statement.executeQuery-cannot-issue-statements-that-do-not-produce-result-sets)
* [[JPA] save(), saveAll(), saveAndFlush() 차이](https://velog.io/@eunsilson/JPA-save-saveAll-saveAndFlush-%EC%B0%A8%EC%9D%B4)
* [[Axios] Response.data 출력하기](https://velog.io/@eunsilson/Axios-Response.data-%EC%B6%9C%EB%A0%A5%ED%95%98%EA%B8%B0)
* [[Axios] HTTP GET 요청 (feat. data를 담을 수 없다)](https://velog.io/@eunsilson/Axios-Get-Post-%EC%9A%94%EC%B2%AD)
* [[Docker] Docker Hub push 실패 : requested access to the resource is denied](https://velog.io/@eunsilson/Docker-Docker-Hub-push-%EC%8B%A4%ED%8C%A8-requested-access-to-the-resource-is-denied)

<br><br>

##  모습
- 회원가입
  - 입력 값 검증
<img src="https://user-images.githubusercontent.com/46162801/199155180-7169b129-3fb3-48e7-96c8-245622f51fc0.gif" />

<br>

- ID 찾기
  - 입력 값 검증
<img src="https://user-images.githubusercontent.com/46162801/199155451-8ad17181-e563-4ab8-8405-04e5c49f4f29.gif" />

<br>

- PW 찾기
  - 입력 값 검증
<img src="https://user-images.githubusercontent.com/46162801/199155480-074832a0-4fa9-4660-a921-eb049edbba22.gif" />

<br>

- 로그인
  - 입력 값 검증
<img src="https://user-images.githubusercontent.com/46162801/199155501-a2d56898-e5ea-46b6-998d-24a18b8662a4.gif" />

<br>

- 카드 작성
  - 글자 수 제한
  - 글자 수 넘침 처리
<img src="https://user-images.githubusercontent.com/46162801/199157711-9869989d-56bb-453b-8bae-ffb33bf8b760.gif" />

<br>

- 카드 수정, 삭제
<img src="https://user-images.githubusercontent.com/46162801/199155547-4e167a23-9312-4faa-a5aa-01f58123f817.gif" />

<br>

- 댓글 작성
<img src="https://user-images.githubusercontent.com/46162801/199155568-60165ce6-1360-4f6c-bdaa-6b3637c6e8dd.gif" />

<br>

- 댓글 삭제
<img src="https://user-images.githubusercontent.com/46162801/199155617-3feae30a-5b56-4226-bb6d-845638d01863.gif" />

<br>

- 댓글 더보기 버튼
<img src="https://user-images.githubusercontent.com/46162801/199155651-8577e1ef-46f0-4581-a356-ecc33ce3a0c0.gif" />

<br>

- '모든 카드' 메뉴에서 카드 검색
  - '이름'과 '내용'으로 카드 검색
  - 일치하는 카드가 없는 경우 알림창을 띄움
<img src="https://user-images.githubusercontent.com/46162801/199155677-aa6c5ddd-d4e0-4963-b04d-71bfac4f56e3.gif" />

<br>

- '내가 쓴 카드' 메뉴에서 카드 검색
  - '내용'으로 카드를 검색
<img src="https://user-images.githubusercontent.com/46162801/199155691-9e52bee8-c30b-4e0a-85cc-72716099b6ae.gif" />

<br>

- 카드의 상태 변경
  - 관리자의 계정으로 접속 후 방문자들의 카드를 클릭하면 카드 상태가 '확인 완료'로 변경됨
<img src="https://user-images.githubusercontent.com/46162801/199155719-35e2b396-d349-4473-a4fa-f8dbc51d0b10.gif" />
