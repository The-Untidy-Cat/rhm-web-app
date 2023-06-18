import { useEffect, useState } from "react";
import { ViewDetailLayout } from "../../layout";
import { request } from "../../service/axios";
import { useAuth } from "../../provider";
import { Button, Form } from "antd";
import { Input } from "antd";
import { BsFillSendPlusFill } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const { TextArea } = Input;

export default function NewTicket() {
  const router = useRouter();
  const { setLoading } = useAuth();
  const handleSubmit = async (value) => {
    setLoading(true);
    try {
      await request("post", "/ticket/new", { description: value.description });
      setLoading(false);
      toast.success("Gửi yêu cầu thành công");
      router.push("/ticket");
    } catch (err) {
      setLoading(false);
      toast.error("Gửi yêu cầu thất bại! " + err?.data?.message);
      console.log(err);
    }
  };
  return (
    <ViewDetailLayout title="Yêu cầu hỗ trợ" backTo="/ticket">
      <Form
        name="basic"
        className="flex flex-col w-full gap-1"
        layout="vertical"
        onFinish={handleSubmit}
      >
        <p className="text-sm font-medium w-full">Nội dung hỗ trợ</p>
        <Form.Item
          name="description"
          rules={[
            { required: true, message: "Bắt buộc!" },
            { max: 150, message: "Tối đa 150 kí tự!" },
          ]}
        >
          <TextArea
            className="w-full border rounded-lg p-2 text-sm"
            required
            autoSize
            maxLength={150}
            placeholder="Tối đa 48 kí tự"
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            className="flex justify-center aligin-center items-center gap-2 w-full text-white bg-primary rounded-lg p-2 text-sm font-semibold"
          >
            <BsFillSendPlusFill />
            Gửi yêu cầu
          </Button>
        </Form.Item>
      </Form>
    </ViewDetailLayout>
  );
}
