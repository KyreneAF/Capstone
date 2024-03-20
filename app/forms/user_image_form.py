from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, StringField
from wtforms.validators import DataRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS, ALLOWED_AUDIO_EXTENSIONS






class SongForm(FlaskForm):
    profile_image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    image_name = StringField("Image Name", validators=[DataRequired()])
    submit = SubmitField("Add Image")
