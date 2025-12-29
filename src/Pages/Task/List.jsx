import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../http";
import LoadingCom from "../../components/LoadingComponent";
import LoadingComponent from "../../components/LoadingComponent";
import SubmitButton from "../../components/SubmitButton";
import { useFormik } from "formik";
import Title from "../../components/Title";
import NavigationButton from "../../components/NavigationButton";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    try {
      setLoading(true);
      const { data } = await http.get("/tasks");
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      dueDate: null,
      status: "",
    },
  });

  // Button Information
  const btnProperties = {
    label: "Delete",
    icon: "fa-trash",
    color: "bg-red-500",
  };

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <div className="shadow-2xl rounded-sm py-8 mx-4 px-4 bg-amber-300">
            <div className="flex justify-between py-4">
              <Title text="Task List" />
              <NavigationButton icon="fa-plus" label="Add" />
            </div>

            {tasks.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="px-3 w-full bg-amber-300">
                  <thead>
                    <tr className="">
                      <th className="bg-black text-left border-r border-gray-300 text-white px-2">
                        Title
                      </th>
                      <th className="bg-black text-left border-r border-gray-300 text-white px-2">
                        Due Date
                      </th>
                      <th className="bg-black text-left border-r border-gray-300 text-white px-2">
                        Status
                      </th>
                      <th className="bg-black text-left border-r border-gray-300 text-white px-2">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {tasks.map((task) => (
                      <>
                        <tr className="text-gray-800">
                          {/* <!-- Category Name --> */}
                          <td className="px-2 border border-gray-300">
                            {task.title}
                          </td>

                          {/* <!-- Created At --> */}
                          <td className="px-2 border border-gray-300">
                            {task.dueDate}
                          </td>

                          {/* <!-- Updated At --> */}
                          <td className="px-2 border border-gray-300">
                            {task.status}
                          </td>

                          {/* <!-- Actions --> */}
                          <td className="px-2 py-2 border border-gray-300">
                            <div className="flex items-center gap-3">
                              {/* <!-- Edit Hyperlink --> */}
                              <NavigationButton
                                label="Edit"
                                icon="fa-edit"
                                navigatedto={`${task.id}`}
                              />

                              {/* <!-- Delete Button --> */}
                              <SubmitButton
                                btnProperties={btnProperties}
                                navigatedto={`${task.id}`}
                              />
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h1>No data Found</h1>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default List;
