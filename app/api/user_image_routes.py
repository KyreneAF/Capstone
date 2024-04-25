from flask import Blueprint, request,abort
from app.models import db, UserImage
from flask_login import current_user, login_required
from app.forms import UserImageForm
from app.api.aws_helpers import (upload_file_to_s3_images, get_unique_filename, remove_file_from_s3_images)

user_image_routes = Blueprint('profile', __name__)

# GET IMAGE
@user_image_routes.route('/<int:user_image_id>', methods=['GET'])
@login_required
def get_user_image(user_image_id):
    user_image = UserImage.query.get(user_image_id)# find user image in UserImage table with specific id
    if not user_image: # return error message if no image is found
        return {"message": "User image does not exist"},404
    user_img_to_dict = user_image.to_dict() #turn image into a dictionary
    return {'user_image': user_img_to_dict} # return user image dictionary


# POST USER IMAGE
@user_image_routes.route('/<int:id>/new', methods=['POST'])
@login_required
def create_image():
    form = UserImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if not current_user:
        return {"message":  "Current user not logged in"}

    if form.validate_on_submit():

        profile_image = form.data["profile_image"]
        image_name = form.data['profile_image']
        profile_image.filename = get_unique_filename(profile_image.filename)
        profile_image_upload = upload_file_to_s3_images(profile_image)

        if "url" not in profile_image_upload:
            return {"message":profile_image_upload["errors"],"Object":"image_upload"}

        new_profile_image = UserImage(
            user_id = current_user.id,
            image_file = profile_image_upload["url"],
            image_file_name = image_name
        )
        db.session.add(new_profile_image)
        db.session.commit()

        return {"profile_image":new_profile_image.to_dict()},201
    else:
        return {"errors": form.errors}, 400


# EDIT USER IMAGE
@user_image_routes.route("/<int:id>/edit", methods=["PUT"])
@login_required
def edit_user_image(id):

    user_image = UserImage.query.get(id)
    if not user_image:
        return {"message": "user_image doesn't exist"},404
    if not current_user:
        return {"message":  "Current user not logged in"},403
    form = UserImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        #change user_image from db to the new data in the form
        user_image.profile_image = form.data["profile_image"]
        user_image.image_name = form.data["image_name"]
        #set new image & audio from the incoming from
        if form.profile_image.data:
        #delete old image and audio from old user_image
            # remove_file_from_s3_images(user_image.image_file)
            # remove_file_from_s3(user_image.audio_file)
            image = form.profile_image.data
            image_name = form.image_name.data

        #assign filename property to a unique name
            image.filename = get_unique_filename(image.filename)


        #upload to aws
            new_image_upload = upload_file_to_s3_images(image)

            print(new_image_upload)


        if "url" not in new_image_upload:
            return {"message":new_image_upload["errors"],"Object":"image_upload"}
        #change old user_image to new image and commit
        user_image.image_file = new_image_upload["url"]



        db.session.commit()
        return {"profile_image": user_image.to_dict()},201

    else:
        return {"errors": form.errors}, 400


# DELETE USER PROFILE IMAGE
@user_image_routes.route("/<int:id>", methods=['DELETE'])
@login_required
def delete_song(id):

    user_image = UserImage.query.get(id)

    if not current_user:
        return {"message": "current user not logged in"}, 403
    if not user_image:
        abort(404, {"message": "user_image does not exist"})
    if current_user.id != user_image.user_id:
        return {"message": "Current user not owner of user_image!"}, 403
    # remove_file_from_s3_images(user_image.image_file)
    # remove_file_from_s3(user_image.audio_file)

    db.session.delete(user_image)
    db.session.commit()
    return {"deleted user_image": user_image.to_dict(), "message": "successfully deleted"}
