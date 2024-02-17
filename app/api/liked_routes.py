from flask import Blueprint, request,abort
from app.models import db, LikedSong,Song
from flask_login import current_user, login_required
from app.forms import LikedSongForm

liked_song_routes = Blueprint("liked_songs", __name__)

# GET LIKED SONGS OF USER
@liked_song_routes.route('/<int:user_id>', methods=["GET"])
@login_required
def get_liked_songs(user_id):

    liked_songs = LikedSong.query.filter(LikedSong.user_id == user_id).order_by(LikedSong.created_at.desc())
    if not liked_songs:
        return {"message": "user does not have liked songs"}, 404
    liked_songs_to_dict = [song.to_dict() for song in liked_songs]
    return {"songs":liked_songs_to_dict},200

# ADD LIKED_SONG
@liked_song_routes.route("/<int:song_id>", methods=['POST'])
@login_required
def create_liked_song(song_id):
    form = LikedSongForm()
    song = Song.get(song_id)

    if not song:
        return {"message":"song does not exist"},404
    form['csrf_token'].data = request.cookies['csrf_token']
    if not current_user:
        return {"message": "current user not logged in"}
    if form.validate_on_submit():
        liked_song = LikedSong(
           user_id = current_user.id,
           song_id = song_id,

        )
        db.session.add(liked_song)
        db.session.commit()
        return jsonify({"song": liked_song.to_dict()})
    else:
        return {'errors': form.errors},400

# DELETE LIKED_SONG
@liked_song_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_liked_song(id):
    liked_song = LikedSong.query.get(id)

    if not current_user:
        return {"message": "current user not logged in"}, 403
    if not liked_song:
        return {"message": "Liked song does not exist"}, 404
    db.session.delete(liked_song)
    db.session.commit()
    return {"message": "Successfully deleted"}
