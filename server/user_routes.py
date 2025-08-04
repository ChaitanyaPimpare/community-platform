from flask import Blueprint, jsonify
from models import User, Post

user_bp = Blueprint('user', __name__)

@user_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    user_data = {
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'bio': user.bio,
        'posts': [
            {
                'id': post.id,
                'text': post.text,
                'timestamp': post.timestamp.isoformat()
            }
            for post in sorted(user.posts, key=lambda p: p.timestamp, reverse=True)
        ]
    }
    return jsonify(user_data), 200
