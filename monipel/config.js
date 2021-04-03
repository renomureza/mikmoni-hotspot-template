const config = {
  loginMethod: {
    member: true,
    voucher: true,
    qrCode: true,
    default: "member", // member, voucher, qrCode
  },
  qrCodeScannerURL: "https://example.com/qrcode-scanner",
  expiredChecker: {
    active: false,
    URL: "https://example.com/v1/expired",
    token: "69ee773d4xxxxxxxx:00628cdxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  },
};

export default config;
