import React from "react";
import { DeleteAccount, Logout } from "../components/account";

export default function AccountAdvance() {
  return (
    <div className="flex flex-col gap-4">
      <Logout />
      <DeleteAccount />
    </div>
  );
}
