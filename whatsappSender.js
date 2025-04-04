// whatsappSender.js
const puppeteer = require('puppeteer');

async function sendMessage(numbers, message) {
    console.log("🚀 Launching WhatsApp Web...");

    const browser = await puppeteer.launch({
        headless: true,
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com');

    console.log("⏳ Waiting 15 seconds for QR Code scan...");
    await new Promise(resolve => setTimeout(resolve, 15000));

    for (let number of numbers.split(',')) {
        console.log(`📩 Opening chat for ${number.trim()}...`);
        const chatUrl = `https://web.whatsapp.com/send?phone=${number.trim()}&text=${encodeURIComponent(message)}`;
        await page.goto(chatUrl);

        console.log("⏳ Waiting 10 seconds for chat to load...");
        await new Promise(resolve => setTimeout(resolve, 10000));

        try {
            await page.waitForSelector('footer div[contenteditable="true"]', { timeout: 30000 });
            const inputField = await page.$('footer div[contenteditable="true"]');
            await inputField.click();
            await page.keyboard.type(message, { delay: 100 });

            const sendButton = await page.$('footer button span[data-icon="send"]');
            if (sendButton) {
                await sendButton.click();
                console.log(`✅ Message sent to ${number.trim()}`);
            } else {
                console.log("❌ Send button not found! Skipping...");
            }
        } catch (error) {
            console.log(`❌ Error sending message to ${number.trim()}:`, error.message);
        }

        console.log("⏳ Waiting 5 seconds before next message...");
        await new Promise(resolve => setTimeout(resolve, 5000));
    }

    console.log("✅ All messages sent!");
    await browser.close();
}

module.exports = { sendMessage };
