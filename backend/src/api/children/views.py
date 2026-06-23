"""Views for Children API"""
from django.contrib.auth import authenticate, get_user_model, login, logout
from django.utils.dateparse import parse_date
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from src.api.auth import CsrfExemptSessionAuthentication
from .models import Niño


User = get_user_model()


def serialize_user(user):
    full_name = user.get_full_name().strip()
    return {
        'id': str(user.id),
        'email': user.email,
        'name': full_name or user.username,
    }


@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([AllowAny])
def login_view(request):
    """Authenticate psychologist with email and password."""
    email = request.data.get('email', '').strip().lower()
    password = request.data.get('password', '')

    if not email or not password:
        return Response({'error': 'Email y contraseña son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(request, username=email, password=password)
    if user is None:
        existing_user = User.objects.filter(email__iexact=email).first()
        if existing_user is not None:
            user = authenticate(request, username=existing_user.get_username(), password=password)

    if user is None:
        return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)

    login(request, user)
    return Response({'user': serialize_user(user)})


@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([AllowAny])
def register_view(request):
    """Create a psychologist user and start a session."""
    nombre = request.data.get('nombre', '').strip()
    apellido = request.data.get('apellido', '').strip()
    email = request.data.get('email', '').strip().lower()
    password = request.data.get('password', '')

    if not nombre or not apellido or not email or not password:
        return Response({'error': 'Nombre, apellido, email y contraseña son requeridos'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username__iexact=email).exists() or User.objects.filter(email__iexact=email).exists():
        return Response({'error': 'Ya existe una cuenta con ese email'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=email,
        email=email,
        password=password,
        first_name=nombre,
        last_name=apellido,
    )
    login(request, user)
    return Response({'user': serialize_user(user)}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([IsAuthenticated])
def me_view(request):
    """Return the current authenticated user."""
    return Response({'user': serialize_user(request.user)})


@api_view(['POST'])
@authentication_classes([CsrfExemptSessionAuthentication])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """End the current authenticated session."""
    logout(request)
    return Response({'status': 'ok'})


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def listar_niños(request):
    """List all children or create new child"""
    if request.method == 'GET':
        niños = Niño.objects.filter(psychologist=request.user)
        data = [
            {
                'id': str(n.id),
                'nombre': n.nombre,
                'fecha_nacimiento': n.fecha_nacimiento.isoformat(),
                'genero': n.genero,
                'padre_tutor': n.padre_tutor,
                'escuela': n.escuela,
                'nombre_informante': n.nombre_informante,
                'relacion_informante': n.relacion_informante,
                'periodo_conoce_nino': n.periodo_conoce_nino,
            }
            for n in niños
        ]
        return Response(data)
    
    if request.method == 'POST':
        fecha_nacimiento = parse_date(request.data['fecha_nacimiento'])
        if not fecha_nacimiento:
            return Response({'error': 'Fecha de nacimiento no valida'}, status=status.HTTP_400_BAD_REQUEST)

        niño = Niño.objects.create(
            nombre=request.data['nombre'],
            fecha_nacimiento=fecha_nacimiento,
            genero=request.data.get('genero'),
            padre_tutor=request.data.get('padre_tutor'),
            escuela=request.data.get('escuela'),
            nombre_informante=request.data.get('nombre_informante'),
            relacion_informante=request.data.get('relacion_informante'),
            periodo_conoce_nino=request.data.get('periodo_conoce_nino'),
            psychologist=request.user,
        )
        return Response({
            'id': str(niño.id),
            'nombre': niño.nombre,
            'fecha_nacimiento': niño.fecha_nacimiento.isoformat(),
            'genero': niño.genero,
            'padre_tutor': niño.padre_tutor,
            'escuela': niño.escuela,
            'nombre_informante': niño.nombre_informante,
            'relacion_informante': niño.relacion_informante,
            'periodo_conoce_nino': niño.periodo_conoce_nino,
        }, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def detalle_niño(request, pk):
    """Get, update or delete a child"""
    try:
        niño = Niño.objects.get(pk=pk, psychologist=request.user)
    except Niño.DoesNotExist:
        return Response({'error': 'Niño no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        return Response({
            'id': str(niño.id),
            'nombre': niño.nombre,
            'fecha_nacimiento': niño.fecha_nacimiento.isoformat(),
            'genero': niño.genero,
            'padre_tutor': niño.padre_tutor,
            'escuela': niño.escuela,
            'nombre_informante': niño.nombre_informante,
            'relacion_informante': niño.relacion_informante,
            'periodo_conoce_nino': niño.periodo_conoce_nino,
            'edad_meses': niño.edad_meses
        })
    
    if request.method == 'PUT':
        niño.nombre = request.data.get('nombre', niño.nombre)
        niño.fecha_nacimiento = request.data.get('fecha_nacimiento', niño.fecha_nacimiento)
        niño.genero = request.data.get('genero', niño.genero)
        niño.padre_tutor = request.data.get('padre_tutor', niño.padre_tutor)
        niño.escuela = request.data.get('escuela', niño.escuela)
        niño.nombre_informante = request.data.get('nombre_informante', niño.nombre_informante)
        niño.relacion_informante = request.data.get('relacion_informante', niño.relacion_informante)
        niño.periodo_conoce_nino = request.data.get('periodo_conoce_nino', niño.periodo_conoce_nino)
        niño.save()
        return Response({'status': 'Actualizado'})
    
    if request.method == 'DELETE':
        niño.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def evaluaciones_niño(request, pk):
    """Get all evaluations for a child"""
    try:
        niño = Niño.objects.get(pk=pk, psychologist=request.user)
    except Niño.DoesNotExist:
        return Response({'error': 'Niño no encontrado'}, status=status.HTTP_404_NOT_FOUND)
    
    from src.api.evaluaciones.models import Evaluación
    
    evaluaciones = Evaluación.objects.filter(niño=niño).order_by('-created_at')
    data = [
        {
            'id': str(e.id),
            'fecha': e.created_at.date().isoformat(),
            'estado': e.estado,
            'edad_meses': e.edad_meses,
        }
        for e in evaluaciones
    ]
    return Response(data)
