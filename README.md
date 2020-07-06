# 나홀로 밥집

### MEMBER: 심효근, 박태욱, 이유진, 이민혁, 임수민, 강은서, 박종훈

## Server Developer: PM-박태욱, 박종훈

## bCrypt Developer: PM-심효근

### Android: https://github.com/HyoGeunGit/NaholoBabJip_Android

### RestFul

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

    profileImage : 유저 프로필 이미지 [Base64 String]
    
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
        "profileImgUrl": "{url}"
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

    HTTP 203 : {
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
     // 약관 미동의

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

    img : 스토리 이미지 [Base64 String]

> Response

    HTTP 200 : { message : "success!"}

    HTTP 500 : { message : "ERR!"}

- POST /findUserStory : 유저 스토리 찾기

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
            "alreadyWatch": [
                'asdasdasdasdsa',
                'asdasdassdasdsad'
            ],
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

- POST /getStoryList : 전체 유저 스토리 불러오기 ( 무작위 10개 )

> Response

    HTTP 200 : [
        {
            "_id": "5efada87a2cdfa58ac32e03e",
            "createdAt": "2020-06-30T06:22:50.908Z",
            "userUUID": "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD",
            "userName": "1122213123333332",
            "userProfileImgUrl": "false",
            "imgUrl": "http://13.59.89.201:8001/story/wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD/QFbz62ul21GhQU8vt64TPxnYb6Qd8t5doRlqr1nv/0.jpg",
            "storyUUID": "QFbz62ul21GhQU8vt64TPxnYb6Qd8t5doRlqr1nv",
            "alreadyWatch": [],
            "__v": 0
        },
        {
            "_id": "5efada1bb65b1b9abc12bbba",
            "createdAt": "2020-06-30T06:22:15.934Z",
            "userUUID": "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD",
            "userName": "1122213123333332",
            "userProfileImgUrl": "false",
            "imgUrl": "http://13.59.89.201:8001/story/wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD/XnJds1IeYe1JlnA8CPfyPEjhgKigS0jSZh5jYfj5/0.jpg",
            "storyUUID": "XnJds1IeYe1JlnA8CPfyPEjhgKigS0jSZh5jYfj5",
            "alreadyWatch": [
                "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD",
                "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD",
                "HIbHPg7mw12XJcEcYcfhO7QkvgJQ6d7XFeBY7k"
            ],
            "__v": 3
        },
        {
            "_id": "5efada26b65b1b9abc12bbbc",
            "createdAt": "2020-06-30T06:22:15.934Z",
            "userUUID": "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD",
            "userName": "1122213123333332",
            "userProfileImgUrl": "false",
            "imgUrl": "http://13.59.89.201:8001/story/wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD/FfjaK4O5ibaEzczjrUjzrO6RwTp9ag9RPich7iZg/0.jpg",
            "storyUUID": "FfjaK4O5ibaEzczjrUjzrO6RwTp9ag9RPich7iZg",
            "alreadyWatch": [],
            "__v": 0
        }
    ]

    HTTP 404 : { message : "Story Not Found!" } / 스토리가 하나도 없을 때

- POST /delStory : 스토리 삭제

> Request

    storyUUID : 스토리 UUID [String]

> Response

    HTTP 200 : { message : "success!" }

    HTTP 500 : { message : "ERR!" }

- POST /watchStory : 스토리 보기 ( 다른 유저가 내 스토리 보기 )

> Request

    token : 유저 토큰 [String],

    storyUUID : 스토리 UUID [String]

> Response

    HTTP 200 {
        "alreadyWatch": [
            "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD",
            "HIbHPg7mw12XJcEcYcfhO7QkvgJQ6d7XFeBY7k"
        ],
        "createdAt": "2020-06-30T06:22:15.934Z",
        "_id": "5efada1bb65b1b9abc12bbba",
        "userUUID": "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD",
        "userName": "1122213123333332",
        "userProfileImgUrl": "false",
        "imgUrl": "http://13.59.89.201:8001/story/wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD/XnJds1IeYe1JlnA8CPfyPEjhgKigS0jSZh5jYfj5/0.jpg",
        "storyUUID": "XnJds1IeYe1JlnA8CPfyPEjhgKigS0jSZh5jYfj5",
        "__v": 3
    }

    HTTP 404 : { message: "token expiration or User Not Found" }

- POST /readWatch : 특정 스토리를 본 사람

> Request

    token : 유저 토큰 [String],

    storyUUID : 스토리 UUID [String]

> Reponse

    HTTP 200 : [
        {
            "profileImgUrl": "false",
            "_id": "5ef9ec0e2698817954b3bb39",
            "nick": "1122213123333332"
        },
        {
            "profileImgUrl": "false",
            "_id": "5ef9ec9521c64d2e08881595",
            "nick": "12"
        }
    ]

    HTTP 404 : { message: "token expiration or User Not Found" }

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
            "photo": "",
            "place_id": "ChIJ5yL2rGuifDURIBGX_PevgWA"
        },
        {
            "lat": 37.5431159,
            "lng": 126.9721216,
            "name": "깐부치킨 원효로 리첸시아점",
            "photo": "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAKj7owAi7M0sxq0wekF_VgPfaVmGoa-eMyLDpwe4Q8MrGlX4dmoeSVADwuxLFam4gzyt5tklJM0lujohLCvcXTUX5SV36E-yWBNTN3qnYBYFtWDbE-FkhwMN5DgrD7jwIEhA0B6yoNAN3fCS8PcAnPuEvGhT_iK3HIYO4V77b-9skxCX2qnU7Mw&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "place_id": "ChIJ5yL2rGuifDURIBGX_PevgWA"
        },
        {
            "lat": 37.5524196,
            "lng": 126.9720926,
            "name": "노랑통닭 서울역점 Norangtongdak Seoul Station",
            "photo": "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAdZulCpNMh9xHr2GtpXMAftSCWxiJsxle1-bAkV9LM0wbElthWWbZJOPNyXeS6R-SWVyY1Qv3oppfy1v95Fdz_MEs_D0FAXWQItTGEKRisPMrcuiWGspk7gvzzRiGF9ErEhAji70aThTwm2JVJX1jGT6HGhQn9Um0eHMXmj3vAQS1FMQpyWSauw&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "place_id": "ChIJ5yL2rGuifDURIBGX_PevgWA"
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
            "photo": "",
            "place_id": "ChIJ5yL2rGuifDURIBGX_PevgWA"
        },
        {
            "lat": 37.5431159,
            "lng": 126.9721216,
            "name": "깐부치킨 원효로 리첸시아점",
            "photo": "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAKj7owAi7M0sxq0wekF_VgPfaVmGoa-eMyLDpwe4Q8MrGlX4dmoeSVADwuxLFam4gzyt5tklJM0lujohLCvcXTUX5SV36E-yWBNTN3qnYBYFtWDbE-FkhwMN5DgrD7jwIEhA0B6yoNAN3fCS8PcAnPuEvGhT_iK3HIYO4V77b-9skxCX2qnU7Mw&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "place_id": "ChIJ5yL2rGuifDURIBGX_PevgWA"
        },
        {
            "lat": 37.5524196,
            "lng": 126.9720926,
            "name": "노랑통닭 서울역점 Norangtongdak Seoul Station",
            "photo": "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAdZulCpNMh9xHr2GtpXMAftSCWxiJsxle1-bAkV9LM0wbElthWWbZJOPNyXeS6R-SWVyY1Qv3oppfy1v95Fdz_MEs_D0FAXWQItTGEKRisPMrcuiWGspk7gvzzRiGF9ErEhAji70aThTwm2JVJX1jGT6HGhQn9Um0eHMXmj3vAQS1FMQpyWSauw&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "place_id": "ChIJ5yL2rGuifDURIBGX_PevgWA"
        }

    ]

