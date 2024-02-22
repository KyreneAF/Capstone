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

    for i in range(1,62):
        newComment = Comment(
            user_id= 4,
            song_id= i,
            comment_text = choice(music_comments),
            created_at = datetime.now()
        )
        newComments.append(newComment)
        newComment2 = Comment(
            user_id= 5,
            song_id= i,
            comment_text = choice(music_comments),
            created_at = datetime.now()
        )
        newComments.append(newComment2)
        newComment3 = Comment(
            user_id= 6,
            song_id= i,
            comment_text = choice(music_comments),
            created_at = datetime.now()
        )
        newComments.append(newComment3)
        newComment4 = Comment(
            user_id= 7,
            song_id= i,
            comment_text = choice(music_comments),
            created_at = datetime.now()
        )
        newComments.append(newComment4)
        newComment5 = Comment(
            user_id= 8,
            song_id= i,
            comment_text = choice(music_comments),
            created_at = datetime.now()
        )
        newComments.append(newComment5)
        newComment6 = Comment(
            user_id= 9,
            song_id= i,
            comment_text = choice(music_comments),
            created_at = datetime.now()
        )
        newComments.append(newComment6)

    db.session.add_all(newComments)

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
