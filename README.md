# 나홀로 밥집

### MEMBER: 심효근, 박태욱, 이유진, 이민혁, 임수민, 강은서

## Server Developer: 박태욱

## bCrypt Developer: 심효근

- POST /signup : User register ( 유저 회원가입)

> Params

    id : 유저 아이디 [String]

    passwd : 유저 비밀번호 [String]

    phone : 유저 핸드폰 전화번호 [String]

    birth :  유저 생일 [String]

    email : 유저 이메일 [String]

    nick : 유저 닉네임 [String]

    sex :  유저 성별 [Boolean], sex ? 여 : 남

    token : 유저 토큰 [String]

    termsChk : 약관 동의 [Boolean]

    eventChk : 이벤트 수신 동의 [Boolean]

> Response

    HTTP 200 : 유저 데이터 // 성공
    ex)
    {
        "termsChk": false,
        "eventChk": false,
        "\_id": "5ee3a8136429de1a58b3cab2",
        "id": "010111133331",
        "phone": "0101111222212",
        "email": "akaa13",
        "nick": "12312314",
        "token": "9CQN3jhouq30BfaJW5tIfPZez",
        "\_\_v": 0
    }

    HTTP 409 : // 유저 중복
    {
        "message": "User duplicate!",
        "duplicateKey": { // 중복된 키. return 값 맘에 안들 시 바꿔줌
            "id": "010111133331" // id, nick, email, phone이 들어감.
        }
    }

    HTTP 500 : {message : "ERR!"} // 서버 에러

- POST /signin : User Signin ( 유저 로그인 )

> Params

    id : 유저 아이디 [String]

    passwd : 유저 비밀번호 [String]

> Response

    HTTP 200 : 유저 데이터 // 성공
    ex)
    {
        "termsChk": false,
        "eventChk": false,
        "\_id": "5ee3a8136429de1a58b3cab2",
        "id": "010111133331",
        "phone": "0101111222212",
        "email": "akaa13",
        "nick": "12312314",
        "token": "9CQN3jhouq30BfaJW5tIfPZez",
        "\_\_v": 0
    }

    HTTP 404 : { message : "User Not Found! } // 로그인 실패

    HTTP 500 : { message : "ERR!" } // 서버 에러

- POST /duplicateChk : 유저 아이디 중복확인

> Request

    id : 유저 아이디 [String]

> Response

    HTTP 200 : { message : "success!" } // 사용 가능

    HTTP 409 : { message : "ID duplicate!" } // 사용 불가능

- GET /autoLogin/:token : 유저 토큰 사용한 자동 로그인

> Params

    token : 유저 토큰

> Response

    HTTP 200 : 유저 데이터 // 성공
    ex)
    {
        "termsChk": false,
        "eventChk": false,
        "\_id": "5ee3a8136429de1a58b3cab2",
        "id": "010111133331",
        "phone": "0101111222212",
        "email": "akaa13",
        "nick": "12312314",
        "token": "9CQN3jhouq30BfaJW5tIfPZez",
        "\_\_v": 0
    }

    HTTP 404 : { message : "token expiration or User Not Found" } // 로그인 실패
