// File: /api/chat.js

const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // Pastikan metode permintaan adalah POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Ambil kunci API dari environment variables Vercel
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    if (!DEEPSEEK_API_KEY) {
        return res.status(500).json({ error: 'Deepseek API key not configured.' });
    }

    try {
        const userMessage = req.body.message;
        
        const messages = [
            { role: "system", content: "Anda adalah asisten AI yang ramah, dirancang untuk membantu pengunjung situs D3JZ. Berikan jawaban yang ringkas dan informatif berdasarkan informasi di portofolio D3JZ." },
            { role: "user", content: userMessage }
        ];

        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: messages,
                stream: false
            })
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
            res.status(200).json({ response: data.choices[0].message.content });
        } else {
            res.status(500).json({ response: "Maaf, Deepseek gagal memberikan respons." });
        }

    } catch (error) {
        console.error("Error calling Deepseek API:", error);
        res.status(500).json({ response: "Maaf, terjadi kesalahan pada server." });
    }
};
