import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Input from "../share/Form/Input";
import Button from "../share/Button";

export default function NewsLetter() {
  const formSchema = Yup.object().shape({
    email: Yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
      message: "Email is incorrect",
    }),
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(formSchema),
  });
  function addToNewsLetter() {}
  return (
    <div>
      <form className="w-full " onSubmit={handleSubmit(addToNewsLetter)}>
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-[26px] font-black text-center py-3">
            <span>Stay</span> Updated
          </h2>
          <Input
            className="bg-transparent border-neutral-light placeholder-neutral-light text-neutral-light border border-white-bg-30"
            register={register}
            errors={errors}
            name="email"
            placeholder="enter your email"
            type="email"
            required
          />
          <Button
            shape="primary"
            className="!text-primary text-xl"
            type="submit"
            label="Subscribe"
          />
        </div>
      </form>
    </div>
  );
}