- POST /getDetail : 음식점 상세 정보

> Request

    place_id : 음식점 코드

> Response

    HTTP 200 : {
        "formatted_phone_number": "02-797-7275",
        "name": "충만치킨 숙대점",
        "openTime": "수요일: 오후 2:00 ~ 오전 2:00",
        "openNow": false,
        "rating": 4.3,
        "photo": [
            "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAATWnGfIGLvos8dzYqF9OQJQed-DfmaCRv3U9yNqPShLQa6vc9mSB_h_XpYcwKdeVd6hzexeNvXIXuqoSdOb7Vn9HgQ2KBpkx3eMNiz4lLK1rIGzPbun4SSlNkXlnpmKH3EhAWndwUl3f3N-Ntl2EB99R0GhQLTcUgQK0kMVyaanJcGx2wnd6Keg&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAOGB1LjmIy9474wHiOBT0EdKKZxd0cgm6hkLb1VfKWhAOE5YJiDivV7oIz0rqRcPlJQhys_DPVQoCSf-qOg-C_PU8Wep93zEwDU7gyc_jVnLyR5wx_6QuutL1_bjxIuReEhDEMC9K73FBmp627PgWSg7-GhTsU86Udvc_O14cWz01ZlQ-maRCWg&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAbKjszUDYtx9fq96lUKusKb_nEU9Hl26WttjQPpRDP-1Hjy05yBfUjMasKxOYJqMrQFRySBswd22k1KIF0jiMLO2anlLbLmRw5hcBA-dOQPw8TOP-J8Wdumo7_ajM8o2xEhDUK5s7Orzrb2oVsJl1u1r9GhRFfEkxdNLDwAi4hkzfCB7zlTrRRQ&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAbQ7GcCJfJM45vbrIk69iKGEiNoVenVw1W9-Obbc2Xx4aVq_p3UU_c5NrivqYwSry6EUFHhhfaN8eELaDoKLjlGvU7WIn4KMh-vyvoEqz2uPCQxiRgCRixMgy_YM5Okg1EhASU2jOdQh4Dg13gpX8am0YGhRKdRlQNb7cKLs5oamNUn3sdm3V1g&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAATXJgwIPIN7878yYtwAaWgbUnYQtugUxd9EeDeC9U-EpR4nAcKGhNyKRdjSxfBE2D7_wvju9Okulohhih3zXi2c1zUrLYqgakBopuKAX6bn7H0mNec842Oas8qmD8Jo7NEhB8egs1SUzK8xmKcXQqru8kGhTvL6n_gkw_mOxn6FwFQW_D-PKYfQ&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAZGY1GEFpV0FQOmm-qZ-g67vZqUXxj0dlQCcA84BeqBRwZMyKlkgbPPwutLd3mKWXEc31i9EVLp6aNXcUw7mTjUpkboKMo_iIJFuE0TLEZB-uolDS_A-PoAMkrHC89MvFEhDKiuwhjKYcWyJjZ-Riiy7dGhQZkGddstKUWFTRPaLnFvQPgAeQNg&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAQBp93CY7NWbKbmgHiS_gIWXKQ5yPwZxD1TZ_n5OgLCmPFA_U3CE0_8UMRpejc7l62r7-ibSBhvtPaDyt3zJCt2zdN3w-5u6XfHj0UOhVWOSTf2mp-5plXpk6iIc5UhtIEhAF2DzKsHdIJrINam8gjg9KGhQ-oe2aBgKMA3ujVKUjZ9fPkPNh6Q&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAA_4M7DGpmqOxC6MssvYve72TuFEN3-Z5YJqJBmV4SHNaB43bF9S6lslnuHtM96LC7awopIbTgGgAJw5i4epGcOn7fgbIH8opZIAtR5KCXA8diC33O3UTje9e5cQAOBqDbEhCXNz7oXFV3wSNUlpbbBhRQGhQWRCCrEc4aYjI5FKnk7PYDIxY2XQ&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAAokMjLGphkNU1jGTTM9WwEcKYZwu6ly43J96wPD-3GG2lLtxmxIggAqwpZzkMqRpsgAzmc5W2dt2VI2_3W7LdkqkREmzRYDci8qaX6Ggzfny-izrlUe8A5h16L8hvQlx0EhDmLq57dwShOY0S1wyNGzMiGhQ9g-ZVK3khbbxX1s_0bXmV84wLqg&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s",
            "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=CmRaAAAActGqgB5Wnfli_NyDtY9pCymIOB3YGY7JPhfEvG_V5vWdLGpALvMLborIVlnpshOy4_gyHCLLTElVtDFUPSAYpAETmXQobOyIK4ezmk9jwqbXk714qbPugl0wgK9GNbo-EhBiiPGIBtzmu3OJYm0BvHVLGhTcGK4NOXPp_79iLS05M-2YLkic-w&key=AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s"
        ],
        "price_level": 2,
        "vicinity": "용산구 남영동 61-6",
        "reviews": [
            {
                "author_name": "지민재",
                "author_url": "https://www.google.com/maps/contrib/114665611059761847838/reviews",
                "language": "ko",
                "profile_photo_url": "https://lh4.ggpht.com/-wwTAfPj_JFA/AAAAAAAAAAI/AAAAAAAAAAA/obYgJUbb_nM/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                "rating": 4,
                "relative_time_description": "10달 전",
                "text": "맛나고 넓고 쾌적합니다.",
                "time": 1564488324
            },
            {
                "author_name": "정현수",
                "author_url": "https://www.google.com/maps/contrib/103850069153906134254/reviews",
                "language": "ko",
                "profile_photo_url": "https://lh6.ggpht.com/-JhoO1M-A25I/AAAAAAAAAAI/AAAAAAAAAAA/Td7HW3BdN-8/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                "rating": 5,
                "relative_time_description": "1달 전",
                "text": "치킨과 생맥주가 너무나 맛있는 가게",
                "time": 1589468097
            },
            {
                "author_name": "Alexander Hann",
                "author_url": "https://www.google.com/maps/contrib/111758741403031127590/reviews",
                "language": "ko",
                "profile_photo_url": "https://lh6.ggpht.com/-rUuOqLcmRas/AAAAAAAAAAI/AAAAAAAAAAA/JnVub6SBheU/s128-c0x00000000-cc-rp-mo-ba5/photo.jpg",
                "rating": 4,
                "relative_time_description": "10달 전",
                "text": "보통 간장티꾸와 스노우어니언을 선호.\n 간장티꾸는 오븐에 익힌걸 다시 튀김 그래서 티기고 꾸었다해서 티꾸로 알고있습니다. 시간이 조금 더 걸립니다. \n스노우어니언은 기본 후라이드에 양파가들어간 화이트 소스..비교적 잘어울리나 중반 넘어가면 살짝 느끼해지는 부분 참고...\n타 유명 프렌차이즈 대비 우수하고 깨끗한 느낌.. 다만 횡단보도 바로 앞이라 창문밖은 조금 어수선 합니다. 재방문 의사있습니다. 다른 메뉴도 땡기는게 몇몇개 있습니다.\n사진은 다 못먹어 포장해온 간장 티꾸입니다.",
                "time": 1565971058
            },
            {
                "author_name": "김상민",
                "author_url": "https://www.google.com/maps/contrib/111033670452796396042/reviews",
                "language": "ko",
                "profile_photo_url": "https://lh6.ggpht.com/-h47_2KKMI7g/AAAAAAAAAAI/AAAAAAAAAAA/T9PoSis307g/s128-c0x00000000-cc-rp-mo/photo.jpg",
                "rating": 5,
                "relative_time_description": "11달 전",
                "text": "사장님도 친절하시고 사이드도 셀프라 눈치 안보이게 편했어요. 당연 치킨도 맛있었고요. 근데 저는 너무 딱딱한 걸 안 좋아해서 사이드에 감자칩이 살짝 아쉬웠어요.",
                "time": 1564238303
            },
            {
                "author_name": "Koke Koko",
                "author_url": "https://www.google.com/maps/contrib/111769077741505203586/reviews",
                "language": "ko",
                "profile_photo_url": "https://lh4.ggpht.com/-iJ_Bewhh_yQ/AAAAAAAAAAI/AAAAAAAAAAA/BUYyPjIu9Qw/s128-c0x00000000-cc-rp-mo-ba4/photo.jpg",
                "rating": 5,
                "relative_time_description": "7달 전",
                "text": "사장이 친절하고, 달콤한 계열을 잘 한다.",
                "time": 1574790055
            }
        ]

    }

