const puppeteer = require("puppeteer");
const auth = require("./auth.json");
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://nid.naver.com/nidlogin.login");

  await page.evaluate(async (auth) => {
    const id_input = document.getElementById("id");
    const pw_input = document.getElementById("pw");

    id_input.value = auth.id;
    pw_input.value = auth.pw;
    const btn_login = document.getElementById("log.login");
    btn_login.click();
  }, auth);

  await page.screenshot({ path: "naver.png" });
  browser.close();
})();
