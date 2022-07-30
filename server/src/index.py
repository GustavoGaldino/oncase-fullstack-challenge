from flask import Flask, jsonify, request
app = Flask(__name__)

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
def get_participations():
    return jsonify(participations)

@app.route("/participations", methods=['POST'])
def add_participation():
    participations.append(request.get_json())
    return '', 204