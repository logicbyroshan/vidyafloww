from django.db import models

class CertificateTemplate(models.Model):
    title = models.CharField(max_length=100)
    certificate_type = models.CharField(max_length=50) # TC, Bonafide, Character, Experience
    template_html = models.TextField()

    class Meta:
        verbose_name = "Certificate Template"
        verbose_name_plural = "Certificate Templates"

    def __str__(self):
        return f"{self.title} ({self.certificate_type})"
