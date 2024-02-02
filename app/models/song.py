from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime


class Song(db.Model, UserMixin):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    genre = db.Column(db.String(255), nullable=False)
    image_file = db.Column(db.String, nullable=False)
    audio_file = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    comments = db.relationship('Comment', back_populates='song')
    liked_songs = db.relationship('LikedSong', back_populates='song')
    uploader = db.relationship('User', back_populates='songs')


    def to_dict(self):
        song_dict = {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'image_file': self.image_file,
            'audio_file': self.audio_file,
            'user_id': self.uploader.to_dict(),
            'created_at': self.created_at,
            'num_likes': len(self.liked_songs)
        }
        return song_dict
