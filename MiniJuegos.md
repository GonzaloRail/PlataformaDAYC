# MiniJuegos DAYC-2

## Objetivo

Este documento sirve como guia para que una IA externa, por ejemplo ChatGPT, Claude u otra herramienta, pueda crear e implementar nuevos minijuegos dentro de este proyecto DAYC-2.

La idea es que el usuario pueda entregar este archivo a la IA junto con una descripcion del nuevo juego, por ejemplo:

```txt
Lee este MiniJuegos.md.
Quiero crear el minijuego COGNITIVO_046.
El juego debe mostrar varios objetos y el nino debe clasificarlos en categorias.
Genera los archivos, rutas, codigo y cambios necesarios para implementarlo correctamente.
```

La IA debe responder con instrucciones concretas, archivos completos y cambios exactos para que el usuario pueda implementar el minijuego sin tener que descubrir el flujo desde cero.

## Arquitectura General

El flujo completo de un minijuego es:

```txt
Backend JSON del item
  -> item_catalog_service
  -> dayc2_flow_service.get_current_task_payload
  -> API session/state devuelve current_task
  -> EvaluationSession recibe current_task
  -> DigitalActivityExperience muestra intro con dinosaurio
  -> DigitalActivityShell carga el minijuego desde registry
  -> Componente del minijuego ejecuta la interaccion
  -> onAnswer envia resultado al flujo
  -> submitAutoResult guarda resultado en backend
  -> Backend avanza al siguiente item
```

El ID del minijuego debe coincidir en todos lados.

Ejemplo:

```txt
Backend JSON:
actividad_digital: COGNITIVO_045

Frontend carpeta:
frontend/src/minijuegos/cognitivo/COGNITIVO_045/

Registry:
COGNITIVO_045

Payload backend:
current_task.actividad_digital = COGNITIVO_045
```

Si el ID no coincide exactamente, el minijuego no se cargara.

## Informacion Que Debe Pedir La IA

Antes de generar codigo, la IA debe pedir o inferir estos datos:

```txt
ID del item: ejemplo COGNITIVO_045
Area: COGNITIVO, COMUNICACION, SOCIAL_EMOCIONAL, DESARROLLO_FISICO o CONDUCTA_ADAPTATIVA
Numero de item: ejemplo 45
Pregunta del item: ejemplo Imita el dibujo de una cara
Descripcion del juego: que debe hacer el nino
Tipo de interaccion: canvas, drag and drop, seleccion, audio, camara, botones, etc.
Criterio de finalizacion: cuando se considera terminado el juego
Criterio de resultado: automatico, asistido o para revision
Evidencia requerida: LOG, SCREENSHOT, AUDIO, VIDEO, CAMERA_FRAME
Si requiere revision del psicologo: true o false
```

Si falta informacion clinica o la descripcion del juego no coincide con el item, la IA debe advertirlo y pedir confirmacion.

## Backend

### 1. Ubicar El JSON Del Area

Los catalogos del backend estan en:

```txt
backend/src/application/catalog/dayc2_items/
```

Archivos por area:

```txt
backend/src/application/catalog/dayc2_items/cognitivo.json
backend/src/application/catalog/dayc2_items/comunicacion.json
backend/src/application/catalog/dayc2_items/social_emocional.json
backend/src/application/catalog/dayc2_items/desarrollo_fisico.json
backend/src/application/catalog/dayc2_items/conducta_adaptativa.json
```

La IA debe indicar que archivo editar segun el area.

Ejemplo:

```txt
Para COGNITIVO_045 editar:
backend/src/application/catalog/dayc2_items/cognitivo.json
```

### 2. Configurar El Item Como Actividad Digital

El item debe tener una configuracion parecida a esta:

```json
{
  "id": "COGNITIVO_045",
  "area": "COGNITIVO",
  "numero": 45,
  "edad_inicio_min_meses": 48,
  "edad_inicio_max_meses": 59,
  "modalidad": "INTERACTIVO_ASISTIDO",
  "pantalla_nino": "ACTIVIDAD",
  "gamificable": true,
  "auto_validable": false,
  "requiere_evidencia": true,
  "tipos_evidencia": ["LOG", "SCREENSHOT"],
  "actividad_digital": "COGNITIVO_045",
  "requiere_revision_psicologo": true,
  "pregunta": "Imita el dibujo de una cara",
  "descripcion_general": "Imita el dibujo de una cara"
}
```

Campos importantes:

