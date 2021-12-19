from linebot import (LineBotApi, WebhookHandler)
from linebot.exceptions import (InvalidSignatureError)
from linebot.models import *

import mysql.connector 
import random


#random

def random_num():
    random_num = random.randint(0,1399)
    return random_num


mydb = mysql.connector.connect(
  host="us-cdbr-east-04.cleardb.com",
  user="be0a568c4de6e7",
  passwd="5550c9e1",
  database="heroku_44df9021ce55113"
)
mycursor = mydb.cursor()

mycursor.execute("select id, category, dessert_title , dessert_cover, dessert_quantity, dessert_time, dessert_ingredient, dessert_step From dessert_recipe where id = " + str((10 * random_num()) + 5))

record = mycursor.fetchone()

id = record[0]
category = record[1]
dessert_title = record[2]
dessert_cover = record[3]
dessert_quantity = record[4]
dessert_time = record[5]
dessert_ingredient = record[6]
dessert_step = record[7]


def dessert_random():
    message = TextSendMessage(
        text = (str(id)+"\n"+str(category)+"\n"+str(dessert_title)+"\n"+str(dessert_cover)+"\n"+str(dessert_quantity)+"\n"+str(dessert_time)+"\n"+str(dessert_ingredient)))
    return message


#推播
def notification_content():
    message = TextSendMessage(text=(str(dessert_step)))
    return message

#說明
def info_content():
    message = TextSendMessage(text=("您好這裡是點心食譜機器人\n請由下方功能表啟動我\n黃色：選單\n藍色：隨機產生食譜\n綠色：設定推播通知\n紫色：使用說明"))
    return message

#種類選單
def buttons_message_dessert():
    message = TemplateSendMessage(
        alt_text='請用手機版瀏覽',
        template=ButtonsTemplate(
            thumbnail_image_url='https://imgur.com/H8XHyHf.jpg',
            title="今天想做什麼點心？",
            text="請從下方選擇",
            actions=[
                MessageTemplateAction(
                    label="蛋糕",
                    text="蛋糕"
                ),
                MessageTemplateAction(
                    label="餅乾",
                    text="餅乾"
                ),
                MessageTemplateAction(
                    label="泡芙",
                    text="泡芙"
                ),
                MessageTemplateAction(
                    label="布丁",
                    text="布丁"
                )
                
                
                
            ]
        )
    )
    return message

#點心滑動選單
def Carousel_Template_dessert_cake():
    message = TemplateSendMessage(
        alt_text='甜點列表',
        template=CarouselTemplate(
            columns=[
                CarouselColumn(
                    thumbnail_image_url='https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Number_1_in_green_rounded_square.svg/200px-Number_1_in_green_rounded_square.svg.png',
                    title = (a["dessert_title"]),
                    text = (str(a["dessert_quantity"])+"\n"+str(a["dessert_time"])),
                    actions=[
                        MessageTemplateAction(
                            label='選擇',
                            text=('我要做' + str(a["dessert_title"]))
                        )
                    ]
                ),
                CarouselColumn(
                    thumbnail_image_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuo7n2_HNSFuT3T7Z9PUZmn1SDM6G6-iXfRC3FxdGTj7X1Wr0RzA',
                    title='草莓蛋糕',
                    text='想先看食材還是步驟？',
                    actions=[
                        MessageTemplateAction(
                            label='食材',
                            text='草莓蛋糕材料'
                        )
                    ]
                ),
                CarouselColumn(
                    thumbnail_image_url='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Number_3_in_yellow_rounded_square.svg/200px-Number_3_in_yellow_rounded_square.svg.png',
                    title='這是第三個模塊',
                    text='最多可以放十個',
                    actions=[
                        MessageTemplateAction(
                            label='食材',
                            text='草莓蛋糕材料'
                        ),
                        
                
                        
                    ]
                )

            ]
        )
    )
    return message

def pancake_content():
    message = TextSendMessage(text=(x["dessert_title"]))
    return message