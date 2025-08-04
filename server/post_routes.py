from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models import Post, User

post_bp = Blueprint('post', __name__)

# -------- Create a new post --------
@post_bp.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    try:
        user_id = get_jwt_identity()
        print("Current user ID from token:", user_id)
        data = request.get_json()
        text = data.get('text')

        if not text:
            return jsonify({'message': 'Post text is required'}), 400

        new_post = Post(text=text, author_id=user_id)
        db.session.add(new_post)
        db.session.commit()

        return jsonify({'message': 'Post created successfully'}), 201
    except Exception as e:
        print("Error in create_post:", e)
        return jsonify({'message': 'Internal error'}), 500



# -------- Get all posts --------
@post_bp.route('/posts', methods=['GET'])
def get_all_posts():
    posts = Post.query.order_by(Post.timestamp.desc()).all()
    result = []

    for post in posts:
        result.append({
            'id': post.id,
            'text': post.text,
            'timestamp': post.timestamp.isoformat(),
            'author': {
                'id': post.author.id,
                'name': post.author.name,
                'email': post.author.email
            }
        })

    return jsonify(result), 200
