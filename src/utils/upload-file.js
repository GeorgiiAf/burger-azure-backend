const uploadFileToExternalServer = async (file, token) => {
  try {
    const formData = new FormData();
    formData.append('file', file.buffer, file.originalname);

    const response = await fetch(`${process.env.VITE_UPLOAD_SERVER}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to upload file: ${errorData.message}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading file to external server:', error.message);
    throw new Error('Failed to upload file');
  }
};

export default uploadFileToExternalServer;
