from rest_framework import serializers
from .models import Car, Like, Comment

# --- Comment Serializer ---
class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'car', 'user', 'parent', 'content', 'created_at', 'updated_at', 'replies']
        read_only_fields = ['id', 'user', 'created_at', 'updated_at', 'replies']

    def get_replies(self, obj):
        qs = obj.replies.all()
        return CommentSerializer(qs, many=True, context=self.context).data

# --- Car Serializer ---
class CarSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField()
    user_liked = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = '__all__'  # all Car fields
        extra_fields = ['likes_count', 'user_liked', 'comments']

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_user_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False

    def get_comments(self, obj):
        top_comments = obj.comments.filter(parent=None)
        return CommentSerializer(top_comments, many=True, context=self.context).data
