import requests
url=input("Enter the name of the url\n")
def Check():
  try:
    r=requests.head(url)
    b=r.status_code
    if b== 200:
        print("Your site is up")
    else:
        print("Your site is not up")
  except requests.ConnectionError as e:
    return e
Check()