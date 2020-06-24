import tistoryPost from "../../util/tistoryPost";
import naverPost from "../../util/naverPost";

export default async (req, res) => {
  const postdata = req.body.postdata;
  const title = req.body.title;
  const blogList = req.body.blogList;
  if (blogList.length) {
    const promiseList = [];
    blogList.forEach(({ blog, id, pw }) => {
      switch (blog) {
        case "naver":
          promiseList.push(naverPost(postdata, title, id, pw));
        case "tistory":
          promiseList.push(tistoryPost(postdata, title, id, pw));
      }
    });

    try {
      await Promise.all(promiseList);
      res
        .status(200)
        .json({ returnMessage: "포스팅 되었습니다.", returnCode: 0 });
    } catch (e) {
      console.log("catch 에러 입니다.");
      res
        .status(200)
        .json({ returnMessage: "catch 에러 입니다.", returnCode: -1 });
    }
  } else {
    res
      .status(200)
      .json({ returnMessage: "블로그를 선택해주세요.", returnCode: -1 });
  }
};
