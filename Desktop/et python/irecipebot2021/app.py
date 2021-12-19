from flask import Flask, request, abort

from linebot import (
    LineBotApi, WebhookHandler
)
from linebot.models import TextSendMessage

from linebot.exceptions import (
    InvalidSignatureError
)
from linebot.models import *


#======這裡是呼叫的檔案內容=====
from message import *
from new import *
from Function import *
from icook import *
from test import *
from sqlconnect import *
#======這裡是呼叫的檔案內容=====

#======python的函數庫==========
import tempfile, os
import datetime
import time
#======python的函數庫==========

app = Flask(__name__)
static_tmp_path = os.path.join(os.path.dirname(__file__), 'static', 'tmp')
# Channel Access Token
line_bot_api = LineBotApi('NpFKgKvhpmsmM4ZhPY2CgZAglHwCGone1BCw8xP6kwyo9PsveuroclFMo6ofLGwZB09SA0czu1daJrIJpZJZbFPfuRyK/T5K9WNh7Gxps2AlFv7ZwsdGIHC2pqFulHEF8Mo3uADJwpGhM7kHNiokhwdB04t89/1O/w1cDnyilFU=')
# Channel Secret
handler = WebhookHandler('591b8a93f56666baefe8b755d9a5c065')

# 監聽所有來自 /callback 的 Post Request
@app.route("/callback", methods=['POST'])
def callback():
    # get X-Line-Signature header value
    signature = request.headers['X-Line-Signature']
    # get request body as text
    body = request.get_data(as_text=True)
    app.logger.info("Request body: " + body)
    # handle webhook body
    try:
        handler.handle(body, signature)
    except InvalidSignatureError:
        abort(400)
    return 'OK'


# 處理訊息
@handler.add(MessageEvent, message=TextMessage)
def handle_message(event):
    msg = event.message.text
    if '使用說明' in msg:
        message = info_content()
        line_bot_api.reply_message(event.reply_token, message)
    
    elif '選單' in str(msg):
        message = buttons_message_dessert()
        line_bot_api.reply_message(event.reply_token, message)
    
    elif '蛋糕' == str(msg):
        message = Carousel_Template_dessert_cake()
        line_bot_api.reply_message(event.reply_token, message)

    elif '設定推播通知' == str(msg):
        message = notification_content()
        line_bot_api.reply_message(event.reply_token, message)
    
    elif '鬆餅' == str(msg):
        message = pancake_content()
        line_bot_api.reply_message(event.reply_token, message)

    elif '來點驚喜吧' == str(msg):
        message = dessert_random()
        line_bot_api.reply_message(event.reply_token, message)

    else:
        message = TextSendMessage(text=(msg + "ʕ•ᴥ•ʔ"))
        line_bot_api.reply_message(event.reply_token, message)

import os
if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
