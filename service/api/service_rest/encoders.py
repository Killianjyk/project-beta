from common.json import ModelEncoder, JSONEncoder
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
        "vin",
        "id",
    ]
    def default(self, obj):
        if isinstance(obj, Appointment):
            result = {}
            for prop in self.properties:
                result[prop] = getattr(obj, prop)
            result["technician"] = f"{obj.technician.first_name} {obj.technician.last_name}"
            return result
        return super().default(obj)
