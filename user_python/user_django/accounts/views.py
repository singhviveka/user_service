# Create your views here.
# accounts/views.py

from django.shortcuts import render, redirect
from .forms import SignupForm, LoginForm
from .models import User


def signup(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = SignupForm()
    return render(request, 'signup.html', {'form': form})


def login(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data['email']
            password = form.cleaned_data['password']
            user = User.objects.filter(email=email, password=password).first()
            if user:
                # User authenticated, perform login actions (e.g., set session)
                return redirect('home')
            else:
                return render(request, 'login.html', {'form': form, 'error': 'Invalid email or password'})
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})


def home_view(request):
    return render(request, 'home.html')
