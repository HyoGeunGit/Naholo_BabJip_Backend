# Naholo Bobjip Backend Typescript

any 최대한 줄이기

RESTful 기반으로 API 작성

ex)

```
CREATE = POST /group
READ = GET /group , GET /group/:\_id
UPDATE = PUT /group/:\_id
DELETE = DELETE /group/:\_id
```

MVC 패턴을 기반으로 작성

## 폴더

-   modules : 싱글톤 사용한 여러기능이 포함된 객체
-   modules/lib : 간단한 함수 ( 구 func )
-   passport : passport 사용하는 모든 코드
-   router : 모든 라우터

    ex)
    router/group/group.router.ts - > /group

    라우터랑 컨트롤러는 분리

-   schema : 모델들 ( 구 mongo/Schema )

    모델 이름은 단수

    I-----Schema(레코드) : Schema.methods.~~

    I-----Model(컬렉션 전체) : Schema.statics.~~~