- POST /social/[google, facebook] : 소셜 토큰 검증

> Request

    token : AccessToken

> Response

    HTTP 200 : 토큰 확인
    {
        name: 소셜 사용자 이름
        email: 소셜 사용자 이메일
        uuid: 소셜 사용자 uuid
        profileImgUrl: 소셜 사용자 profileImg
        social: "facebook, google 중 하나"
    }

    HTTP 201 : 토큰 확인, 이미 있는 유저
    {
        birth: "ㄴㅁㅇㅁㄴㅇ"
        email: "baduk32127@gmail.com"
        eventChk: true
        id: "baduk32127@gmail.com"
        name: "박태욱"
        nick: "펭귄"
        profileImgUrl: "false"
        sex: true
        termsChk: true
        token: "uA5xYqe1y0T02xKNUmGyma3em"
        uuid: "zEendQ3CEKVCDy6VAu0XhqIXHPt1"
    }

    HTTP 401 : Social 유저가 이메일을 등록하지 않음
    { message: "Exception Email" }

    HTTP 404 : 토큰 미확인
    { message: "User Not Found!" }

- POST /social/kakao?access_token=KAKAO_TOKEN : 카카오 소셜 토큰 검증

> Querys

    access_token : AccessToken

> Response

    HTTP 200 : 토큰 확인
    {
        name: 소셜 사용자 이름
        email: 소셜 사용자 이메일
        uuid: 소셜 사용자 uuid
        profileImgUrl: 소셜 사용자 profileImg
        social: "kakao"
    }

    HTTP 201 : 토큰 확인, 이미 있는 유저
    {
        birth: "ㄴㅁㅇㅁㄴㅇ"
        email: "baduk32127@gmail.com"
        eventChk: true
        id: "baduk32127@gmail.com"
        name: "박태욱"
        nick: "펭귄"
        profileImgUrl: "false"
        sex: true
        termsChk: true
        token: "uA5xYqe1y0T02xKNUmGyma3em"
        uuid: "zEendQ3CEKVCDy6VAu0XhqIXHPt1"
    }

    HTTP 401 : Social 유저가 이메일을 등록하지 않음
    { message: "Exception Email" }

    HTTP 404 : 토큰 미확인
    { message: "User Not Found!" }

