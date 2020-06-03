import puppeteer from "puppeteer";
import { tistroy } from "../auth.json";

const tistoryPost = async (postdata, title) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(
      `https://dodosans.tistory.com/manage/newpost/?type=post&returnURL=%2Fmanage%2Fposts%2F`
    );
    // 네이버 로그인
    await page.type("#loginId", tistroy.id, { delay: 100 });
    await page.type("#loginPw", tistroy.pw, { delay: 100 });
    await page.click('[type="submit"]');
    
    
    await page.waitFor(".textarea_tit");

    await page.click('#mceu_18-open');
    await page.click('#mceu_32');

    await page.keyboard.type(postdata, { delay: 100 });

    await page.type(".textarea_tit", title, { delay: 100 });
    await page.click(".btn.btn-default");
    await page.waitFor("#open20");
    await page.click("#open20");
    await page.click('[type="submit"]');
    await page.screenshot({ path: "tisrotk.png" });
  } catch (e) {
    console.log("tistroy error=============", e);
  } finally {
    await browser.close();
  }
};

export default tistoryPost;
