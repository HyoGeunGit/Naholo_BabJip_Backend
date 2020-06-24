# 나홀로 밥집

### MEMBER: 심효근, 박태욱, 이유진, 이민혁, 임수민, 강은서, 

## Server Developer: 박태욱

## Secure Developer: 심효근

### Android: https://github.com/HyoGeunGit/NaholoBabJip_Android

- POST /signup : User register ( 유저 회원가입)

> Params

    id : 유저 아이디 [String]

    passwd : 유저 비밀번호 [String]

    phone : 유저 핸드폰 전화번호 [String]

    birth :  유저 생일 [String]

    email : 유저 이메일 [String]

    nick : 유저 닉네임 [String]

    name : 유저 이름 실명 [String]

    sex :  유저 성별 [Boolean], sex ? 여 : 남

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

    HTTP 203 : { "message" : "Non-Authoritative Information" } // 약관 미동의

    HTTP 404 : { message : "User Not Found! } // 로그인 실패

    HTTP 500 : { message : "ERR!" } // 서버 에러

- POST /duplicateChk : 유저 아이디 중복확인

> Request

    id : 유저 아이디 [String]

> Response

    HTTP 200 : { message : "success!" } // 사용 가능

    HTTP 409 : { message : "ID duplicate!" } // 사용 불가능

- POST /autoLogin/:token : 유저 토큰 사용한 자동 로그인

> Request

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

    HTTP 203 : { "message" : "Non-Authoritative Information" } // 약관 미동의

    HTTP 404 : { message : "token expiration or User Not Found" } // 로그인 실패

- POST /termsCheck : 유저 약관 동의 ( 이벤트 수신 포함 )

> Request

    token : 유저 토큰 [String]
    
    terms : 약관 동의 [Boolean]

    event : 이벤트 수신 동의 [Boolean]

> Response

    HTTP 200 : { "message" : "success!" }

    HTTP 203 : { "message" : "Non-Authoritative Information" }

    HTTP 500 : { "message" : "ERR!" }

- POST /addStory : 스토리 추가

> Request

    token : 유저 토큰 [String]

    img : 스토리 이미지 [Image file]

> Response

    HTTP 200 : { message : "success!"}

    HTTP 500 : { message : "ERR!"}

- POST /findUSerStory : 유저 스토리 찾기

> Request

    token : 유저 토큰 [String]

> Response

    HTTP 200 : ex)
    [
        {
            "createdAt": "2020-06-21T06:08:15.832Z",
            "_id": "5eeef9629a71b7734268faff",
            "userUUID": "rdbKpfCWQd5RqMPwm6RgvsXuKhTDIrhS5KNaFz",
            "userName": "51",
            "userProfileImgUrl": "false",
            "imgUrl": "http://13.59.89.201:8001/AvAPvOvm8uDm3mbJwFpcCFlhBA2PDlMgQ.PNG",
            "storyUUID": "AvAPvOvm8uDm3mbJwFpcCFlhBA2PDlMgQ.PNG",
            "alreadyWatch": [],
            "__v": 0
        },
        {
            "createdAt": "2020-06-21T06:08:15.832Z",
            "_id": "5eeef9669a71b7734268fb01",
            "userUUID": "rdbKpfCWQd5RqMPwm6RgvsXuKhTDIrhS5KNaFz",
            "userName": "51",
            "userProfileImgUrl": "false",
            "imgUrl": "http://13.59.89.201:8001/BhJJiFQG8oDHRegVZMCU37AESMn4SznKm.PNG",
            "storyUUID": "BhJJiFQG8oDHRegVZMCU37AESMn4SznKm.PNG",
            "alreadyWatch": [],
            "__v": 0
        }
    ]

    HTTP 404 : { message: "User Not Found!" }

- POST /findUserBackupStory : 유저 백업된 스토리 찾기

> Request

    token : 유저 토큰 [String]

> Response

    HTTP 200 : ex)
    [
        {
            "createdAt": "2020-06-21T06:08:15.832Z",
            "_id": "5eeef9629a71b7734268faff",
            "userUUID": "rdbKpfCWQd5RqMPwm6RgvsXuKhTDIrhS5KNaFz",
            "userName": "51",
            "userProfileImgUrl": "false",
            "imgUrl": "http://13.59.89.201:8001/AvAPvOvm8uDm3mbJwFpcCFlhBA2PDlMgQ.PNG",
            "storyUUID": "AvAPvOvm8uDm3mbJwFpcCFlhBA2PDlMgQ.PNG",
            "alreadyWatch": [],
            "__v": 0
        },
        {
            "createdAt": "2020-06-21T06:08:15.832Z",
            "_id": "5eeef9669a71b7734268fb01",
            "userUUID": "rdbKpfCWQd5RqMPwm6RgvsXuKhTDIrhS5KNaFz",
            "userName": "51",
            "userProfileImgUrl": "false",
            "imgUrl": "http://13.59.89.201:8001/BhJJiFQG8oDHRegVZMCU37AESMn4SznKm.PNG",
            "storyUUID": "BhJJiFQG8oDHRegVZMCU37AESMn4SznKm.PNG",
            "alreadyWatch": [],
            "__v": 0
        }
    ]

    HTTP 404 : { message: "User Not Found!" }

- POST /getStoryList : 전체 유저 스토리 불러오기 ( 무작위 10명 )

