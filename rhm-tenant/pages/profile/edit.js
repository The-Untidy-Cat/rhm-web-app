import { useEffect, useState } from "react";
import { FormEditProfile } from "../../components/Form/Profile";
import { ViewDetailLayout } from "../../layout";
import { request } from "../../service/axios";
import { useRouter } from "next/router";
import { useAuth } from "../../provider";
import { toast } from "react-hot-toast";

export default function EditProfile (){
    const router = useRouter();
    const { setLoading } = useAuth();
    const [profile, setProfile] = useState({});
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const res = await request("post", "/user/update", {
                homeTown: values.homeTown || null,
                phoneNumber: values.phoneNumber || null,
                email: values.email || null
            });
            if (res.code == 200){
                toast.success("Cập nhật thành công");
                router.push("/profile");
            }
        } catch(e) {
            console.log(e);
            toast.error("Không thể cập nhật thông tin");
        }
        setLoading(false);
    }
    const getProfile = async () => {
        setLoading(true);
        try {
            const res = await request("get", "/user/info");
            if (res.code == 200)
                setProfile(res.data);
        } catch(e) {
            console.log(e);
            router.push("/profile")
        }
        setLoading(false);
    }
    useEffect(()=> {
        getProfile();
        console.log(profile);
    },[])
    return (
        <ViewDetailLayout title="Cập nhật thông tin" navbar={false}>
            <FormEditProfile data={profile} onFinish={onFinish}/>
        </ViewDetailLayout>
    ) 
}