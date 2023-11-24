const multer = require("multer");
const path = require("path");

const imageConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "..", "/uploads/blog"));
    },
    filename: (req, file, callback) => {
        callback(null, `image_${Date.now()}.${file.originalname}`);
    },
});
const isImage = (req, file, callabck) => {
    if (file.mimetype.startsWith("image")) {
        callabck(null, true);
    } else {
        callabck(new Error("Only image is allowed"));
    }
};
const blogUpload = multer({
    storage: imageConfig,
    fileFilter: isImage,
});

module.exports = {
    blogUpload
}


