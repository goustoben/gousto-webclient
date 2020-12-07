from locust import HttpLocust, TaskSet, task

class UserBehavior(TaskSet):
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

class WebsiteUser(HttpLocust):
    task_set = UserBehavior
    host = "http://frontend.gousto.local"
    min_wait = 2000
    max_wait = 3000
