import React, { useEffect, useState } from "react";
import {
  Select,
  Input,
  Table,
  SideSheet,
  Box,
  Text,
  Modal,
  ModalBody,
  FlexiPagination,
  ModalClose,
} from "@flexisaf/flexibull2";
import { format } from "date-fns";
import safsims from "../../assets/safsims.svg";
import safapply from "../../assets/safapply.svg";
import safrecords from "../../assets/safrecords.svg";
import virtualsims from "../../assets/virtualsims.svg";
import { useGetAdminLogsQuery } from "./modifications.api";
import { useQueryStateSync } from "../../utils/use-query-state-sync";
import ReactJson from "react-json-view";
import { useDispatch, useSelector } from "react-redux";
import { setHeaders } from "../../redux/headerSlice";
import RecursiveDisplay from "./recursive-display";
import Skeleton from "react-loading-skeleton";

const Modification = () => {

  const initialQueryState = { page: 1, limit: 10 };
  const { queryState, setQueryField } = useQueryStateSync(initialQueryState);
  const [currentItem, setCurrentItem] = useState(null);
  const dispatch = useDispatch();
  const dynamicHeaders = useSelector((state) => state.header.dynamicHeaders);
  useEffect(() => {
    const newHeaders = {
      "X-PRODUCT-ID": "00f45cb6-b611-456f-9863-ab7152a4ba71",
      "X-ORGANISATION-ID": "safapply",
    };
    dispatch(setHeaders(newHeaders));
  }, []);
  const {
    data: logs,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useGetAdminLogsQuery(queryState);

  useEffect(() => {
    refetch();
  }, [dynamicHeaders, refetch]);

  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const productImages = {
    safapply: safapply,
    safsims: safsims,
    safrecords: safrecords,
    virtualsims: virtualsims,
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      return;
    }
    return format(new Date(dateString), "PPPpp");
  };
  const formatTime = (dateString, timeFormat = "HH:mm:ss a") => {
    if (!dateString) {
      return;
    }
    return format(new Date(dateString), timeFormat);
  };

  const getOperationTagColor = (operation) => {
    switch (operation) {
      case "Create":
        return "bg-green-100 text-green-800";
      case "Update":
        return "bg-yellow-100 text-yellow-800";
      case "Delete":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading || isFetching) {
    return (
      <div>
        <div className="flex">
          <div className="flex-start mb-2 mr-1 w-1/4">
            <Skeleton count={1} height={50} />
          </div>
          <div className="mb-1 mr-1 w-1/4">
            <Skeleton count={1} height={50} />
          </div>
        </div>
        <Skeleton count={9} height={50} />
        <div className="flex justify-between">
          <div className="justify-start mt-2 mr-1 w-1/4">
            <Skeleton count={1} height={50} />
          </div>
          <div className="justify-end mt-2  w-1/3">
            <Skeleton count={1} height={50} />
          </div>
        </div>
      </div>
    );
  }

  function parseFieldsModified(fieldsModifiedString) {
    if (fieldsModifiedString === null || undefined) {
      return [];
    }
    try {
      return JSON.parse(fieldsModifiedString);
    } catch (error) {
      console.error("Error parsing fieldsModified:", error);
      return [];
    }
  }

  const handleOpen = (index) => {
    setCurrentItem(logs.data[index]);
    setOpen(true);
  };

  const handleChange = (value) => {
    const { label, value: valueToRemove, ...newHeaders } = value;
    console.log(newHeaders);
    dispatch(setHeaders(newHeaders));
  };

  const options = [
    {
      "X-PRODUCT-ID": "00f45cb6-b611-456f-9863-ab7152a4ba71",
      "X-ORGANISATION-ID": "safapply",
      label: "Safapply",
      value: "00f45cb6-b611-456f-9863-ab7152a4ba71",
    },
    {
      "X-PRODUCT-ID": "00f45cb6-b611-456f-9863-ab7152a4ba77",
      "X-ORGANISATION-ID": "safsims",
      label: "Safsims",
      value: "00f45cb6-b611-456f-9863-ab7152a4ba77",
    },
  ];

  return (
    <div className="ml-10 mt-5">
      <div className="flex mb-[20px] items-center justify-between ">
        <div className="filters flex items-center justify-between gap-5">
          <div>
            <Input
              type="text"
              placeholder="Search"
              style={{ width: "300px" }}
            />
          </div>
          <div>
            <Select
              placeholder="Product"
              options={options}
              onChange={handleChange}
              valueAndLabel
            />
          </div>

          {/* <div className="w-[300px]">
            <Select placeholder="Select action" options={[]} valueAndLabel />
          </div> */}
        </div>
      </div>
      <div>
        <Table>
          <table
            className={`transition duration-300 ${
              isFetching ? "opacity-30 blur-sm" : ""
            }`}
          >
            <thead>
              <tr>
                <th className="py-5 px-4 border-b">Date</th>
                <th className="py-5 px-4 border-b">User Name</th>
                <th className="py-5 px-4 border-b">Product</th>
                <th className="py-5 px-4 border-b">Organization</th>
                <th className="py-5 px-4 border-b">Operation</th>
              </tr>
            </thead>
            <tbody>
              {logs &&
                logs.data.map((log, index) => (
                  <tr key={log.id}>
                    <td className="py-8 px-4 border-b">
                      {formatDate(log.timestamp)}
                    </td>
                    <td className="py-8 px-4 border-b">{log.username}</td>
                    <td className="py-8 px-4 border-b">{log.organisationId}</td>
                    <td className="py-8 px-4 border-b">{log.organisationId}</td>
                    <td className="py-8 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded ${getOperationTagColor(
                          log.operation
                        )}`}
                      >
                        {log.operation}
                      </span>
                    </td>
                    <td className="py-8 px-4 border-b">
                      <button
                        onClick={() => handleOpen(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        &#x2022;&#x2022;&#x2022;
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="7" className="py-2 px-4 border-t">
                  <FlexiPagination
                    pageCounts={[
                      { value: 10, label: "10 Rows" },
                      { value: 20, label: "20 Rows" },
                      { value: 50, label: "50 Rows" },
                    ]}
                    itemsDisplayed
                    total={logs?.total}
                    pageSize={10}
                    onChange={(page) => setQueryField("page", page)}
                    changePageSize={(size) =>
                      setQueryField("limit", size.value)
                    }
                    current={Number(queryState?.page)}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </Table>
      </div>
      <SideSheet width="70%" open={open} onClose={() => setOpen(false)}>
        <Box
          round
          pad="28px"
          background="#fff"
          height="inherit"
          style={{ overflowY: "auto" }}
        >
          <h2 className="text-2xl">Modification Detail</h2>
          <div className="flex mt-5 ">
            <div className=" w-full flex justify-between">
              <div className="p-4 w-1/2">
                <Text bold size="14px" className="mb-2" block>
                  Username: {currentItem?.username}{" "}
                </Text>
                <Text size="14px" className="mb-2" block>
                  IP Address: {currentItem?.ipAddress}
                </Text>
                <Text size="14px" className="mb-2" block>
                  Location: {currentItem?.location}{" "}
                </Text>
                <Text size="14px" className="mb-2" block>
                  Browser: {currentItem?.browser}
                </Text>
                <Text size="14px" className="mb-2" block>
                  Device: {currentItem?.device}
                </Text>
              </div>
              <div className="p-4 w-1/2 ">
                <Text size="14px" className="mb-2" block>
                  Date: {formatDate(currentItem?.timestamp)}
                </Text>
                <Text size="14px" className="mb-2" block>
                  Time: {formatTime(currentItem?.timestamp)}
                </Text>
              </div>
            </div>
          </div>
          <div className="flex mt-5 ">
            <div className=" w-full flex justify-between">
              <div className="p-4 w-1/2">
                <Text bold size="14px" className="mb-2" block>
                  Product
                </Text>
              </div>
              <div className="p-4 w-1/2 ">
                <Text bold size="14px" className="mb-2" block>
                  Organization
                </Text>
              </div>
            </div>
          </div>
          <div className="flex border rounded-lg ml-4  mr-4">
            <div className="w-full  flex justify-between">
              <div className="p-1 mt-2 w-1/2">
                <Text size="16px" className="mb-2" block>
                  <div className="flex">
                    <div className="ml-2">
                      {" "}
                      <img
                        src={productImages[currentItem?.organisationId]}
                        alt="logo"
                        style={{
                          maxWidth: "80px",
                          maxHeight: "40px",
                          width: "auto",
                          height: "auto",
                        }}
                      />
                    </div>
                    <div className="ml-2">
                      {currentItem?.organisationId.toUpperCase()}
                    </div>
                  </div>
                </Text>
              </div>
              <div className="p-1 mt-2 w-1/2 ">
                <Text size="15px" className="mb-2 ml-2" block>
                  {currentItem?.organisationId.toUpperCase()}
                </Text>
              </div>
            </div>
          </div>
          <div className="flex mt-5 ">
            <div className="w-full flex justify-between">
              <div className="p-4">
                <Text bold size="12px" block className="mb-2">
                  Fields Affected:{" "}
                  {parseFieldsModified(currentItem?.fieldsModified)?.length <
                    1 && "0"}
                  {parseFieldsModified(currentItem?.fieldsModified)?.map(
                    (c) => (
                      <span
                        key={c}
                        className="inline-block px-2 mr-1 py-1 bg-red-200 rounded-md text-red-800"
                      >
                        {c}
                      </span>
                    )
                  )}
                </Text>
              </div>
              <div className="p-4 w-1/2 flex justify-end">
                <button
                  onClick={() => setIsVisible(true)}
                  className="p-2 px-4 border border-black rounded "
                >
                  View JSON
                </button>
              </div>
            </div>
          </div>
          {parseFieldsModified(currentItem?.fieldsModified).length > 0 && (
            <div className="flex flex-col bg-gray-50 rounded-md border">
              <div className="flex w-full">
                {/* Before section */}
                <div className="w-1/2 p-4 border-r border-gray-300">
                  <div className="flex w-full p-4 border-b border-gray-300">
                    <div className="w-full font-bold">
                      Before The Modification
                    </div>
                  </div>
                  {currentItem?.organisationId === "safsims" && (
                    <RecursiveDisplay data={currentItem?.before} />
                  )}
                  {parseFieldsModified(currentItem?.fieldsModified)?.map(
                    (c, index) => (
                      <div key={index} className="flex w-full border-gray-300">
                        <div className="w-1/2 p-4 border-r border-gray-300">
                          {c}
                        </div>
                        <div className="w-full p-4">
                          {typeof parseFieldsModified(currentItem?.before)[
                            c
                          ] === "string" ? (
                            parseFieldsModified(currentItem?.before)[c]
                          ) : (
                            <ReactJson
                              enableClipboard={true}
                              src={parseFieldsModified(currentItem?.before)[c]}
                            />
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
                {/* After section */}
                <div className="w-1/2 p-4">
                  <div className="flex w-full p-4 border-b border-gray-300">
                    <div className="w-full font-bold">
                      After The Modification
                    </div>
                  </div>
                  {parseFieldsModified(currentItem?.fieldsModified).map(
                    (c, index) => (
                      <div key={index} className="flex w-full  border-gray-300">
                        <div className="w-1/2 p-4 border-r border-gray-300">
                          {c}
                        </div>
                        <div className="w-full p-4">
                          {typeof parseFieldsModified(currentItem?.after)[c] ===
                          "string" ? (
                            parseFieldsModified(currentItem?.after)[c]
                          ) : (
                            <ReactJson
                              enableClipboard={true}
                              src={parseFieldsModified(currentItem?.after)[c]}
                            />
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </Box>
      </SideSheet>
      {isVisible && (
        <Modal open={isVisible} onClick={handleClose} outerclick>
          <ModalBody width="55vw">
            <ModalClose onClick={handleClose}>&times;</ModalClose>
            <Box pad="20px">
              <h3 className="text-2xl">JSON View</h3>
            </Box>
            <div className="flex m-6 ">
              <div className="w-full flex justify-between">
                <div className="p-4 border w-1/2">
                  <Text bold size="12px" block className="mb-2">
                    Before
                  </Text>
                  <ReactJson
                    src={parseFieldsModified(currentItem?.before)}
                    theme="rjv-default"
                    collapsed={2}
                  />
                </div>
                <div className="p-4 ml-2 border w-1/2">
                  <Text bold size="12px" block className="mb-2">
                    After
                  </Text>
                  <ReactJson
                    src={parseFieldsModified(currentItem?.after)}
                    theme="rjv-default"
                    collapsed={2}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default Modification;
