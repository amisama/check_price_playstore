const puppeteer = require('puppeteer');

(async () => {
  const glParams = ['US', 'BO', 'BR','BR', 'CL', 'CO','CR', 'MX', 'PY','PE', 'DZ', 'EU','BG', 'CZ', 'DK','EG', 'GE', 'GH','GB', 'HU', 'JO', 'KZ', 'KE', 'CH', 'MA', 'NG', 'NO', 'PL', 'QA', 'RO', 'SA', 'RS', 'ZA', 'SE', 'CH', 'TZ', 'TR', 'UA', 'AE', 'GB', 'AU', 'BD', 'HK', 'IN', 'ID', 'JP', 'MO', 'MY', 'MM', 'NZ', 'PK', 'PH', 'SG', 'KR', 'LK', 'TW', 'TH', 'VN']; 

	const browser = await puppeteer.launch({ 
    headless: false, // false untuk browser nya tampi, true buat hidden
	});

  for (const gl of glParams) {
    const url = `https://play.google.com/store/apps/details?id=com.roblox.client&hl=id&gl=${gl}`; //paste url ganti ?id= nya aja ?id=com.roblox.client
    const page = await browser.newPage();
    await page.goto(url);
    const buttonXPath = '//*[@id="yDmH0d"]/c-wiz[2]/div/div/div[1]/div/div[2]/div/div[1]/div[1]/c-wiz[2]/div/section/header/div/div[2]/button/i';
    const buttonHandle = await page.evaluateHandle(xpath => {
      const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return element;
    }, buttonXPath);
    await buttonHandle.evaluate(button => button.click());
    await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

    const textXPath = '//*[@id="yDmH0d"]/div[5]/div[2]/div/div/div/div/div[2]/div[3]/div[5]/div[2]';
    const text = await page.evaluate(xpath => {
      const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return element ? element.textContent.trim() : null;
    }, textXPath);

    console.log(`-${gl}:`, text);

    // Tutup halaman
    await page.close();
  }

  // Tutup browser
  await browser.close();
})();
