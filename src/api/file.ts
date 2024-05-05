import { axiosInstance } from '.';

export const uploadFileApi = async (file: File) => {
  const formData = new FormData();

  formData.append('file', file);

  try {
    const response = await axiosInstance.post('/upload', formData);
    return response.data?.data?.data;
  } catch (err) {
    console.error(err);
  }
};

export const getFileApi = async (fileId: string) => {
  try {
    const response = await axiosInstance.get(`upload/${fileId}`, {
      responseType: 'blob',
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
    throw new Error('file not found');
  }
};