- POST /social/veritySave : 토큰 검증 후, ( 토큰 검증에서 201일 시 하지 않아도 됨)

> Request

    name: 토큰 검증에서 받은 name

    email: 토큰 검증에서 받은 email

    nick: 유저 닉네임

    phone: 유저 핸드폰

    birth: 유저 생일

    sex: 유저 성별

    uuid: 토큰 검증에서 받은 uuid

> Reponse

    HTTP 200 : 회원 가입 성공
    {
        birth: "ㄴㅁㅇㅁㄴㅇ"
        email: "baduk32127@gmail.com"
        eventChk: true
        id: "baduk32127@gmail.com"
        name: "박태욱"
        nick: "펭귄"
        profileImgUrl: "false"
        sex: true
        termsChk: true
        token: "uA5xYqe1y0T02xKNUmGyma3em"
        uuid: "zEendQ3CEKVCDy6VAu0XhqIXHPt1"
    }

    HTTP 409 : { message : "User duplicate!" } 유저 중복

    HTTP 500 : { message : "ERR!" }

- POST /addGroup : 그룹 생성

> Request

    token : 유저 토큰 [String]

    groupName : 그룹 이름 [String]

    lat : 경도 [Number]

    lng : 위도 [Number]

    maximum : 최대 인원 수 [Number]

    vicinity : 거리 이름 [String] : "ex 비빔로 밥 42길 12"

    time : 시간 범위 [String] : "9시 ~ 10시 ( PM )"

    isAdult : 술이 들어가는가? [Boolean]

    category: 음식 카테고리 [String] : "ex 치킨"

