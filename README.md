 개발 IDE : VisualStudio Code
 
 사용 스택 : Node.js, JavaScript, MongoDB, AWS Lightsail,pm2, Swagger
 
 OS : Macbook Air (RAM 16GB)
 
 내용 : 게시판
 
 데이터 베이스 설계 
 

- Schema


![Schema설계](https://user-images.githubusercontent.com/74170593/221196846-41260568-b90a-4803-acac-e371bafdd392.png)



- Diagram

![Diagram](https://user-images.githubusercontent.com/74170593/221196945-32aecb86-921b-4f23-9213-ba6278b32a9d.png)

## URI 설계

| URI | Http Method | Contents |
| --- | --- | --- |
| /user | GET | 전체 유저 |
| /user/:userId | GET | 유저 상세 검색 |
| /user | POST | 유저 생성 |
| /user/:userId | DELETE | 유저 삭제 |
| /user/:userId | PUT | 유저 수정 |
| /blog | GET | 전체 블로그 |
| /blog/:blogId | GET | 블로그 상세 검색 |
| /blog | POST | 블로그 생성 |
| /blog/:blogId | PUT | 블로그 수정 |
| /blog/:blogId/live | PATCH | 작성 상태 수정 |
| /blog/:blogId/comment | GET | 전체 댓글 |
|  | POST | 댓글 생성 |
| /:commentId | PATCH | 댓글 수정 |
| /:commentId | DELETE | 댓글 삭제 |

## Swagger 사용 방법 : 

사용 방법

 > 1. git clone https://github.com/Mirandalaw/Restful-board-example.git

 > 2. npm install
 
 > 3. localhost:3000/api-docs
  
 차례대로 수행한 뒤 api-docs에서 api 테스트를 진행할 수 있습니다.
 

- [개발 중 에러](https://humane-map-4ba.notion.site/3b28c167876a4bffabfc4c31bdf6ce68)

- [새로 학습한 내용](https://humane-map-4ba.notion.site/5a10b94a41b14e18b902566cf8726fa8)

- [성능 개선](https://humane-map-4ba.notion.site/839713eb46f24469be6e931c8d8a2987)

- [Update에 방법에 대한 고찰](https://humane-map-4ba.notion.site/Update-359ea1ab1b574c08a6991e5b33c2f76e)

- [TODO](https://humane-map-4ba.notion.site/TODO-e93b044c5f7942559a1959e3e9103abd)
