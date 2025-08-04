from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, bcrypt, jwt
from flask_migrate import Migrate

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

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(post_bp, url_prefix="/api")
    app.register_blueprint(user_bp, url_prefix="/api")

    @app.route('/')
    def hello():
        return {'message': 'API Running'}

    # ✅ Temporary route for creating tables (use only once after deploy)
    @app.route('/create-tables')
    def create_tables():
        db.create_all()
        return {'message': 'Tables created successfully'}

    return app

# ✅ Main block using the create_app function
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
