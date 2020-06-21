import axios from "axios";
import Distance from "geo-distance";
let key = "AIzaSyCcA57HoaeUaXF_JFqFpkYPg0nWWSYXR8s";
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
};
