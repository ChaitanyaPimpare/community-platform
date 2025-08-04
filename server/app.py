from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, bcrypt, jwt  # ✅ Use extensions
from flask_migrate import Migrate       # ✅ Import Migrate

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
    migrate = Migrate(app, db)  # ✅ Add this

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(post_bp, url_prefix="/api")
    app.register_blueprint(user_bp, url_prefix="/api")

    @app.route('/')
    def hello():
        return {'message': 'API Running'}

    return app

app = create_app()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()   # ✅ Auto-create tables on startup
    app.run()
