from selenium import webdriver
import time
path = './driver/chromedriver'
driver = webdriver.Chrome(path)
driver.get("https://web.whatsapp.com/")
for i in range(1, 10):
    if i == 0:
        time.sleep(30)
    result = driver.execute_script("return Store.Chat.models[2]")
    print result
    print "\n"
    time.sleep(10)
# script to push results in local storage
