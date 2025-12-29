import React, { useEffect, useState } from "react";
import http from "../../http";
import LoadingComponent from "../../components/LoadingComponent";
import SubmitButton from "../../components/SubmitButton";
import Title from "../../components/Title";
import NavigationButton from "../../components/NavigationButton";

import { Link, useSearchParams } from "react-router-dom";
import { dtFormat } from "../../library";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get("status"); // Get status from URL query

  const dueDateOrder = searchParams.get("dueDate");

  console.log(dueDateOrder);

  const getTasks = async (status = null, order = null) => {
    try {
      setLoading(true);
      let url = "/tasks";

      const params = [];
      if (status) params.push(`status=${status}`);
      if (order) params.push(`_sort=dueDate&_order=${order}`);

      if (params.length > 0) {
        url += `?${params.join("&")}`;
      }

      const { data } = await http.get(url);
      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch tasks with status filter and dueDate sort from URL
    getTasks(statusFilter, dueDateOrder);
  }, [statusFilter, dueDateOrder]);

  const handleDelete = async (id) => {
    try {
      await http.delete(`/tasks/${id}`);
      // Refresh the tasks list after deletion with current filter
      getTasks(statusFilter, dueDateOrder);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

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
              {/* <NavigationButton icon="fa-plus" label="Add" /> */}

              <Link
                className="px-4 py-2 bg-black text-white flex gap-2 items-center"
                to={`/task/add`}
              >
                <i className={`fa-solid fa-plus`}></i>
                Add
              </Link>
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
                            {dtFormat(task.dueDate)}
                          </td>

                          {/* <!-- Updated At --> */}
                          <td className="px-2 border border-gray-300">
                            {task.status}
                          </td>

                          {/* <!-- Actions --> */}
                          <td className="px-2 py-2 border border-gray-300">
                            <div className="flex items-center gap-3">
                              {/* <!-- Edit Hyperlink --> */}
                              {/* <NavigationButton
                                label="Edit"
                                icon="fa-edit"
                                navigatedto={`${task.id}`}
                              /> */}

                              <Link
                                className="px-4 py-2 bg-black text-white flex gap-2 items-center"
                                to={`/task/edit/${task.id}`}
                              >
                                <i className={`fa-solid fa-edit`}></i>
                                Edit
                              </Link>

                              {/* <!-- Delete Button --> */}
                              <SubmitButton
                                btnProperties={btnProperties}
                                onClick={() => handleDelete(task.id)}
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
