from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker

fake = Faker(locale='en_US')


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    peggy = User(username = 'peggy83', email = 'peggy@aa.io', password='password')
    hank = User(username = 'hankPropain', email = 'hank@aa.io', password='password')
    joseph = User(username = 'jo3seph', email = 'joe@aa.io', password='password')
    bill = User(username = 'bill76', email = 'bill@aa.io', password='password')
    boomhauer = User(username = 'boomB65', email = 'boomhauer@aa.io', password='password')
    dale = User(username = 'daleP3st', email = 'dale@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(peggy)
    db.session.add(hank)
    db.session.add(joseph)
    db.session.add(bill)
    db.session.add(boomhauer)
    db.session.add(dale)

    db.session.commit()




# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
