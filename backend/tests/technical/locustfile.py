"""Minimal real-server smoke load for the public CSRF bootstrap endpoint."""

from locust import HttpUser, between, task


class DaycTechnicalUser(HttpUser):
    wait_time = between(0.05, 0.15)

    @task
    def bootstrap_csrf(self):
        with self.client.get(
            "/api/auth/csrf/", name="csrf-bootstrap", catch_response=True
        ) as response:
            if response.status_code != 200:
                response.failure(f"Unexpected HTTP status: {response.status_code}")
