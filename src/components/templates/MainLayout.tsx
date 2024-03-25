import { FC, ReactNode, useEffect, useRef } from "react";
import { Header } from "@/components/organisms/Header";
import { ConfigProvider, Layout } from "antd";
import OrangeGradient from "../../../public/assets/orange-gradient.png";

type Props = {
  children: ReactNode;
};

const MainLayout: FC<Props> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff4d4d",
          colorBgContainer: "#3C22254C",
        },
      }}
    >
      <div className="w-full mx-auto">
        <Header />
        <Layout className="max-w-[calc(70%-8px)] w-[calc(50%-8px] overflow-hidden p-5 mx-auto bg-transparent">
          <div className="mix-blend-hard-light absolute -z-10 top-0 left-0 bottom-0 right-0">
            <img
              className="w-full h-[150%] object-cover absolute top-0 left-0 bottom-0 right-0"
              src={OrangeGradient}
              alt="gradient"
              loading="lazy"
            />
          </div>
          <div>{children}</div>
        </Layout>
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;
