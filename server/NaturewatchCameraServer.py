#!../naturewatchenv/bin/python
import logging
from CameraController import camera_controller
from flask import Flask
from api import api


def setup_logger(name, log_file, level=logging.INFO):
    """
    Setup logger
    :param name: Logger name
    :param log_file: File to save to
    :param level: Logging level
    :return: Logger object
    """
    handler = logging.FileHandler(log_file)

    logger = logging.getLogger(name)
    logger.setLevel(level)
    logger.addHandler(handler)

    return logger


def create_app():
    """
    Create flask app
    :return: Flask app object
    """
    flask_app = Flask(__name__)
    flask_app.register_blueprint(api, url_prefix='/api')

    return flask_app


# Set up loggers
camera_logger = setup_logger('camera_controller_controller', 'camera_controller.log')

if __name__ == '__main__':
    app = create_app()
    camera_controller.start()
    app.run(debug=True, threaded=True)
