import { Button, Form, Input, InputNumber } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useAuth } from "../../../provider";

export const FormEditProfile = ({ data, onFinish }) => {
  const { setLoading } = useAuth();
  const [form] = Form.useForm();
  useEffect(() => {
    setLoading(true);
    form.setFieldsValue({
      name: data.name || "",
      email: data.email || "",
      phoneNumber: data.phoneNumber || "",
      idNumber: data.idNumber || "",
      homeTown: data.homeTown || "",
      dob: moment(data.dob).format("DD/MM/YYYY") || "",
    });
    setLoading(false);
  }, [data]);
  return (
    <Form
      form={form}
      name="edit-profile"
      layout="vertical"
      initialValues={{
        name: data.name || "",
        email: data.email || "",
        phoneNumber: data.phoneNumber || "",
        idNumber: data.idNumber || "",
        homeTown: data.homeTown || "",
        dob: moment(data.dob).format("DD/MM/YYYY") || "",
      }}
      onFinish={onFinish}
      className="flex flex-col justify-start align-center w-full gap-1"
    >
      <p className="text-sm font-medium">Họ tên</p>
      <Form.Item name="name">
        <Input
          disabled
          className="w-full border rounded-lg text-sm mb-1 py-1 px-2"
        />
      </Form.Item>
      <p className="text-sm font-medium">Ngày sinh</p>
      <Form.Item name="dob">
        <Input
          disabled
          className="w-full border rounded-lg text-sm mb-1 py-1 px-2"
        />
      </Form.Item>
      <p className="text-sm font-medium">Số CCCD</p>
      <Form.Item name="idNumber">
        <Input
          disabled
          className="w-full border rounded-lg text-sm mb-1 py-1 px-2"
        />
      </Form.Item>
      <p className="text-sm font-medium">Quê quán</p>
      <Form.Item name="homeTown">
        <Input className="w-full border rounded-lg text-sm mb-1 py-1 px-2" />
      </Form.Item>
      <p className="text-sm font-medium">Số điện thoại</p>
      <Form.Item
        name="phoneNumber"
        required
        rules={[
          {
            required: true,
            pattern: new RegExp(
              /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
            ),
            message: "Số điện thoại không hợp lệ",
          },
        ]}
      >
        <Input className="w-full border rounded-lg text-sm mb-1 py-1 px-2" />
      </Form.Item>
      <p className="text-sm font-medium">Email</p>
      <Form.Item
        name="email"
        required
        rules={[
          {
            required: true,
            type: "email",
            message: "Email không hợp lệ",
          },
        ]}
      >
        <Input className="w-full border rounded-lg text-sm mb-1 py-1 px-2" />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          className="flex justify-center aligin-center items-center gap-2 w-full text-white bg-primary rounded-lg p-2 text-sm font-semibold mt-3"
        >
          Lưu thay đổi
        </Button>
      </Form.Item>
    </Form>
  );
};
