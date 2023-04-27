import json
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import AutomobileVO, Appointment, Technician
from .encoders import AppointmentEncoder, AutomobileVOEncoder, TechnicianEncoder
# Create your views here.

# Appointment List Views
@require_http_methods(["GET", "POST"])
def appointment_list(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        appointment = Appointment(
            date_time=content["date_time"],
            reason=content["reason"],
            status=content["status"],
            customer=content["customer"],
            technician=Technician.objects.get(id=content["technician"]),
            vin=content["vin"]
        )
        appointment.save()
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentEncoder,
            safe=False
        )


# Appointment Detail Views
@require_http_methods(["GET", "DELETE"])
def appointment_detail(request, pk):
    appointment = get_object_or_404(Appointment, pk=pk)
    if request.method == "GET":
        return JsonResponse(
            {"appointment": appointment},
            encoder=AppointmentEncoder,
            safe=False
        )
    else:
        appointment.delete()
        return JsonResponse({"message": "Appointment deleted successfully."})


# Appointment Status
@require_http_methods(["PUT"])
def appointment_status(request, pk, status):
    appointment = get_object_or_404(Appointment, pk=pk)
    if status == "cancel":
        appointment.status = "CANCELLED"
    elif status == "finish":
        appointment.status = "COMPLETED"
    else:
        return JsonResponse(
            {"message": "Invalid status provided."},
            status=400
        )
    appointment.save()
    return JsonResponse(
        {"appointment": appointment},
        encoder=AppointmentEncoder,
        safe=False
    )


# Technician List Views
@require_http_methods(["GET", "POST"])
def technician_list(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
            safe=False
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        technician = Technician(
            first_name=content["first_name"],
            last_name=content["last_name"],
            employee_id=content["employee_id"],
        )
        technician.save()
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
            safe=False
        )


# Technician Detail Views
@require_http_methods(["GET", "DELETE"])
def technician_detail(request, pk):
    technician = get_object_or_404(Technician, pk=pk)
    if request.method == "GET":
        return JsonResponse(
            {"technician": technician},
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        technician.delete()
        return JsonResponse({"message": "Technician deleted successfully."})


# Automobile List Views
@require_http_methods(["GET"])
def automobile_list(request):
    automobiles = AutomobileVO.objects.all()
    return JsonResponse(
        {"automobiles": automobiles},
        encoder=AutomobileVOEncoder,
        safe=False
    )

# Automobile Detail Views
def automobile_detail(request, pk):
    automobile = get_object_or_404(AutomobileVO, pk=pk)
    return JsonResponse(
        {"automobile": automobile},
        encoder=AutomobileVOEncoder,
        safe=False
    )
