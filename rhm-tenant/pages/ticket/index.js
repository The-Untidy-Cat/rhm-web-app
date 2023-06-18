import { useEffect, useState } from "react";
import { MobileLayout } from "../../layout";
import { request } from "../../service/axios";
import { useAuth } from "../../provider";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import moment from "moment/moment";
import Link from "next/link";
import { Input } from "antd";

const { TextArea } = Input;

const Card = ({ data }) => {
  const router = useRouter();
  return (
    <div
      className="flex justify-center align-center items-center w-full bg-bg-base shadow rounded-lg h-36 p-0 grow-0 shrink-0"
      onClick={() => {}}
    >
      <div className="flex flex-col justify-start align-center w-full p-2 h-fit ">
        <p className="text-sm font-medium w-full">
          Ngày yêu cầu: <br />
          {moment(data.receiveTime).format("DD/MM/YYYY HH:MM:ss") || ""}
        </p>
        <p className="text-sm font-medium w-full">Mã phiếu: {data.id || ""}</p>
        <p className="text-sm font-medium w-full truncate">Nội dung:</p>
        <TextArea
          className="w-full border-0 p-0 text-sm bg-transparent font-medium"
          autoSize
          disabled
          value={data.description || ""}
        />
      </div>
      {data.statusId == 1 && (
        <div className="flex flex-col justify-center align-center items-center w-[6rem] p-5 bg-success h-full rounded-r-lg uppercase text-white text-center text-sm font-semibold shrink-0">
          HOÀN THÀNH
        </div>
      )}
      {data.statusId == 0 && (
        <div className="flex flex-col justify-center align-center items-center w-[6rem] p-5 bg-error h-full rounded-r-lg uppercase text-white text-center text-sm font-semibold shrink-0">
          CHỜ XỬ LÝ
        </div>
      )}
    </div>
  );
};

export default function Ticket() {
  const { setLoading } = useAuth();
  const [ticketList, setTicketList] = useState([]);
  const getTicket = async () => {
    setLoading(true);
    await request("get", `/ticket`)
      .then((res) => {
        console.log(res);
        setTicketList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  useEffect(() => {
    getTicket();
  }, []);
  return (
    <MobileLayout title="Phiếu hỗ trợ">
      <Link
        className="flex justify-center aligin-center items-center gap-2 w-full text-primary border border-primary rounded-lg p-2 text-sm font-semibold cursor-pointer"
        href="/ticket/new"
      >
        Gửi yêu cầu hỗ trợ mới
      </Link>
      {ticketList?.length
        ? ticketList.map((item) => {
            return <Card data={item} key={uuid().slice(0, 8)} />;
          })
        : "Không có thông tin phiếu hỗ trợ"}
    </MobileLayout>
  );
}
