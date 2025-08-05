from flask import Blueprint, request, jsonify
from models import db, Post, User
from flask_jwt_extended import jwt_required, get_jwt_identity

post_bp = Blueprint('posts', __name__, url_prefix='/api')

# Create a new post
@post_bp.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    text = data.get('text')  # ✅ match the model field

    if not text:
        return jsonify({'message': 'Post content is required'}), 400

    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    new_post = Post(text=text, author_id=user_id)  # ✅ use text here
    db.session.add(new_post)
    db.session.commit()

    return jsonify({'message': 'Post created successfully'}), 201



# Get all posts
@post_bp.route('/posts', methods=['GET'])
def get_all_posts():
    posts = Post.query.order_by(Post.timestamp.desc()).all()
    result = []

    for post in posts:
        user = User.query.get(post.author_id)
        result.append({
            'id': post.id,
            'content': post.content,
            'timestamp': post.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            'author': {
                'id': user.id,
                'name': user.name,
                'email': user.email
            } if user else None
        })

    return jsonify(result), 200
