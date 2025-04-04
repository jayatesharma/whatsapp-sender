// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { sendMessage } = require('./whatsappSender');

const app = express();
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    const { numbers, message } = req.body;
    try {
        await sendMessage(numbers, message);
        res.status(200).json({ status: "Messages sent successfully." });
    } catch (e) {
        res.status(500).json({ status: "Error sending messages.", error: e.message });
    }
});

app.get('/', (req, res) => {
    res.send('🚀 WhatsApp Sender API Running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
