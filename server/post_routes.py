from flask import Blueprint, request, jsonify 
from models import db, Post, User
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.orm import joinedload

post_bp = Blueprint('posts', __name__)  # No url_prefix here

# Create a new post
@post_bp.route('/', methods=['POST', 'OPTIONS'])
@jwt_required(optional=True)  # Make jwt optional so OPTIONS can pass
def create_post():
    if request.method == 'OPTIONS':
        # Preflight response
        return '', 204

    data = request.get_json()
    text = data.get('text')

    if not text:
        return jsonify({'message': 'Post content is required'}), 400

    user_id = str(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({'message': 'User not found'}), 404

    new_post = Post(text=text, author_id=user_id)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({'message': 'Post created successfully'}), 201



# Get all posts
@post_bp.route('/', methods=['GET'])
@jwt_required(optional=True)
def get_posts():
    try:
        posts = Post.query.options(joinedload(Post.author)).order_by(Post.timestamp.desc()).all()
        result = []
        for post in posts:
            result.append({
                'id': post.id,
                'text': post.text,  # ✅ fix field name
                'timestamp': post.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
                'author': {
                    'id': post.author.id,
                    'name': post.author.name,
                    'email': post.author.email
                }
            })
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
