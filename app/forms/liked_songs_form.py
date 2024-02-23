from flask_wtf import FlaskForm
# from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, IntegerField
from wtforms.validators import DataRequired

class LikedSongForm(FlaskForm):
    song_id = IntegerField("Song", validators=[DataRequired()])
    submit = SubmitField("Add Comment")
