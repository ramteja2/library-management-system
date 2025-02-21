from django.db import models

class Book(models.Model):
    DATE = models.CharField(max_length=50, blank=True, null=True)
    ACC_NUM = models.CharField(max_length=50, blank=True, null=True)
    CALL_NUM = models.CharField(max_length=50, blank=True, null=True)
    TITLE = models.CharField(max_length=200)
    AUTHOR = models.CharField(max_length=200)
    SOURCE = models.CharField(max_length=200, blank=True, null=True)
    INV_NUM = models.CharField(max_length=50, blank=True, null=True)
    INV_DATE = models.CharField(max_length=50, blank=True, null=True)
    AMOUNT = models.CharField(max_length=50, blank=True, null=True)
    PUBLISHER = models.CharField(max_length=200, blank=True, null=True)
    YEAR_PUB = models.CharField(max_length=50, blank=True, null=True)
    PAGES = models.CharField(max_length=50, blank=True, null=True)
    BOOK_SIZE = models.CharField(max_length=50, blank=True, null=True)
    EDITION = models.CharField(max_length=50, blank=True, null=True)
    COST = models.CharField(max_length=50, blank=True, null=True)
    REMARKS = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.TITLE
