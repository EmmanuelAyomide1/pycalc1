def ask():
 give=input("Enter the sentence\n")
 b=give.split()
 oldc=""
 i=[]
 for x in b :
    i.append(x[::-1])
 for c in i:
     if c in b:
         newC=c
         greatc=max((oldc,newC),key=len)
         oldc=greatc 
 try:
  print(greatc)
  cont()
 except:
     print("No parkingdrom found")
     cont()
def cont():
    print("Do you wish to continue ?")
    print("1: Yes")
    print("2: No")
    e=input("Enter 1 or 2\n")
    if e=='1':
      ask()
    else:
      try:
       exit()     
      except:
        print("Bye")
ask()