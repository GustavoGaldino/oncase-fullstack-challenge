import copy

from flask import Flask, jsonify, request
from flask_api import status
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

participations_initial_state = [
    {
        'firstName': 'Gustavo',
        'lastName': 'Galdino',
        'participation': 1,
    },
    {
        'firstName': 'Guilherme',
        'lastName': 'Morone',
        'participation': 3,
    },
    {
        'firstName': 'Raniel',
        'lastName': 'Silva',
        'participation': 4,
    },
    {
        'firstName': 'Vinicius',
        'lastName': 'Revoredo',
        'participation': 4,
    },
    {
        'firstName': 'Enrique',
        'lastName': 'Laborao',
        'participation': 8,
    }
]

participations = copy.deepcopy(participations_initial_state)

@app.route("/participations")
@cross_origin()
def get_participations():
    return jsonify({
        "ok": True,
        "message": "Success!",
        "data": participations
    }), status.HTTP_200_OK

@app.route("/participations", methods=['POST'])
@cross_origin()
def add_participation():
    global participations

    data = request.get_json()

    result = any ( (data["firstName"] == p["firstName"]) and ( data["lastName"] == p["lastName"] ) for p in participations )

    if result:
       return jsonify({
            "ok": False,
            "message": "Informação sobre participante não pôde ser criada pois já existe um participante com esse nome"
        }), status.HTTP_400_BAD_REQUEST
    else:
        participations.append(data)

        return jsonify({
            "ok": True,
            "message": "Informação sobre participante criada com sucesso"
        }), status.HTTP_201_CREATED

@app.route("/participations", methods=['DELETE'])
@cross_origin()
def remove_participation():
    global participations

    data = request.get_json()

    result = any ( (data["firstName"] == p["firstName"]) and ( data["lastName"] == p["lastName"] ) for p in participations )

    if not result:
        return jsonify({
            "ok": False,
            "message": "Informação sobre usuário não pôde ser removida!"
        }), status.HTTP_404_NOT_FOUND
        
    else:
        for obj in participations:
            if obj["firstName"] == data["firstName"] and data["lastName"] == obj["lastName"]:
                participations.remove(obj)

        return jsonify({
            "ok": True,
            "message": "Informação sobre usuário removida com sucesso!"
        }), status.HTTP_200_OK

@app.route("/participations", methods=['PUT'])
@cross_origin()
def update_participation():
    global participations

    data = request.get_json()

    result = any ( (data["firstName"] == p["firstName"]) and ( data["lastName"] == p["lastName"] ) for p in participations )

    if not result:
        return jsonify({
            "ok": False,
            "message": "Informação sobre usuário não pôde ser atualizada!"
        }), status.HTTP_404_NOT_FOUND
        
    else:
        for obj in participations:
            if obj["firstName"] == data["firstName"] and data["lastName"] == obj["lastName"]:
                obj["participation"] = data["participation"]

        return jsonify({
            "ok": True,
            "message": "Informação sobre usuário atualizada com sucesso!"
        }), status.HTTP_200_OK

@app.route("/participations/reset", methods=['POST'])
@cross_origin()
def reset_participations_data():
    global participations

    participations = copy.deepcopy(participations_initial_state)

    return jsonify({
        "ok": True,
        "message": "Estado resetado com sucesso!"
    }), status.HTTP_200_OK