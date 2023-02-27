import { rest } from "msw";
const baseURL = "https://tatted-api.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 83,
        username: "testartist",
        email: null,
        first_name: "",
        last_name: "",
        profile_id: 62,
        profile_image:
          "https://res.cloudinary.com/dgxr5lnrt/image/upload/v1/media/../drilldown-removebg-preview_dxh3rz",
        is_artist: true,
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
