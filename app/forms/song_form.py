from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, SelectField, StringField
from wtforms.validators import DataRequired
from app.api.aws_helpers import ALLOWED_EXTENSIONS, ALLOWED_AUDIO_EXTENSIONS






class SongForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired()])
    genre = SelectField("Genre", choices=["Rock","Electronic","Dirty Bass","Pop","Hip-Hop","Latino"],validators=[DataRequired()])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    imageName = StringField("Image Name", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    audio = FileField("Audio File", validators=[FileRequired(), FileAllowed(list(ALLOWED_AUDIO_EXTENSIONS))])
    audioName = StringField("Audio Name", validators=[FileRequired(), FileAllowed(list(ALLOWED_AUDIO_EXTENSIONS))])
    submit = SubmitField("Create Song")


# template form change
# <form action="/posts/new" method="POST" enctype="multipart/form-data">
