#bubble sort
arr=[9,6,7,8,3,5,1,10,0]
arr1=[9,6,7,8,3,5,1,10,0]
def bubblesort():
    n=len(arr)
    for i in range(n):
        for j in range(0,n-1-i):
            print(arr[j])
            print(arr[j+1])
            print(arr)
            if arr[j]>arr[j+1]:
                arr[j],arr[j+1]=arr[j+1],arr[j]
                print(arr)
def insertionsort():
    n=len(arr1)
    for i in range(1,n):
        j=i
        print(arr1)
        while j>0 and arr1[j]<arr1[j-1]:
            print(j,j-1)
            arr1[j],arr1[j-1]=arr1[j-1],arr1[j]
            print(arr1)
            j-=1
bubblesort()
insertionsort()