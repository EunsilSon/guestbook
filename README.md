# Guest Book 📓
## 목차
1. [프로젝트 소개](#프로젝트-소개)
2. [2024 리팩토링](#2024-리팩토링)
3. [기능 명세](#기능-명세)
4. [기술 스택](#기술-스택)
5. [ERD](#ERD)
6. [이슈와 해결](#이슈와-해결)
7. [실행 화면](#실행-화면)

<br>

## 프로젝트 소개
게스트북은 [손은실](https://github.com/EunsilSon)에게 메시지를 남길 수 있는 **방명록 웹 사이트**입니다.  
사용자들은 로그인 후 손은실의 게스트북을 사용할 수 있습니다.  
최근 변경된 사항들이 `리팩토링 목록`에 기재되어 있으며, 개발 과정과 트러블슈팅 관련 내용은 저의 🔗[기술 블로그](https://velog.io/@eunsilson/posts)에서 업로드되어 있습니다.

<br>

#### 아키텍처 구조
<img width="80%" alt="architecture" src="https://github.com/user-attachments/assets/06f8009c-b3ce-46dc-a03f-af4f86700b9d">

#### 웹 화면
<img width="80%" alt="frontend" src="https://github.com/EunsilSon/guestbook/assets/46162801/7fda4c76-d047-4151-b9ac-1fb954663a68">

<br>

## 2024 리팩토링
1. Spring Boot 2.7.1 → **3.2.5 마이그레이션**
    - [Spring Boot 3.2.5 마이그레이션](https://velog.io/@eunsilson/Spring-Boot-3-2-5-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98)에서 가이드를 확인할 수 있습니다.

<br>

2. [회원가입 / id / pw 찾기] `existsBy` 메서드를 사용해 **NullPointerException 발생 가능성 감소**
    - 기존에 find 메서드로 객체를 찾아 null과 비교하는 로직 제거

<br>

3. [카드 / 댓글 개수 조회] `countBy` 메서드를 사용해 **효율적인 엔티티 개수 반환**
    - findAllBy 메서드로 객체를 가져온 뒤 객체의 개수를 반환하는 로직 제거

<br>

4. [카드 검색] 단일 메서드를 분리해 **검색 기능 개선**
    - 검색하려는 페이지를 구분하는 if-else문 로직 제거
    - 메서드 오버로딩을 통해 코드 간결성 증가 

<br>

## 기능 명세
| 구분     | 기능                               |  설명                                               |
|----------|------------------------------------|---------------------------------------------------------|
| 공통     | 카드 현황 조회 | 전체 개수, 확인 완료, 확인 전                 |
| 사용자  | 로그인                              | 사용자의 아이디를 LocalStorage에 저장                               |
|          | 회원가입                           | 독립된 DB 서버에 사용자 정보 저장                                   |
|          | ID 찾기                            |                                            |
|          | PW 찾기                            |                                     |
|          | 모든 카드 조회                     | Paging 기능을 이용해 필요한 만큼의 데이터만 조회                                    |
|          | 내가 쓴 카드 조회                  |                                |
|          | 아이디 및 내용으로 카드 검색       | 내가 쓴 카드는 '내용'으로만 검색 가능               |
|          | 카드 작성                          | 공개 및 비공개 설정 가능                                       |
|          | 카드 수정         | 자신이 작성한 카드만 수정 가능                             |
|          | 카드 삭제          | 자신이 작성한 카드만 삭제 가능                              |
|          | 댓글 작성                          |                                             |
|          | 댓글 삭제          | 자신이 작성한 댓글만 삭제 가능                           |
| 관리자  | 카드 상태 변경 | 카드 클릭하면 자동 변경                       |

<br><br>

## 기술 스택

| 구분       | 기술                         | 설명                           |
|------------|------------------------------|-------------------------------------|
| Back-end   | Spring Boot 3.2.5            | MVC 패턴의 REST API 서버 |
|            | Spring Data JPA             |                                     |
| Server     | AWS EC2 (Ubuntu 20.04)       |                                     |
|            | AWS RDS (MariaDB 10.5)       |                                     |
|            | Docker                       |                                     |
| Front-end  | HTML/CSS                   |                                     |
|            | Vanila JS                    |                                     |
|            | Axios                        | HTTP 비동기 통신 라이브러리         |


<br><br>

## ERD
<img width="60%" alt="guestbook_erd" src="https://github.com/user-attachments/assets/570cc4ea-29a3-47cc-893c-d2173d5fbf46">


<br>

## 이슈와 해결
* [[CORS] Cors Policy로 인한 서버의 요청 거부](https://velog.io/@eunsilson/%EB%98%90-%EB%82%98%ED%83%80%EB%82%9C-Cors-Policy-feat.-Springboot-Axios)
* [[JPA] JPQL로 생성한 Delete 메서드 오류](https://velog.io/@eunsilson/JPA-Statement.executeQuery-cannot-issue-statements-that-do-not-produce-result-sets)
* [[JPA] save(), saveAll(), saveAndFlush() 차이](https://velog.io/@eunsilson/JPA-save-saveAll-saveAndFlush-%EC%B0%A8%EC%9D%B4)
* [[Axios] Response.data 출력하기](https://velog.io/@eunsilson/Axios-Response.data-%EC%B6%9C%EB%A0%A5%ED%95%98%EA%B8%B0)
* [[Axios] HTTP GET 요청](https://velog.io/@eunsilson/Axios-Get-Post-%EC%9A%94%EC%B2%AD)
* [[Docker] Docker Hub push 실패](https://velog.io/@eunsilson/Docker-Docker-Hub-push-%EC%8B%A4%ED%8C%A8-requested-access-to-the-resource-is-denied)

<br>

## 실행 화면
- 회원가입
  - 입력 값 검증

<img src="https://github.com/EunsilSon/guestbook/assets/46162801/1aae4c14-e911-4c65-a3b6-2a846b191d4a" />

- 로그인
  - 입력 값 검증

<img src="https://github.com/EunsilSon/guestbook/assets/46162801/4930f0e1-9b7e-4883-b274-2724f59c6e4d" />

- ID 찾기
  - 입력 값 검증

<img src="https://github.com/EunsilSon/guestbook/assets/46162801/6aca0243-384b-4add-8827-0139193e7f72" />

- PW 찾기
  - 입력 값 검증

<img src="https://github.com/EunsilSon/guestbook/assets/46162801/6efcfebd-b811-483d-bfa2-088b2962a31c" />

- 카드 작성
  - 글자 수 제한
  - 글자 수 넘침 처리
<img src="https://user-images.githubusercontent.com/46162801/199157711-9869989d-56bb-453b-8bae-ffb33bf8b760.gif" />

- 카드 수정, 삭제
<img src="https://user-images.githubusercontent.com/46162801/199155547-4e167a23-9312-4faa-a5aa-01f58123f817.gif" />

- 댓글 작성
<img src="https://user-images.githubusercontent.com/46162801/199155568-60165ce6-1360-4f6c-bdaa-6b3637c6e8dd.gif" />

- 댓글 삭제
<img src="https://user-images.githubusercontent.com/46162801/199155617-3feae30a-5b56-4226-bb6d-845638d01863.gif" />

- 댓글 더보기 버튼
<img src="https://user-images.githubusercontent.com/46162801/199155651-8577e1ef-46f0-4581-a356-ecc33ce3a0c0.gif" />

- '모든 카드' 메뉴에서 카드 검색
  - '이름'과 '내용'으로 카드 검색
  - 일치하는 카드가 없는 경우 알림창을 띄움
<img src="https://user-images.githubusercontent.com/46162801/199155677-aa6c5ddd-d4e0-4963-b04d-71bfac4f56e3.gif" />

- '내가 쓴 카드' 메뉴에서 카드 검색
  - '내용'으로 카드를 검색
<img src="https://user-images.githubusercontent.com/46162801/199155691-9e52bee8-c30b-4e0a-85cc-72716099b6ae.gif" />

- 카드의 상태 변경
  - 관리자의 계정으로 접속 후 방문자들의 카드를 클릭하면 카드 상태가 '확인 완료'로 변경됨
<img src="https://user-images.githubusercontent.com/46162801/199155719-35e2b396-d349-4473-a4fa-f8dbc51d0b10.gif" />
