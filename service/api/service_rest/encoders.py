from common.json import ModelEncoder, JSONEncoder
from .models import Technician, AutomobileVO, Appointment
from datetime import datetime, date, time


class DateEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.isoformat()
        elif isinstance(o, date):
            return o.isoformat()
        elif isinstance(o, time):
            return o.strftime('%I:%M:%S %p')
        else:
            return super().default(o)


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
    ]
    encoders = {
        "technician": TechnicianEncoder,
        }
