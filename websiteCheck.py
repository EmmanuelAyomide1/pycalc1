import requests
def Check():
  try:
    url=input("Enter the name of the url\n")
    r=requests.head(url)
    b=r.status_code
    if b== 200:
        print("Your site is up")
    else:
        print("Your site is not up")
  except requests.ConnectionError as e:
    return e
    Check()
  except:
    print("Invalid response")
    
    print("Please come back when you have a valid link")
    exit()
      
   
       
Check()