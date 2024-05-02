from django.db import models
from accounts.models import CustomUser


class Section(models.Model):
    section_name = models.CharField(max_length=40)
    section_content = models.TextField()
    created_at = models.DateTimeField()
    parent_section = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True,
                                       related_name='subsections')


class Book(models.Model):
    title = models.CharField(max_length=50)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_created=True)

    def __str__(self):
        return self.title

    def get_author(self):
        return f'{self.author.name}'

    def get_book_title(self):
        return f'{self.title}'


class Page(models.Model):
    page_number = models.IntegerField(unique=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_created=True)

    def __str__(self):
        return f'Page {self.page_number} of {self.book.name}'
