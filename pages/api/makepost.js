import puppeteer from "puppeteer";
import { naver } from "../../auth.json";
import tistoryPost from "../../util/tistoryPost";

const naverPost = async (postdata, title) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(`http://blog.naver.com/${naver.id}?Redirect=Write`);

    // 네이버 로그인
    await page.type("#id", naver.id, { delay: 100 });
    await page.type("#pw", naver.pw, { delay: 100 });
    await page.click('[type="submit"]');
    await page.waitForNavigation();

    //제목 입력
    await page.mouse.click(240, 118);
    await page.keyboard.type(title, { delay: 100 });
    //HTML 선택
    await page.evaluate(
      `document.querySelector("#mainFrame").contentDocument.querySelector(".se2_to_html").click()`
    );
    //포스트 입력
    await page.mouse.click(132, 272);
    await page.keyboard.type(postdata, { delay: 100 });

    await page.evaluate(
      `document.querySelector("#mainFrame").contentDocument.querySelector("#btn_submit").click()`
    );

    await page.waitForNavigation();
    await page.screenshot({ path: "naver.png" });
  } catch (e) {
    console.log("naverPost error=============", e);
  } finally {
    await browser.close();
  }
};

export default async (req, res) => {
  const postdata = req.body.postdata;
  const title = req.body.title;
  await Promise.all([naverPost(postdata, title), tistoryPost(postdata, title)]);
  res.status(200).json({ text: postdata });
};
