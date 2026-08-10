from django.db import models

class ChartOfAccount(models.Model):
    account_code = models.CharField(max_length=50, unique=True)
    account_name = models.CharField(max_length=150)
    account_type = models.CharField(max_length=50) # Asset, Liability, Income, Expense, Equity
    balance = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    class Meta:
        verbose_name = "Chart of Account"
        verbose_name_plural = "Chart of Accounts"

    def __str__(self):
        return f"{self.account_code} - {self.account_name}"
