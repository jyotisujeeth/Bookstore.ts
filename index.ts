const puppeteer = require("puppeteer");
import { Browser } from "puppeteer";

const url = "https://books.toscrape.com/";

const main = async () => {
  const browser: Browser = await puppeteer.launch(
    // { headless: false } //opens url in actual browser
    );
  const page = await browser.newPage();
  await page.goto(url);

  const bookData = await page.evaluate(() => {

    // const convertPrice = (price: string) => {
    //     return parseFloat(price.replace('', ''))
    // }

    const url = "https://books.toscrape.com/";
    const bookPods = Array.from(document.querySelectorAll('.product_pod'))
    const data = bookPods.map((book: any) => ({
        title: book.querySelector('h3 a').getAttribute('title'),
        price: (book.querySelector('.price_color').innerText),
        imgSrc: url + book.querySelector('img').getAttribute('src'),
        rating: book.querySelector('.star-rating').classList[1]
    }))
    return data;
  })
  // console.log(bookData)

  const listData = await page.evaluate(() => {
    const navList = document.querySelectorAll('.nav-list')
    return navList
  })
  console.log(listData[0])
 
  await browser.close();
};

main();