```txt
modalidad: usar INTERACTIVO_ASISTIDO si el adulto/profesional debe revisar o apoyar.
pantalla_nino: usar ACTIVIDAD para que el frontend muestre minijuego.
gamificable: true si tiene interaccion digital.
actividad_digital: ID exacto del minijuego frontend.
requiere_revision_psicologo: true si el resultado no debe aceptarse automaticamente.
tipos_evidencia: definir que evidencia se quiere guardar.
```

### 3. Reiniciar Backend

El backend cachea los JSON con `lru_cache` en:

```txt
backend/src/application/services/item_catalog_service.py
```

Por eso, despues de cambiar un JSON del catalogo, hay que reiniciar el backend.

Si no se reinicia, puede pasar esto:

```txt
El archivo JSON dice actividad_digital: COGNITIVO_045
pero el endpoint sigue devolviendo actividad_digital: null
```

La IA siempre debe recordar:

```txt
Despues de modificar catalogos JSON, reiniciar backend.
```

### 4. Donde Se Construye current_task

El backend construye `current_task` en:

```txt
backend/src/application/services/dayc2_flow_service.py
```

Funcion:

```py
get_current_task_payload(evaluacion)
```

Esta funcion arma el payload que recibe el frontend. Incluye campos como:

```txt
evaluacion_id
area
item_id
numero_item
modalidad
pantalla_nino
actividad_digital
pregunta
instrucciones
tipos_evidencia
auto_validable
requiere_revision_psicologo
validation_mode
```

El endpoint principal que devuelve esto para la sesion es:

```txt
GET /api/evaluaciones/session/:sessionCode/state/
```

Implementado en:

```txt
backend/src/api/evaluaciones/views.py
```

Funcion:

```py
session_state()
```

## Frontend

### 1. Crear Carpeta Del Minijuego

Cada minijuego debe tener carpeta propia.

Ruta recomendada:

```txt
frontend/src/minijuegos/<area>/<ITEM_ID>/
```

Ejemplo:

```txt
frontend/src/minijuegos/cognitivo/COGNITIVO_045/
```

Estructura recomendada:

```txt
frontend/src/minijuegos/cognitivo/COGNITIVO_045/
  index.tsx
  config.ts
  COGNITIVO_045.css
  README.md
  components/
    ModelFace.tsx
    FaceDrawingBoard.tsx
```

No todos los minijuegos necesitan los mismos componentes internos. La IA debe crear solo los necesarios.

### 2. Usar Componentes Compartidos Cuando Aplique

Actualmente existen piezas compartidas reutilizables:

```txt
frontend/src/minijuegos/shared/useDrawingCanvas.ts
frontend/src/minijuegos/shared/DrawingCanvas.tsx
frontend/src/minijuegos/shared/TwoPanelActivityLayout.tsx
frontend/src/minijuegos/shared/TwoPanelActivityLayout.css
```

Usar estas piezas si el juego necesita:

```txt
canvas de dibujo
modelo a la izquierda y respuesta a la derecha
actividad de copiar, trazar, dibujar o marcar
```

Regla recomendada:

```txt
Si algo solo lo usa un minijuego, mantenerlo dentro de la carpeta del minijuego.
Si algo puede repetirse en varios minijuegos, ponerlo en frontend/src/minijuegos/shared/.
```

### 3. Crear config.ts

Cada minijuego debe tener su configuracion tecnica.

Ejemplo:

```ts
export const COGNITIVO_045_CONFIG = {
  id: 'COGNITIVO_045',
  area: 'COGNITIVO',
  nombre: 'Imita el dibujo de una cara',
  descripcion: 'Muestra una cara modelo y un lienzo para que el nino la copie.',
  requiereRevision: true,
} as const;
```

### 4. Crear index.tsx

El componente principal debe recibir:

```ts
currentItem
onAnswer
```

Ejemplo base:

```tsx
import type { Answer, Item } from '../../../minijuegos/types';
import KidGameShell from '../../../components/minijuegos/KidGameShell';

interface Props {
  currentItem: Item;
  onAnswer: (answer: Answer) => void;
}

export default function ITEM_ID({ currentItem, onAnswer }: Props) {
  return (
    <KidGameShell
      variant="embedded"
      title="Titulo del juego"
      subtitle={currentItem.instruccion}
      playArea={/* UI del juego */}
      actions={/* botones del juego */}
    />
  );
}
```

En sesion real se debe usar:

```tsx
variant="embedded"
```

Esto evita repetir:

```txt
Miniaventura
titulo
subtitulo
mascota interna
```

La intro con dinosaurio la controla `DigitalActivityExperience`, no el minijuego.

