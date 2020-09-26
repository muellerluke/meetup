import puppeteer from "puppeteer";

describe("show/hide an event details", () => {
  test("An event element is collapsed by default", async () => {
    jest.setTimeout(20000);
    const browser = await puppeteer.launch({
      headless: true,
      slowMo: 250,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.goto("https://coursifyit.com");
    await page.screenshot({ path: "example.png" }); // Takes a screenshot and saves it as “example.png”
    console.log("hit");
    var eventExists = await page.waitForSelector(".Eventlist");
    console.log(eventExists);
    const extra = await page.$(".Event .event-Details");
    expect(extra).toBeNull();
    browser.close();
  });
});
