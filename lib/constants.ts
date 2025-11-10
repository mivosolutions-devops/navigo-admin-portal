export const authPagesDataToCheck = [
  {
    page: "new-password",
    redirect: "/auth/sign-in",
    header: "Set new password",
    description: "Enter your new password",
  },
  {
    page: "otp",
    redirect: "/auth/recover-password",
    header: "OTP Verification",
    description:
      "We've sent an OTP code check your email (hugues@gmail.com) and fill it in.",
  },
  {
    page: "recover-password",
    redirect: "/auth/sign-in",
    header: "Recover password",
    description:
      "Opps. It happens to the best of us. Input your email address to fix the issue.",
  },
  {
    page: "recover-successful",
    redirect: "/auth/sign-in",
    header: "Password successfully recovered!",
    description: "Return to login page and use new password",
  },
];

export const adminPagesDataToCheck = [
  {
    page: "",
    title: "Analytics",
    modalContent:
      "The analytics page serves as a comprehensive hub dedicated to the examination and interpretation of data gathered on a daily basis. Its primary responsibility is to distill and present a concise overview of the collected data, offering valuable insights and trends that empower users to make informed decisions.",
  },
  {
    page: "users",
    title: "Users",
    modalContent:
      "The analytics page serves as a comprehensive hub dedicated to the examination and interpretation of data gathered on a daily basis. Its primary responsibility is to distill and present a concise overview of the collected data, offering valuable insights and trends that empower users to make informed decisions.",
  },
  {
    page: "roles",
    title: "Roles",
    modalContent:
      "The analytics page serves as a comprehensive hub dedicated to the examination and interpretation of data gathered on a daily basis. Its primary responsibility is to distill and present a concise overview of the collected data, offering valuable insights and trends that empower users to make informed decisions.",
  },
  {
    page: "permissions",
    title: "Permissions",
    modalContent:
      "The analytics page serves as a comprehensive hub dedicated to the examination and interpretation of data gathered on a daily basis. Its primary responsibility is to distill and present a concise overview of the collected data, offering valuable insights and trends that empower users to make informed decisions.",
  },
  {
    page: "help-center",
    title: "Help center",
    modalContent:
      "The analytics page serves as a comprehensive hub dedicated to the examination and interpretation of data gathered on a daily basis. Its primary responsibility is to distill and present a concise overview of the collected data, offering valuable insights and trends that empower users to make informed decisions.",
  },
  {
    page: "feedbacks",
    title: "Feedbacks",
    modalContent:
      "The analytics page serves as a comprehensive hub dedicated to the examination and interpretation of data gathered on a daily basis. Its primary responsibility is to distill and present a concise overview of the collected data, offering valuable insights and trends that empower users to make informed decisions.",
  },
  {
    page: "search",
    title: "Search",
    modalContent:
      "The analytics page serves as a comprehensive hub dedicated to the examination and interpretation of data gathered on a daily basis. Its primary responsibility is to distill and present a concise overview of the collected data, offering valuable insights and trends that empower users to make informed decisions.",
  },
  {
    page: "notifications",
    title: "Notifications",
    modalContent:
      "The analytics page serves as a comprehensive hub dedicated to the examination and interpretation of data gathered on a daily basis. Its primary responsibility is to distill and present a concise overview of the collected data, offering valuable insights and trends that empower users to make informed decisions.",
  },
  {
    page: "profile",
    title: "Profile",
    modalContent:
      "The analytics page serves as a comprehensive hub dedicated to the examination and interpretation of data gathered on a daily basis. Its primary responsibility is to distill and present a concise overview of the collected data, offering valuable insights and trends that empower users to make informed decisions.",
  },
  {
    page: "*",
    title: "Resource Not Found",
    modalContent:
      "The analytics page serves as a comprehensive hub dedicated to the examination and interpretation of data gathered on a daily basis. Its primary responsibility is to distill and present a concise overview of the collected data, offering valuable insights and trends that empower",
  },
];
