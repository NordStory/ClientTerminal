# Инструкции по настройке Telegram-бота

## Проблема
При попытке отправить Inventory ID возникает ошибка:
```
ETELEGRAM: 400 Bad Request: chat not found
```

## Решение

### 1. Создайте файл `.env` в корне папки `self-service-terminal`

```bash
cd self-service-terminal
touch .env
```

### 2. Добавьте в файл `.env` следующие строки:

```env
# Telegram Bot Configuration
TGTOKEN=your_telegram_bot_token_here
IDGROUP=your_telegram_group_id_here

# Server Configuration
PORT=1500

# Другие настройки
NODE_ENV=development
```

### 3. Получите токен бота у @BotFather

1. Откройте Telegram
2. Найдите @BotFather
3. Отправьте команду `/newbot`
4. Следуйте инструкциям
5. Скопируйте полученный токен в переменную `TGTOKEN`

### 4. Получите ID группы

#### Вариант A: Для группы
1. Создайте группу в Telegram
2. Добавьте вашего бота в группу
3. Отправьте любое сообщение в группу
4. Откройте @userinfobot
5. Перешлите сообщение из группы
6. Скопируйте ID группы (начинается с `-`)

#### Вариант B: Для канала
1. Создайте канал в Telegram
2. Добавьте бота как администратора канала
3. Отправьте любое сообщение в канал
4. Получите ID через @userinfobot

### 5. Пример правильного файла .env

```env
TGTOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
IDGROUP=-1001234567890
PORT=1500
NODE_ENV=development
```

### 6. Перезапустите сервер

```bash
# Остановите сервер (Ctrl+C)
# Запустите заново
npm start
```

## Проверка работы

1. Откройте `http://localhost:1500`
2. Введите любой Inventory ID
3. Нажмите "Отправить"
4. Проверьте, что в Telegram группе/канале появилось уведомление

## Возможные проблемы

- **"chat not found"** - неверный ID группы/канала
- **"Unauthorized"** - неверный токен бота
- **"Forbidden"** - бот не добавлен в группу/канал
