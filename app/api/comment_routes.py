from flask import Blueprint, request,abort, jsonify
from app.models import db, Comment,Song
from flask_login import current_user, login_required
from app.forms import CommentForm

comment_routes = Blueprint("comments", __name__)

# GET COMMENTS OF SONG
@comment_routes.route('/<int:song_id>', method=["GET"])
def get_comments_of_song(song_id):

    comments = Comment.query.filter(song_id == Comment.song_id).all()
    if not comments:
        return {"message": "Song has no comments"}
    comments_to_dict = [comment.to_dict() for comment in comments]
    return {"comments":comments_to_dict}



# POST NEW COMMENT
@comment_routes.route("/<int:song_id>/new", methods=['POST'])
@login_required
def create_comment(song_id):
    form = CommentForm()
    song = Song.query.filter(Song.id == song_id)
    comments = Comment.query.filter(Comment.user_id == current_user.id)
    if not song:
        return {"message":"song does not exist"}, 404

    if current_user.id == song.user_id:
        return {"message": "Cannot comment on your own song"}, 403

    form['csrf_token'].data = request.cookies['csrf_token']
    if not current_user:
        return {"message": "current user not logged in"}

    if comments:
        return {"message": "User already has comment for song"}

    if form.validate_on_submit():
       new_comment = Comment(
           user = current_user.id,
           song = song_id,
           comment = form.comment_text.data,
       )

       db.session.add(new_comment)
       db.session.commit()

       return jsonify({"comment": new_comment.to_dict()})
    else:
       return {'errors':form.errors},400



# EDIT COMMENT
@comment_routes.route("/<int:comment_id>/edit", methods=['PUT'])
@login_required
def edit_comment(comment_id):

    comment = Comment.query.filter(Comment.id == comment_id).first()
    form = CommentForm()

    if not comment:
        return {"message": "comment does not exist"}, 404
    if comment.user_id != current_user.id:
        return {"message": "user is not owner of this comment"}, 403

    if form.validate_on_submit():
        comment.comment_text = form.comment_text.data

        db.session.commit()
        return jsonify({"comment": comment.to_dict()})
    else:
        return {"errors": form.errors}, 400

#Delete comment
@comment_routes.route("/<int:comment_id>", methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.filter(Comment.id == comment_id)

    if not current_user:
        return {"message": "current user not logged in"}, 403
    if not comment:
        abort(404, {"message": "Comment does not exist"})

    db.session.delete(comment)
    db.session.commit()
    return {"comment": comment.to_dict()}
