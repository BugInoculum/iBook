from rest_framework import serializers
from .models import Book
from accounts.models import CustomUser


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_author(self, value):
        # Check if the author exists in the database
        if not CustomUser.objects.filter(id=value).exists():
            raise serializers.ValidationError("Author does not exist.")
        return value

    def create(self, validated_data):
        # Create a new book instance
        book = Book.objects.create(**validated_data)
        return book


class BookListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title']


class BookDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class BookUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title', 'author']

    def validate_author(self, value):
        if not CustomUser.objects.filter(id=value).exists():
            raise serializers.ValidationError("Author does not exist.")
        return value

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.author = validated_data.get('author', instance.author)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance


class BookDeleteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = []
