# !/bin/sh
pip install -r requirements.txt && export FLASK_APP=./src/index.py && flask run -h 0.0.0.0