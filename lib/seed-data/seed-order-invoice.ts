// import { OrderInvoice } from "../data-model/schema-definitions";
// export const orderInvoiceSeed: OrderInvoice[] = [
//   {
//     "order_invoice_id": "3c0b272e-21dd-4477-95a8-7db7c56e1eb9",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "134f9872-aa74-4720-a446-05a2381c6d89",
//     "date_created": "2024-11-06T15:49:27.138Z",
//     "status": "PAID",
//     "amount": 130467.45
//   },
//   {
//     "order_invoice_id": "ef0b884b-db79-4541-a42c-595473e46f38",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "d4ebff63-9083-47a0-a13a-e5f313d2deff",
//     "date_created": "2024-11-07T07:21:18.732Z",
//     "status": "PENDING",
//     "amount": 716.97
//   },
//   {
//     "order_invoice_id": "ee2141ab-9e75-4786-95cc-349a73a4fbd3",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "69cc0ffa-f090-4027-955d-c101e720698d",
//     "date_created": "2024-11-04T09:11:56.629Z",
//     "status": "PAID",
//     "amount": 578903.67
//   },
//   {
//     "order_invoice_id": "9b6338e4-4147-4284-9301-99f4bf39f204",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "00f16aea-7906-42bb-890f-eb4f52755c0e",
//     "date_created": "2024-07-01T18:03:54.728Z",
//     "status": "PENDING",
//     "amount": 46756.86
//   },
//   {
//     "order_invoice_id": "83faa9b1-2da0-458e-a61a-6098c207ebe3",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "b2fea2b2-d782-426a-99ce-b0840187553a",
//     "date_created": "2024-10-25T02:45:23.757Z",
//     "status": "PAID",
//     "amount": 266741.77
//   },
//   {
//     "order_invoice_id": "4abea8ca-c2a8-44e6-a78d-6bd3c8422b2a",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "c1d385ef-cbe4-4aca-9ba7-b513d6942eb5",
//     "date_created": "2024-10-27T10:39:32.607Z",
//     "status": "PENDING",
//     "amount": 127160.28
//   },
//   {
//     "order_invoice_id": "7213425f-61a0-4d1f-938f-25d6f0463da8",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "4fae58bd-2fce-4994-a790-9f8e9e73c8f3",
//     "date_created": "2024-11-09T09:35:26.746Z",
//     "status": "PENDING",
//     "amount": 661146.89
//   },
//   {
//     "order_invoice_id": "ec9b7116-6616-4baf-8519-ebfec5a06efd",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "bde30968-7047-43ac-8c09-08010da5dc52",
//     "date_created": "2024-11-08T03:56:40.515Z",
//     "status": "PENDING",
//     "amount": 283594.08
//   },
//   {
//     "order_invoice_id": "26ae9a21-ae89-41f6-b876-c4aedd508424",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "757f7499-78a3-40d3-8fbf-23b2ab3c4f00",
//     "date_created": "2024-11-11T13:31:28.401Z",
//     "status": "PENDING",
//     "amount": 462278.13
//   },
//   {
//     "order_invoice_id": "f73d5092-020a-439a-8433-f422cca0c735",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "7db34fb8-5de0-4b80-bb07-1078ec22c68b",
//     "date_created": "2024-11-11T06:39:56.964Z",
//     "status": "PAID",
//     "amount": 262736.23
//   },
//   {
//     "order_invoice_id": "6e7a0134-0aa6-465c-bb95-a8577006bdc4",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "55aa310d-79ef-42fd-8abf-ace91340562d",
//     "date_created": "2024-10-16T03:05:27.853Z",
//     "status": "PENDING",
//     "amount": 555.95
//   },
//   {
//     "order_invoice_id": "a4a9d21e-5888-47dd-8f51-637e505b86fc",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "c16fc65a-77ca-43c5-8b2b-e76a74ef135d",
//     "date_created": "2024-10-06T13:44:52.243Z",
//     "status": "PENDING",
//     "amount": 579.47
//   },
//   {
//     "order_invoice_id": "3ae306a1-9f9a-48ba-8782-1eaf52f87409",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "2f9ae55a-fe70-429b-8209-3b64854a7e35",
//     "date_created": "2024-11-09T00:43:05.477Z",
//     "status": "PENDING",
//     "amount": 675.86
//   },
//   {
//     "order_invoice_id": "4426354d-4a8f-4a68-bc07-1c482379ce9f",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "9f216672-3f76-4689-ad08-0e09ca2b00d7",
//     "date_created": "2024-11-04T02:12:52.893Z",
//     "status": "PENDING",
//     "amount": 70477.8
//   },
//   {
//     "order_invoice_id": "87286197-95a2-465e-9d3b-771aa2124c4a",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "dcf3336b-c64a-4095-a0c2-0745d6a93b15",
//     "date_created": "2024-10-19T08:43:10.372Z",
//     "status": "PAID",
//     "amount": 394.26
//   },
//   {
//     "order_invoice_id": "30990c4f-ad9a-46b1-8a7f-f29689c2cf0f",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "8bb76797-a875-42ab-bade-d145be0a24d3",
//     "date_created": "2024-11-10T18:53:11.154Z",
//     "status": "PENDING",
//     "amount": 59924.33
//   },
//   {
//     "order_invoice_id": "3f7148c7-edc1-4008-a51a-8212acf079da",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "0d1fa66d-6ef2-4bba-96b0-7eccd301fd32",
//     "date_created": "2024-10-14T08:56:32.105Z",
//     "status": "PAID",
//     "amount": 1096.69
//   },
//   {
//     "order_invoice_id": "ee89b59c-495d-49f3-bc04-18a71f69fedc",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "b4571fc1-15e7-4369-bcae-5aa4d674fa7b",
//     "date_created": "2024-11-08T18:51:34.599Z",
//     "status": "PAID",
//     "amount": 901.22
//   },
//   {
//     "order_invoice_id": "f0756643-7752-4acb-8a40-802ee63417f1",
//     "user_id": "c929e811-06ea-45db-bb7d-576af5baf7dd",
//     "order_id": "5bb60d0d-e4ee-4036-9cd8-2a3a92b9b676",
//     "date_created": "2024-11-10T11:31:50.810Z",
//     "status": "PENDING",
//     "amount": 555.93
//   },
//   {
//     "order_invoice_id": "40550c2e-feb8-4e68-bb98-be272b0f0495",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "b7aa3df8-afc3-4505-a792-a5bc4c9664cd",
//     "date_created": "2024-11-09T21:28:49.837Z",
//     "status": "PENDING",
//     "amount": 301.99
//   },
//   {
//     "order_invoice_id": "8d83d133-947a-4802-b5d4-b9c857289e2e",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "1ab26122-e3b1-4391-b120-1eba2a803159",
//     "date_created": "2024-11-03T09:16:23.024Z",
//     "status": "PAID",
//     "amount": 569112.18
//   },
//   {
//     "order_invoice_id": "f71604ff-c84f-4cb9-8061-28859c865d78",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "a0af2e0c-f1b8-4778-be58-14c07695f0da",
//     "date_created": "2024-11-07T11:50:07.818Z",
//     "status": "PENDING",
//     "amount": 255367.59
//   },
//   {
//     "order_invoice_id": "7a225ebe-51dd-4b10-b64a-6e1b5fccbed1",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "a7cb3173-ea9a-4e13-bf43-dfd814478b5b",
//     "date_created": "2024-11-11T11:26:51.684Z",
//     "status": "PENDING",
//     "amount": 908097.78
//   },
//   {
//     "order_invoice_id": "bc997a01-af2e-46d6-9fd2-9f0f3680adb7",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "0cbc1268-f166-4425-bb15-669aa6d5c635",
//     "date_created": "2024-11-06T17:39:21.720Z",
//     "status": "PAID",
//     "amount": 489.34
//   },
//   {
//     "order_invoice_id": "1d2597e1-1da7-4239-946d-7c688d361b16",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "4d99f51a-df4c-4bd9-9051-24849901a87b",
//     "date_created": "2024-10-25T08:25:14.819Z",
//     "status": "PENDING",
//     "amount": 916.61
//   },
//   {
//     "order_invoice_id": "b59f1b9b-fe5e-4bdf-ba08-465aec727d86",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "eff9c1cb-6749-4ce3-9df9-18c007204cbd",
//     "date_created": "2024-10-27T22:57:35.112Z",
//     "status": "PAID",
//     "amount": 684036.62
//   },
//   {
//     "order_invoice_id": "348dcc17-840f-4437-beac-0db0a15f235d",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "4f481ad5-1389-493e-96e3-55d5fcfcce92",
//     "date_created": "2024-10-26T07:07:00.373Z",
//     "status": "PENDING",
//     "amount": 888934.91
//   },
//   {
//     "order_invoice_id": "e364f797-c49a-4db3-832a-e218de1da2da",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "b6fcf2ff-e55a-4000-9ca6-a51ca6e4bee1",
//     "date_created": "2024-10-30T09:28:08.421Z",
//     "status": "PENDING",
//     "amount": 211304.64
//   },
//   {
//     "order_invoice_id": "c4e6adb0-59f6-4a00-90ba-48d9468be8cb",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "76d3a185-b9dd-439f-8ca1-c8133c692021",
//     "date_created": "2024-10-15T15:07:06.833Z",
//     "status": "PAID",
//     "amount": 361095.32
//   },
//   {
//     "order_invoice_id": "ffd02d2e-4a50-4666-a3d6-38e41891191f",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "473a311f-7e2f-45b5-bd70-0a2b592a3407",
//     "date_created": "2024-10-23T00:46:31.681Z",
//     "status": "PAID",
//     "amount": 37422.69
//   },
//   {
//     "order_invoice_id": "333c1245-bba8-4c4c-b2e6-40c3cbf8c609",
//     "user_id": "7f0c5617-94fd-4edb-bab9-eeb68ceebf2f",
//     "order_id": "f8220cf8-ac1a-444b-b465-84957274ca63",
//     "date_created": "2024-10-20T11:04:02.883Z",
//     "status": "PAID",
//     "amount": 275111.36
//   },
//   {
//     "order_invoice_id": "34987661-ae5f-4c29-a8ac-ff13cbb4ba8e",
//     "user_id": "aaf39235-6b39-418f-acf6-ae8989f52942",
//     "order_id": "7cf08ea8-4a0d-4239-b047-62ec2e710dae",
//     "date_created": "2024-11-03T08:13:09.528Z",
//     "status": "PENDING",
//     "amount": 1098.75
//   },
//   {
//     "order_invoice_id": "2b150840-75af-4452-aa6d-f5f73e0d279b",
//     "user_id": "aaf39235-6b39-418f-acf6-ae8989f52942",
//     "order_id": "71b8e45b-beb1-4284-a07c-4719d9457a38",
//     "date_created": "2024-11-09T02:22:49.751Z",
//     "status": "PENDING",
//     "amount": 190.99
//   },
//   {
//     "order_invoice_id": "1625c34f-f9d3-4570-a530-095f80322012",
//     "user_id": "aaf39235-6b39-418f-acf6-ae8989f52942",
//     "order_id": "3de69d8f-8db2-47b0-b876-a6a95e426db4",
//     "date_created": "2024-11-11T14:11:39.860Z",
//     "status": "PENDING",
//     "amount": 473.3
//   },
//   {
//     "order_invoice_id": "1bffefab-1ec0-45c2-ac89-33e35003fe4e",
//     "user_id": "aaf39235-6b39-418f-acf6-ae8989f52942",
//     "order_id": "7f39ac4e-4f44-4e04-9191-7690c2d7db34",
//     "date_created": "2024-11-01T02:48:47.810Z",
//     "status": "PENDING",
//     "amount": 399950.11
//   },
//   {
//     "order_invoice_id": "dce649a5-e7cf-4332-9be3-8ecaef1d1e81",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "e8ad3773-29cc-4911-a2b8-a8e1f72f3f3c",
//     "date_created": "2024-11-01T02:20:09.041Z",
//     "status": "PENDING",
//     "amount": 162.71
//   },
//   {
//     "order_invoice_id": "31f377b9-6dd0-4ae2-90dd-ec946f64b23b",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "de7462c4-f7e9-4346-a96f-8983245c049d",
//     "date_created": "2024-11-02T00:53:39.543Z",
//     "status": "PENDING",
//     "amount": 1119.18
//   },
//   {
//     "order_invoice_id": "0ee92c46-e4af-426a-9e30-ed91cabe9747",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "f723cc7f-59ea-4241-b62a-478bfd4d0bc3",
//     "date_created": "2024-11-09T08:57:09.062Z",
//     "status": "PENDING",
//     "amount": 1040.46
//   },
//   {
//     "order_invoice_id": "20b5c2c9-cd02-47b5-b1ea-b5b05835014b",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "f6a04e26-786d-40c4-a305-5f3949745ce9",
//     "date_created": "2024-11-08T23:31:07.764Z",
//     "status": "PAID",
//     "amount": 1051.4
//   },
//   {
//     "order_invoice_id": "6c71f142-7f08-460a-9791-8da75abc187a",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "88e743c7-7be0-4839-b071-a6a6f483bc8c",
//     "date_created": "2024-11-07T17:21:42.905Z",
//     "status": "PENDING",
//     "amount": 864558.02
//   },
//   {
//     "order_invoice_id": "bb5806e2-76a2-462a-aacb-443fe7d55022",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "8238dc30-8691-4afc-8fe4-67452896b682",
//     "date_created": "2024-11-11T08:12:32.024Z",
//     "status": "PAID",
//     "amount": 216.89
//   },
//   {
//     "order_invoice_id": "4ddde6ba-a522-450a-b0f1-181af692ad8a",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "80ca6396-e5e9-4fb4-81c9-75866929dffe",
//     "date_created": "2024-11-10T22:17:27.989Z",
//     "status": "PENDING",
//     "amount": 838655.24
//   },
//   {
//     "order_invoice_id": "a8f044b8-70a2-4866-8873-dc8be45692aa",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "115772ab-d749-4d71-89f6-0391cab8163a",
//     "date_created": "2024-11-05T22:14:27.449Z",
//     "status": "PENDING",
//     "amount": 358.76
//   },
//   {
//     "order_invoice_id": "b0ef600d-f151-446f-83e7-c509bff205f5",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "129ee1f0-c4c2-4f7d-bf44-ce940cd1f343",
//     "date_created": "2024-11-09T12:53:02.421Z",
//     "status": "PENDING",
//     "amount": 342.25
//   },
//   {
//     "order_invoice_id": "862f68b3-c4e8-42cf-ada9-002d66aaf633",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "00b0541e-98f3-40eb-b945-90082af27abb",
//     "date_created": "2024-10-06T00:03:03.651Z",
//     "status": "PENDING",
//     "amount": 399293.27
//   },
//   {
//     "order_invoice_id": "8ab3919f-9a67-48d2-88ab-58c9fc650fd0",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "b1d632df-5f59-4aa9-84ed-197a5a1bae09",
//     "date_created": "2024-11-11T13:20:30.948Z",
//     "status": "PAID",
//     "amount": 648.2
//   },
//   {
//     "order_invoice_id": "989d8c3a-dceb-4100-bc30-b7d239fbbc74",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "edebe917-691a-4f7b-a8dd-4cd314da4ec9",
//     "date_created": "2024-10-28T05:01:05.372Z",
//     "status": "PAID",
//     "amount": 311743.54
//   },
//   {
//     "order_invoice_id": "18399609-7ca7-41f7-b936-3fed06a28bd7",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "7c5afef9-4ed9-4221-90bf-60252ff9e4f6",
//     "date_created": "2024-11-04T03:22:02.207Z",
//     "status": "PENDING",
//     "amount": 866029.65
//   },
//   {
//     "order_invoice_id": "8ec07bbe-a516-49a7-981f-ed718b7fbdc3",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "57b00d16-de0a-401e-8e25-86f9eb60c195",
//     "date_created": "2024-11-03T12:12:16.449Z",
//     "status": "PAID",
//     "amount": 470239.32
//   },
//   {
//     "order_invoice_id": "ba576df5-240d-482e-bc04-54bb26d431ff",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "12b043d3-a146-47c2-8d9d-5f3eb00daeb8",
//     "date_created": "2024-10-27T06:12:09.669Z",
//     "status": "PAID",
//     "amount": 606.91
//   },
//   {
//     "order_invoice_id": "c752d0bb-7f94-4654-b5ab-31222aa578f5",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "2fbaf3cc-241c-4b7f-b8c9-54526c72efe9",
//     "date_created": "2024-11-10T03:01:12.194Z",
//     "status": "PAID",
//     "amount": 915.99
//   },
//   {
//     "order_invoice_id": "510202f0-c5a9-458b-a776-3eceea334137",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "8019388e-c30e-4996-9cb2-99fd11263029",
//     "date_created": "2024-11-05T08:30:33.435Z",
//     "status": "PAID",
//     "amount": 704.09
//   },
//   {
//     "order_invoice_id": "99b33f61-8a84-4855-b898-e23a716a19ba",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "0258c0b9-993a-4f0e-b07a-187cc0cfc95f",
//     "date_created": "2024-11-10T09:06:42.692Z",
//     "status": "PENDING",
//     "amount": 355.54
//   },
//   {
//     "order_invoice_id": "5a609458-84ff-4164-bee5-ecf0edf6029c",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "cee960b6-8120-4b13-b47c-761e38aa34e2",
//     "date_created": "2024-09-22T01:28:25.127Z",
//     "status": "PENDING",
//     "amount": 644213.95
//   },
//   {
//     "order_invoice_id": "6eca778f-2b7d-40d5-92a3-c9ae277c6f08",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "85ec2057-d9cf-4162-b2eb-c299a4c5e6ca",
//     "date_created": "2024-11-02T15:47:42.708Z",
//     "status": "PENDING",
//     "amount": 393209.47
//   },
//   {
//     "order_invoice_id": "7aad960e-937a-4fb3-b4b0-c715428c84cf",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "1061330c-66b9-458e-9823-84bace94eb8f",
//     "date_created": "2024-11-07T08:59:25.904Z",
//     "status": "PENDING",
//     "amount": 755809.22
//   },
//   {
//     "order_invoice_id": "fbe9e365-096c-451c-b931-491af19e0de8",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "b1acc15f-71da-48a4-90cd-9c3b72966fff",
//     "date_created": "2024-11-10T08:36:15.231Z",
//     "status": "PAID",
//     "amount": 865743.75
//   },
//   {
//     "order_invoice_id": "f0ac29d6-5a47-48d0-aa16-13a50ce45eef",
//     "user_id": "f55c8c66-c26e-4dfd-8157-62042dfa21ee",
//     "order_id": "d49f0dc4-405e-443c-8094-bad80906352e",
//     "date_created": "2024-11-02T01:48:08.853Z",
//     "status": "PAID",
//     "amount": 348338.49
//   },
//   {
//     "order_invoice_id": "010b026a-9d97-4a15-938c-52fce155d2a4",
//     "user_id": "f93a6ce2-7591-4558-b16f-1cc6c9c2c188",
//     "order_id": "255064c4-28f1-4a2d-8ebe-b875c67e5217",
//     "date_created": "2024-10-12T21:41:06.739Z",
//     "status": "PENDING",
//     "amount": 133528.59
//   },
//   {
//     "order_invoice_id": "721785a5-f3ea-4533-82c8-405bc0fa0edc",
//     "user_id": "f93a6ce2-7591-4558-b16f-1cc6c9c2c188",
//     "order_id": "28f7e920-ef55-41f5-8650-e0ece5c26f02",
//     "date_created": "2024-10-31T02:27:14.554Z",
//     "status": "PENDING",
//     "amount": 99883.41
//   },
//   {
//     "order_invoice_id": "9591e64b-fcdc-4c0f-81bd-5b9b529e8ff9",
//     "user_id": "f93a6ce2-7591-4558-b16f-1cc6c9c2c188",
//     "order_id": "9fb06bb4-856e-48a3-ac13-9f42041332a9",
//     "date_created": "2024-11-05T17:28:45.875Z",
//     "status": "PAID",
//     "amount": 210.65
//   },
//   {
//     "order_invoice_id": "c7c1e99d-a8f8-431b-a510-e06a51036e32",
//     "user_id": "6b4ddc0b-7655-4569-bae9-ce756ed0b884",
//     "order_id": "288358d9-84b8-4cf2-90f4-de73dbccc56c",
//     "date_created": "2024-11-11T12:15:36.432Z",
//     "status": "PAID",
//     "amount": 850139.95
//   },
//   {
//     "order_invoice_id": "b981e207-a478-4a68-b1e2-7d67211e7299",
//     "user_id": "6b4ddc0b-7655-4569-bae9-ce756ed0b884",
//     "order_id": "76fb9456-0708-4840-b3c9-63ba3c857d28",
//     "date_created": "2024-11-04T10:14:40.082Z",
//     "status": "PAID",
//     "amount": 523902.89
//   },
//   {
//     "order_invoice_id": "74118567-a442-42cf-88fb-f466b518675a",
//     "user_id": "6b4ddc0b-7655-4569-bae9-ce756ed0b884",
//     "order_id": "67816781-e4c3-4a4e-b1f8-65fe07a537c8",
//     "date_created": "2024-11-10T23:57:27.357Z",
//     "status": "PENDING",
//     "amount": 469449.36
//   },
//   {
//     "order_invoice_id": "dfe4daea-8908-42bf-940c-a6712e094f38",
//     "user_id": "6b4ddc0b-7655-4569-bae9-ce756ed0b884",
//     "order_id": "33501b2f-877f-45a1-8e34-7118b5c6c119",
//     "date_created": "2024-10-21T05:53:47.203Z",
//     "status": "PAID",
//     "amount": 747801.52
//   },
//   {
//     "order_invoice_id": "bcbd6b82-924b-462f-948d-babf957c2422",
//     "user_id": "6b4ddc0b-7655-4569-bae9-ce756ed0b884",
//     "order_id": "6ce79305-f35c-46a8-a359-aa0b5d134b5c",
//     "date_created": "2024-10-08T23:00:03.113Z",
//     "status": "PAID",
//     "amount": 223455.56
//   },
//   {
//     "order_invoice_id": "aa017e6a-87c8-4fc1-a87a-889f4bb8f816",
//     "user_id": "6b4ddc0b-7655-4569-bae9-ce756ed0b884",
//     "order_id": "63eacc4d-da05-40a1-b59e-3bc877dac728",
//     "date_created": "2024-10-29T00:23:41.164Z",
//     "status": "PAID",
//     "amount": 205.74
//   },
//   {
//     "order_invoice_id": "b3735605-1b3e-46a9-99f0-78f14541f8dd",
//     "user_id": "6b4ddc0b-7655-4569-bae9-ce756ed0b884",
//     "order_id": "d25c9c71-0251-4958-b3d7-ba57cca8f151",
//     "date_created": "2024-10-27T08:10:09.034Z",
//     "status": "PENDING",
//     "amount": 182.87
//   },
//   {
//     "order_invoice_id": "f49e6141-62e1-423f-8f68-5f1188be5859",
//     "user_id": "6b4ddc0b-7655-4569-bae9-ce756ed0b884",
//     "order_id": "0d40cef8-3571-4b61-94c0-6ef16a050d18",
//     "date_created": "2024-11-08T02:05:57.340Z",
//     "status": "PENDING",
//     "amount": 354.93
//   },
//   {
//     "order_invoice_id": "dab86f96-937d-4d4c-9467-3d59fe3331d3",
//     "user_id": "6b4ddc0b-7655-4569-bae9-ce756ed0b884",
//     "order_id": "62763db4-575f-406f-8f74-3e55aaf34dcb",
//     "date_created": "2024-11-10T14:12:47.295Z",
//     "status": "PENDING",
//     "amount": 922286.45
//   },
//   {
//     "order_invoice_id": "244d3127-8842-4cb8-b9e3-13ff857042d0",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "eb42ca08-a48d-487e-af4e-b87df9411905",
//     "date_created": "2024-11-08T20:16:18.787Z",
//     "status": "PENDING",
//     "amount": 523096.23
//   },
//   {
//     "order_invoice_id": "c76ce2a0-2f74-41a4-bfed-f5579d196702",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "a0f7696c-f4e6-4a1a-b578-254f28ac62f9",
//     "date_created": "2024-11-11T12:00:12.053Z",
//     "status": "PAID",
//     "amount": 865.7
//   },
//   {
//     "order_invoice_id": "63a85d82-09e6-4625-bff3-24581cfa162c",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "427e9527-516a-4dc9-953b-6fe344cd73bd",
//     "date_created": "2024-11-07T10:22:46.440Z",
//     "status": "PAID",
//     "amount": 773389.08
//   },
//   {
//     "order_invoice_id": "5075e3c1-94a1-4a02-b6ae-99625f6e7c96",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "24ea840a-4f2c-43de-8872-ddae8f525930",
//     "date_created": "2024-11-09T06:37:14.716Z",
//     "status": "PENDING",
//     "amount": 412.8
//   },
//   {
//     "order_invoice_id": "b599fb99-06f3-4b95-bd7a-caa0f720f46f",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "97f6ad72-567b-4c1a-99fe-1626dbdeaa8a",
//     "date_created": "2024-11-10T07:02:37.377Z",
//     "status": "PENDING",
//     "amount": 780775.72
//   },
//   {
//     "order_invoice_id": "f0cbc5bd-2b01-42e4-bc67-82846cb01b61",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "01024c9b-910b-4a36-acb2-e811a007830b",
//     "date_created": "2024-11-04T08:01:15.363Z",
//     "status": "PAID",
//     "amount": 611757.27
//   },
//   {
//     "order_invoice_id": "ccf65ae3-4439-4ae7-abf6-ed7e0fb09f80",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "71519c98-9d91-4b09-8036-a33803888edc",
//     "date_created": "2024-10-29T16:32:59.659Z",
//     "status": "PAID",
//     "amount": 558.49
//   },
//   {
//     "order_invoice_id": "cedbb1ed-d502-4551-9a36-d6e16fcf256c",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "76a9713b-d5cd-4860-bbac-e1211cf387c7",
//     "date_created": "2024-11-11T13:27:24.628Z",
//     "status": "PAID",
//     "amount": 273.63
//   },
//   {
//     "order_invoice_id": "70566861-ff90-4849-8c85-d824656885ff",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "9a6d83b2-cc34-4d05-bf25-51eb42e30b36",
//     "date_created": "2024-10-10T06:52:50.379Z",
//     "status": "PAID",
//     "amount": 639.81
//   },
//   {
//     "order_invoice_id": "df88e12b-bf4a-47cc-b66e-026769f9f183",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "b899ece7-4f05-4a20-8a75-da3700813202",
//     "date_created": "2024-11-09T14:43:31.716Z",
//     "status": "PAID",
//     "amount": 251.1
//   },
//   {
//     "order_invoice_id": "6f4cc1f9-b005-411a-bd9c-842e055295d7",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "dd67a220-7e93-4b5e-ae67-7fdf3f3c1bf7",
//     "date_created": "2024-11-09T13:44:12.504Z",
//     "status": "PENDING",
//     "amount": 423727.48
//   },
//   {
//     "order_invoice_id": "663b3976-2b49-4ba7-9c60-d921e9ed9f85",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "47cfc621-eca4-4bb2-ae6e-c23f90018e00",
//     "date_created": "2024-10-19T21:11:16.262Z",
//     "status": "PENDING",
//     "amount": 993.03
//   },
//   {
//     "order_invoice_id": "be9e1831-4be1-43fa-a3ee-530f4aa980d7",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "83cdcfc9-df80-476d-b21d-5995485617dd",
//     "date_created": "2024-10-25T16:27:53.385Z",
//     "status": "PENDING",
//     "amount": 329416.11
//   },
//   {
//     "order_invoice_id": "4f2fdf1c-b0a3-4fc5-8aae-36016ffb6620",
//     "user_id": "df3be787-f5f4-4892-a829-170e9838743b",
//     "order_id": "cf8b8f62-c6a2-49ad-81f0-24acf7e23b20",
//     "date_created": "2024-10-29T16:05:05.230Z",
//     "status": "PENDING",
//     "amount": 314.35
//   },
//   {
//     "order_invoice_id": "55656491-dd5a-40a0-88ee-8d2892670567",
//     "user_id": "1495e8b3-2342-49de-b138-998018239e6c",
//     "order_id": "a61853ca-d67b-43c0-9d69-24c2a2460c62",
//     "date_created": "2024-11-06T08:37:34.938Z",
//     "status": "PENDING",
//     "amount": 1017.6
//   },
//   {
//     "order_invoice_id": "7da91dbd-b3cc-4170-9f19-4a41f708ab89",
//     "user_id": "1495e8b3-2342-49de-b138-998018239e6c",
//     "order_id": "2eca330a-ab17-48cf-9cbc-ee274b00d1eb",
//     "date_created": "2024-09-02T02:57:31.786Z",
//     "status": "PENDING",
//     "amount": 406581.15
//   },
//   {
//     "order_invoice_id": "cd7b6097-2293-4a5d-ab6e-474032bdfe69",
//     "user_id": "1495e8b3-2342-49de-b138-998018239e6c",
//     "order_id": "b5643c23-c4ca-44bd-90c8-0955a55fd543",
//     "date_created": "2024-10-11T19:00:44.528Z",
//     "status": "PENDING",
//     "amount": 536912.48
//   },
//   {
//     "order_invoice_id": "55eb5849-6969-4a3e-b4da-efd1758466c8",
//     "user_id": "1495e8b3-2342-49de-b138-998018239e6c",
//     "order_id": "bae057f5-1849-4427-bccc-76a72522654a",
//     "date_created": "2024-10-10T00:16:37.550Z",
//     "status": "PENDING",
//     "amount": 387.21
//   },
//   {
//     "order_invoice_id": "8802ad2e-058e-434d-824d-1982376463da",
//     "user_id": "1495e8b3-2342-49de-b138-998018239e6c",
//     "order_id": "feba7f01-1c66-439b-8f59-17e8b1ebb7ea",
//     "date_created": "2024-11-10T17:44:06.019Z",
//     "status": "PAID",
//     "amount": 819.56
//   },
//   {
//     "order_invoice_id": "d13d186c-a295-423e-b8ab-bbe174239a56",
//     "user_id": "5c195fda-52e5-4a34-87bb-1387e49297ef",
//     "order_id": "cd80f482-fec0-43a5-8046-bcd12cb69e5c",
//     "date_created": "2024-10-26T09:20:34.514Z",
//     "status": "PENDING",
//     "amount": 562.41
//   },
//   {
//     "order_invoice_id": "0878a8ed-409c-477a-91fd-6cd6539af1c3",
//     "user_id": "5c195fda-52e5-4a34-87bb-1387e49297ef",
//     "order_id": "a4454b4c-a333-4d62-a738-ee588824a20e",
//     "date_created": "2024-11-10T07:50:36.154Z",
//     "status": "PENDING",
//     "amount": 342121.47
//   },
//   {
//     "order_invoice_id": "c82225f4-434c-4c91-b2fb-0d57e6d9e89e",
//     "user_id": "5c195fda-52e5-4a34-87bb-1387e49297ef",
//     "order_id": "8ac90018-5013-47f4-af62-1f00b4476fd9",
//     "date_created": "2024-10-26T16:34:00.902Z",
//     "status": "PENDING",
//     "amount": 1064.44
//   },
//   {
//     "order_invoice_id": "2fce0527-25aa-4cd0-ac7a-ea0d9adc7d3f",
//     "user_id": "5c195fda-52e5-4a34-87bb-1387e49297ef",
//     "order_id": "73af3693-dd7a-46e0-8f3a-7ce339fc4a59",
//     "date_created": "2024-11-07T16:56:52.565Z",
//     "status": "PENDING",
//     "amount": 452369.16
//   },
//   {
//     "order_invoice_id": "a9696051-701a-419f-8cad-57db37de3eaa",
//     "user_id": "5c195fda-52e5-4a34-87bb-1387e49297ef",
//     "order_id": "fc1b5bd9-cf7b-4101-9f05-8e75093cb34a",
//     "date_created": "2024-11-04T11:50:51.563Z",
//     "status": "PENDING",
//     "amount": 157738.77
//   },
//   {
//     "order_invoice_id": "b05f0463-8f57-45f8-8e42-ba40ecc53385",
//     "user_id": "5c195fda-52e5-4a34-87bb-1387e49297ef",
//     "order_id": "2eecf9bf-a908-4677-87f3-88a30236f426",
//     "date_created": "2024-11-11T06:43:03.953Z",
//     "status": "PENDING",
//     "amount": 734.53
//   },
//   {
//     "order_invoice_id": "b5da2e2d-2286-4151-abb2-94d77fec15f5",
//     "user_id": "5c195fda-52e5-4a34-87bb-1387e49297ef",
//     "order_id": "8c60c30b-2750-49b7-b240-60c333fb101f",
//     "date_created": "2024-11-10T05:59:00.029Z",
//     "status": "PAID",
//     "amount": 749699.36
//   },
//   {
//     "order_invoice_id": "053b46b2-4253-49da-ae0e-901a18e10bf3",
//     "user_id": "5c195fda-52e5-4a34-87bb-1387e49297ef",
//     "order_id": "346da126-040a-47fc-9789-7c4e11720760",
//     "date_created": "2024-10-28T10:33:41.188Z",
//     "status": "PENDING",
//     "amount": 816466.7
//   },
//   {
//     "order_invoice_id": "87337c1d-5d19-408c-80e5-9762e59e961b",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "0fb26188-9126-4422-8e9e-0425e0eb7d33",
//     "date_created": "2024-10-26T17:45:47.184Z",
//     "status": "PENDING",
//     "amount": 369.76
//   },
//   {
//     "order_invoice_id": "9acecc25-06f0-4346-ba11-184519b2b139",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "c8bb48c0-4703-4384-bf3a-74839fb5944b",
//     "date_created": "2024-10-28T23:27:33.868Z",
//     "status": "PAID",
//     "amount": 220.66
//   },
//   {
//     "order_invoice_id": "c25bbeae-4ab3-483e-a0d0-4a9ab1f7b9db",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "764d606d-0534-445b-bc15-f735b49aabe6",
//     "date_created": "2024-11-11T00:51:21.564Z",
//     "status": "PENDING",
//     "amount": 49771.31
//   },
//   {
//     "order_invoice_id": "9f90d7cd-1961-4da8-9ea7-e90eafe79d66",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "a00db0fb-02a8-4b6d-8810-9540c5db3649",
//     "date_created": "2024-11-09T19:46:54.186Z",
//     "status": "PAID",
//     "amount": 863499.01
//   },
//   {
//     "order_invoice_id": "8f5d5ee6-7dbe-47bb-8199-6bcf07a56c64",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "eae54dc4-efe2-4b2b-967f-85eb24d95823",
//     "date_created": "2024-11-10T19:05:33.133Z",
//     "status": "PENDING",
//     "amount": 482175.45
//   },
//   {
//     "order_invoice_id": "c3412954-8366-4165-a767-49f713bd4e85",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "ff4fe0fb-48e7-4f3d-8c62-726ed2f76dba",
//     "date_created": "2024-11-10T21:37:20.499Z",
//     "status": "PAID",
//     "amount": 702.84
//   },
//   {
//     "order_invoice_id": "5d31aafb-616f-4e46-a1f3-69e3be7644d0",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "b3c1b280-7704-4059-aaf2-b19d27f6fa1d",
//     "date_created": "2024-11-02T12:39:21.494Z",
//     "status": "PENDING",
//     "amount": 452.29
//   },
//   {
//     "order_invoice_id": "282c2d0d-4cab-43b4-832e-c26a7a565da7",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "cbe909ef-57e0-46ac-9de2-da99fb0c6029",
//     "date_created": "2024-10-23T22:58:42.455Z",
//     "status": "PENDING",
//     "amount": 803030.43
//   },
//   {
//     "order_invoice_id": "effc3a25-a5b6-40b6-b95a-06748000e6d1",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "326b0320-13d1-46ab-b105-6f44ef292a3d",
//     "date_created": "2024-10-09T10:41:16.874Z",
//     "status": "PENDING",
//     "amount": 962.18
//   },
//   {
//     "order_invoice_id": "c502e6eb-4256-4135-8544-a75133159e0f",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "47e66a2e-cf02-41e1-b5e0-5dbff33662b9",
//     "date_created": "2024-04-22T00:46:47.046Z",
//     "status": "PENDING",
//     "amount": 294374.42
//   },
//   {
//     "order_invoice_id": "9b73a495-0b63-4cd0-90ee-99888343aa04",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "f21556a5-77e7-42fa-8084-1d372c3f53f9",
//     "date_created": "2024-09-25T00:24:34.667Z",
//     "status": "PAID",
//     "amount": 265878.13
//   },
//   {
//     "order_invoice_id": "f27ce428-b32a-4e3c-9b42-f5b587a2d0a9",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "b985069e-918f-497d-acf1-11cc1d9b097b",
//     "date_created": "2024-10-17T10:43:13.281Z",
//     "status": "PENDING",
//     "amount": 805.47
//   },
//   {
//     "order_invoice_id": "eb8de99e-a1e1-44ed-b0a4-252e7a0f0b9b",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "3d27ee21-b6a6-4af5-8fd0-67c627ccf4a1",
//     "date_created": "2024-11-06T20:44:23.337Z",
//     "status": "PAID",
//     "amount": 886.03
//   },
//   {
//     "order_invoice_id": "e5b1c351-86f3-4183-a92f-53b94aadcd45",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "e3c8e5a5-685c-444b-98fd-288e56aeaa5f",
//     "date_created": "2024-11-05T11:14:18.865Z",
//     "status": "PAID",
//     "amount": 625760.99
//   },
//   {
//     "order_invoice_id": "9529305b-9f88-4e46-991f-e8e3fe2ad900",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "6c9e7837-fae8-4c71-af80-f21daf306a71",
//     "date_created": "2024-11-02T00:04:09.709Z",
//     "status": "PENDING",
//     "amount": 502724.01
//   },
//   {
//     "order_invoice_id": "5dbebe81-eea6-401f-b437-7bd0f18a70b9",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "f90252aa-549b-444b-af73-6924b4f60b1b",
//     "date_created": "2024-10-23T00:10:02.865Z",
//     "status": "PENDING",
//     "amount": 208310.56
//   },
//   {
//     "order_invoice_id": "a5a609b2-7925-4fd8-8c97-d30c179b0d1c",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "baaf5281-9500-46ca-ac36-10933ac43477",
//     "date_created": "2024-10-27T21:52:31.833Z",
//     "status": "PENDING",
//     "amount": 304.48
//   },
//   {
//     "order_invoice_id": "b77e62a9-fd21-4b88-9be6-362393f17ce0",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "6074989f-ec3b-4c9a-8e48-870ad40d0895",
//     "date_created": "2024-11-07T11:28:43.483Z",
//     "status": "PENDING",
//     "amount": 296.3
//   },
//   {
//     "order_invoice_id": "7238305d-4b60-4f8c-8c05-005b26da62ca",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "7992ea30-b53d-4b88-beb0-594c329ad47e",
//     "date_created": "2024-11-01T23:21:46.570Z",
//     "status": "PENDING",
//     "amount": 932.79
//   },
//   {
//     "order_invoice_id": "f7a3edbb-f46b-46e4-9592-d03ffe776e77",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "7520bb8e-cf51-41a3-bdcd-218b81436315",
//     "date_created": "2024-11-07T18:47:42.865Z",
//     "status": "PAID",
//     "amount": 578.73
//   },
//   {
//     "order_invoice_id": "9df1755d-88b7-46d5-b597-058d9c14090e",
//     "user_id": "f9ec927d-05bd-476e-a482-c55e74447b7f",
//     "order_id": "d4af5322-30ea-4bbe-8d9a-dfcfd1378f21",
//     "date_created": "2024-11-10T16:16:17.115Z",
//     "status": "PAID",
//     "amount": 555055.72
//   },
//   {
//     "order_invoice_id": "3b907ff7-a2f4-4b0a-bf89-2b1034110254",
//     "user_id": "5b691032-5b13-4f68-bb1e-18f579a63e44",
//     "order_id": "b7e9017b-fdac-4c7d-9cae-a139c57d033e",
//     "date_created": "2024-06-27T18:16:52.410Z",
//     "status": "PENDING",
//     "amount": 362.24
//   },
//   {
//     "order_invoice_id": "6cb409cd-e445-40b4-bc62-64646fedd787",
//     "user_id": "5b691032-5b13-4f68-bb1e-18f579a63e44",
//     "order_id": "7fde8916-a8aa-4dd1-acba-bd328e4dabdf",
//     "date_created": "2024-10-17T03:59:22.433Z",
//     "status": "PENDING",
//     "amount": 1097.03
//   },
//   {
//     "order_invoice_id": "d5112ffb-5797-4b16-a400-236efb52d60d",
//     "user_id": "5d0b494c-c43f-41e7-aa24-58bfbed30e7b",
//     "order_id": "e7989b22-ee82-4189-823e-b2d602b2b555",
//     "date_created": "2024-11-06T06:21:06.914Z",
//     "status": "PAID",
//     "amount": 211.6
//   },
//   {
//     "order_invoice_id": "741b359c-7519-44e8-80dc-caaeb172258b",
//     "user_id": "5d0b494c-c43f-41e7-aa24-58bfbed30e7b",
//     "order_id": "6314b375-5109-41a3-9ba0-bbd3bdfa87bb",
//     "date_created": "2024-11-11T03:53:10.628Z",
//     "status": "PENDING",
//     "amount": 372515.77
//   },
//   {
//     "order_invoice_id": "215aedf4-50d5-4b74-94c9-f6202363a209",
//     "user_id": "5d0b494c-c43f-41e7-aa24-58bfbed30e7b",
//     "order_id": "79d057b8-034f-4ab7-8e90-8ba8210699c2",
//     "date_created": "2024-11-08T17:53:38.761Z",
//     "status": "PAID",
//     "amount": 808307.04
//   },
//   {
//     "order_invoice_id": "da9a3902-3f2b-4d48-a459-c390d22adb6e",
//     "user_id": "5d0b494c-c43f-41e7-aa24-58bfbed30e7b",
//     "order_id": "b7cbd29c-f79e-4f14-b71a-c48d705feb65",
//     "date_created": "2024-07-03T02:54:44.741Z",
//     "status": "PAID",
//     "amount": 840965.47
//   },
//   {
//     "order_invoice_id": "25643fb9-ab39-4a62-98d5-53bb43694f22",
//     "user_id": "5d0b494c-c43f-41e7-aa24-58bfbed30e7b",
//     "order_id": "efa87c8c-753a-4d97-872c-610eedbd35a4",
//     "date_created": "2024-11-04T14:19:05.640Z",
//     "status": "PENDING",
//     "amount": 876367.11
//   },
//   {
//     "order_invoice_id": "76b08a05-19a2-4f0c-a201-f3da2270fa6f",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "ae8a9731-99ae-4d4c-87d8-d8ce80c822a9",
//     "date_created": "2024-10-26T23:19:37.373Z",
//     "status": "PAID",
//     "amount": 398.63
//   },
//   {
//     "order_invoice_id": "9c88502f-14d0-4a57-ba65-2e2894bd8fe0",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "769d687b-6f7e-4de1-bb3d-c575a29ff530",
//     "date_created": "2024-10-31T21:20:07.646Z",
//     "status": "PAID",
//     "amount": 211132.45
//   },
//   {
//     "order_invoice_id": "1d0f19ce-9bf7-4dcb-8efb-8893b5ade405",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "7a92f8cd-e169-4121-8bfe-5a694c99e0f5",
//     "date_created": "2024-11-11T11:28:31.783Z",
//     "status": "PENDING",
//     "amount": 383.49
//   },
//   {
//     "order_invoice_id": "055d8f21-94c5-4ed8-9690-6bc9510456ef",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "704ce485-c24a-450a-b431-5e597268285e",
//     "date_created": "2024-11-03T13:56:21.767Z",
//     "status": "PENDING",
//     "amount": 935658.4
//   },
//   {
//     "order_invoice_id": "78a15c13-b8a3-42c4-90f0-98a47d6fffed",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "a9707c41-fe5c-4eed-a0dd-c8b3594792a8",
//     "date_created": "2024-10-10T10:09:34.493Z",
//     "status": "PAID",
//     "amount": 646627.74
//   },
//   {
//     "order_invoice_id": "be52f757-69e6-4055-a2ae-15a51088b37e",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "ffe8562a-8fe7-4245-9a2e-7ea85c6d5971",
//     "date_created": "2024-10-28T12:27:58.779Z",
//     "status": "PAID",
//     "amount": 866.84
//   },
//   {
//     "order_invoice_id": "caacf540-5f44-40a5-838c-d83f7db631d4",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "e8534ffc-923f-43ab-aa5a-62e4bbb3c1b5",
//     "date_created": "2024-10-30T10:08:30.731Z",
//     "status": "PENDING",
//     "amount": 267.37
//   },
//   {
//     "order_invoice_id": "fe2fe4d8-edb6-419f-830d-c96b9d2750d0",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "1246bfde-71e3-463c-a0a9-c04769071a2a",
//     "date_created": "2024-11-09T10:21:55.413Z",
//     "status": "PAID",
//     "amount": 716.11
//   },
//   {
//     "order_invoice_id": "c5e84e85-382c-440a-9daa-36beb80cb174",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "00f78d33-80ff-42b7-91b1-8824a543681f",
//     "date_created": "2024-10-20T15:19:56.782Z",
//     "status": "PAID",
//     "amount": 888537.38
//   },
//   {
//     "order_invoice_id": "73962211-d6e4-4f8b-a510-c8843b835fd4",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "2c4fd222-e28c-489d-8965-13ecc0f164d9",
//     "date_created": "2024-11-04T21:01:25.369Z",
//     "status": "PAID",
//     "amount": 805.75
//   },
//   {
//     "order_invoice_id": "7e3fea70-482e-41b7-97c3-a93c58805a6f",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "3543a5f2-cd78-4547-8b8f-ccdd0376c1c0",
//     "date_created": "2024-11-09T20:36:47.062Z",
//     "status": "PENDING",
//     "amount": 725.3
//   },
//   {
//     "order_invoice_id": "85c8c104-7ad7-4852-897d-b64704617911",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "af65fb47-0647-4704-ad0d-33bb51778213",
//     "date_created": "2024-11-04T05:34:05.960Z",
//     "status": "PAID",
//     "amount": 658.4
//   },
//   {
//     "order_invoice_id": "7835e696-13ae-4dfe-87b4-f9b6774d9e1f",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "f3b2d01b-6532-48dc-a3fa-bf095d5c7a59",
//     "date_created": "2024-11-04T01:13:21.183Z",
//     "status": "PAID",
//     "amount": 1027.14
//   },
//   {
//     "order_invoice_id": "f23aedbb-906f-4d84-a18b-2bdac4709d43",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "8b7c7283-59fb-4b38-9390-05c48bda0b41",
//     "date_created": "2024-10-25T05:42:04.523Z",
//     "status": "PAID",
//     "amount": 392.75
//   },
//   {
//     "order_invoice_id": "864e5678-94e2-45ba-8a30-73422c961387",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "d955f423-b46c-4c56-abb2-312e3b8324aa",
//     "date_created": "2024-11-11T05:53:05.695Z",
//     "status": "PAID",
//     "amount": 228747.38
//   },
//   {
//     "order_invoice_id": "0e207880-5744-4af4-8e4a-a1a442f328ce",
//     "user_id": "65cb1603-5ec7-48f1-a374-d348713562e1",
//     "order_id": "d6f5e301-37ba-4154-bb8a-f4c71d0efd50",
//     "date_created": "2024-10-02T16:34:30.647Z",
//     "status": "PAID",
//     "amount": 535341.94
//   },
//   {
//     "order_invoice_id": "34491089-4a29-453e-ac6e-e848028886c6",
//     "user_id": "21b90f0b-de52-4a1a-b9e5-7e01cbd1d348",
//     "order_id": "9da321e9-00a4-4c9e-b16d-d5c20ae325ae",
//     "date_created": "2024-05-21T03:10:39.924Z",
//     "status": "PENDING",
//     "amount": 321357.08
//   },
//   {
//     "order_invoice_id": "9371f367-475d-42c7-9985-b8765c9676d1",
//     "user_id": "21b90f0b-de52-4a1a-b9e5-7e01cbd1d348",
//     "order_id": "7c7b8b73-d2fb-49ab-aceb-ca46a7bed6bb",
//     "date_created": "2024-10-31T23:39:49.319Z",
//     "status": "PENDING",
//     "amount": 131972.78
//   },
//   {
//     "order_invoice_id": "8612ba98-5f30-45f4-a5a6-15f160447085",
//     "user_id": "21b90f0b-de52-4a1a-b9e5-7e01cbd1d348",
//     "order_id": "a9fe7485-fb5f-4521-b8b7-efee839e82d3",
//     "date_created": "2024-11-01T09:47:44.543Z",
//     "status": "PAID",
//     "amount": 640629.51
//   },
//   {
//     "order_invoice_id": "5201e913-156c-4277-878d-03cffc4302fd",
//     "user_id": "21b90f0b-de52-4a1a-b9e5-7e01cbd1d348",
//     "order_id": "e270c461-4345-4330-bec8-efd543b68874",
//     "date_created": "2024-10-30T16:22:52.855Z",
//     "status": "PENDING",
//     "amount": 773183.15
//   },
//   {
//     "order_invoice_id": "68d322f4-49d9-4bc5-b2e0-0328492a2945",
//     "user_id": "21b90f0b-de52-4a1a-b9e5-7e01cbd1d348",
//     "order_id": "56c4c220-7eb7-4f1b-acff-46ef509dd4df",
//     "date_created": "2024-11-11T13:59:19.224Z",
//     "status": "PAID",
//     "amount": 404200.84
//   },
//   {
//     "order_invoice_id": "f42bc585-fef9-436e-9e74-6c9a309ef58b",
//     "user_id": "21b90f0b-de52-4a1a-b9e5-7e01cbd1d348",
//     "order_id": "aab94d1b-3b04-4aa5-9177-f0cacfc29865",
//     "date_created": "2024-08-08T17:37:39.583Z",
//     "status": "PENDING",
//     "amount": 629699.48
//   },
//   {
//     "order_invoice_id": "a127c95a-5448-4a3c-b4e8-3c771f2acecd",
//     "user_id": "21b90f0b-de52-4a1a-b9e5-7e01cbd1d348",
//     "order_id": "e2a603d4-07ff-4a31-ad99-6f7a9998b50c",
//     "date_created": "2024-11-09T16:32:10.920Z",
//     "status": "PAID",
//     "amount": 414571.57
//   },
//   {
//     "order_invoice_id": "79048c25-6be1-4628-b898-ace623935e27",
//     "user_id": "21b90f0b-de52-4a1a-b9e5-7e01cbd1d348",
//     "order_id": "361d9582-d58c-4086-8e92-3e1c4eea9f9e",
//     "date_created": "2024-10-23T04:11:27.209Z",
//     "status": "PAID",
//     "amount": 685.45
//   },
//   {
//     "order_invoice_id": "75d809c6-385b-4721-8866-cbbd5aea4d43",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "2014fdb2-25a6-4845-ab7c-091fed36e749",
//     "date_created": "2024-11-11T00:51:01.567Z",
//     "status": "PAID",
//     "amount": 22920.02
//   },
//   {
//     "order_invoice_id": "c840fe7c-6fa6-4dc9-8acb-d29d42f04b8b",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "eb3b6055-b49c-46fb-b03c-5ccfbe074507",
//     "date_created": "2024-10-19T20:49:59.315Z",
//     "status": "PAID",
//     "amount": 933961.26
//   },
//   {
//     "order_invoice_id": "c4fd8db6-7041-4605-99b1-7b0619feceea",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "c5c1b6a5-ef4c-4374-90df-a2ea0b042570",
//     "date_created": "2024-11-09T15:34:43.748Z",
//     "status": "PAID",
//     "amount": 874.99
//   },
//   {
//     "order_invoice_id": "76ad161a-9e63-4fe6-9414-1dbc1972fb9c",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "2f4228fc-2b9a-4acc-9153-4b7646249d13",
//     "date_created": "2024-11-04T08:54:55.389Z",
//     "status": "PENDING",
//     "amount": 46979.42
//   },
//   {
//     "order_invoice_id": "ed7cdd66-79ab-44b0-a644-358d6b88bb7a",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "69a29556-2a7d-46cc-81d9-f6b667dd2ef7",
//     "date_created": "2024-11-04T22:41:39.962Z",
//     "status": "PENDING",
//     "amount": 393.69
//   },
//   {
//     "order_invoice_id": "6c8d35d8-b75f-4ab1-ad49-e6141a0d8851",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "72212f13-ba7c-4fcd-b9a4-346f8f5e173b",
//     "date_created": "2024-10-03T06:17:44.657Z",
//     "status": "PENDING",
//     "amount": 368.83
//   },
//   {
//     "order_invoice_id": "e2c6d185-29c9-4d5d-a313-2a4d1aa05f78",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "42e91789-7e70-4440-b0f1-1af20b8d1ed5",
//     "date_created": "2024-10-23T10:02:25.626Z",
//     "status": "PAID",
//     "amount": 829451.78
//   },
//   {
//     "order_invoice_id": "59dea0fd-b76d-4964-90bc-e3ae5b75036d",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "4387ae32-f235-4d30-8d8b-3746a76a1bde",
//     "date_created": "2024-11-05T06:22:06.186Z",
//     "status": "PENDING",
//     "amount": 353927.92
//   },
//   {
//     "order_invoice_id": "2e0a84f9-aff2-46b2-81c8-adca21714331",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "5aee4c2b-8d2f-4a16-aa42-3a77e09c1953",
//     "date_created": "2024-10-24T23:03:29.571Z",
//     "status": "PENDING",
//     "amount": 1105.04
//   },
//   {
//     "order_invoice_id": "40a80b49-4e5a-4e52-80be-29fed6b7318c",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "b751f9ba-73bf-4752-a113-0e290b39233f",
//     "date_created": "2024-11-08T07:14:16.508Z",
//     "status": "PENDING",
//     "amount": 863829.91
//   },
//   {
//     "order_invoice_id": "d1c5fb75-cfa7-4d54-bc6b-ace9a850b108",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "0ef8bbac-615f-47cd-9468-5f7ebb6f5491",
//     "date_created": "2024-11-10T20:43:48.912Z",
//     "status": "PAID",
//     "amount": 966.66
//   },
//   {
//     "order_invoice_id": "fa58dec5-7e9b-44db-958b-98da48f1db16",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "51850d39-f9ae-48be-b597-ede89c256253",
//     "date_created": "2024-10-16T07:14:32.550Z",
//     "status": "PAID",
//     "amount": 132.28
//   },
//   {
//     "order_invoice_id": "e5720273-ddbf-4001-a658-726cb6620962",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "fb1df6cc-f26f-495b-b06b-8b063a996861",
//     "date_created": "2024-10-19T05:38:10.473Z",
//     "status": "PENDING",
//     "amount": 715519.06
//   },
//   {
//     "order_invoice_id": "abd39ad4-bf4c-487a-b0ab-652f1fa38ba4",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "ede55f3c-f763-4246-89cc-481564816049",
//     "date_created": "2024-10-30T07:28:55.702Z",
//     "status": "PENDING",
//     "amount": 379.27
//   },
//   {
//     "order_invoice_id": "ffcd55f2-fd90-4bbb-b167-c6b05d4d0beb",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "73705b0b-8bd0-431d-be17-55cdaf55ae35",
//     "date_created": "2024-10-23T19:49:23.293Z",
//     "status": "PENDING",
//     "amount": 425.18
//   },
//   {
//     "order_invoice_id": "ef98b8c8-faf3-44ca-86fe-4151aca7fb31",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "4a349ebd-db94-4d6f-b6ab-b8c82d3610fb",
//     "date_created": "2024-11-11T14:58:32.951Z",
//     "status": "PENDING",
//     "amount": 564.82
//   },
//   {
//     "order_invoice_id": "e94d13d7-3a6b-4e22-91e0-88888bfb6fe3",
//     "user_id": "a1b56ee9-81f2-4915-a303-070083e5bc10",
//     "order_id": "cd4d1f41-c337-4fbe-bba7-d8535f84282f",
//     "date_created": "2024-11-09T05:28:11.901Z",
//     "status": "PAID",
//     "amount": 969775.2
//   }
// ];
