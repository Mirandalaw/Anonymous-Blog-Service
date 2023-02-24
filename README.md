[정리](https://humane-map-4ba.notion.site/Restful-board-example-100dccee74b149e2be157e85f1973ecd)

개발 IDE : VisualStudio Code

사용 스택 : Node.js, JavaScript, MongoDB, AWS Lightsail,pm2, Swagger

OS : Macbook Air (RAM 16GB)

내용 : 게시판

## 데이터 베이스 설계

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
