from random import randint
import json

class Customer:
    def __init__(self, customer_id: str, name: str, purchases: list):
        self.customer_id = customer_id
        self.name = name
        self.purchases = purchases

    def add_purchase(self, purchase):
        self.purchases.append(purchase)
        return self.purchases

class Item:
    def __init__(self, name: str, amount: int, price: int):
        self.name = name
        self.amount = amount
        self.price = price

    def purchase_items(self, bought: int):
        if bought > self.amount:
            return f"You can't buy {bought} {self.name}(s) since there is only {self.amount} left."
        self.amount -= bought
        total_price = self.price * bought
        return [self.name, total_price]
    
class Purchase:
    def __init__(self, customer_id: str, items: list):
        self.customer_id = customer_id
        self.items = items

    def add_purchased_items(self, item, amount):
        try: (self.items.append(item.purchase_items(amount)))
        except TypeError:
            return f"You can't buy {amount} {item}(s) since there is only {item.amount} left."
        else:
            return self.items.append(item.purchase_items(amount))
            

    def purchased(self):
        self.customer_id.add_purchase(self.items)

def Setup():
    items = ["Watermelon", "Milk", "Garlic", "Water", "Rice Grain", "Sausage", "Jerky"]
    customer_names = ["Viktor", "Max", "Chris", "Ossian", "Niclas"]
    customer_ids =[]
    class_items =[]
    customers = []

    for _ in range(len(customer_names)):
        id = randint(123, 9999)
        while id in customer_ids:
            id = randint(123, 9999)
        customer_ids.append(id)
    
    for item in items:
        class_items.append(Item(item, randint(10,50), randint(10,420)))

    for name in customer_names:
        name_index= name.index()
        customers.append(Customer(customer_ids[name_index], name, []))

    return customers, class_items

def main():
    customers, class_items = Setup()


if __name__ == "__main__":
    main()