### 5. Enviar Respuesta Con onAnswer

Cuando el juego termina, debe llamar a `onAnswer`.

Resultado permitido:

```txt
CORRECT
ERROR
NOT_APPLICABLE
```

Ejemplo:

```ts
onAnswer({
  item_id: currentItem.id,
  resultado: 'CORRECT',
  tiempo_respuesta_ms: durationMs,
  respuesta_usuario: JSON.stringify({
    activity: 'COGNITIVO_045',
    completedByChild: true,
    attempts: 1,
    durationMs,
  }),
});
```

Si el juego no valida clinicamente por si solo, usar metadata que lo indique:

```json
{
  "validation": "requires_adult_or_psychologist_review"
}
```

### 6. Estilos CSS Del Minijuego

Crear un CSS propio:

```txt
frontend/src/minijuegos/cognitivo/COGNITIVO_045/COGNITIVO_045.css
```

Este CSS debe contener solo estilos especificos del minijuego.

Los estilos de layout reutilizable deben ir a shared.

Recomendaciones:

```txt
El minijuego debe verse bien en laptop.
Debe funcionar en tablet y movil si aplica.
Si usa canvas o drag, agregar touch-action: none.
Evitar que el contenido principal quede debajo del fold.
No repetir la pregunta grande dentro del juego.
```

## Registrar El Minijuego

Editar:

```txt
frontend/src/components/minijuegos/registry.tsx
```

Agregar import:

```ts
import COGNITIVO_045 from '../../minijuegos/cognitivo/COGNITIVO_045';
```

Agregar entrada:

```ts
COGNITIVO_045: {
  nombre: 'COGNITIVO_045 Imita una cara',
  area: 'COGNITIVO',
  descripcion: 'Cara modelo con lienzo de dibujo para copia asistida.',
  estado: 'ready',
  component: COGNITIVO_045,
  fallback: FallbackManual,
},
```

El ID debe coincidir con el JSON:

```txt
actividad_digital: COGNITIVO_045
registry key: COGNITIVO_045
```

## Vista De Preview En Modulo De Minijuegos

La ruta:

```txt
/psychologist/minijuegos
```

Debe mostrar todos los minijuegos registrados en `registry.tsx`.

El preview debe verse igual que la sesion real.

Actualmente el preview usa:

```txt
DigitalActivityExperience
```

Esto significa:

```txt
1. Intro con dinosaurio y pregunta.
2. Espera automatica.
3. Aparece el minijuego.
4. Captura respuesta para revisar metadata.
```

La IA debe asegurarse de que cualquier minijuego nuevo aparezca en el registry para que automaticamente aparezca en el modulo de minijuegos.

## Sesion Real Del Nino

Archivo principal:

```txt
frontend/src/pages/child/EvaluationSession.tsx
```

Flujo:

```txt
1. EvaluationSession consulta sessionState.
2. Backend devuelve current_task.
3. Si current_task.actividad_digital existe, se muestra DigitalActivityExperience.
4. DigitalActivityExperience muestra intro con dinosaurio.
5. Luego renderiza DigitalActivityShell.
6. DigitalActivityShell busca el componente en registry.
7. El minijuego corre.
8. El minijuego llama onAnswer.
9. EvaluationSession llama submitAutoResult.
```

## Guardado De Resultado En Backend

Cuando un minijuego termina, el frontend llama:

```txt
POST /api/evaluaciones/:id/items/:item_id/auto-result/
```

Implementado en:

```txt
backend/src/api/evaluaciones/views.py
```

Funcion:

```py
registrar_auto_result()
```

Luego se llama a:

```txt
dayc2_flow_service.complete_current_item()
```

Eso guarda:

```txt
EvaluacionItem
Respuesta
Evidencia SYSTEM_RESULT
raw_data
duracion
confianza
estado del item
```

Despues avanza al siguiente item con:

```txt
advance_after_item()
```

## Revision Profesional

Si el item tiene:

```json
"requiere_revision_psicologo": true
```

Entonces queda pendiente para revision.

La revision se hace desde:

```txt
frontend/src/pages/psychologist/ReviewPage.tsx
```

Y las evidencias se ven con:

```txt
frontend/src/components/evidence/EvidenceViewer.tsx
```

## Checklist Para La IA

Antes de entregar una implementacion, la IA debe revisar:

