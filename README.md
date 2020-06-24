# 나홀로 밥집

### MEMBER: 심효근, 박태욱, 이유진, 이민혁, 임수민, 강은서, 박종훈

## Server Developer: PM-박태욱, 박종훈

## bCrypt Developer: PM-심효근

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

- get /getDetail/:place_id : 음식점 상세 정보

> Params

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
