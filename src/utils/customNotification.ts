import { notification } from "antd";

const baseConfig = {
  className:
    "!bg-primary-bg border-[0.1px] border-granite-gray border-b-primaryColor",
};

const notifyError = (options: any) => {
  notification.error({
    ...baseConfig,
    ...options,
  });
};

const notifySuccess = (options: any) => {
  notification.success({
    ...baseConfig,
    ...options,
  });
};

const notifyInfo = (options: any) => {
  notification.info({
    ...baseConfig,
    ...options,
  });
};

const notifyWarning = (options: any) => {
  notification.warning({
    ...baseConfig,
    ...options,
  });
};

export default {
  error: notifyError,
  success: notifySuccess,
  info: notifyInfo,
  warning: notifyWarning,
};
