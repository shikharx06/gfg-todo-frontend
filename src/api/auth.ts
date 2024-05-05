import { axiosInstance } from '.';

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });

    const { message, data } = response.data;

    const responseData = data.data;
    console.log(message);
    // console.log(responseData);
    return responseData;
  } catch (err: any) {
    throw new Error(err.response.data.err);
  }
};
