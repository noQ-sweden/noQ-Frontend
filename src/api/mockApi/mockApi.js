import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

export const axiosMockNoqApi = axios.create({
  headers: {
      "Content-type": "application/json",
    },
  withCredentials: true,
});

const noqMockApi =
    new AxiosMockAdapter(axiosMockNoqApi, { delayResponse: 0, onNoMatch: "throwException" });

noqMockApi.onPost('api/login/').reply((config) => {
    const data = JSON.parse(config.data);
    const login =
    {
        login_status: true,
        message: "Login Successful",
        groups: ["user"],
    };

    if (data.email == 'user.user@test.nu') {
        return [200, login];
    } else if (data.email == 'user.host@test.nu') {
        login.groups = ["host"];
        return [200, login];
    } else {
        login.login_status = false;
        login.message = "Login Failed";
        login.groups = null;
        return [200, login];
    }
});
