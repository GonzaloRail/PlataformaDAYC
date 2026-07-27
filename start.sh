#!/bin/bash
# DAYC-2 dev launcher. Abre Docker Desktop, espera 15 segundos y abre backend + frontend.
# La resolución de rutas es relativa a este script para que funcione desde cualquier ubicación.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND="$SCRIPT_DIR/backend"
FRONTEND="$SCRIPT_DIR/frontend"

if [ ! -d "$BACKEND" ] || [ ! -d "$FRONTEND" ]; then
  echo "Error: backend/ o frontend/ no encontrados junto a start.sh"
  exit 1
fi

# 1. Iniciar Docker Desktop en Ubuntu (sin sudo)
echo "🐳 Verificando Docker Desktop..."
if ! pgrep -f "docker-desktop" >/dev/null 2>&1; then
    echo "⚡ Abriendo Docker Desktop..."
    
    # Método oficial de Docker Desktop para Linux mediante systemctl de usuario
    systemctl --user start docker-desktop 2>/dev/null
    
    # Respaldo: Si el servicio anterior falla o no abre la ventana gráfica, lanza la app en segundo plano
    if ! pgrep -f "docker-desktop" >/dev/null 2>&1; then
        gtk-launch docker-desktop 2>/dev/null || /opt/docker-desktop/bin/docker-desktop >/dev/null 2>&1 &
    fi
else
    echo "✅ Docker Desktop ya se encuentra en ejecución."
fi

# (Opcional) Si quieres que además levante los contenedores de un docker-compose automáticamente, 
# descomenta la siguiente línea:
# docker compose up -d

# 2. Espera de 15 segundos antes de abrir las consolas
SEGUNDOS_ESPERA=20
echo "⏳ Esperando $SEGUNDOS_ESPERA segundos para que Docker Desktop cargue el motor..."

for ((i=SEGUNDOS_ESPERA; i>0; i--)); do
    printf "\r   Abriendo consolas en %2d segundos..." "$i"
    sleep 1
done
echo -e "\n🚀 ¡Listo! Abriendo las pestañas de desarrollo..."

# 3. Abrir consolas (Backend Django y Frontend React)
gnome-terminal --tab --title="Backend Django" -- bash -c "
cd '$BACKEND'
[ -d venv ] && source ./venv/bin/activate
python manage.py runserver
exec bash
"

sleep 1

gnome-terminal --tab --title="Frontend React" -- bash -c "
cd '$FRONTEND'
npm run dev
exec bash
"