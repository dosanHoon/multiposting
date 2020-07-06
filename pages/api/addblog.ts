import fs from "fs";
import { BlogType } from "../../src/models/BlogModel";

export default async (req, res) => {
  const blogdata: BlogType[] = req.body.blogdata;

  fs.writeFile(
    "./auth.json",
    JSON.stringify({
      list: blogdata,
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
};