> Response

    HTTP 200 : ex)
    {
        "users": [
            "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD"
        ],
        "isAdult": false,
        "_id": "5ef9f10e98b8a55568c4c9f2",
        "maximum": 5,
        "lat": "32",
        "lng": "32",
        "vicinity": "동교로",
        "time": "9시 ~ 10시 ( PM )",
        "category": "치킨",
        "groupName": "뿌링클링클링크리",
        "groupUUID": "g25e8cZNPuCJrJo6lVeB7b1KpeMvuyNqHEvwzcPK",
        "__v": 0
    }

    HTTP 404 : { message: "token expiration or User Not Found" }

- POST /readGroup

> Response

    HTTP 200 : [
        {
            "users": [
                "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD"
            ],
            "isAdult": false,
            "_id": "5ef9f10e98b8a55568c4c9f2",
            "maximum": 5,
            "lat": "32",
            "lng": "32",
            "vicinity": "동교로",
            "time": "9시 ~ 10시 ( PM )",
            "category": "치킨",
            "groupName": "뿌링클링클링크리",
            "groupUUID": "g25e8cZNPuCJrJo6lVeB7b1KpeMvuyNqHEvwzcPK",
            "__v": 0
        }
    ]

    HTTP 404 : { message: "token expiration or User Not Found" }

