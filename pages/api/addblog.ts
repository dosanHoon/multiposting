import fs from "fs";

interface blogType {
  blog: "naver" | "tistory" | "velog";
  id: string;
  pw: string;
}
export default async (req, res) => {
  const blogdata: blogType[] = req.body.blogdata;

  fs.readFile("./auth.json", "utf8", function (err, data) {
    if (data) {
      const { list: oriBlogList } = JSON.parse(data);
      const newBlogList = [...oriBlogList, ...blogdata];
      fs.writeFile(
        "./auth.json",
        JSON.stringify({
          list: newBlogList,
        }),
        "utf8",
        function (err) {
          if (err === undefined || err == null) {
            res.status(200).json({
              returnMessage: "테스트중 입니다. 되었습니다.",
              returnCode: 0,
            });
          }
        }
      );
    }
  });
};
