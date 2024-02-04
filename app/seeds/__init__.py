from flask.cli import AppGroup
from .user_seeds import seed_users, undo_users
from .song_seeds import seed_songs, undo_songs
from .image_file_seeds import seed_image_files, undo_image_files
from .audio_file_seeds import seed_song_files, undo_song_files
from .comments_seeds import seed_comments, undo_comments
from .liked_songs_seeds import seed_liked_songs, undo_liked_songs
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.songs RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.image_files RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.audio_files RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.liked_songs RESTART IDENTITY CASCADE;")
        db.session.commit()
        undo_liked_songs()
        undo_comments()
        undo_image_files()
        undo_song_files()
        undo_songs()
        undo_users()

    seed_users()
    seed_songs()
    seed_image_files()
    seed_song_files()
    seed_comments()
    seed_liked_songs()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_songs()
    undo_image_files()
    undo_song_files()
    undo_comments()
    undo_liked_songs()
    # Add other undo functions here
