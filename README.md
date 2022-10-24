# GUEST BOOK
['게스트북' 개발 회고록](https://velog.io/@eunsilson/%ED%86%A0%EC%9D%B4%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B2%8C%EC%8A%A4%ED%8A%B8%EB%B6%81-%ED%9A%8C%EA%B3%A0%EB%A1%9D)
<br><br>
[게스트북 UI.pptx](https://github.com/EunsilSon/guest-book/files/9249059/UI.pptx)
<br>
(서버를 계속 열어두려고 했으나 사용량 초과로인해 서버를 닫고 UI를 추가 작성 합니다. UI 양이 많아 PPT로 따로 정리했습니다.)
<br><br><br>

## <b>1. 프로젝트 개요</b>
<br>
<p>졸업작품 프로젝트에 사용했던 기술들 중 직접 사용해 보지 않아 궁금했던 것들을 직접 사용해 보기 위해 수행하는 토이 프로젝트입니다.</p>
<p>직접 만든 웹 사이트로 지인들과 소통할 수 있는 창구를 만들고 싶었습니다.</p>
<br><br>

## <b>2. 프로젝트 설명</b>
<br>
<p><b>게스트 북</b>은 여러 명의 사용자가 관리자에게 메시지를 남길 수 있는 <u>방명록 웹 사이트</u>입니다.</p>
<br><br>

## <b>3. 사용 기술</b>

+ Server  
<b>AWS의 EC2</b>(Ubuntu 20.04)와 <b>RDS</b>(MariaDB 10.5)를 사용합니다.

<br>

+ Front-end  
<b>HTML, CSS, Vanila JS, Axios(HTTP 통신 라이브러리)</b>를 사용합니다.

<br>

+ Back-end  
Java 기반의 웹 프레임워크 <b>Spring Boot 2.7.1과 JPA(Hibernate)</b>를 사용합니다.

<br><br>

## <b>4. 테이블 구조</b>
<img width="399" alt="guest-book-db-table" src="https://user-images.githubusercontent.com/46162801/173296869-10d053a7-cfae-4fdc-a1b3-24b8e918acc4.png">

<br><br>

## <b>5. 이슈와 해결</b>
* Cors Policy로 인한 서버의 요청 거부<br>https://velog.io/@eunsilson/%EB%98%90-%EB%82%98%ED%83%80%EB%82%9C-Cors-Policy-feat.-Springboot-Axios
* [JPA] DELETE Query 에러 : Statement.executeQuery()<br>https://velog.io/@eunsilson/JPA-Statement.executeQuery-cannot-issue-statements-that-do-not-produce-result-sets
* [JPA] save(), saveAll(), saveAndFlush() 차이<br>https://velog.io/@eunsilson/JPA-save-saveAll-saveAndFlush-%EC%B0%A8%EC%9D%B4
* [Axios] Response.data 출력하기<br>https://velog.io/@eunsilson/Axios-Response.data-%EC%B6%9C%EB%A0%A5%ED%95%98%EA%B8%B0
* [Axios] HTTP GET 요청 (feat. data를 담을 수 없다)<br>https://velog.io/@eunsilson/Axios-Get-Post-%EC%9A%94%EC%B2%AD
* [Docker] Docker Hub push 실패 : requested access to the resource is denied<br>https://velog.io/@eunsilson/Docker-Docker-Hub-push-%EC%8B%A4%ED%8C%A8-requested-access-to-the-resource-is-denied
