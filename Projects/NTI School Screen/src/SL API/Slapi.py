import requests
import os
import json
from time import sleep
from dotenv import load_dotenv

path = os.path.realpath(__file__)
dir = os.path.dirname(path)
os.chdir(dir)

load_dotenv()
DEP_KEY = os.getenv("DEP_KEY")

def get_pop_list(slussen_list:list, handen_list:list, fisk_list:list, line_71_list:list):
    """This function uses the different lists to pop and return one given atribute from each of the individual bus lists
    
    This function also checks if the time is "Nu" and changes it to "Now" that way anyone can understand the information

    This function then returns the each of the popped information into a list for each popped atribute
    """
    slussen_pop = slussen_list.pop(0)
    handen_pop = handen_list.pop(0)
    fisk_pop = fisk_list.pop(0)
    line_71_pop = line_71_list.pop(0)
    
    slussen_pop_list = [slussen_pop[0], slussen_pop[1], slussen_pop[2]]
    handen_pop_list = [handen_pop[0], handen_pop[1], handen_pop[2]]
    fisk_pop_list = [fisk_pop[0], fisk_pop[1], fisk_pop[2]]
    line_71_pop_list = [line_71_pop[0], line_71_pop[1], line_71_pop[2]]

    
    if slussen_pop[2] == "Nu":
        slussen_pop_list = [slussen_pop[0], slussen_pop[1], "Now"]
    if handen_pop[2] == "Nu":
        handen_pop_list = [handen_pop[0], handen_pop[1], "Now"]
    if fisk_pop[2] == "Nu":
        fisk_pop_list = [fisk_pop[0], fisk_pop[1], "Now"]
    if line_71_pop[2] == "Nu":
        line_71_pop_list = [line_71_pop[0], line_71_pop[1], "Now"]

    return [slussen_pop_list, handen_pop_list, fisk_pop_list, line_71_pop_list]

def setup():
    """This function is the main setup of the API and it makes the request to get the requested information

    The requested information is then processed and put into seperated lists
    
    The function then returns a tuple of the processed lists
    """
    time = 60 # Time interval of 60 min 
    nacka_strand = 4031 # Bus stop id
    realtime = f"https://api.sl.se/api2/realtimedeparturesV4.JSON?key={DEP_KEY}&siteid={nacka_strand}&timewindow={time}"
    answer = requests.get(realtime).json()

    slussen_list = []
    line_71_list = []
    handen_list = []
    fisk_list = []

    for line in answer['ResponseData']['Buses']:
        if line["LineNumber"] == "443" and not line["Destination"] == "Jarlaberg":
            slussen_list.append((line['LineNumber'], line['Destination'], line['DisplayTime']))
        elif line["LineNumber"] == "71" and not line["Destination"] == "Jarlaberg":
            line_71_list.append((line['LineNumber'], line['Destination'], line['DisplayTime']))
        elif line["LineNumber"] == "465":
            fisk_list.append((line['LineNumber'], line['Destination'], line['DisplayTime']))
        elif line["LineNumber"] == "840":
            handen_list.append((line['LineNumber'], line['Destination'], line['DisplayTime']))

    
    return slussen_list, line_71_list, handen_list, fisk_list

def text_write(slussen_list:list, handen_list:list, fisk_list:list, line_71_list:list):
    """This function is used to print the busses information into the terminal and to add that information into a json file

    """
    filename = "Busses.json"
    bus_amount = min(len(slussen_list), len(line_71_list), len(handen_list), len(fisk_list))
    bus_print_list = []
    clearConsole = lambda: os.system('cls' if os.name in ('nt', 'dos') else 'clear')
    clearConsole()
    collum = 0

    print(f"     Slussen\t\t    Handens station\t\t    Fisksätra\t\t       71:an")
    print("_"*103)

    for _ in range(bus_amount):
        str_lists = get_pop_list(slussen_list, handen_list, fisk_list, line_71_list)
        
        for string in str_lists:
            printed = 1
            for prints in string:
                if printed == 3:
                    print(f"{prints}", end="\t")
                else:
                    print(f"{prints}", end=" ")
                printed +=1
            collum += 1
            if collum % 4 == 0: print()
        
        slussen_bus_prints = {
            "Line": str_lists[0][0],
            "Name": str_lists[0][1],
            "Time": str_lists[0][2]
        }
        handen_bus_prints = {
            "Line": str_lists[1][0],
            "Name": str_lists[1][1],
            "Time": str_lists[1][2]
        }
        fisk_bus_prints = {
            "Line": str_lists[2][0],
            "Name": str_lists[2][1],
            "Time": str_lists[2][2]
        }
        line_71_bus_prints = {
            "Line": str_lists[3][0],
            "Name": str_lists[3][1],
            "Time": str_lists[3][2]
        }
        bus_prints = slussen_bus_prints, handen_bus_prints, fisk_bus_prints, line_71_bus_prints
        bus_print_list.append(bus_prints)

    save_file = open(filename, "w", encoding="utf-8")  
    json.dump(bus_print_list, save_file, indent = 4)
    save_file.close()

def main():
    while True:    
        slussen_list, line_71_list, handen_list, fisk_list = setup()
        text_write(slussen_list, handen_list, fisk_list, line_71_list)
        sleep(60)

if __name__ == "__main__":
    main()