from django.urls import path
from .views import (
    RegistrationAPI, LoginAPI, ExpenseListCreateAPI, ExpenseDetailAPI,
    ExpenseUpdateAPI, ExpenseDeleteAPI, LogoutAPI
)

urlpatterns = [
    # Authentication APIs
    path('register/', RegistrationAPI.as_view(), name="register_api"),
    path('login/', LoginAPI.as_view(), name="login_api"),
    path('logout/', LogoutAPI.as_view(), name="logout_api"),

    # Expense APIs
    path('expenses/', ExpenseListCreateAPI.as_view(), name="expense_list_create"),
    path('expenses/<int:pk>/', ExpenseDetailAPI.as_view(), name="expense_detail"),
    path('expenses/update/<int:pk>/', ExpenseUpdateAPI.as_view(), name="expense_update"),
    path('expenses/delete/<int:pk>/', ExpenseDeleteAPI.as_view(), name="expense_delete"),
]
