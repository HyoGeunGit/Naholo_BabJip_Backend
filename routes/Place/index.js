import axios from "axios";
import Distance from "geo-distance";
import moment from "moment";
import "moment-timezone";
// moment.tz.setDefault("Asia/Seoul");
let key = "AIzaSyDplX2j3RVt5rqsTB9QfN9O6HxXcGgr1g0";
const getResponse = (arr, lat, lng, range) => {
  let returnArray = [];
  return new Promise(async (resolve) => {
    let result = await arr.reduce((acc, obj) => {
      let json = {
        lat: obj.geometry.location.lat,
        lng: obj.geometry.location.lng,
        name: obj.name,
        vicinity: obj.vicinity,
        photo: obj.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=${obj.photos[0].photo_reference}&key=${key}`
          : "",
        place_id: obj.place_id,
      };
      let di = Distance.between(
        { lat: lat, lon: lng },
        { lat: json.lat, lon: json.lng }
      );
      if (di <= Distance(`${range} m`)) returnArray.push(json);
      return acc;
    }, {});

    resolve(returnArray);
  });
};

const getPhoto = (arr) => {
  let returnArray = [];
  return new Promise(async (resolve) => {
    await arr.map((item, i) => {
      let photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&maxwidth=1600&photoreference=${item.photo_reference}&key=${key}`;
      returnArray.push(photoUrl);
    });
    resolve(returnArray);
  });
};
export const Place = {
  find: async (req, res) => {
    // lat = 경도
    // lng = 위도
    // range = 거리
    let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.body.lat},${req.body.lng}&radius=${req.body.range}&type=restaurant&language=ko&opennow=true&key=${key}`;
    let result = await axios.get(url);
    getResponse(
      result.data.results,
      req.body.lat,
      req.body.lng,
      req.body.range
    ).then((data) => {
      res.status(200).json(data);
    });
  },
  category: async (req, res) => {
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURI(
      req.body.category
    )}&radius=${req.body.range}&location=${req.body.lat},${
      req.body.lng
    }&language=ko&opennow=true&key=${key}`;
    let result = await axios.get(url);
    getResponse(
      result.data.results,
      req.body.lat,
      req.body.lng,
      req.body.range
    ).then((data) => {
      res.status(200).json(data);
    });
  },
  detail: async (req, res) => {
    let url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.body.place_id}&language=ko&fields=name,rating,vicinity,formatted_phone_number,opening_hours,review,price_level,photo&key=${key}`;
    let result = await axios.get(url);
    const getData = () => {
      return new Promise(async (resolve) => {
        let day = moment().day();
        day == 0 ? (day = 7) : (day = day);
        let data = result.data.result;
        let return_Data = {
          formatted_phone_number: data.formatted_phone_number, // 전화번호
          name: data.name, // 가게 이름
          openTime: data.opening_hours.weekday_text[day - 1], // 오픈 시간
          openNow: data.opening_hours.open_now, // 지금 열었니
          rating: data.rating, // 별점
          photo: await getPhoto(data.photos), // 사진
          price_level: data.price_level, // 가격대 난이도 0 — 무료 1 — 저렴한 2 - 보통의 3 — 고가 4 — 매우 비싸다
          vicinity: data.vicinity, // 주소
          reviews: data.reviews, // 리뷰
        };
        resolve(return_Data);
      });
    };
    getData().then((return_Data) => {
      res.status(200).json(return_Data);
    });
  },
};
