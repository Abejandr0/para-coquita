#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate
python populate_db.py
python populate_extended.py
python populate_te_extrano.py
python populate_te_extrano_2.py
