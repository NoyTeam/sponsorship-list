import requests, time
config = eval(open("./config.json", "r", encoding="utf-8").read())

username = input("Username: ")
avatar = input("Avatar (URL): ")
if avatar == "":
    avatar = ""
money = float(input("Money (HKD): "))
money = int(money*100)
thistime = input("Time (Now/UnixNum): ")
if thistime == "Now" or thistime == "now":
    thistime = time.time()

requests.post("{}/api/add".format(config['server']), data={'username': username, 'avatar': avatar, 'money': money, 'time': thistime, 'token': config['token']})
print("ok")