from asyncio.constants import LOG_THRESHOLD_FOR_CONNLOST_WRITES
from sys import prefix
from xml.dom.expatbuilder import InternalSubsetExtractor

import sqlite3  # connector between sqlite and python
from sqlite3 import Error
import os.path




"""
transfter querying result (a list of tuples for records) to dictionary
"""


"""
Get every users' preference ranks to other
"""


def Calculation(usersdata, usersweight):

    # userA = {'name': 'user1', 'outdoor': 'Day trip', 'indoor': 'Yoga', 'leisure': 'Reading', 'purpose': 'Make friends', 'personality': 'Ambivert'}
    # userA: an element in the usersdata list = a dict
    preferences = [
        "outdoor", "indoor", "leisure", "purpose", "personality",
    ]
    # usersweight: users' weights
    # [{'name': 'user1', 'outdoor': '1', 'indoor': '2', 'leisure': '3', 'purpose': '2', 'personality': '1'}, {...}]

    # scores: every user to others scores
    # scores = {"user1": [("user2", 10), ("user3", 9), ("user4", 12)],
    #           "user2": [("user1", 8), ("user3", 7), ("user4", 10)]}

    # preferences = {"user1": [user4, user2, user3, "user2": [user4, user1, user3]}

    scores = {}
    user_preferences = {}
    for userA in usersdata:
        score = 0  # for userA, userB's score
        scores_list = []  # for userA, other users' score
        # print("here")
        # print(userA)
        for userB in usersdata:
            if userA["name"] == userB["name"]:
                continue

            # get userA's weight dict from usersweight list -> if has faster way?
            weight_a = None
            for a in usersweight:
                if a["name"] == userA["name"]:
                    weight_a = a
                    break

            for p in preferences:
                print(p)
                # get True or False # preference = interest key
                is_same = (userA[p] == userB[p])
                # preference for userA # weight dictionary, weights[p] get 1 or 2 or 3

                w = int(weight_a[p])
                score += w if is_same else 0  # score + 1 if is same

                # get [("user2", 5 ),("user3", 3),...] for userA (user1)
            scores_list.append((userB["name"], score))
            score = 0

    # scores: every user to others scores
    # scores = {"userA": [("userB", 10), ("userC", 9), ("userD", 12)],
    #           "userB": [("userA", 8), ("userC", 7), ("userD", 10)]}

        """sorted scores for userA in scores_list"""
        length = len(scores_list)  # length of score list
        for i in range(length):
            for j in range(length-i-1):
                if scores_list[j][1] < scores_list[j+1][1]:
                    temp = scores_list[j]
                    scores_list[j] = scores_list[j+1]
                    scores_list[j+1] = temp

        """store scores from userA to scores (list)"""

        scores[userA["name"]] = scores_list

        """store user preferences rank by use of scores_list """
        a_list = []
        for i in scores_list:
            a_list.append(i[0])

        user_preferences[userA["name"]] = a_list

    # print(scores)
    # print(user_preferences)

    return [scores, user_preferences]

