# CarCar

Team:

* Jeny Kim - Service
* Killian Kim - Sales

## Design
https://excalidraw.com/#json=kSAkpJdvmidyUVqBQFaqE,wUV-PgeRk6L2odg7K3z2VA

## Service microservice

I created 3 models: Appointment, Technician, and AutomobileVO. The we created AppointmentEncoder, TechnicianEncoder, and AutomobileVOEncoder were used in my view functions. These encoders help us get information from our models to use into our view functions. These view functions are used for backend and frontend purposes. We incorporated Insomnia to check if our backend was correct. As for poller, I updated that file to grab information about an automobile from inventory to update my automobileVO. Moving onto frontend, we created js files. We used jsx to help generate the content of the webpage. 

## Sales microservice

I created four models: Sale, Customer, Salesperson and AutomobileVO.
Using the polling method, AutomobileVO is polling for Automobile data in inventory, which essentially makes AutomobileVO a copy of Automobile. Any changes made to automobileVO would not affect the data in inventory because AutomobileVO is the model that's polling for the data. For each models, I made a view function that handles each of the following request: GET, DELETE, and POST. For example, the view functions that deals with backend request for Sales has four requests: list sales (GET), delete a sale (DELETE), details of a sale (GET), and create a sale (POST).
