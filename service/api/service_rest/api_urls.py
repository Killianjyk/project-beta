from django.urls import path
from .api_views import appointment_list,appointment_detail, appointment_status, technician_list, technician_detail, automobile_detail

urlpatterns = [
    # Appointments
    path('appointments/', appointment_list),
    path('appointments/<int:pk>/', appointment_detail),
    path('appointments/<int:pk>/cancel/', appointment_status, {'status': 'cancel'}),
    path('appointments/<int:pk>/finish/', appointment_status, {'status': 'finish'}),

    # Technicians
    path('technicians/', technician_list),
    path('technicians/<int:pk>/', technician_detail),

    # AutomobileVOs
    path('automobiles/<int:pk>/', automobile_detail, name='api_automobile'),
]
