import { ViewDetailLayout } from "../../layout";
import { request } from "../../service/axios";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useAuth } from "../../provider";
import { Button } from "antd";
import { v4 as uuid } from "uuid";

const TenantCard = ({ data }) => {
  return (
    <div className="flex justify-center align-center items-center w-full bg-bg-base shadow rounded-lg h-fit p-0">
      <div className="flex flex-col justify-start align-center w-full p-2 h-fit">
        <p className="text-lg font-semibold w-full">{data.name || ""}</p>
        <p className="text-sm font-medium w-full">
          Mã khách thuê: {data._id || ""}
        </p>
        <p className="text-sm font-medium w-full">
          Ngày sinh: {moment(data.dob).format("DD/MM/YYYY") || ""}
        </p>
        <p className="text-sm font-medium w-full">
          Số điện thoại: {data.phoneNumber || ""}
        </p>
        <p className="text-sm font-medium w-full">Email: {data.email || ""}</p>
        <p className="text-sm font-medium w-full">
          Số CCCD: {data.idNumber || ""}
        </p>
        <p className="text-sm font-medium w-full">
          Quê quán: {data.homeTown || ""}
        </p>
      </div>
    </div>
  );
};

const ContractCard = ({ data }) => {
  return (
    <div className="flex justify-center align-center items-center w-full bg-bg-base shadow rounded-lg h-fit p-0">
      <div className="flex flex-col justify-start align-center w-full p-2 h-fit">
        <p className="text-sm font-semibold w-full">
          Mã hợp đồng: {data.id || ""}
        </p>
        <p className="text-sm font-medium w-full">
          Ngày bắt đầu: {moment(data.startDate).format("DD/MM/YYYY") || ""}
        </p>
        <p className="text-sm font-medium w-full">
          Ngày kết thúc: {moment(data.endDate).format("DD/MM/YYYY") || ""}
        </p>
        <p className="text-sm font-medium w-full">
          Giá thuê hàng tháng:{" "}
          {data.pricePerPeriod
            .toFixed(0)
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") || ""}
        </p>
        <p className="text-sm font-medium w-full">
          Tiền cọc:{" "}
          {data.deposit.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") ||
            ""}
        </p>
        <p className="text-sm font-medium w-full">
          Người đại diện: <br /> [{data.representativeId || ""}]
          {data.representativeName || ""}
        </p>
        <p className="text-sm font-medium w-full">
          Phòng: <br /> [{data.roomId || ""}]{data.roomName || ""}
        </p>
        <p className="text-sm font-medium w-full">
          Trạng thái: {data.statusName || ""}
        </p>
      </div>
    </div>
  );
};

export default function Tenant() {
  const { setLoading, logout } = useAuth();
  const [tenantInfo, setTenantInfo] = useState({});
  const [contractList, setContractList] = useState([]);
  const getTenantInfo = async () => {
    setLoading(true);
    await request("get", `/user/info`)
      .then((res) => {
        console.log(res);
        setTenantInfo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  const getContractList = async () => {
    setLoading(true);
    await request("get", `/contract`)
      .then((res) => {
        console.log(res);
        setContractList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };
  useEffect(() => {
    getTenantInfo();
    getContractList();
  }, []);
  return (
    <ViewDetailLayout title="Thông tin cá nhân" navbar={false}>
      <TenantCard data={tenantInfo} />
      <Button
        className="w-full text-error border border-error rounded-lg font-semibold text-sm p-2"
        onClick={() => logout()}
      >
        Đăng xuất
      </Button>
      <div className="flex flex-col justify-start align-center w-full h-fit mt-2">
        <p className="text-lg font-semibold w-full text-center text-primary mb-3">
          Danh sách hợp đồng
        </p>
        {
            contractList.map((item) => (
                <ContractCard data={item} key={uuid().slice(0,8)} />
            ))
        }
      </div>
    </ViewDetailLayout>
  );
}
