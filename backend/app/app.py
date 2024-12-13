# app.py
from flask_cors import CORS
from flask import Flask
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Habilitar CORS
    CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

    # Registrar las rutas
    from .routes.inferencia import bp as inferencia_bp
    app.register_blueprint(inferencia_bp, url_prefix='/api')

    # Ruta opcional para la raíz, solo para no recibir 404 al entrar en "/"
    @app.route('/', methods=['GET'])
    def home():
        return "Bienvenido al Sistema Experto de Estrés Académico", 200

    return app

app = create_app()
