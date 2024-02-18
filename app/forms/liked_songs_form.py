from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, TextAreaField
from wtforms.validators import DataRequired

class LikedSongForm(FlaskForm):
    song_id = TextAreaField("Comment", validators=[DataRequired()])
    submit = SubmitField("Add Comment")
