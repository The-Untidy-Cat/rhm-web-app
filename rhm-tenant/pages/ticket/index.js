import { useEffect, useState } from "react";
import { MobileLayout } from "../../layout";
import { request } from "../../service/axios";
import { useAuth } from "../../provider";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";
import moment from "moment/moment";
import Link from "next/link";

const Card = ({ data }) => {
  const router = useRouter();
  return (
    <div
      className="flex justify-center align-center items-center w-full bg-bg-base shadow rounded-lg h-32 p-0"
      onClick={() => {}}
    >
      <div className="flex flex-col justify-start align-center w-[70rem] p-2 h-fit">
        <p className="text-sm font-medium w-full">
          Ngày yêu cầu: <br/>{moment(data.receiveTime).format("DD/MM/YYYY HH:MM:ss") || ""}
        </p>
        <p className="text-sm font-medium w-full">Mã phiếu: {data.id || ""}</p>
        <p className="text-sm font-medium w-full">Mã phòng: {data.roomId || ""}</p>
        <p className="text-sm font-medium w-full">Nội dung: {data.description || ""}</p>
      </div>
      {data.statusId == 1 && (
        <div className="flex flex-col justify-center align-center items-center w-full p-5 bg-success h-full rounded-r-lg uppercase text-white text-center text-sm font-semibold">
          HOÀN THÀNH
        </div>
      )}
      {data.statusId == 0 && (
        <div className="flex flex-col justify-center align-center items-center w-full p-5 bg-error h-full rounded-r-lg uppercase text-white text-center text-sm font-semibold">
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
      <Link className="flex justify-center aligin-center items-center gap-2 w-full text-primary border border-primary rounded-lg p-2 text-sm font-semibold cursor-pointer" href="/ticket/new">
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
