import copy

a = {
    "oi": 1
}

b = copy.deepcopy(a)

b["oi"] = 2

print(a["oi"])