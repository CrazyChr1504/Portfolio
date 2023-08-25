import string, time

correct_password = f"{string.printable*100}"

def timer(func):
    """This function is a decorator and is able to time how long a function took to run.\n
        The decorator is able to take in the arguments that the function used needs and
        return them if called again.
    """
    def wrapper(*args, **kwargs):
        t1 = time.time()
        func(*args, **kwargs)
        t2 = time.time()-t1
        if t2 > 60:
            print(f"This function took {int(t2//60)} minutes and {t2-((t2//60)*60):.2f} seconds.\n\n")
        elif t2 > 1:
            print(f"This function took {t2:.3f} seconds.\n\n")
        elif t2 > 0.001:
            print(f"This function took {t2*1000:.2f}ms.\n\n")
        elif t2 > 0.000001:
            print(f"This function took {t2*1000000:.3f} microseconds.\n\n")
        elif t2 > 0.000000001:
            print(f"This function took {t2*1000000000:.3f} nanoseconds.\n\n")
        else: 
            print(f"{t2} seconds.\n")
    return wrapper

def login(cracked_password):
    if cracked_password == correct_password:
        print("You have logged in.")
    else:
        print("Something went wrong.")

@timer
def password_cracker():
    tries = 0
    cracked_list = []
    cracked_password = ""
    password_split = ""
    for char in correct_password:
        password_split += char
    for i in string.printable:
        if i in correct_password:
            cracked_list.append(i)
    for i in password_split:
        for x in cracked_list: 
            tries += 1
            if x == i:
                cracked_password += x
    print(f"It took {tries} tries to crack your password.")
    login(cracked_password)

def main():
    password_cracker()

if __name__ == "__main__":
    main()