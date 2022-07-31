def updateAndReturnParticipationObject(object, participation):
    object["participation"] = object["participation"] + participation
    return object