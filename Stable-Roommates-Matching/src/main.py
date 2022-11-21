from matching import Player
from score import query_data, calculation

from matching.games import StableRoommates
from datetime import datetime

# todo: check the users numbers to be even
# todo: import real data in it

users_data, users_weight = query_data.GetData()
# if len(users_data) % 2 == 0:

if len(users_data) % 2 != 0:
    print("user_data must be even")
    # exit(1) # 1 is not normal, 0 is normal
    # users_data = users_data.remove(users_data[-1]) # remove users_data last element
    users_data.pop() #remove users_data last element
    users_weight.pop()

scores, users_preference = calculation.Calculation(
    users_data, users_weight)
print(users_preference)


players = []
# user name to players
username2player = {}
for user in users_weight: # use users_weight to take the user, can use other to get
    players.append(Player(name = user["name"]))
    username2player[user["name"]] = players[-1] # make a user str map to player instance, latest append  = -1
# print(username2player)
# {'user1': user1, 'user2': user2, 'user3': user3, 'user4': user4}
# user1 value is a instance of Player
for user, candidates in users_preference.items(): 
    
    player = username2player[user] # get player instance of this user
    # cdds = [username2player[n] for n in candidates] # cdds = a list of player # transfer list of string to list of player # python list comprehension
    cdds = []
    for n in candidates:
        cdds.append(username2player[n])

    player.set_prefs(cdds) # set preference
   
print(players)
    

game = StableRoommates(players)
print("game type", type(game))

preference = game.solve()
print("Hello",preference)


# preference = {user1: user2, user2: user1, user3: user4, user4: user3}

"""
query data back to db
"""
query_data.StoreData(preference)
