from flask import Blueprint, request, jsonify
from models import db, Post, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.orm import joinedload

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
@post_routes.route('/posts', methods=['GET'])
@jwt_required()
def get_posts():
    try:
        posts = Post.query.options(joinedload(Post.author)).all()  # ⬅ eager load author
        result = []
        for post in posts:
            result.append({
                'id': post.id,
                'content': post.content,
                'timestamp': post.timestamp,
                'author': {
                    'id': post.author.id,
                    'name': post.author.name,
                    'email': post.author.email
                }
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500