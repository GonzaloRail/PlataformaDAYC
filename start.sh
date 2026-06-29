#!/bin/bash
# DAYC-2 dev launcher. Opens backend + frontend in two terminal tabs.
# Path resolution is relative to this script so it works from any clone location.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND="$SCRIPT_DIR/backend"
FRONTEND="$SCRIPT_DIR/frontend"

if [ ! -d "$BACKEND" ] || [ ! -d "$FRONTEND" ]; then
  echo "Error: backend/ or frontend/ not found next to start.sh"
  exit 1
fi

gnome-terminal --tab --title="Backend Django" -- bash -c "
cd $BACKEND
[ -d venv ] && source ./venv/bin/activate
python manage.py runserver
exec bash
"

sleep 1

gnome-terminal --tab --title="Frontend React" -- bash -c "
cd $FRONTEND
npm run dev
exec bash
"