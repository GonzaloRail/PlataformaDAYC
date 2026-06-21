"""Configure Django for tests"""
import os
import sys
import django

# Add backend/src to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'src'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dayc2.settings')
django.setup()
