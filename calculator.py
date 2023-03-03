def Add(a,b):
    print("Adding "+ str(a)+ " to " + str(b))
    print(a+b)
    cont()
def sub(a,b):
    print("Subtracting " + str(b) + " from " +str(a))
    print(a-b)
    cont()
def div(a,b):
    print("Dividing "+ str(a)+ " with "+ str(b))
    print(a/b)
    cont()
def mult(a,b):
    print("Multiplying "+ str(a) +" by "+ str(b))
    print(a*b)
    cont()
def ask():
   x=int(input("Enter the first value\n"))
   y=int(input("Enter the second value\n"))
   Operations(x,y)
def Operations(x,y):
    print("What opperation do you want to perform")
    print("1:Addition")
    print("2:Subtraction")
    print("3:Division")
    print("4:Multiplication")
    z=int(input())
    if z==1 :
          Add(x,y)
    elif z==2:
          sub(x,y)
    elif z==3:
          div(x,y)
    elif z==4:
          mult(x,y)
    else:
         print("invalid response")
         Operations(x,y)
def cont():
    print("Do you wish to continue ?")
    print("1: Yes")
    print("2: No")
    e=int(input("Enter 1 or 2\n"))
    if e==1:
      ask()
    else:
      exit()     
ask()

