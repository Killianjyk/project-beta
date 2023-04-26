from django.db import models
from django.urls import reverse

# Create your models here.
# model AutomobileVO
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"id: self.id"})
    def __str__(self):
        return self.vin

# model Technician
class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def get_api_url(self):
        return reverse("api_technician", kwargs={"id: self.id"})


# model Appointment
class Appointment(models.Model):
    STATUS_CHOICES = [
        ('SCHEDULED', 'Scheduled'),
        ('CANCELLED', 'Cancelled'),
        ('COMPLETED', 'Completed')
    ]
    date_time = models.DateField()
    reason = models.CharField(max_length=100)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='SCHEDULED')
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        related_name="technicians",
        on_delete=models.CASCADE
    )
    vin = models.ForeignKey(
        AutomobileVO,
        related_name="vins",
        on_delete=models.CASCADE
    )

    def get_api_url(self):
        return reverse("api_appointment_detail", kwargs={"pk": self.pk})

    def __str__(self):
        return self.reason
