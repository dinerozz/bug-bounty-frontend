import MainLayout from "@/components/templates/MainLayout";
import { Card } from "@/components/molecules/Card";
import { Typography } from "antd";

const upHosts = [
  "192.168.30.11",
  "192.168.30.118",
  "192.168.30.116",
  "192.168.30.123",
  "192.168.30.126",
  "192.168.30.125",
  "192.168.20.101",
  "192.168.20.104",
  "192.168.20.112",
  "192.168.20.114",
  "192.168.10.101",
  "192.168.10.102",
  "192.168.10.103",
  "192.168.10.105",
  "192.168.10.107",
  "192.168.10.114",
];

export const Polygon = () => {
  return (
    <MainLayout>
      <Card title="Polygon schema" subtitle="">
        <div className="flex justify-center">
          <img
            src="https://www.anti-malware.ru/files/03-03-2022/7.png"
            alt=""
          />
        </div>
      </Card>
      <Card title="Up hosts" subtitle="Активные хосты">
        <div className="flex justify-between items-center">
          <div>
            {upHosts.map((host, index) => (
              <Typography.Text
                key={index}
                className="block text-transparent-white"
              >
                {host}
              </Typography.Text>
            ))}
          </div>

          <img
            className="max-w-[700px] rounded-xl"
            src="https://media.licdn.com/dms/image/D5612AQGSnqAHgsEYrA/article-cover_image-shrink_720_1280/0/1696144648800?e=2147483647&v=beta&t=x_puM6Je5pCFe4Eu2uM2jfGmJBMRRK02Ko61d97U2h0"
            alt="nmap"
          />
        </div>
      </Card>
    </MainLayout>
  );
};
