import django, os, sys
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()
from django.test.utils import setup_test_environment
setup_test_environment()
from django.test import Client
from django.contrib.auth import get_user_model

User = get_user_model()
u = User.objects.filter(etudiant__isnull=False).first()
c = Client()
if u:
    c.force_login(u)
    r = c.get('/profiles/messagerie/')
    print('Status:', r.status_code)
    html = r.content.decode('utf-8')
    with open('debug_messagerie.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("HTML written to debug_messagerie.html")
else:
    print("No user found")