```txt
[ ] El ID del minijuego esta definido correctamente.
[ ] El JSON backend tiene actividad_digital con ese ID.
[ ] modalidad es INTERACTIVO_ASISTIDO si corresponde.
[ ] pantalla_nino es ACTIVIDAD.
[ ] gamificable es true.
[ ] tipos_evidencia esta definido.
[ ] requiere_revision_psicologo esta definido.
[ ] Se creo carpeta frontend del minijuego.
[ ] index.tsx exporta default el componente.
[ ] config.ts existe.
[ ] CSS especifico existe si hace falta.
[ ] Componentes internos estan separados si el juego es complejo.
[ ] Se usaron shared components si aplican.
[ ] registry.tsx importa y registra el minijuego.
[ ] El ID del registry coincide con actividad_digital.
[ ] El modulo /psychologist/minijuegos debe mostrarlo.
[ ] El preview debe usar DigitalActivityExperience.
[ ] El minijuego llama onAnswer.
[ ] onAnswer envia resultado y metadata util.
[ ] El backend debe reiniciarse despues de cambiar JSON.
[ ] Se debe probar build del frontend.
```

## Errores Comunes

### El minijuego aparece en el catalogo pero no en la sesion real

Posibles causas:

```txt
Backend no fue reiniciado despues de editar JSON.
current_task.actividad_digital viene null.
El item actual no es el esperado.
La evaluacion ya avanzo a otro item.
```

Verificar endpoint:

```txt
GET /api/evaluaciones/session/:sessionCode/state/
```

Debe devolver:

```json
"actividad_digital": "ITEM_ID"
```

### El minijuego no aparece en el modulo de minijuegos

Posibles causas:

```txt
No esta registrado en registry.tsx.
El import esta mal.
El componente no exporta default.
El ID del registry no coincide.
```

### El minijuego muestra Actividad no encontrada

Posibles causas:

```txt
El backend manda actividad_digital con un ID que no existe en registry.
Hay un typo en el ID.
El componente no fue importado.
```

### El canvas o drag no funciona bien en tablet

Revisar:

```txt
touch-action: none;
event.preventDefault();
setPointerCapture;
user-select: none;
```

## Prompt Base Para Usar Con Otra IA

Copiar y pegar este prompt junto con este documento:

```txt
Actua como ingeniero frontend/backend en este proyecto DAYC-2.

Lee el archivo MiniJuegos.md completo y sigue estrictamente su arquitectura.

Quiero crear un nuevo minijuego con estos datos:

- ID del item:
- Area:
- Numero de item:
- Pregunta del item:
- Descripcion del juego:
- Tipo de interaccion:
- Que debe hacer el nino:
- Como termina el juego:
- Resultado esperado:
- Metadata que debo guardar:
- Evidencia requerida:
- Requiere revision del psicologo:

Necesito que me entregues:

1. El cambio exacto que debo hacer en el JSON del backend.
2. La ruta exacta donde debo crear la carpeta del minijuego.
3. Todos los archivos frontend que debo crear.
4. Codigo completo para cada archivo.
5. Cambios exactos para registry.tsx.
6. Si conviene usar componentes shared existentes o crear nuevos.
7. Como probarlo en /psychologist/minijuegos.
8. Como probarlo en una sesion real.
9. Checklist final para verificar que funciona.
10. Advertencias si detectas que la descripcion del juego no coincide con el item clinico.

No omitas pasos. Si falta informacion, preguntame antes de generar codigo.
```

## Reglas De Implementacion Para La IA

La IA debe seguir estas reglas:

```txt
No crear componentes gigantes si el minijuego es complejo.
Separar componentes internos en components/.
Usar shared/ solo para piezas realmente reutilizables.
Mantener el ID igual en backend, carpeta, registry y payload.
No modificar flujo clinico sin advertirlo.
No asumir validacion automatica si el juego requiere juicio profesional.
No olvidar reiniciar backend despues de modificar catalogos JSON.
No olvidar probar el modulo /psychologist/minijuegos.
```

## Plantilla De Respuesta Esperada De La IA

La IA deberia responder con una estructura similar:

```txt
## Resumen
Implementaremos ITEM_ID como minijuego para AREA item NUMERO.

## Backend
Editar archivo: ruta
Reemplazar/agregar estos campos: ...

## Frontend
Crear carpeta: ruta

Crear archivo: index.tsx
```tsx
codigo
```

Crear archivo: config.ts
```ts
codigo
```

Crear archivo: ITEM_ID.css
```css
codigo
```

## Registry
Editar registry.tsx con este import y esta entrada.

## Pruebas
1. Reiniciar backend.
2. Abrir /psychologist/minijuegos.
3. Probar preview.
4. Crear o abrir evaluacion real.
5. Verificar current_task.actividad_digital.

## Checklist
...
```
