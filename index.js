  const puppeteer = require('puppeteer');

  (async () => {
    // setup puppeteer
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const navigationPromise = page.waitForNavigation()
    
    // browser to classic realms page
    await page.goto('https://worldofwarcraft.com/en-us/game/status/classic-us')
    await page.setViewport({ width: 1792, height: 934 })
    await navigationPromise

    // select the realms table
    await page.waitForSelector('.RealmsTable > .SortTable > .SortTable-body > .SortTable-row:nth-child(21) > .SortTable-col:nth-child(2)')
    // const realms = await page.$$eval('.RealmsTable > .SortTable > .SortTable-body > .SortTable-row:nth-child(21) > .SortTable-col:nth-child(2)', realm => realm.map(option => option.textContent));

    // store the text context of each row
    const realmsTable = await page.$$eval('.RealmsTable > .SortTable > .SortTable-body > .SortTable-row', realms => realms.map(realms => realms.textContent));

    // close the browser
    await browser.close()

    let realmDict = {};
    let realmNames =  [];

    // sanitize and store the realm info
    const sanitizeRealm = (realm) => {
      // detect and store the realm type
      let realmType = 'PvP'
      if (realm.includes('PvE')) { realmType = 'PvE' }
      else if (realm.includes('RP')) { realmType = 'RP' }
      // store the realm name
      let realmName = realm.split(realmType)[0];
      // store the realm population
      let realmPop = 'Low'
      if (realm.includes('Medium')) { realmPop = 'Medium' }
      else if (realm.includes('High')) { realmPop = 'High' }
      // store the entire result
      realmNames.push(realmName)
      realmDict[realmName] = { realmName, realmType, realmPop }
      return `${realmName, realmType, realmPop}`;
    };

    realmsTable.forEach((realm) => realm = sanitizeRealm(realm))

    // Get process.stdin as the standard input object.
    let standard_input = process.stdin;

    // Set input character encoding.
    standard_input.setEncoding('utf-8');

    // Prompt user to input data in console.
    console.log("Please input realm name in command line.");

    // When user input data and click enter key.
    standard_input.on('data', function (data) {

      // User input exit.
      if (data === 'exit\n') {
        // Program exit.
        console.info("Quitting ClassicRealmStatusBuddy");
        process.exit();
      } else {
        data = data.toString().trim();
        if (realmNames.includes(data.toString().trim())) {
          console.info(realmDict[data]);
        }
        else {
          console.info(`${data} does not exist. Please try again or type "exit" to exit`)
          console.info(realmNames)
        }
      }
    });
  })();
