from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from src.utils import updateAndReturnParticipationObject

app = Flask(__name__)
cors = CORS(app)

participations = [
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

@app.route("/participations")
@cross_origin()
def get_participations():
    return jsonify(participations)

@app.route("/participations", methods=['POST'])
@cross_origin()
def add_participation():
    global participations

    data = request.get_json()

    result = any ( (data["firstName"] == p["firstName"]) and ( data["lastName"] == p["lastName"] ) for p in participations )

    if result:
        mapFn = lambda p : updateAndReturnParticipationObject(p, data["participation"]) if ( (data["firstName"] == p["firstName"]) and ( data["lastName"] == p["lastName"] ) ) else p
        participations = [mapFn(p) for p in participations]
    else:
        participations.append(data)

    return jsonify({
        "success": True,
        "status_code": 200
    })