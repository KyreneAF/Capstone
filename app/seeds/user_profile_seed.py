from app.models import db, UserImage, environment, SCHEMA
from sqlalchemy.sql import text

def seed_user_image():
    demo = UserImage(
        user_id='1',
        image_file='https://cap-nn-images.s3.amazonaws.com/3bc5241c2b3c4be79047331f682eda98.jpeg',
        image_file_name='demo-profile-img',
    )

    db.session.add(demo)
    db.session.commit()

def undo_user_image():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_images"))

    db.session.commit()
