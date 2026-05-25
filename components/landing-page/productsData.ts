// components/landing-page/productsData.ts

export const productsData = {
  "Top Up Game": {
    products: ["Mobile Legends", "Free Fire", "PUBG Mobile", "Valorant"],
    items: {
      "Mobile Legends": [
        { label: "11 Diamonds", price: "Rp 3.150" },
        { label: "86 Diamonds", price: "Rp 20.000" },
        { label: "172 Diamonds", price: "Rp 40.000" },
      ],
      "Free Fire": [
        { label: "50 Diamonds", price: "Rp 8.000" },
        { label: "70 Diamonds", price: "Rp 10.000" },
        { label: "140 Diamonds", price: "Rp 19.000" },
      ],
      "PUBG Mobile": [
        { label: "32 Unknown Cash", price: "Rp 7.000" },
        { label: "63 Unknown Cash", price: "Rp 14.000" },
      ],
      Valorant: [
        { label: "475 Points", price: "Rp 50.000" },
        { label: "1000 Points", price: "Rp 100.000" },
      ],
    },
    inputType: "text",
    inputPlaceholder: "Masukkan User ID",
  },
  Pulsa: {
    products: ["Telkomsel", "Indosat", "XL Axiata", "Axis", "Smartfren"],
    items: {
      Telkomsel: [
        { label: "Pulsa 5 Ribu", price: "Rp 6.500" },
        { label: "Pulsa 10 Ribu", price: "Rp 11.400" },
        { label: "Pulsa 20 Ribu", price: "Rp 21.200" },
      ],
      Indosat: [
        { label: "Pulsa 5 Ribu", price: "Rp 6.300" },
        { label: "Pulsa 10 Ribu", price: "Rp 11.200" },
        { label: "Pulsa 20 Ribu", price: "Rp 20.900" },
      ],
      "XL Axiata": [
        { label: "Pulsa 5 Ribu", price: "Rp 6.400" },
        { label: "Pulsa 10 Ribu", price: "Rp 11.300" },
      ],
      Axis: [
        { label: "Pulsa 5 Ribu", price: "Rp 6.200" },
        { label: "Pulsa 10 Ribu", price: "Rp 11.100" },
      ],
      Smartfren: [
        { label: "Pulsa 5 Ribu", price: "Rp 5.900" },
        { label: "Pulsa 10 Ribu", price: "Rp 10.900" },
      ],
    },
    inputType: "tel",
    inputPlaceholder: "Masukkan No HP",
  },
  "Paket Data": {
    products: ["Telkomsel Data", "Indosat Data", "XL Data"],
    items: {
      "Telkomsel Data": [
        { label: "Internet 2GB / 3 Hari", price: "Rp 15.000" },
        { label: "Internet 5GB / 7 Hari", price: "Rp 32.000" },
        { label: "Internet 10GB / 30 Hari", price: "Rp 65.000" },
      ],
      "Indosat Data": [
        { label: "Freedom 3GB / 30 Hari", price: "Rp 22.000" },
        { label: "Freedom 10GB / 30 Hari", price: "Rp 45.000" },
      ],
      "XL Data": [
        { label: "Xtra Combo 5GB", price: "Rp 29.000" },
        { label: "Xtra Combo 10GB", price: "Rp 49.000" },
      ],
    },
    inputType: "tel",
    inputPlaceholder: "Masukkan No HP",
  },
  "E-Wallet": {
    products: ["Dana", "OVO", "GoPay", "ShopeePay"],
    items: {
      Dana: [
        { label: "Top Up 10.000", price: "Rp 11.500" },
        { label: "Top Up 20.000", price: "Rp 21.500" },
        { label: "Top Up 50.000", price: "Rp 51.500" },
      ],
      OVO: [
        { label: "Top Up 10.000", price: "Rp 11.500" },
        { label: "Top Up 20.000", price: "Rp 21.500" },
      ],
      GoPay: [
        { label: "Top Up 10.000", price: "Rp 11.200" },
        { label: "Top Up 50.000", price: "Rp 51.200" },
      ],
      ShopeePay: [
        { label: "Top Up 10.000", price: "Rp 11.300" },
        { label: "Top Up 50.000", price: "Rp 51.300" },
      ],
    },
    inputType: "tel",
    inputPlaceholder: "Masukkan No Akun / HP",
  },
  Premium: {
    products: ["YouTube", "Netflix", "Spotify"],
    items: {
      "YouTube": [
        { label: "Premium 30 Hari", price: "Rp 12.000" },
        { label: "Premium 90 Hari", price: "Rp 32.000" },
      ],
      Netflix: [
        { label: "Sharing 1 Bulan", price: "Rp 30.000" },
        { label: "Private 1 Bulan", price: "Rp 120.000" },
      ],
      Spotify: [
        { label: "Individual 1 Bulan", price: "Rp 15.000" },
        { label: "Family 1 Bulan", price: "Rp 35.000" },
      ],
    },
    inputType: "email",
    inputPlaceholder: "Masukkan Email Akun",
  },
};