- POST /readGroup/:index : 그룹 10개씩 가져오기

> Params

    index : 페이지 번호 [Number] 0부터

> Request

    token : 유저 토큰 [String]

> Response

    HTTP 200 : [
        {
            "users": [
                "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD"
            ],
            "isAdult": false,
            "_id": "5ef9f10e98b8a55568c4c9f2",
            "maximum": 5,
            "lat": "32",
            "lng": "32",
            "vicinity": "동교로",
            "time": "9시 ~ 10시 ( PM )",
            "category": "치킨",
            "groupName": "뿌링클링클링크리",
            "groupUUID": "g25e8cZNPuCJrJo6lVeB7b1KpeMvuyNqHEvwzcPK",
            "__v": 0
        }
    ]

    HTTP 404 : { message: "token expiration or User Not Found" }

- POST /readGroup/maxPage : 그룹 10개씩 가져오기

> Request

    token : 유저 토큰

> Response

    HTTP 200 : [
        {
            "users": [
                "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD"
            ],
            "isAdult": false,
            "_id": "5ef9f10e98b8a55568c4c9f2",
            "maximum": 5,
            "lat": "32",
            "lng": "32",
            "vicinity": "동교로",
            "time": "9시 ~ 10시 ( PM )",
            "category": "치킨",
            "groupName": "뿌링클링클링크리",
            "groupUUID": "g25e8cZNPuCJrJo6lVeB7b1KpeMvuyNqHEvwzcPK",
            "__v": 0
        }
    ]

    HTTP 404 : { message: "token expiration or User Not Found" }

- POST /readGroupInfo : 특정 그룹 정보 불러오기

> Request

    token : 유저 토큰 [String]

    groupUUID : 그룹 UUID [String]

> Response

    HTTP 200 : {
        "users": [
            {
                "profileImgUrl": "false",
                "nick": "1122213123333332"
            },
            {
                "profileImgUrl": "false",
                "nick": "12"
            },
            {
                "profileImgUrl": "false",
                "nick": "123"
            }
        ],
        "isAdult": false,
        "_id": "5ef9ec50bbc43678bcff3277",
        "maximum": 5,
        "lat": "32",
        "lng": "32",
        "vicinity": "동교로",
        "time": "9시 ~ 10시 ( PM )",
        "category": "치킨",
        "groupName": "뿌링클링클링크리",
        "groupUUID": "U7kPvH0OTIvSrDQIrXWcBSOuURe1IFKgcjF5N7g1",
        "__v": 2
    }

    HTTP 404 : { message: "token expiration or User Not Found" }

- POST /readUserGroup : 유저 가입한 그룹 가져오기

> Request

    token : 유저 토큰 [String]

> Response

    HTTP 200 : [
        {
            "users": [
                "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD",
                "HIbHPg7mw12XJcEcYcfhO7QkvgJQ6d7XFeBY7k",
                "FvcWS3dplj2vEKncURSq8R3kDoVCZJgvGXdn4b"
            ],
            "isAdult": false,
            "_id": "5ef9ec50bbc43678bcff3277",
            "maximum": 5,
            "lat": "32",
            "lng": "32",
            "vicinity": "동교로",
            "time": "9시 ~ 10시 ( PM )",
            "category": "치킨",
            "groupName": "뿌링클링클링크리",
            "groupUUID": "U7kPvH0OTIvSrDQIrXWcBSOuURe1IFKgcjF5N7g1",
            "__v": 2
        }
    ]

    HTTP 404 : { message: "token expiration or User Not Found" }

- POST /readGroupMember : 특정 그룹 유저 불러오기

> Request

    token : 유저 토큰 [String]

    groupUUID : 그룹 UUID [String]

