from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime


class Comment(db.Model, UserMixin):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    song_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('songs.id')), nullable=False)
    comment_text = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)

    user = db.relationship('User', back_populates='comments')
    song = db.relationship('Song', back_populates='comments')

    def to_dict(self):
        comment_dict = {
            'id': self.id,
            'user': self.user.to_dict(),
            'song': self.song.to_dict(),
            'comment': self.comment_text,
            'created_at': self.created_at
        }
        return comment_dict
