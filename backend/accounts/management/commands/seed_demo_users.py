from django.core.management.base import BaseCommand
from accounts.models import User


class Command(BaseCommand):
    help = 'Create demo users for the deployed app if they do not exist.'

    def handle(self, *args, **options):
        defaults = {
            'role': 'ADMIN',
            'email': 'admin@gmail.com',
            'phone': '1234567890',
        }
        user, created = User.objects.get_or_create(
            username='admin',
            defaults=defaults,
        )
        if created:
            user.set_password('admin1234')
            user.save()
        else:
            user.email = defaults['email']
            user.phone = defaults['phone']
            user.role = defaults['role']
            user.is_staff = True
            user.is_superuser = True
            user.save()
            if not user.check_password('admin1234'):
                user.set_password('admin1234')
                user.save()

        applicant, created = User.objects.get_or_create(
            username='applicant',
            defaults={
                'role': 'APPLICANT',
                'email': 'applicant@example.com',
                'phone': '1112223333',
            },
        )
        if created:
            applicant.set_password('applicant1234')
            applicant.save()
        else:
            applicant.email = 'applicant@example.com'
            applicant.phone = '1112223333'
            applicant.role = 'APPLICANT'
            applicant.save()

        self.stdout.write(self.style.SUCCESS('Demo users ensured.'))
