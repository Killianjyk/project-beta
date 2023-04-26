from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale
# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin",
                  "import_href",
                  "id",
                  "sold"
                  ]


class SalespersonDetailEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]


class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "automobile",
        "customer",
        "salesperson",
        "id"
    ]
    encoders = {
        "automobile": AutomobileVOEncoder(),
        "customer": CustomerDetailEncoder(),
        "salesperson": SalespersonDetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_salesperson(request, id):
    if request.method == "GET":
        try:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(
                salesperson,
                encoder=SalespersonDetailEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson id"},
                status=404,
            )
    elif request.method == "DELETE":
        try:
            count, _ = Salesperson.objects.get(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"Message": "Invalid salesperson id"},
                status=404,
            )
    else:
        content = json.loads(request.body)
        Salesperson.objects.filter(id=id).update(**content)
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalespersonDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_customer(request, id):
    if request.method == "GET":
        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        try:
            count, _ = Customer.objects.get(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer ID"},
                status=404,
            )
    else:
        content = json.loads(request.body)
        Customer.objects.filter(id=id).update(**content)

        customer = Customer.objects.get(id=id)
        return JsonResponse(
            customer,
            encoder=CustomerDetailEncoder,
            safe=False
        )


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            id = content["salesperson"]
            salesperson = Salesperson.objects.get(id=id)
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid salesperson id"},
                status=404,
            )
        try:
            id = content["customer"]
            customer = Customer.objects.get(id=id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=404,
            )
        try:
            vin = content["automobile"]
            print(content["automobile"])
            print(id)
            automobile = AutomobileVO.objects.get(vin=vin)
            if Sale.objects.filter(automobile=automobile).exists():
                return JsonResponse(
                    {"message": "This vehicle has already been sold"},
                    status=400,
                )
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid automobile id"},
                status=404,
            )

        sale = Sale.objects.create(**content)
        sale.automobile.sold = True
        sale.automobile.save()

        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_sale(request, id):
    if request.method == "GET":
        try:
            sale = Sale.objects.get(id=id)
            return JsonResponse(
                sale,
                encoder=SaleDetailEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sale id"},
                status=404,
            )
    elif request.method == "DELETE":
        try:
            count, _ = Sale.objects.get(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sale id"},
                status=404,
            )
    else:
        content = json.loads(request.body)
        Sale.objects.filter(id=id).update(**content)
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            sale,
            encoder=SaleDetailEncoder,
            safe=False
        )
