from django.contrib import admin
from .models import Technician, AutomobileVO, Appointment

# Register your models here.

# register model Technician
@admin.register(Technician)
class TechnicianAdmin(admin.ModelAdmin):
    pass

# register model AutomobileVO
@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    pass

# register model Appointment
@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    pass
