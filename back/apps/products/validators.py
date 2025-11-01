from django.core.exceptions import ValidationError
import os


def validate_image_file_extension(value):
    """Validate that uploaded file is an image (JPEG, PNG, WebP)"""
    ext = os.path.splitext(value.name)[1].lower()
    valid_extensions = ['.jpg', '.jpeg', '.png', '.webp']
    if ext not in valid_extensions:
        raise ValidationError(
            f'Unsupported file extension. Allowed extensions: {", ".join(valid_extensions)}'
        )


def validate_image_file_size(value):
    """Validate that uploaded file does not exceed 5MB"""
    filesize = value.size
    max_size_mb = 5
    max_size_bytes = max_size_mb * 1024 * 1024  # 5MB in bytes
    
    if filesize > max_size_bytes:
        raise ValidationError(
            f'File size exceeds {max_size_mb}MB. Current size: {filesize / (1024 * 1024):.2f}MB'
        )
