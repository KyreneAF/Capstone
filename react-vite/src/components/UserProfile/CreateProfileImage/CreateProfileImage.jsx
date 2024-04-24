import { useState } from "react";
import { useModal } from "../../../context/Modal";
import { useDroppable } from "@dnd-kit/core";

function CreateProfileImage() {
  const { closeModal } = useModal();
  const [profileImage, setProfileImage] = useState();

  const { isOver, setNodeRef } = useDroppable({
    id: "profile-image-dropzone",
  });

  const handleDrop = (e) => {
    // Handle dropped files
    setProfileImage(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div id="create-img-main-cont">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div
          id="upload-box-cont"
          ref={setNodeRef}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          style={{
            border: isOver ? "2px dashed green" : "2px dashed transparent",
          }}
        >
          <label>Image file</label>
          <input
            className="box"
            type="file"
            accept="image/png, image/jpeg image/pdf, image/png, image/jpg, image/jpeg, image/gif"
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
          <div
            style={{ maxHeight: "20px", marginTop: "20px" }}
            className="update-err-cont"
          >
            {!profileImage ? (
              <span style={{ color: "red" }}>Image file cannot be empty</span>
            ) : (
              <span style={{ color: "white" }}>Holding</span>
            )}
          </div>
          <button disabled={!profileImage} type="submit">
            Upload Image
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProfileImage;
