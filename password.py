import string
import random
Letters=string.ascii_letters
Numbers=string.digits
SpecialCharacter=string.punctuation
def do():
  try:
     amount=int(input("How long should the password be\n"))
  except:
      print("invalid response")
      do()
  password=[]
  Choices=[Letters,Numbers,SpecialCharacter,Letters]
  i=0
  while i<amount:
     choice=random.choice(Choices)
     password.append(random.choice(choice))
     i+=1
  StrongPassword="".join(password)
  print(StrongPassword)
  ans=input("Do you wish to continue: 1: True or 2: false\n")
  if ans=='1':
    do()
  else:
   exit()
do()
