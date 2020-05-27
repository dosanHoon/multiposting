const puppeteer = require("puppeteer");
const auth = require("./auth.json");
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(
    `http://blog.naver.com/${auth.id}?Redirect=Write`
  );

  // 네이버 로그인
  await page.type("#id", auth.id, { delay: 100 });
  await page.type("#pw", auth.pw, { delay: 100 });
  await page.click('[type="submit"]');
  await page.waitForNavigation();
  
  await page.evaluate(`
  document.querySelector("#mainFrame").contentDocument.querySelector("#se2_iframe").contentDocument.querySelector(".se2_inputarea").innerHTML = "${postdata}"


  document.querySelector("#mainFrame").contentDocument.querySelector("#btn_submit").click()
  `);
    
  await page.waitForNavigation();
  await page.screenshot({ path: "naver.png" });
  await browser.close()
})();
