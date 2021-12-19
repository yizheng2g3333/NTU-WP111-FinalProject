import mysql.connector 
import random


a = random.randint(0,10)

mydb = mysql.connector.connect(
  host="us-cdbr-east-04.cleardb.com",
  user="be0a568c4de6e7",
  passwd="5550c9e1",
  database="heroku_44df9021ce55113"
)
mycursor = mydb.cursor()

mycursor.execute("select dessert_title , dessert_quantity From dessert_recipe where id = " + str((10 * a) + 5))

record = mycursor.fetchone()

dessert_title = record[0]

dessert_quantity = record[1]

print(dessert_title)