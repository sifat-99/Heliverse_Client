import axios from "axios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const AddUser = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const NewUser = {
      ...data,
    };
    try {
      const response = await axios.post(
        `http://localhost:4001/addUser`,
        NewUser
      );
      if (response.data.statusCode === 200) {
        Swal.fire({
          icon: "success",
          title: "User added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "User already exists",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
    reset();
  };

  return (
    <>
      <form
        className="py-10 lg:w-3/4 md:mx-4 lg:mx-auto mx-auto border rounded-lg md:px-8 lg:px-20 my-20 text-black bg-blue-400"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl text-center py-4 font-bold underline">
          Add New User
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
              {...register("first_name", { required: true })}
              required
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
              {...register("last_name", { required: true })}
              required
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
              {...register("email", { required: true })}
              required
              className="input input-bordered w-full bg-white text-black p-2 rounded-lg"
            />
          </div>

          {/* Gender */}
          <div className="form-control w-full my-3">
            <label className="label">
              <span className="label-text text-black">Gender</span>
            </label>
            <select
              {...register("gender", { required: true })}
              className="select select-bordered w-full bg-white text-black p-2 rounded-lg"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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
              {...register("avatar", { required: true })}
              required
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
              {...register("domain", { required: true })}
              required
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
            {...register("available", { required: true })}
            className="select select-bordered w-[40%] ml-4 bg-white text-black p-2 rounded-lg"
          >
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn bg-black text-white p-4 w-32 rounded-lg hover:bg-white hover:text-black mt-4"
        >
          Add User
        </button>
      </form>
    </>
  );
};

export default AddUser;
