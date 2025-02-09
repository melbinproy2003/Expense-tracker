from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Expense

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email']

class ExpenseSerializers(serializers.ModelSerializer):
    class Meta:
        model = Expense
        exclude = ['user']