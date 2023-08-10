from asyncio.constants import LOG_THRESHOLD_FOR_CONNLOST_WRITES
from sys import prefix
from xml.dom.expatbuilder import InternalSubsetExtractor

import sqlite3  # connector between sqlite and python
from sqlite3 import Error
import os.path

from datetime import datetime


"""
Query data from SQLite 
"""


def GetData():

    # Absolute db URL
    #db_path = '/Users/weiju/wxh184/cschat-django/db.sqlite3'
    #path = '/Users/weiju/Documents/Birmingham CS/CS_project/project/CS-Matcher/django/db.sqlite3'
    
    # Relative db URL
    path = '../../../db.sqlite3'
    scriptdir = os.path.dirname(__file__)
    db_path = os.path.join(scriptdir, path)

    # os.makedirs(os.path.dirname(db_path), exist_ok=True) = had created one fileQQ

    # Connecting to sqlite
    # connection object
    connection_obj = sqlite3.connect(db_path)

    # create a cursor obj
    curs_obj = connection_obj.cursor()

    # query statement
    query = "SELECT id, interest_out, interest_in, interest_leisure, purpose, personality, priority1_interests_out, priority2_interests_in, priority3_interests_lei, priority4_purpose, priority5_trait FROM mypreference_mypreference"

    # execute
    curs_obj.execute(query)

    # fetch data
    output = curs_obj.fetchall()
    # print(output)
    # print(output) -> print a list of tuples
    # [(1, 'Day trip',...), (2, 'Day trip',...)]

    # for row in output: -> print tuples
    #     print(row)
    # (1, 'Day trip',...)
    # (2, 'Day trip',...)

    # users_data: get a list of dicts contain users' preferences
    # [{'name': 'user1', 'outdoor': 'Day trip'...}, {'name': 'user2', 'outdoor': 'Day trip'...},]
    users_data = []
    for row in output:
        userdata = {}
        userdata["name"] = "user" + str(row[0])
        userdata["outdoor"] = row[1]
        userdata["indoor"] = row[2]
        userdata["leisure"] = row[3]
        userdata["purpose"] = row[4]
        userdata["personality"] = row[5]

        users_data.append(userdata)
     # users_data["user" + str(row[0])]=userdata
    # print(users_data)

    # get a weight dictionary contains users' priority
    users_weight = []
    for row in output:
        weight = {}
        weight["name"] = "user" + str(row[0])
        # weight["name"] = str(row[0])
        weight["outdoor"] = row[6]
        weight["indoor"] = row[7]
        weight["leisure"] = row[8]
        weight["purpose"] = row[9]
        weight["personality"] = row[10]
        users_weight.append(weight)
    # print(users_weight)

    # save change-> may not use here
    connection_obj.commit()

    curs_obj.close()
    connection_obj.close()

    return [users_data, users_weight]  # return a list with 2 value


"""
Store matching result back to SQLite 
"""


def StoreData(preference):
    # preference = {user1: user2, user2: user1, user3: user4, user4: user3}
    print("1")
    path = '../../../db.sqlite3'
    print("2")
    scriptdir = os.path.dirname(__file__)
    print("3")
    db_path = os.path.join(scriptdir, path)
    print("4")

    connection_obj = sqlite3.connect(db_path)
    print("5")

    curs_obj = connection_obj.cursor()
    print("6")

    print(preference)

    today = datetime.today().strftime('%Y%m%d')

    for data in preference.keys():
        print("7")
      
        query = f'INSERT INTO chats_chats (chatA_id, chatB_id, date) values("{data}", "{preference[data]}", {today})' 
      
        print(query)
        curs_obj.execute(query)
        connection_obj.commit()
    print("8")
    curs_obj.close()
    connection_obj.close()
    
