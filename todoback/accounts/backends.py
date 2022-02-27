from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

class EmailAuthBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **credentials):
        try:
            user = get_user_model().objects.get(email=email)
        except Exception:
            return None
        else:
            if user.check_pasword(password) and self.user_can_authenticate(user):
                return user