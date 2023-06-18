import { useEffect, useState } from "react";
import { MobileLayout } from "../../layout";
import { request } from "../../service/axios";
import { useAuth } from "../../provider";
import { useRouter } from "next/router";
import { v4 as uuid } from "uuid";

const Card = ({ data }) => {
  const router = useRouter();
  return (
    <div className="flex justify-center align-center items-center w-full bg-bg-base shadow rounded-lg h-28 p-0" onClick={()=>router.push(`/invoice/${data.id}`)}>
      <div className="flex flex-col justify-start align-center w-full p-2 h-fit">
        <p className="text-lg font-bold w-full">Tháng {data.month || ""}/{data.year || ""}</p>
        <p className="text-sm font-medium w-full">Phòng {`[${data.roomId}] ${data.roomName}`}</p>
        <p className="text-sm font-medium w-full">
          Tổng:{" "}
          {data.totalMoney
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") || ""}
        </p>
        <p className="text-sm font-medium w-full">
          Còn nợ:{" "}
          {(data.totalMoney - data.moneyPaid)
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") || 0}
        </p>
      </div>
      {data.statusId == 1 && (
        <div className="flex flex-col justify-center align-center items-center w-[6rem] p-5 bg-success h-full rounded-r-lg uppercase text-white text-center text-sm font-semibold shrink-0">
          ĐÃ THANH TOÁN
        </div>
      )}
      {data.statusId == 0 && (
        <div className="flex flex-col justify-center align-center items-center w-[6rem] p-5 bg-error h-full rounded-r-lg uppercase text-white text-center text-sm font-semibold shrink-0">
          CHƯA THANH TOÁN
        </div>
      )}
    </div>
  );
};

export default function Invoice() {
  const { setLoading } = useAuth();
  const [invoiceList, setInvoiceList] = useState([]);
  const getInvoice = async () => {
    setLoading(true);
    await request("get", `/invoice`)
      .then((res) => {
        console.log(res);
        setInvoiceList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      setLoading(false);
  };
  useEffect(() => {
    getInvoice();
  }, []);
  return (
    <MobileLayout title="Hoá đơn">
      {invoiceList?.length
        ? invoiceList.map((item) => {
            return <Card data={item} key={uuid().slice(0,8)}/>;
          })
        : "Không có thông tin hoá đơn"}
    </MobileLayout>
  );
}
