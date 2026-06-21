#!/bin/bash

BACKEND="$HOME/Proyectos/dayc/backend"
FRONTEND="$HOME/Proyectos/dayc/frontend"

# Abrir ventana con backend
gnome-terminal --tab --title="Backend Django" -- bash -c "
cd $BACKEND
source ./venv/bin/activate
python manage.py runserver
exec bash
"

# Esperar un poquito
sleep 1

# Crear segunda pestaña para frontend
gnome-terminal --tab --title="Frontend React" -- bash -c "
cd $FRONTEND
npm run dev
exec bash
"