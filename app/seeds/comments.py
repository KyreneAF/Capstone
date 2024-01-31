from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint, choice
from datetime import datetime




music_comments = [
    "This song has such a catchy melody!",
    "I love how the lyrics tell a story and evoke emotions.",
    "The instrumental arrangement is incredible, creating a mesmerizing atmosphere.",
    "The artist's voice is so unique and adds a special touch to the song.",
    "The rhythm and beat make it impossible not to dance!",
    "This track takes me on a journey through different moods and vibes.",
    "The production quality is top-notch, making it a pleasure to listen to.",
    "The lyrics resonate with me on a personal level, creating a deep connection.",
    "I can't get enough of the powerful vocals and harmonies in this song.",
    "The diversity of genres blended in this track showcases the artist's versatility."
]

def seed_comments():
    newComments = []

    for i in range(20):
        newComment = Comment(
            user_id= randint(1,11),
            song_id=randint(1,20),
            comment_text = choice(music_comments),
            created_at = datetime.now()
        )
        newComments.append(newComment)
    db.session.add_all(newComments)

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