> Response

    HTTP 200 : [
        {
            "profileImgUrl": "false",
            "nick": "1122213123333332",
            "uuid": "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD"
        },
        {
            "profileImgUrl": "false",
            "nick": "12",
            "uuid": "HIbHPg7mw12XJcEcYcfhO7QkvgJQ6d7XFeBY7k"
        },
        {
            "profileImgUrl": "false",
            "nick": "123",
            "uuid": "FvcWS3dplj2vEKncURSq8R3kDoVCZJgvGXdn4b"
        }
    ]

    HTTP 404 : { message: "token expiration or User Not Found" }

- POST /joinGroup : 그룹 가입

> Request

    token : 유저 토큰 [String]

    groupUUID : groupUUID [String] ( 그룹 UUID )

> Response

    HTTP 200 : ex)
    {
        "users": [
            "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD",
            "HIbHPg7mw12XJcEcYcfhO7QkvgJQ6d7XFeBY7k",
            "FvcWS3dplj2vEKncURSq8R3kDoVCZJgvGXdn4b"
        ],
        "isAdult": false,
        "_id": "5ef9ec50bbc43678bcff3277",
        "maximum": 5,
        "lat": "32",
        "lng": "32",
        "vicinity": "동교로",
        "time": "9시 ~ 10시 ( PM )",
        "category": "치킨",
        "groupName": "뿌링클링클링크리",
        "groupUUID": "U7kPvH0OTIvSrDQIrXWcBSOuURe1IFKgcjF5N7g1",
        "__v": 2
    }

    HTTP 400 : { message: "User Duplicate or Group Not Found!" }

    HTTP 404 : { message: "token expiration or User Not Found" }

    HTTP 413 : { message : "The number of people is exceeded" }

- POST /searchGroup : 그룹 검색. 검색한 문자열이 제목, 카테고리에 포함된 그룹들이 나옴

> Request

    token : 유저 토큰 [String]

    searchText : 검색할 키워드 [String]

> Response

    HTTP 200 : ex)
    [
        {
            "isAdult": false,
            "_id": "5ef8746f9abd52777c44f0e0",
            "maximum": 5,
            "lat": "32",
            "lng": "32",
            "vicinity": "동교로",
            "time": "9시 ~ 10시 ( PM )",
            "category": "치킨",
            "groupName": "치킨먹을사람!!2",
            "users": [
                {
                    "_id": "5ef8746f9abd52777c44f0e1",
                    "uuid": "0udfwiMNKoUhlxLzfqA0lyKRQZpGG88S2cjBJz"
                },
                {
                    "_id": "5ef87a2e8c96c236d09056b0",
                    "uuid": "9kYrF4D8NtqanYiQinAugKgQBq8kqs5271DGLr"
                }
            ],
            "groupUUID": "BCExrJsJUQhXMs4v8LJNpPlv0F40BvohqzU6kwLb",
            "__v": 1
        },
        {
            "isAdult": false,
            "_id": "5ef874799abd52777c44f0e2",
            "maximum": 5,
            "lat": "32",
            "lng": "32",
            "vicinity": "동교로",
            "time": "9시 ~ 10시 ( PM )",
            "category": "치킨",
            "groupName": "치킨먹을사람!!3",
            "users": [
                {
                    "_id": "5ef874799abd52777c44f0e3",
                    "uuid": "0udfwiMNKoUhlxLzfqA0lyKRQZpGG88S2cjBJz"
                }
            ],
            "groupUUID": "5CrgW3Zewe00PdawnowdrteAXeeZ93QhVIstFMeD",
            "__v": 0
        }
    ]

    HTTP 404 : { message: "token expiration or User Not Found" }

- POST /readChatList : 유저 채팅방 목록

> Request

    token : 유저 토큰 [String]

