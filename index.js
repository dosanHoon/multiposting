const puppeteer = require("puppeteer");
const auth = require("./auth.json");
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    "https://nid.naver.com/nidlogin.login?svctype=262144&url=http://m.naver.com/aside/"
  );

  // 네이버 로그인
  await page.type("#id", auth.id, { delay: 100 });
  await page.type("#pw", auth.pw, { delay: 100 });
  await page.click('[type="submit"]');
  await page.waitForNavigation();

  await page.screenshot({ path: "naver.png" });
  browser.close();
})();
