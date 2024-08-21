import { test, expect } from '@playwright/test';

test('Press the button', async ({ page }) => {

  await page.goto('https://daedalus.janniskaranikis.dev/challenges/1-press-the-button');

  await page.getByRole('button', { name: 'Press Me' }).click();
  
  await expect(page.locator('div.text-green-600.text-lg')).toContainText('You made it! Your assert code: ASSERTME' );
  await expect(page.getByText('ASSERTME')).toBeVisible();

});

test('Log in', async ({ page }) => {

    await page.goto('https://daedalus.janniskaranikis.dev/challenges/2-log-in');
  
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('SafePass123');

    await page.getByRole('button', { name: 'Log in' }).click();
    
    await expect(page.locator('div.text-green-600.text-lg')).toContainText('Good Job! Your well earned assert code: ASSERTME' );
    await expect(page.getByText('ASSERTME')).toBeVisible();
  
});

test('Mr.Robot', async ({ page }) => {

    await page.goto('https://daedalus.janniskaranikis.dev/challenges/3-mr-robot');

    var buttons = page.locator('div.flex.justify-between.mt-4');
    var buttonValues = await buttons.innerText();

    var leftButton = buttonValues.slice(0, 2);
    var leftNumber: number = +leftButton;
    if(leftNumber < 10) {
        var rightButton = buttonValues.slice(2, 5);
    } else {
        var rightButton = buttonValues.slice(3, 5);
    }
    var rightNumber: number = +rightButton;

    for(let i = leftNumber; leftNumber > 0; leftNumber--){
        await page.getByRole('button', { name: leftNumber.toString(), exact: true}).first().click();
    }

    for(let i = rightNumber; rightNumber > 0; rightNumber--){
        await page.getByRole('button', { name: rightNumber.toString(), exact: true}).click();
    }

    var sodaChoice = await page.locator('span#correctddValue.font-bold').innerText();
    var element = page.locator('select.border-4.border-red-400.mt-2.py-4.mb-6.px-6.rounded-xl');
    await element.selectOption(sodaChoice);

    await expect(page.locator('div.text-green-600.text-lg')).toContainText('Mr. Robot is happy! : ASSERTME' );
    await expect(page.getByText('ASSERTME')).toBeVisible();
  
});

test('Bad data', async ({ page }) => {

    await page.route('https://daedalus.janniskaranikis.dev/api/users' , route => route.fulfill({
        json: [
            {
              "name": "Richard",
              "age": 31
            },
            {
              "name": "Dinesh",
              "age": 33
            },
            {
              "name": "Gilfoyle",
              "age": 35
            },
            {
              "name": "Bighead",
              "age": 29
            },
            {
              "name": "Jared",
              "age": 31
            },
            {
                "name": "Malin", 
                "age": 42 
            },  
          ]
    }));

    await page.goto('https://daedalus.janniskaranikis.dev/challenges/4-bad-data');

    await expect(page.locator('div.text-green-600.text-lg')).toContainText('Good job! Your assert code: ASSERTME' );
    await expect(page.getByText('ASSERTME')).toBeVisible();
  
  });

  test('Create a quote', async ({ page }) => {

    await page.goto('https://daedalus.janniskaranikis.dev/challenges/5-create-a-quote');

    var quote = page.locator('q.text-lg.italic.mb-8.select-none');
    var stringOfWords = await quote.innerText();

    var words = stringOfWords.split(' ');
    var count = words.length;
    
    for(let i = 0; i < count; i++) {
       var wordToGet = words[i];
       var word = page.getByRole('listitem').getByText(wordToGet,{ exact: true});
       await word.hover(); 
       await page.mouse.down();
       await page.getByRole('list').nth(1).hover();
       await page.mouse.up();
    }
    
    await expect(page.locator('div.text-green-600.text-lg')).toContainText('That is correct! : ASSERTME ');
    await expect(page.getByText('ASSERTME')).toBeVisible();

});

