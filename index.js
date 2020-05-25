const puppeteer = require("puppeteer");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.naver.com/");
  console.log("page", page);
  page.getEle;

  await page.evaluate(() => {
    const accountWrap = document.getElementById("account");
    accountWrap.getElementsByClassName("link_login")[0].click();
  });

  await page.screenshot({ path: "naver.png" });
  browser.close();
})();
