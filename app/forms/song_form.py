from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from app.aws_helpers import ALLOWED_EXTENSIONS, ALLOWED_AUDIO_EXTENSIONS

class ImageForm(FlaskForm):
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    audio = FileField("Audio File", validators=[FileRequired(), FileAllowed(list(ALLOWED_AUDIO_EXTENSIONS))])
    submit = SubmitField("Create Post")


# template form change
# <form action="/posts/new" method="POST" enctype="multipart/form-data">
