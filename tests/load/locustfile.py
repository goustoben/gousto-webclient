from locust import HttpUser, task

class UserBehavior(HttpUser):
    @task
    def index(self):
        self.client.get("/")
 
    @task
    def menu(self):
        self.client.get("/menu")

    @task
    def box(self):
        self.client.get("/box-prices")

    @task
    def privacy(self):
        self.client.get("/privacy-statement")

    @task
    def cookbook(self):
        self.client.get("/cookbook")
