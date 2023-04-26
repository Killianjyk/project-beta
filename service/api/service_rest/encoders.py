from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment

# JSON encoder for AutomobileVO model
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "import_href",
        "id",
        "sold"
    ]

# JSON encoder for Technician Model
class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


# JSON encoder for Appointment Model
class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "reason",
        "status",
        "customer",
    ]
    encoders = {
        "vin": AutomobileVOEncoder,
        "technician": TechnicianEncoder
    }
