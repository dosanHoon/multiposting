import puppeteer from "puppeteer";
import auth from "../../auth.json";

const handelr = async (postdata) => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto(`http://blog.naver.com/${auth.id}?Redirect=Write`);

    // 네이버 로그인
    await page.type("#id", auth.id, { delay: 100 });
    await page.type("#pw", auth.pw, { delay: 100 });
    await page.click('[type="submit"]');
    await page.waitForNavigation();
    console.log("postdata", postdata);

    await page.mouse.click(132, 272, { delay: 100 });
    // await page.evaluate(`
    //       document.querySelector("#mainFrame").contentDocument.querySelector("#se2_iframe").contentDocument.querySelector(".se2_inputarea").innerHTML="${postdata}"`);
    // await page.evaluate(
    //   `document.querySelector("#mainFrame").contentDocument.querySelector("#btn_submit").click()`
    // );

    // const mainFrame =  await page.$("#mainFrame")
    // console.log("mainFrame",mainFrame.contentDocument)
    // const se2_iframe = await mainFrame.contentDocument.$("se2_iframe")
    // console.log("se2_iframe",se2_iframe)
    // await se2_iframe.contentFrame.$(".se2_inputarea").click()
    await page.keyboard.type(postdata, {delay: 100});
    await page.evaluate(
      `document.querySelector("#mainFrame").contentDocument.querySelector("#btn_submit").click()`
    );

    await page.waitForNavigation();
    await page.screenshot({ path: "naver.png" });
  } catch (e) {
    console.log("error=============", e);
  } finally {
    await browser.close();
  }
};

export default (req, res) => {
  const postdata = req.body.postdata;
  handelr(postdata).then(() => {
    res.status(200).json({ text: postdata });
  });
};
