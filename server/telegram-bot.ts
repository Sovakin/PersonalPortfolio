import { Telegraf } from 'telegraf';
import axios from 'axios';
import { Express, Request, Response } from 'express';
import { log } from './vite';

interface IpApiResponse {
    ip: string;
    city: string;
    region: string;
    country_name: string;
    latitude: number;
    longitude: number;
    org: string;
    error?: string;
}

export function setupTelegramBot(app: Express) {
    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || 'YOUR_BOT_TOKEN_HERE');
    const chatId = process.env.TELEGRAM_CHAT_ID || 'YOUR_CHAT_ID_HERE';
    app.use(async (req: Request, res: Response, next) => {
        try {
            const clientIp = req.ip || req.socket.remoteAddress || 'Unknown IP';
            if (clientIp === '::1' || clientIp === '127.0.0.1' || req.path.startsWith('/api/telegram')) {
                return next();
            }
            const response = await axios.get<IpApiResponse>(`https://ipapi.co/${clientIp}/json/`);
            const data = response.data;

            if (data.error) {
                throw new Error(data.error);
            }
            const message = `
Новый вход на сайт:
IP: ${data.ip}
Город: ${data.city || 'Неизвестно'}
Регион: ${data.region || 'Неизвестно'}
Страна: ${data.country_name || 'Неизвестно'}
Координаты: ${data.latitude}, ${data.longitude}
Провайдер: ${data.org || 'Неизвестно'}
Путь: ${req.path}
Время: ${new Date().toLocaleString('ru-RU')}
`;
            await bot.telegram.sendMessage(chatId, message);
            log(`Visit tracked: ${clientIp} - ${data.city}, ${data.country_name}`);

        } catch (error) {
            log(`Error tracking visit: ${error instanceof Error ? error.message : String(error)}`);
        }

        next();
    });
    bot.launch().then(() => {
        log('Telegram bot started');
    });
    process.once('SIGINT', () => bot.stop('SIGINT'));
    process.once('SIGTERM', () => bot.stop('SIGTERM'));
    app.get('/api/telegram/status', (_req, res) => {
        res.json({ status: 'running', timestamp: new Date().toISOString() });
    });
}