from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, bcrypt, jwt
from flask_migrate import Migrate, upgrade

from auth_routes import auth_bp
from post_routes import post_bp
from user_routes import user_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize Extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)
    CORS(app)

    # Flask-Migrate Setup
    migrate = Migrate(app, db)

    # ✅ Run migrations automatically at startup
    with app.app_context():
        try:
            upgrade()
        except Exception as e:
            print(f"Migration error: {e}")

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(post_bp, url_prefix="/api/posts")
    app.register_blueprint(user_bp, url_prefix="/api/user")

    @app.route('/')
    def hello():
        return {'message': 'API Running'}

    return app

# ✅ Run app if script is called directly
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
