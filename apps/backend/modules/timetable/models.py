from django.db import models

class TimetableSlot(models.Model):
    """
    Timetable slot for class, teacher, room, and lab scheduling with AI optimization support.
    """
    day_of_week = models.CharField(max_length=15)
    start_time = models.TimeField()
    end_time = models.TimeField()
    subject_name = models.CharField(max_length=100)
    teacher_name = models.CharField(max_length=100)
    room_number = models.CharField(max_length=50)

    class Meta:
        verbose_name = "Timetable Slot"
        verbose_name_plural = "Timetable Slots"

    def __str__(self):
        return f"{self.day_of_week} ({self.start_time} - {self.end_time}): {self.subject_name}"
