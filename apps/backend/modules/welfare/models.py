from django.db import models

class CounsellingRecord(models.Model):
    student_id = models.CharField(max_length=50)
    counsellor_name = models.CharField(max_length=100)
    session_date = models.DateField()
    notes = models.TextField()
    follow_up_date = models.DateField(null=True, blank=True)

    class Meta:
        verbose_name = "Counselling Record"
        verbose_name_plural = "Counselling Records"

    def __str__(self):
        return f"Counselling for {self.student_id} on {self.session_date}"
