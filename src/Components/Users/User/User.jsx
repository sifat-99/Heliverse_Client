import axios from "axios";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
const User = () => {
  const userData = useLoaderData();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const newData = {
      ...data,
      _id: userData?._id,
    };
    try {
      axios
        .put(`https://heliverse-server-khaki.vercel.app/updateUser/${userData._id}`, newData)
        .then((res) => {
          console.log(res);
          if (res.data.statusCode === 200) {
            Swal.fire({
              icon: "success",
              title: "User updated successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <form
        className="py-10 lg:w-3/4 md:mx-4 lg:mx-auto mx-auto border rounded-lg md:px-8 lg:px-20 my-20 text-black bg-blue-400"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl text-center py-4 font-bold underline">
          Update User
        </h2>
        <div className="flex gap-6 ">
          {/* First Name */}
          <div className="form-control w-full my-3">
            <label className="label">
              <span className="label-text text-black">First Name</span>
            </label>
            <input
              type="text"
              placeholder="First Name"
              {...register("first_name")}
              defaultValue={userData.first_name}
              className="input input-bordered w-full bg-white text-black p-2 rounded-lg"
            />
          </div>

          {/* Last Name */}
          <div className="form-control w-full my-3">
            <label className="label">
              <span className="label-text text-black">Last Name</span>
            </label>
            <input
              type="text"
              placeholder="Last Name"
              defaultValue={userData.last_name}
              {...register("last_name")}
              className="input input-bordered w-full bg-white text-black p-2 rounded-lg"
            />
          </div>
        </div>
        <div className="flex gap-6">
          {/* Email */}
          <div className="form-control w-full my-3">
            <label className="label">
              <span className="label-text text-black">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              defaultValue={userData.email}
              {...register("email")}
              className="input input-bordered w-full bg-white text-black p-2 rounded-lg"
            />
          </div>

          {/* Gender */}
          <div className="form-control w-full my-3">
            <label className="label">
              <span className="label-text text-black">Gender</span>
            </label>
            <select
              {...register("gender")}
              className="select select-bordered w-full bg-white text-black p-2 rounded-lg"
            >
              <option selected={userData?.gender === "Male"} value="Male">
                Male
              </option>
              <option selected={userData?.gender === "Female"} value="Female">
                Female
              </option>
            </select>
          </div>
        </div>
        <div className="flex gap-6">
          {/* Avatar */}
          <div className="form-control w-full my-3">
            <label className="label">
              <span className="label-text text-black">Avatar</span>
            </label>
            <input
              type="text"
              placeholder="Avatar URL"
              {...register("avatar")}
              defaultValue={userData.avatar}
              className="input input-bordered w-full bg-white text-black p-2 rounded-lg"
            />
          </div>

          {/* Domain */}
          <div className="form-control w-full my-3">
            <label className="label">
              <span className="label-text text-black">Domain</span>
            </label>
            <input
              type="text"
              placeholder="Domain"
              defaultValue={userData.domain}
              {...register("domain")}
              className="input input-bordered w-full bg-white text-black p-2 rounded-lg"
            />
          </div>
        </div>

        {/* Available */}
        <div className="form-control w-full my-3">
          <label className="label">
            <span className="label-text text-black">Available</span>
          </label>
          <select
            {...register("available")}
            className="select select-bordered w-[40%] ml-4 bg-white text-black p-2 rounded-lg"
          >
            <option selected={userData.available == true} value={true}>
              True
            </option>
            <option selected={userData.available == false} value={false}>
              False
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="btn bg-black text-white p-4 w-32 rounded-lg hover:bg-white hover:text-black mt-4"
        >
          Update
        </button>
      </form>
    </>
  );
};

export default User;
