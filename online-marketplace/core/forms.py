from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.models import User

class SignupForm(UserCreationForm):
    username = forms.CharField(widget=forms.TextInput(
        attrs={'placeholder': 'Username', 'class': 'w-full py-4 px-6 rounded-xl'}
    ))
    email = forms.CharField(widget=forms.EmailInput(
        attrs={'placeholder': 'Email address', 'class': 'w-full py-4 px-6 rounded-xl'}
    ))
    password1 = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': 'Password', 'class': 'w-full py-4 px-6 rounded-xl'}
    ))
    password2 = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': 'Retype Password', 'class': 'w-full py-4 px-6 rounded-xl'}
    ))
    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')


class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=forms.TextInput(
        attrs={'placeholder': 'Username', 'class': 'w-full py-4 px-6 rounded-xl'}
    ))
    password = forms.CharField(widget=forms.PasswordInput(
        attrs={'placeholder': 'Password', 'class': 'w-full py-4 px-6 rounded-xl'}
    ))