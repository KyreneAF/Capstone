from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime


class Song(db.Model, UserMixin):
    __tablename__ = 'songs'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False )
    genre = db.Column(db.String(255), nullable=False )
    image_file = db.Column(db.String(255), nullable=False)
    audio_file = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey(add_prefix_for_prod('users.id')) ,nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    comments = db.relationship('Comment', back_populates='song', cascade ='all,delete-orphan')
    uploader = db.relationship("User", back_populates='songs')
    liked_songs = db.relationship("LikedSong", back_populates='song', cascade='all, delete-orphan')


    def to_dict(self):


        song_dict = {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'audio_file': self.audio_file,
            'image_file': self.image_file,
            'user_id': self.uploader.to_dict(),
            'created_at': self.created_at,
            'num_likes': len(self.liked_songs),
            'comments': [comment.to_dict() for comment in self.comments]
        }

        return song_dict