> Response

    HTTP 200 : [
        {
            "users": [
                "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD",
                "HIbHPg7mw12XJcEcYcfhO7QkvgJQ6d7XFeBY7k",
                "FvcWS3dplj2vEKncURSq8R3kDoVCZJgvGXdn4b"
            ],
            "isAdult": false,
            "groupType": "group",
            "_id": "5ef9ec50bbc43678bcff3277",
            "maximum": 5,
            "lat": "32",
            "lng": "32",
            "vicinity": "동교로",
            "time": "9시 ~ 10시 ( PM )",
            "category": "치킨",
            "groupName": "뿌링클링클링크리",
            "groupUUID": "U7kPvH0OTIvSrDQIrXWcBSOuURe1IFKgcjF5N7g1",
            "__v": 2,
            "lastMessage": "이건테스트야",
            "timeStamp": "1593480851537"
        },
        {
            "users": [
                "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD"
            ],
            "isAdult": false,
            "groupType": "group",
            "_id": "5ef9f10e98b8a55568c4c9f2",
            "maximum": 5,
            "lat": "32",
            "lng": "32",
            "vicinity": "동교로",
            "time": "9시 ~ 10시 ( PM )",
            "category": "치킨",
            "groupName": "뿌링클링클링크리",
            "groupUUID": "g25e8cZNPuCJrJo6lVeB7b1KpeMvuyNqHEvwzcPK",
            "__v": 0,
            "lastMessage": "이거도테스트야",
            "timeStamp": "1593480463168"
        }
    ]

    HTTP 400 : { message: "Chat Room Not Found!" }

    HTTP 404 : { message: "token expiration or User Not Found" }

- POST /searchChatList

> Request

    token : 유저 토큰 [String]

    searchText : 검색할 텍스트 ( 채팅방 이름 ) [String]

> Response

    HTTP 200 : [
        {
            "users": [
                "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD",
                "HIbHPg7mw12XJcEcYcfhO7QkvgJQ6d7XFeBY7k",
                "FvcWS3dplj2vEKncURSq8R3kDoVCZJgvGXdn4b"
            ],
            "isAdult": false,
            "groupType": "group",
            "_id": "5ef9ec50bbc43678bcff3277",
            "maximum": 5,
            "lat": "32",
            "lng": "32",
            "vicinity": "동교로",
            "time": "9시 ~ 10시 ( PM )",
            "category": "치킨",
            "groupName": "뿌링클링클링크리",
            "groupUUID": "U7kPvH0OTIvSrDQIrXWcBSOuURe1IFKgcjF5N7g1",
            "__v": 2,
            "lastMessage": "이건테스트야",
            "timeStamp": "1593480851537"
        },
        {
            "users": [
                "wojvBheCn2HUdglqmT7WeUIKaWZ69vjnYwrePD"
            ],
            "isAdult": false,
            "groupType": "group",
            "_id": "5ef9f10e98b8a55568c4c9f2",
            "maximum": 5,
            "lat": "32",
            "lng": "32",
            "vicinity": "동교로",
            "time": "9시 ~ 10시 ( PM )",
            "category": "치킨",
            "groupName": "뿌링클링클링크리",
            "groupUUID": "g25e8cZNPuCJrJo6lVeB7b1KpeMvuyNqHEvwzcPK",
            "__v": 0,
            "lastMessage": "이거도테스트야",
            "timeStamp": "1593480463168"
        }
    ]m
    or []

    HTTP 400 : { message: "Chat Room Not Found!" }

    HTTP 404 : { message: "token expiration or User Not Found" }

- POST /changeNick : 유저 닉네임 변경

> Request

    token : 유저 토큰 [String]

    nick : 바꿀 유저 닉네임 [String]

> Response

    HTTP 200 : { message: "success!" }

    HTTP 209 : { message: "Same Your Before Nickname" }

    HTTP 404 : { message: "User Not Found!" }

    HTTP 409 : { message: "Nick Duplicate!" }

    HTTp 500 : { message: "ERR!" }

- POST /changeFCM : FCM 변경

> Request

    token : 유저 토큰 [String]

    FCM : FCM [String]

> Response

    HTTP 200 : { message: "success!" }

    HTTP 404 : { message: "User Not Found!" }

- POST /changeProfileImg : 유저 프로필이미지 변경

> Request

    token : 유저 토큰 [String]

    profileImage : 바꿀 이미지 [Base64 String]

> Response

    HTTP 200 : { message: "success!" }

    HTTP 404 : { message: "User Not Found!" }

    HTTP 500 : { message: "ERR!" }

### Socket

# Input Event : Front -> Back

# Output Event : Back -> Front

- Input Event: join onetoone : 매칭 시작

> Value

    isVip: 이성 매칭

    sex: 성별

    uuid: 유저 uuid

- Output Event: matching success : 매칭 성공

> Value

    {
        groupUUID: "aofjewaufheuuffuhefufe" [String]
        nick: "유저닉네임" [String] // 상대방 닉네임
        sex: true [Boolean] // 상대방 성별
    }
