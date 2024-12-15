import mysql.connector
from app.config import Config
import os

def get_db_connection():
    """
    Devuelve una conexión a la base de datos.
    """
    try:
        connection = mysql.connector.connect(**Config.DATABASE_CONFIG)
        return connection
    except mysql.connector.Error as err:
        print(f"Error al conectar a MySQL: {err}")
        return None


def init_database():
    """
    Verifica si la base de datos y las tablas necesarias existen.
    Si no existen, las crea ejecutando el script SQL.
    """
    try:
        # Conexión inicial al servidor MySQL
        connection = mysql.connector.connect(
            host=Config.DATABASE_CONFIG['host'],
            user=Config.DATABASE_CONFIG['user'],
            password=Config.DATABASE_CONFIG['password'],
            port=Config.DATABASE_CONFIG['port']
        )
        cursor = connection.cursor()

        # Crear la base de datos si no existe
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {Config.DATABASE_CONFIG['database']};")
        print(f"[INFO] Base de datos '{Config.DATABASE_CONFIG['database']}' verificada/creada.")

        # Seleccionar la base de datos para usarla
        cursor.execute(f"USE {Config.DATABASE_CONFIG['database']};")

        # Leer el script SQL desde `database/init.sql`
        script_path = os.path.join(os.path.dirname(__file__), "../database/init.sql")
        with open(script_path, 'r') as file:
            sql_script = file.read()

        # Ejecutar el script SQL
        for statement in sql_script.split(';'):
            if statement.strip():
                cursor.execute(statement)

        connection.commit()
        print("[INFO] Tablas verificadas/creadas.")
        connection.close()

    except mysql.connector.Error as err:
        print(f"[ERROR] Error al inicializar la base de datos: {err}")


def guardar_usuario(nombre, edad):
    """
    Inserta un usuario en la base de datos y devuelve el ID generado.
    """
    connection = get_db_connection()
    if not connection:
        return None

    try:
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO usuarios (nombre, edad) VALUES (%s, %s)",
            (nombre, edad)
        )
        connection.commit()
        user_id = cursor.lastrowid
        connection.close()
        return user_id
    except mysql.connector.Error as err:
        print(f"[ERROR] Error al guardar usuario: {err}")
        return None


def guardar_respuestas(usuario_id, respuestas):
    """
    Inserta respuestas en la base de datos asociadas a un usuario.
    """
    connection = get_db_connection()
    if not connection:
        return False

    try:
        cursor = connection.cursor()
        for pregunta_key, respuesta in respuestas.items():
            cursor.execute(
                "INSERT INTO respuestas (usuario_id, pregunta_key, respuesta) VALUES (%s, %s, %s)",
                (usuario_id, pregunta_key, respuesta)
            )
        connection.commit()
        connection.close()
        return True
    except mysql.connector.Error as err:
        print(f"[ERROR] Error al guardar respuestas: {err}")
        return False
