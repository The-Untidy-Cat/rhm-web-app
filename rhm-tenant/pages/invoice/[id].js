import { useEffect, useState } from "react";
import { ViewDetailLayout } from "../../layout";
import { request } from "../../service/axios";
import { useRouter } from "next/router";
import { useAuth } from "../../provider";
import { v4 as uuid } from "uuid";

const Card = ({ data }) => {
  return (
    <div className="flex justify-center align-center items-center w-full bg-bg-base shadow rounded-lg h-28 p-0">
      <div className="flex flex-col justify-start align-center w-[70rem] p-2 h-fit">
        <p className="text-sm font-medium w-full">
          Loại hoá đơn: {data.typeName || ""}
        </p>
        <p className="text-sm font-medium w-full">
          Số lượng:{" "}
          {data.quantity.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") +
            " " +
            data.unit || 0}
        </p>
        <p className="text-sm font-medium">
          Đơn giá:{" "}
          {data.unitPrice
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") || 0}
        </p>
        <p className="text-lg font-bold w-full">
          Thành tiền:{" "}
          {data.sumMoney.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") ||
            0}
        </p>
      </div>
    </div>
  );
};

export default function InvoiceDetail() {
  const { setLoading } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [invoice, setInvoice] = useState({});
  const getInvoiceDetail = async () => {
    setLoading(true);
    await request("get", `/invoice/${id}`)
      .then((res) => {
        console.log(res);
        setInvoice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  useEffect(() => {
    getInvoiceDetail();
  }, [id]);
  return (
    <ViewDetailLayout title="Chi tiết hoá đơn">
      <div className="flex flex-col justify-start align-center w-full mb-2">
        <p className="text-lg text-primary font-bold">
          {`[${invoice?.overview?.roomId}] ${invoice?.overview?.roomName}`}
        </p>
        <p className="font-semibold">
          {`Tháng ${invoice?.overview?.month || ""}/${
            invoice?.overview?.year || ""
          }`}
        </p>
        <p className="text-sm">{`Tình trạng: ${
          invoice?.overview?.statusName || ""
        }`}</p>
        <p className="text-sm">{`Tổng tiền: ${
          invoice?.overview?.totalMoney
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") || ""
        }`}</p>
        <p className="text-sm">{`Còn nợ: ${
          (invoice?.overview?.totalMoney - invoice?.overview?.moneyPaid)
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") || ""
        }`}</p>
      </div>
      {invoice?.detail?.length
        ? invoice.detail.map((item) => {
            return <Card data={item} key={uuid().slice(0, 8)} />;
          })
        : "Không có thông tin hoá đơn"}
    </ViewDetailLayout>
  );
}