> Response

    HTTP 200 :
    [
        [
            {
                "createdAt": "2020-06-21T06:08:15.832Z",
                "_id": "5eeef9629a71b7734268faff",
                "userUUID": "rdbKpfCWQd5RqMPwm6RgvsXuKhTDIrhS5KNaFz",
                "userName": "51",
                "userProfileImgUrl": "false",
                "imgUrl": "http://13.59.89.201:8001/AvAPvOvm8uDm3mbJwFpcCFlhBA2PDlMgQ.PNG",
                "storyUUID": "AvAPvOvm8uDm3mbJwFpcCFlhBA2PDlMgQ.PNG",
                "alreadyWatch": [],
                "__v": 0
            },
            {
                "createdAt": "2020-06-21T06:08:15.832Z",
                "_id": "5eeef9669a71b7734268fb01",
                "userUUID": "rdbKpfCWQd5RqMPwm6RgvsXuKhTDIrhS5KNaFz",
                "userName": "51",
                "userProfileImgUrl": "false",
                "imgUrl": "http://13.59.89.201:8001/BhJJiFQG8oDHRegVZMCU37AESMn4SznKm.PNG",
                "storyUUID": "BhJJiFQG8oDHRegVZMCU37AESMn4SznKm.PNG",
                "alreadyWatch": [],
                "__v": 0
            },
            {
                "createdAt": "2020-06-21T06:08:15.832Z",
                "_id": "5eeef9669a71b7734268fb03",
                "userUUID": "rdbKpfCWQd5RqMPwm6RgvsXuKhTDIrhS5KNaFz",
                "userName": "51",
                "userProfileImgUrl": "false",
                "imgUrl": "http://13.59.89.201:8001/YakS4llDSsCwCf5u77fosI79BxlUVKoEm.PNG",
                "storyUUID": "YakS4llDSsCwCf5u77fosI79BxlUVKoEm.PNG",
                "alreadyWatch": [],
                "__v": 0
            }
        ]
    ]

    HTTP 404 : { message : "Story Not Found!" } / 스토리가 하나도 없을 때

- POST /delStory : 스토리 삭제

> Request

    storyUUID : 스토리 UUID [String]

> Response

    HTTP 200 : { message : "success!" }

    HTTP 500 : { message : "ERR!" }

- POST /getCategory : 카테고리로 주변 음식점 검색

> Request

    lat: 위도,

    lng: 경도,

    category: 카테고리 ex) "치킨" [String],

    range: 거리 (m)

> Response

    HTTP 200 :
    [
        {
            "lat": 37.5433502,
            "lng": 126.9727453,
            "name": "충만치킨 숙대점",
            "photo": ""
        },
        {
            "lat": 37.5431159,
            "lng": 126.9721216,
            "name": "깐부치킨 원효로 리첸시아점",
            "photo": "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAKj7owAi7M0sxq0wekF_VgPfaVmGoa-eMyLDpwe4Q8MrGlX4dmoeSVADwuxLFam4gzyt5tklJM0lujohLCvcXTUX5SV36E-yWBNTN3qnYBYFtWDbE-FkhwMN5DgrD7jwIEhA0B6yoNAN3fCS8PcAnPuEvGhT_iK3HIYO4V77b-9skxCX2qnU7Mw&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s"
        },
        {
            "lat": 37.5524196,
            "lng": 126.9720926,
            "name": "노랑통닭 서울역점 Norangtongdak Seoul Station",
            "photo": "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAdZulCpNMh9xHr2GtpXMAftSCWxiJsxle1-bAkV9LM0wbElthWWbZJOPNyXeS6R-SWVyY1Qv3oppfy1v95Fdz_MEs_D0FAXWQItTGEKRisPMrcuiWGspk7gvzzRiGF9ErEhAji70aThTwm2JVJX1jGT6HGhQn9Um0eHMXmj3vAQS1FMQpyWSauw&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s"
        }

    ]

- POST /getPlace : 주변 음식점 검색

> Request

    lat: 위도,

    lng: 경도,

    range: 거리 (m)

> Response

    HTTP 200 :
    [
        {
            "lat": 37.5433502,
            "lng": 126.9727453,
            "name": "충만치킨 숙대점",
            "photo": ""
        },
        {
            "lat": 37.5431159,
            "lng": 126.9721216,
            "name": "깐부치킨 원효로 리첸시아점",
            "photo": "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAKj7owAi7M0sxq0wekF_VgPfaVmGoa-eMyLDpwe4Q8MrGlX4dmoeSVADwuxLFam4gzyt5tklJM0lujohLCvcXTUX5SV36E-yWBNTN3qnYBYFtWDbE-FkhwMN5DgrD7jwIEhA0B6yoNAN3fCS8PcAnPuEvGhT_iK3HIYO4V77b-9skxCX2qnU7Mw&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s"
        },
        {
            "lat": 37.5524196,
            "lng": 126.9720926,
            "name": "노랑통닭 서울역점 Norangtongdak Seoul Station",
            "photo": "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAdZulCpNMh9xHr2GtpXMAftSCWxiJsxle1-bAkV9LM0wbElthWWbZJOPNyXeS6R-SWVyY1Qv3oppfy1v95Fdz_MEs_D0FAXWQItTGEKRisPMrcuiWGspk7gvzzRiGF9ErEhAji70aThTwm2JVJX1jGT6HGhQn9Um0eHMXmj3vAQS1FMQpyWSauw&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s"
        }

    ]
