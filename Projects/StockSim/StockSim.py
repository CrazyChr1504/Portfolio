import json
from time import sleep
from random import uniform, randint

class Stock:
    def __init__(self, name: str, abreviation: str, start_price: float) -> None:
        self.name = name
        self.abreviation = abreviation
        self.value_list = [start_price]
    
    def sumarize(self):
        lowest, highest = self.min_max_value()
        return (f"""{self.name}'s start price was {self.value_list[0]:.3f}kr, and ended at {self.value_list[-1]:.3f}kr. The lowest value of the stock was {lowest:.3f}kr, and the highest value was {highest:.3f}kr.\n""")

    def update_current_value(self):
        return f"{self.name} is now valued at {self.value_list[-1]:.3f}kr"
    
    def min_max_value(self):
        return min(self.value_list), max(self.value_list)
    
    def change_value(self):
        up_down = randint(0,1)
        if up_down: 
            fluctuation = 1+uniform(0,0.02)
        else: 
            fluctuation = 1-uniform(0,0.02)

        self.value_list.append((self.value_list[-1]*fluctuation))

def ticker(stock):
    stock.change_value()
    print(stock.update_current_value())

def main():
    stock_list = []
    hour = 0
    with open("Stocks.json", "r", encoding="utf-8") as f:
        data = json.load(f)
        for stock in data["stocks"]:
            stock_list.append(Stock(stock["name"], stock["abrev"], stock["value"]))
    while hour <=24:
        sleep(5)
        for stock in stock_list:
            ticker(stock)
        print()
        hour += 1/2
    for stock in stock_list:
        print(stock.sumarize())

if __name__ == "__main__":
    main()