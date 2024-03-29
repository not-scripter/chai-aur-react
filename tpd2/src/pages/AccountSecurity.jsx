import React from "react";
import { ResetPassword, UpdateContacts } from "../components/account";

export default function AccountSecurity() {
  return (
    <div className="flex flex-col gap-4">
      <UpdateContacts />
      <ResetPassword />
    </div>
  );
}
